import React, { useState } from 'react';
import { Calendar, Clock, UserCheck, UserX, Search } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

interface Student {
  id: number;
  name: string;
  rollNo: string;
  status: 'present' | 'absent' | 'none';
}

const DigitalAttendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', rollNo: '001', status: 'none' },
    { id: 2, name: 'Jane Smith', rollNo: '002', status: 'none' },
    { id: 3, name: 'Mike Johnson', rollNo: '003', status: 'none' },
    // Add more sample students as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleAttendance = (studentId: number, status: 'present' | 'absent') => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.includes(searchTerm)
  );

  return (
    <div className="relative min-h-screen p-8">
   <BackButton />
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Digital Attendance</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Present Today</h3>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">85%</p>
          <p className="text-sm text-gray-500 mt-2">432 Students</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Absent Today</h3>
            <UserX className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">15%</p>
          <p className="text-sm text-gray-500 mt-2">76 Students</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Classes Marked</h3>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">24/25</p>
          <p className="text-sm text-gray-500 mt-2">Classes Today</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Avg</h3>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">92%</p>
          <p className="text-sm text-gray-500 mt-2">This Month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Mark Attendance</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <select 
              className="flex-1 p-2 border rounded-lg"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="X-A">Class X-A</option>
              <option value="X-B">Class X-B</option>
              <option value="X-C">Class X-C</option>
            </select>
            <select 
              className="flex-1 p-2 border rounded-lg"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
            <input 
              type="date" 
              className="flex-1 p-2 border rounded-lg"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or roll number"
              className="w-full p-2 pl-10 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Roll No</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} className="border-t">
                    <td className="px-4 py-2">{student.rollNo}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleAttendance(student.id, 'present')}
                          className={`px-3 py-1 rounded ${student.status === 'present' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleAttendance(student.id, 'absent')}
                          className={`px-3 py-1 rounded ${student.status === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
</div>
  );
};

export default DigitalAttendance;