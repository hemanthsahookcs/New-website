
import React, { useState } from 'react';
import { User, Candidate } from '../types';
import { CheckCircle, AlertTriangle, ShieldCheck, Trophy, Info, Search } from 'lucide-react';

interface VoterDashboardProps {
  user: User;
  candidates: Candidate[];
  onVote: (id: string) => void;
}

const VoterDashboard: React.FC<VoterDashboardProps> = ({ user, candidates, onVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.party.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Citizen Dashboard</h1>
          <p className="text-slate-500 text-lg">Logged in as <span className="text-slate-800 font-semibold">{user.name}</span> ({user.voterId})</p>
        </div>
        <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 font-bold border-2 ${user.hasVoted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200 animate-pulse'}`}>
          {user.hasVoted ? (
            <><ShieldCheck className="w-6 h-6" /> Status: Vote Casted Successfully</>
          ) : (
            <><AlertTriangle className="w-6 h-6" /> Status: Pending Action</>
          )}
        </div>
      </div>

      {user.hasVoted ? (
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Trophy className="text-green-600 w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Thank You for Voting!</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-lg leading-relaxed">
            Your voice has been recorded securely. Transparency and participation are the foundations of democracy. 
            You can view the live results to stay updated on the election progress.
          </p>
          <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block text-slate-500 text-sm italic">
            "One vote can make a difference." — SecureVote Integrity Team
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="text-indigo-600 w-7 h-7" /> Choose Your Representative
            </h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search candidates or parties..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCandidates.map((candidate) => (
              <div 
                key={candidate.id}
                className={`group relative bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 transform hover:-translate-y-1 ${selectedCandidate === candidate.id ? 'border-indigo-600 shadow-xl ring-4 ring-indigo-500/10' : 'border-slate-100 hover:border-slate-300 shadow-md'}`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img src={candidate.imageUrl} alt={candidate.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-indigo-700 shadow-sm border border-indigo-100 uppercase tracking-wider">
                    {candidate.party}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{candidate.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-4 text-sm">{candidate.party}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {candidate.description}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to vote for ${candidate.name}? This action is permanent.`)) {
                          onVote(candidate.id);
                        }
                      }}
                      className="flex-grow bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                    >
                      Confirm Vote
                    </button>
                    <button className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-600" title="More Info">
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredCandidates.length === 0 && (
             <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-medium">
               No candidates found matching your criteria.
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoterDashboard;
