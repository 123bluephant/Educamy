import React from 'react';
import BackButton from '../../../../components/BackButton';

const Notifications: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="mt-16">
        <h1 className="text-3xl font-bold mb-6">Important Notifications</h1>
        <div className="space-y-4">
          {[
            {
              title: 'System Maintenance',
              type: 'urgent',
              message: 'System maintenance scheduled for tonight at 2 AM',
              time: '2 hours ago'
            },
            {
              title: 'Fee Payment Deadline',
              type: 'important',
              message: 'Last date for fee payment is approaching',
              time: '5 hours ago'
            },
            {
              title: 'Parent-Teacher Meeting',
              type: 'general',
              message: 'PTM scheduled for next Saturday',
              time: '1 day ago'
            }
          ].map((notification, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{notification.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${notification.type === 'urgent' ? 'bg-red-100 text-red-800' : notification.type === 'important' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                  {notification.type}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;