import React from 'react';
import { Brain, BookOpen, Video, Award, Users } from 'lucide-react';

const Learning = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to each student's needs."
    },
    {
      icon: BookOpen,
      title: "Digital Library",
      description: "Extensive collection of educational resources and materials."
    },
    {
      icon: Video,
      title: "Interactive Content",
      description: "Engaging multimedia content for enhanced learning."
    },
    {
      icon: Award,
      title: "Skill Assessment",
      description: "Regular evaluation of student progress and skills."
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Tools for group projects and peer learning."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Learning & <span className="text-blue-600">Development</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Advanced learning tools for modern education.
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

export default Learning;