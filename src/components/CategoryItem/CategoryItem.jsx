/**
 * @author Adam Sarty
 */
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryItem = ({ icon: Icon, label }) => {
  const categoryClass = label.toLowerCase();
  const path = usePathname();
  const isSelected = path === `/${categoryClass}`;

  const iconContainerClasses = `flex items-center justify-center rounded-full p-2 bg-gray-200 shadow-lg transition-all duration-1000 ${
    isSelected ? "bg-light-black text-white" : "text-black"
  }`;

  const iconClasses = `text-5xl ${isSelected ? "text-white" : "text-black"}`;

  return (
    <Link href={`/${categoryClass}`}>
      <div className="flex-shrink-0 flex flex-col items-center justify-center p-2 w-24 h-24 cursor-pointer">
        <div className={iconContainerClasses}>
          <Icon className={iconClasses} />
        </div>
        <p className="text-center mt-1 text-xs">{label}</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
