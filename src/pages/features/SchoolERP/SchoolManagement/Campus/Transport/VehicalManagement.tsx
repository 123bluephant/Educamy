import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialVehicles = [
  { id: 1, vehicle: 'Bus 1', type: 'Bus', capacity: 40, status: 'Active' },
  { id: 2, vehicle: 'Van 1', type: 'Van', capacity: 15, status: 'Inactive' },
];

const VehicalManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ vehicle: '', type: '', capacity: 0, status: 'Active' });

  const handleAdd = () => {
    setVehicles([...vehicles, { ...form, capacity: Number(form.capacity), id: Date.now() }]);
    setForm({ vehicle: '', type: '', capacity: 0, status: 'Active' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Vehical Management</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Vehicle
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Vehicle</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Capacity</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b">
                <td className="p-2">{v.vehicle}</td>
                <td className="p-2">{v.type}</td>
                <td className="p-2">{v.capacity}</td>
                <td className="p-2">{v.status}</td>
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
              <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Vehicle Name" value={form.vehicle} onChange={e => setForm(f => ({ ...f, vehicle: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Type (Bus/Van/etc)" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Capacity" type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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

export default VehicalManagement; 