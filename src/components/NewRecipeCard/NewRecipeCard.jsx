import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { IoIosTimer } from "react-icons/io";
import Author from "../author/Author";

/**
 * @author Santi Rijal
 */

const NewRecipeCard = ({ recipe }) => {
  const path = usePathname();

  return (
    <Link
      href={`${path}/${recipe._id}`}
      className="bg-light-black flex md:max-w-[40rem] rounded-3xl gap-x-[10px] min-h-[15rem] w-[35rem] p-[3px] hover:border-[2px] hover:border-dark-gold"
    >
      <div className="flex-1 relative">
        <Image
          src={`${recipe?.image}`}
          alt="Food image"
          fill
          className="rounded-l-3xl object-cover blur-[1px] lg:blur-none"
        />
      </div>

      <div className="bg-neutral-800 flex-1 rounded-r-3xl flex flex-col justify-between p-[30px] gap-y-[20px]">
        <section className="flex justify-between">
          <p className="text-light-gold md:text-[1.2rem] text-[1rem]">
            {recipe?.recipeTitle}
          </p>

          {recipe?.cookingTime && (
            <p className="flex justify-center items-center text-light-gold gap-x-[5px] md:text-[0.8rem] text-[0.6rem]">
              <IoIosTimer className="md:text-[1.2rem] text-[1rem]" />
              {recipe.hours} hr, {recipe.minutes} min
            </p>
          )}
        </section>

        <section className=" text-white font-light opacity-[90%] md:text-[0.8rem] text-[0.6rem] max-h-[8rem]">
          <p className="h-[100%] line-clamp-3">{recipe?.description}</p>
        </section>

        <Author recipe={recipe} />
      </div>
    </Link>
  );
};

export default NewRecipeCard;
