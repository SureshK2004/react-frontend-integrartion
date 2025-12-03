import axiosInstance from "../utils/axiosInstance";

export interface Permission {
  id: number;
  name: string;
  no_of_permission: string;
  timezone_type?: string;
  config_type?: string | number;
  config_label?: string;
  org_id?: number;
  created_date?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  count?: number;
  data?: T;
}


export const getPermissionTypes = async (
  org_id: number,
  limit: number,
  prev: number
): Promise<ApiResponse<Permission[]>> => {

  const res = await axiosInstance.get("/permission_type_list", {
    params: { org_id, limit, prev },
    headers: { "Content-Type": "text/plain" },
  });

  return res.data;
};


export const createPermission = async (payload: {
  name: string;
  no_of_permission: string | number;
  time_zone: string;
  config_type: string | number;
  org_id: number;
}): Promise<ApiResponse<Permission>> => {
  const res = await axiosInstance.post("/create_permission", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updatePermission = async (payload: {
  id: number;
  name?: string;
  no_of_permission?: string | number;
  time_zone?: string;          
  config_type?: string | number;
  org_id: number;
}) => {
  const res = await axiosInstance.put("/update_permission", payload);
  return res.data;
};


export const deletePermission = async (id: number, org_id: number): Promise<ApiResponse> => {
  const res = await axiosInstance.delete("/delete_permission", {
    data: { id, org_id },  
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
