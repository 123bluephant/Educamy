import React, { useState } from 'react';
import { DollarSign, CreditCard, Calendar, FileText, AlertTriangle, TrendingUp, User, Search, Eye, Edit, CheckCircle, Trash2, Download } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

// Dummy data for transactions
const initialTransactions = [
  { name: 'John Doe', department: 'Mathematics', amount: 3500, status: 'processed', period: '2025-06', method: 'Bank Transfer', notes: 'Salary for June', date: '2025-06-25' },
  { name: 'Jane Smith', department: 'Science', amount: 3200, status: 'pending', period: '2025-06', method: 'Check', notes: '', date: '2025-06-25' },
  { name: 'Mike Johnson', department: 'English', amount: 3400, status: 'processed', period: '2025-06', method: 'Bank Transfer', notes: '', date: '2025-06-25' },
  { name: 'Priya Sharma', department: 'Mathematics', amount: 3100, status: 'failed', period: '2025-06', method: 'Bank Transfer', notes: 'Bank error', date: '2025-06-25' },
  { name: 'Amit Patel', department: 'Science', amount: 3600, status: 'processed', period: '2025-06', method: 'Cash', notes: '', date: '2025-06-25' },
];

const statusColors: Record<string, string> = {
  processed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
};

const PayrollSystem: React.FC = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<any>(null);
  const [form, setForm] = useState({ name: '', department: '', amount: '', status: 'pending', period: '', method: 'Bank Transfer', notes: '', date: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Dashboard stats
  const totalPayroll = transactions.filter(t => t.status === 'processed').reduce((acc, t) => acc + t.amount, 0);
  const processedCount = transactions.filter(t => t.status === 'processed').length;
  const payslipsCount = transactions.length;
  const nextPayroll = 5; // Dummy
  const pendingPayrolls = transactions.filter(t => t.status === 'pending').length;
  const failedTxns = transactions.filter(t => t.status === 'failed').length;

  // Filtered transactions
  const filteredTxns = transactions.filter(t =>
    (filterStatus === 'all' || t.status === filterStatus) &&
    (t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Analytics: Payroll by department
  const departments = Array.from(new Set(transactions.map(t => t.department)));
  const payrollByDept = departments.map(dep => {
    const deptTxns = transactions.filter(t => t.department === dep && t.status === 'processed');
    return {
      department: dep,
      total: deptTxns.reduce((acc, t) => acc + t.amount, 0),
    };
  });

  // Top earners
  const topEarners = [...transactions].sort((a, b) => b.amount - a.amount).slice(0, 3);

  // Handlers
  const handleOpenModal = (txn: any) => { setSelectedTxn(txn); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setSelectedTxn(null); };
  const handleStatusChange = (status: string) => setFilterStatus(status);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
    setFormSuccess('');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.department || !form.amount || !form.period || !form.method || !form.date) {
      setFormError('All fields are required.');
      return;
    }
    if (editIndex !== null) {
      const updated = [...transactions];
      updated[editIndex] = { ...form, amount: Number(form.amount) };
      setTransactions(updated);
      setEditIndex(null);
      setFormSuccess('Transaction updated!');
    } else {
      setTransactions([...transactions, { ...form, amount: Number(form.amount) }]);
      setFormSuccess('Payroll processed!');
    }
    setForm({ name: '', department: '', amount: '', status: 'pending', period: '', method: 'Bank Transfer', notes: '', date: '' });
  };
  const handleEdit = (idx: number) => {
    setForm({ ...transactions[idx], amount: transactions[idx].amount.toString() });
    setEditIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleMarkProcessed = (idx: number) => {
    setTransactions(transactions.map((t, i) => i === idx ? { ...t, status: 'processed' } : t));
  };
  const handleRetry = (idx: number) => {
    setTransactions(transactions.map((t, i) => i === idx ? { ...t, status: 'pending' } : t));
  };
  const handleDelete = (idx: number) => {
    setTransactions(transactions.filter((_, i) => i !== idx));
  };

  return (
    <div className="relative min-h-screen p-8">
      <BackButton />
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8">Payroll System</h1>
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Payroll</h3>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">${totalPayroll.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Processed</h3>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{processedCount}</p>
            <p className="text-sm text-gray-500 mt-2">Payments</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Next Payroll</h3>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">{nextPayroll}</p>
            <p className="text-sm text-gray-500 mt-2">Days Left</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Payslips</h3>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{payslipsCount}</p>
            <p className="text-sm text-gray-500 mt-2">Generated</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pending Payrolls</h3>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{pendingPayrolls}</p>
            <p className="text-sm text-gray-500 mt-2">To Process</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Failed Transactions</h3>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{failedTxns}</p>
            <p className="text-sm text-gray-500 mt-2">This Month</p>
          </div>
        </div>
        {/* Analytics Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Payroll by Department</h2>
          <div className="flex gap-6">
            {payrollByDept.map((dept, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-semibold text-gray-700">{dept.department}</span>
                <div className="w-8 h-24 bg-blue-100 rounded-lg flex items-end justify-center mt-2">
                  <div style={{ height: `${Math.min(dept.total / 100, 24)}px` }} className="w-8 bg-blue-500 rounded-t-lg"></div>
                </div>
                <span className="mt-2 text-blue-700 font-bold">${dept.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => handleStatusChange('all')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>All</button>
            <button onClick={() => handleStatusChange('processed')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'processed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Processed</button>
            <button onClick={() => handleStatusChange('pending')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Pending</button>
            <button onClick={() => handleStatusChange('failed')} className={`px-4 py-2 rounded-lg border ${filterStatus === 'failed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Failed</button>
          </div>
          <div className="flex items-center border rounded-lg px-2 bg-white w-full md:w-64">
            <Search className="h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search by name or department" value={searchTerm} onChange={handleSearch} className="w-full p-2 outline-none bg-transparent" />
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {filteredTxns.slice(0, 3).map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{transaction.name}</h3>
                    <p className="text-sm text-gray-500">{transaction.department}</p>
                    <p className="text-sm text-gray-600">${transaction.amount}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[transaction.status] || 'bg-gray-100 text-gray-800'}`}>{transaction.status}</span>
                    <button onClick={() => handleOpenModal(transaction)} className="ml-2 p-1 rounded hover:bg-blue-100"><Eye className="h-5 w-5 text-blue-600" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Process Payroll */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">{editIndex !== null ? 'Edit Transaction' : 'Process Payroll'}</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="Enter staff member name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select name="department" value={form.department} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option value="">Select Department</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input type="number" name="amount" value={form.amount} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
                <input type="text" name="period" value={form.period} onChange={handleFormChange} className="w-full p-2 border rounded-lg" placeholder="e.g. 2025-06" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select name="method" value={form.method} onChange={handleFormChange} className="w-full p-2 border rounded-lg">
                  <option>Bank Transfer</option>
                  <option>Check</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleFormChange} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleFormChange} className="w-full p-2 border rounded-lg" rows={4} placeholder="Enter any additional notes"></textarea>
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              {formSuccess && <div className="text-green-600 text-sm">{formSuccess}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">{editIndex !== null ? 'Update Transaction' : 'Process Payroll'}</button>
            </form>
          </div>
        </div>
        {/* All Transactions Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-6">All Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Department</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Period</th>
                  <th className="p-2 text-left">Method</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((txn, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{txn.name}</td>
                    <td className="p-2">{txn.department}</td>
                    <td className="p-2">${txn.amount}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[txn.status] || 'bg-gray-100 text-gray-800'}`}>{txn.status}</span>
                    </td>
                    <td className="p-2">{txn.period}</td>
                    <td className="p-2">{txn.method}</td>
                    <td className="p-2">{txn.date}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleOpenModal(txn)} className="p-1 rounded hover:bg-blue-100"><Eye className="h-4 w-4 text-blue-600" /></button>
                      <button onClick={() => handleEdit(idx)} className="p-1 rounded hover:bg-yellow-100"><Edit className="h-4 w-4 text-yellow-600" /></button>
                      {txn.status !== 'processed' && (
                        <button onClick={() => handleMarkProcessed(idx)} className="p-1 rounded hover:bg-green-100"><CheckCircle className="h-4 w-4 text-green-600" /></button>
                      )}
                      {txn.status === 'failed' && (
                        <button onClick={() => handleRetry(idx)} className="p-1 rounded hover:bg-orange-100"><AlertTriangle className="h-4 w-4 text-orange-600" /></button>
                      )}
                      <button onClick={() => handleDelete(idx)} className="p-1 rounded hover:bg-red-100"><Trash2 className="h-4 w-4 text-red-600" /></button>
                      <button className="p-1 rounded hover:bg-gray-100"><Download className="h-4 w-4 text-gray-600" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Earners */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-xl font-semibold mb-4">Top Earners</h2>
          <ul className="space-y-2">
            {topEarners.map((t, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">{t.name}</span>
                <span className="text-gray-500">({t.department})</span>
                <span className="ml-auto text-green-600 font-bold">${t.amount}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Transaction Details Modal */}
        {showModal && selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
              <h2 className="text-2xl font-bold mb-4">{selectedTxn.name}</h2>
              <div className="mb-2 text-gray-700"><b>Department:</b> {selectedTxn.department}</div>
              <div className="mb-2 text-gray-700"><b>Amount:</b> ${selectedTxn.amount}</div>
              <div className="mb-2 text-gray-700"><b>Status:</b> {selectedTxn.status}</div>
              <div className="mb-2 text-gray-700"><b>Period:</b> {selectedTxn.period}</div>
              <div className="mb-2 text-gray-700"><b>Method:</b> {selectedTxn.method}</div>
              <div className="mb-2 text-gray-700"><b>Date:</b> {selectedTxn.date}</div>
              <div className="mb-4 text-gray-700"><b>Notes:</b> {selectedTxn.notes}</div>
              <div className="flex gap-2 mt-4">
                {selectedTxn.status !== 'processed' && (
                  <button onClick={() => { handleMarkProcessed(transactions.indexOf(selectedTxn)); setShowModal(false); }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Mark Processed</button>
                )}
                {selectedTxn.status === 'failed' && (
                  <button onClick={() => { handleRetry(transactions.indexOf(selectedTxn)); setShowModal(false); }} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Retry</button>
                )}
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-1"><Download className="h-4 w-4" /> Payslip</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollSystem;