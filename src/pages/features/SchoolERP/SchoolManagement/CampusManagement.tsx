import React from 'react';
import { Building2, Bus, Library, MessageSquare, Users, Map, BookOpen, Bell, Home, Route, Truck, Book, History, Send } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const CampusManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-6">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Campus Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buildings & Facilities */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Buildings & Facilities</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage campus infrastructure and facilities</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <span className="bg-blue-100 rounded-full p-2 mr-3">
                  <Map className="h-4 w-4 text-blue-600" />
                </span>
                <span>Building Allocation</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="bg-blue-100 rounded-full p-2 mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </span>
                <span>Room Assignment</span>
              </div>
            </div>
          </div>

          {/* Hostel Management */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Home className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Hostel Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage hostel facilities and student allocation</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Room Allocation</span>
                </div>
                <span className="text-blue-600">Manage →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Facility Management</span>
                </div>
                <span className="text-blue-600">View →</span>
              </button>
            </div>
          </div>

          {/* Transport Management */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Bus className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Transport Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage routes and transportation logistics</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Route className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Route Planning</span>
                </div>
                <span className="text-blue-600">Configure →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Vehicle Management</span>
                </div>
                <span className="text-blue-600">Manage →</span>
              </button>
            </div>
          </div>

          {/* Library Management */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Library className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Library Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage books, issuance and records</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Book className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Book Inventory</span>
                </div>
                <span className="text-blue-600">View →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <History className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Issue Records</span>
                </div>
                <span className="text-blue-600">Manage →</span>
              </button>
            </div>
          </div>

          {/* Communication Systems */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Communication</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage school-wide communications</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Bell className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Announcements</span>
                </div>
                <span className="text-blue-600">Create →</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <Send className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Messages</span>
                </div>
                <span className="text-blue-600">Send →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusManagement;