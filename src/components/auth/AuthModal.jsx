import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, Key, ShieldCheck, X, Sparkles, LogIn, UserPlus, RefreshCw } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { handleLoginEmail, handleRegisterEmail, handleGoogleLogin, handleParentPinLookup, handleResetPasswordOTP } = useApp();

  const [activeTab, setActiveTab] = useState('LOGIN'); // 'LOGIN' | 'REGISTER' | 'FORGOT_OTP' | 'PARENT_PIN'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [parentPin, setParentPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  // AUTH-01: Email/Password Login
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

  // AUTH-01: Email/Password Register
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

  // AUTH-04: Parent PIN Lookup
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

  // AUTH-06: Forgot Password OTP
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
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
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
            Mã PIN PH
          </button>
        </div>

        {message && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {message}
          </div>
        )}

        {/* TAB 1: LOGIN (AUTH-01 & AUTH-02) */}
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
              <span>Đăng Nhập Email</span>
            </button>

            {/* AUTH-02: Google OAuth */}
            <div className="pt-2 border-t border-slate-200 text-center space-y-2">
              <span className="text-[11px] text-slate-400 font-semibold">HOẶC ĐĂNG NHẬP NHANH</span>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>🌐</span>
                <span>Đăng nhập 1-Click bằng Google OAuth</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER (AUTH-01) */}
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
                placeholder="name@school.edu.vn"
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

        {/* TAB 3: PARENT PIN LOOKUP (AUTH-04) */}
        {activeTab === 'PARENT_PIN' && (
          <form onSubmit={onParentPinSubmit} className="space-y-3.5">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium space-y-1">
              <p className="font-bold flex items-center gap-1">🔑 Tra cứu nhanh dành cho Phụ huynh:</p>
              <p className="text-[11px] text-amber-800">
                Nhập Mã PIN (ví dụ: <code className="bg-amber-200/60 px-1 rounded font-bold">PIN-STU001</code>) do GVCN cung cấp để xem báo cáo học sinh mà không cần tạo tài khoản.
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
              Truy Cập Ngay Báo Cáo Của Con
            </button>
          </form>
        )}

        {/* TAB 4: FORGOT PASSWORD OTP (AUTH-06) */}
        {activeTab === 'FORGOT_OTP' && (
          <form onSubmit={onResetPassword} className="space-y-3.5">
            <div className="text-xs text-slate-600">
              Nhập Email tài khoản của bạn để nhận liên kết / Mã OTP khôi phục mật khẩu tự động từ Supabase Auth.
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email đăng ký:</label>
              <input
                type="email"
                required
                placeholder="name@school.edu.vn"
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
