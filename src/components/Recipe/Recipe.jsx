import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import avatar from "../../assets/images/Avatar.png";
import toast from "react-hot-toast";
import Pagination from "../Shared/Pagination";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import { Link } from "react-router-dom";
import { Plus, SquarePen } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAllRecipeQuery, useDeleteRecipeMutation } from "../../Api/authApi";

export default function Recipe() {
  // Remove initialRecipes and recipesState state
  // const [recipesState, setRecipesState] = useState(initialRecipes);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
  const [openDltModal, setOpenDltModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // Use mutation to fetch all recipes
  const { data, isLoading } = useAllRecipeQuery({
    search: query,
    page: currentPage,
    page_size: itemsPerPage,
  });
  const recipes = data?.results || [];
  const totalItems = data?.count || 0;
  console.log(recipes);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // Pagination state

  const handleDelete = async () => {
    if (!selectedRecipeId) return;
    try {
      await deleteRecipe(selectedRecipeId).unwrap();
      toast.success("Recipe deleted successfully!");
      setOpenDltModal(false);
      setSelectedRecipeId(null);
    } catch (err) {
      toast.error("Failed to delete recipe");
    }
  };

  return (
    <div className="bg-accent font-lora h-[90vh]">
      <div className="px-8 rounded-lg">
        {/* Search and filter bar */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Recipe Management</h1>

          <div className="flex items-center gap-4">
            {/* search */}
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border rounded-md bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* filter */}
            {/* <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-borderGray rounded-md pl-6 pr-6 py-2 focus:outline-none focus:ring-1"
              >
                <option value={""}>All</option>
                <option value={"Breakfast"}>Sort by: Breakfast</option>
                <option value={"Lunch"}>Sort by: Lunch</option>
                <option value={"Dinner"}>Sort by: Dinner</option>
                <option value={"Snacks"}>Sort by: Snacks</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div> */}
            {/* add recipe */}
            <Link to="/recipe/upload">
              <button className="bg-primary text-white px-4 py-2 rounded-md">
                <Plus className="text-2xl" />
              </button>
            </Link>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full mx-auto mt-10">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-neutral tracking-wider">
                  Recipe Name
                </th>
                <th className="px-6 py-3 text-left font-bold text-neutral tracking-wider">
                  Recipe Type
                </th>

                <th className="px-6 py-3 text-left font-bold text-neutral tracking-wider">
                  For Time
                </th>
                <th className="px-6 py-3 text-right font-bold text-neutral tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderGray">
              {isLoading ? (
                <tr>
                  <td>loading..</td>
                </tr>
              ) : (
                recipes &&
                recipes?.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="w-8 h-8 mr-4 rounded-full"
                          src={recipe?.image || avatar}
                          alt=""
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {recipe?.recipe_name}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm`}>{recipe?.recipe_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-subgray">
                        {recipe?.for_time}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap space-x-5 text-right">
                      <Link to={`/recipe/${recipe?.id}`}>
                        <button>
                          <LuEye className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <Link to={`/recipe/update/${recipe?.id}`}>
                        <button>
                          <SquarePen className="text-2xl cursor-pointer" />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setOpenDltModal(true);
                          setSelectedRecipeId(recipe.id);
                        }}
                      >
                        <RiDeleteBin6Line className="text-2xl text-red-500 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <DeleteConfirmationModal
              isOpen={openDltModal}
              onClose={() => setOpenDltModal(false)}
              onConfirm={handleDelete}
            />
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />{" "}
      </div>
    </div>
  );
}
