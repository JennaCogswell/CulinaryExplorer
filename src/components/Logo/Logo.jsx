import Image from "next/image";
import Link from "next/link";
import React from "react";
import LightLogo from "../../../public/LightLogo.svg";

/**
 * @authors
 * Jenna - Initial creation and styling
 * Santi - Making it's own component and styling
 */

const Logo = () => {
  return (
    <Link href={"/home"}>
      <Image
        src={LightLogo}
        alt="Logo"
        width="200"
        height="75"
        className="hidden cursor-pointer lg:min-w-[15rem] py-[10px] max-w-full min-w-48 sm:flex"
        priority
      />
      <p className="text-[2rem] font-semibold text-light-gold sm:hidden">CE</p>
    </Link>
  );
};

export default Logo;
