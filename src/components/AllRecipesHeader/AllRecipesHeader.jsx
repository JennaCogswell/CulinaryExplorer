import React from "react";

/**
 *
 * @author Santi
 */
const AllRecipesHeader = ({ handleChange }) => {
  return (
    <div className="flex justify-between p-[1.2rem]">
      <section className="w-[30%]">
        <input
          type="text"
          onChange={handleChange}
          className="outline-none p-[5px] pl-[10px] rounded-[20px] w-[100%]"
          placeholder="Search"
        />
      </section>
    </div>
  );
};

export default AllRecipesHeader;
