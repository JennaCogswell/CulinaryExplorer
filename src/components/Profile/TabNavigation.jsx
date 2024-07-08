import React from "react";

/**
 * @author Ayush Patel
 */

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="mr-2">
        <a
          href="#"
          onClick={() => onTabChange("myRecipes")}
          className={`inline-block p-4 ${
            activeTab === "myRecipes"
              ? "text-light-gold bg-neutral-700 rounded-t-lg"
              : "hover:text-white hover:bg-neutral-400 rounded-t-lg"
          }`}
        >
          My Recipes
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          onClick={() => onTabChange("viewRecipes")}
          className={`inline-block p-4 ${
            activeTab === "viewRecipes"
              ? "text-light-gold bg-neutral-700 rounded-t-lg"
              : "hover:text-white hover:bg-neutral-400 rounded-t-lg"
          }`}
        >
          View Recipes
        </a>
      </li>
      <li className="mr-2">
        <a
          href="#"
          onClick={() => onTabChange("favouriteRecipes")}
          className={`inline-block p-4 ${
            activeTab === "favouriteRecipes"
              ? "text-light-gold bg-neutral-700 rounded-t-lg"
              : "hover:text-white hover:bg-neutral-400 rounded-t-lg"
          }`}
        >
          View Favourites
        </a>
      </li>
    </ul>
  );
};

export default TabNavigation;
