"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { website } from "@/config/website";

export default function MobileStickyBar() {
  const pathname = usePathname();
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const onFocus = () =>
      setEditing(
        document.activeElement?.matches("input, textarea, select") || false,
      );
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
    };
  }, []);
  return (
    <aside
      className="mobile-call-bar"
      aria-label="Quick contact"
      hidden={editing}
    >
      <a
        href={website.phoneHref}
        data-placement="mobile-sticky"
        className="button button-dark"
      >
        <span aria-hidden="true">☎</span> Call now
      </a>
      <a
        href={
          pathname.startsWith("/thank-you")
            ? "/contact/#quote-form"
            : "#quote-form"
        }
        className="button button-primary"
      >
        Free quote <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
