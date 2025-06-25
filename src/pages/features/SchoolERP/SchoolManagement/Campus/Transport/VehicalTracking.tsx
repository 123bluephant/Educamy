import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialTracking = [
  { id: 1, vehicle: 'Bus 1', location: 'Stop 3', status: 'On Route' },
  { id: 2, vehicle: 'Van 1', location: 'Garage', status: 'Idle' },
];

const VehicalTracking: React.FC = () => {
  const [tracking, setTracking] = useState(initialTracking);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ vehicle: '', location: '', status: 'On Route' });

  const handleAdd = () => {
    setTracking([...tracking, { ...form, id: Date.now() }]);
    setForm({ vehicle: '', location: '', status: 'On Route' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Vehical Tracking</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Tracking
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Vehicle</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracking.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.vehicle}</td>
                <td className="p-2">{t.location}</td>
                <td className="p-2">{t.status}</td>
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
              <h2 className="text-xl font-semibold mb-4">Add Tracking</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Vehicle Name" value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="On Route">On Route</option>
                  <option value="Idle">Idle</option>
                  <option value="Maintenance">Maintenance</option>
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

export default VehicalTracking; 