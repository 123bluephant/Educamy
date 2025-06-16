import React from 'react';
import { CreditCard, ArrowUpRight, CheckCircle, AlertTriangle } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const OnlinePaymentGateway: React.FC = () => {
  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Online Payment Gateway</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Transactions</h3>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">2,456</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Success Rate</h3>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">98.5%</p>
            <p className="text-sm text-gray-500 mt-2">Last 30 Days</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {[
                { id: 'TXN001', amount: 5000, status: 'success', date: '2024-02-01' },
                { id: 'TXN002', amount: 3500, status: 'pending', date: '2024-02-01' },
                { id: 'TXN003', amount: 7500, status: 'success', date: '2024-01-31' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{transaction.id}</h3>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{transaction.amount}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Gateway Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Gateway</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Razorpay</option>
                  <option>Stripe</option>
                  <option>PayU</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merchant ID</label>
                <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter merchant ID" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <input type="password" className="w-full p-2 border rounded-lg" placeholder="Enter API key" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlinePaymentGateway;