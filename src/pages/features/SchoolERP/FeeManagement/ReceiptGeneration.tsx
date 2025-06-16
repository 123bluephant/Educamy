import React from 'react';
import { Printer, Download, Share2, FileText } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const ReceiptGeneration: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Receipt Generation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated Today</h3>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">45</p>
            <p className="text-sm text-gray-500 mt-2">Receipts</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Downloads</h3>
              <Download className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">32</p>
            <p className="text-sm text-gray-500 mt-2">Today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Receipts</h2>
            <div className="space-y-4">
              {[
                { id: 'RCP001', student: 'John Doe', amount: 5000, date: '2024-02-01' },
                { id: 'RCP002', student: 'Jane Smith', amount: 3500, date: '2024-02-01' },
                { id: 'RCP003', student: 'Mike Johnson', amount: 7500, date: '2024-01-31' },
              ].map((receipt, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{receipt.id}</h3>
                    <p className="text-sm text-gray-500">{receipt.student}</p>
                    <p className="text-sm text-gray-600">{receipt.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">₹{receipt.amount}</span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Download className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Printer className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Generate New Receipt</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter student name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Class</option>
                  <option>Class X-A</option>
                  <option>Class X-B</option>
                  <option>Class X-C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment For</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Fee Type</option>
                  <option>Tuition Fee</option>
                  <option>Development Fee</option>
                  <option>Library Fee</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" className="w-full p-2 border rounded-lg" placeholder="Enter amount" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generate Receipt
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptGeneration;