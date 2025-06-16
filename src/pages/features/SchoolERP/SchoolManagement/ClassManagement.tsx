import React from 'react';
import { Users, BookOpen, ClipboardList } from 'lucide-react';
import BackButton  from '../../../../components/BackButton';

const ClassManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Class & Section Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Class Configuration</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Total Classes</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">12</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Active Sections</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">36</span>
              </div>
            </div>
          </div>
          {/* Add more management sections */}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;