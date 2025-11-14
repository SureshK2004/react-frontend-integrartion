import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Download, FileText, Filter, Minus, Plus, Printer } from "lucide-react";
import ExportComponent from "@/components/exportOption/exportTo";
import UserLocationHead from "./userLocattionHead";
// Adjust import path as needed

// User data interface matching the one from UserTable
interface User {
  id: string;
  name: string;
  employeeId: string;
  date: string;
  department: string;
  pu: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  avatarColor: string;
}

const UserLocationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user data from navigation state
  const userData = location.state?.userData as User | undefined;

  // Handle back navigation
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // If no user data is passed, show error state
  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
        <div className="text-center py-12">
          <div className="text-red-500 dark:text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User Data Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please go back and select a user from the attendance table.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Return to Attendance
          </button>
        </div>
      </div>
    );
  }

  // Sample location data - in a real app, this would come from your API
  const locationData = {
    punchIn: {
      time: "09:30:00",
      location: "Office Building 1, Anna Nagar",
      coordinates: "12.32343454, 15.4357678",
      device: {
        id: "TFA.3345.76",
        name: "POCO V2",
        location: "Chennai"
      }
    },
    punchOut: {
      time: "17:30:00", 
      location: "Office Building 1, Anna Nagar",
      coordinates: "12.32343455, 15.4357679",
      device: {
        id: "TFA.3345.76",
        name: "POCO V2", 
        location: "Chennai"
      }
    }
  };

  // Prepare data for export
  const exportData = [
    {
      "NAME": userData.name,
      "EMPLOYEE_ID": userData.employeeId,
      "DATE": userData.date,
      "DEPARTMENT": userData.department,
      "PUNCH_IN": locationData.punchIn.time,
      "PUNCH_OUT": locationData.punchOut.time,
      "STATUS": userData.status,
      "GEO_LOCATION": locationData.punchIn.coordinates,
      "DEVICE_ID": locationData.punchIn.device.id,
      "DEVICE_NAME": locationData.punchIn.device.name,
      "DEVICE_LOCATION": locationData.punchIn.device.location
    }
  ];

  const handleExportError = (message: string) => {
    console.error("Export Error:", message);
    alert(`Export Error: ${message}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <UserLocationHead userName={userData.name} onBack={handleBack} />
        <div className="p-6">

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            Approve
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
            Reject
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden shadow-sm">
          {/* Table Header with Action Icons */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span>Showing 1 to 1 of 1 entries</span>
            </div>
            <div className="flex gap-2">
              <ExportComponent
                tableId="user-location-table"
                filename={`${userData.name}-location-report`}
                data={exportData}
                onError={handleExportError}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table id="user-location-table" className="w-full">
              <thead>
                <tr className="bg-[#2E265F] text-white text-sm">
                  <th className="px-4 py-3 text-left font-semibold">NAME</th>
                  <th className="px-4 py-3 text-left font-semibold">DATE</th>
                  <th className="px-4 py-3 text-left font-semibold">PUNCH-IN</th>
                  <th className="px-4 py-3 text-left font-semibold">PUNCH-OUT</th>
                  <th className="px-4 py-3 text-left font-semibold">STATUS</th>
                  <th className="px-4 py-3 text-left font-semibold">GEO-LOCATION</th>
                  <th className="px-4 py-3 text-left font-semibold">DEVICE ID</th>
                  <th className="px-4 py-3 text-left font-semibold">DEVICE NAME</th>
                  <th className="px-4 py-3 text-left font-semibold">DEVICE LOCATION</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${userData.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}>
                        {userData.avatar}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{userData.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{userData.date}</td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{locationData.punchIn.time}</td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{locationData.punchOut.time}</td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold ${
                      userData.status === 'Active' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {userData.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400 text-xs">
                    {locationData.punchIn.coordinates}
                  </td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{locationData.punchIn.device.id}</td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{locationData.punchIn.device.name}</td>
                  <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{locationData.punchIn.device.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-blue-400 dark:border-blue-600 overflow-hidden shadow-sm">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Location - {userData.name}
            </h3>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-blue-900/20 dark:to-gray-800">
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                <Plus size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                <Minus size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Map Markers */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Punch In: {locationData.punchIn.time}
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/4 translate-y-1/4">
              <div className="relative">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Punch Out: {locationData.punchOut.time}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-600 max-w-xs">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">Punch In</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{locationData.punchIn.time}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{locationData.punchIn.location}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{locationData.punchIn.device.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">Punch Out</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{locationData.punchOut.time}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{locationData.punchOut.location}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{locationData.punchOut.device.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLocationPage;