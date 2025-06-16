import React from 'react';
import { Search, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const PaymentTracking: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Payment Tracking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Collections</h3>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">₹4.5L</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Payments</h3>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">₹1.2L</p>
            <p className="text-sm text-gray-500 mt-2">Outstanding</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Payment Records</h2>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <select className="p-2 border rounded-lg">
                <option>All Classes</option>
                <option>Class X</option>
                <option>Class IX</option>
                <option>Class VIII</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Student ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'STU001', name: 'John Doe', class: 'X-A', amount: 5000, status: 'paid' },
                  { id: 'STU002', name: 'Jane Smith', class: 'X-B', amount: 5000, status: 'pending' },
                  { id: 'STU003', name: 'Mike Johnson', class: 'X-A', amount: 5000, status: 'paid' },
                ].map((student, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{student.id}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.class}</td>
                    <td className="px-4 py-2 text-right">₹{student.amount}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex justify-center px-2 py-1 rounded-full text-xs ${
                        student.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button className="text-blue-600 hover:text-blue-800">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTracking;