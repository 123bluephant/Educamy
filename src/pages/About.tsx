import React from 'react';
import { BookOpen, Brain, Target, Users, Laptop, Rocket } from 'lucide-react';
import aboutImage from '../img/school.avif';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Transforming Education for the <span className="text-orange-500">Digital Age</span>
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Educamy is revolutionizing the education ecosystem through innovative technology solutions.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src={aboutImage} 
                alt="Education Innovation" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                The education sector is undergoing rapid digital transformation, requiring innovative solutions that bridge the gap between schools, parents, students, and coaching institutes. Our EdTech application is designed to serve as an all-in-one platform that streamlines school operations, enhances parental engagement, and provides AI-powered learning tools for students.
              </p>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-gray-700">Empowering educational institutions worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-600">
              Comprehensive tools and features designed to enhance the learning experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Smart Operations</h3>
              <p className="text-gray-600">
                Automated workflows and digital processes for efficient management
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">AI Learning</h3>
              <p className="text-gray-600">
                Personalized learning paths and intelligent content recommendations
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Real-time Tracking</h3>
              <p className="text-gray-600">
                Continuous monitoring of student progress and performance analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Digital Transformation</h3>
              <p className="text-gray-600">
                Revolutionizing traditional education through innovative technology solutions
              </p>
            </div>
            <div className="p-6">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Personalized learning experiences enhanced by artificial intelligence
              </p>
            </div>
            <div className="p-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Stakeholder Connection</h3>
              <p className="text-gray-600">
                Seamless integration between schools, parents, and students
              </p>
            </div>
            <div className="p-6">
              <Laptop className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Operations</h3>
              <p className="text-gray-600">
                Automated workflows for efficient educational management
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;