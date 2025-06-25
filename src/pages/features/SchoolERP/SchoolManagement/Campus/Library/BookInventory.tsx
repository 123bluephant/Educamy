import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import BackButton from '../../../../../../components/BackButton';

const initialBooks = [
  { id: 1, title: 'Mathematics', author: 'John Smith', isbn: '1234567890', status: 'Available' },
  { id: 2, title: 'Physics', author: 'Jane Doe', isbn: '0987654321', status: 'Issued' },
];

const BookInventory: React.FC = () => {
  const [books, setBooks] = useState(initialBooks);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', status: 'Available' });

  const handleAdd = () => {
    setBooks([...books, { ...form, id: Date.now() }]);
    setForm({ title: '', author: '', isbn: '', status: 'Available' });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Book Inventory</h1>
          <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" /> Add Book
          </button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">ISBN</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.title}</td>
                <td className="p-2">{b.author}</td>
                <td className="p-2">{b.isbn}</td>
                <td className="p-2">{b.status}</td>
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
              <h2 className="text-xl font-semibold mb-4">Add Book</h2>
              <div className="space-y-4">
                <input className="w-full p-2 border rounded-lg" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="Author" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
                <input className="w-full p-2 border rounded-lg" placeholder="ISBN" value={form.isbn} onChange={e => setForm(f => ({ ...f, isbn: e.target.value }))} />
                <select className="w-full p-2 border rounded-lg" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Available">Available</option>
                  <option value="Issued">Issued</option>
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

export default BookInventory; 