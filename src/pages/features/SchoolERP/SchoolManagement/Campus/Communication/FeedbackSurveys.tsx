import React, { useState } from 'react';
import BackButton from '../../../../../../components/BackButton';

interface Survey {
  id: number;
  title: string;
  description: string;
  date: string;
}

const FeedbackSurveys: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([
    { id: 1, title: 'Canteen Feedback', description: 'Share your experience with the canteen services.', date: '2024-06-01' },
    { id: 2, title: 'Annual Day Survey', description: 'Give feedback on the Annual Day event.', date: '2024-06-05' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', description: '' });

  const openModal = (survey?: Survey) => {
    if (survey) {
      setEditId(survey.id);
      setForm({ title: survey.title, description: survey.description });
    } else {
      setEditId(null);
      setForm({ title: '', description: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ title: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setSurveys(surveys.map(s => s.id === editId ? { ...s, ...form } : s));
    } else {
      setSurveys([
        ...surveys,
        { id: Date.now(), title: form.title, description: form.description, date: new Date().toISOString().slice(0, 10) },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setSurveys(surveys.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Feedback & Surveys</h1>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add</button>
        </div>
        <ul className="divide-y divide-gray-200">
          {surveys.map(s => (
            <li key={s.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg text-blue-700">{s.title}</div>
                <div className="text-gray-600">{s.description}</div>
                <div className="text-xs text-gray-400 mt-1">{s.date}</div>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button onClick={() => openModal(s)} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">Edit</button>
                <button onClick={() => handleDelete(s.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Survey</h2>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Survey Title"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editId ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackSurveys; 