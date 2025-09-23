import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateRecipeMutation } from "../../Api/authApi";
import { CgSpinner } from "react-icons/cg";
import RecipeInfoFields from "./RecipeInfoFields";
import ImageUpload from "./ImageUpload";
import NutritionFacts from "./NutritionFacts";
import RecipeFacts from "./RecipeFacts";
import IngredientsInput from "./IngredientsInput";
import InstructionsInput from "./InstructionsInput";

const RecipeUploadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeType: "",
    forTime: "",
    tag: "",
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    makingTime: "",
    ratings: "",
    category: "",
    time: "",
    ingredients: "",
    instructions: "",
  });
  const [tags, setTags] = useState([]);
  // const [resetFileUpload, setResetFileUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [createRecipe, { isLoading, error, isSuccess }] =
    useCreateRecipeMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Image file set:", file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log("Image file set:", file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure forTime is never empty for backend validation
    const forTimeValue =
      formData.forTime && formData.forTime.trim() !== ""
        ? formData.forTime
        : "Not specified";

    try {
      const form = new FormData();
      form.append("recipe_name", formData.recipeName);
      form.append("recipe_type", formData.recipeType);
      form.append("for_time", forTimeValue);
      form.append("tag", tags.map((t) => t.text).join(","));
      form.append("calories", formData.calories);
      form.append("carbs", formData.carbs);
      form.append("protein", formData.protein);
      form.append("fat", formData.fat);
      form.append("making_time", formData.makingTime);
      form.append("category", formData.category);
      form.append("time", formData.time);
      form.append("ingredients", formData.ingredients);
      form.append("instructions", formData.instructions);
      if (imageFile) {
        form.append("image", imageFile);
      }

      await createRecipe(form).unwrap();
      toast.success("Recipe uploaded successfully!");

      // Reset form only on success
      setFormData({
        recipeName: "",
        recipeType: "",
        forTime: "",
        tag: "",
        calories: "",
        carbs: "",
        protein: "",
        fat: "",
        makingTime: "",
        ratings: "",
        category: "",
        time: "",
        ingredients: "",
        instructions: "",
      });
      setTags([]);
      setImageFile(null);
      setImagePreview(null);

      navigate("/recipe");
    } catch (err) {
      console.error("Recipe upload error:", err);
      const errorMessage =
        err?.data?.message || err?.error || "Failed to upload recipe";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white h-[90vh] overflow-y-scroll w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/recipe"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Upload Recipe
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecipeInfoFields
              formData={formData}
              handleInputChange={handleInputChange}
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleTagClick={handleTagClick}
              onTagUpdate={onTagUpdate}
            />
            <ImageUpload
              imagePreview={imagePreview}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileInputChange={handleFileInputChange}
              setImageFile={setImageFile}
              setImagePreview={setImagePreview}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NutritionFacts
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <RecipeFacts
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IngredientsInput
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <InstructionsInput
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              aria-label="Upload Recipe"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-4">
                  <CgSpinner className="inline animate-spin mr-2" />
                  <span> Uploading</span>
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeUploadForm;
