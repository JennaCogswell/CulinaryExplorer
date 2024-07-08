"use client";

import React from "react";
import NavbarHeader from "../NavbarHeader/NavbarHeader";
import NavbarFoodItems from "../NavbarFoodItems/NavbarFoodItems";
import { usePathname } from "next/navigation";

/**
 * @authors
 * Jenna Cogswell - Creation and styling
 * Santi - Path implementaion
 */

const excludeFoodCatNav = ["/profile", "/messages", "/post"];

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col w-[100%] h-auto gap-y-[40px] items-center">
      <NavbarHeader />
      {!excludeFoodCatNav.includes(path) && <NavbarFoodItems />}
    </div>
  );
};

export default Navbar;
