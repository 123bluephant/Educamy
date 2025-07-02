import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white relative z-50">
      {/* Top bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">support@educamy.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">+91 123 456 7890</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signup" className="bg-green-500 text-white px-4 py-1 rounded text-sm hover:bg-green-600 transition-colors">
              GET STARTED FOR FREE
            </Link>
            <Link to="/login" className="bg-white text-gray-700 px-4 py-1 rounded text-sm border border-gray-300 hover:bg-gray-50 transition-colors">
              LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Educamy</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">HOME</Link>
            <div className="relative" ref={dropdownRef}>
              <button 
                className={`text-gray-600 hover:text-blue-600 flex items-center transition-colors ${isDropdownOpen ? 'text-blue-600' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                FEATURES
                <svg 
                  className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 ease-out">
                  <Link 
                    to="/features/school-erp" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    School ERP
                  </Link>
                  <Link 
                    to="/features/parent-connect" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Parent-School Connect
                  </Link>
                  <Link 
                    to="/features/analytics" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Performance Analytics
                  </Link>
                  <Link 
                    to="/features/learning" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Learning and Development
                  </Link>
                  <Link 
                    to="/features/mobile-access" 
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Mobile Access
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">ABOUT US</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">CONTACT US</Link>
            <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">BLOG</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">T&C</Link>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Schedule Demo
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;