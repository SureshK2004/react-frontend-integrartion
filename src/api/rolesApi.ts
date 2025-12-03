import axiosInstance from "../utils/axiosInstance";

export const getRoles = async (org_id: number, next: number | null, limit: number) => {
  const response = await axiosInstance.get("/get_roles_api", {
    params: { 
      org_id, 
      next,  
      limit 
    },
  });
  return response.data;
};