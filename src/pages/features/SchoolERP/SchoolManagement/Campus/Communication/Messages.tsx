import React, { useState } from 'react';
import BackButton from '../../../../../../components/BackButton';

interface Message {
  id: number;
  recipient: string;
  content: string;
  date: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, recipient: 'All Staff', content: 'Staff meeting at 3 PM.', date: '2024-06-01' },
    { id: 2, recipient: 'Grade 10', content: 'Project submission deadline extended.', date: '2024-06-02' },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ recipient: '', content: '' });

  const openModal = () => {
    setForm({ recipient: '', content: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ recipient: '', content: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { id: Date.now(), recipient: form.recipient, content: form.content, date: new Date().toISOString().slice(0, 10) },
    ]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button onClick={openModal} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Send</button>
        </div>
        <ul className="divide-y divide-gray-200">
          {messages.map(m => (
            <li key={m.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg text-blue-700">To: {m.recipient}</div>
                <div className="text-gray-600">{m.content}</div>
                <div className="text-xs text-gray-400 mt-1">{m.date}</div>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button onClick={() => handleDelete(m.id)} className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Send Message</h2>
            <input
              name="recipient"
              value={form.recipient}
              onChange={handleChange}
              placeholder="Recipient (e.g., All Staff, Grade 10)"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Message Content"
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Messages; 