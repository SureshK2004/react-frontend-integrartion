import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import {
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity,
} from "@/api/entityApi";

const Entry: React.FC = () => {
  const navigate = useNavigate();

  /** Modal States */
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any>(null);

  /** Data + Pagination */
  const [entityData, setEntityData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const org_id = 3;

  /** Fetch entities */
  const fetchEntities = async () => {
    try {
      const res = await getEntities(org_id);

      if (res?.data && Array.isArray(res.data)) {
        setEntityData(res.data);
      } else {
        setEntityData([]);
      }
    } catch (error) {
      console.error("Error fetching entities:", error);
    }
  };

  useEffect(() => {
    fetchEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Add */
  const handleAdd = async (data: any) => {
    await createEntity({
      name: data.name,
      org_id,
    });

    setShowAdd(false);
    fetchEntities();
  };

  /** Edit */
  const handleEdit = async (data: any) => {
    await updateEntity({
      entity_id: selectedItem?.entity_id,
      name: data.name,
      org_id,
    });

    setShowEdit(false);
    fetchEntities();
  };

  /** Delete */
  const handleDelete = async () => {
    await deleteEntity(org_id, selectedItem?.entity_id);

    setShowDelete(false);
    fetchEntities();
  };

  /** Table Columns */
  const columns = [
    { key: "sno", label: "S.No" },
    { key: "name", label: "Entity" },
    { key: "actions", label: "Actions" },
  ];

  const totalPages = Math.ceil(entityData.length / itemsPerPage);

  /** Action Buttons */
  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
        onClick={() => {
          setSelectedItem(row);
          setShowEdit(true);
        }}
      >
        <Edit className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
        onClick={() => {
          setSelectedItem(row);
          setShowDelete(true);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Entity Details
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
              >
                <ArrowLeft size={18} /> Back
              </button>
              <ThemeToggle />
            </div>

          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between">

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tables
            </h2>

            <div className="flex items-center gap-3">
              {/* === RESTORED OLD UI: Upload button as plain <button> with original classes === */}
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                onClick={() => {
                  /* keep whatever upload logic you have, placeholder for now */
                  console.log("Upload clicked");
                }}
              >
                <Upload size={18} /> Upload
              </button>

              {/* === RESTORED OLD UI: Add Entity button as plain <button> with original classes === */}
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setShowAdd(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowBigDownDash size={18} /> Add Entity
              </button>
            </div>

          </div>

          {/* ADD MODAL */}
          <AddModal
            title="Add Entity"
            isOpen={showAdd}
            onClose={() => setShowAdd(false)}
            onSubmit={handleAdd}
            fields={[
              {
                label: "Entity Name",
                key: "name",
                placeholder: "Enter entity name",
              },
            ]}
          />

          {/* EDIT MODAL */}
          <EditModal
            title="Edit Entity"
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            onSubmit={handleEdit}
            fields={[
              { label: "Entity Name", key: "name", type: "text" },
            ]}
            initialData={{
              name: selectedItem?.name || "",
            }}
          />

          {/* DELETE MODAL */}
          <DeleteModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            onConfirm={handleDelete}
            title="Delete Entity"
            message="Are you sure you want to delete this entity?"
            itemName={selectedItem?.name}
          />

          {/* TABLE */}
          <TableComponent
            tableId="entity-table-details"
            columns={columns}
            data={entityData
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((d, index) => ({
                ...d,
                sno: (page - 1) * itemsPerPage + (index + 1),
                actions: renderActions(d),
              }))
            }
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalCount={entityData.length}
            onPageChange={setPage}
            onItemsPerPageChange={(limit) => {
              setItemsPerPage(limit);
              setPage(1);
            }}
          />

        </div>
      </div>
    </div>
  );
};

export default Entry;
