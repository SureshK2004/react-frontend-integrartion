import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import UploadModal from "./UploadModal";
import {
  getDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "@/api/designationApi";

const Designation: React.FC = () => {
  const navigate = useNavigate();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);


  const [designationData, setDesignationData] = useState<any[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState<any>(null);

  
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [prevPage, setPrevPage] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const org_id = 3;


  const fetchDesignations = useCallback(async () => {
    try {
      const response = await getDesignations(org_id, page, itemsPerPage);

      if (response.status === "success") {
        const dataList = response.data || [];

        const mappedData = dataList.map((d: any) => ({
          id: d.design_id,
          designation: d.designation,
          leaves: d.no_of_leave === "none" ? 0 : Number(d.no_of_leave),
        }));

        setDesignationData(mappedData);

     
        setNextPage(response.next_page);
        setPrevPage(response.previous_page);

        const total = response.total_count || 0;
        setTotalCount(total); 
        setTotalPages(Math.ceil(total / itemsPerPage));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch designations");
    }
  }, [page, itemsPerPage]); 

  useEffect(() => {
    fetchDesignations();
  }, [page, itemsPerPage, refresh, fetchDesignations]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); 
  };


  const handleAdd = async (data: any) => {
    try {
      const payload = {
        designation: data.designation,
        no_of_leave: data.leaves,
        org_id,
      };

      const response = await createDesignation(payload);

      if (response.message?.toLowerCase().includes("already exists")) {
        alert(response.message);
      } else {
        alert("Designation created successfully!");
        setRefresh((prev) => !prev);
      }

      setShowAddModal(false);
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create designation");
    }
  };


  const handleEditClick = (row: any) => {
    setSelectedDesignation(row);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (data: any) => {
    try {
      await updateDesignation({
        id: selectedDesignation.id,
        designation: data.designation,
        no_of_leave: data.leaves.toString(),
        org_id,
      });

      alert("Designation updated successfully!");
      setRefresh((prev) => !prev);
      setShowEditModal(false);
      setSelectedDesignation(null);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update designation");
    }
  };


  const handleDeleteClick = (row: any) => {
    setSelectedDesignation(row);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDesignation) return;

    try {
      await deleteDesignation(selectedDesignation.id, org_id);
      alert("Designation deleted successfully!");
      setRefresh((prev) => !prev);
      setShowDeleteModal(false);
      setSelectedDesignation(null);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete designation");
    }
  };

  const handleFileUpload = (file: File) => {
    console.log("Upload:", file);
    // Implement your file upload logic here
  };

  const columns = [
    { key: "sno", label: "S.No" },
    { key: "designation", label: "Designation" },
    { key: "leaves", label: "No. of Leaves" },
    { key: "actions", label: "Actions" },
  ];

  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => handleEditClick(row)}
        className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
        size="sm"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => handleDeleteClick(row)}
        className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        size="sm"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Designation Details
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

       
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tables
              </h2>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
             bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 
             transition-colors duration-200"
              >
                <Upload size={18} />
                Upload Excel
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowBigDownDash size={18} />
                Add Designation
              </button>
            </div>
          </div>

          <TableComponent
            tableId="designation-table-details"
            columns={columns}
            data={designationData.map((d, index) => ({
              ...d,
              sno: (page - 1) * itemsPerPage + (index + 1),   // FIX
              actions: renderActions(d),
            }))}
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalCount={totalCount}
          />

          <div className="flex justify-between text-sm text-gray-500 px-2">
            <span>Previous Page: {prevPage ?? "None"}</span>
            <span>Next Page: {nextPage ?? "None"}</span>
          </div>
        </div>
      </div>

      <AddModal
        title="Add Designation"
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAdd}
        fields={[
          { label: "Designation Name", key: "designation", type: "text" },
          { label: "No. of Leaves", key: "leaves", type: "number" },
        ]}
      />

      <EditModal
        title="Edit Designation"
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedDesignation(null);
        }}
        onSubmit={handleEditSubmit}
        fields={[
          { label: "Designation Name", key: "designation", type: "text" },
          { label: "No. of Leaves", key: "leaves", type: "number" },
        ]}
        initialData={selectedDesignation || {}}
      />

    
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedDesignation(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Designation"
        message="Are you sure you want to delete this designation? This will remove all associated data."
        itemName={selectedDesignation?.designation}
      />

    
      <UploadModal
        title="Upload Designation Excel"
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={handleFileUpload}
      />
    </div>
  );
};

export default Designation;
