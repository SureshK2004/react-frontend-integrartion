import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/common/TableComponent";
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import CommonFilters, { FilterConfig } from "@/components/filtersDetails/filters";
import DeleteModal from "@/components/configureDetails/cards/DeleteModal";
import EditOrganisationModal from "./EditModalOrganisation";

import {
  getOrganisationDetails,
  deleteOrganisation,
} from "@/orgainsation/service/orgDetails";

const OrgDetails: React.FC = () => {
  const navigate = useNavigate();

  const [organisationData, setOrganisationData] = useState<any[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); 

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const orgFilterConfig: FilterConfig = {
    showSearch: true,
    showFilterForm: false,
    onSearch: (query: string) => {
      setSearchTerm(query);
      setPage(1);
    },
    onFilterChange: () => { },
    labels: {
      searchPlaceholder: "Search organisations...",
    },
  };

  const fetchOrganisations = useCallback(async () => {
    try {
      const res = await getOrganisationDetails(page, itemsPerPage, searchTerm);

      const mapped = res.data.map((item: any) => ({
        org_id: item.organisation.org_id,
        user_id: item.admin_details?.user_id, 
        name: item.organisation.org_name,
        admin: item.admin_details?.full_name || "—", 
        org_base: item.organisation.org_base,
        access: [
          item.organisation.attendence && "Attendance",
          item.organisation.task && "Task",
          item.organisation.crm && "CRM",
          item.organisation.expenses && "Expenses",
          item.organisation.reports && "Reports",
          item.organisation.live_tracking && "Live Track",
          item.organisation.client_site && "Client Site",
        ].filter(Boolean),
      }));

      setOrganisationData(mapped);

      const total = res.pagination?.total || mapped.length;
      setTotalCount(total);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (error) {
      console.error("Fetch Organisation Error:", error);
      alert("Failed to load organisations");
    }
  }, [page, itemsPerPage, searchTerm]);

  useEffect(() => {
    fetchOrganisations();
  }, [page, itemsPerPage, refresh, fetchOrganisations]);

  const handleItemsPerPageChange = (n: number) => {
    setItemsPerPage(n);
    setPage(1);
  };


  const handleDeleteClick = (row: any) => {
    setSelectedOrg(row);
    setShowDeleteModal(true);
  };

  const handleEditClick = (row: any) => {
    setSelectedOrg(row);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setRefresh(prev => !prev); 
    setShowEditModal(false);
    setSelectedOrg(null);
  };

  const confirmDelete = async () => {
    if (!selectedOrg || !selectedOrg.user_id) {
      alert("Admin User ID not available. Cannot delete this organisation.");
      return;
    }

    try {
      const res = await deleteOrganisation(selectedOrg.org_id, selectedOrg.user_id);

      if (res?.success === false) {
        alert(res?.message || "Backend rejected the request.");
        return;
      }

      alert("Organisation deleted successfully!");
      setRefresh(prev => !prev);
      setShowDeleteModal(false);
      setSelectedOrg(null);

    } catch (err: any) {
      console.error("Delete Error:", err);

      if (err.response?.status === 500) {
        alert("Backend crashed while deleting this organisation.\nContact API team.");
      } else {
        alert("Failed to delete organisation");
      }
    }
  };

  const columns = [
    { key: "sno", label: "S.NO" },
    {
      key: "name",
      label: "Organisation",
      render: (row: any) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-xs text-gray-400">{row.org_base}</div>
        </div>
      ),
    },
    { key: "admin", label: "Admin" },
    {
      key: "access",
      label: "Access Details",
      render: (row: any) =>
        row.access.length > 0 ? (
          row.access.map((a: string, i: number) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 mx-1"
            >
              {a}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-xs">No Access</span>
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleEditClick(row)}
            className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            size="sm"
          >
            <Edit size={16} />
          </Button>
          <Button
            onClick={() => handleDeleteClick(row)}
            className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            size="sm"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 mb-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Organisation Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                List of organisations and access details
              </p>
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

        {/* SEARCH + CREATE */}
        <div className="mb-6 flex flex-col gap-4">
          <CommonFilters config={orgFilterConfig} showTopFilters={true} />
          <div className="flex justify-end">
            <Button
              onClick={() => navigate("/create-org")}
              className="bg-primary px-5 flex items-center gap-2"
            >
              <Plus size={18} /> Create Organisation
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <TableComponent
          tableId="org-details-table"
          columns={columns}
          data={organisationData.map((row, index) => ({
            ...row,
            sno: (page - 1) * itemsPerPage + index + 1,
          }))}
          currentPage={page}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalCount={totalCount}
        />
      </div>

  
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedOrg(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Organisation"
        message="Are you sure you want to delete this organisation? This action cannot be undone."
        itemName={selectedOrg?.name}
      />

      {/* EDIT MODAL */}
      <EditOrganisationModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedOrg(null);
        }}
        onSuccess={handleEditSuccess}
        organisationData={selectedOrg}
      />
    </div>
  );
};

export default OrgDetails;