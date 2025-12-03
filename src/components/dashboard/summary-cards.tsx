
import { Card, CardContent } from '@/components/ui/card';

const summaryData = [
  {
    title: 'Total Users',
    value: 45,
    className: 'bg-primary text-white',
  },
  {
    title: 'Active',
    value: '38/45',
    progress: 84,
    className: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    progressColor: 'bg-green-500',
  },
  {
    title: 'Inactive',
    value: '29/45',
    progress: 64,
    className: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    progressColor: 'bg-red-500',
  },
  {
    title: 'On Leave',
    value: '39/45',
    progress: 87,
    className: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    progressColor: 'bg-yellow-500',
  },
];

const statusData = [
  { title: 'Onboarded This Month', value: '39/45' },
  { title: 'Onboarded This Week', value: '39/45' },
  { title: 'Onboarded This Day', value: '39/45' },
];

export function SummaryCards() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index} className={`transition-all duration-200 hover:shadow-md ${item.className}`}>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className={`text-sm font-medium ${
                  index === 0 ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-2xl font-bold mt-2 ${
                  index === 0 ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {item.value}
                </p>
                {item.progress && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${item.progressColor}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statusData.map((item, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}