import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { Toaster } from "@/components/ui/sonner";

// Attendance
import Attendance from "@/components/attendanceDetail/attendance";
import WeeklyPage from "@/components/attendanceDetail/weeklyPage";
import MapPage from "@/components/attendanceDetail/mapPage";
import UserLocationPage from "@/components/attendanceDetail/userLocationDetails/userLocationPage";

// Tickets
import TicketPage from "./components/ticketDetails/TicketPage";

// Location
import LocationPage from "./components/locationDetails/locationPage";
import { AssignLocation } from "./components/locationDetails/assignLocation";
import { LiveTracking } from "./components/locationDetails/liveTracking";
import { AssignDetails } from "./components/locationDetails/assignDetails";
import { TripTracking } from "./components/locationDetails/tripTracking";
import TripDetails from "./components/locationDetails/tripDetail";
import TripTrackingMap from "./components/locationDetails/TripTrackingMap";
import { AssignEditPage } from "./components/locationDetails/AssignEditPage";

// Manage
import ManagePage from "./components/manageDetails/managePage";
import ActiveInactivePage from "./components/manageDetails/activeInavtive";
import UserListPage from "./components/manageDetails/userListDetails/userListPage";
import OnboardingFormPage from "./components/manageDetails/onboardingUserList/onboardingFormPage";
import OnboardingFormStandalone from "./components/manageDetails/onboardingForm";
import ReAssignUserPage from "./components/manageDetails/reassignUserDetails/reassignUserPage";
import AllApprovalPage from "./components/manageDetails/allApprovalDetails/allApprovalPage";

// Timesheet / Tasks / Forms
import TimeSheetPage from "./components/timeSheetDetails/timeSheetPage";
import TaskDetailPage from "./components/taskDetails/taskDetailPage";
import FieldJobPage from "./components/formsDetails/fieldJobPage";
import NewFormPage from "./components/formsDetails/newFormPage";
import DynamicFormsPage from "./components/dynamicFormsDetails/dynamicFormsPage";

// Leave / Holidays / Calendar
import LeavePage from "./components/leaveDetails/leavePage";
import HolidayPage from "./components/leaveDetails/holiday";
import CalendarPage from "./components/leaveDetails/calendarLeave";
import HolidayCalendarPage from "./components/holidayCalendarDetails/holidayCalendarPage";
import ShiftRosterCalendar from "./components/calendar/shiftCalendar";

// CRM / Learn / Profile
import CrmSummaryPage from "./components/crmSummaryDetails/crmSummaryPage";
import LearnPage from "./components/learnDetails/learnPage";
import ProfilePage from "./components/profileDetails/profilePage";

// Expense
import ExpensePage from "./components/expenseDetails/expensePage";
import ExpenseSummary from "./components/expenseDetails/expenseSummary";
import ExpenseDashboard from "./components/expenseDetails/expenseSummary";

// Configure
import ConfigurePage from "./components/configureDetails/configurePage";

// Others
import Co2Emission from "./components/co2Emission/co2Emission";
import GeoFencing from "./components/geoFencing/geofencing";
import LoginScreen from "./components/loginPage/LoginScreen";
import Roles from "./components/configureDetails/cards/Roles";
import ViewForms from "./components/formsDetails/ViewForms";
import Department from "./components/configureDetails/cards/Department";
import Designation from "./components/configureDetails/cards/Designation";
import Entry from "./components/configureDetails/cards/Entry";
import HolidayCalendar from "./components/configureDetails/cards/HolidayCalendar";
import ShiftTime from "./components/configureDetails/cards/ShiftTime";
import Zone from "./components/configureDetails/cards/Zone";
import BranchList from "./components/configureDetails/cards/BranchList";
import ProjectList from "./components/configureDetails/cards/ProjectList";
import TimeSheetTask from "./components/configureDetails/cards/TImeSheetTask";
import LocationName from "./components/configureDetails/cards/LocationName";
import Relationship from "./components/configureDetails/cards/RelationShip";
import LeaveList from "./components/configureDetails/cards/LeaveList";
import PermissionList from "./components/configureDetails/cards/PermissionList";
import ExpenseList from "./components/configureDetails/cards/ExpenseList";
import MasterDropdownList from "./components/configureDetails/cards/MasterDropDown";
import SLAConfiguration from "./components/configureDetails/cards/SlaConfiguration";
import DeviceConfiguration from "./components/configureDetails/cards/DeviceConfig";
import ShiftRoaster from "./components/configureDetails/cards/ShiftRoaster";
import TeamDetails from "./components/configureDetails/cards/TeamsDetials";

// calendar
import "react-big-calendar/lib/css/react-big-calendar.css";

//Analyze Routes
import AnalyzeHome from "./components/analyze/AnalyzeHome";
import ReportsPage from "./components/analyze/pages/ReportPage";
import DailyReportPage from "./components/analyze/pages/DailyReportPage";
import AttendanceReportPage from "./components/analyze/pages/AttendentanceReportPage";
import RbaViolationPage from "./components/analyze/pages/RbaViolationPage";
import TrackingTimePage from "./components/analyze/pages/TrackingTimePage";
import OvertimeReportPage from "./components/analyze/pages/OverTimeReportPage";

import ActionLog from "./components/actionlog/ActionLog";
import TaskType from "./components/configureDetails/cards/TaskType";

