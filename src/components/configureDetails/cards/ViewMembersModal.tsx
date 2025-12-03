import React, { useState, useEffect } from "react";
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
    renderActions?: (row: any) => React.ReactNode;

    /** pagination props coming from TeamDetails */
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number, limit: number) => void;
}

const ViewMembersModal: React.FC<ViewMembersModalProps> = ({
    isOpen,
    onClose,
    members = [],
    columns,
    renderActions,

    /** Pagination from parent */
    totalCount,
    currentPage,
    itemsPerPage,
    onPageChange,
}) => {

    const [page, setPage] = useState(currentPage);
    const [limit, setLimit] = useState(itemsPerPage);

    
    useEffect(() => {
        if (isOpen) {
            setPage(1);
            setLimit(itemsPerPage);
        }
    }, [isOpen, itemsPerPage]);

    const totalPages = Math.max(1, Math.ceil(totalCount / limit));

   
    const handlePageChange = (p: number) => {
        setPage(p);
        onPageChange(p, limit);
    };

    const handleLimitChange = (l: number) => {
        setLimit(l);
        setPage(1);
        onPageChange(1, l);
    };

  
    const hasActions = columns.some((c) => c.key === "actions");

    const tableData = hasActions
        ? members.map((m) => ({
            ...m,
            actions: renderActions ? renderActions(m) : null,
        }))
        : members;

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
                        itemsPerPage={limit}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleLimitChange}
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
