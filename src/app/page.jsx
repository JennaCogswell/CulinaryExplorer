"use client";

import Image from "next/image";
import React from "react";

import landingImage from "@/images/landingPageImage.jpeg";
import logo from "@/images/logo.png";

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

/**
 * @Author Santi Rijal
 */

const Landing = () => {
  const session = useSession();
  const router = useRouter();

  return session.status === "unauthenticated" ? (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-screen h-screen absolute">
        <Image
          src={landingImage}
          fill
          alt="Background image"
          className="object-cover"
        />
        <span className="w-screen h-screen absolute top-0 left-0 bg-black opacity-50" />
        <a
          href="https://www.freepik.com/free-ai-image/modern-kitchen-interior-design_65340153.htm"
          className="absolute bottom-0 right-2 text-white opacity-40"
        >
          Image By freepik
        </a>
      </div>

      <div className="text-white z-0 w-fit h-fit flex flex-col justify-center items-center">
        <p className="w-full text-center text-3xl">Welcome to</p>
        <Image src={logo} alt="logo" className="w-100" />

        <p className="lg:text-sm text-wrap text-center mt-1 max-w-96 text-white">
          Sign up now to start exploring and sharing new recipe ideas!
        </p>

        <div className="w-full flex flex-col mt-3">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-3">
              <Link
                href="/register"
                className="bg-white text-black px-10 md:px-3 lg:px-3 py-1 border-2 border-white lg:text-sm rounded-full hover:border-dark-gold hover:bg-dark-gold hover:text-white active:opacity-70 sm:text-lg md:text-sm"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="lg:text-sm border-2 border-dark-gold px-12 md:px-5 lg:px-5 py-1 bg-transparent rounded-full hover:border-light-gold hover:text-white active:opacity-70 sm:text-lg md:text-sm"
              >
                Login
              </Link>
            </div>

            <div className="flex justify-center items-center gap-x-2">
              <hr className="flex-1 opacity-70 text-light-gold" />
              <span className="text-light-gold">OR</span>
              <hr className="flex-1 opacity-70 text-light-gold" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href="/home"
              className="flex justify-center items-center sm:text-base lg:text-sm md:text-sm mt-2 hover:underline active:opacity-70 relative hover:transition-all duration-300 hover:scale-[1.2]"
            >
              <MdOutlineKeyboardDoubleArrowLeft className="text-x" />{" "}
              <span>Home</span>{" "}
              <MdOutlineKeyboardDoubleArrowRight className="text-x" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : (
    session.status !== "loading" && router.push("/home")
  );
};

export default Landing;
