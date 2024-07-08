/**
 * @author Jenna Cogswell
 */
export default function Reviews({recipe, myRecipe}){

  return(
    <div className="flex flex-col items-start justify-start w-full">
      <div>
        {/* <h2 className="text-3xl">Reviews</h2> */}
      </div>

      {/* Add review section if the recipe does not belong to current user */}
      { !myRecipe && 
      <div>

      </div>}

      {/** Display reviews */}
      <div>
        
      </div>
      
    </div>
  )
}