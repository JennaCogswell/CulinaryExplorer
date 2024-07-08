/**
 * @author Jenna Cogswell
 */

import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

//To be potentially updated in a real life scenario based on most used search queries and history
export default function SearchBar() {
  const popularKeywords = [
    { key: "1", value: "Chicken" },
    { key: "2", value: "Cake" },
    { key: "3", value: "Indian" },
    { key: "4", value: "Mexican" },
    { key: "5", value: "Serves 8" },
    { key: "6", value: "Cooking Method" },
    { key: "7", value: "Baking Method" },
    { key: "8", value: "Grilling Method" },
    { key: "9", value: "Roasting Method" },
    { key: "10", value: "Steaming Method" },
    { key: "11", value: "Boiling Method" },
    { key: "12", value: "Frying Method" },
    { key: "13", value: "Marinating" },
    { key: "14", value: "Seasoning" },
    { key: "15", value: "Nutritional Information" },
    { key: "16", value: "Calories" },
    { key: "17", value: "Protein" },
    { key: "18", value: "Carbohydrates" },
    { key: "19", value: "Fats" },
    { key: "20", value: "Healthy" },
    { key: "21", value: "Quick" },
    { key: "22", value: "Easy" },
    { key: "23", value: "Comfort Food" },
    { key: "24", value: "Family-Friendly" },
    { key: "25", value: "Budget-Friendly" },
    { key: "26", value: "Breakfast" },
    { key: "27", value: "Lunch" },
    { key: "28", value: "Dinner" },
    { key: "29", value: "Dessert" },
    { key: "30", value: "Snacks" },
  ];

  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  // set searchInput state based in search params, if any
  const [searchInput, setSearchInput] = useState(
    searchParams.has("search") ? searchParams.get("search").toLowerCase() : ""
  );

  // function to call when page outside of search drop down is clicked to toggle visibility
  const useClickOutside = (callback) => {
    const ref = useRef(); //A reference to the target element

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    });

    return { ref };
  };

  // functions for expanding / collapsing search dropdown
  const expand = () => {
    setShowSuggestions(true);
  };

  const collapse = () => {
    setShowSuggestions(false);
  };

  const { ref } = useClickOutside(collapse);

  // function to call when search input is changed
  const handleChange = (e) => {
    var input = e.target.value;
    setSearchInput(input);
  };

  // function when search x (clear) button is clicked to clear input value
  const handleClear = () => {
    var bar = document.getElementById("searchBar");
    bar.value = "";
    setSearchInput("");
  };

  // function to call when search form is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();
    collapse();
    router.push(`/search?search=${searchInput}`);
  };

  // function to call when a search suggestion is chosen
  const handleSuggestion = (value) => {
    setSearchInput(value);
    collapse();
    router.push(`/search?search=${value}`);
  };

  // function to filter search suggestions list as input is entered
  const filteredSuggestions = popularKeywords.filter((item) => {
    if (searchInput === "") {
      return item;
    } else {
      var itemLower = item.value.toLowerCase();
      var searchInputLower = searchInput.toLowerCase();
      return itemLower.includes(searchInputLower);
    }
  });

  return (
    <div className="flex-2 sm:flex-1 max-w-full h-6 md:h-7" ref={ref}>
      <form
        className="flex items-center rounded-full h-full px-2 bg-slate-50"
        onSubmit={handleFormSubmit}
      >
        <button type="submit">
          <IoSearch className="text-neutral-700 mr-2 min-w-[0.75em] w-4" />
        </button>
        <input
          id="searchBar"
          className=" text-neutral-700 w-full min-w-[0.75em] outline-none"
          type="text"
          placeholder="Search..."
          onClick={expand}
          onChange={handleChange}
          value={searchInput}
          autoComplete="off"
        />
        <button type="button" onClick={handleClear}>
          <MdClear className="text-neutral-700 ml-1 min-w-[0.75em]" />
        </button>
      </form>
      <div
        id="searchSuggestions"
        className="absolute z-20 mt-4 mx-4 pb-2 xl:w-1/2 md:w-1/3 sm:w-1/4 rounded-b-xl bg-neutral-700 shadow-lg text-slate-50 overflow-hidden"
        style={{ display: showSuggestions ? "block" : "none" }}
      >
        <div className="overflow-y-auto max-h-96">
          <ul>
            {filteredSuggestions.map((item) => (
              <li
                className="hover:text-amber-200 block px-4 py-1 z-30"
                key={item.key}
                onClick={() => handleSuggestion(item.value)}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="hidden bg-slate-50 rounded-xl w-full pl-2 py-0.5">
        <IoSearch
          className="text-neutral-700 text-lg mr-2"
          onClick={handleFormSubmit}
        />
      </button>
    </div>
  );
}
