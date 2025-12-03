// components/TripTrackingMap.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationLayout from './locationLayout';
import CommonFilters, { FilterConfig } from '../filtersDetails/filters';
import { MapPin, ArrowLeft, Filter } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface TripMarker {
  id: string;
  lat: number;
  lng: number;
  employeeId: string;
  name: string;
  status: 'Active' | 'Completed' | 'Cancelled';
  avatar: string;
  avatarColor: string;
}

const TripTrackingMap: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [markers, setMarkers] = useState<TripMarker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Sample trip data with coordinates
  const sampleMarkers: TripMarker[] = [
    {
      id: '1',
      lat: 28.6139,
      lng: 77.2090,
      employeeId: 'DM 0001',
      name: 'Abinash Kumar',
      status: 'Active',
      avatar: 'A',
      avatarColor: 'bg-green-500'
    },
    {
      id: '2',
      lat: 28.7041,
      lng: 77.1025,
      employeeId: 'DM 0002',
      name: 'Ashok Patel',
      status: 'Completed',
      avatar: 'A',
      avatarColor: 'bg-orange-500'
    },
    {
      id: '3',
      lat: 28.5355,
      lng: 77.3910,
      employeeId: 'DM 0003',
      name: 'Akash Singh',
      status: 'Active',
      avatar: 'A',
      avatarColor: 'bg-blue-500'
    },
    {
      id: '4',
      lat: 28.4595,
      lng: 77.0266,
      employeeId: 'DM 0004',
      name: 'Kumar Reddy',
      status: 'Completed',
      avatar: 'K',
      avatarColor: 'bg-purple-500'
    },
    {
      id: '5',
      lat: 28.6619,
      lng: 77.2280,
      employeeId: 'DM 0005',
      name: 'Sugan Raj',
      status: 'Cancelled',
      avatar: 'S',
      avatarColor: 'bg-yellow-500'
    }
  ];

  useEffect(() => {
    if (mapContainerRef.current && !map) {
      // Initialize Leaflet map
      const newMap = L.map(mapContainerRef.current).setView([28.6139, 77.2090], 11);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMap);

      setMap(newMap);
      mapRef.current = newMap;

      // Add markers
      sampleMarkers.forEach(markerData => {
        addMarker(newMap, markerData);
      });

      // Fit bounds to show all markers
      if (sampleMarkers.length > 0) {
        const group = new L.FeatureGroup(sampleMarkers.map(m => 
          L.marker([m.lat, m.lng])
        ));
        newMap.fitBounds(group.getBounds().pad(0.1));
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const addMarker = (mapInstance: L.Map, markerData: TripMarker) => {
    const statusColors: Record<string, string> = {
      'Active': '#10B981',
      'Completed': '#3B82F6',
      'Cancelled': '#EF4444'
    };

    const customIcon = L.divIcon({
      className: 'custom-trip-marker',
      html: `
        <div class="relative">
          <div class="w-12 h-12 rounded-full ${markerData.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white">
            ${markerData.avatar}
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-3 border-white ${getStatusDotColor(markerData.status)} shadow-lg"></div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48]
    });

    const marker = L.marker([markerData.lat, markerData.lng], { icon: customIcon })
      .bindPopup(`
        <div class="p-4 min-w-[300px] rounded-xl shadow-xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-full ${markerData.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg">
              ${markerData.avatar}
            </div>
            <div>
              <h4 class="font-bold text-lg text-gray-900">${markerData.name}</h4>
              <p class="text-sm text-gray-600">${markerData.employeeId}</p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(markerData.status)}">
              ${markerData.status}
            </span>
            <button onclick="window.open('/trip-details/${markerData.id}', '_blank')" 
                    class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-sm">
              View Trip
            </button>
          </div>
        </div>
      `)
      .addTo(mapInstance);

    // Add click handler for navigation
    marker.on('click', () => {
      navigate(`/trip-details/${markerData.id}`);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-full';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-full';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-blue-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleFilterChange = (filters: any) => {
    console.log('Map filters changed:', filters);
    // Implement map filter logic here
  };

  const handleSearch = (query: string) => {
    console.log('Map search query:', query);
    // Implement map search logic here
  };

  const handleRefresh = () => {
    console.log('Map refresh clicked');
    // Implement map refresh logic here
  };

  const mapFilterConfig: FilterConfig = {
    showUserType: true,
    showDepartment: true,
    showZone: true,
    showBranch: true,
    showFromDate: true,
    showToDate: true,
    showFilterForm: true,
    showColumnSelector: false, // Hide column selector for map
    showStatus: true,
    showTotalHours: true,
    showDesignation: true,
    onFilterChange: handleFilterChange,
    onSearch: handleSearch,
    onRefresh: handleRefresh,
    labels: {
      searchPlaceholder: "Search trips on map"
    }
  };

  return (
    <LocationLayout>
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/trip-tracking')}
            className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h2 className="text-3xl font-bold bg-primary dark:white bg-clip-text text-transparent">
              Trip Tracking Map
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time location tracking of all active trips
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CommonFilters config={mapFilterConfig} showTopFilters={true} />
        </div>

        {/* Map Container */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div 
            ref={mapContainerRef}
            className="w-full h-[70vh] min-h-[500px]"
            style={{ minHeight: '70vh' }}
          />
          {/* <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <span>{markers.length} active trips</span>
            </div>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .custom-trip-marker {
          background: transparent;
          border: none;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0,0, 0.1) !important;
        }
        .leaflet-popup-tip {
          box-shadow: 0 10px 15px -3px rgba(0, 0,0, 0.1) !important;
        }
      `}</style>
    </LocationLayout>
  );
};

export default TripTrackingMap;