import React, { useState } from 'react';
import BackButton from '../../../../../../components/BackButton';

interface Alert {
  id: number;
  title: string;
  message: string;
  date: string;
}

const EmergencyAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, title: 'Fire Drill', message: 'Evacuate the building immediately.', date: '2024-06-01' },
    { id: 2, title: 'Weather Warning', message: 'Severe storm expected today.', date: '2024-06-03' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', message: '' });

  const openModal = () => {
    setForm({ title: '', message: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ title: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlerts([
      ...alerts,
      { id: Date.now(), title: form.title, message: form.message, date: new Date().toISOString().slice(0, 10) },
    ]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Emergency Alerts</h1>
          <button onClick={openModal} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">+ Send Alert</button>
        </div>
        <ul className="divide-y divide-gray-200">
          {alerts.map(a => (
            <li key={a.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg text-red-700">{a.title}</div>
                <div className="text-gray-600">{a.message}</div>
                <div className="text-xs text-gray-400 mt-1">{a.date}</div>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Send Emergency Alert</h2>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Alert Title"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Alert Message"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmergencyAlerts; 