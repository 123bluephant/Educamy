import React from 'react';
import { LineChart, PieChart, BarChart, TrendingUp, Target } from 'lucide-react';

const Analytics = () => {
  const features = [
    {
      icon: LineChart,
      title: "Performance Tracking",
      description: "Track student performance across subjects and time periods."
    },
    {
      icon: PieChart,
      title: "Attendance Analytics",
      description: "Detailed insights into student and staff attendance patterns."
    },
    {
      icon: BarChart,
      title: "Financial Reports",
      description: "Comprehensive analysis of financial data and trends."
    },
    {
      icon: TrendingUp,
      title: "Growth Metrics",
      description: "Monitor institutional growth and development indicators."
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and monitor educational and administrative goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Performance <span className="text-blue-600">Analytics</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Data-driven insights for better educational outcomes.
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

export default Analytics;