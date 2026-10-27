type TrackingEventData = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    fbq: (action: string, eventName: string, data?: TrackingEventData) => void;
  }
}
export const trackGTM = (eventName: string, eventData?: TrackingEventData) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...eventData });
  }
};
export const trackFacebook = (
  eventName: string,
  eventData?: TrackingEventData,
) => {
  if (typeof window !== "undefined" && window.fbq)
    window.fbq("track", eventName, eventData);
};
export const trackPageView = () => {
  trackGTM("PageView");
  trackFacebook("PageView");
};
// Starting a form is engagement, never a successful lead conversion.
export const trackLead = (data?: TrackingEventData) => {
  trackGTM("form_start", { form_name: "roofing_quote", ...data });
};
const recorded = new Set<string>();
// Only call after /api/lead confirms {ok: true, sid}. Keep the existing
// SubmitForm GTM event name, without sending contact details to analytics.
export const trackSubmitForm = (data: {
  event_id: string;
  service_type?: string;
}) => {
  if (typeof window === "undefined" || recorded.has(data.event_id)) return;
  const key = "complete-roofing-conversion:" + data.event_id;
  try {
    if (window.sessionStorage.getItem(key)) return;
  } catch {
    /* Storage can be disabled. */
  }
  recorded.add(data.event_id);
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    /* In-memory guard remains. */
  }
  trackGTM("SubmitForm", {
    content_name: "Form Submitted",
    form_name: "roofing_quote",
    ...data,
  });
  trackFacebook("Lead", data);
};
export const trackEvent = (
  eventName: string,
  eventData?: TrackingEventData,
  includeFacebook = true,
) => {
  trackGTM(eventName, eventData);
  if (includeFacebook && typeof window !== "undefined" && window.fbq)
    window.fbq("trackCustom", eventName, eventData);
};
