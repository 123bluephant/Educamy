import React from 'react';
import { Calendar, Clock, FileText, CheckCircle } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const LeaveManagement: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
   <BackButton />
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Leave Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">12</p>
          <p className="text-sm text-gray-500 mt-2">Need Review</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Approved Today</h3>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-sm text-gray-500 mt-2">Applications</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Applications</h3>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">45</p>
          <p className="text-sm text-gray-500 mt-2">This Month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Average Processing</h3>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">1.2</p>
          <p className="text-sm text-gray-500 mt-2">Days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Leave Requests</h2>
          <div className="space-y-4">
            {[
              { name: 'John Doe', class: 'X-A', days: 2, reason: 'Medical', status: 'pending' },
              { name: 'Jane Smith', class: 'IX-B', days: 1, reason: 'Family Event', status: 'approved' },
              { name: 'Mike Johnson', class: 'XI-C', days: 3, reason: 'Medical', status: 'pending' },
            ].map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{request.name}</h3>
                  <p className="text-sm text-gray-500">Class {request.class} • {request.days} days</p>
                  <p className="text-sm text-gray-600">{request.reason}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${request.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Submit Leave Application</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter student name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Select Class</option>
                <option>X-A</option>
                <option>X-B</option>
                <option>X-C</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input type="date" className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="Enter reason for leave"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LeaveManagement;