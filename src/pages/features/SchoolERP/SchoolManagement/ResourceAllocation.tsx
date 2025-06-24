import React, { useState } from 'react';
import { Box, Monitor, Users, Plus, Edit, Trash2, Search, CheckCircle, AlertTriangle, Download, BookOpen, Database } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const TABS = [
  { key: 'resources', label: 'Resource List', icon: Box },
  { key: 'allocation', label: 'Allocation', icon: Users },
  { key: 'usage', label: 'Usage Tracking', icon: BookOpen },
  { key: 'reports', label: 'Reports', icon: Database },
];

const RESOURCE_TYPES = ['Digital', 'Physical'];
const RESOURCE_STATUS = ['Available', 'Allocated', 'Maintenance'];
const ASSIGNABLES = ['Class 1', 'Class 2', 'Class 3', 'Mr. Sharma', 'Ms. Gupta', 'Library', 'Lab'];

const initialResources = [
  { id: 1, name: 'Projector', type: 'Digital', status: 'Available', assignedTo: '', usage: 12 },
  { id: 2, name: 'Laptop', type: 'Digital', status: 'Allocated', assignedTo: 'Class 1', usage: 30 },
  { id: 3, name: 'Whiteboard', type: 'Physical', status: 'Maintenance', assignedTo: '', usage: 5 },
];
const initialUsage = [
  { id: 1, resource: 'Laptop', user: 'Class 1', date: '2024-06-20', purpose: 'Math Class' },
  { id: 2, resource: 'Projector', user: 'Mr. Sharma', date: '2024-06-21', purpose: 'Presentation' },
];

