import React from 'react';
import { Smartphone, Cloud, Shield, Zap, RefreshCw } from 'lucide-react';

const MobileAccess = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile App Access",
      description: "Access all features on-the-go with our mobile apps."
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Seamless synchronization across all devices."
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Enterprise-grade security for mobile users."
    },
    {
      icon: Zap,
      title: "Instant Updates",
      description: "Real-time notifications and updates."
    },
    {
      icon: RefreshCw,
      title: "Offline Mode",
      description: "Access key features even without internet."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Mobile <span className="text-blue-600">Access</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Access your educational tools anywhere, anytime.
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

export default MobileAccess;