import React from "react";

import Link from "next/link";
import { Menu } from "@headlessui/react";
import { FiMenu } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

/**
 * @authors
 * Jenna - Menu
 * Santi - session functionality with appropriate buttons
 */

const NavbarLinks = () => {
  const session = useSession();
  const path = usePathname();

  // Handle logout
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <ul>
      <li className="items-center justify-evenly w-fit-content text-white gap-x-[1.2rem] hidden lg:flex">
        <Link
          href="/home"
          className={`hover:text-light-gold flex-shrink-0 ${
            path === "/home" && "text-dark-gold"
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`hover:text-light-gold ${
            path === "/about" && "text-dark-gold"
          }`}
        >
          About
        </Link>
        {session?.status === "authenticated" ? (
          <>
            <Link
              href={"/fyp"}
              className={`hover:text-light-gold ${
                path === "/fyp" && "text-dark-gold"
              }`}
            >
              FYP
            </Link>
            <Link
              href={"/profile"}
              className={`hover:text-light-gold flex-shrink-0 ${
                path === "/profile" && "text-dark-gold"
              }`}
            >
              {session?.data?.user?.name}
            </Link>
            <Link
              href={"/post"}
              className={`hover:text-light-gold ${
                path === "/post" && "text-dark-gold"
              }`}
            >
              Post
            </Link>
            <span
              onClick={handleLogout}
              className="hover:text-light-gold cursor-pointer"
            >
              Logout
            </span>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-light-gold">
              Login
            </Link>
          </>
        )}
      </li>

      <li className="flex justify-end lg:hidden">
        {/* https://headlessui.com/react/menu */}
        <Menu>
          <Menu.Button className="inline-flex h-full items-center text-2xl text-slate-50 hover:text-amber-200">
            <FiMenu />
          </Menu.Button>
          <Menu.Items className="absolute z-[-1] mt-[1rem] pt-[5rem] pb-[2rem] sm:rounded-b-3xl bg-neutral-700 shadow-lg flex flex-col items-center justify-center text-slate-50 overflow-visible w-[100%] right-0">
            <Menu.Item className="hover:text-amber-200 block px-4 py-2">
              <Link
                href="/home"
                className={`hover:text-light-gold ${
                  path === "/home" && "text-dark-gold"
                }`}
              >
                Home
              </Link>
            </Menu.Item>

            <Menu.Item className="hover:text-amber-200 block px-4 py-2">
              <Link
                href="/about"
                className={`hover:text-light-gold ${
                  path === "/about" && "text-dark-gold"
                }`}
              >
                About
              </Link>
            </Menu.Item>

            {session?.status === "authenticated" ? (
              <>
                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <Link
                    href={"/fyp"}
                    className={`hover:text-light-gold ${
                      path === "/fyp" && "text-dark-gold"
                    }`}
                  >
                    FYP
                  </Link>
                </Menu.Item>
                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <Link
                    href={"/profile"}
                    className={`hover:text-light-gold ${
                      path === "/profile" && "text-dark-gold"
                    }`}
                  >
                    {session?.data?.user?.name}
                  </Link>
                </Menu.Item>
                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <Link
                    href={"/post"}
                    className={`hover:text-light-gold ${
                      path === "/post" && "text-dark-gold"
                    }`}
                  >
                    Post
                  </Link>
                </Menu.Item>
                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <span
                    onClick={handleLogout}
                    className="hover:text-light-gold cursor-pointer"
                  >
                    Logout
                  </span>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item className="hover:text-amber-200 block px-4 py-2">
                  <Link href="/login">Login</Link>
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Menu>
      </li>
    </ul>
  );
};

export default NavbarLinks;
