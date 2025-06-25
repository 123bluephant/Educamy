import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialBuildings = [
  { id: 1, name: 'Science Block', type: 'Academic', assignedTo: 'Class X-A' },
  { id: 2, name: 'Admin Block', type: 'Administrative', assignedTo: 'Office' },
];

const BuildingAllocation: React.FC = () => {
  const [buildings, setBuildings] = useState(initialBuildings);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', assignedTo: '' });

  const handleAdd = () => {
    setBuildings([...buildings, { ...form, id: Date.now() }]);
    setForm({ name: '', type: '', assignedTo: '' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Building Allocation</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Building
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Assigned To</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.type}</td>
                <td className="p-2">{b.assignedTo}</td>
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
              <h2 className="text-xl font-semibold mb-4">Add Building</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Building Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Type (Academic/Admin/etc)" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Assigned To" value={form.assignedTo} onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))} />
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

export default BuildingAllocation; 