import React from 'react';
import { Calculator, Book, Users, Settings } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const FeeStructureSetup: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Fee Structure Setup</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Fee Types</h3>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">8</p>
            <p className="text-sm text-gray-500 mt-2">Active Categories</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Classes Configured</h3>
              <Book className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">12</p>
            <p className="text-sm text-gray-500 mt-2">Total Classes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Fee Categories</h2>
            <div className="space-y-4">
              {[
                { name: 'Tuition Fee', amount: 5000, frequency: 'Monthly' },
                { name: 'Development Fee', amount: 10000, frequency: 'Annual' },
                { name: 'Library Fee', amount: 2000, frequency: 'Quarterly' },
              ].map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{fee.name}</h3>
                    <p className="text-sm text-gray-500">{fee.frequency}</p>
                  </div>
                  <p className="font-semibold text-blue-600">₹{fee.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Add Fee Category</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter category name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" className="w-full p-2 border rounded-lg" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Annual</option>
                  <option>One-time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Classes</label>
                <select className="w-full p-2 border rounded-lg" multiple>
                  <option>Class I</option>
                  <option>Class II</option>
                  <option>Class III</option>
                  <option>Class IV</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeStructureSetup;