import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TicketHeader from "./TicketHeader";
import DatamooTicket from "./Datamooai/DatamooTicket";
import SelfTicket from "./self/SelfTicket";
import Summary from "./Summary/Summary";

const TicketPage: React.FC = () => {
    // Top section states
    const [activeTab, setActiveTab] = useState<"ticket" | "summary">("ticket");
    const [toggleType, setToggleType] = useState<"self" | "datamooai">("datamooai");

    return (
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* 🔹 Top Header (Ticket | Summary | Toggle buttons) */}
            <TicketHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                toggleType={toggleType}
                setToggleType={setToggleType}
            />

            {/* 🔹 Card Content */}
            <div className="p-6">
                <div className="">
                    {activeTab === "ticket" ? (
                        toggleType === "datamooai" ? <DatamooTicket /> : <SelfTicket />
                    ) : (
                        <Summary/>
                        // toggleType === "datamooai" ? <p>datamooticket summary comming soon</p> : <p>selfticket summary coming son</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketPage;
