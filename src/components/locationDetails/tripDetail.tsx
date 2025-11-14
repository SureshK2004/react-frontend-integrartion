// components/TripDetails.tsx - UPDATED WITH EXPORT COMPONENT
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  DollarSign,
  Activity,
  ChevronLeft,
  Play,
  Pause,
  Zap,
  Map as MapIcon,
  Truck,
  Eye,
  MoreHorizontal,
  Timer,
  Calendar,
} from "lucide-react";
import LocationLayout from "./locationLayout";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ExportComponent from "../exportOption/exportTo";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Updated sample data with Trip Information table data
const sampleTrip = {
  id: "1",
  employeeId: "DM 0001",
  name: "Arun Prakash",
  date: "22-10-2025",
  startTime: "09:30 AM",
  endTime: "05:45 PM",
  distance: "45.2 km",
  status: "Active",
  avatar: "A",
  avatarColor: "bg-green-500",

  // NEW: Trip Information Datatable
  tripInfoData: [
    {
      date: "22-10-2025",
      distance: "45.2 km",
      amount: "₹4,150",
      totalLocations: "5",
      assigned: "3",
      unassigned: "2",
      newLead: "1",
      action: "View",
    },
    {
      date: "21-10-2025",
      distance: "32.8 km",
      amount: "₹2,850",
      totalLocations: "4",
      assigned: "4",
      unassigned: "0",
      newLead: "0",
      action: "View",
    },
    {
      date: "20-10-2025",
      distance: "58.1 km",
      amount: "₹6,200",
      totalLocations: "7",
      assigned: "5",
      unassigned: "2",
      newLead: "2",
      action: "View",
    },
    {
      date: "19-10-2025",
      distance: "24.5 km",
      amount: "₹1,980",
      totalLocations: "3",
      assigned: "2",
      unassigned: "1",
      newLead: "1",
      action: "View",
    },
    {
      date: "18-10-2025",
      distance: "67.3 km",
      amount: "₹7,450",
      totalLocations: "8",
      assigned: "6",
      unassigned: "2",
      newLead: "3",
      action: "View",
    },
  ],

  expenses: [
    {
      id: "1",
      category: "Fuel",
      amount: "₹2500",
      date: "22-10-2025",
      status: "Approved",
    },
    {
      id: "2",
      category: "Toll",
      amount: "₹450",
      date: "22-10-2025",
      status: "Pending",
    },
    {
      id: "3",
      category: "Food",
      amount: "₹1200",
      date: "22-10-2025",
      status: "Approved",
    },
  ],
  trackingData: [
    {
      time: "09:30 AM",
      location: "Office HQ",
      lat: 12.9716,
      lng: 77.5946,
      status: "Start",
    },
    {
      time: "10:15 AM",
      location: "Checkpoint 1",
      lat: 12.9816,
      lng: 77.6046,
      status: "En Route",
    },
    {
      time: "11:30 AM",
      location: "Rest Stop",
      lat: 13.0016,
      lng: 77.6246,
      status: "Break",
    },
    {
      time: "02:45 PM",
      location: "Client Site",
      lat: 13.0216,
      lng: 77.6446,
      status: "Arrived",
    },
    {
      time: "05:45 PM",
      location: "Office HQ",
      lat: 12.9716,
      lng: 77.5946,
      status: "End",
    },
  ],
  liveTracking: {
    status: "Idle",
    idleTime: "3 hours 25 minutes seconds",
    startTime: "9:38:33",
    endTime: "13:3:33",
    duration: "3 hours 25 minutes seconds",
    location:
      "முத்து டிரைவர் 🚛PFV6+MX8, 4/156, யாதவர் தெரு, பள்ளக்கால் பொதுக்குடி, தமிழ் நாடு 627413, India",
    totalHours: "3:25:00",
    spendTime: "00:00",
    currentLocation: { lat: 12.985, lng: 77.61 },
  },
};

