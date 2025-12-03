import axiosInstance from "../utils/axiosInstance";

// GET (list)
export const getHolidays = async (org_id: number, next: number, limit: number) => {
  const response = await axiosInstance.get("/get_event", {
    params: { org_id, next, limit },
  });
  return response.data;
};

// CREATE
export const createHoliday = async (payload: {
  name: string;
  fromdate: string;
  todate: string;
  org_id: number;
}) => {
  const response = await axiosInstance.post("/create_event", payload);
  return response.data;
};

// UPDATE
export const updateHoliday = async (payload: {
  id: number;
  name: string;
  fromdate: string;
  todate: string;
  org_id: number;
}) => {
  const response = await axiosInstance.put("/update_event", payload);
  return response.data;
};

// DELETE
export const deleteHoliday = async (id: number, org_id: number) => {
  const response = await axiosInstance.delete("/delete_event", {
    params: { id, org_id },
  });
  return response.data;
};
