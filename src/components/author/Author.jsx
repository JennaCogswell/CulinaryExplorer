"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

/**
 *
 * @author Santi
 */
const Author = ({ recipe }) => {
  const [authorImage, setAuthorImage] = useState("placeholder.png");

  useEffect(() => {
    const fetchAuthorImage = async () => {
      const authorName = recipe?.authorName;

      const res = await fetch(`/api/profile/${authorName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setAuthorImage(data?.userInfo?.image);
      } else {
        console.log(data);
      }
    };

    fetchAuthorImage();
  }, [recipe]);

  return (
    <div className="flex justify-start items-center gap-x-[10px] text-white md:text-[0.8rem] text-[0.6rem]">
      <Image
        src={
          authorImage === "placeholder.png"
            ? "/uploads/placeholder.png"
            : authorImage
        }
        width={30}
        height={30}
        alt="Profile image"
        className="rounded-full w-[30px] h-[30px] object-cover"
      />

      <p>{recipe?.authorName}</p>
    </div>
  );
};

export default Author;
