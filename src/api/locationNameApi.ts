import axiosInstance from "../utils/axiosInstance";

// GET — list locations
export const getLocationNames = async (org_id: number) => {
    const response = await axiosInstance.get("/get_location_name", {
        params: { org_id },
    });
    return response.data;
};

// CREATE — create location
export const createLocationName = async (payload: {
    org_id: number;
    location_name: string;
}) => {
    const response = await axiosInstance.post("/create_location_name", payload);
    return response.data;
};

// UPDATE — update location
export const updateLocationName = async (payload: {
    id: number;
    org_id: number;
    name: string;
}) => {
    const response = await axiosInstance.put("/update_location_name", payload);
    return response.data;
};

// DELETE — delete location
export const deleteLocationName = async (id: number, org_id: number) => {
    const response = await axiosInstance.delete("/delete_location_name", {
        params: { id, org_id },
    });
    return response.data;
};
