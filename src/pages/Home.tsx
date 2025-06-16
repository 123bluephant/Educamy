import React from 'react';
import {
  BookOpen,
  Brain,
  Building2,
  GraduationCap,
  LineChart,
  Users,
  Shield,
  Smartphone,
  CheckCircle
} from 'lucide-react';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-6 pt-20 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Transform Education with
            <span className="text-blue-600"> AI-Powered</span> Learning
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            An all-in-one EdTech platform connecting schools, parents, students, and educators through intelligent solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
              Schedule Demo
            </button>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Comprehensive Education Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-blue-500 rounded-lg p-6">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Educamy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of institutions already using Educamy to revolutionize their educational approach.
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    icon: Building2,
    title: "School ERP System",
    description: "Comprehensive management of attendance, fees, and administrative tasks with automated workflows."
  },
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning paths and instant assessments powered by advanced artificial intelligence."
  },
  {
    icon: Users,
    title: "Parent-School Connect",
    description: "Real-time communication and tracking between parents and schools for better engagement."
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Detailed insights and analytics for data-driven decision making in education."
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Enterprise-grade security and compliance with education data protection regulations."
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Access all features on-the-go with our mobile apps for Android and iOS."
  }
];

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "500+", label: "Partner Schools" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" }
];

const benefits = [
  {
    title: "Streamlined Administration",
    description: "Automate routine tasks and reduce administrative burden with our comprehensive ERP system."
  },
  {
    title: "Enhanced Learning Outcomes",
    description: "AI-powered personalized learning paths ensure better understanding and retention."
  },
  {
    title: "Real-time Communication",
    description: "Keep all stakeholders connected and informed with instant updates and notifications."
  },
  {
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics and performance tracking."
  }
];

export default Home;