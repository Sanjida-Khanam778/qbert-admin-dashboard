import { ArrowLeft } from "lucide-react";
import one from "../../assets/images/recipe/recipe1.webp";
import { Link, useParams } from "react-router-dom";
import { useGetRecipeQuery } from "../../Api/authApi";
export default function RecipeDetails() {
  const params = useParams();
  const { data, isLoading: isFetching } = useGetRecipeQuery(params.id);
  console.log(data);
  const {
    recipe_name,
    tag,
    ratings,
    protein,
    making_time,
    instructions,
    ingredients,
    for_time,
    fat,
    category,
    carbs,
    image,
    calories,
  } = data || {};

  // Helper to convert HH:MM:SS to 'X hours Y minutes Z sec'
  function formatTime(hms) {
    if (!hms) return "";
    const [h, m, s] = hms.split(":").map(Number);
    let str = "";
    if (h) str += `${h} hour${h > 1 ? "s" : ""} `;
    if (m) str += `${m} minute${m > 1 ? "s" : ""} `;
    if (s) str += `${s} sec`;
    return str.trim();
  }

  return (
    <div className="mx-auto p-6 bg-white w-full h-[90vh] overflow-y-scroll">
      <div className="flex items-center mb-8">
        <Link to={"/recipe"}>
          <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">{recipe_name}</h1>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left side - Image */}
        <div className="relative bg-sidebar p-6 rounded-lg h-[500px]">
          <img
            src={image}
            alt="Smoothie bowl with berries and granola"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right side - Nutrition and Recipe Facts */}
        <div className="space-y-6">
          {/* Nutrition Facts */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Nutrition Facts
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Calories</p>
                <p className="text-2xl font-bold text-gray-800">{calories}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-2xl font-bold text-gray-800">{carbs}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-2xl font-bold text-gray-800">{protein}g</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-2xl font-bold text-gray-800">{fat}g</p>
              </div>
            </div>
          </div>

          {/* Recipe Facts */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recipe fact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Making time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {/* making_time display */}
                  {formatTime(making_time)}
                </p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-600">Ratings</p>
                <p className="text-2xl font-bold text-gray-800">{ratings}</p>
              </div> */}
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-lg font-semibold text-gray-800">
                  {category}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-lg font-semibold text-gray-800">
                  {for_time}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {(tag || "").split(",").map((tag, idx) =>
            tag.trim() ? (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
              >
                {tag.trim()}
              </span>
            ) : null
          )}
        </div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Ingredients
          </h3>
          <ul className="list-disc list-inside mb-4">
            {(ingredients || "").split(",").map((ingredient, idx) =>
              ingredient.trim() ? (
                <li key={idx} className="text-gray-700">
                  {ingredient.trim()}
                </li>
              ) : null
            )}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {(instructions || "")
              .split(";")
              .map((instructions, idx) =>
                instructions.trim() ? (
                  <li key={idx}>{instructions.trim()}</li>
                ) : null
              )}
          </ol>
        </div>
      </div>
    </div>
  );
}
