/**
 * @author Ayush Amrishbhai Patel
 * @BannerId B00855591
 */

import React from "react";
import RecipeCard from "../RecipeCards/RecipeCards";

const RecipeList = ({ recipes, activeTab, user }) => {
  return (
    <div className="flex flex-wrap">
      {recipes?.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          activeTab={activeTab}
          user={user}
        />
      ))}
    </div>
  );
};

export default RecipeList;
