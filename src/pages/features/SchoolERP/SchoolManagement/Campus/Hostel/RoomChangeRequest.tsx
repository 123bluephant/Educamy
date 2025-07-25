import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialRequests = [
  { id: 1, student: 'John Doe', fromRoom: '101', toRoom: '201', hostel: 'A', status: 'Pending' },
  { id: 2, student: 'Jane Smith', fromRoom: '102', toRoom: '202', hostel: 'B', status: 'Approved' },
];

const RoomChangeRequest: React.FC = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ student: '', fromRoom: '', toRoom: '', hostel: '', status: 'Pending' });

  const handleAdd = () => {
    setRequests([...requests, { ...form, id: Date.now() }]);
    setForm({ student: '', fromRoom: '', toRoom: '', hostel: '', status: 'Pending' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Room Change Requests</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Request
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Student</th>
              <th className="p-2 text-left">From Room</th>
              <th className="p-2 text-left">To Room</th>
              <th className="p-2 text-left">Hostel</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.student}</td>
                <td className="p-2">{r.fromRoom}</td>
                <td className="p-2">{r.toRoom}</td>
                <td className="p-2">{r.hostel}</td>
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
              <h2 className="text-xl font-semibold mb-4">Add Room Change Request</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Student Name" value={form.student} onChange={e => setForm(f => ({ ...f, student: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="From Room" value={form.fromRoom} onChange={e => setForm(f => ({ ...f, fromRoom: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="To Room" value={form.toRoom} onChange={e => setForm(f => ({ ...f, toRoom: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Hostel" value={form.hostel} onChange={e => setForm(f => ({ ...f, hostel: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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

export default RoomChangeRequest; 