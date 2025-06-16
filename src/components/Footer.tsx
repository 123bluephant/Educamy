import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Educamy</span>
            </div>
            <p className="text-gray-400">
              Transforming education through technology and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Features</a></li>
              <li><a href="#" className="hover:text-blue-400">Solutions</a></li>
              <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400">Updates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms</a></li>
              <li><a href="#" className="hover:text-blue-400">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2025 Educamy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;