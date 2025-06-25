import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialAssignments = [
  { id: 1, driver: 'John Driver', vehicle: 'Bus 1', route: 'A-B', status: 'Assigned' },
  { id: 2, driver: 'Jane Driver', vehicle: 'Van 1', route: 'B-C', status: 'Unassigned' },
];

const DriverAssignment: React.FC = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ driver: '', vehicle: '', route: '', status: 'Assigned' });

  const handleAdd = () => {
    setAssignments([...assignments, { ...form, id: Date.now() }]);
    setForm({ driver: '', vehicle: '', route: '', status: 'Assigned' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Driver Assignment</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Assign Driver
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Driver</th>
              <th className="p-2 text-left">Vehicle</th>
              <th className="p-2 text-left">Route</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-2">{a.driver}</td>
                <td className="p-2">{a.vehicle}</td>
                <td className="p-2">{a.route}</td>
                <td className="p-2">{a.status}</td>
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
              <h2 className="text-xl font-semibold mb-4">Assign Driver</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Driver Name" value={form.driver} onChange={e => setForm(f => ({ ...f, driver: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Vehicle" value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Route" value={form.route} onChange={e => setForm(f => ({ ...f, route: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Assigned">Assigned</option>
                  <option value="Unassigned">Unassigned</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                  <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Assign</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverAssignment; 