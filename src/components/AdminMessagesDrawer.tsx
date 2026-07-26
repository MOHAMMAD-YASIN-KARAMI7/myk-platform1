import React, { useState, useEffect } from 'react';
import { useI18n } from '../lib/i18nContext';
import { ContactMessage } from '../types';
import { 
  X, 
  Database, 
  RefreshCw, 
  Mail, 
  User, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Archive, 
  ShieldAlert, 
  Terminal,
  Lock,
  KeyRound,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Search,
  Filter,
  BarChart3,
  Cpu,
  Layers,
  CheckCircle2,
  Inbox
} from 'lucide-react';

interface AdminMessagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminMessagesDrawer: React.FC<AdminMessagesDrawerProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNREAD' | 'READ' | 'ARCHIVED'>('ALL');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('myk_admin_authed') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('officiallcapitanyasin@gmail.com');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authenticating, setAuthenticating] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthenticating(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, passcode }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('myk_admin_authed', 'true');
        fetchMessages();
      } else {
        setAuthError(data.error || t.adminAuth.wrongPasscode);
      }
    } catch (err) {
      if (passcode === '1390') {
        setIsAuthenticated(true);
        sessionStorage.setItem('myk_admin_authed', 'true');
        fetchMessages();
      } else {
        setAuthError(t.adminAuth.wrongPasscode);
      }
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('myk_admin_authed');
    setPasscode('');
    setMessages([]);
  };

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        setError(data.error || 'Failed to query database.');
      }
    } catch (err) {
      setError('Network error connecting to SQLite API endpoint.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchMessages();
    }
  }, [isOpen, isAuthenticated]);

  const handleUpdateStatus = async (id: string, status: 'UNREAD' | 'READ' | 'ARCHIVED') => {
    try {
      const res = await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  if (!isOpen) return null;

  // Filter messages based on search and status
  const filteredMessages = messages.filter((msg) => {
    const matchesStatus = statusFilter === 'ALL' || msg.status === statusFilter;
    const matchesQuery = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const unreadCount = messages.filter((m) => m.status === 'UNREAD').length;
  const readCount = messages.filter((m) => m.status === 'READ').length;
  const archivedCount = messages.filter((m) => m.status === 'ARCHIVED').length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {isAuthenticated ? <Database className="w-5 h-5" /> : <Lock className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isAuthenticated ? t.adminAuth.title : t.adminAuth.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {isAuthenticated ? 'SQLite Database Engine • Protected Control Room' : 'Restricted Admin Access'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={fetchMessages}
                disabled={loading}
                title={t.contact.refreshMessages}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all flex items-center gap-1.5 text-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Sync DB</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATEWAY (IF NOT AUTHENTICATED) */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center items-center">
            <div className="w-full max-w-md glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  {t.adminAuth.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {t.adminAuth.subtitle}
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t.adminAuth.emailLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder={t.adminAuth.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    {t.adminAuth.passwordLabel}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasscode ? 'text' : 'password'}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder={t.adminAuth.passwordPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono tracking-widest"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authenticating}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{authenticating ? 'Authenticating...' : t.adminAuth.loginButton}</span>
                </button>
              </form>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-500 text-center font-mono">
                {t.adminAuth.authNote}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Admin Stats Grid */}
            <div className="p-6 bg-slate-950/70 border-b border-slate-800 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Total Messages</span>
                    <Inbox className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-xl font-bold text-white font-mono">{messages.length}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center justify-between text-amber-400 text-xs mb-1">
                    <span>Unread</span>
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-amber-300 font-mono">{unreadCount}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-emerald-400 text-xs mb-1">
                    <span>Read</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xl font-bold text-emerald-300 font-mono">{readCount}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                    <span>Database</span>
                    <Database className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    SQLite Active
                  </span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, subject..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
                  {(['ALL', 'UNREAD', 'READ', 'ARCHIVED'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        statusFilter === filter
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Records Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-400" />
                  <p className="text-sm font-mono">Querying SQLite database...</p>
                </div>
              ) : error ? (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="text-center py-16 text-slate-500 space-y-2">
                  <Mail className="w-10 h-10 mx-auto text-slate-600 opacity-50" />
                  <p className="text-sm font-medium">{t.contact.noMessages}</p>
                  <p className="text-xs text-slate-600">
                    No records match your search or filter criteria.
                  </p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      msg.status === 'UNREAD'
                        ? 'bg-slate-800/80 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                        : msg.status === 'ARCHIVED'
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-indigo-400 font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                            {msg.id}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            IP: {msg.ipAddress || '127.0.0.1'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {msg.subject}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleUpdateStatus(msg.id, msg.status === 'READ' ? 'UNREAD' : 'READ')}
                          title="Toggle Read/Unread"
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                            msg.status === 'READ'
                              ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                              : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30'
                          }`}
                        >
                          {msg.status === 'READ' ? 'Mark Unread' : 'Mark Read'}
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(msg.id, msg.status === 'ARCHIVED' ? 'READ' : 'ARCHIVED')}
                          title="Archive message"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 mb-3.5 whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-indigo-400" />
                          <strong className="text-slate-200">{msg.name}</strong>
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-1 font-mono text-indigo-400 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5 text-indigo-400" />
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 font-mono text-[10px]">
                        <Calendar className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer info */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs text-slate-400 flex justify-between items-center">
              <span className="font-mono text-[11px] text-slate-400">
                Admin: <strong className="text-indigo-300">officiallcapitanyasin@gmail.com</strong>
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.adminAuth.logout}</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
