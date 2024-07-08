import React from "react";
import { GoDotFill } from "react-icons/go";

const AboutAnchorLinks = () => {
  return (
    <div className="hidden md:flex">
      <nav>
        <ul className="min-w-[15rem] p-[20px] flex flex-col justify-center gap-y-[10px] rounded-lg bg-neutral-700 shadow-lg text-white">
          <li className="list-none flex items-center gap-x-[10px]">
            <GoDotFill className="text-dark-gold" />
            <a href="#about">About</a>
          </li>
          <li className="list-none flex items-center gap-x-[10px]">
            <GoDotFill className="text-dark-gold" />
            <a href="#faq">Frequently Asked Questions</a>
          </li>
          <li className="list-none flex items-center gap-x-[10px]">
            <GoDotFill className="text-dark-gold" />
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AboutAnchorLinks;
