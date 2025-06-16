import React from 'react';
import { DollarSign, CreditCard, Calendar, FileText } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const PayrollSystem: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Payroll System</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Payroll</h3>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">$45,250</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Processed</h3>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">42</p>
            <p className="text-sm text-gray-500 mt-2">Payments</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Next Payroll</h3>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">5</p>
            <p className="text-sm text-gray-500 mt-2">Days Left</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Payslips</h3>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">45</p>
            <p className="text-sm text-gray-500 mt-2">Generated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', department: 'Mathematics', amount: 3500, status: 'processed' },
                { name: 'Jane Smith', department: 'Science', amount: 3200, status: 'pending' },
                { name: 'Mike Johnson', department: 'English', amount: 3400, status: 'processed' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{transaction.name}</h3>
                    <p className="text-sm text-gray-500">{transaction.department}</p>
                    <p className="text-sm text-gray-600">${transaction.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    transaction.status === 'processed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Process Payroll</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full p-2 border rounded-lg" />
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Departments</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Bank Transfer</option>
                  <option>Check</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter any additional notes"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Process Payroll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSystem;