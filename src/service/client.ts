import axiosInstance from "@/utils/axiosInstance";

const ORG_ID = 3; 

const clientAPI = {
  getAll: (page: number, limit: number) => {
    return axiosInstance.get(
      `api/clients/get-all/?org_id=${ORG_ID}&limit=${limit}&next=${page}`
    );
  },
    
  getTeams: () =>
    axiosInstance.get(`api/team_list/?org_id=${ORG_ID}`),

  getEmployees: () =>
    axiosInstance.get(`api/get_user_list?org_id=${ORG_ID}`),


  getById: (client_id: number) => {
    return axiosInstance.get(
      `api/clients/get-by-id/?org_id=${ORG_ID}&client_id=${client_id}`
    );
  },

  create: (data: any) => {
    return axiosInstance.post(`api/clients/create/`, data);
  },

  update: (data: any) => {
    return axiosInstance.put(`api/clients/update/`, data);
  },

  delete: (client_id: number) => {
    return axiosInstance.delete(
      `api/clients/delete/?org_id=${ORG_ID}&client_id=${client_id}`
    );
  },
};

export default clientAPI;
