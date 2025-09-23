import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGetWorkoutQuery } from "../../Api/authApi";
import avatar from "../../assets/images/Workout/workout.png";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { data: workout, isLoading } = useGetWorkoutQuery(id);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!workout) return <div className="p-8 text-center">Not found</div>;

  // Parse tags and benefits
  const tags = workout.tag ? workout.tag.split(",").map((t) => t.trim()) : [];
  const benefits = workout.benefits
    ? workout.benefits.split(",").map((b) => b.trim())
    : [];
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to={"/workout"}>
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-4 cursor-pointer" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            {workout.workout_name}
          </h1>
        </div>
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left side - Image */}
          <div className="relative bg-sidebar p-6 rounded-lg">
            <img
              src={workout.image || avatar}
              alt={workout.workout_name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right side - Nutrition and Workout Facts */}
          <div className="space-y-6">
            {/* Workout Facts */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Workout type
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {workout.workout_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">For body part</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {workout.for_body_part}
                  </p>
                </div>
              </div>
            </div>

            {/* Workout Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Workout fact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Time needed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatTime(workout.time_needed)}

                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Calories burn</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {workout.calories_burn}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Equipment needed</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {workout.equipment_needed}
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
            {tags.length > 0 ? (
              tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No tags</span>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Benefits
            </h3>
            <ul className="space-y-2 text-gray-700">
              {benefits.length > 0 ? (
                benefits.map((b, i) => <li key={i}>• {b}</li>)
              ) : (
                <li>No benefits listed.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
