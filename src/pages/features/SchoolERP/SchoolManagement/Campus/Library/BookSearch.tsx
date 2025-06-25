import React, { useState } from 'react';
import BackButton from '../../../../../../components/BackButton';

const initialBooks = [
  { id: 1, title: 'Mathematics', author: 'John Smith', isbn: '1234567890', status: 'Available' },
  { id: 2, title: 'Physics', author: 'Jane Doe', isbn: '0987654321', status: 'Issued' },
];

const BookSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const [books] = useState(initialBooks);

  const filteredBooks = books.filter(
    b => b.title.toLowerCase().includes(search.toLowerCase()) ||
         b.author.toLowerCase().includes(search.toLowerCase()) ||
         b.isbn.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton />
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Search</h1>
        <input
          className="w-full p-2 border rounded-lg mb-6"
          placeholder="Search by title, author, or ISBN"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Author</th>
              <th className="p-2 text-left">ISBN</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.title}</td>
                <td className="p-2">{b.author}</td>
                <td className="p-2">{b.isbn}</td>
                <td className="p-2">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookSearch; 