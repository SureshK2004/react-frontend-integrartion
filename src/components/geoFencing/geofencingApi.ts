import axiosInstance from "@/utils/axiosInstance";

export const getLocationsGeo = async (org_id: number, page: number, limit: number) => {
  // Backend expects: /get_locations?org_id=3&limit=10&next=2
  const response = await axiosInstance.get("/get_locations", {
    params: { org_id, limit, next: page },
  });

  return response.data;
};

export interface CreateMapLocationPayload {
  org_id: number;
  location_type_id: number;
  name: string;
  coordinates: string;
}

export const createMapLocation = async (payload: CreateMapLocationPayload) => {
  const response = await axiosInstance.post("/create_map_location", payload);
  return response.data;
};

export const getLocationNamesDropdown = async (org_id: number) => {
  const response = await axiosInstance.get("/get_location_names_dropdown", {
    params: { org_id },
  });
  return response.data;
};

export interface UpdateLocationPayload {
  id: number;
  name: string;
  coordinates: string;
  location_type_id: number;
  location_type_name: string;
  org_id: number;
}

export const updateMapLocation = async (payload: UpdateLocationPayload) => {
  const response = await axiosInstance.put("/update_map_location", payload);
  return response.data;
};

export const deleteMapLocation = async (id: number, org_id: number) => {
  const response = await axiosInstance.delete("/delete_map_location", {
    params: { id, org_id },
  });
  return response.data;
};