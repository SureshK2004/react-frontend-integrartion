import axiosInstance from "../utils/axiosInstance";

// List
export const getDesignations = async (org_id: number, prev: number, limit: number) => {
  const response = await axiosInstance.get("/get_designation_api", {
    params: {
      org_id,
      prev,
      limit,
    },
  });

  return response.data;
};


// Create
export const createDesignation = async (payload: {
  designation: string;
  no_of_leave: string;
  org_id: number;
}) => {
  const response = await axiosInstance.post("/create_designation_api", payload);
  return response.data;
};

// Update
export const updateDesignation = async (payload: {
  id: number;
  designation: string;
  no_of_leave: string;
  org_id: number;
}) => {
  const response = await axiosInstance.put("/update_designation_api", payload);
  return response.data;
};

// Delete
export const deleteDesignation = async (id: number, org_id: number) => {
  if (!id) throw new Error("Invalid designation ID");
  const response = await axiosInstance.delete("/delete_designation_api", {
    params: { id, org_id },
  });
  return response.data;
};
