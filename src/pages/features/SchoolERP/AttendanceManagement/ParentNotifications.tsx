import React from 'react';
import { Bell, Mail, MessageSquare, Settings } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const ParentNotifications: React.FC = () => {
  return (
     <div className="relative min-h-screen p-8">
      <BackButton />
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Parent Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">SMS Sent</h3>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">124</p>
          <p className="text-sm text-gray-500 mt-2">Today</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Emails Sent</h3>
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">89</p>
          <p className="text-sm text-gray-500 mt-2">Today</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">App Notifications</h3>
            <Bell className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">256</p>
          <p className="text-sm text-gray-500 mt-2">Today</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Delivery Rate</h3>
            <Settings className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">98%</p>
          <p className="text-sm text-gray-500 mt-2">Success Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Absence Alerts</h3>
                <p className="text-sm text-gray-500">Send alerts when student is marked absent</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Late Arrival Notifications</h3>
                <p className="text-sm text-gray-500">Notify when student arrives late</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">Weekly Report</h3>
                <p className="text-sm text-gray-500">Send weekly attendance summary</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Send Custom Notification</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
              <select className="w-full p-2 border rounded-lg">
                <option>All Classes</option>
                <option>X-A</option>
                <option>X-B</option>
                <option>X-C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
              <select className="w-full p-2 border rounded-lg">
                <option>SMS</option>
                <option>Email</option>
                <option>App Notification</option>
                <option>All Channels</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Send Notification
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParentNotifications;