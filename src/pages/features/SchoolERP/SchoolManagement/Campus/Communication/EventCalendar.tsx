import React, { useState } from 'react';
import BackButton from '../../../../../../components/BackButton';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Annual Day', date: '2024-06-10', description: 'Annual Day celebration in the main hall.' },
    { id: 2, title: 'Science Fair', date: '2024-06-15', description: 'Exhibition of science projects.' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', date: '', description: '' });

  const openModal = (event?: Event) => {
    if (event) {
      setEditId(event.id);
      setForm({ title: event.title, date: event.date, description: event.description });
    } else {
      setEditId(null);
      setForm({ title: '', date: '', description: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ title: '', date: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setEvents(events.map(ev => ev.id === editId ? { ...ev, ...form } : ev));
    } else {
      setEvents([
        ...events,
        { id: Date.now(), title: form.title, date: form.date, description: form.description },
      ]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Event Calendar</h1>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add</button>
        </div>
        <ul className="divide-y divide-gray-200">
          {events.map(ev => (
            <li key={ev.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg text-blue-700">{ev.title}</div>
                <div className="text-gray-600">{ev.description}</div>
                <div className="text-xs text-gray-400 mt-1">{ev.date}</div>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button onClick={() => openModal(ev)} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">Edit</button>
                <button onClick={() => handleDelete(ev.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit' : 'Add'} Event</h2>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
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

export default EventCalendar; 