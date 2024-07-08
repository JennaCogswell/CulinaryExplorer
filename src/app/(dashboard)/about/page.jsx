import React from "react";

import ContactSection from "@/components/ContactSection/ContactSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import FAQSection from "@/components/FAQSection/FAQSection";
import AboutAnchorLinks from "@/components/AboutAnchorLinks/AboutAnchorLinks";

/**
 *
 * @authors
 * Santi: Styling
 */
const About = () => {
  return (
    <div className="flex flex-col gap-y-[2rem]">
      <div className="block w-[100%] md:flex md:gap-x-[4rem]">
        <AboutAnchorLinks />
        <div className="flex flex-col">
          <AboutSection />
          <FAQSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default About;
