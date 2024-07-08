"use client";

import React from "react";

import PostRecipeForm from "@/components/PostRecipe/PostRecipe";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PostRecipe = () => {
  const session = useSession();
  const router = useRouter();

  return session.status === "authenticated" ? (
    <div className="block w-[100%] md:flex md:gap-x-[4rem]">
      <PostRecipeForm recipe={null} />
    </div>
  ) : (
    session.status !== "loading" && router.push("/login")
  );
};

export default PostRecipe;
