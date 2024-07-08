"use client";

/**
 * @author Adam Sarty
 */

import React from "react";
import { BsCupStraw } from "react-icons/bs";
import {
  PiHamburger,
  PiPizza,
  PiEggCrack,
  PiBowlFood,
  PiIceCream,
} from "react-icons/pi";
import CategoryItem from "../CategoryItem/CategoryItem";

const categories = [
  { label: "Breakfast", icon: PiEggCrack },
  { label: "Lunch", icon: PiHamburger },
  { label: "Dinner", icon: PiPizza },
  { label: "Drinks", icon: BsCupStraw },
  { label: "Dessert", icon: PiIceCream },
  { label: "Snacks", icon: PiBowlFood },
];

const NavbarFoodItems = () => {
  return (
    <div className="flex justify-center w-full overflow-hidden mb-10">
      <div className="flex sm:space-x-2 lg:space-x-4 overflow-x-scroll no-scrollbar">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            icon={category.icon}
            label={category.label}
          />
        ))}
      </div>
    </div>
  );
};

export default NavbarFoodItems;
