import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import ProjectAddModal from "./ProjectAddmodal";
import ProjectEditModal from "./ProjectEditModal";
import DeleteModal from "./DeleteModal";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "@/api/projectlistApi";

const ProjectList: React.FC = () => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const [projectData, setProjectData] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const org_id = 3;

   
    const fetchProjects = async () => {
        try {
            const res = await getProjects(org_id);
            const list = res?.data || [];

            setProjectData(
                list.map((p: any) => ({
                    id: p.id,
                    project_name: p.project_name,
                    location: p.location_name,
                    location_id: p.location,
                    entity: p.entity_name,
                    entity_id: p.entity,
                }))
            );

            const total = list.length;
            setTotalCount(total);
            setTotalPages(Math.ceil(total / limit));
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [limit]);

   
    const handleSubmit = async (form: any) => {
        try {
            if (modalMode === "add") {
                await createProject({
                    project_name: form.project_name,
                    location: Number(form.location) || null,
                    entity: Number(form.entity) || null,
                    org_id,
                });
            }

            if (modalMode === "edit") {
                await updateProject({
                    id: selectedItem?.id,
                    project_name: form.project_name,
                    location: Number(form.location) || null,
                    entity: Number(form.entity) || null,
                    org_id,
                });
            }

            if (modalMode === "delete") {
                await deleteProject(selectedItem?.id, org_id);
            }

            setShowModal(false);
            setSelectedItem(null);
            fetchProjects();
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

   
    const columns = [
        { key: "sno", label: "S.No" },
        { key: "project_name", label: "Project Name" },
        { key: "location", label: "Location" },
        { key: "entity", label: "Entity" },
        { key: "actions", label: "Actions" },
    ];

    const renderActions = (row: any) => (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
                onClick={() => {
                    setModalMode("edit");
                    setSelectedItem(row);
                    setShowModal(true);
                }}
            >
                <Edit className="w-4 h-4" />
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
                onClick={() => {
                    setModalMode("delete");
                    setSelectedItem(row);
                    setShowModal(true);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );

  
    const paginatedRows = projectData.slice(
        (page - 1) * limit,
        page * limit
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
            <div className="max-w-7xl mx-auto">

               
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Project List
                        </h2>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                
                <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Tables
                        </h2>

                        <button
                            onClick={() => {
                                setModalMode("add");
                                setSelectedItem(null);
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                            <ArrowBigDownDash size={18} /> Add Project
                        </button>
                    </div>

                   
                    <ProjectAddModal
                        isOpen={showModal && modalMode === "add"}
                        onClose={() => setShowModal(false)}
                        onSubmit={handleSubmit}
                        org_id={org_id}
                    />

                    
                    <ProjectEditModal
                        isOpen={showModal && modalMode === "edit"}
                        onClose={() => setShowModal(false)}
                        onSubmit={handleSubmit}
                        org_id={org_id}
                        initialData={selectedItem}
                    />

                
                    <DeleteModal
                        isOpen={showModal && modalMode === "delete"}
                        onClose={() => setShowModal(false)}
                        onConfirm={() => handleSubmit({})}
                        title="Delete Project"
                        message="Are you sure you want to delete this project?"
                        itemName={selectedItem?.project_name}
                    />

                   
                    <TableComponent
                        tableId="project-table-details"
                        columns={columns}
                        data={paginatedRows.map((d, i) => ({
                            ...d,
                            sno: (page - 1) * limit + (i + 1),
                            actions: renderActions(d),
                        }))}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={limit}
                        totalCount={totalCount}
                        onPageChange={setPage}
                        onItemsPerPageChange={setLimit}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
