// src/components/GeoFencing.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import GeoFencingHeader from './geoFencingHeader';
import { MapContainer, TileLayer, Polygon, useMap, Marker, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import MultipleSearchDropdown from '../filtersDetails/muiltipleSearchDropdown';
import { X, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import ExportComponent from '../exportOption/exportTo';
import { createMapLocation, deleteMapLocation, getLocationNamesDropdown, getLocationsGeo, updateMapLocation } from './geofencingApi';
import L from 'leaflet';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ORG_ID = 3;

// Tamil Nadu coordinates
const TAMIL_NADU_CENTER: [number, number] = [11.1271, 78.6569]; // Center of Tamil Nadu
const DEFAULT_TAMIL_NADU_COORDINATES: [number, number][] = [
  [13.0827, 80.2707], // Chennai
  [11.0168, 76.9558], // Coimbatore
  [9.9252, 78.1198],  // Madurai
  [10.7905, 78.7047], // Tiruchirappalli
];

type ApiLocation = {
  id: number;
  name: string;
  coordinates: string;
  location_type_id?: number;
  location_type_name?: string;
  org_id?: number;
};

type LocationForUI = {
  id: number;
  name: string;
  coordinatesStr: string;
  coordinatesArray: [number, number][];
  location_type_id?: number;
  location_type_name?: string;
  org_id?: number;
};

type CoordInput = { id: number; lat: string; lng: string };

const parseCoordinatesString = (coordStr: string): [number, number][] => {
  if (!coordStr) return [];
  const parts = coordStr.split(',').map((p) => p.trim()).filter(Boolean);
  const out: [number, number][] = [];
  for (let i = 0; i < parts.length - 1; i += 2) {
    const lat = Number(parts[i]);
    const lng = Number(parts[i + 1]);
    if (!isNaN(lat) && !isNaN(lng)) out.push([lat, lng]);
  }
  return out;
};

const buildCoordinatesString = (coords: [number, number][]) => {
  return coords.map(([lat, lng]) => `${lat},${lng}`).join(',');
};

const isValidNumber = (v: string) => {
  if (v == null) return false;
  const n = Number(v);
  return Number.isFinite(n);
};

const toLatLng = (p: CoordInput): [number, number] | null => {
  if (!isValidNumber(p.lat) || !isValidNumber(p.lng)) return null;
  return [Number(p.lat), Number(p.lng)];
};

const countValid = (points: CoordInput[]) =>
  points.reduce((c, p) => (toLatLng(p) ? c + 1 : c), 0);

const validateCoordinate = (value: string): boolean => {
  if (!value.trim()) return false;
  const num = Number(value);
  return !isNaN(num) && Number.isFinite(num);
};

const GeoFencing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');

  const [locations, setLocations] = useState<LocationForUI[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Modal/form states (add)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [newName, setNewName] = useState('');
  const [coordinatePoints, setCoordinatePoints] = useState<CoordInput[]>([]);
  const [nextCoordId, setNextCoordId] = useState(0);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(5);
  const [polygonPoints, setPolygonPoints] = useState<[number, number][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAnimateOut, setEditAnimateOut] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationForUI | null>(null);
  const [editName, setEditName] = useState('');
  const [editSelectedLocations, setEditSelectedLocations] = useState<string[]>([]);
  const [editCoordinatePoints, setEditCoordinatePoints] = useState<CoordInput[]>([]);
  const [editNextCoordId, setEditNextCoordId] = useState(0);
  const [editLocationDropdownOpen, setEditLocationDropdownOpen] = useState(false);
  const [editError, setEditError] = useState('');
  const [editPolygonPoints, setEditPolygonPoints] = useState<[number, number][]>([]);
  const [isEditDrawing, setIsEditDrawing] = useState(false);

  // Map reference for click handling
  const mapRef = useRef<L.Map | null>(null);

  interface Option {
    id: number;
    name: string;
  }

  const [locationList, setLocationList] = useState<Option[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Map click handler for manual coordinate addition - ADD MODAL
  const handleMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      if (!mapRef.current || !isModalOpen || isDrawing) return;
      const latlng = e.latlng;
      const newId = nextCoordId;
      setNextCoordId((p) => p + 1);

      const newCoord: CoordInput = {
        id: newId,
        lat: latlng.lat.toFixed(6),
        lng: latlng.lng.toFixed(6),
      };
      setCoordinatePoints((prev) => [...prev, newCoord]);
      setError("");
    },
    [isModalOpen, isDrawing, nextCoordId]
  );

  // Map click handler for manual coordinate addition - EDIT MODAL
  const handleEditMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      if (!mapRef.current || !editModalOpen || isEditDrawing) return;
      const latlng = e.latlng;
      const newId = editNextCoordId;
      setEditNextCoordId((p) => p + 1);

      const newCoord: CoordInput = {
        id: newId,
        lat: latlng.lat.toFixed(6),
        lng: latlng.lng.toFixed(6),
      };
      setEditCoordinatePoints((prev) => [...prev, newCoord]);
      setEditError("");
    },
    [editModalOpen, isEditDrawing, editNextCoordId]
  );

  // Handle manual marker drag for add modal
  const handleManualMarkerDrag = useCallback((e: any, id: number) => {
    const position = e.target.getLatLng();
    setCoordinatePoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) } : p))
    );
  }, []);

  // Handle manual marker drag for edit modal
  const handleEditMarkerDrag = useCallback((e: any, id: number) => {
    const position = e.target.getLatLng();
    setEditCoordinatePoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, lat: position.lat.toFixed(6), lng: position.lng.toFixed(6) } : p))
    );
  }, []);

  // Draw handlers for Add Modal
  const handleCreated = useCallback((e: any) => {
    if (e.layerType === "polygon") {
      const layer = e.layer;
      const latlngs = layer.getLatLngs()[0] as L.LatLng[];
      const pts: [number, number][] = latlngs.map((ll) => [ll.lat, ll.lng]);

      // Validate points — only accept polygons with >=3 valid points
      if (pts.length >= 3) {
        const baseId = nextCoordId;
        const newPoints = pts.map((p, idx) => ({
          id: baseId + idx,
          lat: Number(p[0]).toFixed(6),
          lng: Number(p[1]).toFixed(6),
        }));
        setCoordinatePoints(newPoints);
        setNextCoordId((v) => v + pts.length);
        setError("");
      }
      // remove drawn layer to avoid duplicate drawing control layers
      try {
        layer.remove();
      } catch { }
    }
  }, [nextCoordId]);

  const handleEdited = useCallback((e: any) => {
    const { layers } = e;
    layers.eachLayer((layer: any) => {
      if (layer instanceof L.Polygon) {
        const latlngs = layer.getLatLngs()[0] as L.LatLng[];
        const pts: [number, number][] = latlngs.map((ll) => [ll.lat, ll.lng]);
        if (pts.length >= 3) {
          const baseId = nextCoordId;
          const newPoints = pts.map((p, idx) => ({
            id: baseId + idx,
            lat: p[0].toFixed(6),
            lng: p[1].toFixed(6),
          }));
          setCoordinatePoints(newPoints);
          setNextCoordId((v) => v + pts.length);
        }
      }
    });
  }, [nextCoordId]);

  const handleDeleted = useCallback(() => {
    setPolygonPoints([]);
    setCoordinatePoints([]);
  }, []);

  // Draw handlers for Edit Modal
  const handleEditCreated = useCallback((e: any) => {
    if (e.layerType === "polygon") {
      const layer = e.layer;
      const latlngs = layer.getLatLngs()[0] as L.LatLng[];
      const pts: [number, number][] = latlngs.map((ll) => [ll.lat, ll.lng]);

      if (pts.length >= 3) {
        const baseId = editNextCoordId;
        const newPoints = pts.map((p, idx) => ({
          id: baseId + idx,
          lat: Number(p[0]).toFixed(6),
          lng: Number(p[1]).toFixed(6),
        }));
        setEditCoordinatePoints(newPoints);
        setEditNextCoordId((v) => v + pts.length);
        setEditError("");
      }
      try {
        layer.remove();
      } catch { }
    }
  }, [editNextCoordId]);

  const handleEditEdited = useCallback((e: any) => {
    const { layers } = e;
    layers.eachLayer((layer: any) => {
      if (layer instanceof L.Polygon) {
        const latlngs = layer.getLatLngs()[0] as L.LatLng[];
        const pts: [number, number][] = latlngs.map((ll) => [ll.lat, ll.lng]);
        if (pts.length >= 3) {
          const baseId = editNextCoordId;
          const newPoints = pts.map((p, idx) => ({
            id: baseId + idx,
            lat: p[0].toFixed(6),
            lng: p[1].toFixed(6),
          }));
          setEditCoordinatePoints(newPoints);
          setEditNextCoordId((v) => v + pts.length);
        }
      }
    });
  }, [editNextCoordId]);

  const handleEditDeleted = useCallback(() => {
    setEditPolygonPoints([]);
    setEditCoordinatePoints([]);
  }, []);

  // Keep polygonPoints in sync with coordinatePoints (only VALID coords)
  useEffect(() => {
    const valid: [number, number][] = coordinatePoints
      .map((p) => toLatLng(p))
      .filter((x): x is [number, number] => x !== null);
    setPolygonPoints(valid);
  }, [coordinatePoints]);

  useEffect(() => {
    const valid: [number, number][] = editCoordinatePoints
      .map((p) => toLatLng(p))
      .filter((x): x is [number, number] => x !== null);
    setEditPolygonPoints(valid);
  }, [editCoordinatePoints]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getLocationNamesDropdown?.(ORG_ID).catch(() => null);
        if (res && Array.isArray(res.data)) {
          const list = res.data.map((d: any) => ({ id: d.id, name: d.name }));
          setLocationList(list);
          setLocationOptions(list.map((l) => l.name));
        }
      } catch (e) {
        // ignore; fallback default options kept
      }
    })();
  }, []);

  const saveGeofence = async () => {
    setError('');

    if (!newName.trim()) {
      setError('Geofence name is required');
      return;
    }

    // Validate all coordinates have valid numbers
    const invalidCoordinates = coordinatePoints.filter(
      (p) => !validateCoordinate(p.lat) || !validateCoordinate(p.lng)
    );

    if (invalidCoordinates.length > 0) {
      setError('All latitude and longitude values must be valid numbers');
      return;
    }

    const validCount = countValid(coordinatePoints);
    if (validCount < 3) {
      setError('At least 3 valid coordinate points are required to form a polygon');
      return;
    }

    const coordsArr: [number, number][] = coordinatePoints
      .map((p) => toLatLng(p))
      .filter((x): x is [number, number] => x !== null);
    const coordsStr = buildCoordinatesString(coordsArr);

    if (selectedLocations.length === 0) {
      setError('Please select a Location Type');
      return;
    }

    const selName = selectedLocations[0];
    const selObj = locationList.find((l) => l.name === selName);
    const payload = {
      org_id: ORG_ID,
      location_type_id: selObj ? selObj.id : 0,
      location_type_name: selObj ? selObj.name : selName,
      name: newName.trim(),
      coordinates: coordsStr,
    };

    console.log('FINAL PAYLOAD:', payload);

    try {
      await createMapLocation(payload as any);
      await fetchLocations(1);
      setPage(1);
      handleClose();
    } catch (err) {
      console.error('Create error:', (err as any)?.response?.data ?? err);
      setError('Failed to create geofence. Try again.');
    }
  };

  // Fetch locations (server)
  const fetchLocations = async (p: number) => {
    try {
      setLoading(true);

      const res = await getLocationsGeo(ORG_ID, p, limit);

      const apiData: ApiLocation[] = res?.data || [];

      const formatted = apiData.map((loc) => ({
        id: loc.id,
        name: loc.name,
        coordinatesStr: loc.coordinates || "",
        coordinatesArray: parseCoordinatesString(loc.coordinates || ""),
        location_type_id: loc.location_type_id,
        location_type_name: loc.location_type_name,
        org_id: loc.org_id,
      }));

      setLocations(formatted);

      const count =
        res?.pagination?.count ??
        res?.count ??
        res?.total_count ??
        apiData.length;

      setTotalCount(count);

      return res;
    } catch (err) {
      console.error("Error fetching locations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

  const mapZones = locations.map((l) => ({
    id: l.id,
    name: l.name,
    coordinates: l.coordinatesArray,
    status: 'Active',
  }));

  const openAddModal = () => {
    setNewName('');
    setSelectedLocations([]);
    setCoordinatePoints([]);
    setPolygonPoints([]);
    setNextCoordId(0);
    setError('');
    setLocationDropdownOpen(false);
    setIsModalOpen(true);
    setAnimateOut(false);
    setIsDrawing(false);
  };

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setAnimateOut(false);
      setPolygonPoints([]);
      setIsDrawing(false);
    }, 300);
  };

  const addCoordinate = () => {
    const id = nextCoordId;
    setNextCoordId((v) => v + 1);
    setCoordinatePoints((prev) => [...prev, { id, lat: '', lng: '' }]);
    setError('');
  };

  const addDefaultCoordinates = () => {
    const base = nextCoordId;
    setNextCoordId((v) => v + 4);

    // Ensure all coordinates have proper string values
    const defaultCoords = DEFAULT_TAMIL_NADU_COORDINATES.map((coord, idx) => ({
      id: base + idx,
      lat: coord[0].toString(),
      lng: coord[1].toString(),
    }));

    setCoordinatePoints(defaultCoords);
    setError('');
  };

  // NEW FUNCTION: Clear all coordinates
  const clearAllCoordinates = () => {
    setCoordinatePoints([]);
    setPolygonPoints([]);
    setNextCoordId(0);
    setError('');
  };

  const updateCoordinate = (id: number, field: 'lat' | 'lng', value: string) => {
    setCoordinatePoints((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    setError('');
  };

  const removeCoordinate = (id: number) => {
    setCoordinatePoints((prev) => prev.filter((p) => p.id !== id));
    setError('');
  };

  const openEditModal = (loc: LocationForUI | ApiLocation) => {
    const l: LocationForUI =
      'coordinates' in (loc as any)
        ? {
          id: (loc as any).id,
          name: (loc as any).name,
          coordinatesStr: (loc as any).coordinates || '',
          coordinatesArray: parseCoordinatesString((loc as any).coordinates || ''),
          location_type_id: (loc as any).location_type_id,
          location_type_name: (loc as any).location_type_name,
          org_id: (loc as any).org_id,
        }
        : (loc as LocationForUI);

    setEditingLocation(l);
    setEditName(l.name);
    setEditSelectedLocations(l.location_type_name ? [l.location_type_name] : []);
    const points = l.coordinatesArray.map((c, idx) => ({ id: idx, lat: String(c[0]), lng: String(c[1]) }));
    setEditCoordinatePoints(points);
    setEditNextCoordId(points.length);
    setEditError('');
    setEditLocationDropdownOpen(false);
    setEditModalOpen(true);
    setEditAnimateOut(false);
    setIsEditDrawing(false);
  };

  const handleEditClose = () => {
    setEditAnimateOut(true);
    setTimeout(() => {
      setEditModalOpen(false);
      setEditAnimateOut(false);
      setEditingLocation(null);
      setEditPolygonPoints([]);
      setIsEditDrawing(false);
    }, 300);
  };

  const addEditCoordinate = () => {
    const id = editNextCoordId;
    setEditNextCoordId((v) => v + 1);
    setEditCoordinatePoints((prev) => [...prev, { id, lat: '', lng: '' }]);
    setEditError('');
  };

  const addDefaultEditCoordinates = () => {
    const base = editNextCoordId;
    setEditNextCoordId((v) => v + 4);
    setEditCoordinatePoints(
      DEFAULT_TAMIL_NADU_COORDINATES.map((coord, idx) => ({
        id: base + idx,
        lat: coord[0].toString(),
        lng: coord[1].toString(),
      }))
    );
    setEditError('');
  };

  // NEW FUNCTION: Clear all edit coordinates
  const clearAllEditCoordinates = () => {
    setEditCoordinatePoints([]);
    setEditPolygonPoints([]);
    setEditNextCoordId(0);
    setEditError('');
  };

  const updateEditCoordinate = (id: number, field: 'lat' | 'lng', value: string) => {
    setEditCoordinatePoints((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    setEditError('');
  };

  const removeEditCoordinate = (id: number) => {
    setEditCoordinatePoints((prev) => prev.filter((p) => p.id !== id));
    setEditError('');
  };

  const saveEditGeofence = async () => {
    setEditError('');

    if (!editName.trim()) {
      setEditError('Geofence name is required');
      return;
    }

    // Validate all coordinates have valid numbers
    const invalidCoordinates = editCoordinatePoints.filter(
      (p) => !validateCoordinate(p.lat) || !validateCoordinate(p.lng)
    );

    if (invalidCoordinates.length > 0) {
      setEditError('All latitude and longitude values must be valid numbers');
      return;
    }

    const validCount = countValid(editCoordinatePoints);
    if (validCount < 3) {
      setEditError('At least 3 valid coordinate points are required to form a polygon');
      return;
    }

    if (!editingLocation) {
      setEditError('No geofence selected to edit');
      return;
    }

    const coordsArr: [number, number][] = editCoordinatePoints
      .map((p) => toLatLng(p))
      .filter((x): x is [number, number] => x !== null);
    const coordsStr = buildCoordinatesString(coordsArr);

    const selName = editSelectedLocations.length ? editSelectedLocations[0] : editingLocation.location_type_name ?? '';
    const selObj = locationList.find((l) => l.name === selName);
    const payload = {
      id: editingLocation.id,
      name: editName.trim(),
      coordinates: coordsStr,
      location_type_id: selObj ? selObj.id : editingLocation.location_type_id ?? 0,
      location_type_name: selObj ? selObj.name : selName,
      org_id: ORG_ID,
    };

    try {
      await updateMapLocation(payload as any);
      await fetchLocations(page);
      handleEditClose();
    } catch (err) {
      console.error('Error updating location', err);
      setEditError('Failed to update location. Try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this geofence? This action cannot be undone.')) return;
    try {
      await deleteMapLocation(id, ORG_ID);
      const res = await fetchLocations(page);
      const items = (res?.data) || [];
      if (items.length === 0 && page > 1) {
        setPage(page - 1);
        await fetchLocations(page - 1);
      }
    } catch (err) {
      console.error('Error deleting location', err);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const buildPageWindow = () => {
    const maxButtons = 7;
    if (totalPages <= maxButtons) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const windowSize = maxButtons - 2;
    let start = Math.max(2, page - Math.floor(windowSize / 2));
    let end = start + windowSize - 1;
    if (end >= totalPages) {
      end = totalPages - 1;
      start = end - windowSize + 1;
    }
    const pages: number[] = [1];
    for (let i = start; i <= end; i++) pages.push(i);
    pages.push(totalPages);
    return pages;
  };

  const MapEffect = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        mapRef.current = map;
        map.setView(TAMIL_NADU_CENTER, 8);

        // Add click handlers based on which modal is open
        if (isModalOpen) {
          map.on('click', handleMapClick);
        } else if (editModalOpen) {
          map.on('click', handleEditMapClick);
        }

        setTimeout(() => {
          try {
            map.invalidateSize();
          } catch { }
        }, 100);
      }

      return () => {
        if (map) {
          map.off('click', handleMapClick);
          map.off('click', handleEditMapClick);
        }
      };
    }, [map, isModalOpen, editModalOpen, handleMapClick, handleEditMapClick]);
    return null;
  };

  // Manage map click events for both modals
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleMapInteraction = () => {
      if (isModalOpen) {
        map.on('click', handleMapClick);
      } else if (editModalOpen) {
        map.on('click', handleEditMapClick);
      } else {
        map.off('click', handleMapClick);
        map.off('click', handleEditMapClick);
      }

      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch { }
      }, 200);
    };

    handleMapInteraction();

    // Set body overflow based on modal state
    if (isModalOpen || editModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      if (map) {
        map.off('click', handleMapClick);
        map.off('click', handleEditMapClick);
      }
      document.body.style.overflow = '';
    };
  }, [isModalOpen, editModalOpen, handleMapClick, handleEditMapClick]);

  const CoordinateInputs: React.FC<any> = ({ points, onUpdate, onRemove }) => (
    <div className="space-y-4">
      {points.map((point: any, index: number) => {
        const isValidPoint = point.lat.trim() && point.lng.trim() &&
          !isNaN(Number(point.lat)) && !isNaN(Number(point.lng));

        return (
          <div
            key={point.id}
            className={`group flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${isValidPoint
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700'
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
              }`}
          >
            <div className="flex items-center gap-3 mr-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${isValidPoint
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                {index + 1}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Latitude {!point.lat.trim() && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g., 11.1271"
                  value={point.lat}
                  onChange={(e) => onUpdate(point.id, 'lat', e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-600/50 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200 ${point.lat.trim() && !isNaN(Number(point.lat))
                      ? 'border-green-300 dark:border-green-700 focus:ring-green-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }`}
                />
                {point.lat.trim() && isNaN(Number(point.lat)) && (
                  <p className="text-red-500 text-xs mt-1">Must be a valid number</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                  Longitude {!point.lng.trim() && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g., 78.6569"
                  value={point.lng}
                  onChange={(e) => onUpdate(point.id, 'lng', e.target.value)}
                  className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-600/50 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200 ${point.lng.trim() && !isNaN(Number(point.lng))
                      ? 'border-green-300 dark:border-green-700 focus:ring-green-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }`}
                />
                {point.lng.trim() && isNaN(Number(point.lng)) && (
                  <p className="text-red-500 text-xs mt-1">Must be a valid number</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemove(point.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
              title="Remove coordinate"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        );
      })}

      {points.length < 3 && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800/50 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded-lg shadow-sm">
          <span className="font-medium">Note:</span> Add at least <strong>3 valid points</strong> to create a valid polygon.
          {points.length > 0 && (
            <div className="mt-1 text-sm">
              Current valid points: <strong>{points.filter((p: any) => p.lat.trim() && p.lng.trim() && !isNaN(Number(p.lat)) && !isNaN(Number(p.lng))).length}</strong> / 3
            </div>
          )}
        </div>
      )}

      {points.length >= 3 && (
        <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg shadow-sm">
          <span className="font-medium">Ready!</span> You have enough points to create a polygon.
          {points.filter((p: any) => !p.lat.trim() || !p.lng.trim() || isNaN(Number(p.lat)) || isNaN(Number(p.lng))).length > 0 && (
            <span> Some points need valid coordinates.</span>
          )}
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
          <div className="w-full md:w-1/2 h-[500px] border rounded-lg overflow-hidden select-none" style={{ position: "relative", zIndex: isModalOpen || editModalOpen ? 10055 : 0 }}>
            <MapContainer style={{ height: '100%', width: '100%' }} center={TAMIL_NADU_CENTER} zoom={8} scrollWheelZoom>
              <MapEffect />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Drawing Controls for Add Modal */}
              {isModalOpen && (
                <FeatureGroup>
                  <EditControl
                    position="topright"
                    onCreated={handleCreated}
                    onEdited={handleEdited}
                    onDeleted={handleDeleted}
                    onDrawStart={() => setIsDrawing(true)}
                    onDrawStop={() => setIsDrawing(false)}
                    draw={{
                      rectangle: false,
                      circle: false,
                      circlemarker: false,
                      marker: false,
                      polyline: false,
                      polygon: {
                        allowIntersection: false,
                        drawError: { color: "#e1e100", message: "<strong>Error:</strong> Shape edges cannot cross!" },
                        shapeOptions: { color: "#3b82f6", weight: 3, opacity: 0.8, fill: true, fillColor: "#3b82f6", fillOpacity: 0.3 },
                      },
                    }}
                  />
                </FeatureGroup>
              )}

              {/* Drawing Controls for Edit Modal */}
              {editModalOpen && (
                <FeatureGroup>
                  <EditControl
                    position="topright"
                    onCreated={handleEditCreated}
                    onEdited={handleEditEdited}
                    onDeleted={handleEditDeleted}
                    onDrawStart={() => setIsEditDrawing(true)}
                    onDrawStop={() => setIsEditDrawing(false)}
                    draw={{
                      rectangle: false,
                      circle: false,
                      circlemarker: false,
                      marker: false,
                      polyline: false,
                      polygon: {
                        allowIntersection: false,
                        drawError: { color: "#e1e100", message: "<strong>Error:</strong> Shape edges cannot cross!" },
                        shapeOptions: { color: "#10b981", weight: 3, opacity: 0.8, fill: true, fillColor: "#10b981", fillOpacity: 0.3 },
                      },
                    }}
                  />
                </FeatureGroup>
              )}

              {/* Add Modal Polygon */}
              {isModalOpen && polygonPoints.length >= 3 && (
                <Polygon
                  positions={polygonPoints}
                  pathOptions={{ color: "#3b82f6", weight: 3, opacity: 0.8, fill: true, fillColor: "#3b82f6", fillOpacity: 0.3 }}
                />
              )}

              {/* Edit Modal Polygon */}
              {editModalOpen && editPolygonPoints.length >= 3 && (
                <Polygon
                  positions={editPolygonPoints}
                  pathOptions={{ color: "#10b981", weight: 3, opacity: 0.8, fill: true, fillColor: "#10b981", fillOpacity: 0.25 }}
                />
              )}

              {/* Markers for Add Modal */}
              {isModalOpen &&
                coordinatePoints.map((p) => {
                  const latlng = toLatLng(p);
                  if (!latlng) return null;
                  return (
                    <Marker
                      key={`add-marker-${p.id}`}
                      position={latlng}
                      draggable
                      eventHandlers={{ dragend: (e) => handleManualMarkerDrag(e, p.id) }}
                    />
                  );
                })}

              {/* Markers for Edit Modal */}
              {editModalOpen &&
                editCoordinatePoints.map((p) => {
                  const latlng = toLatLng(p);
                  if (!latlng) return null;
                  return (
                    <Marker
                      key={`edit-marker-${p.id}`}
                      position={latlng}
                      draggable
                      eventHandlers={{ dragend: (e) => handleEditMarkerDrag(e, p.id) }}
                    />
                  );
                })}

              {/* Existing geofences */}
              {mapZones.map((zone) => (
                <Polygon
                  key={zone.id}
                  positions={zone.coordinates}
                  pathOptions={{
                    color: zone.status === 'Active' ? 'blue' : 'red',
                    fillColor: zone.status === 'Active' ? 'blue' : 'red',
                    fillOpacity: 0.3
                  }}
                />
              ))}
            </MapContainer>
          </div>

          {/* Right Side - Geofence List */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div className="flex justify-end mb-4 gap-2">
              <button onClick={openAddModal} className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Location
              </button>
            </div>
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Limit:</span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  >
                    {[5, 10, 15, 20, 25, 30].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">Geofence List</h3>
                <div className="flex items-center">
                  <ExportComponent tableId="geofence-table" filename="geofence_list" />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="overflow-x-auto">
                  <table id="geofence-table" className="w-full table-auto">
                    <thead>
                      <tr className="bg-primary">
                        <th className="px-4 py-4 text-left text-sm font-semibold text-white">S.No</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-white">Name</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-white">Location Type</th>
                        <th className="px-4 py-4 text-left text-sm font-semibold text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="text-center py-8 text-gray-500">Loading...</td>
                        </tr>
                      ) : locations.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-8 text-gray-500">No geofences found</td>
                        </tr>
                      ) : (
                        locations.map((loc, index) => (
                          <tr key={loc.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap font-medium">
                              {(page - 1) * limit + (index + 1)}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className="font-medium text-gray-900 dark:text-white">{loc.name}</span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap max-w-xs">
                              <span className="font-medium text-gray-900 dark:text-white max-w-xs truncate block" title={loc.location_type_name || 'Custom'}>
                                {loc.location_type_name || 'Custom'}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <button onClick={() => openEditModal(loc)} className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 rounded-md transition-all duration-200" title="Edit Geofence">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(loc.id)} className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 rounded-md transition-all duration-200" title="Delete Geofence">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm mr-4 text-gray-600 dark:text-gray-400">
                      Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount} entries
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${page === 1
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                          }`}
                      >
                        Previous
                      </button>

                      {(() => {
                        const pages = buildPageWindow();
                        const nodes: React.ReactNode[] = [];
                        for (let i = 0; i < pages.length; i++) {
                          const p = pages[i];
                          const prev = pages[i - 1];
                          if (i > 0 && p - prev! > 1) {
                            nodes.push(
                              <span key={`e-${i}`} className="px-2 text-gray-500">...</span>
                            );
                          }
                          nodes.push(
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              className={`px-3 py-2 rounded-md text-sm font-medium ${page === p
                                  ? 'bg-primary text-white'
                                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                }`}
                            >
                              {p}
                            </button>
                          );
                        }
                        return nodes;
                      })()}

                      <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${page === totalPages
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
          <div className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-in-out" aria-hidden="true" style={{ zIndex: 10050, pointerEvents: "none" }} />
          <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out transform ${animateOut ? 'translate-x-full' : 'translate-x-0'}`} onClick={(e) => e.stopPropagation()} style={{ zIndex: 10060 }}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Geofence</h3>
              <button onClick={handleClose} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              {error && <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg shadow-sm">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Geofence Name <span className="text-red-500">*</span></label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter geofence name, e.g., Zone 6" className="block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 shadow-sm transition-all duration-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Locations</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Coordinates <span className="text-red-500">*</span></label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add at least 3 coordinate points to form a polygon. You can either:
                  <br />
                  • Click the <strong>polygon drawing tool</strong> in the map (top-right) and draw directly on the map
                  <br />
                  • Use the buttons below to add coordinates manually
                  <br />
                  • Click on the map to add individual points
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <button type="button" onClick={addDefaultCoordinates} className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md">
                    <MapPin className="w-5 h-5" />Use Default Co-ordinates
                  </button>
                  <button type="button" onClick={addCoordinate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md">
                    <Plus className="w-5 h-5" />Add Coordinate Point
                  </button>
                  <button
                    type="button"
                    onClick={clearAllCoordinates}
                    disabled={coordinatePoints.length === 0}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  >
                    <X className="w-5 h-5" />Clear All
                  </button>
                </div>

                {coordinatePoints.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      No coordinates added yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      Use the polygon drawing tool on the map, click "Use Default Co-ordinates",
                      or "Add Coordinate Point" to get started
                    </p>
                  </div>
                ) : (
                  <CoordinateInputs points={coordinatePoints} onUpdate={updateCoordinate} onRemove={removeCoordinate} />
                )}
              </div>
            </div>

            <div className="flex flex-shrink-0 justify-end gap-3 p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <button type="button" onClick={handleClose} className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md">Cancel</button>
              <button
                type="button"
                onClick={saveGeofence}
                disabled={!newName.trim() || countValid(coordinatePoints) < 3}
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
          <div className="fixed inset-0 bg-black/60 transition-opacity duration-300 ease-in-out" aria-hidden="true" style={{ zIndex: 10050, pointerEvents: "none" }} />
          <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out transform ${editAnimateOut ? 'translate-x-full' : 'translate-x-0'}`} onClick={(e) => e.stopPropagation()} style={{ zIndex: 10060 }}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Geofence - {editingLocation?.name}</h3>
              <button onClick={handleEditClose} className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
              {editError && <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg shadow-sm">{editError}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Geofence Name <span className="text-red-500">*</span></label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter geofence name" className="block w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 shadow-sm transition-all duration-200" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Locations</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Coordinates <span className="text-red-500">*</span></label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add at least 3 coordinate points to form a polygon. You can either:
                  <br />
                  • Click the <strong>polygon drawing tool</strong> in the map (top-right) and draw directly on the map
                  <br />
                  • Use the buttons below to add coordinates manually
                  <br />
                  • Click on the map to add individual points
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <button type="button" onClick={addDefaultEditCoordinates} className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md">
                    <MapPin className="w-5 h-5" />Use Default Co-ordinates
                  </button>
                  <button type="button" onClick={addEditCoordinate} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md">
                    <Plus className="w-5 h-5" />Add Coordinate Point
                  </button>
                  <button
                    type="button"
                    onClick={clearAllEditCoordinates}
                    disabled={editCoordinatePoints.length === 0}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md"
                  >
                    <X className="w-5 h-5" />Clear All
                  </button>
                </div>

                {editCoordinatePoints.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      No coordinates added yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                      Use the polygon drawing tool on the map, click "Use Default Co-ordinates",
                      or "Add Coordinate Point" to get started
                    </p>
                  </div>
                ) : (
                  <CoordinateInputs points={editCoordinatePoints} onUpdate={updateEditCoordinate} onRemove={removeEditCoordinate} />
                )}
              </div>
            </div>

            <div className="flex flex-shrink-0 justify-end gap-3 p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <button type="button" onClick={handleEditClose} className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md">Cancel</button>
              <button
                type="button"
                onClick={saveEditGeofence}
                disabled={!editName.trim() || countValid(editCoordinatePoints) < 3}
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