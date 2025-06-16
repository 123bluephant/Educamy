import React from 'react';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const StaffRecruitment: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Staff Recruitment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Open Positions</h3>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500 mt-2">Active Vacancies</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Applications</h3>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">45</p>
            <p className="text-sm text-gray-500 mt-2">Received</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Shortlisted</h3>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">18</p>
            <p className="text-sm text-gray-500 mt-2">Candidates</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">In Process</h3>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">8</p>
            <p className="text-sm text-gray-500 mt-2">Interviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {[
                { name: 'John Smith', position: 'Mathematics Teacher', experience: '5 years', status: 'shortlisted' },
                { name: 'Sarah Wilson', position: 'Science Teacher', experience: '3 years', status: 'in-review' },
                { name: 'Michael Brown', position: 'Physical Education', experience: '4 years', status: 'shortlisted' },
              ].map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.position}</p>
                    <p className="text-sm text-gray-600">Experience: {application.experience}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === 'shortlisted' 
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
            <h2 className="text-xl font-semibold mb-6">Post New Position</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter position title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Department</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Languages</option>
                  <option>Physical Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Experience</label>
                <input type="number" className="w-full p-2 border rounded-lg" placeholder="Years of experience" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter job description"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Post Position
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffRecruitment;