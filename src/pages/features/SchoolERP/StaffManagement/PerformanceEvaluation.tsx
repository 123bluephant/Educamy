import React, { useState } from 'react';
import { Star, TrendingUp, Award, BarChart, UserX, UserCheck, Search, Eye, Edit, CheckCircle, Trash2 } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

// Dummy data for evaluations
const initialEvaluations = [
  { name: 'John Doe', department: 'Mathematics', rating: 4.8, status: 'completed', period: 'Q2 2025', type: 'Quarterly Review', comments: 'Excellent performance and leadership.' },
  { name: 'Jane Smith', department: 'Science', rating: 4.5, status: 'in-progress', period: 'Q2 2025', type: 'Quarterly Review', comments: 'Consistent and reliable.' },
  { name: 'Mike Johnson', department: 'English', rating: 4.2, status: 'completed', period: 'Q2 2025', type: 'Quarterly Review', comments: 'Good communication skills.' },
  { name: 'Priya Sharma', department: 'Mathematics', rating: 3.2, status: 'pending', period: 'Q2 2025', type: 'Quarterly Review', comments: 'Needs improvement in classroom management.' },
  { name: 'Amit Patel', department: 'Science', rating: 2.8, status: 'pending', period: 'Q2 2025', type: 'Quarterly Review', comments: 'Performance below expectations.' },
];

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  pending: 'bg-gray-100 text-gray-800',
};

