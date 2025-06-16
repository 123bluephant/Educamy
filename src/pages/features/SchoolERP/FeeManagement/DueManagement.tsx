import React from 'react';
import { AlertCircle, Bell, Calendar, Send } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const DueManagement: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Due Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Due</h3>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">₹2.5L</p>
            <p className="text-sm text-gray-500 mt-2">Outstanding</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Reminders Sent</h3>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-500 mt-2">This Week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Due Payments</h2>
            <div className="space-y-4">
              {[
                { student: 'John Doe', class: 'X-A', amount: 5000, dueDate: '2024-02-15' },
                { student: 'Jane Smith', class: 'X-B', amount: 3500, dueDate: '2024-02-20' },
                { student: 'Mike Johnson', class: 'X-A', amount: 7500, dueDate: '2024-02-28' },
              ].map((due, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{due.student}</h3>
                    <p className="text-sm text-gray-500">Class {due.class}</p>
                    <p className="text-sm text-gray-600">Due: {due.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">₹{due.amount}</p>
                    <button className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">
                      Send Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Send Reminder</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>All Classes</option>
                  <option>Class X-A</option>
                  <option>Class X-B</option>
                  <option>Class X-C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full p-2 border rounded-lg" />
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>SMS</option>
                  <option>Email</option>
                  <option>Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message Template</label>
                <textarea 
                  className="w-full p-2 border rounded-lg" 
                  rows={4}
                  placeholder="Enter reminder message"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Send Reminders
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueManagement;