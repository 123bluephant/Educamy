import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialIssues = [
  { id: 1, student: 'John Doe', book: 'Mathematics', issueDate: '2024-07-01', returnDate: '2024-07-10', status: 'Returned' },
  { id: 2, student: 'Jane Smith', book: 'Physics', issueDate: '2024-07-02', returnDate: '', status: 'Issued' },
];

const IssuesRecord: React.FC = () => {
  const [issues, setIssues] = useState(initialIssues);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ student: '', book: '', issueDate: '', returnDate: '', status: 'Issued' });

  const handleAdd = () => {
    setIssues([...issues, { ...form, id: Date.now() }]);
    setForm({ student: '', book: '', issueDate: '', returnDate: '', status: 'Issued' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Issues Record</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Issue
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Student</th>
              <th className="p-2 text-left">Book</th>
              <th className="p-2 text-left">Issue Date</th>
              <th className="p-2 text-left">Return Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i) => (
              <tr key={i.id} className="border-b">
                <td className="p-2">{i.student}</td>
                <td className="p-2">{i.book}</td>
                <td className="p-2">{i.issueDate}</td>
                <td className="p-2">{i.returnDate}</td>
                <td className="p-2">{i.status}</td>
                <td className="p-2 flex space-x-2">
                  <button className="text-blue-600 hover:underline"><Edit className="h-4 w-4" /></button>
                  <button className="text-red-600 hover:underline"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add Issue</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Student Name" value={form.student} onChange={e => setForm(f => ({ ...f, student: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Book Title" value={form.book} onChange={e => setForm(f => ({ ...f, book: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" type="date" value={form.issueDate} onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" type="date" value={form.returnDate} onChange={e => setForm(f => ({ ...f, returnDate: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Issued">Issued</option>
                  <option value="Returned">Returned</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                  <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuesRecord; 