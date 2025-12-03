// src/api/slaconfigureApi.ts
import axiosInstance from "../utils/axiosInstance";

export interface SlaItem {
  id: number;
  priority_level: string; 
  res_time: string;
  res_in: string; 
  created_date?: string;
  org_id?: number;
}


export const getSlaList = async (org_id: number) => {
  const res = await axiosInstance.get("/get_sla", { params: { org_id } });
  return res.data;
};

export const createSla = async (payload: {
  priority_level: string;
  res_time: string;
  res_in: string;
  org_id: number;
}) => {
  const body = {
    priority_level: payload.priority_level,
    res_time: payload.res_time,
    res_in: payload.res_in,
    created_date: new Date().toISOString(),
    org_id: payload.org_id,
  };

  const res = await axiosInstance.post("/create_sla", body, {
    params: { org_id: payload.org_id },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};




export const updateSla = async (payload: {
  id: number;
  priority_level: string;
  res_time: string | number;
  res_in: string;
  org_id: number;
}) => {
  const res = await axiosInstance.put("/update_sla", payload, {
    params: { org_id: payload.org_id },
  });
  return res.data;
};


export const deleteSla = async (id: number, org_id: number) => {
  const res = await axiosInstance.delete("/delete_sla", {
    params: { org_id, id },
    data: { org_id, id },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};