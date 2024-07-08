/**
 * @author Jenna Cogswell
 */
export default function MainSection({recipe, myRecipe}){

  return(
    <div className="flex flex-col items-start justify-left bg-neutral-400 bg-opacity-15 rounded-3xl p-5">

      <div className="my-3">
        <h2 className="text-2xl sm:text-3xl mb-2">Description</h2>
        <p>{recipe.description}</p>
      </div>

      <div className="mt-3 mb-1">
        <h2 className="text-2xl sm:text-3xl mb-2">Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>- {ingredient}</li>
          ))}
        </ul>      
      
      </div>

      <div className="w-full mb-3 mt-2">
        <h3 className="text-xl sm:text-2xl mb-1">Allergens</h3>
        <ul>
          {recipe.allergens.map((allergen, index) => (
            <li key={index}>- {allergen}</li>
          ))}
        </ul>  
      </div>

      <div className="my-3">
        <h2 className="text-2xl sm:text-3xl mb-2">Instructions</h2>
        <ul>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{index+1}. {instruction}</li>
          ))}
        </ul> 
      </div>

      <div className="my-3">
        <h2 className="text-xl sm:text-2xl mb-2">Additional Notes</h2>
        <p>{recipe.additionalNotes}</p>
      </div>
    </div>
  )
}