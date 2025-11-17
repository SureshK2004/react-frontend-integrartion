// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TableComponent from "@/components/common/TableComponent";
// import {
//     ArrowBigDownDash,
//     ArrowLeft,
//     Edit,
//     Trash2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ThemeToggle } from "@/components/theme-toggle";
// import AddModal from "./AddModal";


// import {
//     getBranches,
//     createBranch,
//     updateBranch,
//     deleteBranch,
// } from "@/api/branchApi";

// const BranchList: React.FC = () => {
//     const navigate = useNavigate();

//     const [showModal, setShowModal] = useState(false);
//     const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
//     const [selectedItem, setSelectedItem] = useState<any>(null);

//     const [branchData, setBranchData] = useState<any[]>([]);

    
//     const [page, setPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCount, setTotalCount] = useState(0);

//     const org_id = 3;

   
//     const handleLimitChange = (val: number) => {
//         setItemsPerPage(val);
//         setPage(1);
//     };


//     const fetchBranches = async () => {
//         try {
//             const res = await getBranches(org_id, page, itemsPerPage);

//             const list = res?.data || [];

//             setBranchData(
//                 list.map((b: any) => ({
//                     id: b.branch_id,
//                     branch_name: b.branch_name,
//                 }))
//             );

//             const total = res?.total_count || 0;
//             setTotalCount(total);
//             setTotalPages(Math.ceil(total / itemsPerPage));

//         } catch (error) {
//             console.error("Error fetching branches:", error);
//         }
//     };

//     useEffect(() => {
//         fetchBranches();
//     }, [page, itemsPerPage]);


//     const handleSubmit = async (form: any) => {
//         try {
//             if (modalMode === "add") {
//                 await createBranch({
//                     branch_name: form.BranchName,
//                     org_id,
//                 });
//             }

//             if (modalMode === "edit") {
//                 await updateBranch({
//                     id: selectedItem?.id,
//                     branch_name: form.BranchName,
//                     org_id,
//                 });
//             }

//             if (modalMode === "delete") {
//                 await deleteBranch(selectedItem?.id, org_id);
//             }

//             setShowModal(false);
//             setSelectedItem(null);
//             fetchBranches();

//         } catch (error) {
//             console.error("Error submitting:", error);
//         }
//     };

    
//     const columns = [
//         { key: "sno", label: "S.No" },
//         { key: "branch_name", label: "Branch Name" },
//         { key: "actions", label: "Actions" },
//     ];


//     const renderActions = (row: any) => (
//         <div className="flex items-center gap-2">
//             <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-gray-200 dark:bg-gray-800 text-green-600 border-green-600"
//                 onClick={() => {
//                     setModalMode("edit");
//                     setSelectedItem(row);
//                     setShowModal(true);
//                 }}
//             >
//                 <Edit className="w-4 h-4" />
//             </Button>

//             <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-gray-200 dark:bg-gray-800 text-red-600 border-red-600"
//                 onClick={() => {
//                     setModalMode("delete");
//                     setSelectedItem(row);
//                     setShowModal(true);
//                 }}
//             >
//                 <Trash2 className="w-4 h-4" />
//             </Button>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-6">
//             <div className="max-w-7xl mx-auto">

            
//                 <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
//                     <div className="flex items-center justify-between">

//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                             Branch List
//                         </h2>

//                         <div className="flex items-center gap-3">
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 className="flex items-center gap-2 px-3 py-2 text-sm 
//                                            font-medium text-gray-700 dark:text-gray-300 
//                                            bg-gray-100 dark:bg-gray-700 rounded-lg"
//                             >
//                                 <ArrowLeft size={18} /> Back
//                             </button>
//                             <ThemeToggle />
//                         </div>
//                     </div>
//                 </div>

                
//                 <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">

                  
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
//                             Tables
//                         </h2>

//                         <button
//                             onClick={() => {
//                                 setModalMode("add");
//                                 setSelectedItem(null);
//                                 setShowModal(true);
//                             }}
//                             className="flex items-center gap-2 px-3 py-2 text-sm font-medium
//                                        bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
//                                        rounded-lg"
//                         >
//                             <ArrowBigDownDash size={18} /> Add Branch
//                         </button>
//                     </div>

//                     {/* Modal */}
//                     <AddModal
//                         title={
//                             modalMode === "add"
//                                 ? "Add Branch"
//                                 : modalMode === "edit"
//                                 ? "Edit Branch"
//                                 : "Delete Branch"
//                         }
//                         isOpen={showModal}
//                         onClose={() => setShowModal(false)}
//                         onSubmit={handleSubmit}
//                         fields={
//                             modalMode === "delete"
//                                 ? []
//                                 : [{ label: "Branch Name", key: "BranchName", value: selectedItem?.branch_name || "" }]
//                         }
//                         isDelete={modalMode === "delete"}
//                     />

//                     {/* Table */}
//                     <TableComponent
//                         tableId="branch-table-details"
//                         columns={columns}
//                         data={branchData.map((d, i) => ({
//                             ...d,
//                             sno: (page - 1) * itemsPerPage + (i + 1),
//                             actions: renderActions(d),
//                         }))}

//                         currentPage={page}
//                         totalPages={totalPages}
//                         itemsPerPage={itemsPerPage}
//                         totalCount={totalCount}

//                         onPageChange={setPage}
//                         onItemsPerPageChange={handleLimitChange}
//                     />

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BranchList;
