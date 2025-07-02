import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Blog from './pages/Blog';
import Terms from './pages/Terms';

// Auth pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Feature pages
import SchoolERP from './pages/features/SchoolERP';
import ParentConnect from './pages/features/ParentConnect';
import Analytics from './pages/features/Analytics';
import Learning from './pages/features/Learning';
import MobileAccess from './pages/features/MobileAccess';

// Dashboard features
import QuickStats from './pages/features/SchoolERP/Dashboard/QuickStats';
import RecentActivities from './pages/features/SchoolERP/Dashboard/RecentActivities';
import Notifications from './pages/features/SchoolERP/Dashboard/Notifications';
import Events from './pages/features/SchoolERP/Dashboard/Events';

// School Management
import CampusManagement from './pages/features/SchoolERP/SchoolManagement/CampusManagement';
import ClassManagement from './pages/features/SchoolERP/SchoolManagement/ClassManagement';
import SubjectManagement from './pages/features/SchoolERP/SchoolManagement/SubjectManagement';
import TimetableManagement from './pages/features/SchoolERP/SchoolManagement/TimetableManagement';
import ResourceAllocation from './pages/features/SchoolERP/SchoolManagement/ResourceAllocation';

// Attendance Management features
import DigitalAttendance from './pages/features/SchoolERP/AttendanceManagement/DigitalAttendance';
import MonthlyReports from './pages/features/SchoolERP/AttendanceManagement/MonthlyReports';
import LeaveManagement from './pages/features/SchoolERP/AttendanceManagement/LeaveManagement';
import AttendanceAnalytics from './pages/features/SchoolERP/AttendanceManagement/AttendanceAnalytics';
import ParentNotifications from './pages/features/SchoolERP/AttendanceManagement/ParentNotifications';

// Staff Management features
import ProfessionalDevelopment from './pages/features/SchoolERP/StaffManagement/ProfessionalDevelopment';
import StaffRecruitment from './pages/features/SchoolERP/StaffManagement/StaffRecruitment';
import PayrollSystem from './pages/features/SchoolERP/StaffManagement/PayrollSystem';
import PerformanceEvaluation from './pages/features/SchoolERP/StaffManagement/PerformanceEvaluation';
import StaffLeaveManagement from './pages/features/SchoolERP/StaffManagement/LeaveManagement';

// Fee Management
import FeeStructureSetup from './pages/features/SchoolERP/FeeManagement/FeeStructureSetup';
import OnlinePaymentGateway from './pages/features/SchoolERP/FeeManagement/OnlinePaymentGateway';
import PaymentTracking from './pages/features/SchoolERP/FeeManagement/PaymentTracking';
import ReceiptGeneration from './pages/features/SchoolERP/FeeManagement/ReceiptGeneration';
import DueManagement from './pages/features/SchoolERP/FeeManagement/DueManagement';

// Report Management features
import AcademicDetails from './pages/features/SchoolERP/ReportManagement/AcademicDetails';
import FinancialDetails from './pages/features/SchoolERP/ReportManagement/FinancialDetails';
import AttendenceDetails from './pages/features/SchoolERP/ReportManagement/AttendenceDetails';
import PerformanceDetails from './pages/features/SchoolERP/ReportManagement/PerformanceDeatails';
import CustomReports from './pages/features/SchoolERP/ReportManagement/CustomReports';

// Buildings Management(Campus/SchoolManagement)
import BuildingAllocation from './pages/features/SchoolERP/SchoolManagement/Campus/Buildings/BuildingAllocation';
import RoomAssignment from './pages/features/SchoolERP/SchoolManagement/Campus/Buildings/RoomAssignment';
import MaintenanceRequests from './pages/features/SchoolERP/SchoolManagement/Campus/Buildings/MaintenanceRequests';
import FacilityBooking from './pages/features/SchoolERP/SchoolManagement/Campus/Buildings/FacilityBooking';
import AssetTracking from './pages/features/SchoolERP/SchoolManagement/Campus/Buildings/AssetTracking';

