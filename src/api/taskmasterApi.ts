import axiosInstance from "../utils/axiosInstance";

// GET — list tasks
export const getTasks = async (org_id: number) => {
    const response = await axiosInstance.get("/get_task_master", {
        params: { org_id },
    });
    return response.data;
};

// CREATE — add new task
export const createTask = async (payload: {
    task_name: string;
    status: number;
    org_id: number;
}) => {
    const response = await axiosInstance.post("/create_task_master", payload);
    return response.data;
};

// UPDATE — update task
export const updateTask = async (payload: {
    id: number;
    task_name: string;
    org_id: number;
}) => {
    const response = await axiosInstance.put("/update_task_master", payload);
    return response.data;
};

// DELETE — delete task
export const deleteTask = async (id: number, org_id: number) => {
    const response = await axiosInstance.delete("/delete_task_master", {
        params: { id, org_id },
    });
    return response.data;
};
