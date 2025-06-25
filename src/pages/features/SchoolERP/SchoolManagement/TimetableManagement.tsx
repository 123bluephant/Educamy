import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, Search, AlertTriangle, Download, Printer } from 'lucide-react';
import BackButton from '../../../../components/BackButton';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PERIODS = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6', 'Period 7'];
const CLASSES = ['Class 1', 'Class 2', 'Class 3'];
const TEACHERS = ['Mr. Sharma', 'Ms. Gupta', 'Mr. Singh'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi', 'Computer Science'];
const ROOMS = ['Room 101', 'Room 102', 'Room 103'];

const TABS = [
  { key: 'timetable', label: 'Timetable Grid', icon: Calendar },
  { key: 'schedules', label: 'Schedules List', icon: Clock },
  { key: 'conflicts', label: 'Conflicts', icon: AlertTriangle },
  { key: 'export', label: 'Export/Print', icon: Download },
];

type ScheduleType = {
  id: number;
  className: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  period: string;
};

const initialSchedules: ScheduleType[] = [
  { id: 1, className: 'Class 1', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101', day: 'Monday', period: 'Period 1' },
  { id: 2, className: 'Class 1', subject: 'Science', teacher: 'Ms. Gupta', room: 'Room 102', day: 'Monday', period: 'Period 2' },
  { id: 3, className: 'Class 2', subject: 'English', teacher: 'Mr. Singh', room: 'Room 103', day: 'Tuesday', period: 'Period 1' },
];

const TimetableManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [schedules, setSchedules] = useState<ScheduleType[]>(initialSchedules);
  const [filter, setFilter] = useState({ className: '', teacher: '', room: '' });
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: ScheduleType }>({ open: false, mode: 'add' });
  const [search, setSearch] = useState('');

  // Conflict detection
  const conflicts = schedules.filter((s, i, arr) =>
    arr.findIndex(
      t => t.day === s.day && t.period === s.period && (t.teacher === s.teacher || t.room === s.room) && t.id !== s.id
    ) !== -1
  );

  // Filtered schedules for list
  const filteredSchedules = schedules.filter(s =>
    (filter.className ? s.className === filter.className : true) &&
    (filter.teacher ? s.teacher === filter.teacher : true) &&
    (filter.room ? s.room === filter.room : true) &&
    (s.subject.toLowerCase().includes(search.toLowerCase()) || s.teacher.toLowerCase().includes(search.toLowerCase()))
  );

  // Timetable grid data
  const gridClass = filter.className || CLASSES[0];
  const gridData: { [day: string]: { [period: string]: ScheduleType | undefined } } = {};
  DAYS.forEach(day => {
    gridData[day] = {};
    PERIODS.forEach(period => {
      gridData[day][period] = schedules.find(s => s.className === gridClass && s.day === day && s.period === period);
    });
  });

  // CRUD Handlers
  const handleAddEditSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const className = formData.get('className') as string;
    const subject = formData.get('subject') as string;
    const teacher = formData.get('teacher') as string;
    const room = formData.get('room') as string;
    const day = formData.get('day') as string;
    const period = formData.get('period') as string;
    if (modal.mode === 'add') {
      setSchedules(prev => [...prev, { id: Date.now(), className, subject, teacher, room, day, period }]);
    } else if (modal.mode === 'edit' && modal.data) {
      setSchedules(prev => prev.map(s => s.id === modal.data!.id ? { ...s, className, subject, teacher, room, day, period } : s));
    }
    setModal({ open: false, mode: 'add' });
  };
  const handleEdit = (data: ScheduleType) => setModal({ open: true, mode: 'edit', data });
  const handleDelete = (id: number) => setSchedules(prev => prev.filter(s => s.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-4">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Timetable Management</h1>
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Clock className="h-6 w-6 text-blue-600" />
            <div>
              <div className="text-xs text-gray-500">Active Schedules</div>
              <div className="text-xl font-bold text-blue-700">{schedules.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Calendar className="h-6 w-6 text-green-600" />
            <div>
              <div className="text-xs text-gray-500">Weekly Classes</div>
              <div className="text-xl font-bold text-green-700">{CLASSES.length * PERIODS.length * DAYS.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Users className="h-6 w-6 text-purple-600" />
            <div>
              <div className="text-xs text-gray-500">Total Teachers</div>
              <div className="text-xl font-bold text-purple-700">{TEACHERS.length}</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow flex items-center p-4 gap-3">
            <Users className="h-6 w-6 text-pink-600" />
            <div>
              <div className="text-xs text-gray-500">Total Rooms</div>
              <div className="text-xl font-bold text-pink-700">{ROOMS.length}</div>
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
          {/* Timetable Grid Tab */}
          {activeTab === 'timetable' && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex gap-2">
                  <select
                    className="border rounded-lg px-3 py-2"
                    value={filter.className}
                    onChange={e => setFilter(f => ({ ...f, className: e.target.value }))}
                  >
                    <option value="">Select Class</option>
                    {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select
                    className="border rounded-lg px-3 py-2"
                    value={filter.teacher}
                    onChange={e => setFilter(f => ({ ...f, teacher: e.target.value }))}
                  >
                    <option value="">All Teachers</option>
                    {TEACHERS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <select
                    className="border rounded-lg px-3 py-2"
                    value={filter.room}
                    onChange={e => setFilter(f => ({ ...f, room: e.target.value }))}
                  >
                    <option value="">All Rooms</option>
                    {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setModal({ open: true, mode: 'add' })}
                >
                  <Plus className="h-5 w-5" /> Add Schedule
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs md:text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Day / Period</th>
                      {PERIODS.map(period => (
                        <th key={period} className="p-2 text-center">{period}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map(day => (
                      <tr key={day}>
                        <td className="p-2 font-medium bg-blue-50">{day}</td>
                        {PERIODS.map(period => {
                          const sched = gridData[day][period];
                          return (
                            <td key={period} className={`p-2 text-center ${conflicts.some(c => c.day === day && c.period === period && c.className === gridClass) ? 'bg-red-100' : ''}`}
                              title={sched ? `${sched.subject} (${sched.teacher}, ${sched.room})` : ''}
                            >
                              {sched ? (
                                <div className="flex flex-col items-center">
                                  <span className="font-semibold text-blue-700">{sched.subject}</span>
                                  <span className="text-xs text-gray-500">{sched.teacher}</span>
                                  <span className="text-xs text-gray-400">{sched.room}</span>
                                </div>
                              ) : (
                                <span className="text-gray-300">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add/Edit Schedule Modal */}
              {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAddEditSchedule}
                  >
                    <h2 className="text-xl font-bold mb-4">{modal.mode === 'add' ? 'Add Schedule' : 'Edit Schedule'}</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Class</label>
                      <select name="className" defaultValue={modal.data?.className || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Class</option>
                        {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <select name="subject" defaultValue={modal.data?.subject || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Subject</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Teacher</label>
                      <select name="teacher" defaultValue={modal.data?.teacher || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Teacher</option>
                        {TEACHERS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Room</label>
                      <select name="room" defaultValue={modal.data?.room || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Room</option>
                        {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Day</label>
                      <select name="day" defaultValue={modal.data?.day || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Day</option>
                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Period</label>
                      <select name="period" defaultValue={modal.data?.period || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Period</option>
                        {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{modal.mode === 'add' ? 'Add' : 'Update'}</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setModal({ open: false, mode: 'add' })}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
          {/* Schedules List Tab */}
          {activeTab === 'schedules' && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search by subject or teacher..."
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
                  <Plus className="h-5 w-5" /> Add Schedule
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-left">Subject</th>
                      <th className="p-2 text-left">Teacher</th>
                      <th className="p-2 text-left">Room</th>
                      <th className="p-2 text-left">Day</th>
                      <th className="p-2 text-left">Period</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedules.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-400">No schedules found.</td>
                      </tr>
                    )}
                    {filteredSchedules.map(s => (
                      <tr key={s.id} className="border-b hover:bg-blue-50">
                        <td className="p-2 font-medium">{s.className}</td>
                        <td className="p-2">{s.subject}</td>
                        <td className="p-2">{s.teacher}</td>
                        <td className="p-2">{s.room}</td>
                        <td className="p-2">{s.day}</td>
                        <td className="p-2">{s.period}</td>
                        <td className="p-2 flex gap-2">
                          <button className="p-1 rounded hover:bg-blue-100" onClick={() => handleEdit(s)}><Edit className="h-4 w-4 text-blue-600" /></button>
                          <button className="p-1 rounded hover:bg-red-100" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4 text-red-600" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Add/Edit Schedule Modal (reused) */}
              {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <form
                    className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
                    onSubmit={handleAddEditSchedule}
                  >
                    <h2 className="text-xl font-bold mb-4">{modal.mode === 'add' ? 'Add Schedule' : 'Edit Schedule'}</h2>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Class</label>
                      <select name="className" defaultValue={modal.data?.className || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Class</option>
                        {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <select name="subject" defaultValue={modal.data?.subject || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Subject</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Teacher</label>
                      <select name="teacher" defaultValue={modal.data?.teacher || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Teacher</option>
                        {TEACHERS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Room</label>
                      <select name="room" defaultValue={modal.data?.room || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Room</option>
                        {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Day</label>
                      <select name="day" defaultValue={modal.data?.day || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Day</option>
                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Period</label>
                      <select name="period" defaultValue={modal.data?.period || ''} required className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select Period</option>
                        {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">{modal.mode === 'add' ? 'Add' : 'Update'}</button>
                      <button type="button" className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300" onClick={() => setModal({ open: false, mode: 'add' })}>Cancel</button>
                    </div>
                  </form>
            </div>
              )}
            </>
          )}
          {/* Conflicts Tab */}
          {activeTab === 'conflicts' && (
            <>
              <h2 className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2"><AlertTriangle className="h-6 w-6" /> Conflict Management</h2>
              {conflicts.length === 0 ? (
                <div className="text-green-600 font-semibold">No conflicts detected!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-red-50">
                        <th className="p-2 text-left">Class</th>
                        <th className="p-2 text-left">Subject</th>
                        <th className="p-2 text-left">Teacher</th>
                        <th className="p-2 text-left">Room</th>
                        <th className="p-2 text-left">Day</th>
                        <th className="p-2 text-left">Period</th>
                        <th className="p-2 text-left">Conflict Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conflicts.map((c, idx) => (
                        <tr key={c.id + '-' + idx} className="border-b bg-red-100">
                          <td className="p-2 font-medium">{c.className}</td>
                          <td className="p-2">{c.subject}</td>
                          <td className="p-2">{c.teacher}</td>
                          <td className="p-2">{c.room}</td>
                          <td className="p-2">{c.day}</td>
                          <td className="p-2">{c.period}</td>
                          <td className="p-2 text-red-700 font-semibold">
                            {schedules.some(s => s.day === c.day && s.period === c.period && s.teacher === c.teacher && s.id !== c.id) ? 'Teacher Conflict' : ''}
                            {schedules.some(s => s.day === c.day && s.period === c.period && s.room === c.room && s.id !== c.id) ? 'Room Conflict' : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
          </div>
              )}
            </>
          )}
          {/* Export/Print Tab */}
          {activeTab === 'export' && (
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
              <h2 className="text-xl font-bold mb-2">Export & Print</h2>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Download className="h-5 w-5" /> Export as Excel
              </button>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Printer className="h-5 w-5" /> Print Timetable
              </button>
              </div>
              <div className="text-gray-500 text-sm">(Export/Print functionality is a placeholder. Integrate with a library for real export/print.)</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetableManagement;