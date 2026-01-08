
import React from 'react';
import { SQL_SCHEMA } from '../constants';
import { 
  BookOpen, 
  Database, 
  Network, 
  ShieldAlert, 
  ArrowRightLeft, 
  CheckCircle2, 
  HelpCircle,
  FileCode,
  Layout,
  Terminal
} from 'lucide-react';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-block p-4 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4">Project Documentation</h1>
        <p className="text-xl text-slate-500">Comprehensive guide for the SecureVote Online Voting System project.</p>
      </div>

      <div className="space-y-20">
        {/* Project Overview */}
        <section id="overview" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">1. Project Overview</h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 leading-relaxed text-slate-600">
            <p className="mb-4">
              The <strong>SecureVote Online Voting System</strong> is a digital platform designed to facilitate secure, transparent, and efficient electoral processes. 
              The system eliminates traditional paper-based voting hurdles by allowing voters to cast their ballots from any location through a secure web interface.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Target Audience</h4>
                <p className="text-sm">Educational institutions, Corporate boardrooms, and Local community organizations.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Core Purpose</h4>
                <p className="text-sm">To provide a manipulation-proof voting environment with real-time auditing capabilities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section id="architecture" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Network className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">2. System Architecture</h2>
          </div>
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
            <div className="flex flex-col items-center gap-8">
              <div className="w-full max-w-2xl flex flex-col items-center gap-4">
                <div className="w-full p-4 bg-blue-100 border-2 border-blue-200 rounded-xl text-center font-bold text-blue-800">Presentation Layer (React + Tailwind)</div>
                <div className="w-1 h-8 bg-slate-200"></div>
                <div className="w-full p-4 bg-indigo-100 border-2 border-indigo-200 rounded-xl text-center font-bold text-indigo-800">Logic Layer (PHP / Node.js Controllers)</div>
                <div className="w-1 h-8 bg-slate-200"></div>
                <div className="w-full p-4 bg-emerald-100 border-2 border-emerald-200 rounded-xl text-center font-bold text-emerald-800">Data Layer (MySQL Database)</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
                <div className="text-center">
                  <h4 className="font-bold text-slate-900 mb-2 underline decoration-indigo-300 underline-offset-4">Frontend</h4>
                  <p className="text-sm text-slate-500">React Hooks, Component-based UI, Responsive Design.</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-slate-900 mb-2 underline decoration-indigo-300 underline-offset-4">Backend</h4>
                  <p className="text-sm text-slate-500">Secure API routes, Session management, JWT (optional).</p>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-slate-900 mb-2 underline decoration-indigo-300 underline-offset-4">Database</h4>
                  <p className="text-sm text-slate-500">Relational schema with ACID properties and constraints.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section id="dataflow" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <ArrowRightLeft className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">3. Data Flow Explanation</h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <ol className="space-y-6">
              {[
                "Voter registers via the registration form; data is validated and hashed before storage.",
                "Admin logs in and adds candidates to the database with specific details and images.",
                "Voter logs in, session is established, and the system checks 'has_voted' status.",
                "Ballot is presented; voter selects a candidate and confirms.",
                "Vote is recorded, 'has_voted' flag is set to true (Database atomicity ensures no duplicates).",
                "Results are updated instantly and displayed via graphical charts for all users."
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">{i+1}</span>
                  <p className="text-slate-600 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Database Schema */}
        <section id="database" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">4. Database Schema (MySQL)</h2>
          </div>
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute top-4 right-8 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-mono text-sm border-b border-slate-800 pb-2">
              <Terminal className="w-4 h-4" /> schema_v1.sql
            </div>
            <pre className="text-indigo-300 font-mono text-sm overflow-x-auto">
              <code>{SQL_SCHEMA}</code>
            </pre>
          </div>
        </section>

        {/* Setup Guide */}
        <section id="setup" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">5. Setup Instructions (XAMPP)</h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold mb-2">Step 1: Installation</h4>
                <p className="text-sm text-slate-600">Download and Install XAMPP. Open XAMPP Control Panel and Start <strong>Apache</strong> and <strong>MySQL</strong>.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold mb-2">Step 2: Database Creation</h4>
                <p className="text-sm text-slate-600">Go to <code>http://localhost/phpmyadmin</code>. Create a new database named <code>online_voting_db</code>. Import the SQL file provided above.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold mb-2">Step 3: Project Deployment</h4>
                <p className="text-sm text-slate-600">Place the project folder in <code>C:/xampp/htdocs/voting_system</code>. Ensure <code>config.php</code> has correct database credentials.</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold mb-2">Step 4: Launch</h4>
                <p className="text-sm text-slate-600">Open your browser and navigate to <code>http://localhost/voting_system</code>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages & Limitations */}
        <section id="analysis" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">6. Advantages & Limitations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
              <h4 className="text-green-800 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Key Advantages
              </h4>
              <ul className="space-y-3 text-sm text-green-700 font-medium">
                <li>• No duplicate voting (DB Unique Constraints)</li>
                <li>• Real-time automated counting</li>
                <li>• Accessible from anywhere with internet</li>
                <li>• Transparent result display</li>
                <li>• Reduced costs vs paper ballots</li>
              </ul>
            </div>
            <div className="bg-red-50/50 p-8 rounded-3xl border border-red-100">
              <h4 className="text-red-800 font-bold mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Current Limitations
              </h4>
              <ul className="space-y-3 text-sm text-red-700 font-medium">
                <li>• Requires continuous internet access</li>
                <li>• Vulnerable to phishing (User side)</li>
                <li>• Lacks physical receipt (VVPAT)</li>
                <li>• Dependency on server uptime</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Viva Q&A */}
        <section id="viva" className="scroll-mt-24 pb-20">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold">7. Viva Questions & Answers</h2>
          </div>
          <div className="space-y-6">
            {[
              { q: "What is the primary key in the 'voters' table?", a: "The 'id' column is the primary key. Additionally, 'voter_id' and 'email' are unique keys to prevent duplicate records." },
              { q: "How do you prevent SQL Injection in this project?", a: "We use Prepared Statements with PHP's PDO or MySQLi extension to ensure that user inputs are treated as data, not executable code." },
              { q: "Explain the one-voter-one-vote logic.", a: "We have a 'has_voted' boolean column in the voter table. Before processing a vote, the system checks if this is false. After voting, it's set to true immediately." },
              { q: "Which hashing algorithm is used for passwords?", a: "PHP's password_hash() which defaults to BCrypt. It includes a random salt to prevent rainbow table attacks." }
            ].map((qa, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="font-bold text-indigo-700 mb-2">Q: {qa.q}</p>
                <p className="text-slate-600 text-sm">A: {qa.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
