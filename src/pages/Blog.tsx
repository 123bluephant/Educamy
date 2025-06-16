import React from 'react';
import { BookOpen, Calendar, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of AI in Education",
      excerpt: "Exploring how artificial intelligence is transforming the educational landscape and creating personalized learning experiences.",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      category: "Technology"
    },
    {
      title: "Best Practices for Remote Learning",
      excerpt: "Essential strategies and tools for effective remote education in the modern digital classroom.",
      author: "Prof. Michael Chen",
      date: "March 12, 2024",
      category: "Education"
    },
    {
      title: "Parent-Teacher Communication in Digital Age",
      excerpt: "How technology is bridging the gap between parents and teachers for better student outcomes.",
      author: "Emma Williams",
      date: "March 10, 2024",
      category: "Communication"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Educational <span className="text-blue-600">Insights</span>
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Stay updated with the latest trends, insights, and best practices in education technology.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">{post.category}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest educational insights delivered to your inbox.</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;