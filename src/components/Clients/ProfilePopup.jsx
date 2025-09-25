import React from 'react';
import { Calendar, Mail } from 'lucide-react';

export const ProfilePopup = ({ user, onClose }) => {
  if (!user) return null;

  // Mask email function
  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 2) + '*'.repeat(5);
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-auto">
        {/* Profile Avatar */}
        <div className="flex justify-center pt-8 pb-6">
          <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Profile Content */}
        <div className="px-6 pb-8">
          {/* Name */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900">Name: {user.name}</p>
          </div>
          
          {/* Date */}
          <div className="flex items-center mb-6">
            <Calendar className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900 font-medium">{user.dateOfBirth}</span>
          </div>
          
          {/* Email */}
          <div className="flex items-center mb-6">
            <Mail className="w-5 h-5 text-gray-600 mr-3" />
            <span className="text-gray-900">{maskEmail(user.email)}</span>
          </div>
          
          {/* Height and Weight (placeholder values) */}
          <div className="flex justify-between mb-8">
            <div>
              <span className="text-gray-900">Height: </span>
              <span className="text-gray-900 font-medium">5 Ft</span>
            </div>
            <div>
              <span className="text-gray-900">Weight: </span>
              <span className="text-gray-900 font-medium">70 Kg</span>
            </div>
          </div>
          
          {/* Cancel Button */}
          <div className="flex justify-center">
            <button 
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};