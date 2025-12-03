import axiosInstance from "@/utils/axiosInstance";

export const createOrganisation = async (data: FormData) => {
    const response = await axiosInstance.post(
        "/create_organisation_api",
        data,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};
