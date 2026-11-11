const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const base = process.env.SITE_TEST_URL || "http://127.0.0.1:3100";
const paths = [
  "/",
  "/roof-repairs/",
  "/roof-replacement/",
  "/flat-roofing/",
  "/contact/",
  "/thank-you/",
];
(async () => {
  const pages = new Map(),
    titles = new Set(),
    descriptions = new Set(),
    images = new Set();
  for (const path of paths) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const document = new JSDOM(html, { url: base + path }).window.document;
    pages.set(path, document);
    assert.equal(document.querySelectorAll("h1").length, 1, path + " h1");
    assert(!titles.has(document.title), "duplicate title");
    titles.add(document.title);
    const description = document.querySelector(
      'meta[name="description"]',
    )?.content;
    assert(description, path + " description");
    assert(!descriptions.has(description), "duplicate description");
    descriptions.add(description);
    assert.equal(
      document.querySelector('link[rel="canonical"]')?.href,
      "https://complete-building-services-tau.vercel.app" + path,
    );
    assert(
      document.querySelector('meta[property="og:image"]'),
      path + " social image",
    );
    assert(html.includes("'GTM-M97CMPQK'"), path + " GTM script");
    assert(
      document.querySelector('noscript iframe[src*="GTM-M97CMPQK"]'),
      path + " GTM noscript",
    );
    for (const script of document.querySelectorAll(
      'script[type="application/ld+json"]',
    ))
      JSON.parse(script.textContent);
    for (const link of document.querySelectorAll('a[href^="tel:"]'))
      assert.equal(link.getAttribute("href"), "tel:+441793239742");
    for (const image of document.querySelectorAll("img")) {
      assert(image.getAttribute("alt"), path + " missing alt");
      images.add(image.src);
    }
    if (path === "/thank-you/")
      assert(
        document
          .querySelector('meta[name="robots"]')
          .content.includes("noindex"),
      );
    else
      assert.equal(
        document.querySelectorAll(".lead-form input").length,
        4,
        path + " form fields",
      );
    console.log("PASS", path, document.title);
  }
  for (const [path, document] of pages) {
    for (const anchor of document.querySelectorAll("a[href]")) {
      const url = new URL(anchor.href);
      if (url.origin !== new URL(base).origin) continue;
      const target = pages.get(url.pathname);
      assert(target, path + " unknown internal path " + url.pathname);
      if (url.hash)
        assert(
          target.getElementById(decodeURIComponent(url.hash.slice(1))),
          path + " missing fragment " + url.href,
        );
    }
  }
  await Promise.all(
    [...images].map(async (url) => {
      const r = await fetch(url);
      assert.equal(r.status, 200, url);
      assert(r.headers.get("content-type")?.startsWith("image/"), url);
    }),
  );
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert(!sitemap.includes("/thank-you/"));
  for (const path of paths.slice(0, -1))
    assert(
      sitemap.includes(
        "https://complete-building-services-tau.vercel.app" + path,
      ),
    );
  const robots = await (await fetch(base + "/robots.txt")).text();
  assert(robots.includes("Disallow: /api/"));
  assert.equal((await fetch(base + "/not-a-service/")).status, 404);
  console.log(
    "PASS internal routes, fragments, metadata, GTM, structured data, sitemap, robots, 404 and",
    images.size,
    "images",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
