"use client";

import React, { useEffect, useState } from "react";

import PostRecipeForm from "@/components/PostRecipe/PostRecipe";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditPost = ({ params }) => {
  const id = params?.id;

  const [recipe, setRecipe] = useState(undefined);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await fetch(`/api/recipeDetails/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setRecipe(data?.recipe[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRecipe();
  }, []);

  return session.status === "authenticated" ? (
    <div className="block w-[100%] md:flex md:gap-x-[4rem]">
      <PostRecipeForm editRecipe={recipe} />
    </div>
  ) : (
    session.status !== "loading" && router.push("/login")
  );
};

export default EditPost;
