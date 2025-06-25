import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialResources = [
  { id: 1, title: 'Algebra eBook', type: 'eBook', link: 'https://example.com/algebra', status: 'Available' },
  { id: 2, title: 'Physics Video', type: 'Video', link: 'https://example.com/physics', status: 'Available' },
];

const DigitalLibrary: React.FC = () => {
  const [resources, setResources] = useState(initialResources);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: '', link: '', status: 'Available' });

  const handleAdd = () => {
    setResources([...resources, { ...form, id: Date.now() }]);
    setForm({ title: '', type: '', link: '', status: 'Available' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Resource
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Link</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.title}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2"><a href={r.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open</a></td>
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
              <h2 className="text-xl font-semibold mb-4">Add Resource</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Type (eBook/Video/etc)" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Resource Link" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
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

export default DigitalLibrary; 