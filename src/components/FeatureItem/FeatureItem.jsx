import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { IoIosTimer } from "react-icons/io";
import Author from "../author/Author";

/**
 * @Author Santi Rijal
 */

const FeatureItem = ({ foodItem }) => {
  const path = usePathname();

  return foodItem ? (
    <Link
      href={`${path}/${foodItem._id}`}
      className="bg-black md:rounded-3xl flex p-[6px] relative"
    >
      <div className="md:flex-1 md:relative ">
        <Image
          src={`${foodItem?.image}`}
          alt="Food image"
          fill
          className="md:rounded-3xl object-cover blur-[1px] lg:blur-none"
        />
      </div>

      <span className="hidden md:flex md:absolute w-[100%] h-[100%] rounded-3xl top-0 left-0 bg-gradient-to-l from-black from-40%" />

      <div className="flex-1 p-[3rem] flex justify-center z-10">
        <div className="md:bg-neutral-800 flex flex-col gap-y-[20px] rounded-3xl p-[2rem] max-w-[40rem] max-h-[30rem] bg-black lg:min-w-[40rem]">
          <section className="flex justify-between">
            <p className="text-light-gold md:text-[1.5rem] text-[1.3rem]">
              {foodItem?.recipeTitle}
            </p>
            {foodItem?.cookingTime && (
              <p className="flex justify-center items-center text-light-gold gap-x-[5px] md:text-[1rem] text-[0.8rem]">
                <IoIosTimer className="md:text-[1.4rem] text-[1.2rem]" />
                {foodItem.cookingTime}
              </p>
            )}
          </section>

          <section className=" text-white font-light opacity-[90%] md:text-[1rem] text-[0.8rem] max-h-[8rem]">
            <p className="h-[100%] line-clamp-3">{foodItem?.description}</p>
          </section>

          <Author recipe={foodItem} />
        </div>
      </div>
    </Link>
  ) : (
    <div className="text-white w-[100%] flex justify-center items-center min-h-[20rem] bg-black md:rounded-3xl p-[6px] relative">
      Item not found.
    </div>
  );
};

export default FeatureItem;