// Hostel Management(Campus/SchoolManagement)
import StudentAllocation from './pages/features/SchoolERP/SchoolManagement/Campus/Hostel/StudentAllocation';
import VisitorLogs from './pages/features/SchoolERP/SchoolManagement/Campus/Hostel/VisitorLogs';
import HostelFeeManagement from './pages/features/SchoolERP/SchoolManagement/Campus/Hostel/HostelFeeManagement';
import RoomChangeRequest from './pages/features/SchoolERP/SchoolManagement/Campus/Hostel/RoomChangeRequest';
import FacilityManagement from './pages/features/SchoolERP/SchoolManagement/Campus/Hostel/FacilityManagement';

// Transport Management
import RoutePlanning from './pages/features/SchoolERP/SchoolManagement/Campus/Transport/RoutePlanning';
import VehicalManagement from './pages/features/SchoolERP/SchoolManagement/Campus/Transport/VehicalManagement';
import DriverAssignment from './pages/features/SchoolERP/SchoolManagement/Campus/Transport/DriverAssignment';
import VehicalTracking from './pages/features/SchoolERP/SchoolManagement/Campus/Transport/VehicalTracking';
import TransportFeeManagement from './pages/features/SchoolERP/SchoolManagement/Campus/Transport/TransportFeeManagement';

// Library Management
import BookInventory from './pages/features/SchoolERP/SchoolManagement/Campus/Library/BookInventory';
import BookSearch from './pages/features/SchoolERP/SchoolManagement/Campus/Library/BookSearch';
import BookReservation from './pages/features/SchoolERP/SchoolManagement/Campus/Library/BookReservation';
import DigitalLibrary from './pages/features/SchoolERP/SchoolManagement/Campus/Library/DigitalLibrary';
import IssuesRecord from './pages/features/SchoolERP/SchoolManagement/Campus/Library/IssuesRecord';

// Communication features
import Announcements from './pages/features/SchoolERP/SchoolManagement/Campus/Communication/Announcements';
import Messages from './pages/features/SchoolERP/SchoolManagement/Campus/Communication/Messages';
import EventCalendar from './pages/features/SchoolERP/SchoolManagement/Campus/Communication/EventCalendar';
import EmergencyAlerts from './pages/features/SchoolERP/SchoolManagement/Campus/Communication/EmergencyAlerts';
import FeedbackSurveys from './pages/features/SchoolERP/SchoolManagement/Campus/Communication/FeedbackSurveys';


