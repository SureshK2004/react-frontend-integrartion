// components/AssignLocation.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import LocationLayout from './locationLayout';
import { 
  ChevronDown, 
  Check, 
  MapPin, 
  Square, 
  Navigation, 
  X, 
  Copy,
  AlertCircle,
  Calendar,
  Users,
  Building,
  Map
} from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the marker
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Unified Searchable Dropdown Component - Supports both single and multiple selection
const SearchableDropdown = ({
  label,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
  placeholder = "Search and select...",
  multiple = false,
  className = "w-full",
  required = false
}: {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
  required?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelection = (option: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((val: string) => val !== option)
        : [...currentValues, option];
      onChange(newValues);
    } else {
      onChange(option);
      onToggle();
      setSearchTerm('');
    }
  };

  const isSelected = (option: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(option);
    }
    return value === option;
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0 
        ? `${value.length} selected` 
        : placeholder;
    }
    return value && value.toString().trim() !== '' ? value.toString() : placeholder;
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div
          className={`w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 transition-all pr-10 ${
            getDisplayValue() !== placeholder 
              ? 'text-gray-900' 
              : 'text-gray-500 italic'
          }`}
          onClick={onToggle}
        >
          {getDisplayValue()}
          <ChevronDown 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
        
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 italic flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className={`px-4 py-2.5 cursor-pointer text-sm transition-all flex items-center gap-2 ${
                      isSelected(option) 
                        ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-500' 
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                    onClick={() => handleSelection(option)}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected(option)
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-white border-gray-300'
                    }`}>
                      {isSelected(option) && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))
              )}
            </div>
            {multiple && (
              <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                {Array.isArray(value) && `${value.length} selected`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const AssignLocation: React.FC = () => {
  // Form state
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<string>('2025-10-23');
  const [toDate, setToDate] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [locationType, setLocationType] = useState<string>('From Master');
  const [location, setLocation] = useState<string>('');
  
  // Dropdown states
  const [usersDropdownOpen, setUsersDropdownOpen] = useState(false);
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [locationTypeDropdownOpen, setLocationTypeDropdownOpen] = useState(false);

  // Map state
  const [position, setPosition] = useState<[number, number]>([13.0827, 80.2707]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([13.0827, 80.2707]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [polygonPoints, setPolygonPoints] = useState<[number, number][]>([]);
  const [drawMode, setDrawMode] = useState<'marker' | 'polygon'>('marker');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Data lists
  const usersList = [
    'Abbas Ali - DM-06', 'Abinash - 200238', 'Abishek.A - intern-002', 'Akash C - 200261',
    'Anbuselvan - Intern-001', 'Aravindmurali - 200237', 'Aravinth - 200226', 'Arun Prakash - 200240',
    'Dharani - DM056', 'Divya - DM050', 'Donald - DM053', 'Esakkimuthu S - 200244',
    'Girikannan - 200204', 'Hemavathy - 200248', 'John - 200217', 'Karan P - DM054',
    'Kavitha.B - intern-004', 'Lingeshwaran - 200214', 'Logaraman.Kd - intern-003',
    'Malasri P - 200223', 'Mathu - 200201', 'Mohamed Wazeef Khan - DM051', 'Murali - DM052',
    'Nishanth N - 200255', 'Pavendan - DM-62', 'Pon Vasanth V - DM-61', 'Pradeesh - 200262',
    'Rajarajeswari - 200246', 'Ramyaa - 200222', 'Ranjitha R - Intern-006', 'Ravirajan - 200252',
    'Rithick R - 200254', 'Siva - 200216', 'Somasekar - DM-06', 'Sowmiya S - 200249',
    'Sugan - 200242', 'Sunitha Abinaya A - 200259', 'Suresh K - Intern-005',
    'Thirumalaikumar - 200241', 'Velavan - 200239', 'Vignesh - 200247', 'Vinothini - 200201'
  ];

  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Default'];
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'];
  const locationTypes = ['From Master', 'From Map'];

  // Map click handler
  const mapRef = useRef<L.Map | null>(null);
  
  const handleMapClick = useCallback((e: L.LeafletMouseEvent) => {
    if (!mapRef.current || locationType !== 'From Map') return;
    
    if (drawMode === 'marker') {
      const latlng = e.latlng;
      const newPosition: [number, number] = [latlng.lat, latlng.lng];
      
      setPosition(newPosition);
      setSelectedLocation(newPosition);
      setMapCenter(newPosition);
      setLocation(`${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`);
      
      mapRef.current.setView(newPosition, 15);
    } else if (drawMode === 'polygon') {
      const latlng = e.latlng;
      const newPoint: [number, number] = [latlng.lat, latlng.lng];
      
      setPolygonPoints(prev => [...prev, newPoint]);
      
      // Center map on the new point if we have points
      if (polygonPoints.length > 0) {
        mapRef.current.setView(newPoint, mapRef.current.getZoom());
      }
    }
  }, [locationType, drawMode, polygonPoints]);

  // Handle marker drag end
  const handleMarkerDragEnd = useCallback((e: any) => {
    if (locationType !== 'From Map' || drawMode !== 'marker') return;
    
    const marker = e.target;
    const position = marker.getLatLng();
    const newPosition: [number, number] = [position.lat, position.lng];
    
    setPosition(newPosition);
    setSelectedLocation(newPosition);
    setLocation(`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`);
  }, [locationType, drawMode]);

  // Handle created polygon
  const handleCreated = useCallback((e: any) => {
    if (e.layerType === 'polygon') {
      const { layer } = e;
      const latlngs = layer.getLatLngs()[0] as L.LatLng[];
      const points: [number, number][] = latlngs.map(latlng => [latlng.lat, latlng.lng]);
      setPolygonPoints(points);
      
      // Format coordinates for display
      const coordsString = points.map(p => `${p[0].toFixed(6)},${p[1].toFixed(6)}`).join(';');
      setLocation(`Polygon: ${coordsString}`);
    }
  }, []);

  // Handle edited polygon
  const handleEdited = useCallback((e: any) => {
    const { layers } = e;
    layers.eachLayer((layer: any) => {
      if (layer instanceof L.Polygon) {
        const latlngs = layer.getLatLngs()[0] as L.LatLng[];
        const points: [number, number][] = latlngs.map(latlng => [latlng.lat, latlng.lng]);
        setPolygonPoints(points);
        
        // Format coordinates for display
        const coordsString = points.map(p => `${p[0].toFixed(6)},${p[1].toFixed(6)}`).join(';');
        setLocation(`Polygon: ${coordsString}`);
      }
    });
  }, []);

  // Handle deleted polygon
  const handleDeleted = useCallback(() => {
    setPolygonPoints([]);
    setLocation('');
  }, []);

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation && locationType === 'From Map') {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const newPosition: [number, number] = [lat, lng];
          
          setPosition(newPosition);
          setMapCenter(newPosition);
          setSelectedLocation(newPosition);
          setLocation(`Current: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          
          if (mapRef.current) {
            mapRef.current.setView(newPosition, 15);
          }
          setIsGettingLocation(false);
        },
        (error) => {
          alert('Could not get location: ' + error.message);
          setIsGettingLocation(false);
        },
        { timeout: 10000 }
      );
    }
  };

  // Clear polygon
  const clearPolygon = () => {
    setPolygonPoints([]);
    setLocation('');
  };

  // Event handlers for marker
  const eventHandlers = {
    dragend: handleMarkerDragEnd,
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUsersDropdownOpen(false);
      setDepartmentDropdownOpen(false);
      setProjectDropdownOpen(false);
      setLocationTypeDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Reset map state when location type changes
  useEffect(() => {
    if (locationType === 'From Master') {
      setSelectedLocation(null);
      setPolygonPoints([]);
      setLocation('');
      setDrawMode('marker');
    }
  }, [locationType]);

  // Handle form submission
  const handleSubmit = () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user');
      return;
    }
    if (!fromDate || !toDate) {
      alert('Please select both from and to dates');
      return;
    }
    if (!projectName) {
      alert('Please select a project');
      return;
    }
    if (!location) {
      alert('Please select a location');
      return;
    }

    // Submit logic here
    console.log({
      selectedDepartment,
      selectedUsers,
      fromDate,
      toDate,
      projectName,
      locationType,
      location,
      coordinates: drawMode === 'marker' ? selectedLocation : polygonPoints
    });

    alert(`Location assigned to ${selectedUsers.length} users successfully!`);
  };

  return (
    <LocationLayout>
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            
            {/* Left Side - Form Fields - Reduced Height */}
            <div className="space-y-3 bg-white p-5 rounded-2xl shadow-xl border border-gray-200 max-h-[70vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Map className="h-5 w-5" />
                Assign Location
              </h2>
              
              {/* Row 1: Department + Users */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SearchableDropdown
                  label="Department"
                  options={departments}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                  isOpen={departmentDropdownOpen}
                  onToggle={(e) => {
                    e?.stopPropagation();
                    setDepartmentDropdownOpen(!departmentDropdownOpen);
                  }}
                  placeholder="Search department..."
                />
                <SearchableDropdown
                  label="Users list"
                  options={usersList}
                  value={selectedUsers}
                  onChange={setSelectedUsers}
                  isOpen={usersDropdownOpen}
                  onToggle={(e) => {
                    e?.stopPropagation();
                    setUsersDropdownOpen(!usersDropdownOpen);
                  }}
                  multiple={true}
                  required={true}
                  placeholder="Select users..."
                />
              </div>

              {/* Row 2: From Date + To Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    From Date *
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    To Date *
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Row 3: Project + Location Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <SearchableDropdown
                  label="Project name"
                  options={projects}
                  value={projectName}
                  onChange={setProjectName}
                  isOpen={projectDropdownOpen}
                  onToggle={(e) => {
                    e?.stopPropagation();
                    setProjectDropdownOpen(!projectDropdownOpen);
                  }}
                  required={true}
                  placeholder="Search project..."
                />
                <SearchableDropdown
                  label="Type of select location"
                  options={locationTypes}
                  value={locationType}
                  onChange={setLocationType}
                  isOpen={locationTypeDropdownOpen}
                  onToggle={(e) => {
                    e?.stopPropagation();
                    setLocationTypeDropdownOpen(!locationTypeDropdownOpen);
                  }}
                  required={true}
                  placeholder="Select location type..."
                />
              </div>

              {/* Draw Mode Selection */}
              {locationType === 'From Map' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Draw Mode</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDrawMode('marker')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        drawMode === 'marker'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                      Marker
                    </button>
                    <button
                      onClick={() => setDrawMode('polygon')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        drawMode === 'polygon'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Square className="h-4 w-4" />
                      Polygon
                    </button>
                  </div>
                </div>
              )}

              {/* Row 4: Location */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Location *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={drawMode === 'polygon' ? "Draw polygon on map" : "Enter location or click map"}
                    className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly={locationType === 'From Map'}
                  />
                  {locationType === 'From Map' && drawMode === 'marker' && (
                    <button
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="px-3 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Get current location"
                    >
                      <Navigation className={`h-4 w-4 ${isGettingLocation ? 'animate-pulse' : ''}`} />
                    </button>
                  )}
                  {locationType === 'From Map' && drawMode === 'polygon' && polygonPoints.length > 0 && (
                    <button
                      onClick={clearPolygon}
                      className="px-3 p-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center"
                      title="Clear polygon"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {locationType === 'From Map' && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {drawMode === 'marker' 
                      ? 'Click on the map to place a marker, then drag it to adjust position'
                      : 'Use drawing tools to create a polygon area'
                    }
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSubmit}
                disabled={selectedUsers.length === 0}
                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4" />
                Assign Location ({selectedUsers.length} users)
              </button>
            </div>

            {/* Right Side - Reduced Map Height */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden xl:col-span-1 max-h-[70vh]">
              <div className="bg-blue-600 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Map className="h-5 w-5" />
                      Interactive Map
                    </h3>
                    <p className="text-xs text-blue-100">
                      {locationType === 'From Map' 
                        ? drawMode === 'marker' 
                          ? 'Click to place marker, then drag to adjust'
                          : 'Use drawing tools to create polygon'
                        : 'Select "From Map" to enable map interactions'
                      }
                    </p>
                  </div>
                  <button
                    onClick={getCurrentLocation}
                    disabled={locationType !== 'From Map' || drawMode !== 'marker' || isGettingLocation}
                    className="bg-green-600 hover:font-extraboldbold hover:bg-green-700 hover:shadow-sm text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Navigation className={`h-3 w-3 ${isGettingLocation ? 'animate-pulse' : ''}`} />
                    My Location
                  </button>
                </div>
              </div>
              
              <div className="relative h-[450px]">
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                  whenCreated={(map) => {
                    mapRef.current = map;
                    map.on('click', handleMapClick);
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <FeatureGroup>
                    {locationType === 'From Map' && drawMode === 'polygon' && (
                      <EditControl
                        position="topright"
                        onCreated={handleCreated}
                        onEdited={handleEdited}
                        onDeleted={handleDeleted}
                        draw={{
                          rectangle: false,
                          circle: false,
                          circlemarker: false,
                          marker: false,
                          polyline: false,
                          polygon: {
                            allowIntersection: false,
                            drawError: {
                              color: '#e1e100',
                              message: '<strong>Error:</strong> Shape edges cannot cross!'
                            },
                            shapeOptions: {
                              color: '#3b82f6',
                              weight: 3,
                              opacity: 0.8,
                              fill: true,
                              fillColor: '#3b82f6',
                              fillOpacity: 0.3
                            }
                          }
                        }}
                      />
                    )}
                  </FeatureGroup>
                  
                  {selectedLocation && drawMode === 'marker' && (
                    <Marker 
                      position={selectedLocation} 
                      icon={customIcon}
                      draggable={locationType === 'From Map'}
                      eventHandlers={eventHandlers}
                    >
                      <Popup>
                        <div className="font-bold text-blue-800 text-sm">Selected Location</div>
                        <div className="text-xs">Lat: {selectedLocation[0].toFixed(6)}</div>
                        <div className="text-xs">Lng: {selectedLocation[1].toFixed(6)}</div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${selectedLocation[0]}, ${selectedLocation[1]}`);
                            alert('Coordinates copied to clipboard!');
                          }}
                          className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 w-full flex items-center justify-center gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copy Coordinates
                        </button>
                      </Popup>
                    </Marker>
                  )}
                  
                  {polygonPoints.length > 0 && drawMode === 'polygon' && (
                    <Polygon
                      positions={polygonPoints}
                      pathOptions={{
                        color: '#3b82f6',
                        weight: 3,
                        opacity: 0.8,
                        fill: true,
                        fillColor: '#3b82f6',
                        fillOpacity: 0.3
                      }}
                    />
                  )}
                </MapContainer>
                
                {locationType === 'From Map' && (
                  <div className="absolute top-3 left-3 bg-white bg-opacity-95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        drawMode === 'marker' && selectedLocation 
                          ? 'bg-green-500'
                          : drawMode === 'polygon' && polygonPoints.length > 0
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                      }`}></div>
                      <span className="text-xs font-semibold text-gray-800">
                        {drawMode === 'marker' ? 'Marker Mode' : 'Polygon Mode'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-700">
                      {drawMode === 'marker' && selectedLocation
                        ? `${selectedLocation[0].toFixed(6)}, ${selectedLocation[1].toFixed(6)}`
                        : drawMode === 'polygon' && polygonPoints.length > 0
                        ? `${polygonPoints.length} points`
                        : 'No selection'
                      }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocationLayout>
  );
};

export default AssignLocation;