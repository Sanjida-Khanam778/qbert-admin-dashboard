import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useCreateWorkoutMutation } from "../../Api/authApi";
import ImageUpload from "../Recipe/ImageUpload";

const WorkoutUploadForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workout_name: "",
    time_needed: "",
    for_body_part: "Arms",
    workout_type: "Light",
    calories_burn: "",
    equipment_needed: "No",
    benefits: "",
  });
  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [createWorkout, { isLoading }] = useCreateWorkoutMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddition = (tag) => {
    setTags((prevTags) => [...prevTags, tag]);
  };

  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("workout_name", formData.workout_name);
      form.append("time_needed", formData.time_needed);
      form.append("for_body_part", formData.for_body_part);
      form.append("workout_type", formData.workout_type);
      form.append("calories_burn", formData.calories_burn);
      form.append("equipment_needed", formData.equipment_needed);
      form.append("benefits", formData.benefits);
      form.append("tag", tags.map((t) => t.text).join(","));
      if (imageFile) {
        form.append("image", imageFile);
      }
      await createWorkout(form).unwrap();
      toast.success("Workout uploaded successfully!");
      navigate("/workout");
    } catch (err) {
      toast.error("Failed to upload workout");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white h-[90vh] overflow-y-scroll w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/workout"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Upload Workout
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Workout Name */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Workout Name
              </label>
              <input
                type="text"
                name="workout_name"
                placeholder="Type here"
                value={formData.workout_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Time Needed */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Time Needed (HH:MM:SS)
              </label>
              <input
                type="time"
                name="time_needed"
                placeholder="00:30:00"
                value={formData.time_needed}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* For Body Part */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                For Body Part
              </label>
              <select
                name="for_body_part"
                value={formData.for_body_part}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
              >
                <option value="Arms">Arms</option>
                <option value="Legs">Legs</option>
                <option value="Back">Back</option>
                <option value="Chest">Chest</option>
                <option value="Shoulder">Shoulder</option>
                <option value="Belly">Belly</option>
                <option value="Abs">Abs</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>
            {/* Workout Type */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Workout Type
              </label>
              <select
                name="workout_type"
                value={formData.workout_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
              >
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Heavy">Heavy</option>
              </select>
            </div>
            {/* Calories burn */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Calories burn
              </label>
              <input
                type="number"
                name="calories_burn"
                placeholder="e.g. 250.50"
                value={formData.calories_burn}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Equipment Needed */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Equipment Needed
              </label>
              <select
                name="equipment_needed"
                value={formData.equipment_needed}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 appearance-none pr-10"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag
            </label>
            <ReactTags
              tags={tags}
              separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              inputFieldPosition="bottom"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageUpload
              imagePreview={imagePreview}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileInputChange={handleFileInputChange}
              setImageFile={setImageFile}
              setImagePreview={setImagePreview}
            />
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Benefits (comma separated)
              </label>
              <textarea
                name="benefits"
                placeholder="Benefit 1, Benefit 2, ..."
                value={formData.benefits}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-3 py-2 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CgSpinner className="inline animate-spin mr-2" />{" "}
                  Uploading...
                </>
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

export default WorkoutUploadForm;
