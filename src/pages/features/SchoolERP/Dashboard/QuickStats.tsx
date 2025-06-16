import React from 'react';
import BackButton from '../../../../components/BackButton';

const QuickStats: React.FC = () => {
  return (
    <div className="relative pt-8">
      <BackButton />
      <div className="p-12">
        <h1 className="text-3xl font-bold mb-12">Quick Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Students</h2>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Staff</h2>
            <p className="text-3xl font-bold text-blue-600">89</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Active Courses</h2>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;