const PerformanceEvaluation: React.FC = () => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEval, setSelectedEval] = useState<any>(null);
  const [form, setForm] = useState({ name: '', department: '', rating: '', status: 'pending', period: '', type: 'Quarterly Review', comments: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Dashboard stats
  const avgRating = (evaluations.reduce((acc, e) => acc + e.rating, 0) / evaluations.length).toFixed(1);
  const perfGrowth = '+12%'; // Dummy
  const topPerformers = evaluations.filter(e => e.rating >= 4.5).length;
  const reviewsDone = Math.round((evaluations.filter(e => e.status === 'completed').length / evaluations.length) * 100);
  const pendingReviews = evaluations.filter(e => e.status === 'pending').length;
  const lowestPerformers = evaluations.filter(e => e.rating <= 3).length;

  // Filtered evaluations
  const filteredEvals = evaluations.filter(e =>
    (filterStatus === 'all' || e.status === filterStatus) &&
    (e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Analytics: Ratings by department
  const departments = Array.from(new Set(evaluations.map(e => e.department)));
  const ratingsByDept = departments.map(dep => {
    const deptEvals = evaluations.filter(e => e.department === dep);
    return {
      department: dep,
      avg: (deptEvals.reduce((acc, e) => acc + e.rating, 0) / deptEvals.length).toFixed(1),
    };
  });

  // Top and lowest performers
  const topList = evaluations.filter(e => e.rating >= 4.5);
  const lowList = evaluations.filter(e => e.rating <= 3);

  // Handlers
  const handleOpenModal = (evalObj: any) => { setSelectedEval(evalObj); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setSelectedEval(null); };
  const handleStatusChange = (status: string) => setFilterStatus(status);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
    setFormSuccess('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.department || !form.rating || !form.period || !form.type) {
      setFormError('All fields are required.');
      return;
    }
    if (editIndex !== null) {
      const updated = [...evaluations];
      updated[editIndex] = { ...form, rating: Number(form.rating) };
      setEvaluations(updated);
      setEditIndex(null);
      setFormSuccess('Evaluation updated!');
    } else {
      setEvaluations([...evaluations, { ...form, rating: Number(form.rating) }]);
      setFormSuccess('Evaluation added!');
    }
    setForm({ name: '', department: '', rating: '', status: 'pending', period: '', type: 'Quarterly Review', comments: '' });
  };
  const handleEdit = (idx: number) => {
    setForm({ ...evaluations[idx], rating: evaluations[idx].rating.toString() });
    setEditIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleMarkComplete = (idx: number) => {
    setEvaluations(evaluations.map((e, i) => i === idx ? { ...e, status: 'completed' } : e));
  };
  const handleDelete = (idx: number) => {
    setEvaluations(evaluations.filter((_, i) => i !== idx));
  };

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Performance Evaluation</h1>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Average Rating</h3>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{avgRating}</p>
            <p className="text-sm text-gray-500 mt-2">Out of 5</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Performance Growth</h3>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{perfGrowth}</p>
            <p className="text-sm text-gray-500 mt-2">This Quarter</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Performers</h3>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{topPerformers}</p>
            <p className="text-sm text-gray-500 mt-2">Staff Members</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Reviews Done</h3>
              <BarChart className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{reviewsDone}%</p>
            <p className="text-sm text-gray-500 mt-2">Completion Rate</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Reviews</h3>
              <UserCheck className="h-8 w-8 text-gray-600" />
            </div>
            <p className="text-3xl font-bold text-gray-600">{pendingReviews}</p>
            <p className="text-sm text-gray-500 mt-2">To Complete</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Lowest Performers</h3>
              <UserX className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{lowestPerformers}</p>
            <p className="text-sm text-gray-500 mt-2">Staff Members</p>
          </div>
        </div>
        {/* Analytics Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Ratings by Department</h2>
          <div className="flex gap-6">
            {ratingsByDept.map((dept, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-semibold text-gray-700">{dept.department}</span>
                <div className="w-8 h-24 bg-blue-100 rounded-lg flex items-end justify-center mt-2">
                  <div style={{ height: `${Number(dept.avg) * 20}px` }} className="w-8 bg-blue-500 rounded-t-lg"></div>
                </div>
                <span className="mt-2 text-blue-700 font-bold">{dept.avg}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => handleStatusChange('all')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>All</button>
            <button onClick={() => handleStatusChange('completed')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Completed</button>
            <button onClick={() => handleStatusChange('in-progress')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>In Progress</button>
            <button onClick={() => handleStatusChange('pending')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Pending</button>
          </div>
          <div className="flex items-center border rounded-lg px-2 bg-white w-full md:w-64">
            <Search className="h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search by name or department" value={searchTerm} onChange={handleSearch} className="w-full p-2 outline-none bg-transparent" />
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Evaluations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Evaluations</h2>
            <div className="space-y-4">
              {filteredEvals.slice(0, 3).map((evaluation, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{evaluation.name}</h3>
                    <p className="text-sm text-gray-500">{evaluation.department}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(evaluation.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{evaluation.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[evaluation.status] || 'bg-gray-100 text-gray-800'}`}>{evaluation.status}</span>
                    <button onClick={() => handleOpenModal(evaluation)} className="ml-2 p-1 rounded hover:bg-blue-100"><Eye className="h-5 w-5 text-blue-600" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Start New Evaluation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">{editIndex !== null ? 'Edit Evaluation' : 'Start New Evaluation'}</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="Enter staff member name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select name="department" value={form.department} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option value="">Select Department</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input type="number" name="rating" value={form.rating} onChange={handleFormChange} className="w-full p-2 border rounded-lg" min={1} max={5} step={0.1} placeholder="Enter rating (1-5)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Period</label>
                <input type="text" name="period" value={form.period} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="e.g. Q2 2025" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Type</label>
                <select name="type" value={form.type} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option>Quarterly Review</option>
                  <option>Annual Review</option>
                  <option>Performance Improvement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea name="comments" value={form.comments} onChange={handleFormChange} className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter evaluation comments"></textarea>
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">{editIndex !== null ? 'Update Evaluation' : 'Start Evaluation'}</button>
            </form>
          </div>
        </div>
        {/* All Evaluations Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-6">All Evaluations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Department</th>
                  <th className="p-2 text-left">Rating</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Period</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvals.map((evalObj, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{evalObj.name}</td>
                    <td className="p-2">{evalObj.department}</td>
                    <td className="p-2">{evalObj.rating}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[evalObj.status] || 'bg-gray-100 text-gray-800'}`}>{evalObj.status}</span>
                    </td>
                    <td className="p-2">{evalObj.period}</td>
                    <td className="p-2">{evalObj.type}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleOpenModal(evalObj)} className="p-1 rounded hover:bg-blue-100"><Eye className="h-4 w-4 text-blue-600" /></button>
                      <button onClick={() => handleEdit(idx)} className="p-1 rounded hover:bg-yellow-100"><Edit className="h-4 w-4 text-yellow-600" /></button>
                      {evalObj.status !== 'completed' && (
                        <button onClick={() => handleMarkComplete(idx)} className="p-1 rounded hover:bg-green-100"><CheckCircle className="h-4 w-4 text-green-600" /></button>
                      )}
                      <button onClick={() => handleDelete(idx)} className="p-1 rounded hover:bg-red-100"><Trash2 className="h-4 w-4 text-red-600" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top and Lowest Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
            <ul className="space-y-2">
              {topList.map((e, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{e.name}</span>
                  <span className="text-gray-500">({e.department})</span>
                  <span className="ml-auto text-yellow-600 font-bold">{e.rating}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Lowest Performers</h2>
            <ul className="space-y-2">
              {lowList.map((e, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="font-semibold">{e.name}</span>
                  <span className="text-gray-500">({e.department})</span>
                  <span className="ml-auto text-red-600 font-bold">{e.rating}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Evaluation Details Modal */}
        {showModal && selectedEval && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              <h2 className="text-2xl font-bold mb-4">{selectedEval.name}</h2>
              <div className="mb-2 text-gray-700"><b>Department:</b> {selectedEval.department}</div>
              <div className="mb-2 text-gray-700"><b>Rating:</b> {selectedEval.rating}</div>
              <div className="mb-2 text-gray-700"><b>Status:</b> {selectedEval.status}</div>
              <div className="mb-2 text-gray-700"><b>Period:</b> {selectedEval.period}</div>
              <div className="mb-2 text-gray-700"><b>Type:</b> {selectedEval.type}</div>
              <div className="mb-4 text-gray-700"><b>Comments:</b> {selectedEval.comments}</div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { setForm({ ...selectedEval, rating: selectedEval.rating.toString() }); setEditIndex(evaluations.indexOf(selectedEval)); setShowModal(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
                {selectedEval.status !== 'completed' && (
                  <button onClick={() => { handleMarkComplete(evaluations.indexOf(selectedEval)); setShowModal(false); }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Mark Complete</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceEvaluation;