"use client";

import Link from "next/link";
import React from "react";
{
  /*

  Author: Vrishti Dawra
  Student ID: B00906945
 
*/
}
const Footer = () => {
  return (
    <footer className="bg-light-black text-white p-6 md:rounded-t-3xl">
      <h1 className="text-2xl text-light-gold mb-4">Culinary Explorer</h1>
      <div className="container mx-auto ml-2">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="mb-8 md:mb-0 w-full">
            <h3 className="text-lg text-light-gold mb-2">Navigations:</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/breakfast" className="hover:underline">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/lunch" className="hover:underline">
                  Lunch
                </Link>
              </li>
              <li>
                <Link href="/dinner" className="hover:underline">
                  Dinner
                </Link>
              </li>
              <li>
                <Link href="/drinks" className="hover:underline">
                  Drinks
                </Link>
              </li>
              <li>
                <Link href="/dessert" className="hover:underline">
                  Dessert
                </Link>
              </li>
              <li>
                <Link href="/snacks" className="hover:underline">
                  Snacks
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-8 md:mb-0 w-full">
            <h3 className="text-lg text-light-gold mb-2">About:</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="mb-8 md:mb-0 w-full">
            <h3 className="text-lg text-light-gold mb-2">Features:</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Diet Tracker / Calories Calculator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Meal Planner
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className="text-lg text-light-gold mb-2">Sitemap:</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Map
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <p className="text-center mt-8 text-light-gold text-xl">
        &copy; <span className="text-sm text-white">CSCI 4177</span>
      </p>
    </footer>
  );
};

export default Footer;
