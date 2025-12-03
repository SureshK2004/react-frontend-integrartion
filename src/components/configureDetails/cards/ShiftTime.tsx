import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import { ArrowBigDownDash, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import {
  getShiftTimes,
  createShiftTime,
  updateShiftTime,
  deleteShiftTime,
} from "@/api/shift_timeApi";

const ShiftTime: React.FC = () => {
  const navigate = useNavigate();

 
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  
  const [shiftTimeData, setShiftTimeData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const org_id = 3;

  const fetchShiftTimes = async () => {
    try {
      const res = await getShiftTimes(org_id, page, itemsPerPage);

      setShiftTimeData(res?.data || []);
      const total = res?.total_count || 0;
      setTotalCount(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching shift times:", error);
    }
  };

  useEffect(() => {
    fetchShiftTimes();
  }, [page, itemsPerPage]);


  const handleAdd = async (data: any) => {
    await createShiftTime({
      org_id,
      shift_name: data.shiftName,
      start_time: data.startTime,
      end_time: data.endTime,
    });

    setShowAdd(false);
    fetchShiftTimes();
  };

  
  const handleEditShift = async (data: any) => {
    await updateShiftTime({
      shift_id: selectedItem?.shift_id,
      org_id,
      shift_name: data.shiftName,
      start_time: data.startTime,
      end_time: data.endTime,
    });

    setShowEdit(false);
    fetchShiftTimes();
  };

 
  const handleDeleteShift = async () => {
    await deleteShiftTime(selectedItem?.shift_id, org_id);

    setShowDelete(false);
    fetchShiftTimes();
  };


  const columns = [
    { key: "sno", label: "S.No" },
    { key: "shift_name", label: "Shift Name" },
    { key: "start_time", label: "Start Time" },
    { key: "end_time", label: "End Time" },
    { key: "actions", label: "Actions" },
  ];

  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

 
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

        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shift Details
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

        {/* TABLE BLOCK */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tables</h2>

            <Button
              onClick={() => {
                setSelectedItem(null);
                setShowAdd(true);
              }}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <ArrowBigDownDash size={18} /> Add Shift
            </Button>
          </div>

          
          <AddModal
            title="Add Shift"
            isOpen={showAdd}
            onClose={() => setShowAdd(false)}
            onSubmit={handleAdd}
            fields={[
              { label: "Shift Name", key: "shiftName" },
              { label: "Start Time", key: "startTime", type: "time" },
              { label: "End Time", key: "endTime", type: "time" },
            ]}
          />

        
          <EditModal
            title="Edit Shift"
            isOpen={showEdit}
            onClose={() => setShowEdit(false)}
            onSubmit={handleEditShift}
            fields={[
              { label: "Shift Name", key: "shiftName", type: "text" },
              { label: "Start Time", key: "startTime", type: "time" },
              { label: "End Time", key: "endTime", type: "time" },
            ]}
            initialData={{
              shiftName: selectedItem?.shift_name || "",
              startTime: selectedItem?.start_time || "",
              endTime: selectedItem?.end_time || "",
            }}
          />


          <DeleteModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            onConfirm={handleDeleteShift}
            title="Delete Shift"
            message="Are you sure you want to delete this shift?"
            itemName={selectedItem?.shift_name}
          />

          
          <TableComponent
            tableId="shift-table-details"
            columns={columns}
            data={shiftTimeData.map((d, i) => ({
              ...d,
              sno: (page - 1) * itemsPerPage + (i + 1),
              start_time: formatTimeForDisplay(d.start_time),
              end_time: formatTimeForDisplay(d.end_time),
              actions: renderActions(d),
            }))}
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
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

export default ShiftTime;
