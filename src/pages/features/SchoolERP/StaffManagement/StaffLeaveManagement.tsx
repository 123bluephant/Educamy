import React from 'react';
import { Calendar, Clock, FileText, CheckCircle, Users } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const StaffLeaveManagement: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Staff Leave Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Leaves</h3>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">15</p>
            <p className="text-sm text-gray-500 mt-2">Requests</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Approved Leaves</h3>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">42</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Staff on Leave</h3>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">8</p>
            <p className="text-sm text-gray-500 mt-2">Currently</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Leave Balance</h3>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">24</p>
            <p className="text-sm text-gray-500 mt-2">Days Available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Leave Applications</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', department: 'Mathematics', days: 3, type: 'Sick Leave', status: 'pending' },
                { name: 'Jane Smith', department: 'Science', days: 5, type: 'Annual Leave', status: 'approved' },
                { name: 'Mike Johnson', department: 'English', days: 2, type: 'Personal Leave', status: 'pending' },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.department}</p>
                    <p className="text-sm text-gray-600">{application.days} days - {application.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Apply for Leave</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Leave Type</option>
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Study Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea 
                  className="w-full p-2 border rounded-lg" 
                  rows={4} 
                  placeholder="Please provide a reason for your leave request"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                <input 
                  type="file" 
                  className="w-full p-2 border rounded-lg"
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Submit Leave Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLeaveManagement;