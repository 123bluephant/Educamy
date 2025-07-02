import React from 'react';
import { BarChart2, CalendarCheck2, ClipboardList, TrendingUp, UserCheck, BookOpen } from 'lucide-react';

const sampleGrades = [
  { subject: 'Math', grade: 88 },
  { subject: 'Science', grade: 92 },
  { subject: 'English', grade: 85 },
  { subject: 'History', grade: 90 },
];

const sampleAttendance = [
  { date: '2023-07-01', present: true },
  { date: '2023-07-02', present: false },
  { date: '2023-07-03', present: true },
  { date: '2023-07-04', present: true },
  { date: '2023-07-05', present: true },
];

const sampleAssignments = [
  { title: 'Algebra Homework', submitted: true },
  { title: 'Science Project', submitted: false },
  { title: 'Essay on Shakespeare', submitted: true },
];

const sampleSkills = [
  { skill: 'Problem Solving', level: 'Advanced' },
  { skill: 'Collaboration', level: 'Intermediate' },
  { skill: 'Critical Thinking', level: 'Advanced' },
];

const PCProgressTracking: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <TrendingUp className="text-blue-600" /> Progress Tracking
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Live Gradebook */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart2 className="text-green-500" /> Live Gradebook
          </h2>
          <ul>
            {sampleGrades.map((g, i) => (
              <li key={i} className="flex justify-between py-2 border-b last:border-b-0">
                <span>{g.subject}</span>
                <span className="font-bold">{g.grade}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Attendance Heatmap */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarCheck2 className="text-yellow-500" /> Attendance Heatmap
          </h2>
          <div className="flex gap-2">
            {sampleAttendance.map((a, i) => (
              <div key={i} className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold ${a.present ? 'bg-green-400' : 'bg-red-400'}`}>{a.date.slice(-2)}</div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">Green: Present, Red: Absent</div>
        </div>
        {/* Assignment Submission Tracker */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="text-purple-500" /> Assignment Submission Tracker
          </h2>
          <ul>
            {sampleAssignments.map((a, i) => (
              <li key={i} className="flex justify-between py-2 border-b last:border-b-0">
                <span>{a.title}</span>
                <span className={`font-bold ${a.submitted ? 'text-green-600' : 'text-red-600'}`}>{a.submitted ? 'Submitted' : 'Pending'}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Skill-based Analytics */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="text-blue-500" /> Skill-based Analytics
          </h2>
          <ul>
            {sampleSkills.map((s, i) => (
              <li key={i} className="flex justify-between py-2 border-b last:border-b-0">
                <span>{s.skill}</span>
                <span className="font-bold">{s.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PCProgressTracking; 