import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceNavigation from './attendanceHead';
import { Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MultipleSearchDropdown from '../filtersDetails/muiltipleSearchDropdown';
import { X, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface User {
  id: string;
  name: string;
  role: string;
  status: 'Punch In' | 'Punch Out';
  time: string;
  avatar: string;
  avatarColor: string;
  lat: number;
  lng: number;
}

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get active tab from current path
  const getActiveTabFromPath = () => {
    const path = window.location.pathname;
    if (path.includes('/weekly')) return 'weekly';
    if (path.includes('/map')) return 'map';
    return 'daily';
  };
  
  const [activeTab, setActiveTab] = React.useState(getActiveTabFromPath());
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'daily') {
      navigate('/attendance');
    } else if (tab === 'weekly') {
      navigate('/attendance/weekly');
    } else if (tab === 'map') {
      navigate('/attendance/map');
    }
  };

  const users: User[] = [
    {
      id: '1',
      name: 'User 01',
      role: 'UI UX Designer',
      status: 'Punch In',
      time: '09:30 AM',
      avatar: 'U',
      avatarColor: 'bg-blue-500',
      lat: 12.9239, // Tambaram area
      lng: 80.1439
    },
    {
      id: '2',
      name: 'User 02',
      role: 'Full Stack Developer',
      status: 'Punch In',
      time: '09:32 AM',
      avatar: 'U',
      avatarColor: 'bg-purple-500',
      lat: 12.9205,
      lng: 80.1472
    },
    {
      id: '3',
      name: 'User 03',
      role: 'Backend Developer',
      status: 'Punch Out',
      time: '06:15 PM',
      avatar: 'U',
      avatarColor: 'bg-gray-600',
      lat: 12.9271,
      lng: 80.1408
    },
    {
      id: '3',
      name: 'User 03',
      role: 'Backend Developer',
      status: 'Punch Out',
      time: '06:15 PM',
      avatar: 'U',
      avatarColor: 'bg-gray-600',
      lat: 12.9271,
      lng: 80.1408
    },
    {
      id: '3',
      name: 'User 03',
      role: 'Backend Developer',
      status: 'Punch Out',
      time: '06:15 PM',
      avatar: 'U',
      avatarColor: 'bg-gray-600',
      lat: 12.9271,
      lng: 80.1408
    },
    {
      id: '3',
      name: 'User 03',
      role: 'Backend Developer',
      status: 'Punch Out',
      time: '06:15 PM',
      avatar: 'U',
      avatarColor: 'bg-gray-600',
      lat: 12.9271,
      lng: 80.1408
    }
  ];

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tambaram office boundary polygon (approximate coordinates)
  const officeBoundary = [
    [12.9239, 80.1439],
    [12.9245, 80.1455],
    [12.9230, 80.1460],
    [12.9220, 80.1445],
    [12.9239, 80.1439]
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <AttendanceNavigation activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <div className="space-y-4 sm:space-y-6">
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              Map View Attendance
            </h3>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Card Container (30% width) */}
            <div className="w-full lg:w-5/12 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-fit order-2 lg:order-1">
              <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3">
                  Clock In / Out Data
                </h4>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-xs sm:text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex-1 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 border-2 border-yellow-200 dark:border-yellow-700 rounded-lg p-2 sm:p-3 text-center">
                    <div className="text-xs font-medium text-yellow-700 dark:text-yellow-300 mb-1">Total In</div>
                    <div className="text-base sm:text-lg font-bold text-yellow-800 dark:text-yellow-200">
                      {filteredUsers.filter(u => u.status === 'Punch In').length}
                    </div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border-2 border-red-200 dark:border-red-700 rounded-lg p-2 sm:p-3 text-center">
                    <div className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">Total Out</div>
                    <div className="text-base sm:text-lg font-bold text-red-800 dark:text-red-200">
                      {filteredUsers.filter(u => u.status === 'Punch Out').length}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="p-2 sm:p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" 
                       onClick={() => {/* Could center map on this user */}}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0`}>
                          {user.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.role}
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div className={`flex items-center gap-1 text-xs font-medium ${user.status === 'Punch In' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} mb-0.5 sm:mb-1`}>
                          <div className={`w-1.5 h-1.5 ${user.status === 'Punch In' ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-pulse`}></div>
                          {user.status}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Real Map Container (70% width) */}
            <div className="w-full lg:w-7/12 relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 order-1 lg:order-2" style={{ height: '500px', minHeight: '400px' }}>
              <MapContainer
                center={[12.9239, 80.1439]} // Tambaram coordinates
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Office Boundary Polygon */}
                <Polygon 
                  positions={officeBoundary}
                  pathOptions={{
                    color: '#3b82f6',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.2,
                    weight: 3
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-bold text-blue-600 mb-1">Office Location</h4>
                      <p className="text-sm text-gray-700">Tambaram Office</p>
                    </div>
                  </Popup>
                </Polygon>

                {/* User Markers */}
                {users.map((user) => (
                  <Marker 
                    key={user.id}
                    position={[user.lat, user.lng]}
                  >
                    <Popup>
                      <div className="min-w-64 p-3">
                        <div className={`w-12 h-12 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                          {user.avatar}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{user.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{user.role}</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Punch In' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${user.status === 'Punch In' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          {user.status} • {user.time}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Office Location Marker */}
                <Marker position={[12.9239, 80.1439]}>
                  <Popup>
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <h4 className="font-bold text-lg text-blue-600">Office Location</h4>
                      </div>
                      <p className="text-sm text-gray-700">Tambaram Office</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* Map Controls Overlay */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex flex-col gap-1 sm:gap-2 z-[1000]">
                <button className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300">
                  <span className="text-lg font-bold">−</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;