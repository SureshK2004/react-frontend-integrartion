// pages/SitesManagement.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  User,
  Edit,
  Trash2,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/common/TableComponent";
import EditModal from "@/components/configureDetails/cards/EditModal";
import DeleteModal from "@/components/configureDetails/cards/DeleteModal";
import CommonFilters, { FilterConfig } from "@/components/filtersDetails/filters";

// Mock data
const mockSites = [
  {
    id: 1,
    client: { id: 1, client_name: "ABC Corporation" },
    site_name: "Main Office",
    address: "123 Business St, Downtown",
    description: "Corporate headquarters",
    contact_person_name: "John Smith",
    contact_number: "+1 (555) 123-4567",
    latitude: "40.7128",
    longitude: "-74.0060",
    radius: "110",
    city: "New York",
    pincode: "10001",
    site_type: "Default",
    created_at: "2024-01-15"
  },
  {
    id: 2,
    client: { id: 2, client_name: "XYZ Industries" },
    site_name: "Warehouse A",
    address: "456 Industrial Ave, Zone 3",
    description: "Main distribution center",
    contact_person_name: "Sarah Johnson",
    contact_number: "+1 (555) 987-6543",
    latitude: "34.0522",
    longitude: "-118.2437",
    radius: "200",
    city: "Los Angeles",
    pincode: "90001",
    site_type: "Warehouse",
    created_at: "2024-01-20"
  },
  {
    id: 3,
    client: { id: 3, client_name: "Tech Solutions Ltd" },
    site_name: "Data Center",
    address: "789 Tech Park, Silicon Valley",
    description: "Primary data storage facility",
    contact_person_name: "Michael Chen",
    contact_number: "+1 (555) 456-7890",
    latitude: "37.7749",
    longitude: "-122.4194",
    radius: "150",
    city: "San Francisco",
    pincode: "94103",
    site_type: "Data Center",
    created_at: "2024-01-25"
  },
  {
    id: 4,
    client: { id: 4, client_name: "Global Enterprises" },
    site_name: "Branch Office",
    address: "321 Global Plaza",
    description: "Regional branch office",
    contact_person_name: "Robert Wilson",
    contact_number: "+1 (555) 111-2222",
    latitude: "51.5074",
    longitude: "-0.1278",
    radius: "80",
    city: "London",
    pincode: "EC1A",
    site_type: "Office",
    created_at: "2024-01-30"
  },
  {
    id: 5,
    client: { id: 5, client_name: "Innovate Inc" },
    site_name: "R&D Center",
    address: "555 Innovation Drive",
    description: "Research and development facility",
    contact_person_name: "Lisa Anderson",
    contact_number: "+1 (555) 333-4444",
    latitude: "48.8566",
    longitude: "2.3522",
    radius: "120",
    city: "Paris",
    pincode: "75001",
    site_type: "Research",
    created_at: "2024-02-01"
  },
];

const SitesManagement = () => {
  const navigate = useNavigate();

  // States
  const [sites, setSites] = useState(mockSites);
  const [filteredSites, setFilteredSites] = useState(mockSites);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSite, setSelectedSite] = useState<any>(null);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(mockSites.length);

  // Filter config for CommonFilters
  const siteFilterConfig: FilterConfig = {
    showSearch: true,
    showFilterForm: false,
    onSearch: (query: string) => {
      setSearchTerm(query);
      setPage(1);
      filterSites(query);
    },
    onFilterChange: () => { },
    labels: {
      searchPlaceholder: "Search sites by name, client, or address...",
    },
  };

  // Filter sites
  const filterSites = useCallback((query: string = searchTerm) => {
    if (!query.trim()) {
      setFilteredSites(sites);
      setTotalCount(sites.length);
      return;
    }

    const filtered = sites.filter(site =>
      site.site_name.toLowerCase().includes(query.toLowerCase()) ||
      site.client.client_name.toLowerCase().includes(query.toLowerCase()) ||
      site.address.toLowerCase().includes(query.toLowerCase()) ||
      site.contact_person_name.toLowerCase().includes(query.toLowerCase()) ||
      site.city.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSites(filtered);
    setTotalCount(filtered.length);
  }, [sites, searchTerm]);

  useEffect(() => {
    filterSites();
  }, [filterSites]);

  // Handle edit
  const handleEditClick = (site: any) => {
    setSelectedSite(site);
    setShowEditModal(true);
  };

  // Handle delete
  const handleDeleteClick = (site: any) => {
    setSelectedSite(site);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (selectedSite) {
      setSites(prev => prev.filter(s => s.id !== selectedSite.id));
      setShowDeleteModal(false);
      setSelectedSite(null);
    }
  };

  // Handle edit submit
  const handleEditSubmit = (updatedData: any) => {
    if (selectedSite) {
      setSites(prev => prev.map(site =>
        site.id === selectedSite.id
          ? { ...site, ...updatedData }
          : site
      ));
      setShowEditModal(false);
      setSelectedSite(null);
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
      key: "client",
      label: "Client",
      render: (row: any) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.client.client_name}
        </div>
      ),
    },
    {
      key: "site",
      label: "Site",
      render: (row: any) => (
        <div>
          <div className="font-medium">{row.site_name}</div>
          <div className="text-sm text-gray-500">{row.description}</div>
        </div>
      ),
    },
    {
      key: "address",
      label: "Address",
      render: (row: any) => (
        <div className="max-w-xs">
          <div className="text-sm">{row.address}</div>
          <div className="text-xs text-gray-500">
            {row.city}, {row.pincode}
          </div>
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
            <span>{row.contact_person_name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Phone size={12} className="text-gray-400" />
            <span>{row.contact_number}</span>
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
          {row.radius && (
            <div className="text-gray-500">Radius: {row.radius}m</div>
          )}
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (row: any) => (
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
          {row.site_type}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any, index: number) => (
        <div className="flex items-center gap-2">
          {/* <Button
            onClick={() => navigate(`/sites/view/${row.id}`)}
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 bg-gray-200 dark:bg-gray-800"
          >
            <MapPin size={14} />
          </Button> */}
          <Button
            onClick={() => handleEditClick(row)}
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
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Actions */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <CommonFilters config={siteFilterConfig} showTopFilters={true} />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/sites/create")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={16} />
                Add Site
              </Button>
            </div>
          </div>
        </div>

        {/* Table Component */}
        <TableComponent
          tableId="sites-table"
          columns={columns}
          data={filteredSites.slice((page - 1) * itemsPerPage, page * itemsPerPage)}
          currentPage={page}
          totalPages={Math.ceil(totalCount / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          totalCount={totalCount}
          onPageChange={setPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Edit Modal */}
      <EditModal
        title="Edit Site"
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedSite(null);
        }}
        onSubmit={handleEditSubmit}
        fields={[
          { key: "site_name", label: "Site Name", type: "text", placeholder: "Enter site name" },
          { key: "contact_person_name", label: "Contact Person", type: "text", placeholder: "Enter contact person" },
          { key: "contact_number", label: "Contact Number", type: "text", placeholder: "Enter contact number" },
          { key: "address", label: "Address", type: "textarea", placeholder: "Enter full address" },
          { key: "city", label: "City", type: "text", placeholder: "Enter city" },
          { key: "pincode", label: "Pincode", type: "text", placeholder: "Enter pincode" },
          { key: "description", label: "Description", type: "textarea", placeholder: "Enter description" },
        ]}
        initialData={selectedSite || {}}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSite(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Site"
        message="Are you sure you want to delete this site? All associated data will be removed."
        itemName={selectedSite?.site_name}
      />
    </div>
  );
};

export default SitesManagement;