import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaBackward, FaForward } from "react-icons/fa";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

interface PunchEvent extends Event {
    id: string;
    punchIn: string;
    punchOut: string;
    totalHours: string;
}

const mockEvents: PunchEvent[] = [
    {
        id: "1",
        title: "Punch In: 09:00 AM - Punch Out: 06:00 PM (9h)",
        start: new Date(2025, 9, 28, 9, 0),
        end: new Date(2025, 9, 28, 18, 0),
        punchIn: "09:00 AM",
        punchOut: "06:00 PM",
        totalHours: "9h",
    },
    {
        id: "2",
        title: "Punch In: 10:00 AM - Punch Out: 07:00 PM (9h)",
        start: new Date(2025, 9, 29, 10, 0),
        end: new Date(2025, 9, 29, 19, 0),
        punchIn: "10:00 AM",
        punchOut: "07:00 PM",
        totalHours: "9h",
    },
];

const CustomToolbar = ({ label, onNavigate, onView, view }: any) => (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
            <button
                onClick={() => onNavigate("TODAY")}
                className="px-4 py-2 rounded-lg font-medium text-sm bg-primary text-white shadow-md hover:opacity-90"
            >
                Today
            </button>
            <button
                onClick={() => onNavigate("PREV")}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            >
                <FaBackward />
            </button>
            <button
                onClick={() => onNavigate("NEXT")}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            >
                <FaForward />
            </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{label}</h2>

        <div className="flex items-center gap-2">
            {["month", "week", "day"].map((v) => (
                <button
                    key={v}
                    onClick={() => onView(v)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${view === v
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
            ))}
        </div>
    </div>
);

const BigCalendar: React.FC = () => {
    const [events] = useState<PunchEvent[]>(mockEvents);
    const [view, setView] = useState<View>("month");
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        setSelectedEvents((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    const selectAll = () => setSelectedEvents(events.map((e) => e.id));
    const deselectAll = () => setSelectedEvents([]);

    const handleApprove = () => {
        alert(`Approved: ${selectedEvents.join(", ")}`);
    };

    const handleReject = () => {
        alert(`Rejected: ${selectedEvents.join(", ")}`);
    };

    const CustomEvent = ({ event }: { event: PunchEvent }) => (
        <div className="flex items-start gap-2">
            <input
                type="checkbox"
                checked={selectedEvents.includes(event.id)}
                onChange={() => toggleSelection(event.id)}
                className="mt-0.5 accent-primary"
            />
            <span className="text-xs text-white">{event.title}</span>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                {/* Header Buttons */}
                <div className="flex flex-wrap items-center justify-between mb-3 gap-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Attendance Calendar
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                if (selectedEvents.length === events.length) {
                                    setSelectedEvents([]); // Deselect all
                                } else {
                                    setSelectedEvents(events.map((e) => e.id)); // Select all
                                }
                            }}
                            className={`bg-priamry px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedEvents.length === events.length
                                ? "bg-primary text-white shadow-md"
                                : "bg-primary text-white dark:bg-primary dark:text-white"
                                }`}
                        >
                            {selectedEvents.length === events.length ? "Deselect All" : "Select All"}
                        </button>

                        <button
                            onClick={handleApprove}
                            disabled={selectedEvents.length === 0}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedEvents.length > 0
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Approve
                        </button>

                        <button
                            onClick={handleReject}
                            disabled={selectedEvents.length === 0}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${selectedEvents.length > 0
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Reject
                        </button>
                    </div>
                </div>

                {/* Calendar */}
                <div className="h-[75vh]">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        views={["month", "week", "day"]}
                        view={view}
                        onView={(v) => setView(v)}
                        components={{
                            toolbar: (props) => <CustomToolbar {...props} view={view} />,
                            event: CustomEvent,
                        }}
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: "bg-primary dark:bg-gray-800",
                                color: "white",
                                borderRadius: "6px",
                                border: "none",
                                padding: "4px 6px",
                            },
                        })}
                        popup
                    />
                </div>
            </div>
        </div>
    );
};

export default BigCalendar;
