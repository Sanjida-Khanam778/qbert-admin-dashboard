import React from "react";

const InstructionsInput = ({ formData, handleInputChange }) => (
  <div>
    <label
      htmlFor="instructions"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Instructions
    </label>
    <textarea
      id="instructions"
      name="instructions"
      placeholder="Type here"
      value={formData.instructions}
      onChange={handleInputChange}
      rows={8}
      className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    />
  </div>
);

export default InstructionsInput;
