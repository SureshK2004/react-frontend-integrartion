
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const usersData = [
  { empId: 'OM 001', name: 'User 01', department: 'UI UX', zone: 'Chennai', branch: 'Tambaram' },
  { empId: 'OM 002', name: 'User 02', department: 'Front-end', zone: 'Chennai', branch: 'T Nagar' },
  { empId: 'OM 003', name: 'User 03', department: 'Back-end', zone: 'Chennai', branch: 'Tambaram' },
  { empId: 'OM 004', name: 'User 04', department: 'Testing', zone: 'Chennai', branch: 'T Nagar' },
  { empId: 'OM 005', name: 'User 05', department: 'Full-stack', zone: 'Chennai', branch: 'Tambaram' },
];

export function UsersTable() {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            Not Punched In Users
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary dark:text-white font-semibold">Emp. ID</TableHead>
                <TableHead className="text-primary dark:text-white font-semibold">Name</TableHead>
                <TableHead className="text-primary dark:text-white font-semibold">Department</TableHead>
                <TableHead className="text-primary dark:text-white font-semibold">Zone</TableHead>
                <TableHead className="text-primary dark:text-white font-semibold">Branch</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.empId} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                  <TableCell className="font-medium">{user.empId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.zone}</TableCell>
                  <TableCell>{user.branch}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}