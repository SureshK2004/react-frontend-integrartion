
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const chartData = [
  { name: 'Designing', value: 25, color: '#8b5cf6' },
  { name: 'Developer', value: 20, color: '#06b6d4' },
  { name: 'QA', value: 15, color: '#10b981' },
  { name: 'Marketing', value: 12, color: '#f59e0b' },
  { name: 'Implementation', value: 10, color: '#ef4444' },
  { name: 'Maintenance', value: 8, color: '#6366f1' },
  { name: 'HR', value: 5, color: '#ec4899' },
  { name: 'CRM', value: 3, color: '#84cc16' },
  { name: 'House Keeping', value: 2, color: '#f97316' },
];

const departmentBreakdown = [
  { department: 'Designing', total: '01', unPunched: '01' },
  { department: 'Developer', total: '16', unPunched: '16' },
  { department: 'QA', total: '03', unPunched: '03' },
  { department: 'Marketing', total: '12', unPunched: '12' },
  { department: 'Implementation', total: '00', unPunched: '00' },
  { department: 'Maintenance', total: '03', unPunched: '03' },
  { department: 'HR', total: '01', unPunched: '01' },
  { department: 'CRM', total: '04', unPunched: '04' },
  { department: 'House Keeping', total: '01', unPunched: '01' },
];

export function DepartmentChart() {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Department Wise Not Punched In Users
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Today (19-10-2024)</span>
            <Badge variant="secondary" className="bg-primary text-white hover:bg-primary/90">
              Export to
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-80 focus:outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs text-gray-600 dark:text-gray-300">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Department Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-primary dark:text-white font-semibold">Department</TableHead>
                  <TableHead className="text-primary dark:text-white font-semibold text-center">Total</TableHead>
                  <TableHead className="text-primary dark:text-white font-semibold text-center">Un-Punched</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentBreakdown.map((dept, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell className="text-center">{dept.total}</TableCell>
                    <TableCell className="text-center">
                      <span className={dept.unPunched !== '00' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                        {dept.unPunched}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}