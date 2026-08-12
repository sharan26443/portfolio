import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticCard } from './MagneticCard';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  Sparkles,
  Command,
  AlertCircle,
  Loader2,
  Server,
  ShieldCheck,
} from 'lucide-react';

interface ServerResponseDetails {
  id: string;
  recipient: string;
  status: 'sent' | 'queued' | 'simulated';
  note: string;
}

export const TerminalContact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'terminal'>('form');

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [responseDetails, setResponseDetails] = useState<ServerResponseDetails | null>(null);

  // Copy Feedback Toast State
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Terminal State & Handler
  const [inputVal, setInputVal] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([
    {
      command: 'system --init',
      output: (
        <span>
          <span className="text-[#ffd1ff] font-bold">SARAVANAN R A Interactive Shell v2.4</span> [Connected to Express Backend]
          <br />
          Type <span className="text-[#e0c3fc] font-bold">help</span> or <span className="text-[#ffd1ff] font-bold">status</span> to check server gateway.
        </span>
      ),
    },
  ]);

  const handleTerminalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    let res: React.ReactNode = '';

    if (lowerCmd === 'help') {
      res = (
        <div className="space-y-1">
          <div className="text-[#ffd1ff] font-bold">Available Commands:</div>
          <div>• <span className="text-[#e0c3fc]">status</span> — Check Full-Stack API & Mailbox Gateway</div>
          <div>• <span className="text-[#e0c3fc]">cat info.txt</span> — Display bio & background</div>
          <div>• <span className="text-[#e0c3fc]">skills</span> — Query technical stack</div>
          <div>• <span className="text-[#e0c3fc]">send &lt;email&gt; &lt;needs/message&gt;</span> — Quick dispatch message from CLI</div>
          <div>• <span className="text-[#e0c3fc]">contact</span> — Output email ({PERSONAL_INFO.contact.email}) and phone</div>
          <div>• <span className="text-[#e0c3fc]">clear</span> — Wipe terminal output</div>
        </div>
      );
    } else if (lowerCmd === 'status') {
      res = (
        <div className="text-[#e0c3fc]">
          ✔ Web3Forms Direct Mail Gateway Active<br />
          Target Mailbox: <span className="text-[#ffd1ff] font-bold">{PERSONAL_INFO.contact.email}</span><br />
          API Status: Online & Operational
        </div>
      );
    } else if (lowerCmd === 'cat info.txt' || lowerCmd === 'info') {
      res = `${PERSONAL_INFO.fullName} | ${PERSONAL_INFO.preTitle}. B.Tech IT & AWS Certified Solutions Architect.`;
    } else if (lowerCmd === 'skills') {
      res = "Languages: Python, Java, C++, JS/TS, SQL | Cloud: AWS (EC2, S3, Lambda, IAM), Docker, Git | Backend: Django, Flask, Express APIs";
    } else if (lowerCmd === 'inbox' || lowerCmd === 'messages') {
      res = (
        <span className="text-[#e0c3fc]">
          🔒 <span className="font-bold">Confidentiality Protection Active</span>: Submitted message logs are private and delivered directly to recipient mailbox ({PERSONAL_INFO.contact.email}).
        </span>
      );
    } else if (lowerCmd.startsWith('send ')) {
      const parts = cmd.split(' ');
      if (parts.length >= 3) {
        const cliEmail = parts[1];
        const cliMsg = parts.slice(2).join(' ');
        try {
          const apiRes = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              access_key: '463ff1bf-5731-47e6-b278-9b956b284127',
              name: 'CLI Shell User',
              email: cliEmail,
              subject: 'Interactive Shell Inquiry',
              message: cliMsg,
            }),
          });
          const apiData = await apiRes.json();
          if (apiRes.ok && apiData.success) {
            res = (
              <span className="text-[#ffd1ff]">
                ✔ Message dispatched successfully via Web3Forms! Delivered to {PERSONAL_INFO.contact.email}.
              </span>
            );
          } else {
            res = <span className="text-rose-300">Error: {apiData.message || 'Failed to dispatch via Web3Forms.'}</span>;
          }
        } catch (err) {
          res = <span className="text-rose-300">Network error connecting to Web3Forms API.</span>;
        }
      } else {
        res = "Usage: send <your_email> <your_message>";
      }
    } else if (lowerCmd === 'contact') {
      res = `Target Mailbox: ${PERSONAL_INFO.contact.email} | Phone: ${PERSONAL_INFO.contact.phone} | GitHub: ${PERSONAL_INFO.contact.githubUser}`;
    } else if (lowerCmd === 'clear') {
      setTerminalOutput([]);
      setInputVal('');
      return;
    } else {
      res = `Command '${cmd}' not recognized. Type 'help' or 'status'.`;
    }

    setTerminalOutput((prev) => [...prev, { command: cmd, output: res }]);
    setInputVal('');
  };

  // Direct Web3Forms API Form Submission Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitError('Please fill in your name, email ID, and your project/role requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '463ff1bf-5731-47e6-b278-9b956b284127',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Inquiry from ${formData.name}`,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResponseDetails({
          id: `w3f-${Math.random().toString(36).substring(2, 8)}`,
          recipient: PERSONAL_INFO.contact.email,
          status: 'sent',
          note: data.message || 'Your inquiry has been sent directly to Saravanan R A via Web3Forms API!',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError(data.message || 'Failed to send message via Web3Forms API. Please try again.');
      }
    } catch (err: any) {
      console.error('Web3Forms submission error:', err);
      setSubmitError('Network error connecting to Web3Forms API. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 z-10 max-w-7xl mx-auto">
      
      {/* Background Accent Blur */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffd1ff]/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/90 text-xs font-sans font-semibold text-[#4c1d95]">
          <Server className="w-4 h-4 text-[#7c3aed]" />
          <span>Inquire & Connect</span>
        </div>
        <h2 className="font-art font-normal text-4xl sm:text-6xl text-[#1e1b4b]">
          Direct <span className="text-gradient-pastel font-serif-luxury italic font-bold">Communication</span>
        </h2>
        <p className="text-[#334155] max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium">
          Submit your requirements and email ID below. Messages are transmitted directly to Saravanan R A's mailbox (<span className="text-[#6d28d9] font-serif-luxury italic font-bold">{PERSONAL_INFO.contact.email}</span>).
        </p>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'form'
                ? 'bg-[#6d28d9] text-white shadow-md'
                : 'glass-panel text-[#4338ca] hover:text-[#1e1b4b]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Submit Needs Form</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'terminal'
                ? 'bg-[#6d28d9] text-white shadow-md'
                : 'glass-panel text-[#4338ca] hover:text-[#1e1b4b]'
            }`}
          >
            <Command className="w-4 h-4" />
            <span>Interactive Shell</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Direct Channel Quick Copies & Mailbox Info */}
        <div className="lg:col-span-5 space-y-4">
          
          <MagneticCard intensity={0.7} className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-white/90 space-y-6">
            <div className="flex items-center justify-between border-b border-purple-200 pb-4">
              <h3 className="font-display font-bold text-xl text-[#1e1b4b] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7c3aed]" />
                Recipient Mailbox
              </h3>
              <span className="px-3 py-1 rounded-full text-[10px] font-sans bg-[#e0c3fc]/40 text-[#4c1d95] border border-purple-200 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active
              </span>
            </div>

            {/* Recipient Email Info Box */}
            <div className="p-4 rounded-2xl bg-white/90 border border-purple-200 space-y-2">
              <div className="text-xs font-sans text-[#6d28d9] font-bold uppercase tracking-wider">
                Direct Recipient Address
              </div>
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="text-sm font-sans text-[#1e1b4b] font-bold hover:text-[#6d28d9] block break-all"
              >
                {PERSONAL_INFO.contact.email}
              </a>
              <p className="text-xs text-[#334155] font-sans font-medium leading-relaxed">
                Messages submitted via the form or terminal shell are transmitted directly to this inbox.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-4 rounded-2xl bg-white/80 border border-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#e0c3fc]/40 text-[#6d28d9] border border-purple-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#4338ca] block font-semibold uppercase">Personal Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.contact.email}`}
                    className="text-xs font-sans text-[#1e1b4b] font-bold hover:text-[#6d28d9]"
                  >
                    {PERSONAL_INFO.contact.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.email, 'Email')}
                className="p-2 rounded-full bg-[#e0c3fc]/30 hover:bg-[#e0c3fc] text-[#4c1d95] transition-colors"
                title="Copy Email"
              >
                {copiedItem === 'Email' ? (
                  <Check className="w-4 h-4 text-[#6d28d9]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-2xl bg-white/80 border border-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#ffd1ff]/40 text-[#6d28d9] border border-purple-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#4338ca] block font-semibold uppercase">Phone</span>
                  <a
                    href={`tel:${PERSONAL_INFO.contact.phone.replace(/\s+/g, '')}`}
                    className="text-xs font-sans text-[#1e1b4b] font-bold hover:text-[#6d28d9]"
                  >
                    {PERSONAL_INFO.contact.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(PERSONAL_INFO.contact.phone, 'Phone')}
                className="p-2 rounded-full bg-[#ffd1ff]/30 hover:bg-[#ffd1ff] text-[#4c1d95] transition-colors"
                title="Copy Phone"
              >
                {copiedItem === 'Phone' ? (
                  <Check className="w-4 h-4 text-[#6d28d9]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* GitHub Link */}
            <a
              href={PERSONAL_INFO.contact.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white/80 border border-purple-200 hover:border-[#6d28d9] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-[#4c1d95] border border-purple-200">
                  <Github className="w-5 h-5 group-hover:text-[#6d28d9] transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#4338ca] block font-semibold uppercase">GitHub Profile</span>
                  <span className="text-xs font-sans text-[#1e1b4b] font-bold group-hover:text-[#6d28d9]">
                    {PERSONAL_INFO.contact.githubUser}
                  </span>
                </div>
              </div>
              <Command className="w-4 h-4 text-[#4338ca] group-hover:text-[#6d28d9]" />
            </a>

            {/* LinkedIn Link */}
            <a
              href={PERSONAL_INFO.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white/80 border border-purple-200 hover:border-[#6d28d9] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-[#4c1d95] border border-purple-200">
                  <Linkedin className="w-5 h-5 group-hover:text-[#6d28d9] transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-sans text-[#4338ca] block font-semibold uppercase">LinkedIn Profile</span>
                  <span className="text-xs font-sans text-[#1e1b4b] font-bold group-hover:text-[#6d28d9]">
                    {PERSONAL_INFO.contact.linkedinUser}
                  </span>
                </div>
              </div>
              <Command className="w-4 h-4 text-[#4338ca] group-hover:text-[#6d28d9]" />
            </a>

          </MagneticCard>

        </div>

        {/* Right Column: Main View (Form / Terminal / Server Inbox) */}
        <div className="lg:col-span-7">
          
          {activeTab === 'form' && (
            /* Glassmorphic Full-Stack Contact Form */
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 space-y-5 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-purple-200 pb-4">
                <div>
                  <h3 className="font-display font-bold text-2xl text-[#1e1b4b]">
                    Submit Requirements & Email ID
                  </h3>
                  <p className="text-xs text-[#334155] font-sans mt-0.5 font-medium">
                    Web3Forms dispatches your inquiry directly to <span className="text-[#6d28d9] font-bold">{PERSONAL_INFO.contact.email}</span>.
                  </p>
                </div>
                <div className="p-2.5 rounded-2xl bg-[#e0c3fc]/40 border border-purple-200 text-[#6d28d9]">
                  <Send className="w-5 h-5" />
                </div>
              </div>

              {submitError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-3 animate-in fade-in font-medium">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Transmission Error</span>
                    <span>{submitError}</span>
                  </div>
                </div>
              )}

              {responseDetails ? (
                <div className="p-6 rounded-3xl bg-white/90 border border-emerald-300 text-center space-y-4 animate-in fade-in shadow-md">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-8 h-8 text-emerald-600" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-2xl text-emerald-950">Inquiry Transmitted!</h4>
                    <p className="text-xs text-[#334155] font-sans max-w-md mx-auto font-medium">
                      Your requirements and contact details have been sent directly to Saravanan R A's inbox.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-2 font-sans">
                    <div className="flex justify-between border-b border-emerald-200 pb-2">
                      <span className="text-emerald-800 font-semibold">Target Mailbox:</span>
                      <span className="text-emerald-700 font-bold">{responseDetails.recipient}</span>
                    </div>
                    <div className="flex justify-between border-b border-emerald-200 pb-2">
                      <span className="text-emerald-800 font-semibold">Message Ref ID:</span>
                      <span className="text-slate-800 font-bold">{responseDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-800 font-semibold">Delivery Status:</span>
                      <span className="text-emerald-700 font-bold uppercase">{responseDetails.status}</span>
                    </div>
                    <div className="text-[11px] text-emerald-800 pt-1 leading-relaxed font-medium">
                      💡 {responseDetails.note}
                    </div>
                  </div>

                  <button
                    onClick={() => setResponseDetails(null)}
                    className="px-6 py-2.5 bg-[#6d28d9] hover:bg-[#5b21b6] text-white text-xs font-sans font-bold rounded-full transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-sans font-bold text-[#1e1b4b] block mb-1.5">
                        Your Name <span className="text-[#6d28d9]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="eg. Sharan"
                        className="w-full bg-white/90 border border-purple-200 rounded-2xl px-4 py-3 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#6d28d9]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-sans font-bold text-[#1e1b4b] block mb-1.5">
                        Your Email ID <span className="text-[#6d28d9]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eg. name@gmail.com"
                        className="w-full bg-white/90 border border-purple-200 rounded-2xl px-4 py-3 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#6d28d9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-sans font-bold text-[#1e1b4b] block mb-1.5">
                      Subject / Need Category
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack Web Development / Cloud Architecture Project"
                      className="w-full bg-white/90 border border-purple-200 rounded-2xl px-4 py-3 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#6d28d9]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-sans font-bold text-[#1e1b4b] block mb-1.5">
                      Describe Your Needs & Requirements <span className="text-[#6d28d9]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please enter what you are looking for, project timelines, or role opportunity details..."
                      className="w-full bg-white/90 border border-purple-200 rounded-2xl px-4 py-3 text-xs text-[#0f172a] font-medium focus:outline-none focus:border-[#6d28d9] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to Server Mailbox...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct to {PERSONAL_INFO.contact.email}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          )}

          {activeTab === 'terminal' && (
            /* Cyber Terminal Interface */
            <div className="glass-panel-dark rounded-3xl p-6 border border-[#e0c3fc]/30 font-mono text-xs shadow-2xl space-y-4">
              
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-purple-200 text-xs ml-2 font-sans font-bold">saravanan@cloud-node:~</span>
                </div>
                <span className="text-[10px] text-[#e0c3fc] font-sans font-semibold">express-api / nodemailer</span>
              </div>

              {/* Terminal Logs Output Area */}
              <div className="space-y-3 min-h-[280px] max-h-[380px] overflow-y-auto pr-1">
                {terminalOutput.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-purple-200">
                      <span className="text-[#ffd1ff] font-bold">saravanan@cloud:~$</span>
                      <span>{item.command}</span>
                    </div>
                    <div className="text-white pl-4 border-l-2 border-purple-500/40 py-0.5">
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Command Input */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-purple-800/40">
                <span className="text-[#ffd1ff] font-bold">saravanan@cloud:~$</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type 'status', 'cat info.txt', or 'send email message'..."
                  className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#e0c3fc] hover:bg-[#ffd1ff] text-[#1e1b4b] font-bold rounded-full text-[11px]"
                >
                  Exec
                </button>
              </form>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
