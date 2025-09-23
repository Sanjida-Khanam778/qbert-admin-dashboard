import React from "react";

const ImageUpload = ({
  imagePreview,
  handleDragOver,
  handleDrop,
  handleFileInputChange,
  setImageFile,
  setImagePreview,
}) => (
  <div className="row-span-2">
    <div
      className="mb-6 border-2 border-dashed w-full h-[30vh] mx-auto border-borderGray rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="Image upload area"
    >
      {imagePreview ? (
        <div className="relative w-full h-full">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <button
            type="button"
            aria-label="Remove image"
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            onClick={() => {
              setImageFile(null);
              setImagePreview(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-500 mb-2">Drag and Drop here</p>
          <p className="text-sm text-gray-500 mb-2">or</p>
          <label className="bg-primary text-white py-2 px-4 rounded cursor-pointer">
            Select file
            <input
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              accept="image/*"
              aria-label="Select image file"
            />
          </label>
        </>
      )}
    </div>
  </div>
);

export default ImageUpload;
