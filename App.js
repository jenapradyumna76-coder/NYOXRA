import React, { useState } from 'react';
import { Clock, ShieldAlert, FileText, UserCheck, AlertTriangle } from 'lucide-react';

const JudgeDashboard = () => {
  // Mock data for cases
  const [cases, setCases] = useState([
    { id: "2024-001", type: "Criminal", track: "Fast-Track", tokens: 2, stays: "45 Days", invScore: 100, status: "Ready" },
    { id: "2018-442", type: "Civil", track: "Legacy", tokens: 0, stays: "EXPIRED", invScore: 40, status: "Critical" },
    { id: "2024-009", type: "Criminal", track: "Fast-Track", tokens: 1, stays: "12 Days", invScore: 85, status: "Active" },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Clock className="text-blue-600" />} title="Pending Stays" value="42" color="blue" />
        <StatCard icon={<ShieldAlert className="text-red-600" />} title="Expired Stays" value="5" color="red" />
        <StatCard icon={<FileText className="text-green-600" />} title="Ready for Trial" value="12" color="green" />
        <StatCard icon={<AlertTriangle className="text-orange-600" />} title="Legacy Backlog" value="540" color="orange" />
      </div>

      {/* Main Docket Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Live Court Docket</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">Filter: Legacy</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium">Run Stay Vacuum</button>
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Case ID</th>
              <th className="p-4 font-semibold">Track</th>
              <th className="p-4 font-semibold text-center">Inv. Quality</th>
              <th className="p-4 font-semibold text-center">Tokens (Adj)</th>
              <th className="p-4 font-semibold text-center">Stay Timer</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-700">{c.id} <br/><span className="text-xs text-slate-400">{c.type}</span></td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${c.track === 'Legacy' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {c.track}
                  </span>
                </td>
                <td className="p-4">
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${c.invScore < 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${c.invScore}%`}}></div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-1">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < (2 - c.tokens) ? 'bg-slate-300' : 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]'}`}></div>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={`font-mono font-bold ${c.stays === 'EXPIRED' ? 'text-red-600 animate-pulse' : 'text-slate-600'}`}>
                    {c.stays}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm">Open File</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
    <div className={`p-3 rounded-lg bg-${color}-50`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default JudgeDashboard;