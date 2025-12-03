import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QueryModalProps {
    isOpen: boolean;
    onClose: () => void;
    queryData?: {
        subject: string;
        query: string;
    };
}

const QueryModal: React.FC<QueryModalProps> = ({ isOpen, onClose, queryData }) => {
    if (!queryData) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                        Query Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Subject :
                        </p>
                        <p className="text-base text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mt-1">
                            {queryData.subject || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Query :
                        </p>
                        <p className="text-base text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mt-1 whitespace-pre-wrap leading-relaxed">
                            {queryData.query || "-"}
                        </p>
                    </div>
                </div>

                <DialogFooter className="mt-6 flex justify-end">
                    <Button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default QueryModal;
