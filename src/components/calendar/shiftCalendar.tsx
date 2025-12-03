// components/ShiftRosterCalendar.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Users,
} from "lucide-react";
import LocationLayout from "../locationDetails/locationLayout";

// Sample data matching your image structure
const sampleShiftData = {
  id: "1",
  date: "October 2025",
  
  teamDetails: ["QA", "Team A", "Team B"],
  
  weeks: [
    {
      name: "Web 1",
      dates: [
        "2025-10-01 Wed", "2025-10-02 Thu", "2025-10-03 Fri", 
        "2025-10-04 Sat", "2025-10-05 Sun", "2025-10-06 Mon", "2025-10-07 Tue"
      ],
      shifts: [
        {
          name: "Morning",
          schedule: ["Team A", "Team A", "Team B", "Team B", "Team B", "Team B", "QA"]
        },
        {
          name: "Night",
          schedule: ["QA", "QA", "QA", "QA", "Team A", "Team A", "Team A"]
        }
      ]
    },
    {
      name: "Web 2",
      dates: [
        "2025-10-08 Wed", "2025-10-09 Thu", "2025-10-10 Fri", 
        "2025-10-11 Sat", "2025-10-12 Sun", "2025-10-13 Mon", "2025-10-14 Tue"
      ],
      shifts: [
        {
          name: "Morning",
          schedule: ["QA", "QA", "QA", "Team A", "Team A", "Team A", "Team A"]
        }
      ]
    }
  ]
};

const ShiftRosterCalendar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025

  const shiftData = sampleShiftData;

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'prev' ? -1 : 1), 1));
  };

  const currentMonthYear = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  // Get color for team
  const getTeamColor = (team: string) => {
    const colors = {
      "QA": "bg-blue-500",
      "Team A": "bg-green-500", 
      "Team B": "bg-purple-500",
      "-": "bg-gray-200 dark:bg-gray-700"
    };
    return colors[team as keyof typeof colors] || "bg-orange-500";
  };

  // Get text color for team (for better contrast)
  const getTextColor = (team: string) => {
    return "text-white"; // All teams use white text for better readability
  };

  return (
    <LocationLayout>
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Rosters
        </button>

        {/* Main Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Header */}
          <div className="p-6 bg-primary border-10 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Shift Details</h1>
                  <p className="text-blue-100">Team Schedule Overview</p>
                </div>
              </div>
              
              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeMonth('prev')}
                  className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="font-semibold">{currentMonthYear}</span>
                </div>
                <button
                  onClick={() => changeMonth('next')}
                  className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Team Details */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Team Details:</span>
              <div className="flex flex-wrap gap-3">
                {shiftData.teamDetails.map((team, index) => (
                  <div key={team} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getTeamColor(team)}`} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{team}</span>
                    {index < shiftData.teamDetails.length - 1 && (
                      <span className="text-gray-400">•</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weeks Container */}
          <div className="p-6 space-y-8">
            {shiftData.weeks.map((week, weekIndex) => (
              <div key={week.name} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                {/* Week Header */}
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-300 dark:border-gray-600">
                  {week.name}
                </h2>

                {/* Week Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-3 text-left bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-l-lg">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Shift</span>
                        </th>
                        {week.dates.map((date, dateIndex) => (
                          <th 
                            key={dateIndex}
                            className="p-3 text-center bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 font-semibold text-gray-700 dark:text-gray-300 min-w-24"
                          >
                            {date.split(' ')[2]} {/* Day name */}
                            <br />
                            <span className="text-sm font-normal">
                              {date.split(' ')[0]} {/* Date */}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {week.shifts.map((shift, shiftIndex) => (
                        <tr key={shift.name}>
                          <td className="p-3 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 font-semibold text-gray-700 dark:text-gray-300">
                            {shift.name}
                          </td>
                          {shift.schedule.map((team, teamIndex) => (
                            <td 
                              key={teamIndex}
                              className="p-3 text-center border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800"
                            >
                              <div className={`px-3 py-2 rounded-lg ${getTeamColor(team)} ${getTextColor(team)} font-semibold text-sm shadow-sm hover:shadow-md transition-shadow duration-200`}>
                                {team}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          {/* <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {shiftData.weeks.reduce((total, week) => total + week.shifts.length, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Shifts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {shiftData.teamDetails.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Teams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {shiftData.weeks.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Weeks</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </LocationLayout>
  );
};

export default ShiftRosterCalendar;