import React, { useState } from 'react';
import { Building2, Bus, Library, MessageSquare, Users, Map, BookOpen, Bell, Home, Route, Truck, Book, History, Send, Wrench, ClipboardList, UserPlus, AlertCircle, Calendar, FileText, Key, BarChart2, Layers, CheckCircle, ArrowRightCircle, CreditCard, Search } from 'lucide-react';
import BackButton from '../../../../components/BackButton';
import { Link } from 'react-router-dom';

const CampusManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  // Dummy stats for visual enhancement
  const stats = {
    buildings: 8,
    availableRooms: 32,
    maintenanceRequests: 3,
    hostels: 4,
    hostelOccupancy: '85%',
    vehicles: 12,
    routes: 7,
    books: 4200,
    issuedBooks: 320,
    overdueBooks: 18,
    announcements: 2,
    messages: 5,
  };

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
            <div className="flex space-x-6 mb-4">
              <div className="flex flex-col items-center">
                <Layers className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Buildings</span>
                <span className="font-bold text-blue-600">{stats.buildings}</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Available Rooms</span>
                <span className="font-bold text-blue-600">{stats.availableRooms}</span>
              </div>
              <div className="flex flex-col items-center">
                <Wrench className="h-5 w-5 text-yellow-500" />
                <span className="text-xs text-gray-500">Maintenance</span>
                <span className="font-bold text-yellow-600">{stats.maintenanceRequests}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/features/school-erp/school/building-allocation" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Allocate buildings to classes or departments">
                  <div className="flex items-center">
                    <Map className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Building Allocation</span>
                  </div>
                  <span className="text-blue-600">Assign →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/room-assignment" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Assign rooms to students or staff">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Room Assignment</span>
                  </div>
                  <span className="text-blue-600">Assign →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/maintenance-requests" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors" title="View and manage maintenance requests">
                  <div className="flex items-center">
                    <Wrench className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>Maintenance Requests</span>
                  </div>
                  <span className="text-yellow-600">View →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/facility-booking" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Book facilities like labs or halls">
                  <div className="flex items-center">
                    <Key className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Facility Booking</span>
                  </div>
                  <span className="text-blue-600">Book →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/asset-tracking" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Track campus assets">
                  <div className="flex items-center">
                    <ClipboardList className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Asset Tracking</span>
                  </div>
                  <span className="text-blue-600">Track →</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Hostel Management */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Home className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Hostel Management</h2>
            </div>
            <div className="flex space-x-6 mb-4">
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Hostels</span>
                <span className="font-bold text-blue-600">{stats.hostels}</span>
              </div>
              <div className="flex flex-col items-center">
                <BarChart2 className="h-5 w-5 text-green-500" />
                <span className="text-xs text-gray-500">Occupancy</span>
                <span className="font-bold text-green-600">{stats.hostelOccupancy}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/features/school-erp/school/hostel/student-allocation" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Allocate rooms to students">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Student Allocation</span>
                  </div>
                  <span className="text-blue-600">Allocate →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/hostel/visitor-logs" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Log and view hostel visitors">
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Visitor Log</span>
                  </div>
                  <span className="text-blue-600">View →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/hostel/hostel-fee-management" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Manage hostel fees">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Hostel Fee Management</span>
                  </div>
                  <span className="text-blue-600">Manage →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/hostel/room-change-request" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Handle room change requests">
                  <div className="flex items-center">
                    <ArrowRightCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Room Change Requests</span>
                  </div>
                  <span className="text-blue-600">Handle →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/hostel/facility-management" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Manage hostel facilities">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Facility Management</span>
                  </div>
                  <span className="text-blue-600">View →</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Transport Management */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Bus className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Transport Management</h2>
            </div>
            <div className="flex space-x-6 mb-4">
              <div className="flex flex-col items-center">
                <Truck className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Vehicles</span>
                <span className="font-bold text-blue-600">{stats.vehicles}</span>
              </div>
              <div className="flex flex-col items-center">
                <Route className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Routes</span>
                <span className="font-bold text-blue-600">{stats.routes}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/features/school-erp/school/transport/route-planning" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Plan and optimize routes">
                  <div className="flex items-center">
                    <Route className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Route Planning</span>
                  </div>
                  <span className="text-blue-600">Configure →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/transport/vehical-management" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Manage vehicles and drivers">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Vehical Management</span>
                  </div>
                  <span className="text-blue-600">Manage →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/transport/driver-assignment" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Assign drivers to vehicles">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Driver Assignment</span>
                  </div>
                  <span className="text-blue-600">Assign →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/transport/vehical-tracking" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Track buses and vehicles in real time">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Vehical Tracking</span>
                  </div>
                  <span className="text-blue-600">Track →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/transport/transport-fee-management" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Manage transport fees">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Transport Fee Management</span>
                  </div>
                  <span className="text-blue-600">Manage →</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Library Management */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Library className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Library Management</h2>
            </div>
            <div className="flex space-x-6 mb-4">
              <div className="flex flex-col items-center">
                <Book className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Books</span>
                <span className="font-bold text-blue-600">{stats.books}</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-xs text-gray-500">Issued</span>
                <span className="font-bold text-green-600">{stats.issuedBooks}</span>
              </div>
              <div className="flex flex-col items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-xs text-gray-500">Overdue</span>
                <span className="font-bold text-red-600">{stats.overdueBooks}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/features/school-erp/school/library/book-inventory" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="View and manage book inventory">
                  <div className="flex items-center">
                    <Book className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Book Inventory</span>
                  </div>
                  <span className="text-blue-600">View →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/library/book-search" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Search for books in the library">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Book Search</span>
                  </div>
                  <span className="text-blue-600">Search →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/library/book-reservation" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Reserve books online">
                  <div className="flex items-center">
                    <ClipboardList className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Book Reservation</span>
                  </div>
                  <span className="text-blue-600">Reserve →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/library/digital-library" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Access digital library resources">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Digital Library</span>
                  </div>
                  <span className="text-blue-600">Access →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/library/issues-record" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Manage book issue records">
                  <div className="flex items-center">
                    <History className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Issues Record</span>
                  </div>
                  <span className="text-blue-600">Manage →</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Communication Systems */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-semibold ml-3">Communication</h2>
            </div>
            <div className="flex space-x-6 mb-4">
              <div className="flex flex-col items-center">
                <Bell className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Announcements</span>
                <span className="font-bold text-blue-600">{stats.announcements}</span>
              </div>
              <div className="flex flex-col items-center">
                <Send className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-gray-500">Messages</span>
                <span className="font-bold text-blue-600">{stats.messages}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Link to="/features/school-erp/school/communication/announcements" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Create new announcements">
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Announcements</span>
                  </div>
                  <span className="text-blue-600">Create →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/communication/messages" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Send messages to staff, students, or parents">
                  <div className="flex items-center">
                    <Send className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Messages</span>
                  </div>
                  <span className="text-blue-600">Send →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/communication/event-calendar" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="View and manage event calendar">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Event Calendar</span>
                  </div>
                  <span className="text-blue-600">View →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/communication/emergency-alerts" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Send emergency alerts">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                    <span>Emergency Alerts</span>
                  </div>
                  <span className="text-red-600">Send →</span>
                </button>
              </Link>
              <Link to="/features/school-erp/school/communication/feedback-surveys" className="w-full block">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors" title="Create and manage feedback or surveys">
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Feedback & Surveys</span>
                  </div>
                  <span className="text-blue-600">Create →</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusManagement;