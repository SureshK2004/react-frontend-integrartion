// src/api/shiftTimeApi.ts
import axiosInstance from '@/utils/axiosInstance';

// GET - Get shift times
export const getShiftTimes = async (org_id: number, page?: number, limit?: number) => {
    const response = await axiosInstance.get('/list_shift_time', {
        params: {
            org_id,
            prev: page || 1,
            limit: limit || 10
        }
    });
    return response.data;
};

// POST - Create shift time
export const createShiftTime = async (data: {
    org_id: number;
    shift_name: string;
    start_time: string;
    end_time: string;
}) => {
    const response = await axiosInstance.post('/create_shift_time', data);
    return response.data;
};

// PUT - Update shift time
export const updateShiftTime = async (data: {
    shift_id: number;
    org_id: number;
    shift_name: string;
    start_time: string;
    end_time: string;
}) => {
    const response = await axiosInstance.put('/update_shift_time', data);
    return response.data;
};

// DELETE - Delete shift time
export const deleteShiftTime = async (shift_id: number, org_id: number) => {
    const response = await axiosInstance.delete('/delete_shift_time', {
        params: {
            shift_id,
            org_id
        }
    });
    return response.data;
};