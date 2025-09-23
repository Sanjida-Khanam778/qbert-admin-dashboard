import React from "react";

const IngredientsInput = ({ formData, handleInputChange }) => (
  <div>
    <label
      htmlFor="ingredients"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Ingredients
    </label>
    <textarea
      id="ingredients"
      name="ingredients"
      placeholder="Type here"
      value={formData.ingredients}
      onChange={handleInputChange}
      rows={8}
      className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  </div>
);

export default IngredientsInput;
