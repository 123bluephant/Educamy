import React, { useState } from 'react';
import { BookOpen, Users, Award, Clock, Calendar, Search, Eye, Edit, CheckCircle, Trash2, User } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

// Dummy data for programs and registrations
const initialPrograms = [
  { name: 'Modern Teaching Methods', duration: '4 weeks', enrolled: 12, status: 'ongoing', description: 'Learn modern teaching strategies and classroom management.' },
  { name: 'Digital Classroom Skills', duration: '2 weeks', enrolled: 8, status: 'upcoming', description: 'Master digital tools for effective online teaching.' },
  { name: 'Student Psychology', duration: '6 weeks', enrolled: 15, status: 'ongoing', description: 'Understand student psychology for better engagement.' },
  { name: 'Assessment Techniques', duration: '3 weeks', enrolled: 10, status: 'completed', description: 'Explore various assessment methods.' },
];
const initialRegistrations = [
  { program: 'Modern Teaching Methods', staff: 'John Doe', schedule: 'Morning Session', requirements: '', status: 'registered' },
  { program: 'Digital Classroom Skills', staff: 'Jane Smith', schedule: 'Afternoon Session', requirements: 'Needs laptop', status: 'registered' },
  { program: 'Student Psychology', staff: 'Mike Johnson', schedule: 'Evening Session', requirements: '', status: 'completed' },
];

const statusColors: Record<string, string> = {
  ongoing: 'bg-green-100 text-green-800',
  upcoming: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  registered: 'bg-purple-100 text-purple-800',
};

