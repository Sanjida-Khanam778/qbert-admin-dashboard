import React from "react";

const NutritionFacts = ({ formData, handleInputChange }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-800 mb-4">Nutrition Facts</h3>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        name="calories"
        placeholder="Calories"
        value={formData.calories}
        onChange={handleInputChange}
        aria-label="Calories"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="carbs"
        placeholder="Carbs"
        value={formData.carbs}
        onChange={handleInputChange}
        aria-label="Carbs"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="protein"
        placeholder="Protein"
        value={formData.protein}
        onChange={handleInputChange}
        aria-label="Protein"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="fat"
        placeholder="Fat"
        value={formData.fat}
        onChange={handleInputChange}
        aria-label="Fat"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default NutritionFacts;
