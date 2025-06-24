import React, { useState } from 'react';
import BackButton from '../../../../../../components/BackButton';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 1, title: 'Holiday Notice', content: 'School will remain closed on Friday.', date: '2024-06-01' },
    { id: 2, title: 'Exam Schedule', content: 'Mid-term exams start next week.', date: '2024-06-05' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', content: '' });

  const openModal = (announcement?: Announcement) => {
    if (announcement) {
      setEditId(announcement.id);
      setForm({ title: announcement.title, content: announcement.content });
    } else {
      setEditId(null);
      setForm({ title: '', content: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ title: '', content: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setAnnouncements(announcements.map(a => a.id === editId ? { ...a, ...form } : a));
    } else {
      setAnnouncements([
        ...announcements,
        { id: Date.now(), title: form.title, content: form.content, date: new Date().toISOString().slice(0, 10) },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add</button>
        </div>
        <ul className="divide-y divide-gray-200">
          {announcements.map(a => (
            <li key={a.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg text-blue-700">{a.title}</div>
                <div className="text-gray-600">{a.content}</div>
                <div className="text-xs text-gray-400 mt-1">{a.date}</div>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button onClick={() => openModal(a)} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">Edit</button>
                <button onClick={() => handleDelete(a.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Announcement</h2>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
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

export default Announcements; 