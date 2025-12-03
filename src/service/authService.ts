import axios from "axios";

export const loginWeb = async (data: any) => {
  return await axios.post(
    "https://uatbase.aivapm.com/api/login_web",
    new URLSearchParams(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

// 🔹 NEW: org dropdown API
export const getOrganizations = async () => {
  return await axios.get(
    "https://uatbase.aivapm.com/get_organization?org_id=3"
  );
}
// import axiosInstance from "@/utils/axiosInstance";

// // 🔹 LOGIN API (x-www-form-urlencoded)
// export const loginWeb = async (data: any) => {
//   return await axiosInstance.post(
//     "/api/login_web",
//     new URLSearchParams(data),
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );
// };

// // 🔹 SUPERADMIN — get full org list
// export const getAllOrganizations = async () => {
//   return await axiosInstance.get("/get_organizations");
// };

// // 🔹 NORMAL USER — get only their org
// export const getSingleOrganization = async (orgId: any) => {
//   return await axiosInstance.get(`/get_organization?org_id=${orgId}`);
// };

