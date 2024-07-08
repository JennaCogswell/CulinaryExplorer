/**
 * @author Jenna Cogswell
 */

import Image from "next/image";

export default function TitleImage({recipe, myRecipe}){

  let imagePath = "";
  if (recipe.image === "") {
    imagePath = `/uploads/image_not.png`;
  } else {
    imagePath = `${recipe.image}`;
  }


  return(
    <div className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[660px] relative rounded-3xl overflow-hidden shadow-inner">
      <div className="absolute inset-0">
        <Image
          src={imagePath}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Image of recipe."
        />
      </div>
    </div>
  )
}