import React from 'react';
import BackButton from '../../../../components/BackButton';

const RecentActivities: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="mt-16">
        <h1 className="text-3xl font-bold mb-6">Recent Activities</h1>
        <div className="space-y-4">
          {[
            { title: 'New Student Registration', time: '2 hours ago' },
            { title: 'Fee Payment Received', time: '3 hours ago' },
            { title: 'Staff Meeting Scheduled', time: '5 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;