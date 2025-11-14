// components/AssignEditPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationLayout from "./locationLayout";
import { ArrowLeft, MapPin } from "lucide-react";

export const AssignEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <LocationLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Users</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Assign Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update user assignment info (User ID: {id})
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              User Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">User Name</label>
                <input type="text" placeholder="Enter name" className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
                  <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
                  <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
                <select className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Select Project</option>
                  <option>Project A</option>
                  <option>Project B</option>
                  <option>Project C</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Location Type</label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="locationType" className="text-primary" /> From Master
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="locationType" className="text-primary" /> From Map
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Location Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input type="text" placeholder="Enter location" className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>

              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </LocationLayout>
  );
};
