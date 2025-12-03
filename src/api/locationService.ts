// src/api/locationService.ts
import axiosInstance from "@/utils/axiosInstance";

export type LocationItem = {
  id: number;
  name: string;
  coordinates: string; // backend: "lat,lng,lat,lng,..."
  location_type_id?: number;
  location_type_name?: string;
  org_id?: number;
};

export type PaginatedLocationsResponse = {
  success: boolean;
  data: LocationItem[];
  pagination: {
    count: number;
    next: number | null;
    prev: number | null;
  };
};

export const getLocations = async (
  org_id: number,
  page = 1,
  limit = 4
): Promise<PaginatedLocationsResponse> => {
  const res = await axiosInstance.get(`/get_locations?org_id=${org_id}&limit=${limit}&page=${page}`);
  return res.data;
};

export const getLocationNamesDropdown = async (org_id: number) => {
  const res = await axiosInstance.get(`/get_location_names_dropdown?org_id=${org_id}`);
  // response: { success: true, count: N, data: [{id, name}, ...] }
  return res.data.data;
};

// Add new location
export const addLocation = async (payload: {
  name: string;
  coordinates: string; // "lat,lng,lat,lng..."
  location_type_id?: number;
  location_type_name?: string;
  org_id: number;
}) => {
  // Assuming backend supports POST /add_map_location
  const res = await axiosInstance.post("/add_map_location", payload);
  return res.data;
};

// Update existing location (you provided earlier)
export const updateLocation = async (payload: {
  id: number;
  name: string;
  coordinates: string;
  location_type_id?: number;
  location_type_name?: string;
  org_id: number;
}) => {
  const res = await axiosInstance.put("/update_map_location", payload);
  return res.data;
};

export const deleteLocation = async (id: number, org_id: number) => {
  const res = await axiosInstance.delete(`/delete_map_location?id=${id}&org_id=${org_id}`);
  return res.data;
};
