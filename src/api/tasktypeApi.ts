// src/api/tasktypeApi.ts
import axiosInstance from "@/utils/axiosInstance";

/* ============================================
   1) API Response Types
============================================ */

export interface CustomFieldResponse {
  label_id: number;
  lable_name: string;
  lable_type: string;
  is_assignee: boolean;
  is_required: boolean;
  lable_value: string[] | null;
}

export interface TaskTypeResponse {
  task_id: number;
  task_name: string;
  is_csat: boolean;
  csat_required: boolean;
  form_id: number | null;
  is_hidden: boolean;
  fields: CustomFieldResponse[];
}

export interface PaginationInfo {
  count: number;
  next: number | null;
  prev: number | null;
}

export interface TaskTypesResponse {
  success: boolean;
  data: TaskTypeResponse[];
  pagination: PaginationInfo;
}

export interface FormsDropdownResponse {
  id: number;
  form_name: string;
}

/* ============================================
   2) GET Task Type list (Pagination)
============================================ */

export const getTaskTypes = async (org_id: number, limit: number, next: number) => {
  const response = await axiosInstance.get("/get_tasktype_basic_details", {
    params: {
      org_id,
      limit,
      next,
    },
  });

  return response.data as TaskTypesResponse;
};

/* ============================================
   3) POST Create Task + First Custom Field
============================================ */

export const createTaskAndCustomField = async (payload: any) => {
  const res = await axiosInstance.post("/create_task_and_custom_field", payload);
  return res.data;
};

/* ============================================
   4) POST Add Custom Field to existing task
============================================ */

export const addCustomField = async (payload: any) => {
  const res = await axiosInstance.post("/create_task_and_custom_field", payload);
  return res.data;
};

/* ============================================
   5) DELETE Single Custom Field
   curl:
   /delete_single_custom_field?task_type_id=35&label_id=63
============================================ */

export const deleteCustomField = async (params: {
  task_type_id: number;
  label_id: number;
}) => {
  console.log("API call params:", params);

  const res = await axiosInstance.delete("/delete_single_custom_field", {
    params: {
      task_type_id: params.task_type_id,
      label_id: params.label_id
    }
  });

  console.log("API response:", res.data);
  return res.data;
};

/* ============================================
   6) PATCH Hide / Restore Task Type
============================================ */

export const hideTask = async (org_id: number, actionBody: any) => {
  return (
    await axiosInstance.patch("/hide_task_status", actionBody, {
      params: { org_id },
    })
  ).data;
};

/* ============================================
   7) DELETE Hard Delete Task
============================================ */

export const hardDeleteTask = async (org_id: number, task_id: number) => {
  return (
    await axiosInstance.delete("/hard_delete_task", {
      params: { org_id, task_id },
    })
  ).data;
};

/* ============================================
   8) GET Form Dropdown
============================================ */

export const getFormsDropdown = async (org_id: number) => {
  return (
    await axiosInstance.get("/get_forms_dropdown", {
      params: { org_id, prev: 1 },
    })
  ).data;
};
