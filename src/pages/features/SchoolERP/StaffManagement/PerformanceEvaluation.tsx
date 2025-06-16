import React from 'react';
import { Star, TrendingUp, Award, BarChart } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const PerformanceEvaluation: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Performance Evaluation</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Average Rating</h3>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">4.5</p>
            <p className="text-sm text-gray-500 mt-2">Out of 5</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Performance Growth</h3>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">+12%</p>
            <p className="text-sm text-gray-500 mt-2">This Quarter</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Top Performers</h3>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">15</p>
            <p className="text-sm text-gray-500 mt-2">Staff Members</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Reviews Done</h3>
              <BarChart className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">85%</p>
            <p className="text-sm text-gray-500 mt-2">Completion Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Evaluations</h2>
            <div className="space-y-4">
              {[
                { name: 'John Doe', department: 'Mathematics', rating: 4.8, status: 'completed' },
                { name: 'Jane Smith', department: 'Science', rating: 4.5, status: 'in-progress' },
                { name: 'Mike Johnson', department: 'English', rating: 4.2, status: 'completed' },
              ].map((evaluation, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{evaluation.name}</h3>
                    <p className="text-sm text-gray-500">{evaluation.department}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(evaluation.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{evaluation.rating}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    evaluation.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {evaluation.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Start New Evaluation</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select Staff Member</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                  <option>Mike Johnson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Period</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="w-full p-2 border rounded-lg" />
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Evaluation Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Quarterly Review</option>
                  <option>Annual Review</option>
                  <option>Performance Improvement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter evaluation comments"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Evaluation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceEvaluation;