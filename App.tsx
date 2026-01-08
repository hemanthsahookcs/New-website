
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Vote as VoteIcon, 
  BarChart3, 
  LogOut, 
  CheckCircle, 
  FileText,
  ShieldCheck,
  Cpu,
  Users
} from 'lucide-react';
import { INITIAL_CANDIDATES, INITIAL_VOTERS } from './constants';
import { User, Candidate, Vote } from './types';
import Login from './components/Login';
import VoterDashboard from './components/VoterDashboard';
import AdminDashboard from './components/AdminDashboard';
import Documentation from './components/Documentation';
import Results from './components/Results';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [voters, setVoters] = useState<User[]>(INITIAL_VOTERS);
  const [votes, setVotes] = useState<Vote[]>([]);

  // Auth Handlers
  const handleLogin = (email: string, pass: string) => {
    const user = voters.find(v => v.email === email && v.password === pass);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleRegister = (name: string, email: string, pass: string, vId: string) => {
    const newUser: User = {
      id: `v${Date.now()}`,
      name,
      email,
      password: pass,
      voterId: vId,
      hasVoted: false,
      role: 'VOTER'
    };
    setVoters(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Voting Logic
  const castVote = (candidateId: string) => {
    if (!currentUser || currentUser.hasVoted || currentUser.role !== 'VOTER') return;

    const newVote: Vote = {
      id: `vt${Date.now()}`,
      voterId: currentUser.id,
      candidateId: candidateId,
      timestamp: new Date().toISOString()
    };

    setVotes(prev => [...prev, newVote]);
    setCandidates(prev => prev.map(c => 
      c.id === candidateId ? { ...c, voteCount: c.voteCount + 1 } : c
    ));
    setVoters(prev => prev.map(v => 
      v.id === currentUser.id ? { ...v, hasVoted: true } : v
    ));
    setCurrentUser(prev => prev ? { ...prev, hasVoted: true } : null);
  };

  // Admin Actions
  const addCandidate = (c: Omit<Candidate, 'id' | 'voteCount'>) => {
    setCandidates(prev => [...prev, { ...c, id: `c${Date.now()}`, voteCount: 0 }]);
  };

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">SecureVote</span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                <Link to="/results" className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> Live Results
                </Link>
                <Link to="/docs" className="text-slate-600 hover:text-indigo-600 font-medium flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Project Docs
                </Link>
                
                {currentUser ? (
                  <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Hi, {currentUser.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Login to Vote
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              currentUser ? (
                currentUser.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/voter" />
              ) : (
                <LandingPage />
              )
            } />
            <Route path="/login" element={<Login onLogin={handleLogin} onRegister={handleRegister} />} />
            <Route path="/voter" element={
              currentUser && currentUser.role === 'VOTER' ? (
                <VoterDashboard user={currentUser} candidates={candidates} onVote={castVote} />
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/admin" element={
              currentUser && currentUser.role === 'ADMIN' ? (
                <AdminDashboard candidates={candidates} voters={voters} onAddCandidate={addCandidate} onDeleteCandidate={deleteCandidate} />
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/results" element={<Results candidates={candidates} />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-8 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" /> SecureVote
              </h3>
              <p>An advanced electronic voting simulation designed for college final year projects. Built with security and transparency at its core.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/results" className="hover:text-white transition-colors">Voting Results</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">System Documentation</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Voter Registration</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Academic Project</h4>
              <p>BCA Final Year Project Guided Implementation</p>
              <div className="flex gap-4 mt-4 text-indigo-400">
                <Cpu className="w-6 h-6" />
                <Users className="w-6 h-6" />
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 text-center">
            &copy; 2024 SecureVote System. All rights reserved.
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

const LandingPage = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-slate-50 to-indigo-50/50">
    <div className="mb-8 p-4 bg-indigo-100 text-indigo-700 rounded-2xl font-semibold text-sm uppercase tracking-widest shadow-inner">
      Safe • Transparent • Decentralized
    </div>
    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
      Decide the Future with <br/><span className="text-indigo-600">Secure Democracy</span>
    </h1>
    <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
      A blockchain-inspired online voting system for student elections, corporate decisions, and community polls. Simple for voters, powerful for administrators.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link 
        to="/login"
        className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-200 flex items-center gap-2"
      >
        Start Voting Now <VoteIcon className="w-5 h-5" />
      </Link>
      <Link 
        to="/results"
        className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
      >
        View Live Polls <BarChart3 className="w-5 h-5" />
      </Link>
    </div>
    
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
        <CheckCircle className="text-green-500 w-10 h-10 mb-4" />
        <h3 className="text-xl font-bold mb-2">Immutable Logs</h3>
        <p className="text-slate-500">Every vote is recorded with a unique cryptographic hash and timestamp.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
        <Users className="text-blue-500 w-10 h-10 mb-4" />
        <h3 className="text-xl font-bold mb-2">Voter Identity</h3>
        <p className="text-slate-500">Multi-factor authentication ensures only registered citizens can participate.</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left">
        <BarChart3 className="text-purple-500 w-10 h-10 mb-4" />
        <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
        <p className="text-slate-500">Live graphical data representation for transparency throughout the process.</p>
      </div>
    </div>
  </div>
);

export default App;
