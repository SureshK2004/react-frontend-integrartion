import axiosInstance from "../utils/axiosInstance";

// GET — List projects
export const getProjects = async (org_id: number) => {
    const response = await axiosInstance.get("/get_project", {
        params: { org_id },
    });
    return response.data;
};

// CREATE — Add new project
export const createProject = async (payload: {
    project_name: string;
    location: number | null;
    entity: number | null;
    org_id: number;
}) => {
    const response = await axiosInstance.post("/create_project", payload);
    return response.data;
};

// UPDATE — Edit a project
export const updateProject = async (payload: {
    id: number;
    project_name: string;
    location: number | null;
    entity: number | null;
    org_id: number;
}) => {
    const response = await axiosInstance.put("/update_project", payload);
    return response.data;
};

// DELETE — Remove project
export const deleteProject = async (id: number, org_id: number) => {
    const response = await axiosInstance.delete("/delete_project", {
        params: { id, org_id },
    });
    return response.data;
};

export const getLocations = async (org_id: number) => {
    const res = await axiosInstance.get("/location_list_api", {
        params: { org_id }
    });
    return res.data?.results || [];
};

export const getEntities = async (org_id: number) => {
    const res = await axiosInstance.get("/entity_list_api", {
        params: { org_id }
    });
    return res.data?.results || [];
};

