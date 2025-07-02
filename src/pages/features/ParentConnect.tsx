import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, BarChart2, Bell, Users, Calendar, BookOpen, 
  Video, Shield, Download, Upload, Eye, CheckSquare 
} from 'lucide-react';

const ParentConnect: React.FC = () => {
  // State for active user role
  const [activeRole, setActiveRole] = useState<'parent' | 'teacher' | 'admin'>('parent');

  // Sample notification data
  const notifications = [
    { id: 1, title: 'New assignment posted', priority: 'medium', read: false },
    { id: 2, title: 'Upcoming parent-teacher meeting', priority: 'high', read: false },
    { id: 3, title: 'School holiday announcement', priority: 'low', read: true },
  ];

  // Sample upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Science Fair', date: '2023-07-15', rsvp: false },
    { id: 2, title: 'Parent-Teacher Conference', date: '2023-07-20', rsvp: true },
    { id: 3, title: 'Sports Day', date: '2023-07-25', rsvp: false },
  ];

  // Sample homework assignments
  const homeworkAssignments = [
    { id: 1, subject: 'Mathematics', title: 'Algebra Equations', dueDate: '2023-07-10', submitted: true },
    { id: 2, subject: 'Science', title: 'Ecosystem Project', dueDate: '2023-07-15', submitted: false },
    { id: 3, subject: 'English', title: 'Book Report', dueDate: '2023-07-18', submitted: false },
  ];

  // Feature modules configuration
  const featureModules = [
    {
      id: 'communication',
      title: 'Direct Communication',
      description: 'Real-time messaging between parents and teachers.',
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      features: ['E2E encrypted 1:1/group messaging', 'File sharing (PDF/images)', 'Read receipts']
    },
    {
      id: 'progress',
      title: 'Progress Tracking',
      description: 'Monitor student performance and attendance.',
      icon: <BarChart2 className="h-8 w-8 text-green-600" />,
      features: ['Live gradebook + attendance heatmaps', 'Assignment submission tracker', 'Skill-based analytics']
    },
    {
      id: 'notifications',
      title: 'Instant Notifications',
      description: 'Important updates and announcements delivered instantly.',
      icon: <Bell className="h-8 w-8 text-purple-600" />,
      features: ['Customizable alerts (SMS/email/push)', 'Urgency tiers', 'Scheduled reminders']
    },
    {
      id: 'community',
      title: 'Parent Community',
      description: 'Connect with other parents and share experiences.',
      icon: <Users className="h-8 w-8 text-orange-600" />,
      features: ['Class-specific forums', 'Resource sharing hub', 'Anonymous posting gate']
    },
    {
      id: 'calendar',
      title: 'Event Calendar',
      description: 'Stay updated with school events and activities.',
      icon: <Calendar className="h-8 w-8 text-red-600" />,
      features: ['RSVP system', 'Auto-reminders', 'Google/iCal sync']
    },
    {
      id: 'homework',
      title: 'Homework Manager',
      description: 'Track assignments, deadlines, and submission status.',
      icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
      features: ['Deadline tracker', 'Submission status', 'Teacher feedback section']
    },
    {
      id: 'meetings',
      title: 'Meeting Scheduler',
      description: 'Schedule and manage parent-teacher conferences.',
      icon: <Video className="h-8 w-8 text-teal-600" />,
      features: ['Teacher availability slots', 'Video conference integration', 'Auto-reminders']
    },
  ];

  return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-gray-800">Parent-School</span> <span className="text-blue-600">Connect</span>
          </h1>
          
          {/* Role Switcher (for demo purposes) */}
          <div className="bg-white rounded-lg shadow-sm p-1 flex">
            <button 
              className={`px-4 py-2 rounded-md ${activeRole === 'parent' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveRole('parent')}
            >
              Parent
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeRole === 'teacher' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveRole('teacher')}
            >
              Teacher
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeRole === 'admin' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveRole('admin')}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">Bridging the gap between parents and schools for better student outcomes.</p>
        </div>

        {/* Feature Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featureModules.map(module => (
            <div key={module.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {module.id === 'communication' ? (
                <Link to="/features/parent-connect/communication" className="block">
                  <div className="flex items-center mb-4">
                    {module.icon}
                    <h3 className="text-lg font-semibold ml-3">{module.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              ) : module.id === 'progress' ? (
                <Link to="/features/parent-connect/progress-tracking" className="block">
                  <div className="flex items-center mb-4">
                    {module.icon}
                    <h3 className="text-lg font-semibold ml-3">{module.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    {module.icon}
                    <h3 className="text-lg font-semibold ml-3">{module.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckSquare className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Quick Access Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Notifications</h3>
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div key={notification.id} className={`p-3 rounded-lg border ${!notification.read ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {notification.priority === 'high' && <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>}
                      {notification.priority === 'medium' && <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>}
                      {notification.priority === 'low' && <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>}
                      <p className={`text-sm ${!notification.read ? 'font-medium' : 'text-gray-600'}`}>{notification.title}</p>
                    </div>
                    {!notification.read && <Eye className="h-4 w-4 text-gray-400" />}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 text-center">
              View All Notifications
            </button>
          </div>

          {/* Calendar Events Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Calendar className="h-5 w-5 text-red-600" />
            </div>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-sm">{event.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                    <button className={`text-xs px-2 py-1 rounded ${event.rsvp ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {event.rsvp ? 'Going' : 'RSVP'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 text-center">
              View Full Calendar
            </button>
          </div>

          {/* Homework Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Homework Assignments</h3>
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="space-y-3">
              {homeworkAssignments.map(assignment => (
                <div key={assignment.id} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{assignment.title}</p>
                      <p className="text-xs text-gray-500">{assignment.subject}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${assignment.submitted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {assignment.submitted ? 'Submitted' : 'Pending'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 text-center">
              View All Assignments
            </button>
          </div>
        </div>

        {/* Technical Compliance Notice */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-sm text-gray-600">
              This platform is fully compliant with FERPA and GDPR regulations, ensuring the privacy and security of all student and parent data.
            </p>
          </div>
        </div>
      </div>
  );
};

export default ParentConnect;