import React, { useState } from 'react';
import { Mail, Phone, User as UserIcon } from 'lucide-react';

const LeaveSummary = () => {
  const [timeFrame, setTimeFrame] = useState<'monthly' | 'yearly'>('monthly');
  
  // Sample data - in real app, this would come from API
  const monthlyData = {
    leaveSummary: {
      totalLeaves: 2,
      leavesTaken: 0,
      availableLeaves: 2,
      period: 'Oct 2025'
    },
    permissionSummary: {
      totalPermissions: 8,
      permissionsTaken: 6,
      availablePermissions: 2,
      period: 'Oct 2025'
    },
    leaveDetails: {
      casualLeave: 1,
      sickLeave: 1,
      earnLeave: 2
    },
    permissionDetails: {
      emergency: 4,
      wfh: 2
    }
  };

  const yearlyData = {
    leaveSummary: {
      totalLeaves: 24,
      leavesTaken: 8,
      availableLeaves: 16,
      period: '2025'
    },
    permissionSummary: {
      totalPermissions: 96,
      permissionsTaken: 45,
      availablePermissions: 51,
      period: '2025'
    },
    leaveDetails: {
      casualLeave: 12,
      sickLeave: 6,
      earnLeave: 6
    },
    permissionDetails: {
      emergency: 30,
      wfh: 15
    }
  };

  const data = timeFrame === 'monthly' ? monthlyData : yearlyData;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              {/* Profile Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="bg-blue-100 hover:bg-blue-200 rounded-full w-24 h-24 flex flex-col items-center justify-center transition-colors mb-4">
                  <UserIcon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-600">Project Manager</p>
              </div>

              {/* Employee Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Employee ID:</span>
                  <span className="text-sm font-semibold text-gray-900">20001</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Department:</span>
                  <span className="text-sm font-semibold text-gray-900">AI Department</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Gender:</span>
                  <span className="text-sm font-semibold text-gray-900">Male</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Date of Birth:</span>
                  <span className="text-sm font-semibold text-gray-900">11-06-1996</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-700">Date of Join:</span>
                  <span className="text-sm font-semibold text-gray-900">10-08-2024</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-700">Mobile:</span>
                  <span className="text-sm font-semibold text-gray-900">+91 9876543210</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-600 border-2 border-white rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-medium shadow-md">
                  <Mail className="w-4 h-4" />
                  Send Email
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-600 border-2 border-white rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 font-medium shadow-md">
                  <Phone className="w-4 h-4" />
                  Call Employee
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Content - Leave & Permission Summary */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="bg-[#2D1E76] rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Leave & permission summary</h2>
                  <p className="text-gray-300 text-sm">Viewing {timeFrame} data for Admin</p>
                </div>
                
                {/* Time Frame Toggle */}
                <div className="flex items-center gap-4">
                  <div className="flex bg-white rounded-lg p-1">
                    <button
                      onClick={() => setTimeFrame('monthly')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        timeFrame === 'monthly'
                          ? 'bg-[#2D1E76] text-white shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setTimeFrame('yearly')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        timeFrame === 'yearly'
                          ? 'bg-[#2D1E76] text-white shadow-sm'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Monthly Leave Summary */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Leave Summary</h3>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                    {data.leaveSummary.period}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Leaves:</span>
                    <span className="font-semibold text-gray-900">{data.leaveSummary.totalLeaves}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Leaves Taken:</span>
                    <span className="font-semibold text-gray-900">{data.leaveSummary.leavesTaken}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Available Leaves:</span>
                    <span className="font-semibold text-green-600">{data.leaveSummary.availableLeaves}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Monthly Permission Summary */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Permission Summary</h3>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                    {data.permissionSummary.period}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Permissions:</span>
                    <span className="font-semibold text-gray-900">{data.permissionSummary.totalPermissions}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Permissions Taken:</span>
                    <span className="font-semibold text-gray-900">{data.permissionSummary.permissionsTaken}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Available Permissions:</span>
                    <span className="font-semibold text-green-600">{data.permissionSummary.availablePermissions}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Leave Details */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">CL - Casual Leave:</span>
                    <span className="font-semibold text-gray-900">{data.leaveDetails.casualLeave}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">SL - Sick Leave:</span>
                    <span className="font-semibold text-gray-900">{data.leaveDetails.sickLeave}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Earn Leave:</span>
                    <span className="font-semibold text-gray-900">{data.leaveDetails.earnLeave}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Permission Summary */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Emergency:</span>
                    <span className="font-semibold text-gray-900">{data.permissionDetails.emergency}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">WFH:</span>
                    <span className="font-semibold text-gray-900">{data.permissionDetails.wfh}</span>
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

export default LeaveSummary;