const ProfessionalDevelopment: React.FC = () => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [form, setForm] = useState({ program: '', staff: '', schedule: 'Morning Session', requirements: '', status: 'registered' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Dashboard stats
  const activeCourses = programs.filter(p => p.status === 'ongoing').length;
  const enrolledStaff = registrations.length;
  const certifications = 45; // Dummy
  const hoursCompleted = 256; // Dummy
  const upcomingPrograms = programs.filter(p => p.status === 'upcoming').length;
  const pendingCerts = 7; // Dummy

  // Filtered programs
  const filteredPrograms = programs.filter(p =>
    (filterStatus === 'all' || p.status === filterStatus) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Analytics: Enrollments by program
  const enrollmentsByProgram = programs.map(p => ({ name: p.name, enrolled: p.enrolled }));

  // Most active staff
  const staffCounts: Record<string, number> = {};
  registrations.forEach(r => { staffCounts[r.staff] = (staffCounts[r.staff] || 0) + 1; });
  const mostActiveStaff = Object.entries(staffCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

  // Handlers
  const handleOpenModal = (program: any) => { setSelectedProgram(program); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setSelectedProgram(null); };
  const handleStatusChange = (status: string) => setFilterStatus(status);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
    setFormSuccess('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.program || !form.staff || !form.schedule) {
      setFormError('All fields are required.');
      return;
    }
    if (editIndex !== null) {
      const updated = [...registrations];
      updated[editIndex] = { ...form };
      setRegistrations(updated);
      setEditIndex(null);
      setFormSuccess('Registration updated!');
    } else {
      setRegistrations([...registrations, { ...form }]);
      setFormSuccess('Registered successfully!');
    }
    setForm({ program: '', staff: '', schedule: 'Morning Session', requirements: '', status: 'registered' });
  };
  const handleEdit = (idx: number) => {
    setForm({ ...registrations[idx] });
    setEditIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleMarkCompleted = (idx: number) => {
    setRegistrations(registrations.map((r, i) => i === idx ? { ...r, status: 'completed' } : r));
  };
  const handleDelete = (idx: number) => {
    setRegistrations(registrations.filter((_, i) => i !== idx));
  };

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Professional Development</h1>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Courses</h3>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{activeCourses}</p>
            <p className="text-sm text-gray-500 mt-2">Training Programs</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Enrolled Staff</h3>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{enrolledStaff}</p>
            <p className="text-sm text-gray-500 mt-2">Participants</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Certifications</h3>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{certifications}</p>
            <p className="text-sm text-gray-500 mt-2">Awarded</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hours Completed</h3>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{hoursCompleted}</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Programs</h3>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{upcomingPrograms}</p>
            <p className="text-sm text-gray-500 mt-2">Scheduled</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Certifications</h3>
              <Award className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-3xl font-bold text-gray-400">{pendingCerts}</p>
            <p className="text-sm text-gray-500 mt-2">To Award</p>
          </div>
        </div>
        {/* Analytics Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Enrollments by Program</h2>
          <div className="flex gap-6">
            {enrollmentsByProgram.map((prog, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-semibold text-gray-700">{prog.name}</span>
                <div className="w-8 h-24 bg-blue-100 rounded-lg flex items-end justify-center mt-2">
                  <div style={{ height: `${Math.min(prog.enrolled * 4, 96)}px` }} className="w-8 bg-blue-500 rounded-t-lg"></div>
                </div>
                <span className="mt-2 text-blue-700 font-bold">{prog.enrolled}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => handleStatusChange('all')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>All</button>
            <button onClick={() => handleStatusChange('ongoing')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'ongoing' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Ongoing</button>
            <button onClick={() => handleStatusChange('upcoming')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Upcoming</button>
            <button onClick={() => handleStatusChange('completed')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Completed</button>
          </div>
          <div className="flex items-center border rounded-lg px-2 bg-white w-full md:w-64">
            <Search className="h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search by program name" value={searchTerm} onChange={handleSearch} className="w-full p-2 outline-none bg-transparent" />
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Programs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Available Programs</h2>
            <div className="space-y-4">
              {filteredPrograms.map((program, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{program.name}</h3>
                    <p className="text-sm text-gray-500">Duration: {program.duration}</p>
                    <p className="text-sm text-gray-600">{program.enrolled} Enrolled</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[program.status] || 'bg-gray-100 text-gray-800'}`}>{program.status}</span>
                    <button onClick={() => handleOpenModal(program)} className="ml-2 p-1 rounded hover:bg-blue-100"><Eye className="h-5 w-5 text-blue-600" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Register for Training */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">{editIndex !== null ? 'Edit Registration' : 'Register for Training'}</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                <select name="program" value={form.program} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option value="">Select Program</option>
                  {programs.map((p, idx) => <option key={idx}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
                <select name="staff" value={form.staff} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option value="">Select Staff Member</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Schedule</label>
                <select name="schedule" value={form.schedule} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option>Morning Session</option>
                  <option>Afternoon Session</option>
                  <option>Evening Session</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                <textarea name="requirements" value={form.requirements} onChange={handleFormChange} className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter any specific requirements or notes"></textarea>
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">{editIndex !== null ? 'Update Registration' : 'Register'}</button>
            </form>
          </div>
        </div>
        {/* All Registrations Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-6">All Registrations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left">Program</th>
                  <th className="p-2 text-left">Staff</th>
                  <th className="p-2 text-left">Schedule</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{reg.program}</td>
                    <td className="p-2">{reg.staff}</td>
                    <td className="p-2">{reg.schedule}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[reg.status] || 'bg-gray-100 text-gray-800'}`}>{reg.status}</span>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEdit(idx)} className="p-1 rounded hover:bg-yellow-100"><Edit className="h-4 w-4 text-yellow-600" /></button>
                      {reg.status !== 'completed' && (
                        <button onClick={() => handleMarkCompleted(idx)} className="p-1 rounded hover:bg-green-100"><CheckCircle className="h-4 w-4 text-green-600" /></button>
                      )}
                      <button onClick={() => handleDelete(idx)} className="p-1 rounded hover:bg-red-100"><Trash2 className="h-4 w-4 text-red-600" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Most Active Staff */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-4">Most Active Staff</h2>
          <ul className="space-y-2">
            {mostActiveStaff.map(([name, count], idx) => (
              <li key={idx} className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">{name}</span>
                <span className="ml-auto text-green-600 font-bold">{count} registrations</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Program Details Modal */}
        {showModal && selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              <h2 className="text-2xl font-bold mb-4">{selectedProgram.name}</h2>
              <div className="mb-2 text-gray-700"><b>Duration:</b> {selectedProgram.duration}</div>
              <div className="mb-2 text-gray-700"><b>Status:</b> {selectedProgram.status}</div>
              <div className="mb-2 text-gray-700"><b>Enrolled:</b> {selectedProgram.enrolled}</div>
              <div className="mb-4 text-gray-700"><b>Description:</b> {selectedProgram.description}</div>
              <div className="flex gap-2 mt-4">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                {selectedProgram.status !== 'completed' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Mark as Completed</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDevelopment;