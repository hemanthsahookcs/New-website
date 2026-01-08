
import React, { useState } from 'react';
import { Candidate, User } from '../types';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Users, 
  UserCheck, 
  Vote as VoteIcon, 
  ShieldCheck, 
  Image as ImageIcon,
  LayoutGrid,
  List
} from 'lucide-react';

interface AdminDashboardProps {
  candidates: Candidate[];
  voters: User[];
  onAddCandidate: (c: any) => void;
  onDeleteCandidate: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ candidates, voters, onAddCandidate, onDeleteCandidate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', party: '', description: '', imageUrl: 'https://picsum.photos/400/300' });

  const totalVoters = voters.filter(v => v.role === 'VOTER').length;
  const votedCount = voters.filter(v => v.hasVoted).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCandidate(newCandidate);
    setNewCandidate({ name: '', party: '', description: '', imageUrl: 'https://picsum.photos/400/300' });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Admin Control Center</h1>
          <p className="text-slate-500 text-lg">Manage candidates, oversee voter activity, and maintain system integrity.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 shrink-0"
        >
          {showAddForm ? <LayoutGrid className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAddForm ? 'Back to Dashboard' : 'Add New Candidate'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Registered Voters</p>
            <h3 className="text-3xl font-extrabold text-slate-900">{totalVoters}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="p-4 bg-green-50 rounded-2xl text-green-600">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Participation Rate</p>
            <h3 className="text-3xl font-extrabold text-slate-900">
              {totalVoters > 0 ? ((votedCount / totalVoters) * 100).toFixed(1) : 0}%
            </h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600">
            <VoteIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Total Votes Cast</p>
            <h3 className="text-3xl font-extrabold text-slate-900">{votedCount}</h3>
          </div>
        </div>
      </div>

      {showAddForm ? (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Plus className="text-indigo-600 w-6 h-6" /> Create Candidate Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Candidate Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={newCandidate.name}
                  onChange={e => setNewCandidate({...newCandidate, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Political Party</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={newCandidate.party}
                  onChange={e => setNewCandidate({...newCandidate, party: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Profile Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="url" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  value={newCandidate.imageUrl}
                  onChange={e => setNewCandidate({...newCandidate, imageUrl: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Manifesto / Description</label>
              <textarea 
                rows={4} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={newCandidate.description}
                onChange={e => setNewCandidate({...newCandidate, description: e.target.value})}
              ></textarea>
            </div>
            <div className="flex gap-4">
              <button 
                type="submit"
                className="flex-grow bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100"
              >
                Register Candidate
              </button>
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-slate-100 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900">Registered Candidates</h2>
            <span className="text-sm font-medium text-slate-500">Total: {candidates.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-8 py-4">Candidate</th>
                  <th className="px-8 py-4">Party</th>
                  <th className="px-8 py-4">Votes</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map(candidate => (
                  <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={candidate.imageUrl} className="w-12 h-12 rounded-xl object-cover border border-slate-200" alt="" />
                        <div>
                          <p className="font-bold text-slate-900">{candidate.name}</p>
                          <p className="text-xs text-slate-400">ID: {candidate.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-tight">
                        {candidate.party}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{candidate.voteCount}</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: `${votedCount > 0 ? (candidate.voteCount / votedCount) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => confirm('Delete this candidate?') && onDeleteCandidate(candidate.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
