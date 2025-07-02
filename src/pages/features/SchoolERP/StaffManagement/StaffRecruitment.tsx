import React, { useState } from 'react';
import { Users, FileText, CheckCircle, Clock, UserCheck, XCircle, TrendingUp, Search, ChevronDown, Edit, Trash2, Eye } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

// Dummy data for applications and positions
const initialApplications = [
  { name: 'John Smith', position: 'Mathematics Teacher', experience: 5, status: 'shortlisted', applied: '2025-06-20', email: 'john.smith@email.com', phone: '1234567890', notes: 'Strong subject knowledge.' },
  { name: 'Sarah Wilson', position: 'Science Teacher', experience: 3, status: 'in-review', applied: '2025-06-22', email: 'sarah.wilson@email.com', phone: '2345678901', notes: 'Good communication skills.' },
  { name: 'Michael Brown', position: 'Physical Education', experience: 4, status: 'shortlisted', applied: '2025-06-23', email: 'michael.brown@email.com', phone: '3456789012', notes: 'Energetic and experienced.' },
  { name: 'Priya Sharma', position: 'Mathematics Teacher', experience: 2, status: 'rejected', applied: '2025-06-21', email: 'priya.sharma@email.com', phone: '4567890123', notes: 'Needs more experience.' },
  { name: 'Amit Patel', position: 'Science Teacher', experience: 6, status: 'hired', applied: '2025-06-19', email: 'amit.patel@email.com', phone: '5678901234', notes: 'Excellent track record.' },
];
const initialPositions = [
  { title: 'Mathematics Teacher', department: 'Mathematics', experience: 2, description: 'Teach mathematics to high school students.', status: 'open' },
  { title: 'Science Teacher', department: 'Science', experience: 3, description: 'Teach science to middle school students.', status: 'open' },
];

const statusColors: Record<string, string> = {
  shortlisted: 'bg-green-100 text-green-800',
  'in-review': 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-blue-100 text-blue-800',
};

