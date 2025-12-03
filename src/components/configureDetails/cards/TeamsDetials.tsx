// src/pages/TeamDetails.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableComponent from "@/components/common/TableComponent";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import ViewMembersModal from "./ViewMembersModal";
import UploadModal from "./UploadModal";

import {
  ArrowLeft,
  ArrowBigDownDash,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import {
  getTeams,
  getViewMembers,
  createTeamWithMembers,
  updateTeamWithMembers,
  addTeamMembers,
  removeTeamMembers,
  deleteTeamAndUnlinkMember,
  getuserlists,
} from "@/api/teamlistApi";

type Team = {
  id: number;
  teamName: string;
  members?: Array<{
    emp_id: string;
    name: string;
  }>;
};

const TeamDetails: React.FC = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ next: null, prev: null });


  const [teamData, setTeamData] = useState<Team[]>([]);
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showViewMembers, setShowViewMembers] = useState(false);

  const [selectedItem, setSelectedItem] = useState<Team | null>(null);
  const [viewMembers, setViewMembers] = useState<any[]>([]);
  const [userList, setUserList] = useState<Array<{ emp_id: string; full: string }>>([]);

  const org_id = 3;

  const columns = [
    { key: "sno", label: "S.No" },
    { key: "teamName", label: "Team" },
    { key: "addMembers", label: "Add Members" },
    { key: "viewMembers", label: "View / Remove Members" },
    { key: "actions", label: "Actions" },
  ];


  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await getTeams(org_id, page, itemsPerPage);
      console.log("Teams API Response:", res);

      const results = res?.results || [];
      const pagination = res?.pagination || {};

      const mapped = results.map((t: any) => ({
        id: t.team_id,
        teamName: t.team_name,
        members: (t.users || []).map((u: any) => ({
          emp_id: u.emp_Id,
          name: u.name,
        })),
      }));

      setTeamData(mapped);
      setTotalCount(pagination.count || 0);

    } catch (err) {
      console.error("fetchTeams error:", err);
      alert("Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [page, itemsPerPage]);

  const openViewMembers = async (team: Team) => {
    setSelectedItem(team);
    setShowViewMembers(true);

    try {
      const res = await getViewMembers(org_id, team.id, itemsPerPage, 1);

      setViewMembers(res.data || []);
      setTotalCount(res.pagination?.count || 0);

      setPagination({
        next: res.pagination?.next || null,
        prev: res.pagination?.previous || null,
      });

    } catch (err) {
      console.error("getViewMembers error:", err);
      setViewMembers(team.members || []);
    }
  };

  const handleViewMembersPagination = async (newPage: number, newLimit: number) => {
    try {
      const res = await getViewMembers(
        org_id,
        selectedItem?.id!,
        newLimit,
        newPage // send next token
      );

      setViewMembers(res.data || []);
      setTotalCount(res.pagination?.count || 0);

      setPagination({
        next: res.pagination?.next || null,
        prev: res.pagination?.previous || null,
      });

    } catch (err) {
      console.error("Pagination error:", err);
    }
  };



  const handleAdd = async (formData: any) => {
    try {
      const team_name = formData.teamName?.trim();
      if (!team_name) return alert("Team name is required");

      await createTeamWithMembers(org_id, team_name);
      setShowAdd(false);
      await fetchTeams();
      alert("Team created successfully!");
    } catch (err) {
      console.error("createTeam error:", err);
      alert("Failed to create team");
    }
  };


  const handleEdit = async (formData: any) => {
    if (!selectedItem) return;

    try {
      const newName = formData.teamName?.trim();
      if (!newName) return alert("Team name is required");

      await updateTeamWithMembers(org_id, selectedItem.id, newName);
      setShowEdit(false);
      setSelectedItem(null);
      await fetchTeams();
      alert("Team updated successfully!");
    } catch (err) {
      console.error("updateTeam error:", err);
      alert("Failed to update team");
    }
  };


  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteTeamAndUnlinkMember(org_id, selectedItem.id);
      setShowDelete(false);
      setSelectedItem(null);
      await fetchTeams();
      alert("Team deleted successfully!");
    } catch (err) {
      console.error("deleteTeam error:", err);
      alert("Failed to delete team");
    }
  };


  const fetchUserList = async () => {
    try {
      const res = await getuserlists(org_id);
      const mappedUsers = res
        .filter((u: any) => u.emp_Id)
        .map((u: any) => ({
          emp_id: u.emp_Id,
          full: `${u.full_name} - ${u.emp_Id}`,
        }));
      setUserList(mappedUsers);
    } catch (err) {
      console.error("getuserlist error:", err);
      setUserList([]);
    }
  };


  const handleAddMembers = async (formData: any) => {
    if (!selectedItem) return;

    try {
      let selected = formData.add_emp;
      if (!Array.isArray(selected)) {
        selected = selected ? [selected] : [];
      }

      const empIds = selected.map((full: string) => {
        const parts = full.split(" - ");
        return parts[parts.length - 1].trim();
      });

      if (empIds.length === 0) {
        alert("Select at least one employee");
        return;
      }

      await addTeamMembers(org_id, selectedItem.id, empIds);


      const updated = await getViewMembers(org_id, selectedItem.id, 100, 1);
      setViewMembers(updated?.data || []);

      await fetchTeams();

      alert("Members added successfully!");
      setShowAdd(false);
    } catch (err) {
      console.error("addTeamMembers error:", err);
      alert("Failed to add members");
    }
  };

  const handleRemoveMembers = async (empId: string) => {
    if (!selectedItem) return;

    try {
      await removeTeamMembers(org_id, selectedItem.id, [empId]);

      const updated = await getViewMembers(org_id, selectedItem.id, 100, 1);
      setViewMembers(updated?.data || []);

      await fetchTeams();

    } catch (error) {
      console.error("Error removing member:", error);
      alert("Failed to remove member");
    }
  };

  const renderAddMembers = (row: Team) => (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        setSelectedItem(row);
        await fetchUserList();
        setShowAdd(true);
      }}
      className="text-green-600 border-green-600"
    >
      <Plus className="w-4 h-4 mr-1" /> Add
    </Button>
  );

  const renderViewMembers = (row: Team) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => openViewMembers(row)}
      className="text-blue-600 border-blue-600"
    >
      <Eye className="w-4 h-4 mr-1" /> View / Remove
    </Button>
  );

  const renderActions = (row: Team) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSelectedItem(row);
          setShowEdit(true);
        }}
        className="text-green-600 border-green-600"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSelectedItem(row);
          setShowDelete(true);
        }}
        className="text-red-600 border-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  const tableRows = teamData.map((d, i) => ({
    ...d,
    sno: (page - 1) * itemsPerPage + (i + 1),
    addMembers: renderAddMembers(d),
    viewMembers: renderViewMembers(d),
    actions: renderActions(d),
  }));

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const memberColumns = [
    { key: "sno", label: "S.No" },
    { key: "emp_id", label: "Employee ID" },
    { key: "name", label: "Full Name" },
    { key: "actions", label: "Action" },
  ];

  const renderMemberActions = (row: any) => (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="text-red-600 border-red-600"
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveMembers(row.emp_id);
      }}
    >
      <Trash2 className="w-4 h-4 mr-1" /> Remove
    </Button>
  );


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Team Details
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

        {/* Main card */}
        <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border">

          {/* Top Controls */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Teams</h2>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Download size={18} /> Download Template
              </button>

              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <Upload size={18} /> Upload Excel
              </button>

              <UploadModal
                title="Upload Team Excel"
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                onSubmit={() => { }}
              />

              <button
                onClick={() => {
                  setSelectedItem(null);
                  setShowAdd(true);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <ArrowBigDownDash size={18} /> Add Team
              </button>
            </div>
          </div>

          {/* Table with Pagination */}
          <TableComponent
            tableId="team-details-table"
            columns={columns}
            data={tableRows}
            currentPage={page}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
            onItemsPerPageChange={(limit) => {
              setItemsPerPage(limit);
              setPage(1); // Reset to first page when items per page changes
            }}
            loading={loading}
          />
        </div>

        {/* Add Modal */}
        <AddModal
          title={selectedItem ? `Add Members to ${selectedItem.teamName}` : "Add Team"}
          isOpen={showAdd}
          onClose={() => {
            setShowAdd(false);
            setSelectedItem(null);
          }}
          onSubmit={(data) => {
            if (selectedItem) handleAddMembers(data);
            else handleAdd(data);
          }}
          fields={
            selectedItem
              ? [
                {
                  label: "Select Employees",
                  key: "add_emp",
                  type: "select",
                  multiple: true,
                  options: userList.map((u) => u.full),
                },
              ]
              : [{ label: "Team Name", key: "teamName" }]
          }
        />

        {/* Edit Modal */}
        <EditModal
          title="Edit Team"
          isOpen={showEdit}
          onClose={() => {
            setShowEdit(false);
            setSelectedItem(null);
          }}
          onSubmit={handleEdit}
          fields={[{ label: "Team Name", key: "teamName" }]}
          initialData={selectedItem ? { teamName: selectedItem.teamName } : {}}
        />

        {/* Delete Modal */}
        <DeleteModal
          isOpen={showDelete}
          onClose={() => {
            setShowDelete(false);
            setSelectedItem(null);
          }}
          onConfirm={handleDelete}
          title="Delete Team"
          message={`Are you sure you want to delete "${selectedItem?.teamName}"?`}
        />

        {/* View Members Modal - No Pagination */}
        <ViewMembersModal
          isOpen={showViewMembers}
          onClose={() => {
            setShowViewMembers(false);
            setSelectedItem(null);
            setViewMembers([]);
          }}
          members={viewMembers.map((m, i) => ({
            sno: i + 1,
            emp_id: m.emp_Id ?? m.emp_id ?? m.users_id,
            name: m.full_name ?? m.name ?? "",
          }))}
          columns={memberColumns}
          renderActions={renderMemberActions}
          teamId={selectedItem?.id}
          orgId={org_id}
          totalCount={totalCount}
          currentPage={pagination.next ?? 1}
          itemsPerPage={itemsPerPage}
          onPageChange={handleViewMembersPagination}
        />


      </div>
    </div>
  );
};

export default TeamDetails;



