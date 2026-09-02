import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, Key, ShieldCheck, X, Sparkles, LogIn, UserPlus, RefreshCw, Send } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { handleLoginEmail, handleRegisterEmail, handleGoogleLogin, handleGmailMagicLink, handleParentPinLookup, handleResetPasswordOTP } = useApp();

  const [activeTab, setActiveTab] = useState('GMAIL'); // 'GMAIL' | 'LOGIN' | 'REGISTER' | 'PARENT_PIN' | 'FORGOT_OTP'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [parentPin, setParentPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  // Gmail 1-Click Login / Register Trigger
  const onGoogleOAuth = async () => {
    setLoading(true);
    const res = await handleGoogleLogin();
    setLoading(false);
    if (res.success) {
      alert(res.message || 'Đăng nhập bằng tài khoản Gmail / Google thành công!');
      onClose();
    }
  };

  // Gmail Magic Link Submit
  const onGmailMagicLinkSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setMessage('');
    const res = await handleGmailMagicLink(email);
    setLoading(false);
    if (res.success) {
      alert(res.message);
      onClose();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  // Email/Password Login
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await handleLoginEmail(email, password);
    setLoading(false);
    if (res.success) {
      alert('Đăng nhập thành công!');
      onClose();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  // Email/Password Register
  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await handleRegisterEmail(email, password, fullName);
    setLoading(false);
    if (res.success) {
      alert('Đăng ký tài khoản thành công!');
      onClose();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  // Parent PIN Lookup
  const onParentPinSubmit = (e) => {
    e.preventDefault();
    if (!parentPin.trim()) return;
    const res = handleParentPinLookup(parentPin);
    if (res.success) {
      alert(`Chào mừng Phụ huynh! Đã truy cập thành công báo cáo học sinh: ${res.studentName}`);
      onClose();
    } else {
      setMessage('❌ Mã PIN không chính xác. Vui lòng kiểm tra lại mã PIN do GVCN cung cấp.');
    }
  };

  // Forgot Password OTP
  const onResetPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const res = await handleResetPasswordOTP(email);
    setLoading(false);
    if (res.success) {
      alert(`Đã gửi Email mã OTP đặt lại mật khẩu đến: ${email}`);
      setActiveTab('LOGIN');
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('GMAIL')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${activeTab === 'GMAIL' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600'}`}
          >
            <span>🔴</span>
            <span>Gmail</span>
          </button>
          <button
            onClick={() => setActiveTab('LOGIN')}
            className={`flex-1 py-2 rounded-xl transition-all ${activeTab === 'LOGIN' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setActiveTab('REGISTER')}
            className={`flex-1 py-2 rounded-xl transition-all ${activeTab === 'REGISTER' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
          >
            Đăng Ký
          </button>
          <button
            onClick={() => setActiveTab('PARENT_PIN')}
            className={`flex-1 py-2 rounded-xl transition-all ${activeTab === 'PARENT_PIN' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'}`}
          >
            PIN PH
          </button>
        </div>

        {message && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {message}
          </div>
        )}

        {/* TAB 1: GMAIL 1-CLICK & OAUTH (Nổi bật theo yêu cầu mới) */}
        {activeTab === 'GMAIL' && (
          <div className="space-y-4">
            <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 text-red-950 text-xs space-y-1">
              <div className="font-extrabold flex items-center gap-1 text-red-700">
                <span>🔴 Đăng nhập & Tạo mới tài khoản bằng Gmail:</span>
              </div>
              <p className="text-[11px] text-red-900 leading-relaxed">
                Cho phép tạo tài khoản mới hoặc đăng nhập tức thì chỉ bằng 1 cú nhấp chuột qua tài khoản Gmail / Google của bạn.
              </p>
            </div>

            {/* 1-Click Google OAuth Button */}
            <button
              type="button"
              onClick={onGoogleOAuth}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 border border-slate-700"
            >
              <span className="text-base">🌐</span>
              <span>Đăng nhập 1-Click bằng Gmail / Google</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-bold uppercase">hoặc nhập Gmail để nhận link</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Direct Gmail Magic Link Form */}
            <form onSubmit={onGmailMagicLinkSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Địa chỉ Gmail của bạn:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 pl-9 text-slate-800 focus:ring-2 focus:ring-red-500 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Gửi Link Đăng Nhập Đã Chọn Đến Gmail</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: EMAIL LOGIN */}
        {activeTab === 'LOGIN' && (
          <form onSubmit={onLogin} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email:</label>
              <input
                type="email"
                required
                placeholder="name@school.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Mật khẩu:</label>
                <button
                  type="button"
                  onClick={() => setActiveTab('FORGOT_OTP')}
                  className="text-[11px] text-indigo-600 font-semibold hover:underline"
                >
                  Quên mật khẩu OTP?
                </button>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              <span>Đăng Nhập Mật Khẩu</span>
            </button>
          </form>
        )}

        {/* TAB 3: EMAIL REGISTER */}
        {activeTab === 'REGISTER' && (
          <form onSubmit={onRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Họ và tên:</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email đăng ký:</label>
              <input
                type="email"
                required
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mật khẩu (tối thiểu 6 ký tự):</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              <span>Đăng Ký Tài Khoản Mới</span>
            </button>
          </form>
        )}

        {/* TAB 4: PARENT PIN */}
        {activeTab === 'PARENT_PIN' && (
          <form onSubmit={onParentPinSubmit} className="space-y-3.5">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium space-y-1">
              <p className="font-bold flex items-center gap-1">🔑 Tra cứu nhanh dành cho Phụ huynh:</p>
              <p className="text-[11px] text-amber-800">
                Nhập Mã PIN do GVCN cung cấp để xem báo cáo học sinh không cần tạo tài khoản.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Mã PIN Phụ huynh:</label>
              <input
                type="text"
                required
                placeholder="PIN-STU001"
                value={parentPin}
                onChange={(e) => setParentPin(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
            >
              Truy Cập Báo Cáo Của Con
            </button>
          </form>
        )}

        {/* TAB 5: FORGOT OTP */}
        {activeTab === 'FORGOT_OTP' && (
          <form onSubmit={onResetPassword} className="space-y-3.5">
            <div className="text-xs text-slate-600">
              Nhập Gmail / Email tài khoản của bạn để nhận liên kết khôi phục mật khẩu.
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email đăng ký:</label>
              <input
                type="email"
                required
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
            >
              Gửi Email Khôi Phục Mật Khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