// ✅ Final App Component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without Layout */}
        <Route path="/login" element={<LoginScreen />} />

        {/*  All other routes inside Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<DashboardContent />} />

                {/* Attendance */}
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/attendance/weekly" element={<Attendance />} />
                <Route path="/attendance/mapview" element={<Attendance />} />
                <Route path="/weekly" element={<WeeklyPage />} />
                <Route path="/attendance/map" element={<MapPage />} />
                <Route path="/user-location" element={<UserLocationPage />} />

                {/* Tickets */}
                <Route path="/tickets" element={<TicketPage />} />

                {/* Locations */}
                <Route path="/locations" element={<LocationPage />} />
                <Route path="/manage" element={<ManagePage />} />
                <Route path="/expense" element={<ExpensePage />} />
                <Route path="/timesheet" element={<TimeSheetPage />} />
                <Route path="/tasks" element={<TaskDetailPage />} />
                <Route path="/forms" element={<FieldJobPage />} />
                <Route path="/leave" element={<LeavePage />} />
                <Route path="/crm" element={<CrmSummaryPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/holiday" element={<HolidayPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/dashboard" element={<ExpenseDashboard />} />
                <Route path="/summary" element={<ExpenseSummary />} />
                {/* congif section */}
                <Route path="/configure" element={<ConfigurePage />} />
                <Route path="/config/roles" element={<Roles />} />
                <Route path="/config/departments" element={<Department />} />
                <Route path="/config/designation" element={<Designation />} />
                <Route path="/config/entry" element={<Entry />} />
                <Route path="/config/holidays" element={<HolidayCalendar />} />
                <Route path="/config/shifttime" element={<ShiftTime />} />
                <Route path="/config/zones" element={<Zone />} />
                <Route path="/config/branch-list" element={<BranchList />} />
                <Route path="/config/project-list" element={<ProjectList />} />
                <Route path="/config/task-detials" element={<TimeSheetTask />} />
                <Route path="/config/location-name" element={<LocationName />} />
                <Route path="/config/relationship" element={<Relationship />} />
                <Route path="/config/device_configuration" element={<DeviceConfiguration />} />
                <Route path="/config/leave_list" element={<LeaveList />} />
                <Route path="/config/permission_list" element={<PermissionList />} />
                <Route path="/config/expense_list" element={<ExpenseList />} />
                <Route path="/config/master_dropdown" element={<MasterDropdownList />} />
                <Route path="/config/add_teams" element={<TeamDetails />} />
                <Route path="/config/sla_configure" element={<SLAConfiguration />} />
                <Route path="/config/shift_roster" element={<ShiftRoaster />} />
                <Route path="/config/task_type" element={<TaskType />}/>


                <Route
                  path="/holiday-calendar"
                  element={<HolidayCalendarPage />}
                />
                <Route path="/dynamic-form" element={<DynamicFormsPage />} />
                <Route path="/assign-location" element={<AssignLocation />} />
                <Route path="/live-tracking" element={<LiveTracking />} />
                <Route path="/assign-details" element={<AssignDetails />} />
                <Route path="/trip-tracking" element={<TripTracking />} />
                <Route path="/manage/trip-details" element={<TripDetails />} />
                <Route
                  path="/manage/tripTranckingMapView"
                  element={<TripTrackingMap />}
                />
                <Route
                  path="/manage/assign-edit/:id"
                  element={<AssignEditPage />}
                />

                {/* Manage */}
                <Route path="/manage" element={<ManagePage />} />
                <Route path="/manage/user-list" element={<UserListPage />} />
                <Route
                  path="/onboarding-form"
                  element={<OnboardingFormPage />}
                />
                <Route
                  path="/onboarding-form-standalone"
                  element={<OnboardingFormStandalone />}
                />
                <Route
                  path="/manage/reassign-user"
                  element={<ReAssignUserPage />}
                />
                <Route
                  path="/manage/all-approval"
                  element={<AllApprovalPage />}
                />
                <Route
                  path="/manage/active-inactive"
                  element={<ActiveInactivePage />}
                />
                   
                                  {/* Anaylze Routes */}
                 <Route path="/analyze" element={<AnalyzeHome />} />
                   <Route path="/analyze/reports" element={<ReportsPage />} />
                     <Route path="/analyze/daily-report" element={<DailyReportPage />} />
                     <Route path="/analyze/attendance-report" element={<AttendanceReportPage />} />
                     <Route path="/analyze/rba-violation" element={<RbaViolationPage />} />
                     <Route path="/analyze/tracking-time" element={<TrackingTimePage />} />
                     <Route path="/analyze/overtime-report" element={<OvertimeReportPage />} />



                   {/* Action Log View Section */}
                  <Route path="/action-log" element={<ActionLog />} />



                {/* Timesheet / Tasks / Forms */}
                <Route path="/timesheet" element={<TimeSheetPage />} />
                <Route path="/tasks" element={<TaskDetailPage />} />
                <Route path="/forms" element={<FieldJobPage />} />
                <Route path="/forms/new" element={<NewFormPage />} />
                <Route path="/forms/view" element={<ViewForms />} />
                <Route path="/dynamic-form" element={<DynamicFormsPage />} />

                {/* Leave / Calendar / Holidays */}
                <Route path="/leave" element={<LeavePage />} />
                <Route path="/holiday" element={<HolidayPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route
                  path="/holiday-calendar"
                  element={<HolidayCalendarPage />}
                />
                <Route path="/shift-roster" element={<ShiftRosterCalendar />} />

                {/* CRM / Learn / Profile */}
                <Route path="/crm" element={<CrmSummaryPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Expense */}
                <Route path="/expense" element={<ExpensePage />} />
                <Route path="/summary" element={<ExpenseSummary />} />
                <Route path="/dashboard" element={<ExpenseDashboard />} />

                {/* Configure */}
                <Route path="/configure" element={<ConfigurePage />} />

                {/* Miscellaneous */}
                <Route path="/co2-emission" element={<Co2Emission />} />
                <Route path="/geo-fencing" element={<GeoFencing />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
