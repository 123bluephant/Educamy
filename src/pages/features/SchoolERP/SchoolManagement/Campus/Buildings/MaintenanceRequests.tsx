import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialRequests = [
  { id: 1, facility: 'Science Block', issue: 'AC not working', status: 'Pending' },
  { id: 2, facility: 'Admin Block', issue: 'Water leakage', status: 'Resolved' },
];

const MaintenanceRequests: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ facility: '', issue: '', status: 'Pending' });

  const handleAdd = () => {
    setRequests([...requests, { ...form, id: Date.now() }]);
    setForm({ facility: '', issue: '', status: 'Pending' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Request
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Facility</th>
              <th className="p-2 text-left">Issue</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.facility}</td>
                <td className="p-2">{r.issue}</td>
                <td className="p-2">{r.status}</td>
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
              <h2 className="text-xl font-semibold mb-4">Add Maintenance Request</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Facility" value={form.facility} onChange={e => setForm(f => ({ ...f, facility: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Issue" value={form.issue} onChange={e => setForm(f => ({ ...f, issue: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
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

export default MaintenanceRequests; 