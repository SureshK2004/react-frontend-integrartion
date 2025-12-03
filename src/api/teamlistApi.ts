
import axios from "axios";

const API_BASE = "https://uatbase.aivapm.com";

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
       
    },
});

export async function getTeams(org_id: number, page: number = 1, limit: number = 10) {
    const res = await axiosInstance.get(`/get_users_by_team`, {
        params: { 
            org_id, 
            limit, 
            next: page 
        },
    });
    return res.data;
}


export async function getViewMembers(org_id: number, team_id: number, limit: number = 5, next?: number) {
    const res = await axiosInstance.get(`/get_view_members`, {
        params: { 
            org_id, 
            team_id, 
            limit, 
            next 
        }
    });

    return res.data;
}


export async function createTeamWithMembers(org_id: number, team_name: string, emp_Id?: string) {
    const payload: any = { org_id, team_name };
    if (emp_Id) payload.emp_Id = emp_Id;
    const res = await axiosInstance.post(`/create_team_with_members`, payload);
    return res.data;
}

export async function updateTeamWithMembers(org_id: number, team_id: number, team_name: string, emp_Id?: string) {
    const payload: any = { org_id, team_id, team_name };
    if (emp_Id) payload.emp_Id = emp_Id;
    const res = await axiosInstance.put(`/update_team_with_members`, payload);
    return res.data;
}

export async function addTeamMembers(org_id: number, team_id: number, add_emp: string[]) {
    const res = await axiosInstance.patch(`/add_team_members`, {
        org_id,
        team_id,
        add_emp,
    });
    return res.data;
}

export async function removeTeamMembers(org_id: number, team_id: number, remove_emp: string[]) {
    const res = await axiosInstance.patch(`/remove_team_members`, {
        org_id,
        team_id,
        remove_emp,
    });
    return res.data;
}

export async function deleteTeamAndUnlinkMember(org_id: number, team_id: number, emp_Id?: string) {

    const params: any = { org_id, team_id };
    if (emp_Id) params.emp_Id = emp_Id;
    const res = await axiosInstance.delete(`/delete_team_and_unlink_member`, { params });
    return res.data;
}

export const getuserlists = async (org_id: number) => {
    const res = await axiosInstance.get("/get_user_list", {
        params: { org_id },
    });    
    return res.data?.data ?? []; 
};

