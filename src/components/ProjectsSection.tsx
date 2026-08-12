import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { MagneticCard } from './MagneticCard';
import {
  ExternalLink,
  Github,
  Cloud,
  CheckCircle2,
  Play,
  RefreshCw,
  Plus,
  Terminal,
  Layers,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  // Interactive State for Smart Wallet Demo Widget
  const [walletExpenses, setWalletExpenses] = useState([
    { id: 1, title: 'AWS Cloud Hosting', category: 'Infrastructure', amount: 45.0, date: 'Today' },
    { id: 2, title: 'Python Architecture Manuals', category: 'Learning', amount: 28.5, date: 'Yesterday' },
    { id: 3, title: 'Domain & SSL Certs', category: 'DevOps', amount: 12.0, date: '3 days ago' },
  ]);
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory] = useState('Infrastructure');

  const addWalletExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle || !newExpenseAmount) return;
    const amountNum = parseFloat(newExpenseAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setWalletExpenses([
      {
        id: Date.now(),
        title: newExpenseTitle,
        category: newExpenseCategory,
        amount: amountNum,
        date: 'Just Now',
      },
      ...walletExpenses,
    ]);
    setNewExpenseTitle('');
    setNewExpenseAmount('');
  };

  const totalSpent = walletExpenses.reduce((sum, item) => sum + item.amount, 0);

  // Interactive State for Soulmate Hub Bot Console
  const [botLogs, setBotLogs] = useState<string[]>([
    '[INIT] SoulmateHub Core Async Daemon v2.4 initialized.',
    '[SCALE] Listening across 1,600+ synchronized member channels.',
    '[HEALTH] Heartbeat ok. Latency: 12ms. Async workers: 16 active.',
  ]);

  const executeBotCommand = (cmd: string) => {
    let output = '';
    const timestamp = new Date().toLocaleTimeString();

    switch (cmd) {
      case 'status':
        output = `[${timestamp}] [STATUS] Server Uptime: 99.98% | Active Members: 1,642 | Queue: 0 pending`;
        break;
      case 'scan':
        output = `[${timestamp}] [MODERATION] Scanned 450 recent messages. Anti-spam heuristics: 0 threats detected.`;
        break;
      case 'broadcast':
        output = `[${timestamp}] [EVENT] Scheduled broadcast event: "Weekly Python Architecture Sync" sent to 1,600+ users.`;
        break;
      case 'telemetry':
        output = `[${timestamp}] [TELEMETRY] Peak activity window: 18:00-22:00 UTC. Async rate: 280 events/sec.`;
        break;
      default:
        output = `[${timestamp}] Command executed successfully.`;
    }

    setBotLogs((prev) => [output, ...prev.slice(0, 7)]);
  };

  // Interactive Cloud Pipeline Stages
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'success'>('idle');
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  const triggerCloudPipeline = () => {
    setPipelineState('running');
    setPipelineLogs(['[00:01] GitHub Actions trigger: push on main branch...']);

    setTimeout(() => {
      setPipelineLogs((prev) => [...prev, '[00:03] Linting Python microservice codebase & running unit tests... PASS']);
    }, 800);

    setTimeout(() => {
      setPipelineLogs((prev) => [...prev, '[00:05] Packaging AWS Lambda zip & validating IAM security policy... OK']);
    }, 1600);

    setTimeout(() => {
      setPipelineLogs((prev) => [...prev, '[00:08] Deploying to AWS API Gateway + S3 bucket... SUCCESS']);
      setPipelineState('success');
    }, 2400);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 z-10 max-w-7xl mx-auto">
      
      {/* Background Accent Blur */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#e0c3fc]/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/90 text-xs font-sans font-semibold text-[#4c1d95]">
          <Layers className="w-4 h-4 text-[#7c3aed]" />
          <span>Selected Works & Engineering</span>
        </div>
        <h2 className="font-art font-normal text-4xl sm:text-6xl text-[#1e1b4b]">
          Architectures Built for <span className="text-gradient-pastel font-serif-luxury italic font-bold">Impact</span>
        </h2>
        <p className="text-[#334155] max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium">
          Production software featuring full-stack MVC patterns, high-concurrency async automation, and AWS cloud deployment pipelines.
        </p>
      </div>

      {/* Project Showcase Cards */}
      <div className="space-y-16">
        {PROJECTS_DATA.map((project) => {
          return (
            <MagneticCard
              key={project.id}
              intensity={0.6}
              className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-10 border border-white/90 relative overflow-hidden shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Project Metadata & Engineering Highlights */}
                <div className="lg:col-span-6 space-y-6">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-[#e0c3fc]/40 border border-[#7c3aed]/30 text-xs font-sans text-[#4c1d95] font-bold">
                      {project.category}
                    </span>
                    
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-sans font-bold text-[#4338ca] hover:text-[#6d28d9] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source Code</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#1e1b4b] mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[#6d28d9] font-serif-luxury italic text-sm sm:text-base font-semibold">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-sans font-medium">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-sans text-[#6d28d9] uppercase tracking-wider font-bold">
                      Key Architectural Achievements
                    </h4>
                    {project.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0f172a] font-sans font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#7c3aed] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-2">
                    <h4 className="text-xs font-sans text-[#6d28d9] uppercase tracking-wider mb-2 font-bold">
                      Tech Stack & Ecosystem
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/90 border border-purple-200 text-xs font-sans font-semibold text-[#4c1d95]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Stats Row */}
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-purple-200">
                    {project.stats.map((s, idx) => (
                      <div key={idx} className="bg-white/90 rounded-2xl p-3 border border-purple-200 text-center">
                        <div className="font-display font-bold text-base text-[#6d28d9]">{s.value}</div>
                        <div className="text-[11px] font-sans text-[#334155] font-semibold mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right Side: Interactive Live Demo Simulator Panel */}
                <div className="lg:col-span-6 glass-panel-dark rounded-3xl p-6 border border-[#e0c3fc]/40 space-y-4 shadow-2xl">
                  
                  <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                    <div className="flex items-center gap-2 text-xs font-sans text-white">
                      <Terminal className="w-4 h-4 text-[#e0c3fc]" />
                      <span className="font-bold">Live Interactive System Simulator</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-sans bg-[#e0c3fc]/20 text-[#e0c3fc] border border-[#e0c3fc]/40 font-bold">
                      Interactive Sandbox
                    </span>
                  </div>

                  {/* Demo Widget 1: Smart Wallet Personal Finance */}
                  {project.demoType === 'wallet' && (
                    <div className="space-y-4">
                      
                      {/* Summary Banner */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#111122] p-3.5 rounded-2xl border border-purple-800/40">
                          <span className="text-[11px] font-sans text-purple-200 block">Total Tracked Expenses</span>
                          <span className="font-display font-bold text-xl text-[#ffd1ff]">${totalSpent.toFixed(2)}</span>
                        </div>
                        <div className="bg-[#111122] p-3.5 rounded-2xl border border-purple-800/40">
                          <span className="text-[11px] font-sans text-purple-200 block">MVC DB Status</span>
                          <span className="font-display font-semibold text-xs text-purple-200 flex items-center gap-1.5 mt-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ffd1ff] animate-pulse" />
                            SQLite Connected
                          </span>
                        </div>
                      </div>

                      {/* Add Expense Mini Form */}
                      <form onSubmit={addWalletExpense} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Expense Name (e.g. Server hosting)"
                          value={newExpenseTitle}
                          onChange={(e) => setNewExpenseTitle(e.target.value)}
                          className="flex-1 bg-[#111122] border border-purple-800/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e0c3fc]"
                        />
                        <input
                          type="number"
                          placeholder="$ Amount"
                          value={newExpenseAmount}
                          onChange={(e) => setNewExpenseAmount(e.target.value)}
                          className="w-24 bg-[#111122] border border-purple-800/40 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#e0c3fc]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#e0c3fc] hover:bg-[#ffd1ff] text-[#1e1b4b] rounded-xl text-xs font-sans font-bold flex items-center gap-1 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      </form>

                      {/* Expense Table List */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {walletExpenses.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-[#111122]/90 border border-purple-800/40 text-xs font-sans"
                          >
                            <div>
                              <span className="text-white font-semibold block">{item.title}</span>
                              <span className="text-[10px] text-purple-300">{item.category} • {item.date}</span>
                            </div>
                            <span className="text-[#ffd1ff] font-bold">${item.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* Demo Widget 2: Soulmate Hub Automation Bot Console */}
                  {project.demoType === 'bot' && (
                    <div className="space-y-4">
                      
                      {/* Interactive Bot Trigger Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <button
                          onClick={() => executeBotCommand('status')}
                          className="px-3 py-2 bg-[#111122] hover:bg-purple-900/50 border border-purple-800/40 rounded-xl text-[11px] font-sans text-[#e0c3fc] transition-colors text-left font-semibold"
                        >
                          ⚡ !status
                        </button>
                        <button
                          onClick={() => executeBotCommand('scan')}
                          className="px-3 py-2 bg-[#111122] hover:bg-purple-900/50 border border-purple-800/40 rounded-xl text-[11px] font-sans text-[#e0c3fc] transition-colors text-left font-semibold"
                        >
                          🛡️ !scan
                        </button>
                        <button
                          onClick={() => executeBotCommand('broadcast')}
                          className="px-3 py-2 bg-[#111122] hover:bg-purple-900/50 border border-purple-800/40 rounded-xl text-[11px] font-sans text-[#e0c3fc] transition-colors text-left font-semibold"
                        >
                          📢 !broadcast
                        </button>
                        <button
                          onClick={() => executeBotCommand('telemetry')}
                          className="px-3 py-2 bg-[#111122] hover:bg-purple-900/50 border border-purple-800/40 rounded-xl text-[11px] font-sans text-[#e0c3fc] transition-colors text-left font-semibold"
                        >
                          📊 !telemetry
                        </button>
                      </div>

                      {/* Live CLI Output Log */}
                      <div className="bg-[#111122] rounded-2xl p-4 border border-purple-800/40 text-xs text-white space-y-2 max-h-52 overflow-y-auto font-mono">
                        <div className="text-[10px] font-sans text-purple-300 border-b border-purple-800/40 pb-1">
                          Async Daemon Output Stream:
                        </div>
                        {botLogs.map((log, i) => (
                          <div key={i} className="leading-snug text-[11px]">
                            {log.includes('STATUS') ? (
                              <span className="text-[#ffd1ff]">{log}</span>
                            ) : log.includes('EVENT') ? (
                              <span className="text-[#a1c4fd]">{log}</span>
                            ) : (
                              log
                            )}
                          </div>
                        ))}
                      </div>

                    </div>
                  )}

                  {/* Demo Widget 3: AWS Cloud Pipeline */}
                  {project.demoType === 'cloud' && (
                    <div className="space-y-4">
                      
                      <div className="flex items-center justify-between bg-[#111122] p-3.5 rounded-2xl border border-purple-800/40">
                        <div className="flex items-center gap-3">
                          <Cloud className="w-5 h-5 text-[#e0c3fc]" />
                          <div>
                            <span className="text-xs font-sans font-bold text-white block">AWS Lambda Microservice</span>
                            <span className="text-[10px] font-sans text-purple-300">CI/CD Deploy Pipeline</span>
                          </div>
                        </div>

                        <button
                          onClick={triggerCloudPipeline}
                          disabled={pipelineState === 'running'}
                          className={`px-4 py-2 rounded-full font-sans text-xs font-bold transition-all flex items-center gap-1.5 ${
                            pipelineState === 'running'
                              ? 'bg-purple-950 text-purple-300 cursor-not-allowed'
                              : 'bg-[#e0c3fc] text-[#1e1b4b] hover:bg-[#ffd1ff] shadow-md'
                          }`}
                        >
                          {pipelineState === 'running' ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              Deploying...
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              Trigger CI/CD Deploy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Log Console Output */}
                      <div className="bg-[#111122] rounded-2xl p-4 border border-purple-800/40 font-mono text-[11px] text-white space-y-2 min-h-[120px]">
                        {pipelineLogs.length === 0 ? (
                          <span className="text-purple-300 italic font-sans text-xs">Click "Trigger CI/CD Deploy" to simulate automated AWS Lambda build & release pipeline.</span>
                        ) : (
                          pipelineLogs.map((log, i) => (
                            <div key={i} className="text-[#ffd1ff]">
                              {log}
                            </div>
                          ))
                        )}
                      </div>

                    </div>
                  )}

                </div>

              </div>
            </MagneticCard>
          );
        })}
      </div>

    </section>
  );
};
