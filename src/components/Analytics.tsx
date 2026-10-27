"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

export default function Analytics() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current !== pathname) {
      trackEvent("virtual_page_view", { page_path: pathname }, false);
      previous.current = pathname;
    }
  }, [pathname]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="tel:"]')
          : null;
      if (link)
        trackEvent(
          "call_click",
          {
            page_path: window.location.pathname,
            placement: link.dataset.placement || "page",
          },
          false,
        );
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
