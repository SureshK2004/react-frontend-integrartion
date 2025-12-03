import React, { useState } from "react";
import TicketSummary from "./TicketSummary";
import TicketDetail from "./TicketDetial";

const Summary: React.FC = () => {
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    return (
        <div className="bg-white dark:bg-gray-800 px-6 space-y-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 
        mb-6 flex h-[calc(100vh-100px)] overflow-hidden">

            {/* Left side - Ticket list (35%) */}
            <div className="w-[30%] border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
                <TicketSummary onSelectTicket={setSelectedTicket} selectedTicket={selectedTicket} />
            </div>

            {/* Right side - Ticket details (65%) */}
            <div className="w-[65%] overflow-y-auto">
                {selectedTicket ? (
                    <TicketDetail ticket={selectedTicket} />
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                        Select a ticket to view details
                    </div>
                )}
            </div>
        </div>
    );
};

export default Summary;
