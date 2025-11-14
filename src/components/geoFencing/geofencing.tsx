import React, { useState, useEffect, useRef } from 'react';
import GeoFencingHeader from './geoFencingHeader';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MultipleSearchDropdown from '../filtersDetails/muiltipleSearchDropdown';
import { X, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import ExportComponent from '../exportOption/exportTo';

const GeoFencing = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [geofences, setGeofences] = useState([
    {
      id: 1,
      name: 'Zone 1',
      location: ['London Central'],
      coordinates: [
        [51.505, -0.09],
        [51.51, -0.09],
        [51.51, -0.08],
        [51.505, -0.08],
      ],
      status: 'Active',
    },
    {
      id: 2,
      name: 'Zone 2',
      location: ['London West'],
      coordinates: [
        [51.50, -0.07],
        [51.505, -0.07],
        [51.505, -0.06],
        [51.50, -0.06],
      ],
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Zone 3',
      location: ['London East'],
      coordinates: [
        [51.49, -0.05],
        [51.495, -0.05],
        [51.495, -0.04],
        [51.49, -0.04],
      ],
      status: 'Active',
    },
    {
      id: 4,
      name: 'Zone 4',
      location: ['London North'],
      coordinates: [
        [51.515, -0.07],
        [51.52, -0.07],
        [51.52, -0.06],
        [51.515, -0.06],
      ],
      status: 'Inactive',
    },
    {
      id: 5,
      name: 'Zone 5',
      location: ['London South'],
      coordinates: [
        [51.485, -0.09],
        [51.49, -0.09],
        [51.49, -0.08],
        [51.485, -0.08],
      ],
      status: 'Active',
    },
  ]);

  // Add Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [coordinatePoints, setCoordinatePoints] = useState<{ id: number; lat: string; lng: string }[]>([]);
  const [nextCoordId, setNextCoordId] = useState(0);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  // Edit Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAnimateOut, setEditAnimateOut] = useState(false);
  const [editingGeofence, setEditingGeofence] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editSelectedLocations, setEditSelectedLocations] = useState<string[]>([]);
  const [editCoordinatePoints, setEditCoordinatePoints] = useState<{ id: number; lat: string; lng: string }[]>([]);
  const [editNextCoordId, setEditNextCoordId] = useState(0);
  const [editLocationDropdownOpen, setEditLocationDropdownOpen] = useState(false);
  const [editError, setEditError] = useState('');

  const locationOptions = [
    'London Central',
    'London West',
    'London East',
    'London North',
    'London South',
  ];

  // Add Modal Functions
  const openAddModal = () => {
    setNewName('');
    setSelectedLocations([]);
    setCoordinatePoints([]);
    setNextCoordId(0);
    setError('');
    setLocationDropdownOpen(false);
    setIsModalOpen(true);
    setAnimateOut(false);
  };

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setAnimateOut(false);
    }, 300);
  };

  const addCoordinate = () => {
    const newId = nextCoordId;
    setNextCoordId((prev) => prev + 1);
    setCoordinatePoints((prev) => [...prev, { id: newId, lat: '', lng: '' }]);
    setError('');
  };

  const addDefaultCoordinates = () => {
    const baseId = nextCoordId;
    setNextCoordId((prev) => prev + 4);
    setCoordinatePoints([
      { id: baseId, lat: '51.505', lng: '-0.09' },
      { id: baseId + 1, lat: '51.51', lng: '-0.09' },
      { id: baseId + 2, lat: '51.51', lng: '-0.08' },
      { id: baseId + 3, lat: '51.505', lng: '-0.08' },
    ]);
    setError('');
  };

  const updateCoordinate = (id: number, field: 'lat' | 'lng', value: string) => {
    setCoordinatePoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    setError('');
  };

  const removeCoordinate = (id: number) => {
    setCoordinatePoints((prev) => prev.filter((p) => p.id !== id));
    setError('');
  };

  const saveGeofence = () => {
    if (!newName.trim()) {
      setError('Geofence name is required');
      return;
    }
    if (coordinatePoints.length < 3) {
      setError('At least 3 coordinate points are required to form a polygon');
      return;
    }
    const invalid = coordinatePoints.find(
      (p) => !p.lat.trim() || !p.lng.trim() || isNaN(Number(p.lat)) || isNaN(Number(p.lng))
    );
    if (invalid) {
      setError('All latitude and longitude values must be valid numbers');
      return;
    }
    const coords: [number, number][] = coordinatePoints.map((p) => [Number(p.lat), Number(p.lng)]);
    const newId = geofences.length > 0 ? Math.max(...geofences.map((g) => g.id)) + 1 : 1;
    const newGeofence = {
      id: newId,
      name: newName.trim(),
      location: selectedLocations,
      coordinates: coords,
      status: 'Active' as const,
    };
    setGeofences((prev) => [...prev, newGeofence]);
    handleClose();
  };

  // Edit Modal Functions
  const openEditModal = (geofence: any) => {
    setEditingGeofence(geofence);
    setEditName(geofence.name);
    setEditSelectedLocations(geofence.location || []);
    setEditCoordinatePoints(
      geofence.coordinates.map((coord: [number, number], index: number) => ({
        id: index,
        lat: coord[0].toString(),
        lng: coord[1].toString(),
      }))
    );
    setEditNextCoordId(geofence.coordinates.length);
    setEditError('');
    setEditLocationDropdownOpen(false);
    setEditModalOpen(true);
    setEditAnimateOut(false);
  };

  const handleEditClose = () => {
    setEditAnimateOut(true);
    setTimeout(() => {
      setEditModalOpen(false);
      setEditAnimateOut(false);
      setEditingGeofence(null);
    }, 300);
  };

  const addEditCoordinate = () => {
    const newId = editNextCoordId;
    setEditNextCoordId((prev) => prev + 1);
    setEditCoordinatePoints((prev) => [...prev, { id: newId, lat: '', lng: '' }]);
    setEditError('');
  };

  const addDefaultEditCoordinates = () => {
    const baseId = editNextCoordId;
    setEditNextCoordId((prev) => prev + 4);
    setEditCoordinatePoints([
      { id: baseId, lat: '51.505', lng: '-0.09' },
      { id: baseId + 1, lat: '51.51', lng: '-0.09' },
      { id: baseId + 2, lat: '51.51', lng: '-0.08' },
      { id: baseId + 3, lat: '51.505', lng: '-0.08' },
    ]);
    setEditError('');
  };

  const updateEditCoordinate = (id: number, field: 'lat' | 'lng', value: string) => {
    setEditCoordinatePoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    setEditError('');
  };

  const removeEditCoordinate = (id: number) => {
    setEditCoordinatePoints((prev) => prev.filter((p) => p.id !== id));
    setEditError('');
  };

  const saveEditGeofence = () => {
    if (!editName.trim()) {
      setEditError('Geofence name is required');
      return;
    }
    if (editCoordinatePoints.length < 3) {
      setEditError('At least 3 coordinate points are required to form a polygon');
      return;
    }
    const invalid = editCoordinatePoints.find(
      (p) => !p.lat.trim() || !p.lng.trim() || isNaN(Number(p.lat)) || isNaN(Number(p.lng))
    );
    if (invalid) {
      setEditError('All latitude and longitude values must be valid numbers');
      return;
    }

    const coords: [number, number][] = editCoordinatePoints.map((p) => [Number(p.lat), Number(p.lng)]);
    
    setGeofences((prev) =>
      prev.map((gf) =>
        gf.id === editingGeofence?.id
          ? { ...gf, name: editName.trim(), location: editSelectedLocations, coordinates: coords }
          : gf
      )
    );
    handleEditClose();
  };

  // Delete function
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this geofence? This action cannot be undone.')) {
      setGeofences((prev) => prev.filter((gf) => gf.id !== id));
      // Reset to first page if deleting the last item on current page
      if (geofences.length % itemsPerPage === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setLocationDropdownOpen(false);
      setError('');
    }
  }, [isModalOpen]);

  const totalPages = Math.ceil(geofences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGeofences = geofences.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const MapEffect = () => {
    const map = useMap();
    useEffect(() => {
      map.setView([51.505, -0.09], 13);
    }, [map]);
    return null;
  };

  const columns = [
    { key: 'id' as const, label: 'ID', sortable: true },
    { key: 'name' as const, label: 'Name', sortable: true },
    { key: 'location' as const, label: 'Location', sortable: false },
    { key: 'status' as const, label: 'Status', sortable: false },
    { key: 'actions' as const, label: 'Actions', sortable: false },
  ];

  const CoordinateInputs = ({ points, onUpdate, onRemove, nextId, onAdd, onAddDefault }: any) => (
    <div className="space-y-4">
      {points.map((point: any) => (
        <div
          key={point.id}
          className="group flex items-center gap-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g., 51.505"
                value={point.lat}
                onChange={(e) => onUpdate(point.id, 'lat', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-600/50 dark:border-gray-600 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="e.g., -0.09"
                value={point.lng}
                onChange={(e) => onUpdate(point.id, 'lng', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-600/50 dark:border-gray-600 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => onRemove(point.id)}
            className="p-2 ml-2 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      {points.length < 3 && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800/50 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded-lg shadow-sm">
          <span className="font-medium">Note:</span> Add at least <strong>3 points</strong> to create a valid polygon.
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 min-h-screen">
        <GeoFencingHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Geo Fencing</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Map Section - Left Side */}
          <div className="w-full md:w-1/2 h-[500px] border rounded-lg overflow-hidden">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <MapEffect />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {geofences.map((geofence) => (
                <Polygon
                  key={geofence.id}
                  positions={geofence.coordinates}
                  color={geofence.status === 'Active' ? 'blue' : 'red'}
                />
              ))}
            </MapContainer>
          </div>

          {/* Table and Add Button - Right Side */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-end mb-4 gap-2">
              <button
                onClick={openAddModal}
                className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Location
              </button>
            </div>
            
            {/* Table Section */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  Geofence List
                </h3>
                <div className="flex items-center">
                  <ExportComponent
                    tableId="geofence-table"
                    filename="geofence_list"
                  />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="overflow-x-auto">
                  <table id="geofence-table" className="w-full table-auto">
                    <thead>
                      <tr className="bg-primary">
                        {columns.map((column) => (
                          <th
                            key={column.key}
                            className="px-4 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                          >
                            <span>{column.label}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedGeofences.map((geofence) => (
                        <tr
                          key={geofence.id}
                          className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="px-4 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap font-medium">{geofence.id}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="font-medium text-gray-900 dark:text-white">{geofence.name}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap max-w-xs">
                            <span 
                              className="font-medium text-gray-900 dark:text-white max-w-xs truncate block" 
                              title={(geofence.location || []).join(', ') || 'Custom'}
                            >
                              {(geofence.location || []).join(', ') || 'Custom'}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                geofence.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <span className={`font-medium ${
                                geofence.status === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {geofence.status}
                              </span>
                            </div>
                          </td>
                          {/* Actions Column */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openEditModal(geofence)}
                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 rounded-md transition-all duration-200"
                                title="Edit Geofence"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(geofence.id)}
                                className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded-md transition-all duration-200"
                                title="Delete Geofence"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {paginatedGeofences.length === 0 && (
                        <tr>
                          <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                            No geofences found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm mr-4 text-gray-600 dark:text-gray-400">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, geofences.length)} of {geofences.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          currentPage === 1
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          currentPage === totalPages
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Geofence Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            className={`
              fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 
              flex flex-col overflow-hidden
              transition-transform duration-300 ease-in-out transform
              ${animateOut ? 'translate-x-full' : 'translate-x-0'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Geofence
              </h3>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg shadow-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Geofence Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter geofence name, e.g., Zone 6"
                  className="block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 shadow-sm transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Locations
                </label>
                <MultipleSearchDropdown
                  label="Select locations"
                  options={locationOptions}
                  selectedValues={selectedLocations}
                  onSelect={setSelectedLocations}
                  isOpen={locationDropdownOpen}
                  onToggle={() => setLocationDropdownOpen((prev) => !prev)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Coordinates <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add at least 3 coordinate points to form a polygon. Points should be entered in clockwise or counter-clockwise order.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    type="button"
                    onClick={addDefaultCoordinates}
                    className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  >
                    <MapPin className="w-5 h-5" />
                    Use Default Polygon
                  </button>
                  <button
                    type="button"
                    onClick={addCoordinate}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    Add Coordinate Point
                  </button>
                </div>

                {coordinatePoints.length === 0 ? (
                  <div className="text-center py-8 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                      Click "Use Default Polygon" or "Add Coordinate Point" to get started
                    </p>
                  </div>
                ) : (
                  <CoordinateInputs
                    points={coordinatePoints}
                    onUpdate={updateCoordinate}
                    onRemove={removeCoordinate}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-shrink-0 justify-end gap-3 p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveGeofence}
                disabled={!newName.trim() || coordinatePoints.length < 3}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
              >
                Add Geofence
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Geofence Modal */}
      {editModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out"
            onClick={handleEditClose}
            aria-hidden="true"
          />
          <div
            className={`
              fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 
              flex flex-col overflow-hidden
              transition-transform duration-300 ease-in-out transform
              ${editAnimateOut ? 'translate-x-full' : 'translate-x-0'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Geofence - {editingGeofence?.name}
              </h3>
              <button
                onClick={handleEditClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              {editError && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg shadow-sm">
                  {editError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Geofence Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter geofence name"
                  className="block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 shadow-sm transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Locations
                </label>
                <MultipleSearchDropdown
                  label="Select locations"
                  options={locationOptions}
                  selectedValues={editSelectedLocations}
                  onSelect={setEditSelectedLocations}
                  isOpen={editLocationDropdownOpen}
                  onToggle={() => setEditLocationDropdownOpen((prev) => !prev)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Coordinates <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add at least 3 coordinate points to form a polygon.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    type="button"
                    onClick={addDefaultEditCoordinates}
                    className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  >
                    <MapPin className="w-5 h-5" />
                    Use Default Polygon
                  </button>
                  <button
                    type="button"
                    onClick={addEditCoordinate}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    Add Coordinate Point
                  </button>
                </div>

                {editCoordinatePoints.length === 0 ? (
                  <div className="text-center py-8 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                      Click "Use Default Polygon" or "Add Coordinate Point" to get started
                    </p>
                  </div>
                ) : (
                  <CoordinateInputs
                    points={editCoordinatePoints}
                    onUpdate={updateEditCoordinate}
                    onRemove={removeEditCoordinate}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-shrink-0 justify-end gap-3 p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleEditClose}
                className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditGeofence}
                disabled={!editName.trim() || editCoordinatePoints.length < 3}
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
              >
                Update Geofence
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GeoFencing;