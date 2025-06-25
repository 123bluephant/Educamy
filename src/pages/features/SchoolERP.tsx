import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Calendar, CreditCard, FileText, ChevronRight, LayoutDashboard } from 'lucide-react';

// Update the SectionId type to include dashboard
type SectionId = 'dashboard' | 'school' | 'staff' | 'fee' | 'report' | 'attendance';

// Define the structure of a content section
type ContentSection = {
  title: string;
  description: string;
  features: string[];
};

// Define the structure of the content data
type ContentData = Record<SectionId, ContentSection>;

const SchoolERP: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');

  const sidebarItems = [
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'school' as const, icon: Building2, label: 'School Management' },
    { id: 'staff' as const, icon: Users, label: 'Staff Management' },
    { id: 'fee' as const, icon: CreditCard, label: 'Fee Management' },
    { id: 'report' as const, icon: FileText, label: 'Report Management' },
    { id: 'attendance' as const, icon: Calendar, label: 'Attendance Management' }
  ];

  const contentData: ContentData = {
    dashboard: {
      title: 'Dashboard Overview',
      description: 'Get a comprehensive view of your school management system.',
      features: [
        'Quick Statistics',
        'Recent Activities',
        'Important Notifications',
        'Upcoming Events',
      ]
    },
    school: {
      title: 'School Management',
      description: 'Streamline your school operations with our comprehensive management tools.',
      features: [
        'Campus Management',
        'Class & Section Management',
        'Subject Management',
        'Timetable Management',
        'Resource Allocation'
      ]
    },
    staff: {
      title: 'Staff Management',
      description: 'Efficiently manage your teaching and non-teaching staff.',
      features: [
        'Staff Recruitment',
        'Performance Evaluation',
        'Leave Management',
        'Payroll System',
        'Professional Development'
      ]
    },
    fee: {
      title: 'Fee Management',
      description: 'Simplify fee collection and management processes.',
      features: [
        'Fee Structure Setup',
        'Online Payment Gateway',
        'Payment Tracking',
        'Receipt Generation',
        'Due Management'
      ]
    },
    report: {
      title: 'Report Management',
      description: 'Generate and analyze comprehensive reports.',
      features: [
        'Academic Reports',
        'Financial Reports',
        'Attendance Reports',
        'Performance Analytics',
        'Custom Report Generation'
      ]
    },
    attendance: {
      title: 'Attendance Management',
      description: 'Track and manage attendance efficiently.',
      features: [
        'Digital Attendance',
        'Leave Management',
        'Attendance Analytics',
        'Parent Notifications',
        'Monthly Reports'
      ]
    }
  };

  const getFeatureLink = (feature: string, section: SectionId): string => {
    // Dashboard links
    if (section === 'dashboard') {
      switch (feature) {
        case 'Quick Statistics': return '/dashboard/quick-stats';
        case 'Recent Activities': return '/dashboard/recent-activities';
        case 'Important Notifications': return '/dashboard/notifications';
        case 'Upcoming Events': return '/dashboard/events';
        case 'System Status': return '/dashboard/system-status';
      }
    }

    // Attendance Management links
    if (section === 'attendance') {
      switch (feature) {
        case 'Digital Attendance': return '/features/school-erp/attendance/digital';
        case 'Leave Management': return '/features/school-erp/attendance/leave';
        case 'Attendance Analytics': return '/features/school-erp/attendance/analytics';
        case 'Parent Notifications': return '/features/school-erp/attendance/notifications';
        case 'Monthly Reports': return '/features/school-erp/attendance/reports';
      }
    }

    // School Management links
    if (section === 'school') {
      switch (feature) {
        case 'Campus Management': return '/features/school-erp/school/campus-management';
        case 'Class & Section Management': return '/features/school-erp/school/class-management';
        case 'Subject Management': return '/features/school-erp/school/subject-management';
        case 'Timetable Management': return '/features/school-erp/school/timetable-management';
        case 'Resource Allocation': return '/features/school-erp/school/resource-allocation';
      }
    }

    // Report Management links
    if (section === 'report') {
      switch (feature) {
        case 'Academic Reports': return '/features/school-erp/reports/academic';
        case 'Financial Reports': return '/features/school-erp/reports/financial';
        case 'Attendance Reports': return '/features/school-erp/reports/attendance';
        case 'Performance Analytics': return '/features/school-erp/reports/performance';
        case 'Custom Report Generation': return '/features/school-erp/reports/custom';
      }
    }

    // Default section-based paths
    return `/features/school-erp/${section}/${feature.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            School <span className="text-blue-200">ERP</span> System
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-3xl mx-auto">
            Comprehensive school management solution for modern educational institutions.
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-4 transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight className="h-5 w-5 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {contentData[activeSection].title}
                </h2>
                <p className="text-gray-600 text-lg">
                  {contentData[activeSection].description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {contentData[activeSection].features.map((feature, index: number) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        {Number(index) + 1}
                      </div>
                      <h3 className="font-semibold text-gray-900">{feature}</h3>
                    </div>
                    <Link
                      to={getFeatureLink(feature, activeSection)}
                      className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolERP;