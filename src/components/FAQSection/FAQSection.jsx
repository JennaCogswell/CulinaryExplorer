import React from "react";

const headerStyle = {
  color: "#724110",
};

const FAQSection = () => {
  return (
    <div id="faq" className="">
      <div className="flex flex-col w-full max-w-fit rounded px-8 pb-8 ">
        <h2 className="text-2xl mb-3" style={headerStyle}>
          Frequently Asked Questions
        </h2>
        <h3 className="text-xl mb-2" style={headerStyle}>
          How do you take dietary restrictions into account?
        </h3>
        <p className="text-base">
          We know that there are all manner of dietary restrictions and
          preferrences out there. To address this, we have made our search
          feature very customizable. On Culinary Explorer, you will be able to
          filter for just the right kind of food that suits you perfectly.
        </p>
        <h3 className="text-xl mt-3 mb-2" style={headerStyle}>
          How can I donate to Culinary Explorer?
        </h3>
        <p className="text-base">
          Many of you have reached out asking if you could donate copious
          amounts of money to us. We are flattered you enjoy our platform so
          much, however we cannot accept. If you are interested in donating,
          please consider donating to your local foodbank so that everyone can
          enjoy their favourite recipes.
        </p>
        <h3 className="text-xl mt-3 mb-2" style={headerStyle}>
          Are you hiring?
        </h3>
        <p className="text-base">
          Our team is always evolving and growing to match the needs of our many
          users. If you are interested in working at Culinary Explorer, get in
          touch with us through our Contact field below.
        </p>
      </div>
    </div>
  );
};

export default FAQSection;
