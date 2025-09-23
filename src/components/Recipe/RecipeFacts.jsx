import React from "react";

const RecipeFacts = ({ formData, handleInputChange }) => (
  <div>
    <h3 className="text-lg font-medium text-gray-800 mb-4">Recipes fact</h3>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="time"
        name="makingTime"
        placeholder="Making time (hh:mm:ss)"
        value={formData.makingTime}
        onChange={handleInputChange}
        aria-label="Making time"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
        aria-label="Category"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="time"
        name="time"
        placeholder="Time (hh:mm:ss)"
        value={formData.time}
        onChange={handleInputChange}
        aria-label="Time"
        className="px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);

export default RecipeFacts;
