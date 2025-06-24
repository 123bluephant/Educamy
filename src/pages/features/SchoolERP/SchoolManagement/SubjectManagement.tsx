import React, { useState } from 'react';
import { BookOpen, Users, Search, Plus, Edit2, Trash2, X, BarChart2, Layers, ClipboardList, Download, Printer } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const TABS = [
  { key: 'list', label: 'Subject List', icon: BookOpen },
  { key: 'allocation', label: 'Allocation', icon: Layers },
  { key: 'curriculum', label: 'Curriculum', icon: ClipboardList },
  { key: 'analytics', label: 'Analytics/Reports', icon: BarChart2 },
];

const SUBJECT_TYPES = ['Mandatory', 'Elective'];
const SUBJECT_STATUS = ['Active', 'Inactive'];
const CLASSES = ['X-A', 'X-B', 'X-C'];
const TEACHERS = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Priya Singh'];

const initialSubjects = [
  { id: '1', name: 'Mathematics', code: 'MATH101', teacher: 'John Doe', class: 'X-A', type: 'Mandatory', status: 'Active', description: 'Advanced Mathematics', topics: ['Algebra', 'Geometry'] },
  { id: '2', name: 'Physics', code: 'PHY101', teacher: 'Jane Smith', class: 'X-B', type: 'Mandatory', status: 'Active', description: 'Basic Physics', topics: ['Mechanics', 'Optics'] },
  { id: '3', name: 'Chemistry', code: 'CHEM101', teacher: 'Mike Johnson', class: 'X-C', type: 'Elective', status: 'Inactive', description: 'General Chemistry', topics: ['Organic', 'Inorganic'] },
];

const SubjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: any }>({ open: false, mode: 'add' });
  const [curriculumModal, setCurriculumModal] = useState<{ open: boolean; subjectId?: string }>({ open: false });
  const [topic, setTopic] = useState('');
  const [topicDesc, setTopicDesc] = useState('');
  const [allocationModal, setAllocationModal] = useState<{ open: boolean; subjectId?: string }>({ open: false });
  const [allocClass, setAllocClass] = useState('');

  // Stats
  const totalSubjects = subjects.length;
  const totalTeachers = new Set(subjects.map(s => s.teacher)).size;
  const activeSubjects = subjects.filter(s => s.status === 'Active').length;
  const electiveSubjects = subjects.filter(s => s.type === 'Elective').length;

  // Filtered subjects
  const filteredSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.teacher.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  // CRUD Handlers
  const handleAddEditSubject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const code = formData.get('code') as string;
    const teacher = formData.get('teacher') as string;
    const className = formData.get('class') as string;
    const type = formData.get('type') as string;
    const status = formData.get('status') as string;
    const description = formData.get('description') as string;
    if (modal.mode === 'add') {
      setSubjects(prev => [...prev, { id: Date.now().toString(), name, code, teacher, class: className, type, status, description, topics: [] }]);
    } else if (modal.mode === 'edit' && modal.data) {
      setSubjects(prev => prev.map(s => s.id === modal.data!.id ? { ...s, name, code, teacher, class: className, type, status, description } : s));
    }
    setModal({ open: false, mode: 'add' });
  };
  const handleEdit = (data: any) => setModal({ open: true, mode: 'edit', data });
  const handleDelete = (id: string) => setSubjects(prev => prev.filter(s => s.id !== id));

  // Curriculum Handlers
  const handleAddTopic = (subjectId: string) => {
    if (topic.trim()) {
      setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, topics: [...(s.topics || []), topic + (topicDesc ? ` (${topicDesc})` : '')] } : s));
      setTopic('');
      setTopicDesc('');
    }
  };
  const handleDeleteTopic = (subjectId: string, idx: number) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, topics: s.topics.filter((_: any, i: number) => i !== idx) } : s));
  };

  // Allocation Handler
  const handleAllocate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubjects(prev => prev.map(s => s.id === allocationModal.subjectId ? { ...s, class: allocClass } : s));
    setAllocationModal({ open: false });
    setAllocClass('');
  };

  // Analytics Data
  const typeData = [
    { name: 'Mandatory', value: subjects.filter(s => s.type === 'Mandatory').length },
    { name: 'Elective', value: subjects.filter(s => s.type === 'Elective').length },
  ];
  const statusData = [
    { name: 'Active', value: subjects.filter(s => s.status === 'Active').length },
    { name: 'Inactive', value: subjects.filter(s => s.status === 'Inactive').length },
  ];
  const teacherData = TEACHERS.map(t => ({ name: t, value: subjects.filter(s => s.teacher === t).length }));

  // Export Handlers (CSV)
  const handleExportCSV = () => {
    const csv = [
      ['Subject Name', 'Code', 'Teacher', 'Class', 'Type', 'Status', 'Description'],
      ...subjects.map(s => [s.name, s.code, s.teacher, s.class, s.type, s.status, s.description])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subjects.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Subject Management</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Total Subjects</div>
              <div className="text-xl font-bold text-blue-700">{totalSubjects}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Users className="h-6 w-6 text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Subject Teachers</div>
              <div className="text-xl font-bold text-green-700">{totalTeachers}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Active Subjects</div>
              <div className="text-xl font-bold text-purple-700">{activeSubjects}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <BookOpen className="h-6 w-6 text-pink-600" />
            <div>
              <div className="text-xs text-gray-500">Elective Subjects</div>
              <div className="text-xl font-bold text-pink-700">{electiveSubjects}</div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon className="h-5 w-5" /> {tab.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Subject List Tab */}
          {activeTab === 'list' && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setModal({ open: true, mode: 'add' })}
                >
                  <Plus className="h-5 w-5" /> Add Subject
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Subject Name</th>
                      <th className="p-2 text-left">Code</th>
                      <th className="p-2 text-left">Teacher</th>
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-400">No subjects found.</td>
                      </tr>
                    )}
                    {filteredSubjects.map(s => (
                      <tr key={s.id} className="border-b hover:bg-blue-50">
                        <td className="p-2 font-medium">{s.name}</td>
                        <td className="p-2">{s.code}</td>
                        <td className="p-2">{s.teacher}</td>
                        <td className="p-2">{s.class}</td>
                        <td className="p-2">{s.type}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>
                        </td>
                        <td className="p-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-blue-100" onClick={() => handleEdit(s)}><Edit2 className="h-4 w-4 text-blue-600" /></button>
                          <button className="p-1 rounded hover:bg-red-100" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4 text-red-600" /></button>
                          <button className="p-1 rounded hover:bg-green-100" onClick={() => setAllocationModal({ open: true, subjectId: s.id })}>Allocate</button>
                          <button className="p-1 rounded hover:bg-purple-100" onClick={() => setCurriculumModal({ open: true, subjectId: s.id })}>Curriculum</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add/Edit Subject Modal */}
              {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAddEditSubject}
                  >
                    <h2 className="text-xl font-bold mb-4">{modal.mode === 'add' ? 'Add Subject' : 'Edit Subject'}</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Subject Name</label>
                      <input name="name" defaultValue={modal.data?.name || ''} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Code</label>
                      <input name="code" defaultValue={modal.data?.code || ''} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Teacher</label>
                      <select name="teacher" defaultValue={modal.data?.teacher || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Teacher</option>
                        {TEACHERS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Class</label>
                      <select name="class" defaultValue={modal.data?.class || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Class</option>
                        {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select name="type" defaultValue={modal.data?.type || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Type</option>
                        {SUBJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select name="status" defaultValue={modal.data?.status || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Status</option>
                        {SUBJECT_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea name="description" defaultValue={modal.data?.description || ''} className="w-full border rounded-lg px-3 py-2" rows={2} />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{modal.mode === 'add' ? 'Add' : 'Update'}</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setModal({ open: false, mode: 'add' })}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              {/* Allocation Modal */}
              {allocationModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAllocate}
                  >
                    <h2 className="text-xl font-bold mb-4">Allocate Subject to Class</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Select Class</label>
                      <select
                        value={allocClass}
                        onChange={e => setAllocClass(e.target.value)}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select Class</option>
                        {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Allocate</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setAllocationModal({ open: false }); setAllocClass(''); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              {/* Curriculum Modal */}
              {curriculumModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                    <h2 className="text-xl font-bold mb-4">Manage Curriculum</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Add Topic</label>
                      <input
                        type="text"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 mb-2"
                        placeholder="Enter topic name"
                      />
                      <input
                        type="text"
                        value={topicDesc}
                        onChange={e => setTopicDesc(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter topic description (optional)"
                      />
                      <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => handleAddTopic(curriculumModal.subjectId!)}
                        type="button"
                      >
                        Add Topic
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Topics</h3>
                      <ul className="list-disc pl-5">
                        {subjects.find(s => s.id === curriculumModal.subjectId)?.topics.map((t: string, idx: number) => (
                          <li key={idx} className="flex items-center justify-between">
                            <span>{t}</span>
                            <button className="text-red-500 hover:underline ml-2" onClick={() => handleDeleteTopic(curriculumModal.subjectId!, idx)} type="button">Delete</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setCurriculumModal({ open: false }); setTopic(''); setTopicDesc(''); }}>Close</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {/* Allocation Tab */}
          {activeTab === 'allocation' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Subject Allocation</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Subject</th>
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Teacher</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map(s => (
                      <tr key={s.id} className="border-b">
                        <td className="p-2 font-medium">{s.name}</td>
                        <td className="p-2">{s.class}</td>
                        <td className="p-2">{s.teacher}</td>
                        <td className="p-2">{s.type}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Curriculum Overview</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Subject</th>
                      <th className="p-2 text-left">Topics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map(s => (
                      <tr key={s.id} className="border-b">
                        <td className="p-2 font-medium">{s.name}</td>
                        <td className="p-2">
                          <ul className="list-disc pl-5">
                            {s.topics.map((t: string, idx: number) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Analytics/Reports Tab */}
          {activeTab === 'analytics' && (
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
              <h2 className="text-xl font-bold mb-2">Subject Analytics & Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Subject Type Distribution</h3>
                  <div className="flex gap-2">
                    {typeData.map(d => (
                      <div key={d.name} className="flex flex-col items-center">
                        <span className="text-lg font-bold text-blue-700">{d.value}</span>
                        <span className="text-xs text-gray-600">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Subject Status</h3>
                  <div className="flex gap-2">
                    {statusData.map(d => (
                      <div key={d.name} className="flex flex-col items-center">
                        <span className="text-lg font-bold text-green-700">{d.value}</span>
                        <span className="text-xs text-gray-600">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 md:col-span-2">
                  <h3 className="font-semibold mb-2">Teacher Workload</h3>
                  <div className="flex gap-2 flex-wrap">
                    {teacherData.map(d => (
                      <div key={d.name} className="flex flex-col items-center">
                        <span className="text-lg font-bold text-purple-700">{d.value}</span>
                        <span className="text-xs text-gray-600">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium" onClick={handleExportCSV}>
                  <Download className="h-5 w-5" /> Export as CSV
                </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium" onClick={handlePrint}>
                  <Printer className="h-5 w-5" /> Print
                </button>
              </div>
              <div className="text-gray-500 text-sm">(Export/Print functionality is real for CSV, and uses browser print.)</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectManagement;