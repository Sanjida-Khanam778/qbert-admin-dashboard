import React, { useState, useEffect } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import { Plus } from "lucide-react";

const RecipeInfoFields = ({
  formData,
  handleInputChange,
  tags,
  handleDelete,
  handleAddition,
  handleTagClick,
  onTagUpdate,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState(
    formData.forTime && formData.forTime !== ""
      ? formData.forTime.split(", ").filter((time) => time.trim() !== "")
      : []
  );
  const [newTimeInput, setNewTimeInput] = useState("");
  const [showNewTimeInput, setShowNewTimeInput] = useState(false);
  const [customMealTypes, setCustomMealTypes] = useState([]);

  // Update selectedTimes when formData.forTime changes
  useEffect(() => {
    if (formData.forTime && formData.forTime !== "") {
      const times = formData.forTime
        .split(", ")
        .filter((time) => time.trim() !== "");
      setSelectedTimes(times);
    } else {
      setSelectedTimes([]);
    }
  }, [formData.forTime]);

  // Load custom meal types from localStorage on component mount
  useEffect(() => {
    const savedCustomTypes = localStorage.getItem("customMealTypes");
    if (savedCustomTypes) {
      setCustomMealTypes(JSON.parse(savedCustomTypes));
    }
  }, []);

  const baseMealTypes = [
    "Breakfast",
    "Snack",
    "Snack 1",
    "Lunch",
    "Snack 2",
    "Dinner",
    "Snack 3",
    "Post-Dinner",
    "Late Snack",
  ];

  // Combine base meal types with custom ones
  const mealTypes = [...baseMealTypes, ...customMealTypes];

  const handleTimeSelection = (time) => {
    let updatedTimes;
    if (selectedTimes.includes(time)) {
      updatedTimes = selectedTimes.filter((t) => t !== time);
    } else {
      updatedTimes = [...selectedTimes, time];
    }

    setSelectedTimes(updatedTimes);
    handleInputChange({
      target: { name: "forTime", value: updatedTimes.join(", ") },
    });
  };

  const handleAddNewTime = () => {
    if (newTimeInput.trim() && !mealTypes.includes(newTimeInput.trim())) {
      // Add to custom meal types
      const updatedCustomTypes = [...customMealTypes, newTimeInput.trim()];
      setCustomMealTypes(updatedCustomTypes);

      // Save to localStorage
      localStorage.setItem(
        "customMealTypes",
        JSON.stringify(updatedCustomTypes)
      );

      // Add to selected times
      const updatedTimes = [...selectedTimes, newTimeInput.trim()];
      setSelectedTimes(updatedTimes);
      setNewTimeInput("");
      setShowNewTimeInput(false);

      // Update formData
      handleInputChange({
        target: { name: "forTime", value: updatedTimes.join(", ") },
      });
    }
  };

  const handleRemoveTime = (timeToRemove) => {
    const updatedTimes = selectedTimes.filter((time) => time !== timeToRemove);
    setSelectedTimes(updatedTimes);
    handleInputChange({
      target: { name: "forTime", value: updatedTimes.join(", ") },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="recipeName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Recipe Name
        </label>
        <input
          id="recipeName"
          type="text"
          name="recipeName"
          placeholder="Type here"
          value={formData.recipeName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="recipeType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Recipe Type
        </label>
        <input
          id="recipeType"
          type="text"
          name="recipeType"
          placeholder="Vegetarian or Non‑Vegetarian"
          value={formData.recipeType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="forTime"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          For time
        </label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus-within:outline-none focus-within:ring-2 cursor-pointer flex items-center justify-between"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700">
              {selectedTimes.length > 0
                ? selectedTimes.join(", ")
                : "Select meal times..."}
            </span>
            <Plus className="w-4 h-4 text-gray-500" />
          </div>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {mealTypes.map((time) => (
                <div
                  key={time}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                    selectedTimes.includes(time) ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleTimeSelection(time)}
                >
                  <span>{time}</span>
                  {selectedTimes.includes(time) && (
                    <span className="text-blue-600">✓</span>
                  )}
                </div>
              ))}

              {/* Add new time section */}
              <div className="border-t border-gray-200">
                {showNewTimeInput ? (
                  <div className="p-3">
                    <input
                      type="text"
                      value={newTimeInput}
                      onChange={(e) => setNewTimeInput(e.target.value)}
                      placeholder="Enter new meal time..."
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddNewTime();
                        }
                      }}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleAddNewTime}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowNewTimeInput(false);
                          setNewTimeInput("");
                        }}
                        className="px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-blue-600"
                    onClick={() => setShowNewTimeInput(true)}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add new meal time</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Display selected times as tags */}
        {selectedTimes.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedTimes.map((time) => (
              <span
                key={time}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {time}
                <button
                  onClick={() => handleRemoveTime(time)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor="tagInput"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tag
        </label>
        <div className="w-full px-3 py-1 bg-gray-100 border-0 rounded-md focus-within:outline-none ">
          <ReactTags
            tags={tags}
            separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleTagClick={handleTagClick}
            onTagUpdate={onTagUpdate}
            inputFieldPosition="bottom"
            editable
            dragDrop={false}
            maxTags={4}
            placeholder="Type here and press Enter..."
            classNames={{
              tags: "flex flex-wrap gap-3 mb-2",
              tagInput: "flex-1",
              tagInputField:
                "w-full px-2 py-1 bg-gray-100 border-none outline-none text-sm cursor-default",
              tag: "bg-primary text-white px-3 py-1 rounded-md text-sm flex items-center gap-2 mb-2",
              remove: "text-white hover:text-red-200 cursor-pointer ml-1",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeInfoFields;
