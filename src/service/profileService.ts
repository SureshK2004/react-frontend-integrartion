import axiosInstance from "@/utils/axiosInstance";

export const getProfile = async (org_id: string, user_id: string) => {
  const response = await axiosInstance.get(
    `/get_created_users?org_id=${org_id}&users_id=${user_id}`
  );
  return response.data;
};
