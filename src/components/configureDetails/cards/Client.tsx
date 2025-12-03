// pages/ClientsManagement.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/common/TableComponent";
import EditModal from "@/components/configureDetails/cards/EditModal";
import DeleteModal from "@/components/configureDetails/cards/DeleteModal";
import CommonFilters, { FilterConfig } from "@/components/filtersDetails/filters";
import clientAPI from "@/service/client";
import { toast } from "sonner";

const ClientsManagement = () => {
  const navigate = useNavigate();

  // States
  const [clients, setClients] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<any>(null);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  // Filter config for CommonFilters
  const clientFilterConfig: FilterConfig = {
    showSearch: true,
    showFilterForm: false,
    onSearch: (query: string) => {
      setSearchTerm(query);
      setPage(1);
      if (query.trim()) {
        filterClients(query);
      } else {
        // If search is cleared, fetch fresh data
        fetchClients(1, itemsPerPage);
      }
    },
    onFilterChange: () => { },
    labels: {
      searchPlaceholder: "Search clients by name, contact, or address...",
    },
  };

  // Fetch clients from API
  const fetchClients = async (nextPage: number = page, limit: number = itemsPerPage) => {
    try {
      setIsLoading(true);
      const res = await clientAPI.getAll(nextPage, limit);

      const data = res.data.data || [];
      const pagination = res.data.pagination || {};

      if (nextPage === 1) {
        // First page or refresh
        setClients(data);
        setFilteredClients(searchTerm ? filterDataBySearch(data, searchTerm) : data);
      } else {
        // Append for infinite scroll or pagination
        setClients(prev => [...prev, ...data]);
        setFilteredClients(prev => [...prev, ...(searchTerm ? filterDataBySearch(data, searchTerm) : data)]);
      }

      // Update pagination info
      setTotalCount(pagination.count || data.length);
      setHasMore(pagination.has_more || data.length === limit);

    } catch (error) {
      toast.error("Failed to load clients");
      console.error("Error fetching clients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter function
  const filterDataBySearch = (data: any[], query: string) => {
    if (!query.trim()) return data;

    return data.filter(client =>
      client.client_name?.toLowerCase().includes(query.toLowerCase()) ||
      client.contact_name?.toLowerCase().includes(query.toLowerCase()) ||
      client.contact_number?.toLowerCase().includes(query.toLowerCase()) ||
      client.address?.toLowerCase().includes(query.toLowerCase()) ||
      client.city?.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Local filter for client-side search
  const filterClients = (query: string = searchTerm) => {
    const filtered = filterDataBySearch(clients, query);
    setFilteredClients(filtered);
    setTotalCount(filtered.length);
    setPage(1); // Reset to first page when filtering
  };

  useEffect(() => {
    if (!searchTerm) {
      fetchClients(page, itemsPerPage);
    }
  }, [page, itemsPerPage]);

  // Handle edit
  const handleEditClick = (client: any) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  // Handle delete
  const handleDeleteClick = (client: any) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await clientAPI.delete(selectedClient.id);
      toast.success("Client deleted successfully");

      // Refresh the list
      if (searchTerm) {
        // If searching, re-filter
        setClients(prev => prev.filter(client => client.id !== selectedClient.id));
        filterClients(searchTerm);
      } else {
        // If not searching, refetch from API
        fetchClients(1, itemsPerPage);
      }
    } catch (error) {
      toast.error("Failed to delete client");
      console.error("Delete error:", error);
    }

    setShowDeleteModal(false);
    setSelectedClient(null);
  };

  // Handle edit submit
  const handleEditSubmit = async (updatedData: any) => {
    try {
      const payload = {
        ...updatedData,
        org_id: 3,
        client_id: selectedClient.id,
        user_id: 114 // You might want to get this from auth context
      };

      await clientAPI.update(payload);
      toast.success("Client updated successfully");

      // Refresh the list
      fetchClients(page, itemsPerPage);

    } catch (error) {
      toast.error("Failed to update client");
      console.error("Update error:", error);
    }

    setShowEditModal(false);
    setSelectedClient(null);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset to first page
  };


  const getPaginatedData = () => {
    if (searchTerm) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredClients.slice(startIndex, endIndex);
    } else {

      return filteredClients;
    }
  };

  // Table columns
  const columns = [
    {
      key: "sno",
      label: "S.NO",
      render: (row: any, index: number) => (
        <span>{(page - 1) * itemsPerPage + index + 1}</span>
      )
    },
    {
      key: "client_name",
      label: "Client Name",
      render: (row: any) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.client_name}
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (row: any) => (
        <div>
          <div className="flex items-center gap-2 text-sm">
            <User size={12} className="text-gray-400" />
            <span>{row.contact_name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Phone size={12} className="text-gray-400" />
            <span>{row.contact_number}</span>
          </div>
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (row: any) => (
        <div className="max-w-[180px] truncate whitespace-normal break-words ">
          <div className="text-sm line-clamp-2">{row.address}</div>
          <div className="text-xs text-gray-500">
            {row.city}, {row.pincode}
          </div>
        </div>

      ),
    },
    {
      key: "location",
      label: "Location",
      render: (row: any) => (
        <div className="text-sm">
          <div>Lat: {row.latitude}</div>
          <div>Lng: {row.longitude}</div>
          <div className="text-gray-500">Radius: {row.radius}m</div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row: any) => (
        <span className="px-3 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
          {row.category}
        </span>
      ),
    },
    {
      key: "otp_verified",
      label: "OTP Verified",
      render: (row: any) => (
        <span className={`px-3 py-1 text-xs rounded-full ${row.otp_verified ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
          {row.otp_verified ? 'Verified' : 'Not Verified'}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any, index: number) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/clients/edit/${row.id}`)}
            variant="outline"
            size="sm"
            className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
          >
            <Edit size={14} />
          </Button>
          <Button
            onClick={() => handleDeleteClick(row)}
            variant="outline"
            size="sm"
            className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Actions */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <CommonFilters config={clientFilterConfig} showTopFilters={true} />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/clients/create")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                <Plus size={16} />
                Add Client
              </Button>
            </div>
          </div>
        </div>

        {/* Table Component */}
        <TableComponent
          tableId="clients-table"
          columns={columns}
          data={getPaginatedData()}
          currentPage={page}
          totalPages={Math.ceil(totalCount / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          totalCount={totalCount}
          onPageChange={setPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          isLoading={isLoading}
        />
      </div>

      {/* Edit Modal */}
      <EditModal
        title="Edit Client"
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedClient(null);
        }}
        onSubmit={handleEditSubmit}
        fields={[
          { key: "client_name", label: "Client Name", type: "text", placeholder: "Enter client name" },
          { key: "contact_name", label: "Contact Name", type: "text", placeholder: "Enter contact name" },
          { key: "contact_number", label: "Contact Number", type: "text", placeholder: "Enter contact number" },
          { key: "address", label: "Address", type: "textarea", placeholder: "Enter full address" },
          { key: "city", label: "City", type: "text", placeholder: "Enter city" },
          { key: "pincode", label: "Pincode", type: "text", placeholder: "Enter pincode" },
          { key: "category", label: "Category", type: "text", placeholder: "Enter category" },
        ]}
        initialData={selectedClient || {}}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedClient(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client? All associated data will be removed."
        itemName={selectedClient?.client_name}
      />
    </div>
  );
};

export default ClientsManagement;