// Parent Connect System
import DirectCommunication from './pages/features/ParentConnect/DirectCommunication';
import PCProgressTracking from './pages/features/ParentConnect/PCProgressTracking';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Feature Routes */}
          <Route path="/features/school-erp" element={<SchoolERP />} />
          <Route path="/features/parent-connect" element={<ParentConnect />} />
          <Route path="/features/analytics" element={<Analytics />} />
          <Route path="/features/learning" element={<Learning />} />
          <Route path="/features/mobile-access" element={<MobileAccess />} />

          {/* Dashboard */}
          <Route path="/dashboard/quick-stats" element={<QuickStats />} />
          <Route path="/dashboard/recent-activities" element={<RecentActivities />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/events" element={<Events />} />

          {/* School Management */}
          <Route path="/features/school-erp/school/campus-management" element={<CampusManagement />} />
          <Route path="/features/school-erp/school/class-management" element={<ClassManagement />} />
          <Route path="/features/school-erp/school/subject-management" element={<SubjectManagement />} />
          <Route path="/features/school-erp/school/timetable-management" element={<TimetableManagement />} />
          <Route path="/features/school-erp/school/resource-allocation" element={<ResourceAllocation />} />
          {/* Buildings Management */}
          <Route path="/features/school-erp/school/building-allocation" element={<BuildingAllocation />} />
          <Route path="/features/school-erp/school/room-assignment" element={<RoomAssignment />} />
          <Route path="/features/school-erp/school/maintenance-requests" element={<MaintenanceRequests />} />
          <Route path="/features/school-erp/school/facility-booking" element={<FacilityBooking />} />
          <Route path="/features/school-erp/school/asset-tracking" element={<AssetTracking />} />
          {/* Hostel Management */}
          <Route path="/features/school-erp/school/hostel/student-allocation" element={<StudentAllocation />} />
          <Route path="/features/school-erp/school/hostel/visitor-logs" element={<VisitorLogs />} />
          <Route path="/features/school-erp/school/hostel/hostel-fee-management" element={<HostelFeeManagement />} />
          <Route path="/features/school-erp/school/hostel/room-change-request" element={<RoomChangeRequest />} />
          <Route path="/features/school-erp/school/hostel/facility-management" element={<FacilityManagement />} />
          {/* Transport Management */}
          <Route path="/features/school-erp/school/transport/route-planning" element={<RoutePlanning />} />
          <Route path="/features/school-erp/school/transport/vehical-management" element={<VehicalManagement />} />
          <Route path="/features/school-erp/school/transport/driver-assignment" element={<DriverAssignment />} />
          <Route path="/features/school-erp/school/transport/vehical-tracking" element={<VehicalTracking />} />
          <Route path="/features/school-erp/school/transport/transport-fee-management" element={<TransportFeeManagement />} />
          {/* Library Management */}
          <Route path="/features/school-erp/school/library/book-inventory" element={<BookInventory />} />
          <Route path="/features/school-erp/school/library/book-search" element={<BookSearch />} />
          <Route path="/features/school-erp/school/library/book-reservation" element={<BookReservation />} />
          <Route path="/features/school-erp/school/library/digital-library" element={<DigitalLibrary />} />
          <Route path="/features/school-erp/school/library/issues-record" element={<IssuesRecord />} />
          {/* Communication features */}
          <Route path="/features/school-erp/school/communication/announcements" element={<Announcements />} />
          <Route path="/features/school-erp/school/communication/messages" element={<Messages />} />
          <Route path="/features/school-erp/school/communication/event-calendar" element={<EventCalendar />} />
          <Route path="/features/school-erp/school/communication/emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="/features/school-erp/school/communication/feedback-surveys" element={<FeedbackSurveys />} />

          {/* Attendance Management Routes */}
          <Route path="/features/school-erp/attendance/digital" element={<DigitalAttendance />} />
          <Route path="/features/school-erp/attendance/reports" element={<MonthlyReports />} />
          <Route path="/features/school-erp/attendance/leave" element={<LeaveManagement />} />
          <Route path="/features/school-erp/attendance/analytics" element={<AttendanceAnalytics />} />
          <Route path="/features/school-erp/attendance/notifications" element={<ParentNotifications />} />

          {/* Staff Management Routes */}
          <Route path="/features/school-erp/staff/professional-development" element={<ProfessionalDevelopment />} />
          <Route path="/features/school-erp/staff/staff-recruitment" element={<StaffRecruitment />} />
          <Route path="/features/school-erp/staff/performance-evaluation" element={<PerformanceEvaluation />} />
          <Route path="/features/school-erp/staff/payroll-system" element={<PayrollSystem />} />
          <Route path="/features/school-erp/staff/leave-management" element={<LeaveManagement />} />

          {/* Fee Management Routes */}
          <Route path="/features/school-erp/fee/fee-structure-setup" element={<FeeStructureSetup />} />
          <Route path="/features/school-erp/fee/online-payment-gateway" element={<OnlinePaymentGateway />} />
          <Route path="/features/school-erp/fee/payment-tracking" element={<PaymentTracking />} />
          <Route path="/features/school-erp/fee/receipt-generation" element={<ReceiptGeneration />} />
          <Route path="/features/school-erp/fee/due-management" element={<DueManagement />} />

          {/* Report Management */}
          <Route path="/features/school-erp/reports/academic" element={<AcademicDetails />} />
          <Route path="/features/school-erp/reports/financial" element={<FinancialDetails />} />
          <Route path="/features/school-erp/reports/attendance" element={<AttendenceDetails />} />
          <Route path="/features/school-erp/reports/performance" element={<PerformanceDetails />} />
          <Route path="/features/school-erp/reports/custom" element={<CustomReports />} />


          {/* Parent Connect System */}
          <Route path="/features/parent-connect/communication" element={<DirectCommunication />} />
          <Route path="/features/parent-connect/progress-tracking" element={<PCProgressTracking />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
