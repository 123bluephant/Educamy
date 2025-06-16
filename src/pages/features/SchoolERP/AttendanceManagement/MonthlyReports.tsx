import React, { useState } from 'react';
import { FileText, Download, Printer, Share2 } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const MonthlyReports: React.FC = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    class: '',
    section: '',
    month: '',
    year: new Date().getFullYear().toString(),
    format: 'pdf'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle report generation logic here
    console.log('Generating report with:', formData);
  };

  return (
    <div className="relative min-h-screen p-8">
   <BackButton />
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Monthly Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Reports</h3>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500 mt-2">This Month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Downloads</h3>
            <Download className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">156</p>
          <p className="text-sm text-gray-500 mt-2">Total Downloads</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Printed</h3>
            <Printer className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">45</p>
          <p className="text-sm text-gray-500 mt-2">Print Requests</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Shared</h3>
            <Share2 className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">89</p>
          <p className="text-sm text-gray-500 mt-2">Times Shared</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Reports</h2>
          <div className="space-y-4">
            {[
              { name: 'January Attendance Report', date: '2024-02-01', size: '2.4 MB', downloads: 45 },
              { name: 'Class X-A Monthly Report', date: '2024-02-01', size: '1.8 MB', downloads: 32 },
              { name: 'Staff Attendance Summary', date: '2024-01-31', size: '1.2 MB', downloads: 28 },
              { name: 'December Analysis Report', date: '2024-01-15', size: '3.1 MB', downloads: 56 },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{report.downloads} downloads</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Generate New Report</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Report Type</option>
                <option value="attendance">Attendance Report</option>
                <option value="summary">Summary Report</option>
                <option value="detailed">Detailed Analysis</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="X-A">Class X-A</option>
                  <option value="X-B">Class X-B</option>
                  <option value="X-C">Class X-C</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Month
                </label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Month</option>
                  {[
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                  ].map((month, index) => (
                    <option key={index} value={month.toLowerCase()}>{month}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <div className="flex space-x-4">
                {['pdf', 'excel', 'csv'].map((format) => (
                  <label key={format} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value={format}
                      checked={formData.format === format}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 uppercase">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>
  );
};

export default MonthlyReports;