const ResourceAllocation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resources');
  const [resources, setResources] = useState(initialResources);
  const [usage, setUsage] = useState(initialUsage);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: any }>({ open: false, mode: 'add' });
  const [allocModal, setAllocModal] = useState<{ open: boolean; resourceId?: number }>({ open: false });
  const [allocTo, setAllocTo] = useState('');
  const [usageModal, setUsageModal] = useState(false);
  const [usageForm, setUsageForm] = useState({ resource: '', user: '', date: '', purpose: '' });

  // Stats
  const totalResources = resources.length;
  const digitalResources = resources.filter(r => r.type === 'Digital').length;
  const physicalResources = resources.filter(r => r.type === 'Physical').length;
  const allocatedResources = resources.filter(r => r.status === 'Allocated').length;

  // Filtered resources
  const filteredResources = resources.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase()) ||
    r.status.toLowerCase().includes(search.toLowerCase()) ||
    r.assignedTo.toLowerCase().includes(search.toLowerCase())
  );

  // CRUD Handlers
  const handleAddEditResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const status = formData.get('status') as string;
    const assignedTo = formData.get('assignedTo') as string;
    const usageCount = Number(formData.get('usage'));
    if (modal.mode === 'add') {
      setResources(prev => [...prev, { id: Date.now(), name, type, status, assignedTo, usage: usageCount }]);
    } else if (modal.mode === 'edit' && modal.data) {
      setResources(prev => prev.map(r => r.id === modal.data!.id ? { ...r, name, type, status, assignedTo, usage: usageCount } : r));
    }
    setModal({ open: false, mode: 'add' });
  };
  const handleEdit = (data: any) => setModal({ open: true, mode: 'edit', data });
  const handleDelete = (id: number) => setResources(prev => prev.filter(r => r.id !== id));

  // Allocation Handler
  const handleAllocate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResources(prev => prev.map(r => r.id === allocModal.resourceId ? { ...r, status: 'Allocated', assignedTo: allocTo } : r));
    setAllocModal({ open: false });
    setAllocTo('');
  };
  // Usage Handler
  const handleAddUsage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsage(prev => [...prev, { id: Date.now(), ...usageForm }]);
    setUsageModal(false);
    setUsageForm({ resource: '', user: '', date: '', purpose: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resource Allocation</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Box className="h-6 w-6 text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Total Resources</div>
              <div className="text-xl font-bold text-blue-700">{totalResources}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Monitor className="h-6 w-6 text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Digital Resources</div>
              <div className="text-xl font-bold text-green-700">{digitalResources}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Box className="h-6 w-6 text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Physical Resources</div>
              <div className="text-xl font-bold text-purple-700">{physicalResources}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <CheckCircle className="h-6 w-6 text-pink-600" />
            <div>
              <div className="text-xs text-gray-500">Allocated Resources</div>
              <div className="text-xl font-bold text-pink-700">{allocatedResources}</div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <tab.icon className="h-5 w-5" /> {tab.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Resource List Tab */}
          {activeTab === 'resources' && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setModal({ open: true, mode: 'add' })}
                >
                  <Plus className="h-5 w-5" /> Add Resource
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Assigned To</th>
                      <th className="p-2 text-left">Usage</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-400">No resources found.</td>
                      </tr>
                    )}
                    {filteredResources.map(r => (
                      <tr key={r.id} className="border-b">
                        <td className="p-2 font-medium">{r.name}</td>
                        <td className="p-2">{r.type}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${r.status === 'Available' ? 'bg-green-100 text-green-700' : r.status === 'Allocated' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                        </td>
                        <td className="p-2">{r.assignedTo || '-'}</td>
                        <td className="p-2">{r.usage}</td>
                        <td className="p-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-blue-100" onClick={() => handleEdit(r)}><Edit className="h-4 w-4 text-blue-600" /></button>
                          <button className="p-1 rounded hover:bg-red-100" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-red-600" /></button>
                          <button className="p-1 rounded hover:bg-green-100" onClick={() => setAllocModal({ open: true, resourceId: r.id })}><CheckCircle className="h-4 w-4 text-green-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add/Edit Resource Modal */}
              {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAddEditResource}
                  >
                    <h2 className="text-xl font-bold mb-4">{modal.mode === 'add' ? 'Add Resource' : 'Edit Resource'}</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Resource Name</label>
                      <input name="name" defaultValue={modal.data?.name || ''} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select name="type" defaultValue={modal.data?.type || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Type</option>
                        {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select name="status" defaultValue={modal.data?.status || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Status</option>
                        {RESOURCE_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Assigned To</label>
                      <select name="assignedTo" defaultValue={modal.data?.assignedTo || ''} className="w-full border rounded-lg px-3 py-2">
                        <option value="">Unassigned</option>
                        {ASSIGNABLES.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Usage</label>
                      <input name="usage" type="number" min={0} defaultValue={modal.data?.usage || 0} required className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{modal.mode === 'add' ? 'Add' : 'Update'}</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setModal({ open: false, mode: 'add' })}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              {/* Allocate Modal */}
              {allocModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAllocate}
                  >
                    <h2 className="text-xl font-bold mb-4">Allocate Resource</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Allocate To</label>
                      <select
                        value={allocTo}
                        onChange={e => setAllocTo(e.target.value)}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select</option>
                        {ASSIGNABLES.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Allocate</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setAllocModal({ open: false }); setAllocTo(''); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
          {/* Allocation Tab */}
          {activeTab === 'allocation' && (
            <>
              <h2 className="text-xl font-bold mb-4">Allocation Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Resource</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Assigned To</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(r => (
                      <tr key={r.id} className="border-b">
                        <td className="p-2 font-medium">{r.name}</td>
                        <td className="p-2">{r.type}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${r.status === 'Available' ? 'bg-green-100 text-green-700' : r.status === 'Allocated' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
                        </td>
                        <td className="p-2">{r.assignedTo || '-'}</td>
                        <td className="p-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-green-100" onClick={() => setAllocModal({ open: true, resourceId: r.id })}><CheckCircle className="h-4 w-4 text-green-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Allocate Modal (reused) */}
              {allocModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAllocate}
                  >
                    <h2 className="text-xl font-bold mb-4">Allocate Resource</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Allocate To</label>
                      <select
                        value={allocTo}
                        onChange={e => setAllocTo(e.target.value)}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select</option>
                        {ASSIGNABLES.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Allocate</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setAllocModal({ open: false }); setAllocTo(''); }}>Cancel</button>
            </div>
                  </form>
          </div>
              )}
            </>
          )}
          {/* Usage Tracking Tab */}
          {activeTab === 'usage' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Usage Tracking</h2>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setUsageModal(true)}
                >
                  <Plus className="h-5 w-5" /> Add Usage
              </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Resource</th>
                      <th className="p-2 text-left">User</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usage.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-gray-400">No usage records found.</td>
                      </tr>
                    )}
                    {usage.map(u => (
                      <tr key={u.id} className="border-b">
                        <td className="p-2 font-medium">{u.resource}</td>
                        <td className="p-2">{u.user}</td>
                        <td className="p-2">{u.date}</td>
                        <td className="p-2">{u.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add Usage Modal */}
              {usageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAddUsage}
                  >
                    <h2 className="text-xl font-bold mb-4">Add Usage Record</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Resource</label>
                      <select
                        value={usageForm.resource}
                        onChange={e => setUsageForm(f => ({ ...f, resource: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select Resource</option>
                        {resources.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">User</label>
                      <select
                        value={usageForm.user}
                        onChange={e => setUsageForm(f => ({ ...f, user: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select User</option>
                        {ASSIGNABLES.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={usageForm.date}
                        onChange={e => setUsageForm(f => ({ ...f, date: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Purpose</label>
                      <input
                        type="text"
                        value={usageForm.purpose}
                        onChange={e => setUsageForm(f => ({ ...f, purpose: e.target.value }))}
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter purpose"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => { setUsageModal(false); setUsageForm({ resource: '', user: '', date: '', purpose: '' }); }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
              <h2 className="text-xl font-bold mb-2">Resource Reports</h2>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Download className="h-5 w-5" /> Export as Excel
              </button>
              </div>
              <div className="text-gray-500 text-sm">(Export functionality is a placeholder. Integrate with a library for real export.)</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;