const StaffRecruitment: React.FC = () => {
  // State for applications, positions, filters, modals, and form
  const [applications, setApplications] = useState(initialApplications);
  const [positions, setPositions] = useState(initialPositions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [form, setForm] = useState({ title: '', department: '', experience: '', description: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Dashboard stats
  const hiredThisMonth = applications.filter(a => a.status === 'hired').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;
  const avgTimeToHire = 7; // Dummy value, could be calculated

  // Filtered applications for recent and table
  const filteredApps = applications.filter(app =>
    (filterStatus === 'all' || app.status === filterStatus) &&
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handlers
  const handleOpenModal = (app: any) => { setSelectedApp(app); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setSelectedApp(null); };
  const handleStatusChange = (status: string) => setFilterStatus(status);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
    setFormSuccess('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.department || !form.experience || !form.description) {
      setFormError('All fields are required.');
      return;
    }
    setPositions([
      ...positions,
      { ...form, experience: Number(form.experience), status: 'open' }
    ]);
    setForm({ title: '', department: '', experience: '', description: '' });
    setFormSuccess('Position posted successfully!');
  };
  const handleClosePosition = (idx: number) => {
    setPositions(positions.map((pos, i) => i === idx ? { ...pos, status: 'closed' } : pos));
  };
  // Modal actions
  const handleAppAction = (action: string) => {
    if (!selectedApp) return;
    setApplications(applications.map(app =>
      app === selectedApp ? { ...app, status: action } : app
    ));
    setShowModal(false);
  };

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Staff Recruitment</h1>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Open Positions</h3>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{positions.filter(p => p.status === 'open').length}</p>
            <p className="text-sm text-gray-500 mt-2">Active Vacancies</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Applications</h3>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{applications.length}</p>
            <p className="text-sm text-gray-500 mt-2">Received</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Shortlisted</h3>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{applications.filter(a => a.status === 'shortlisted').length}</p>
            <p className="text-sm text-gray-500 mt-2">Candidates</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">In Process</h3>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{applications.filter(a => a.status === 'in-review').length}</p>
            <p className="text-sm text-gray-500 mt-2">Interviews</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hired This Month</h3>
              <UserCheck className="h-8 w-8 text-blue-700" />
            </div>
            <p className="text-3xl font-bold text-blue-700">{hiredThisMonth}</p>
            <p className="text-sm text-gray-500 mt-2">New Hires</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Rejected</h3>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
            <p className="text-sm text-gray-500 mt-2">Applications</p>
          </div>
        </div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => handleStatusChange('all')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>All</button>
            <button onClick={() => handleStatusChange('shortlisted')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'shortlisted' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Shortlisted</button>
            <button onClick={() => handleStatusChange('in-review')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'in-review' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>In Review</button>
            <button onClick={() => handleStatusChange('hired')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'hired' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Hired</button>
            <button onClick={() => handleStatusChange('rejected')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'rejected' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Rejected</button>
          </div>
          <div className="flex items-center border rounded-lg px-2 bg-white w-full md:w-64">
            <Search className="h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search by name or position" value={searchTerm} onChange={handleSearch} className="w-full p-2 outline-none bg-transparent" />
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {filteredApps.slice(0, 3).map((application, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-gray-500">{application.position}</p>
                    <p className="text-sm text-gray-600">Experience: {application.experience} years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[application.status] || 'bg-gray-100 text-gray-800'}`}>{application.status}</span>
                    <button onClick={() => handleOpenModal(application)} className="ml-2 p-1 rounded hover:bg-blue-100"><Eye className="h-5 w-5 text-blue-600" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Post New Position */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Post New Position</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
                <input type="text" name="title" value={form.title} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="Enter position title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select name="department" value={form.department} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option value="">Select Department</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Languages</option>
                  <option>Physical Education</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Experience</label>
                <input type="number" name="experience" value={form.experience} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="Years of experience" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter job description"></textarea>
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Post Position</button>
            </form>
            {/* Open Positions Table */}
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Open Positions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Title</th>
                      <th className="p-2 text-left">Department</th>
                      <th className="p-2 text-left">Experience</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2">{pos.title}</td>
                        <td className="p-2">{pos.department}</td>
                        <td className="p-2">{pos.experience} yrs</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${pos.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{pos.status}</span>
                        </td>
                        <td className="p-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-blue-100"><Edit className="h-4 w-4 text-blue-600" /></button>
                          {pos.status === 'open' && (
                            <button onClick={() => handleClosePosition(idx)} className="p-1 rounded hover:bg-red-100"><Trash2 className="h-4 w-4 text-red-600" /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* All Applications Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-6">All Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Position</th>
                  <th className="p-2 text-left">Experience</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Applied</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{app.name}</td>
                    <td className="p-2">{app.position}</td>
                    <td className="p-2">{app.experience} yrs</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>{app.status}</span>
                    </td>
                    <td className="p-2">{app.applied}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleOpenModal(app)} className="p-1 rounded hover:bg-blue-100"><Eye className="h-4 w-4 text-blue-600" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Candidate Details Modal */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              <h2 className="text-2xl font-bold mb-4">{selectedApp.name}</h2>
              <div className="mb-2 text-gray-700"><b>Position:</b> {selectedApp.position}</div>
              <div className="mb-2 text-gray-700"><b>Experience:</b> {selectedApp.experience} years</div>
              <div className="mb-2 text-gray-700"><b>Email:</b> {selectedApp.email}</div>
              <div className="mb-2 text-gray-700"><b>Phone:</b> {selectedApp.phone}</div>
              <div className="mb-2 text-gray-700"><b>Applied:</b> {selectedApp.applied}</div>
              <div className="mb-4 text-gray-700"><b>Notes:</b> {selectedApp.notes}</div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleAppAction('shortlisted')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Shortlist</button>
                <button onClick={() => handleAppAction('in-review')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">In Review</button>
                <button onClick={() => handleAppAction('hired')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Hire</button>
                <button onClick={() => handleAppAction('rejected')} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Reject</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffRecruitment;