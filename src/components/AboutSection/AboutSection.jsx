import React from "react";

const headerStyle = {
  color: "#724110",
};

const AboutSection = () => {
  return (
    <div id="about" className="">
      <div className="flex flex-col w-full max-w-fit rounded px-8 pb-8">
        <h2 className="text-2xl mb-3" style={headerStyle}>
          About
        </h2>
        <p className="text-base">
          Here at Culinary Explorer, we are dedicated to helping you find your
          new favourite recipies. We are a small team of passionate students who
          enjoy cooking and sharing recipies. If you have any questions or
          concerns please feel free to get in touch with us using the contact
          form below. We hope that you are enjoying our platform and recipies.
          Happy cooking!
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
