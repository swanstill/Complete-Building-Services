"use client";
import { useState, useEffect, FormEvent } from "react";
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

const LeadForm = () => {
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

  useEffect(() => {
    trackLead();
  }, []);

  const handleChange = (field: keyof LeadFormData, value: string) => {
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
    } else if (!PHONE_REGEX.test(formData.phoneNumber.replace(/[\s\-()]/g, ""))) {
      nextErrors.phoneNumber = "Please enter a valid UK phone number";
    }
    if (!formData.postcode.trim()) {
      nextErrors.postcode = "Please enter your post code";
    } else if (!POSTCODE_REGEX.test(formData.postcode.trim().replace(/\s+/g, " "))) {
      nextErrors.postcode = "Please enter a valid UK post code";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    trackSubmitForm({ ...formData });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error("Lead API error", await res.text());
        throw new Error("Lead API error");
      }
      router.push("/thank-you");
    } catch (err) {
      console.error("Lead API exception", err);
      setSubmitError(
        "Sorry, something went wrong. Please try again or call us directly."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-xl mx-auto p-6 md:p-8 bg-white rounded-xl"
    >
      <div className="flex flex-col gap-5">
        {siteConfig.formData.fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
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
              <p className="text-red-500 text-xs">
                {errors[field.name as keyof LeadFormData]}
              </p>
            ) : (
              field.hint && (
                <p className="text-gray-500 text-xs">{field.hint}</p>
              )
            )}
          </div>
        ))}
      </div>

      {submitError && (
        <p className="mt-5 text-sm font-medium text-red-500">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full py-4 rounded-full font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed text-base"
        style={{ backgroundColor: siteConfig.brand.secondary }}
      >
        {isSubmitting ? "Submitting..." : "Get My Free Quote"}
      </button>
    </form>
  );
};

export default LeadForm;