const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"trip" | "expenses" | "tracking">(
    "trip"
  );

  const trip = sampleTrip;

  const tabs = [
    { id: "trip" as const, label: `Trip Details`, icon: MapPin },
    { id: "expenses" as const, label: "Expense Details", icon: DollarSign },
    {
      id: "tracking" as const,
      label: "Live Tracking Timeline",
      icon: Activity,
    },
  ];

  // FIXED MAP - Always visible, never scrolls
  const FixedMapView = () => {
    const center = [12.9716, 77.5946] as [number, number];
    const routeCoordinates = [
      [12.9716, 77.5946],
      [12.9816, 77.6046],
      [13.0016, 77.6246],
      [13.0216, 77.6446],
      [12.9716, 77.5946],
    ] as [number, number][];

    return (
      <div className="h-[500px] w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="p-3 bg-primary text-white">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white/20 rounded-lg">
              <MapIcon className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Live Map Tracking</h3>
              <p className="text-xs opacity-90">{trip.distance} covered</p>
            </div>
          </div>
        </div>
        <div className="h-[calc(100%-48px)]">
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline
              positions={routeCoordinates}
              color="#10B981"
              weight={6}
              opacity={0.9}
              dashArray="12, 8"
            />
            <Marker position={[12.9716, 77.5946] as [number, number]}>
              <Popup>Office HQ - Start</Popup>
            </Marker>
            <Marker position={[13.0216, 77.6446] as [number, number]}>
              <Popup>Client Site - End</Popup>
            </Marker>
            <Marker
              position={
                [
                  trip.liveTracking.currentLocation.lat,
                  trip.liveTracking.currentLocation.lng,
                ] as [number, number]
              }
            >
              <Popup>
                <div className="min-w-[200px] p-3">
                  <h4 className="font-bold text-sm mb-1">Live Location</h4>
                  <p className="text-xs text-red-600 font-semibold">
                    {trip.liveTracking.status}
                  </p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
  };

  // UPDATED: Trip Information Datatable WITH EXPORT COMPONENT
  const TripInformationTable = () => (
    <div className="space-y-4 p-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-primary p-4 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Trip Information
          </h3>
        </div>
        <div className="p-4 flex items-center justify-end space-x-2">
          <div className="flex items-center">
            <ExportComponent
              tableId="trip-information-table"
              filename="trip_information"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table id="trip-information-table" className="w-full min-w-[800px]">
            {/* Set minimum width for proper column sizing + tableId for export */}
            <thead className="">
              <tr className="bg-primary dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 sticky top-0 z-10">
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[90px] w-[90px]">
                  Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[80px] w-[80px]">
                  Distance
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[85px] w-[85px]">
                  Amount
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[110px] w-[110px]">
                  Locations
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[75px] w-[75px] text-center">
                  Assigned
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[85px] w-[85px] text-center">
                  Unassigned
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[70px] w-[70px] text-center">
                  New Lead
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[80px] w-[80px] text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trip.tripInfoData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white truncate max-w-[90px]">
                    {row.date}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 dark:text-gray-300 truncate max-w-[80px]">
                    {row.distance}
                  </td>
                  <td className="px-3 py-3 font-bold text-base text-emerald-600 truncate max-w-[85px]">
                    {row.amount}
                  </td>
                  <td className="px-3 py-3 font-semibold text-sm text-blue-600 truncate max-w-[110px]">
                    {row.totalLocations}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full dark:bg-green-900 dark:text-green-200 inline-block min-w-[24px]">
                      {row.assigned}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full dark:bg-orange-900 dark:text-orange-200 inline-block min-w-[24px]">
                      {row.unassigned}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full dark:bg-purple-900 dark:text-purple-200 inline-block min-w-[24px]">
                      {row.newLead}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button  onClick={() => navigate("/manage/trip-details")}
                      className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md w-full min-w-[60px] h-[32px]"
                      title="View Details"
                    >
                      <Eye className="w-3 h-3 flex-shrink-0" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Summary Cards - Alternative view for small screens */}
        <div className="block lg:hidden p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Summary
          </h4>
          {trip.tripInfoData.slice(0, 3).map((row, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-2 last:mb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {row.date}
                </span>
                <span className="font-bold text-lg text-emerald-600">
                  {row.amount}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div>{row.distance}</div>
                <div>{row.totalLocations} loc.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ENHANCED: Live Tracking Timeline - Minimal UI with more data
 const LiveTrackingTimeline = () => {
  // Sample data structure based on the image
  const trackingData = [
    {
      type: "trip",
      title: "A Trip A to B",
      startTime: "9:6:2",
      endTime: "9:9:7",
      distance: "0.89 km",
      startLocation: "PC6C+GMV, Bharathidasan St, Pattamadai, Tamil Nadu 627428, India",
      endLocation: "PC6C+GMV, Bharathidasan St, Pattamadai, Tamil Nadu 627428, India"
    },
    {
      type: "idle",
      title: "Idle Idle Time",
      startTime: "9:9:7",
      endTime: "9:15:3",
      duration: "0 hours 5 minutes seconds",
      location: "PC6C+GMV, Bharathidasan St, Pattamadai, Tamil Nadu 627428, India"
    },
    {
      type: "trip",
      title: "B Trip B to C",
      startTime: "9:15:3",
      endTime: "9:25:1",
      distance: "1.2 km",
      startLocation: "PC6C+GMV, Bharathidasan St, Pattamadai, Tamil Nadu 627428, India",
      endLocation: "XYZ Location, Tamil Nadu, India"
    }
  ];

  return (
    <div className="space-y-6 p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Live Tracking Timeline
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Tamil Nadu 627428, India
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="space-y-6 relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          
          {trackingData.map((event, index) => (
            <div key={index} className="relative flex">
              {/* Timeline dot */}
              <div className={`absolute left-6 w-3 h-3 rounded-full -translate-x-1/2 z-10 ${
                event.type === "trip" ? "bg-blue-500" : "bg-yellow-500"
              }`}></div>
              
              {/* Content */}
              <div className="ml-10 flex-1">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Start Time:</span>
                      <span className="ml-1 text-gray-900 dark:text-white">{event.startTime}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">End Time:</span>
                      <span className="ml-1 text-gray-900 dark:text-white">{event.endTime}</span>
                    </div>
                    
                    {event.type === "trip" ? (
                      <>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Distance:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">{event.distance}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Start:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">{event.startLocation}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">End:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">{event.endLocation}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">{event.duration}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Location:</span>
                          <span className="ml-1 text-gray-900 dark:text-white">{event.location}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

  // UPDATED: ExpensesTable with new columns and matching Trip Info UI
  const ExpensesTable = () => (
    <div className="space-y-4 p-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-primary p-4 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Expense Details
          </h3>
        </div>
        <div className="p-4 flex items-center justify-end space-x-2">
          <div className="flex items-center text-sm [&_svg]:w-4 [&_svg]:h-4">
            <ExportComponent
              tableId="expense-information-table"
              filename="expense_information"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table
            id="expense-information-table"
            className="w-full min-w-[1000px]"
          >
            {/* Set minimum width for proper column sizing + tableId for export */}
            <thead className="">
              <tr className="bg-primary dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 sticky top-0 z-10">
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[120px] w-[120px]">
                  Category
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[100px] w-[100px]">
                  Type
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[90px] w-[90px]">
                  Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[90px] w-[90px]">
                  Amount
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[110px] w-[110px]">
                  Distance(km)
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[120px] w-[120px]">
                  Final Amount
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[100px] w-[100px]">
                  Bill Image
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[120px] w-[120px]">
                  Description
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-white dark:text-white uppercase tracking-wider min-w-[90px] w-[90px] text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {trip.expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                    {expense.category}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                    Fuel Purchase
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white truncate max-w-[90px]">
                    {expense.date}
                  </td>
                  <td className="px-3 py-3 font-bold text-base text-emerald-600 truncate max-w-[90px]">
                    {expense.amount}
                  </td>
                  <td className="px-3 py-3 font-semibold text-sm text-blue-600 truncate max-w-[110px]">
                    45.2 km
                  </td>
                  <td className="px-3 py-3 font-bold text-lg text-emerald-700 truncate max-w-[120px]">
                    ₹2,450
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md w-full min-w-[70px] h-[32px]">
                      <Eye className="w-3 h-3 flex-shrink-0" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                    Emergency fuel fill-up during client visit
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        expense.status === "Approved"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                      } inline-block min-w-[60px]`}
                    >
                      {expense.status}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Add more sample rows for better demo */}
              <tr className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                  Toll
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                  Highway Toll
                </td>
                <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white truncate max-w-[90px]">
                  22-10-2025
                </td>
                <td className="px-3 py-3 font-bold text-base text-emerald-600 truncate max-w-[90px]">
                  ₹450
                </td>
                <td className="px-3 py-3 font-semibold text-sm text-blue-600 truncate max-w-[110px]">
                  32.8 km
                </td>
                <td className="px-3 py-3 font-bold text-lg text-emerald-700 truncate max-w-[120px]">
                  ₹450
                </td>
                <td className="px-3 py-2 text-center">
                  <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md w-full min-w-[70px] h-[32px]">
                    <Eye className="w-3 h-3 flex-shrink-0" />
                    <span className="hidden sm:inline">View</span>
                  </button>
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                  Electronic toll plaza charge
                </td>
                <td className="px-3 py-2 text-center">
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full dark:bg-amber-900 dark:text-amber-200 inline-block min-w-[60px]">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Summary Cards - Alternative view for small screens */}
        <div className="block lg:hidden p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Quick Summary
          </h4>
          {trip.expenses.slice(0, 3).map((expense, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-2 last:mb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {expense.category}
                </span>
                <span className="font-bold text-lg text-emerald-600">
                  {expense.amount}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div>{expense.date}</div>
                <div>{expense.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "trip":
        return <TripInformationTable />;
      case "expenses":
        return <ExpensesTable />;
      case "tracking":
        return <LiveTrackingTimeline />;
      default:
        return null;
    }
  };

  return (
    <LocationLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 mb-6 text-sm font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Trips</span>
        </button>

        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10" />
            <div className="relative z-10 flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-xl ${trip.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-2xl ring-4 ring-white/30`}
              >
                {trip.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-black leading-tight mb-1">
                  {trip.name}
                </h1>
                <p className="text-xs opacity-90">
                  Employee ID: {trip.employeeId}
                </p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    trip.status === "Active"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-gray-400"
                  }`}
                />
                <span className="font-semibold text-xs">{trip.status}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-white/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <nav className="-mb-px flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 px-4 py-3 text-sm font-semibold transition-all duration-300 group ${
                    activeTab === tab.id
                      ? "text-primary bg-white/20 backdrop-blur-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/30"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-1.5 inline group-hover:scale-110 transition-transform" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full shadow-md" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Fixed Map + Scrollable Content */}
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div className="lg:sticky lg:top-4 lg:self-start h-[500px] lg:h-auto">
                <FixedMapView />
              </div>
              <div className="h-screen lg:h-[600px] overflow-y-auto pr-0 lg:pr-6 pb-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 min-h-full">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocationLayout>
  );
};

export default TripDetails;