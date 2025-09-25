import { useEffect, useState } from "react";
import { Edit2, Trash2, Plus, Save } from "lucide-react";

export const ProPlanPopup = ({ isOpen, onClose, onSave, editData = null }) => {
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

useEffect(() => {
    if (isOpen) {
      if (editData) {
        // Edit mode - populate with existing data
        setPlanName(editData.name);
        setPrice(editData.price);
        setDuration(editData.duration);
        setFeatures(editData.features);
      } else {
        // Add mode - empty form
        setPlanName("");
        setPrice("");
        setDuration("");
        setFeatures([]);
      }
      setNewFeature("");
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      planName,
      price,
      duration,
      features
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {editData ? 'Edit Plan' : 'Add New Plan'}
          </h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-4 space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Plan Name</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price and Duration Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price ($)</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Features</label>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
                  <span className="text-sm text-gray-700">{feature}</span>
                  <button
                    onClick={() => removeFeature(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {/* Add New Feature */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add new features"
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <button
                  onClick={addFeature}
                  className="p-2 text-gray-400 hover:text-blue-500"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-green-500 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {editData ? 'Save Changes' : 'Add Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};