import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, LogIn, UserPlus, ArrowLeft, ArrowRight, ShieldCheck, Mail, Lock, Key, Send, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

export const LandingLoginPortal = ({ onEnterApp }) => {
  const {
    switchRole,
    handleLoginEmail,
    handleRegisterEmail,
    handleGoogleLogin,
    handleGmailMagicLink,
    handleParentPinLookup,
    handleActivateLicenseKey,
    students
  } = useApp();

  // Step 1: 'SELECT_ROLE' | Step 2: 'AUTH_FORM'
  const [step, setStep] = useState('SELECT_ROLE');
  const [selectedRole, setSelectedRole] = useState(null); // 'GVCN' | 'STUDENT' | 'PARENT'

  // Auth Form mode inside Step 2: 'LOGIN' | 'REGISTER' | 'GMAIL' | 'PARENT_PIN' | 'VIP_LICENSE'
  const [authMode, setAuthMode] = useState('LOGIN');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [parentPin, setParentPin] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Step 1 -> Choose Role Action
  const onChooseRole = (roleCode) => {
    setSelectedRole(roleCode);
    switchRole(roleCode);
    if (roleCode === 'PARENT') {
      setAuthMode('PARENT_PIN');
    } else {
      setAuthMode('GMAIL');
    }
    setStep('AUTH_FORM');
  };

  // Step 2 -> Back to Select Role
  const onBackToRoleSelection = () => {
    setStep('SELECT_ROLE');
    setSelectedRole(null);
    setMessage('');
  };

  // Handlers for Auth Actions
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await handleLoginEmail(email, password);
    setLoading(false);
    if (res.success) {
      onEnterApp();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await handleRegisterEmail(email, password, fullName);
    setLoading(false);
    if (res.success) {
      alert('Đăng ký tài khoản thành công!');
      onEnterApp();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  const onGoogleOAuth = async () => {
    setLoading(true);
    const res = await handleGoogleLogin();
    setLoading(false);
    if (res.success) {
      onEnterApp();
    }
  };

  const onGmailMagicLink = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setMessage('');
    const res = await handleGmailMagicLink(email);
    setLoading(false);
    if (res.success) {
      onEnterApp();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  const onParentPinSubmit = (e) => {
    e.preventDefault();
    if (!parentPin.trim()) return;
    const res = handleParentPinLookup(parentPin);
    if (res.success) {
      onEnterApp();
    } else {
      setMessage('❌ Mã PIN không chính xác. Thử ví dụ: PIN-STU001');
    }
  };

  const onVIPLicenseSubmit = (e) => {
    e.preventDefault();
    if (!licenseKey.trim()) return;
    const res = handleActivateLicenseKey(licenseKey);
    if (res.success) {
      alert(`🎉 Đã kích hoạt mã VIP! Vai trò: ${res.grantedRole}`);
      onEnterApp();
    } else {
      setMessage(`❌ ${res.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Inter',sans-serif] flex flex-col justify-between p-4 lg:p-8 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Branding Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/40">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              TRUNG TÂM ĐIỀU HÀNH LỚP HỌC 12A9
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-400/30">CLASS OF 2027</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Hệ thống hỗ trợ GVCN - Học sinh - Phụ huynh</p>
          </div>
        </div>

        {step === 'AUTH_FORM' && (
          <button
            onClick={onBackToRoleSelection}
            className="text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Chọn lại Vai Trò khác</span>
          </button>
        )}
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">
        {/* BƯỚC 1: CHỌN VAI TRÒ TRƯỚC (STEP 1: ROLE SELECTION) */}
        {step === 'SELECT_ROLE' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 px-4 py-1.5 rounded-full text-xs font-bold shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>BƯỚC 1: VUI LÒNG CHỌN VAI TRÒ CỦA BẠN</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                BẠN TRUY CẬP VỚI VAI TRÒ NÀO?
              </h2>
              <p className="text-sm text-slate-400">
                Chọn vai trò bên dưới để đến màn hình Đăng nhập / Đăng ký phù hợp dành riêng cho bạn.
              </p>
            </div>

            {/* 3 Role Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* ROLE 1: GIÁO VIÊN CHỦ NHIỆM */}
              <div
                onClick={() => onChooseRole('GVCN')}
                className="bg-slate-800/90 backdrop-blur-md rounded-3xl border-2 border-indigo-500/30 p-6 space-y-5 hover:border-indigo-500 transition-all shadow-xl cursor-pointer group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-3xl font-bold shadow-inner">
                  👩‍🏫
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest">Quyền Quản Lý Lớp</span>
                  <h3 className="text-xl font-black text-white">Giáo Viên Chủ Nhiệm</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dành cho GVCN quản lý sĩ số, điểm danh, nề nếp, điểm số, thông báo, báo cáo & AI Assistant.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-extrabold text-indigo-400 group-hover:text-indigo-300">
                  <span>Tiếp tục đăng nhập GVCN</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* ROLE 2: HỌC SINH */}
              <div
                onClick={() => onChooseRole('STUDENT')}
                className="bg-slate-800/90 backdrop-blur-md rounded-3xl border-2 border-emerald-500/30 p-6 space-y-5 hover:border-emerald-500 transition-all shadow-xl cursor-pointer group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl font-bold shadow-inner">
                  👨‍🎓
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-widest">Dành Cho Học Sinh</span>
                  <h3 className="text-xl font-black text-white">Học Sinh Lớp 12A9</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Xem hồ sơ cá nhân, làm nhiệm vụ lớp, Goal Tracker, thứ hạng thi đua & gửi Student Voice.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-extrabold text-emerald-400 group-hover:text-emerald-300">
                  <span>Tiếp tục đăng nhập Học Sinh</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* ROLE 3: PHỤ HUYNH */}
              <div
                onClick={() => onChooseRole('PARENT')}
                className="bg-slate-800/90 backdrop-blur-md rounded-3xl border-2 border-amber-500/30 p-6 space-y-5 hover:border-amber-500 transition-all shadow-xl cursor-pointer group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-3xl font-bold shadow-inner">
                  👨‍👩‍👧
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">Dành Cho Phụ Huynh</span>
                  <h3 className="text-xl font-black text-white">Phụ Huynh Học Sinh</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Tra cứu nhanh bằng Mã PIN (không cần tạo account), xem báo cáo của con & nhắn tin với GVCN.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-extrabold text-amber-400 group-hover:text-amber-300">
                  <span>Tiếp tục tra cứu Phụ Huynh</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BƯỚC 2: MÀN HÌNH ĐĂNG NHẬP / ĐĂNG KÝ CHO VAI TRÒ ĐÃ CHỌN (STEP 2: AUTH FORM) */}
        {step === 'AUTH_FORM' && (
          <div className="max-w-md mx-auto space-y-6 animate-fade-in">
            {/* Header role indicator */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
                BƯỚC 2: ĐĂNG NHẬP VỚI VAI TRÒ {selectedRole === 'GVCN' ? '👩‍🏫 GIÁO VIÊN CHỦ NHIỆM' : selectedRole === 'STUDENT' ? '👨‍🎓 HỌC SINH' : '👨‍👩‍👧 PHỤ HUYNH'}
              </span>
              <h2 className="text-2xl font-black text-white pt-2">VUI LÒNG ĐĂNG NHẬP</h2>
            </div>

            {/* Auth Form Box */}
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl space-y-5 border border-slate-200">
              {/* Tab options depending on role */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-[11px] font-bold">
                <button
                  onClick={() => setAuthMode('GMAIL')}
                  className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'GMAIL' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600'}`}
                >
                  Gmail 1-Click
                </button>
                <button
                  onClick={() => setAuthMode('LOGIN')}
                  className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'LOGIN' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setAuthMode('REGISTER')}
                  className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'REGISTER' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Đăng Ký
                </button>

                {selectedRole === 'PARENT' && (
                  <button
                    onClick={() => setAuthMode('PARENT_PIN')}
                    className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'PARENT_PIN' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'}`}
                  >
                    Mã PIN
                  </button>
                )}

                {selectedRole === 'GVCN' && (
                  <button
                    onClick={() => setAuthMode('VIP_LICENSE')}
                    className={`flex-1 py-2 rounded-xl transition-all ${authMode === 'VIP_LICENSE' ? 'bg-indigo-900 text-white shadow-xs' : 'text-slate-600'}`}
                  >
                    Mã VIP
                  </button>
                )}
              </div>

              {message && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                  {message}
                </div>
              )}

              {/* MODE 1: GMAIL 1-CLICK */}
              {authMode === 'GMAIL' && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={onGoogleOAuth}
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span className="text-base">🌐</span>
                    <span>Đăng nhập 1-Click bằng Gmail / Google</span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-2 text-[10px] text-slate-400 font-bold uppercase">hoặc nhập Gmail để nhận link</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  <form onSubmit={onGmailMagicLink} className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Địa chỉ Gmail của bạn:</label>
                      <input
                        type="email"
                        required
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Vào Hệ Thống Ngay</span>
                    </button>
                  </form>
                </div>
              )}

              {/* MODE 2: EMAIL LOGIN */}
              {authMode === 'LOGIN' && (
                <form onSubmit={onLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email:</label>
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
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mật khẩu:</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>Đăng Nhập</span>
                  </button>
                </form>
              )}

              {/* MODE 3: EMAIL REGISTER */}
              {authMode === 'REGISTER' && (
                <form onSubmit={onRegisterSubmit} className="space-y-3.5">
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

              {/* MODE 4: PARENT PIN (FOR PARENT ROLE) */}
              {authMode === 'PARENT_PIN' && (
                <form onSubmit={onParentPinSubmit} className="space-y-3.5">
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium space-y-1">
                    <p className="font-bold">🔑 Tra cứu nhanh dành cho Phụ huynh:</p>
                    <p className="text-[11px] text-amber-800">
                      Nhập mã PIN do GVCN cung cấp (Ví dụ: <code className="bg-amber-200 px-1 font-bold">PIN-STU001</code>) để xem ngay tình hình học tập của con.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mã PIN Tra Cứu:</label>
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
                    Xem Báo Cáo Của Con Ngay
                  </button>
                </form>
              )}

              {/* MODE 5: VIP LICENSE (FOR GVCN ROLE) */}
              {authMode === 'VIP_LICENSE' && (
                <form onSubmit={onVIPLicenseSubmit} className="space-y-3.5">
                  <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-indigo-900 text-xs font-medium space-y-1">
                    <p className="font-bold">✨ Kích hoạt quyền Giáo Viên Chủ Nhiệm:</p>
                    <p className="text-[11px] text-indigo-800">
                      Nhập mã VIP (<code className="bg-indigo-200 px-1 font-bold">GVCN-VIP-2026</code>) để kích hoạt toàn bộ 22 module quản lý.
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mã Kích Hoạt VIP/License:</label>
                    <input
                      type="text"
                      required
                      placeholder="GVCN-VIP-2026"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
                  >
                    Kích Hoạt & Vào Bàn Làm Việc GVCN
                  </button>
                </form>
              )}

              {/* Quick Demo Skip Button */}
              <button
                type="button"
                onClick={onEnterApp}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-indigo-600 pt-2 block"
              >
                ⚡ Bỏ qua đăng nhập, dùng thử ngay →
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl mx-auto w-full text-center py-4 border-t border-slate-800 text-xs text-slate-500">
        <p>© 2026 Class Management System • Trường THPT Phạm Phú Thứ</p>
      </footer>
    </div>
  );
};
