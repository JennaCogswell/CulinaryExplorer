/**
 * @author Jenna Cogswell
 */

import connect from '@/utils/connect';
import Recipe from '@/models/Recipe';

export const GET = async (req, res) => {
    const searchParams = req.nextUrl.searchParams;
    const searchTerms = searchParams.get('search')
    let recipes = [];
    let maxScore = 0;

    // connect to db
    await connect();

    
    // if searchTerms empty -> load all results/posts
    if(searchTerms === null || searchTerms ==[]){
        recipes = await Recipe.find({});
    }    
    else{
        // get regex to perform based on search terms
        const searchRegexArray = searchTerms.split(' '); 
        const searchRegex = new RegExp(searchRegexArray.join('|'), 'i');

        // aggregate recipes list by adding recipes that match the search terms, ordered by descending score, 
        // scoring is based on Title > description = authorName = cookingTime > category = instructions = difficultyLevel = additionalNotes, arrays scorred by number of matches
        recipes = await Recipe
            .aggregate([
                {
                    $addFields: {
                        score: {
                            $sum: [
                                { $cond: { if: { $regexMatch: { input: "$recipeTitle", regex: searchRegex } }, then: 3, else: 0 } },
                                { $cond: { if: { $regexMatch: { input: "$description", regex: searchRegex } }, then: 2, else: 0 } },
                                { $cond: { if: { $regexMatch: { input: "$category", regex: searchRegex } }, then: 1, else: 0 } },
                                { $cond: { if: { $regexMatch: { input: "$authorName", regex: searchRegex } }, then: 2, else: 0 } },
                                { $cond: { if: { $regexMatch: { input:"$cookingTime", regex: searchRegex } }, then: 2, else: 0 } },
                                { $cond: { if: { $regexMatch: { input: "$difficultyLevel", regex: searchRegex } }, then: 1, else: 0 } },
                                { $cond: { if: { $regexMatch: { input: "$additionalNotes", regex: searchRegex } }, then: 1, else: 0 } },
                                //{ $cond: { if: { $in: [ "$serves", searchRegex ] }, then: 1, else: 0 } },

                                { 
                                  $sum: {
                                    $map: {
                                      input: "$ingredients",
                                      as: "ingredient",
                                      in: {
                                        $cond: { if: { $regexMatch: { input: "$$ingredient", regex: searchRegex } }, then: 1, else: 0 },
                                      }
                                    }
                                  }
                                },

                                { 
                                  $sum: {
                                    $map: {
                                      input: "$instructions",
                                      as: "instruction",
                                      in: {
                                        $cond: { if: { $regexMatch: { input: "$$instruction", regex: searchRegex } }, then: 1, else: 0 },
                                      }
                                    }
                                  }
                                },

                                { 
                                  $sum: {
                                    $map: {
                                      input: "$allergens",
                                      as: "allergen",
                                      in: {
                                        $cond: { if: { $regexMatch: { input: "$$allergen", regex: searchRegex } }, then: 1, else: 0 },
                                      }
                                    }
                                  }
                                },
                                
                            ]
                        }
                    }
                },
                {
                    $sort: { score: -1 } // Sort in descending order based on score
                }
            ]);
    }    

    // to be used to check if there was any matches
    if (recipes.length > 0) {
      // Calculate maximum score
      maxScore = Math.max(...recipes.map(recipe => recipe.score));
    }

    const responseData = {
      recipes,
      maxScore
    };

    return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {"Content-Type": "application/json" },
    })
}
