import axiosInstance from "@/utils/axiosInstance";

export const getOrganisationDetails = async (
    page: number = 1,
    limit: number = 5,
    search?: string
) => {
    const response = await axiosInstance.get("/get_organisation_details", {
        params: {
            prev: page,
            limit,
            search: search || "",
        },
    });

    return response.data;
};

export const deleteOrganisation = async (org_id: number) => {
  const response = await axiosInstance.delete("/org_delete", {
    params: {
      org_id,
    },
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};

export const updateOrganisation = async (orgId: string, formData: FormData) => {
  const response = await fetch(`https://uatbase.aivapm.com/update_organisation_api?org_id=${orgId}`, {
    method: 'PUT',
    body: formData,
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};