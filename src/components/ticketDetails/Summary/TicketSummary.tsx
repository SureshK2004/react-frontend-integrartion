import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Filter } from "lucide-react";

interface TicketSummaryProps {
    onSelectTicket: (ticket: any) => void;
    selectedTicket: any;
}

const tabs = ["all", "pending", "solved", "closed"];

const sampleTickets = [
    { id: "TI_0697", subject: "Unable to log in", query: "xyz wvu tsr qpo nml kji hgf edc ba", user: "S.Gangatharan@jll.com", date: "Nov 3, 2025", status: "Pending" },
    { id: "TI_0696", subject: "No Subject", query: "abc def ghi jkl mno pqr stu vwx yz", user: "Kanha.2023", date: "Nov 2, 2025", status: "Solved" },
    { id: "TI_0691", subject: "Image not clear", query: "my faceviz is not working properly", user: "Chitragari Chaithanyavarma", date: "Oct 25, 2025", status: "Closed" },
    { id: "TI_0688", subject: "Payment failed", query: "Unable to log in or log out with an error ", user: "Priya.sharma", date: "Oct 20, 2025", status: "Solved" },
];

const TicketSummary: React.FC<TicketSummaryProps> = ({ onSelectTicket, selectedTicket }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;
    const filterRef = useRef<HTMLDivElement>(null);

    // Close filter panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setShowFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = sampleTickets.filter((t) =>
        filter === "all" ? true : t.status.toLowerCase() === filter
    );

    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="relative p-4 space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">🎫 Tickets</h2>
                <div className="relative" ref={filterRef}>
                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setShowFilters((prev) => !prev)}
                    >
                        <Filter className="w-4 h-4" />
                    </Button>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl p-3 z-50 animate-in fade-in-50">
                            <p className="text-sm font-medium mb-2">Filter by Status</p>
                            <div className="flex flex-col gap-2">
                                {tabs.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => {
                                            setFilter(f);
                                            setShowFilters(false);
                                        }}
                                        className={`capitalize px-4 py-2 rounded-lg font-medium transition-all duration-200  ${filter === f
                                            ? "bg-primary text-white"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
                <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
                <span>
                    Page {page} of {Math.ceil(filtered.length / itemsPerPage)}
                </span>
                <Button
                    variant="outline"
                    onClick={() =>
                        setPage((p) => (p * itemsPerPage < filtered.length ? p + 1 : p))
                    }
                    disabled={page * itemsPerPage >= filtered.length}
                >
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            {/* Ticket list */}
            <div className="space-y-2">
                {paginated.map((ticket) => (
                    <div
                        key={ticket.id}
                        onClick={() => onSelectTicket(ticket)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedTicket?.id === ticket.id
                            ? "bg-primary text-white border-primary"
                            : "hover:bg-muted border-gray-200 dark:border-gray-700"
                            }`}
                    >
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-xs opacity-80">User: {ticket.user}</div>
                        <div className="text-xs opacity-80">Date: {ticket.date}</div>
                        <div className="text-xs mt-1 font-medium">
                            Status: {ticket.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketSummary;
