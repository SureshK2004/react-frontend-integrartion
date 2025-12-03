// src/api/leaveApi.ts
import axiosInstance from "../utils/axiosInstance";

export interface LeaveType {
  id: number;
  name: string;
  no_of_leave: string;
  leave_config_type: "Monthly" | "Yearly";
  monthly_split: boolean;
  leave_carry_forward: boolean;
  carry_forward_limit: number;
  org_id: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export const getLeaveData = async (org_id: number): Promise<ApiResponse<LeaveType[]>> => {
  const res = await axiosInstance.get("/get_leave_data", { params: { org_id } });
  return res.data; 
};

export const createLeave = async (payload: {
  name: string;
  no_of_leave: string | number;
  monthly_split: boolean;
  leave_config_type: "Monthly" | "Yearly";
  leave_carry_forward: boolean;
  carry_forward_limit: number;
  org_id: number;
}): Promise<ApiResponse> => {
  const res = await axiosInstance.post("/create_leave_api", payload);
  return res.data;
};

export const updateLeave = async (payload: {
  id: number;
  org_id: number;
  name: string;
  no_of_leave: string | number;
  monthly_split: boolean;
  leave_config_type: "Monthly" | "Yearly";
  leave_carry_forward: boolean;
  carry_forward_limit: number;
}): Promise<ApiResponse> => {
  const res = await axiosInstance.put("/update_leave_api", payload);
  return res.data;
};

export const deleteLeave = async (id: number, org_id: number): Promise<ApiResponse> => {

  const res = await axiosInstance.delete("/delete_leave_api", {
    data: { id, org_id }
  });
  
  
  return res.data;
};