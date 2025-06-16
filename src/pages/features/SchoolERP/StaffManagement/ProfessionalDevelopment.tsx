import React from 'react';
import { BookOpen, Users, Award, Clock } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const ProfessionalDevelopment: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Professional Development</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Courses</h3>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">8</p>
            <p className="text-sm text-gray-500 mt-2">Training Programs</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Enrolled Staff</h3>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">32</p>
            <p className="text-sm text-gray-500 mt-2">Participants</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">45</p>
            <p className="text-sm text-gray-500 mt-2">Awarded</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hours Completed</h3>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">256</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Available Programs</h2>
            <div className="space-y-4">
              {[
                { name: 'Modern Teaching Methods', duration: '4 weeks', enrolled: 12, status: 'ongoing' },
                { name: 'Digital Classroom Skills', duration: '2 weeks', enrolled: 8, status: 'upcoming' },
                { name: 'Student Psychology', duration: '6 weeks', enrolled: 15, status: 'ongoing' },
              ].map((program, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{program.name}</h3>
                    <p className="text-sm text-gray-500">Duration: {program.duration}</p>
                    <p className="text-sm text-gray-600">{program.enrolled} Enrolled</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    program.status === 'ongoing'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {program.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Register for Training</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Program</option>
                  <option>Modern Teaching Methods</option>
                  <option>Digital Classroom Skills</option>
                  <option>Student Psychology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Staff Member</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Schedule</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Morning Session</option>
                  <option>Afternoon Session</option>
                  <option>Evening Session</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                <textarea className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter any specific requirements or notes"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDevelopment;