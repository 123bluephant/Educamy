import React from 'react';
import { Calendar, Clock, Users, RefreshCw, Settings } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const TimetableManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Timetable Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule Overview */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Schedule Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Active Schedules</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">12</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Weekly Classes</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">180</span>
              </div>
            </div>
          </div>

          {/* Timetable Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Create Schedule
              </button>
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View Timetable
              </button>
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Manage Conflicts
              </button>
              <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Export Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableManagement;