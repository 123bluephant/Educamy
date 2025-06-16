import React, { useState, FormEvent } from 'react';
import { BarChart, PieChart, TrendingUp, Users, Download } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

interface ReportForm {
  fromDate: string;
  toDate: string;
  class: string;
  reportType: string;
}

interface Report {
  id: string;
  fromDate: string;
  toDate: string;
  class: string;
  reportType: string;
  generatedAt: string;
  downloadUrl: string;
}

const AttendanceAnalytics: React.FC = () => {
  const [formData, setFormData] = useState<ReportForm>({
    fromDate: '',
    toDate: '',
    class: '',
    reportType: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<Report[]>([]);
  const [error, setError] = useState<string>('');

  const validateForm = (): boolean => {
    if (!formData.fromDate || !formData.toDate) {
      setError('Please select both from and to dates');
      return false;
    }
    if (new Date(formData.fromDate) > new Date(formData.toDate)) {
      setError('From date cannot be later than to date');
      return false;
    }
    if (!formData.class) {
      setError('Please select a class');
      return false;
    }
    if (!formData.reportType) {
      setError('Please select a report type');
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsGenerating(true);
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newReport: Report = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        generatedAt: new Date().toISOString(),
        downloadUrl: '#' // In real app, this would be a real URL
      };

      setGeneratedReports(prev => [newReport, ...prev]);
      setFormData({
        fromDate: '',
        toDate: '',
        class: '',
        reportType: ''
      });
    } catch (err) {
      setError('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Attendance Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Average Attendance</h3>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">88%</p>
            <p className="text-sm text-gray-500 mt-2">Last 30 Days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Highest Attendance</h3>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">Class X-A</p>
            <p className="text-sm text-gray-500 mt-2">95% Average</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Monthly Trend</h3>
              <BarChart className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">+2.5%</p>
            <p className="text-sm text-gray-500 mt-2">vs Last Month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Distribution</h3>
              <PieChart className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">85:15</p>
            <p className="text-sm text-gray-500 mt-2">Present:Absent</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Class-wise Attendance</h2>
            <div className="space-y-4">
              {[
                { class: 'X-A', attendance: 95, students: 42 },
                { class: 'X-B', attendance: 88, students: 45 },
                { class: 'X-C', attendance: 92, students: 40 },
                { class: 'IX-A', attendance: 85, students: 44 },
                { class: 'IX-B', attendance: 90, students: 43 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Class {item.class}</h3>
                    <p className="text-sm text-gray-500">{item.students} Students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{item.attendance}%</p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${item.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Generate Report</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Class</option>
                  <option value="all">All Classes</option>
                  <option value="X-A">X-A</option>
                  <option value="X-B">X-B</option>
                  <option value="X-C">X-C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Report Type</option>
                  <option value="detailed">Detailed Report</option>
                  <option value="summary">Summary Report</option>
                  <option value="student-wise">Student-wise Report</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className={`w-full py-2 rounded-lg transition-colors ${isGenerating
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
            </form>

            {generatedReports.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  {generatedReports.map(report => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{report.class === 'all' ? 'All Classes' : `Class ${report.class}`}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(report.generatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <a
                        href={report.downloadUrl}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;