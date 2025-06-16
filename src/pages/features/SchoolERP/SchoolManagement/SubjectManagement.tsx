import React, { useState } from 'react';
import { BookOpen, Users, Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  class: string;
  description: string;
}

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', code: 'MATH101', teacher: 'John Doe', class: 'X-A', description: 'Advanced Mathematics' },
    { id: '2', name: 'Physics', code: 'PHY101', teacher: 'Jane Smith', class: 'X-B', description: 'Basic Physics' },
    { id: '3', name: 'Chemistry', code: 'CHEM101', teacher: 'Mike Johnson', class: 'X-C', description: 'General Chemistry' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignTeacherModalOpen, setIsAssignTeacherModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState<Omit<Subject, 'id'>>({ 
    name: '', 
    code: '', 
    teacher: '', 
    class: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(subjects.map(subject =>
        subject.id === editingSubject.id
          ? { ...formData, id: subject.id }
          : subject
      ));
    } else {
      setSubjects([...subjects, { ...formData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    handleCloseModal();
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData(subject);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
    setFormData({ name: '', code: '', teacher: '', class: '', description: '' });
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAssignTeacherModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Assign Teachers</h3>
          <button
            onClick={() => setIsAssignTeacherModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subject
            </label>
            <select className="w-full p-2 border rounded-lg">
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Teacher
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter teacher name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Assign Teacher
          </button>
        </form>
      </div>
    </div>
  );

  const renderReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Generate Report</h3>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subject
            </label>
            <select className="w-full p-2 border rounded-lg">
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select className="w-full p-2 border rounded-lg">
              <option value="attendance">Attendance Report</option>
              <option value="performance">Performance Report</option>
              <option value="summary">Summary Report</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Report
          </button>
        </form>
      </div>
    </div>
  );

  const renderCurriculumModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Curriculum Setup</h3>
          <button
            onClick={() => setIsCurriculumModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subject
            </label>
            <select className="w-full p-2 border rounded-lg">
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter topic name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder="Enter topic description"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Topic
          </button>
        </form>
      </div>
    </div>
  );

  // Replace the incorrect function declaration with this one
  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Subject Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Subject Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Total Subjects</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{subjects.length}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Subject Teachers</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {new Set(subjects.map(s => s.teacher)).size}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <div className="h-4 w-4 mr-2" />
                Add Subject
              </button>
              <button
                onClick={() => setIsAssignTeacherModalOpen(true)}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Assign Teachers
              </button>
              <button
                onClick={handleReportClick}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Subject Reports
              </button>
              <button
                onClick={() => setIsCurriculumModalOpen(true)}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Curriculum Setup
              </button>
            </div>
          </div>

          {/* Subject List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Subject List</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subjects..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Subject Name</th>
                    <th className="px-4 py-2 text-left">Code</th>
                    <th className="px-4 py-2 text-left">Teacher</th>
                    <th className="px-4 py-2 text-left">Class</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map(subject => (
                    <tr key={subject.id} className="border-t">
                      <td className="px-4 py-2">{subject.name}</td>
                      <td className="px-4 py-2">{subject.code}</td>
                      <td className="px-4 py-2">{subject.teacher}</td>
                      <td className="px-4 py-2">{subject.class}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(subject)}
                          className="text-blue-600 hover:text-blue-800 mx-2"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subject.id)}
                          className="text-red-600 hover:text-red-800 mx-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher
                </label>
                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="X-A">X-A</option>
                  <option value="X-B">X-B</option>
                  <option value="X-C">X-C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingSubject ? 'Update' : 'Add'} Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isAssignTeacherModalOpen && renderAssignTeacherModal()}
      {isReportModalOpen && renderReportModal()}
      {isCurriculumModalOpen && renderCurriculumModal()}
    </div>
  );
};

export default SubjectManagement;