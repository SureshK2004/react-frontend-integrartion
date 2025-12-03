import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import ExportComponent from "@/components/exportOption/exportTo";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import UploadModal from "./UploadModal";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/api/departmentApi";

const Department: React.FC = () => {
  const navigate = useNavigate();

  // modal management
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleFileUpload = (file: File) => {
    console.log("Uploaded File:", file);
    // parse or send file to backend if needed
  };

  // table & pagination states
  const [departments, setDepartments] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const org_id = 3;

  // fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await getDepartments(org_id, page, itemsPerPage);

      const list = res?.departments || [];

      setDepartments(list.map((d: any) => ({
        id: d.id,
        department: d.department,
      })));

      const total = res?.total_count ?? list.length;
      setTotalCount(total);
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));

    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  // load on mount and when page/itemsPerPage changes
  useEffect(() => {
    fetchDepartments();
  }, [page, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    setPage(newPage);
  };

  const handleLimitChange = (val: number) => {
    setItemsPerPage(val);
    setPage(1);
  };

  const handleSubmit = async (form: any) => {
    try {
      if (modalMode === "add") {
        await createDepartment({
          department: form.department,
          org_id,
        });
      }

      if (modalMode === "edit") {
        await updateDepartment({
          id: selectedItem?.id,
          department: form.department,
          org_id,
        });
      }

      if (modalMode === "delete") {
        await deleteDepartment(selectedItem?.id, org_id);
      }

      setShowModal(false);
      setSelectedItem(null);
      
      // Refresh data and reset to first page after modifications
      if (modalMode === "add" || modalMode === "delete") {
        setPage(1);
      } else {
        fetchDepartments();
      }
    } catch (err) {
      console.error("Error submitting department:", err);
    }
  };

  const columns = [
    { key: "sno", label: "S.No" },
    { key: "department", label: "Department" },
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">
       
        <div className="bg-white dark:bg-gray-800 px-6 py-4 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Departments Details
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tables</h2>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Upload size={18} />
                Upload Excel
              </button>

              <UploadModal
                title="Upload Departments Excel"
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onSubmit={handleFileUpload}
              />

              <button
                onClick={() => {
                  setModalMode("add");
                  setSelectedItem(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowBigDownDash size={18} />
                Add Department
              </button>

              <AddModal
                title="Add Department"
                isOpen={showModal && modalMode === "add"}
                onClose={() => setShowModal(false)}
                onSubmit={(form) => handleSubmit(form)}
                fields={[{ label: "Department Name", key: "department" }]}
              />
            </div>
          </div>

          
          <EditModal
            title="Edit Department"
            isOpen={showModal && modalMode === "edit"}
            onClose={() => setShowModal(false)}
            onSubmit={(form) => handleSubmit(form)}
            fields={[{ label: "Department Name", key: "department" }]}
            initialData={{ department: selectedItem?.department || "" }}
          />

          
          <DeleteModal
            isOpen={showModal && modalMode === "delete"}
            onClose={() => setShowModal(false)}
            onConfirm={() => handleSubmit({})}
            title="Delete Department"
            message="Are you sure you want to delete this department?"
            itemName={selectedItem?.department}
          />

         
          <TableComponent
            tableId="department-table-detials"
            columns={columns}
            data={departments.map((d, i) => ({
              ...d,
              sno: (page - 1) * itemsPerPage + (i + 1),
              actions: renderActions(d),
            }))}
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleLimitChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Department;