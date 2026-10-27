"use client";
import { useState, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/SiteConfig";
import { trackLead, trackSubmitForm } from "@/lib/tracking";

interface LeadFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  postcode: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+?44|0)\d{9,10}$/;
const POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

const LeadForm = ({ serviceType }: { serviceType?: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    postcode: "",
  });
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitting = useRef(false);
  const started = useRef(false);

  const handleChange = (field: keyof LeadFormData, value: string) => {
    if (!started.current) {
      started.current = true;
      trackLead({ service_type: serviceType || "General Roofing" });
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const validate = (): boolean => {
    const nextErrors: Partial<LeadFormData> = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      nextErrors.phoneNumber = "Please enter your phone number";
    } else if (
      !PHONE_REGEX.test(formData.phoneNumber.replace(/[\s\-()]/g, ""))
    ) {
      nextErrors.phoneNumber = "Please enter a valid UK phone number";
    }
    if (!formData.postcode.trim()) {
      nextErrors.postcode = "Please enter your post code";
    } else if (
      !POSTCODE_REGEX.test(formData.postcode.trim().replace(/\s+/g, " "))
    ) {
      nextErrors.postcode = "Please enter a valid UK post code";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current || !validate()) return;

    submitting.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...(serviceType ? { serviceType } : {}),
        }),
      });
      if (!res.ok) {
        throw new Error("Lead API error");
      }
      const result = await res.json();
      if (result.ok !== true || typeof result.sid !== "string" || !result.sid) {
        throw new Error("Delivery was not confirmed");
      }
      // A tracking/storage error must never prevent the successful redirect.
      try {
        trackSubmitForm({
          event_id: result.sid,
          service_type: serviceType || "General Roofing",
        });
      } catch {
        /* Delivery already succeeded. */
      }
      router.push("/thank-you/");
    } catch {
      setSubmitError(
        "Sorry, something went wrong. Please try again or call us directly.",
      );
      setIsSubmitting(false);
      submitting.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="lead-form"
      aria-label="Free roofing quote"
      aria-busy={isSubmitting}
    >
      {serviceType && (
        <p className="selected-service">
          Your enquiry: <strong>{serviceType}</strong>
        </p>
      )}
      <div className="form-fields">
        {siteConfig.formData.fields.map((field) => (
          <div key={field.name} className="form-field">
            <label
              htmlFor={field.name}
              className="text-sm font-semibold text-gray-800"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              disabled={isSubmitting}
              aria-describedby={
                field.hint || errors[field.name as keyof LeadFormData]
                  ? `${field.name}-help`
                  : undefined
              }
              value={formData[field.name as keyof LeadFormData]}
              onChange={(e) =>
                handleChange(field.name as keyof LeadFormData, e.target.value)
              }
              aria-invalid={Boolean(errors[field.name as keyof LeadFormData])}
              className="w-full p-4 border-2 rounded-xl focus:outline-none bg-white text-gray-800 text-base transition-colors"
              style={{
                borderColor: errors[field.name as keyof LeadFormData]
                  ? "#ef4444"
                  : siteConfig.brand.primary,
              }}
            />
            {errors[field.name as keyof LeadFormData] ? (
              <p id={`${field.name}-help`} className="field-error" role="alert">
                {errors[field.name as keyof LeadFormData]}
              </p>
            ) : (
              field.hint && (
                <p id={`${field.name}-help`} className="field-hint">
                  {field.hint}
                </p>
              )
            )}
          </div>
        ))}
      </div>

      {submitError && (
        <p className="submit-error" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="button button-primary form-submit"
      >
        {isSubmitting ? "Sending your enquiry..." : "Get My Free Quote"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">
        We&apos;ll use your details to respond to your enquiry. No obligation to
        go ahead.
      </p>
    </form>
  );
};

export default LeadForm;
