// components/tabs/SolveTab.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SolveTabProps {
  ticket: {
    priority: string;
    date: string;
    ticketId: string;
    ownerName: string;
    ownerNumber: string;
    ownerMail: string;
    ownerOrg: string;
    contactName: string;
    contactMail: string;
    contactNumber: string;
  };
}

const SolveTab: React.FC<SolveTabProps> = ({ ticket }) => {
  const handleSolve = () => {
    alert(`Ticket ${ticket.ticketId} marked as solved ✅`);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🧾 Ticket Information
          </h2>
          <div className="h-[1px] bg-gray-200 dark:bg-gray-700 mt-2" />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Priority:
            </span>{" "}
            {ticket.priority}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Date:
            </span>{" "}
            {ticket.date}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Ticket ID:
            </span>{" "}
            {ticket.ticketId}
          </p>
        </div>

        {/* Owner Section */}
        <div>
          <h3 className="font-semibold text-base mb-2 flex items-center gap-1">
            👤 Owner Details
          </h3>
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-sm">
              <span className="font-medium">Name:</span> {ticket.ownerName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Number:</span> {ticket.ownerNumber}
            </p>
            <p className="text-sm">
              <span className="font-medium">Mail:</span> {ticket.ownerMail}
            </p>
            <p className="text-sm">
              <span className="font-medium">Organization:</span> {ticket.ownerOrg}
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-base mb-2 flex items-center gap-1">
            📞 Contact Details
          </h3>
          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-sm">
              <span className="font-medium">Name:</span> {ticket.contactName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Mail:</span> {ticket.contactMail}
            </p>
            <p className="text-sm">
              <span className="font-medium">Number:</span> {ticket.contactNumber}
            </p>
          </div>
        </div>

        {/* Solve Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSolve}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6"
          >
            ✅ Solve Ticket
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolveTab;
