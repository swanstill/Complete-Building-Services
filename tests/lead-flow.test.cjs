const { test, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const { JSDOM } = require("jsdom");

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/roof-repairs/",
});
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.IS_REACT_ACT_ENVIRONMENT = true;
const React = require("react");
const { render, fireEvent, cleanup, act } = require("@testing-library/react");

function load(path, mocks = {}, extra = {}) {
  const source = fs.readFileSync(path, "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(
    code,
    {
      module,
      exports: module.exports,
      require: (name) => (name in mocks ? mocks[name] : require(name)),
      window: dom.window,
      document: dom.window.document,
      console,
      Response,
      Request,
      process,
      ...extra,
    },
    { filename: path },
  );
  return module.exports;
}
const { siteConfig } = load("src/config/SiteConfig.ts");
afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  window.dataLayer = [];
  delete window.fbq;
});
const valid = {
  fullName: "Test Homeowner",
  email: "qa@example.test",
  phoneNumber: "07911 123456",
  postcode: "SN2 2AZ",
};

function formHarness(fetchMock, serviceType) {
  const conversions = [],
    starts = [],
    destinations = [];
  const { default: Form } = load(
    "src/components/LeadForm.tsx",
    {
      "next/navigation": {
        useRouter: () => ({ push: (path) => destinations.push(path) }),
      },
      "@/config/SiteConfig": { siteConfig },
      "@/lib/tracking": {
        trackLead: (data) => starts.push(data),
        trackSubmitForm: (data) => conversions.push(data),
      },
    },
    { fetch: fetchMock },
  );
  const screen = render(React.createElement(Form, { serviceType }));
  return {
    ...screen,
    conversions,
    starts,
    destinations,
    fill() {
      for (const [name, value] of Object.entries(valid))
        fireEvent.change(
          screen.container.querySelector('[name="' + name + '"]'),
          { target: { value } },
        );
    },
  };
}

test("empty and invalid forms never call lead API or record a conversion", () => {
  let calls = 0;
  const h = formHarness(() => {
    calls++;
  });
  assert.equal(h.starts.length, 0);
  fireEvent.submit(h.getByRole("form"));
  assert.equal(h.getAllByRole("alert").length, 4);
  h.fill();
  fireEvent.change(h.getByLabelText("Email Address"), {
    target: { value: "invalid" },
  });
  fireEvent.submit(h.getByRole("form"));
  assert.match(h.getByRole("alert").textContent, /valid email/);
  assert.equal(calls, 0);
  assert.equal(h.conversions.length, 0);
  assert.equal(h.starts.length, 1);
});

test("confirmed success sends original fields plus service, suppresses duplicate submission and redirects", async () => {
  const requests = [];
  let resolve;
  const pending = new Promise((r) => {
    resolve = r;
  });
  const h = formHarness((url, options) => {
    requests.push({ url, options });
    return pending;
  }, "Roof Repairs");
  h.fill();
  fireEvent.submit(h.getByRole("form"));
  fireEvent.submit(h.getByRole("form"));
  assert.equal(requests.length, 1);
  assert.equal(h.conversions.length, 0);
  assert.equal(requests[0].url, "/api/lead");
  assert.deepEqual(JSON.parse(requests[0].options.body), {
    ...valid,
    serviceType: "Roof Repairs",
  });
  assert.equal(h.getByRole("button").disabled, true);
  await act(async () => {
    resolve(
      new Response(JSON.stringify({ ok: true, sid: "SM-mocked-success" }), {
        status: 200,
      }),
    );
  });
  assert.deepEqual(h.destinations, ["/thank-you/"]);
  assert.equal(h.conversions.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(h.conversions[0])), {
    event_id: "SM-mocked-success",
    service_type: "Roof Repairs",
  });
});

test("homepage form retains the existing four-field payload", async () => {
  let payload;
  const h = formHarness(async (url, options) => {
    payload = JSON.parse(options.body);
    return new Response('{"ok":true,"sid":"SM-home"}');
  });
  h.fill();
  await act(async () => {
    fireEvent.submit(h.getByRole("form"));
  });
  assert.deepEqual(payload, valid);
  assert.equal(h.conversions.length, 1);
});

test("network failure, API rejection and unconfirmed 200 responses never convert or redirect", async () => {
  for (const result of [
    () => Promise.reject(new Error("network")),
    () => Promise.resolve(new Response("Failure", { status: 502 })),
    () => Promise.resolve(new Response('{"ok":false}')),
    () => Promise.resolve(new Response('{"ok":true}')),
  ]) {
    const h = formHarness(result, "Flat Roofing");
    h.fill();
    await act(async () => {
      fireEvent.submit(h.getByRole("form"));
    });
    assert.match(h.getByRole("alert").textContent, /Please try again/);
    assert.equal(h.conversions.length, 0);
    assert.equal(h.destinations.length, 0);
    assert.equal(h.getByRole("button").disabled, false);
    cleanup();
  }
});

