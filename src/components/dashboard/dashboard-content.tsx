
import { StatusChart } from './status-chart';
import { SummaryCards } from './summary-cards';
import { UsersTable } from './users-table';
import { DepartmentChart } from './department-chart';

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusChart />
        <div className="space-y-6">
          {/* Additional status cards can go here if needed */}
        </div>
      </div>

      {/* Tables Row */}
      <div className="space-y-6">
        <UsersTable />
        <DepartmentChart />
      </div>
    </div>
  );
}