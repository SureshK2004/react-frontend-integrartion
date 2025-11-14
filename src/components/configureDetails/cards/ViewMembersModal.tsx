import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TableComponent from "@/components/common/TableComponent";

interface Member {
    [key: string]: any;
}

interface Column {
    key: string;
    label: string;
}

interface ViewMembersModalProps {
    isOpen: boolean;
    onClose: () => void;
    members: Member[];
    columns: Column[];
    renderActions?: (row: any) => React.ReactNode; // 🧩 new prop
}

const ViewMembersModal: React.FC<ViewMembersModalProps> = ({
    isOpen,
    onClose,
    members = [],
    columns,
    renderActions,
}) => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(members.length / itemsPerPage);

    const paginatedData = members.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // If actions exist, attach the render logic from parent
    const hasActions = columns.some((col) => col.key === "actions");

    const tableData = hasActions
        ? paginatedData.map((m) => ({
            ...m,
            actions: renderActions ? renderActions(m) : null,
        }))
        : paginatedData;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        Team Members
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    <TableComponent
                        tableId="team-members-view-table"
                        columns={columns}
                        data={tableData}
                        currentPage={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setPage}
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewMembersModal;
