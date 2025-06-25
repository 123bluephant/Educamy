import React, { useState } from 'react';
import { Users, BookOpen, ClipboardList, UserPlus, UserCheck, Book, Calendar, Plus, Edit, Trash2, Search } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

// Dummy data
const initialClasses = [
  { id: 1, name: 'Class 1', sections: ['A', 'B'], teacher: 'Mr. Sharma', students: 40, active: true },
  { id: 2, name: 'Class 2', sections: ['A'], teacher: 'Ms. Gupta', students: 32, active: true },
  { id: 3, name: 'Class 3', sections: ['A', 'B', 'C'], teacher: 'Mr. Singh', students: 50, active: false },
];
const initialTeachers = [
  'Mr. Sharma', 'Ms. Gupta', 'Mr. Singh', 'Ms. Verma', 'Mr. Khan'
];
const initialSubjects = [
  'Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'
];
const initialStudents = [
  { id: 1, name: 'Amit Kumar', className: 'Class 1', section: 'A' },
  { id: 2, name: 'Priya Singh', className: 'Class 2', section: 'A' },
  { id: 3, name: 'Rahul Verma', className: 'Class 3', section: 'B' },
];

const TABS = [
  { key: 'classes', label: 'Classes & Sections', icon: BookOpen },
  { key: 'teachers', label: 'Teachers Assignment', icon: UserCheck },
  { key: 'students', label: 'Student Assignment', icon: Users },
  { key: 'subjects', label: 'Subject Allocation', icon: Book },
  { key: 'timetable', label: 'Timetable', icon: Calendar },
];

type ClassType = {
  id: number;
  name: string;
  sections: string[];
  teacher: string;
  students: number;
  active: boolean;
  subjects?: string[];
};

type StudentType = {
  id: number;
  name: string;
  className: string;
  section: string;
};

const ClassManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('classes');
  const [classes, setClasses] = useState<ClassType[]>(initialClasses);
  const [teachers, setTeachers] = useState<string[]>(initialTeachers);
  const [subjects] = useState<string[]>(initialSubjects);
  const [students, setStudents] = useState<StudentType[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit'; classData?: ClassType }>({ open: false, mode: 'add' });
  const [teacherModal, setTeacherModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [assignmentModal, setAssignmentModal] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({ name: '', className: '', section: '' });
  const [subjectModal, setSubjectModal] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ classId: '', subjects: '' });

  // Stats
  const totalClasses = classes.length;
  const totalSections = classes.reduce((acc, c) => acc + c.sections.length, 0);
  const totalStudents = classes.reduce((acc, c) => acc + c.students, 0);
  const teachersAssigned = classes.filter(c => c.teacher).length;

  // CRUD Handlers
  const handleAddEditClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const sections = (formData.get('sections') as string).split(',').map(s => s.trim()).filter(Boolean);
    const studentsCount = Number(formData.get('students'));
    const active = formData.get('active') === 'on';
    const teacher = selectedTeacher;
    if (modal.mode === 'add') {
      setClasses(prev => [...prev, { id: Date.now(), name, sections, teacher, students: studentsCount, active }]);
    } else if (modal.mode === 'edit' && modal.classData) {
      setClasses(prev => prev.map(c => c.id === modal.classData!.id ? { ...c, name, sections, teacher, students: studentsCount, active } : c));
    }
    setModal({ open: false, mode: 'add' });
    setSelectedTeacher('');
  };
  const handleEdit = (classData: ClassType) => {
    setModal({ open: true, mode: 'edit', classData });
    setSelectedTeacher(classData.teacher);
  };
  const handleDelete = (id: number) => setClasses(prev => prev.filter(c => c.id !== id));
  const handleAddClassModal = () => {
    setModal({ open: true, mode: 'add' });
    setSelectedTeacher('');
  };

  // Filtered classes
  const filteredClasses = classes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Class & Section Management</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Total Classes</div>
              <div className="text-xl font-bold text-blue-700">{totalClasses}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <ClipboardList className="h-6 w-6 text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Active Sections</div>
              <div className="text-xl font-bold text-green-700">{totalSections}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Users className="h-6 w-6 text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Total Students</div>
              <div className="text-xl font-bold text-purple-700">{totalStudents}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <UserCheck className="h-6 w-6 text-pink-600" />
            <div>
              <div className="text-xs text-gray-500">Teachers Assigned</div>
              <div className="text-xl font-bold text-pink-700">{teachersAssigned}</div>
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
          {/* Classes & Sections Tab */}
          {activeTab === 'classes' && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search class..."
                    className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={handleAddClassModal}
                >
                  <Plus className="h-5 w-5" /> Add Class
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Sections</th>
                      <th className="p-2 text-left">Teacher</th>
                      <th className="p-2 text-left">Students</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClasses.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-400">No classes found.</td>
                      </tr>
                    )}
                    {filteredClasses.map(c => (
                      <tr key={c.id} className="border-b hover:bg-blue-50">
                        <td className="p-2 font-medium">{c.name}</td>
                        <td className="p-2">{c.sections.join(', ')}</td>
                        <td className="p-2">{c.teacher}</td>
                        <td className="p-2">{c.students}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${c.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.active ? 'Active' : 'Inactive'}</span>
                        </td>
                        <td className="p-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-blue-100" onClick={() => handleEdit(c)}><Edit className="h-4 w-4 text-blue-600" /></button>
                          <button className="p-1 rounded hover:bg-red-100" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-red-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Modal for Add/Edit Class */}
              {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAddEditClass}
                  >
                    <h2 className="text-xl font-bold mb-4">{modal.mode === 'add' ? 'Add Class' : 'Edit Class'}</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Class Name</label>
                      <input name="name" defaultValue={modal.classData?.name || ''} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Sections (comma separated)</label>
                      <input name="sections" defaultValue={modal.classData?.sections.join(', ') || ''} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Class Teacher</label>
                      <select
                        name="teacher"
                        value={selectedTeacher}
                        onChange={e => setSelectedTeacher(e.target.value)}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">No. of Students</label>
                      <input name="students" type="number" min={1} defaultValue={modal.classData?.students || 1} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                      <input name="active" type="checkbox" defaultChecked={modal.classData?.active ?? true} className="h-4 w-4" />
                      <span className="text-sm">Active</span>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{modal.mode === 'add' ? 'Add' : 'Update'}</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setModal({ open: false, mode: 'add' })}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
          {/* Teachers Assignment Tab */}
          {activeTab === 'teachers' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Teachers Assignment</h2>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setTeacherModal(true)}
                >
                  <Plus className="h-5 w-5" /> Add Teacher
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Sections</th>
                      <th className="p-2 text-left">Assigned Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(c => (
                      <tr key={c.id} className="border-b">
                        <td className="p-2 font-medium">{c.name}</td>
                        <td className="p-2">{c.sections.join(', ')}</td>
                        <td className="p-2">{c.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add Teacher Modal */}
              {teacherModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={e => {
                      e.preventDefault();
                      if (newTeacher.trim()) {
                        setTeachers(prev => [...prev, newTeacher.trim()]);
                        setNewTeacher('');
                        setTeacherModal(false);
                      }
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4">Add Teacher</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Teacher Name</label>
                      <input
                        type="text"
                        value={newTeacher}
                        onChange={e => setNewTeacher(e.target.value)}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter teacher's name"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setTeacherModal(false); setNewTeacher(''); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {/* Student Assignment Tab */}
          {activeTab === 'students' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Student Assignment</h2>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setAssignmentModal(true)}
                >
                  <Plus className="h-5 w-5" /> Add Assignment
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Student Name</th>
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.id} className="border-b">
                        <td className="p-2 font-medium">{s.name}</td>
                        <td className="p-2">{s.className}</td>
                        <td className="p-2">{s.section}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add Assignment Modal */}
              {assignmentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={e => {
                      e.preventDefault();
                      if (assignmentForm.name.trim() && assignmentForm.className.trim() && assignmentForm.section.trim()) {
                        setStudents(prev => [
                          ...prev,
                          { id: Date.now(), name: assignmentForm.name.trim(), className: assignmentForm.className.trim(), section: assignmentForm.section.trim() }
                        ]);
                        setAssignmentForm({ name: '', className: '', section: '' });
                        setAssignmentModal(false);
                      }
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4">Add Student Assignment</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Student Name</label>
                      <input
                        type="text"
                        value={assignmentForm.name}
                        onChange={e => setAssignmentForm(f => ({ ...f, name: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Class</label>
                      <input
                        type="text"
                        value={assignmentForm.className}
                        onChange={e => setAssignmentForm(f => ({ ...f, className: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter class (e.g., Class 1)"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Section</label>
                      <input
                        type="text"
                        value={assignmentForm.section}
                        onChange={e => setAssignmentForm(f => ({ ...f, section: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter section (e.g., A)"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setAssignmentModal(false); setAssignmentForm({ name: '', className: '', section: '' }); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {/* Subject Allocation Tab */}
          {activeTab === 'subjects' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Subject Allocation</h2>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setSubjectModal(true)}
                >
                  <Plus className="h-5 w-5" /> Allocate Subject
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Sections</th>
                      <th className="p-2 text-left">Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(c => (
                      <tr key={c.id} className="border-b">
                        <td className="p-2 font-medium">{c.name}</td>
                        <td className="p-2">{c.sections.join(', ')}</td>
                        <td className="p-2">{Array.isArray(c.subjects) ? c.subjects.join(', ') : subjects.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Allocate Subject Modal */}
              {subjectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={e => {
                      e.preventDefault();
                      if (subjectForm.classId && subjectForm.subjects.trim()) {
                        setClasses(prev => prev.map(c => c.id === Number(subjectForm.classId) ? { ...c, subjects: subjectForm.subjects.split(',').map(s => s.trim()).filter(Boolean) } : c));
                        setSubjectForm({ classId: '', subjects: '' });
                        setSubjectModal(false);
                      }
                    }}
                  >
                    <h2 className="text-xl font-bold mb-4">Allocate Subjects to Class</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Select Class</label>
                      <select
                        value={subjectForm.classId}
                        onChange={e => setSubjectForm(f => ({ ...f, classId: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select Class</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Subjects (comma separated)</label>
                      <input
                        type="text"
                        value={subjectForm.subjects}
                        onChange={e => setSubjectForm(f => ({ ...f, subjects: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="e.g., Mathematics, Science, English"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Allocate</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setSubjectModal(false); setSubjectForm({ classId: '', subjects: '' }); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
          {/* Timetable Tab */}
          {activeTab === 'timetable' && (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <Calendar className="h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Timetable Management</h2>
              <p className="text-gray-600 mb-4">Manage and view class timetables for each section.</p>
              <a
                href="/features/school-erp/school/timetable-management"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Timetable Management
              </a>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;