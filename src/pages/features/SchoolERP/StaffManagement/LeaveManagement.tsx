import React, { useState } from 'react';
import { Calendar, Clock, FileText, CheckCircle, Users } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const StaffLeaveManagement: React.FC = () => {
  // State for leave applications and form
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', department: 'Mathematics', days: 3, type: 'Sick Leave', status: 'pending' },
    { id: 2, name: 'Jane Smith', department: 'Science', days: 5, type: 'Annual Leave', status: 'approved' },
    { id: 3, name: 'Mike Johnson', department: 'English', days: 2, type: 'Personal Leave', status: 'pending' },
  ]);
  
  // Update the type definition to include File
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    document: null as File | null
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        document: e.target.files[0]
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form validation here
    
    // Process the leave application
    console.log('Leave application submitted:', formData);
    
    // Reset form after submission
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      document: null
    });
    
    // You would typically send this data to your backend here
  };

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
              {applications.map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.department}</p>
                    <p className="text-sm text-gray-600">{application.days} days - {application.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${application.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Apply for Leave</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Study Leave">Study Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-lg"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-lg"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea 
                  className="w-full p-2 border rounded-lg" 
                  rows={4} 
                  placeholder="Please provide a reason for your leave request"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                <input 
                  type="file" 
                  className="w-full p-2 border rounded-lg"
                  accept=".pdf,.doc,.docx"
                  name="document"
                  onChange={handleFileChange}
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