test("successful delivery still redirects if an analytics integration throws", async () => {
  const { default: Form } = load(
    "src/components/LeadForm.tsx",
    {
      "next/navigation": {
        useRouter: () => ({
          push: (path) => {
            assert.equal(path, "/thank-you/");
          },
        }),
      },
      "@/config/SiteConfig": { siteConfig },
      "@/lib/tracking": {
        trackLead: () => {},
        trackSubmitForm: () => {
          throw new Error("blocked analytics");
        },
      },
    },
    { fetch: async () => new Response('{"ok":true,"sid":"SM-success"}') },
  );
  const h = render(React.createElement(Form));
  for (const [name, value] of Object.entries(valid))
    fireEvent.change(h.container.querySelector('[name="' + name + '"]'), {
      target: { value },
    });
  await act(async () => {
    fireEvent.submit(h.getByRole("form"));
  });
  assert.equal(h.queryByRole("alert"), null);
});

test("analytics keeps SubmitForm, strips personal data and deduplicates by confirmed message ID", () => {
  window.dataLayer = [];
  const pixels = [];
  window.fbq = (...args) => pixels.push(args);
  const tracking = load("src/lib/tracking.ts");
  tracking.trackLead({ service_type: "Roof Repairs" });
  assert.equal(window.dataLayer[0].event, "form_start");
  assert.equal(pixels.length, 0);
  tracking.trackSubmitForm({
    event_id: "SM-once",
    service_type: "Roof Repairs",
  });
  tracking.trackSubmitForm({
    event_id: "SM-once",
    service_type: "Roof Repairs",
  });
  const reloaded = load("src/lib/tracking.ts");
  reloaded.trackSubmitForm({ event_id: "SM-once" });
  assert.equal(
    window.dataLayer.filter((e) => e.event === "SubmitForm").length,
    1,
  );
  assert.equal(pixels.length, 1);
  assert.equal(
    JSON.stringify(window.dataLayer).includes("qa@example.test"),
    false,
  );
  assert.equal(JSON.stringify(window.dataLayer).includes("phoneNumber"), false);
});

test("API validates input, keeps configured Twilio sender/recipient and sends exactly one SMS with service context", async () => {
  const sent = [];
  const credentials = {
    ok: true,
    accountSid: "AC-mock",
    authToken: "test-only",
    fromNumber: "+440000000001",
    toNumber: "+440000000002",
  };
  const { POST } = load(
    "src/app/api/lead/route.ts",
    {
      twilio: (sid, token) => {
        assert.equal(sid, credentials.accountSid);
        assert.equal(token, credentials.authToken);
        return {
          messages: {
            create: async (message) => {
              sent.push(message);
              return { sid: "SM-api-test" };
            },
          },
        };
      },
      "@/lib/twilio-auth": { resolveTwilioCredentials: () => credentials },
    },
    { console: { log() {}, error() {} } },
  );
  const request = (data) =>
    new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  assert.equal((await POST(request({}))).status, 400);
  assert.equal(
    (await POST(request({ ...valid, email: "invalid" }))).status,
    422,
  );
  assert.equal(
    (await POST(request({ ...valid, phoneNumber: "abc" }))).status,
    422,
  );
  assert.equal(sent.length, 0);
  const response = await POST(
    request({ ...valid, serviceType: "Roof Repairs" }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, sid: "SM-api-test" });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].from, credentials.fromNumber);
  assert.equal(sent[0].to, credentials.toNumber);
  assert.match(sent[0].body, /New Roofing Lead \(website\)/);
  assert.match(sent[0].body, /Service: Roof Repairs/);
  assert.match(sent[0].body, /Postcode: SN2 2AZ/);
});

test("Twilio rejection and absent configuration return failures rather than false success", async () => {
  for (const config of [
    { ok: false, missing: ["TWILIO_NUMBER"] },
    { ok: true },
  ]) {
    const { POST } = load(
      "src/app/api/lead/route.ts",
      {
        twilio: () => ({
          messages: {
            create: async () => {
              throw new Error("mock SMS rejection");
            },
          },
        }),
        "@/lib/twilio-auth": { resolveTwilioCredentials: () => config },
      },
      { console: { log() {}, error() {} } },
    );
    const response = await POST(
      new Request("http://localhost/api/lead", {
        method: "POST",
        body: JSON.stringify(valid),
      }),
    );
    assert.equal(response.status, config.ok ? 502 : 500);
  }
});

test("credential resolver retains original environment names and legacy aliases", () => {
  const env = {
    TWILIO_SID: "AC-legacy",
    TWILIO_AUTH: "legacy-test",
    TWILIO_NUMBER: " sender ",
    CLIENT_SMS_TO: " recipient ",
  };
  const { resolveTwilioCredentials } = load(
    "src/lib/twilio-auth.ts",
    {},
    { process: { env } },
  );
  const result = resolveTwilioCredentials();
  assert.equal(result.ok, true);
  assert.equal(result.accountSid, "AC-legacy");
  assert.equal(result.toNumber, "recipient");
  env.TWILIO_ACCOUNT_SID = "AC-primary";
  env.TWILIO_AUTH_TOKEN = "primary-test";
  assert.equal(resolveTwilioCredentials().accountSid, "AC-primary");
  assert.equal(resolveTwilioCredentials().authToken, "primary-test");
});
