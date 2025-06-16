import React from 'react';
import BackButton from '../../../../components/BackButton';

const Events: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="mt-16">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Annual Sports Day',
              date: '2024-02-15',
              time: '9:00 AM',
              location: 'School Ground',
              description: 'Annual sports event with various competitions'
            },
            {
              title: 'Science Exhibition',
              date: '2024-02-20',
              time: '10:00 AM',
              location: 'School Auditorium',
              description: 'Students will showcase their science projects'
            },
            {
              title: 'Cultural Festival',
              date: '2024-03-01',
              time: '5:00 PM',
              location: 'School Amphitheater',
              description: 'Annual cultural celebration with performances'
            }
          ].map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Date:</span> {event.date}</p>
                <p><span className="font-medium">Time:</span> {event.time}</p>
                <p><span className="font-medium">Location:</span> {event.location}</p>
                <p className="text-sm mt-2">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;