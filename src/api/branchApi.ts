import axiosInstance from "@/utils/axiosInstance";

// GET - Branch List (server-side paginated)
export const getBranches = async (org_id: number, page: number, limit: number) => {
    const response = await axiosInstance.get("/get_branch", {
        params: {
            org_id,
            prev: page,
            limit,
            next: null
        },
    });
    return response.data;
};

// POST - Create Branch
export const createBranch = async (payload: {
    branch_name: string;
    org_id: number;
}) => {
    const response = await axiosInstance.post("/create_branch", payload);
    return response.data;
};

// PUT - Update Branch
export const updateBranch = async (payload: {
    id: number;
    branch_name: string;
    org_id: number;
}) => {
    const response = await axiosInstance.put("/update_branch", payload);
    return response.data;
};

// DELETE - Delete Branch
export const deleteBranch = async (id: number, org_id: number) => {
    const response = await axiosInstance.delete("/delete_branch", {
        params: { id, org_id },
    });
    return response.data;
};
