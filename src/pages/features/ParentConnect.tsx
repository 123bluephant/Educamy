import React from 'react';
import { MessageSquare, Bell, Calendar, BarChart, Users } from 'lucide-react';

const ParentConnect = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Real-time messaging between parents and teachers."
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Important updates and announcements delivered instantly."
    },
    {
      icon: Calendar,
      title: "Event Calendar",
      description: "Stay updated with school events and activities."
    },
    {
      icon: BarChart,
      title: "Progress Tracking",
      description: "Monitor student performance and attendance."
    },
    {
      icon: Users,
      title: "Parent Community",
      description: "Connect with other parents and share experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Parent-School <span className="text-blue-600">Connect</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Bridging the gap between parents and schools for better student outcomes.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentConnect;