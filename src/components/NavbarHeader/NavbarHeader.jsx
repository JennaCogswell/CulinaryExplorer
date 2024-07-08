"use client";

/**
 * @authors
 * Jenna - Search bar, Menu in NavbarLinks and styling
 * Santi - NavbarLinks and styling
 * Adam M - float button to Messages page
 */

import React, { Suspense, useContext } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import NavbarLinks from "../NavbarLinks/NavbarLinks";
import Logo from "../Logo/Logo";
import { Context } from "@/utils/ContextProvider";
import { FaRegMessage } from "react-icons/fa6";

const NavbarHeader = () => {
  const path = usePathname();
  const { updateConversations } = useContext(Context);

  // Conditionally render the Messages button based on the current page
  const renderMessagesButton = path !== "/messages" && (
    <Link href={"/messages"}>
      <button
        className="border-none shadow-md p-[20px] rounded-full float-right bg-yellow-700 text-white fixed bottom-4 right-4 z-1000000"
        type="button"
        onClick={() => updateConversations(undefined)}
      >
        <FaRegMessage className="text-[1.2rem]" />
      </button>
    </Link>
  );

  return (
    <header className="w-full h-auto shadow-xl bg-neutral-700 md:rounded-full px-[10px] py-[5px] relative z-10">
      <nav className="flex w-[100%] items-center justify-between px-3 2xl:px-[1.5rem] gap-x-[2rem] sm:gap-x-[5rem] md:gap-x-[5rem] lg:gap-x-[5rem] xl:gap-x-[8rem] 2xl:gap-x-[10rem]">
        <Logo />

        <Suspense>
          <SearchBar />
        </Suspense>

        <NavbarLinks />
      </nav>
      {renderMessagesButton}
    </header>
  );
};

export default NavbarHeader;
