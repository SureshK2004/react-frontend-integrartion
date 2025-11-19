import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    itemName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    itemName,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        {message}
                    </p>
                    {itemName && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <strong>Designation:</strong> {itemName}
                        </p>
                    )}
                    <p className="mt-3 text-sm text-red-500 dark:text-red-400">
                        This action cannot be undone.
                    </p>
                </div>

                <DialogFooter className="flex justify-end gap-3 mt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
