// src/components/sla/SLAConfigure.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";

import {
  getSlaList,
  createSla,
  updateSla,
  deleteSla,
  SlaItem,
} from "@/api/slaConfigureApi";
import SLAEditModal from "./SlaEditmodal";

const org_id = 3;

const capitalize = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

const uiUnitToApiUnit = (unit: string) =>
  unit.toLowerCase() === "hours" ? "hrs" : "days";

const apiUnitToUIUnit = (unit: string) => {
  const u = unit.toLowerCase();
  if (u.startsWith("hr")) return "Hours";
  if (u.startsWith("day")) return "Days";
  return capitalize(unit);
};



const SLAConfigure: React.FC = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<SlaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selected, setSelected] = useState<SlaItem | null>(null);



  const fetchList = async () => {
    try {
      setLoading(true);

      const res = await getSlaList(org_id);

      // FIX: Read sla_list instead of data
      const items: any[] = res?.sla_list ?? [];

      const mapped = items.map((it) => ({
        id: Number(it.id),
        priority_level: String(it.priority_level ?? ""),
        res_time: String(it.res_time ?? ""),
        res_in: String(it.res_in ?? ""),
        created_date: it.created_date,
        org_id: it.org_id ?? org_id,
      }));

      setList(mapped);

    } catch (err) {
      console.error("Error fetching SLA list", err);
      alert("Failed to fetch SLA data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchList();
  }, []);



  const totalCount = list.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const rows = useMemo(() => {
    const start = (page - 1) * itemsPerPage;

    return list.slice(start, start + itemsPerPage).map((it, idx) => ({
      ...it,
      sno: start + idx + 1,
      priority: capitalize(it.priority_level),
      resolutionTime: `${it.res_time} ${apiUnitToUIUnit(it.res_in)}`,
    }));
  }, [list, page, itemsPerPage]);



  const handleAdd = async (form: any) => {
    try {
      const payload = {
        priority_level: String(form.priority).toLowerCase(),
        res_time: String(form.resolutionTime),
        res_in: uiUnitToApiUnit(String(form.resolutionUnit)),
        org_id,
      };

      const res = await createSla(payload);

      if (res?.status === "success") {
        fetchList();
        setShowAdd(false);
      } else {
        alert(res?.message || "Failed to create SLA");
      }
    } catch (err) {
      console.error("Error creating SLA", err);
      alert("Error creating SLA");
    }
  };



  const handleEdit = async (form: any) => {
    if (!selected) return;

    try {
      const payload = {
        id: selected.id,
        priority_level: String(form.priority).toLowerCase(),
        res_time: String(form.resolutionTime),
        res_in: uiUnitToApiUnit(String(form.resolutionUnit)),
        org_id,
      };

      const res = await updateSla(payload);

      if (res?.status === "success") {
        fetchList();
        setShowEdit(false);
        setSelected(null);
      } else {
        alert(res?.message || "Failed to update SLA");
      }
    } catch (err) {
      console.error("Error updating SLA", err);
      alert("Error updating SLA");
    }
  };



  const handleDelete = async () => {
    if (!selected) return;

    try {
      const res = await deleteSla(selected.id, org_id);

      if (res?.status === "success") {
        fetchList();
        setShowDelete(false);
        setSelected(null);
      } else {
        alert(res?.message || "Failed to delete SLA");
      }
    } catch (err) {
      console.error("Error deleting SLA", err);
      alert("Error deleting SLA");
    }
  };



  const renderActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
        onClick={() => {
          const it = list.find((x) => x.id === row.id);
          setSelected(it ?? null);
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
          const it = list.find((x) => x.id === row.id);
          setSelected(it ?? null);
          setShowDelete(true);
        }}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  const columns = [
    { key: "sno", label: "S.No" },
    { key: "priority", label: "Priority" },
    { key: "resolutionTime", label: "Resolution Time" },
    { key: "actions", label: "Actions" },
  ];


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              SLA Configuration
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

        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              SLA List
            </h2>

            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <Plus size={18} /> Add SLA
            </button>
          </div>


          <AddModal
            title="Add SLA Configuration"
            isOpen={showAdd}
            onClose={() => setShowAdd(false)}
            onSubmit={handleAdd}
            fields={[
              { label: "Priority", key: "priority", type: "select", options: ["High", "Medium", "Low"] },
              { label: "Resolution Time", key: "resolutionTime", type: "number", placeholder: "Enter time (e.g., 4)" },
              { label: "Resolution Unit", key: "resolutionUnit", type: "select", options: ["Hours", "Days"] },
            ]}
          />

          <SLAEditModal
            title="Edit SLA"
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            onSubmit={handleEdit}
            initialData={
              selected
                ? {
                  priority: capitalize(selected.priority_level),
                  resolutionTime: selected.res_time,
                  resolutionUnit: apiUnitToUIUnit(selected.res_in),
                }
                : {}
            }
          />


          <DeleteModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            onConfirm={handleDelete}
            title="Delete SLA"
            message={`Are you sure you want to delete "${selected?.priority_level ?? ""}"?`}
            itemName={selected ? `${capitalize(selected.priority_level)} SLA` : ""}
          />


          <TableComponent
            tableId="sla-config-table"
            columns={columns}
            data={rows.map((r) => ({ ...r, actions: renderActions(r) }))}
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
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

export default SLAConfigure;