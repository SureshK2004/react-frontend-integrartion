import axiosInstance from '@/utils/axiosInstance';

export const getZones = async (org_id: number, page?: number, limit?: number) => {
    const response = await axiosInstance.get('/get_zone', {
        params: {
            org_id,
            prev: page || 1,
            limit: limit || 10
        }
    });
    return response.data;
};


export const createZone = async (data: {
    org_id: number;
    zone_name: string;
}) => {
    const response = await axiosInstance.post('/create_zone', data);
    return response.data;
};


export const updateZone = async (data: {
    id: number;
    org_id: number;
    zone_name: string;
}) => {
    const response = await axiosInstance.put('/update_zone', data);
    return response.data;
};

export const deleteZone = async (id: number, org_id: number) => {
    const response = await axiosInstance.delete('/delete_zone', {
        params: {
            id,
            org_id
        }
    });
    return response.data;
};