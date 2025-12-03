import axiosInstance from "@/utils/axiosInstance";

//  GET all entities
export const getEntities = async (org_id: number) => {
  try {
    const response = await axiosInstance.get("/get_entity_api", {
      params: { org_id },
    });
    console.log("get Entity List:", response.data);
    return response.data;
  } catch (error) {
    console.error("get Error fetching entities:", error);
    throw error;
  }
};

//  POST new entity
export const createEntity = async (data: { name: string; org_id: number }) => {
  try {
    console.log("post Payload:", data);
    const response = await axiosInstance.post("/create_entity_api", data);
    console.log("post Entity Created:", response.data);
    return response.data;
  } catch (error) {
    console.error(" post Error creating entity:", error);
    throw error;
  }
};

// PUT update entity
export const updateEntity = async (data: {
  entity_id: number;
  name: string;
  org_id: number;
}) => {
  try {
    console.log("put Payload:", data);
    const response = await axiosInstance.put("/update_entity_api", data);
    console.log("put Entity Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("put Error updating entity:", error);
    throw error;
  }
};

//  DELETE entity
export const deleteEntity = async (org_id: number, entity_id: number) => {
  try {
    console.log("delete Payload:", { org_id, entity_id });
    const response = await axiosInstance.delete("/delete_entity_api", {
      params: { org_id, entity_id },
    });
    console.log("delete Entity Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(" delete Error deleting entity:", error);
    throw error;
  }
};
