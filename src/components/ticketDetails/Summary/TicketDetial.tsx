import React, { useState } from "react";
import QueryTab from "./tabs/QueryTab";
import ConversationTab from "./tabs/ConversationTab";
import AttachmentTab from "./tabs/AttachmentTab";
import SolveTab from "./tabs/SolveTab";

interface TicketDetailProps {
    ticket: any;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
    const [activeTab, setActiveTab] = useState("history");
    const tabs = ["history", "query", "attachment", "conversation", "solve"];

    return (
        <div className="px-6 space-y-4">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                <p className="text-sm text-muted-foreground">
                    {ticket.id} — {ticket.date}
                </p>
                <p className="text-sm text-muted-foreground">User: {ticket.user}</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`capitalize px-4 py-2 rounded-lg font-medium transition-all duration-200 border ${activeTab === tab
                                ? "bg-primary text-white border-primary"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="pt-4">
                {activeTab === "history" && (
                    <div className="bg-white dark:bg-gray-800 px-6 py-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        🕓 Ticket status timeline here
                    </div>
                )}

                {activeTab === "query" && (
                    <QueryTab
                        subject={ticket.subject}
                        query={ticket.query || "No query available"}
                    />
                )}

                {activeTab === "attachment" && <AttachmentTab />}

                {activeTab === "conversation" && <ConversationTab />}

                {activeTab === "solve" && (
                    <SolveTab
                        ticket={{
                            priority: "Medium",
                            date: "25/10/2025",
                            ticketId: "TI_0691",
                            ownerName: "Chitragari Chaithanyavarma",
                            ownerNumber: "7981072659",
                            ownerMail: "Unknown",
                            ownerOrg: "Heartfullness",
                            contactName: "Somasekar",
                            contactMail: "somasekar@datamoo.ai",
                            contactNumber: "N/A",
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default TicketDetail;
