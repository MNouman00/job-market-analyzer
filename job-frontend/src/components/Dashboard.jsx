import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const categoryData = [
  { name: 'IT Jobs', count: 4200 },
  { name: 'Healthcare', count: 2100 },
  { name: 'Sales', count: 1800 },
  { name: 'Admin', count: 1100 },
  { name: 'Engineering', count: 900 },
]

const salaryData = [
  { name: 'PR/Marketing', salary: 85000 },
  { name: 'IT', salary: 82000 },
  { name: 'Engineering', salary: 78000 },
  { name: 'Healthcare', salary: 65000 },
  { name: 'Admin', salary: 45000 },
]

const trendData = [
  { month: 'Jan', jobs: 1200 },
  { month: 'Feb', jobs: 1900 },
  { month: 'Mar', jobs: 1500 },
  { month: 'Apr', jobs: 2100 },
  { month: 'May', jobs: 2400 },
  { month: 'Jun', jobs: 2200 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Chart 1 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Top Hiring Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Average Salary by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} formatter={(value) => `$${value}`} />
                <Bar dataKey="salary" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3 */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Job Posting Trends (2025)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }} />
              <Line type="monotone" dataKey="jobs" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}