"use client";
import { siteConfig } from "@/config/SiteConfig";
import LeadForm from "./LeadForm";

const Form = () => {
  return (
    <section
      id="quote-form"
      className="flex flex-col gap-6 py-8 justify-center items-center px-4"
      style={{ backgroundColor: siteConfig.brand.primary }}
    >
      {/* Heading */}
      <div className="text-center px-2">
        <h2 className="text-white font-bold text-xl md:text-4xl">
          {siteConfig.formData.formHeading}
        </h2>
      </div>

      {/* Simple Form */}
      <LeadForm />
    </section>
  );
};

export default Form;
