import axiosInstance from "@/utils/axiosInstance";

// GET Department List
export const getDepartments = async (
  org_id: number,
  page: number,
  limit: number
) => {
  // page 1 -> no `next` param
  // page 2,3,... -> use `next=page`
  let url = `/get_department?org_id=${org_id}&limit=${limit}`;

  if (page > 1) {
    url += `&next=${page}`;
  }

  const response = await axiosInstance.get(url);
  return response.data;
};

// CREATE Department
export const createDepartment = async (payload: any) => {
  const response = await axiosInstance.post(`/create_department`, payload);
  return response.data;
};

// UPDATE Department
export const updateDepartment = async (payload: any) => {
  const response = await axiosInstance.put(`/update_department`, payload);
  return response.data;
};

// DELETE Department
export const deleteDepartment = async (id: number, org_id: number) => {
  const response = await axiosInstance.delete(
    `/delete_department?id=${id}&org_id=${org_id}`
  );
  return response.data;
};
