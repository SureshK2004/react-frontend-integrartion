// src/components/leave/LeaveList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, ArrowBigDownDash, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import LeaveAddModal from "./LeaveAddModal";
import LeaveEditModal from "./LeaveEditModal";
import DeleteModal from "./DeleteModal"; 

import { getLeaveData, createLeave, updateLeave, deleteLeave, LeaveType } from "@/api/LeaveApi";

const LeaveList: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selected, setSelected] = useState<LeaveType | null>(null);

  const org_id = 3;

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await getLeaveData(org_id);
    
      const list = res?.data?.leave_types ?? [];
     
      const mapped = list.map((l: any) => ({
        id: l.id,
        name: l.name,
        no_of_leave: String(l.no_of_leave ?? l.no_of_leave ?? ""),
        leave_config_type: String(l.leave_config_type ?? l.leave_config_type ?? ""),
        monthly_split: Boolean(l.monthly_split ?? l.monthly_split),
        leave_carry_forward: Boolean(l.leave_carry_forward ?? l.leave_carry_forward),
        carry_forward_limit: Number(l.carry_forward_limit ?? 0),
        org_id: l.org_id ?? org_id,
      }));
      setData(mapped);
    } catch (err) {
      console.error("Fetch leave error", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();

  }, []);


  const handleAdd = async (form: any) => {
    try {
      const payload = {
        name: form.name,
        no_of_leave: String(form.no_of_leave),
        monthly_split: Boolean(form.monthly_split),
        leave_config_type: form.leave_config_type,
        leave_carry_forward: Boolean(form.leave_carry_forward),
        carry_forward_limit: Number(form.carry_forward_limit),
        org_id,
      };
      const res = await createLeave(payload);
      if (res?.success) {
        await fetchList();
        setShowAdd(false);
      } else {
        alert(res?.message || "Failed to add leave");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding leave");
    }
  };


  const handleEdit = async (form: any) => {
    if (!selected) return;
    try {
      const payload = {
        id: selected.id,
        org_id,
        name: form.name,
        no_of_leave: String(form.no_of_leave),
        monthly_split: Boolean(form.monthly_split),
        leave_config_type: form.leave_config_type,
        leave_carry_forward: Boolean(form.leave_carry_forward),
        carry_forward_limit: Number(form.carry_forward_limit),
      };
      const res = await updateLeave(payload);
      if (res?.success) {
        await fetchList();
        setShowEdit(false);
        setSelected(null);
      } else {
        alert(res?.message || "Failed to update leave");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating leave");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!selected) return;
    try {
      const res = await deleteLeave(selected.id, org_id);
      if (res?.success) {
        await fetchList();
        setShowDelete(false);
        setSelected(null);
      } else {
        alert(res?.message || "Failed to delete leave");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting leave");
    }
  };

  const columns = [
    { key: "sno", label: "S.No" },
    { key: "name", label: "Leave Name" },
    { key: "no_of_leave", label: "Total Leave" },
    { key: "leave_config_type", label: "Monthly / Yearly" },
    { key: "leave_carry_forward", label: "Carry Forward" },
    { key: "carry_forward_limit", label: "Carry Forward Limit" },
    { key: "actions", label: "Actions" },
  ];

  const renderActions = (row: LeaveType) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
        onClick={() => {
          setSelected(row);
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
          setSelected(row);
          setShowDelete(true);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  const rows = data
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((d, i) => ({
      ...d,
      sno: (page - 1) * itemsPerPage + (i + 1),
      leave_carry_forward: d.leave_carry_forward ? "Yes" : "No",
      actions: renderActions(d),
    }));

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leave List</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                <ArrowLeft size={18} /> Back
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Leaves</h2>
            <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <ArrowBigDownDash size={18} /> Add Leave
            </button>
          </div>

          <LeaveAddModal
            isOpen={showAdd}
            onClose={() => setShowAdd(false)}
            onSubmit={(form) => {
              handleAdd({
                ...form,
                // leaveAddModal uses property names different from parent; unify:
                name: form.name,
                no_of_leave: form.no_of_leave,
              });
            }}
          />

          <LeaveEditModal
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            initialData={selected}
            onSubmit={(form) => {
              handleEdit({
                ...form,
              });
            }}
          />

          <DeleteModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            onConfirm={handleDelete}
            title="Delete Leave"
            message={`Are you sure you want to delete "${selected?.name ?? ""}"?`}
            itemName={selected?.name ?? ""}
          />

          <TableComponent
            tableId="leave-table"
            columns={columns}
            data={rows}
            currentPage={page}
            totalPages={totalPages}
            totalCount={data.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(p) => setPage(p)}
            onItemsPerPageChange={(limit) => {
              setItemsPerPage(limit);
              setPage(1);
            }}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
