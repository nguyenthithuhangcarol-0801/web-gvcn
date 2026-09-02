import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ShieldCheck, UserCheck, Users, HeartHandshake, Key, LogIn, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthModal } from './AuthModal';

export const LandingLoginPortal = ({ onEnterApp }) => {
  const { switchRole, handleParentPinLookup, students, setSelectedStudentId } = useApp();
  const [parentPinInput, setParentPinInput] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Parent PIN quick lookup
  const handleParentPinSubmit = (e) => {
    e.preventDefault();
    if (!parentPinInput.trim()) return;
    const res = handleParentPinLookup(parentPinInput);
    if (res.success) {
      onEnterApp();
    } else {
      setErrorMessage('Mã PIN tra cứu không đúng. Vui lòng nhập ví dụ: PIN-STU001');
    }
  };

  // Handle Role Selection Entry
  const handleRoleSelect = (roleCode) => {
    switchRole(roleCode);
    onEnterApp();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Inter',sans-serif] flex flex-col justify-between p-4 lg:p-8 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Branding Bar */}
      <header className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/40">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              TRUNG TÂM ĐIỀU HÀNH LỚP HỌC 12A9
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-400/30">CLASS OF 2027</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Hệ thống hỗ trợ GVCN - Học sinh - Phụ huynh phối hợp toàn diện</p>
          </div>
        </div>

        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-900/50 flex items-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          <span>🔑 Đăng Nhập / Đăng Ký</span>
        </button>
      </header>

      {/* Main Hero & Portal Selection */}
      <main className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 px-4 py-1.5 rounded-full text-xs font-bold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Vui lòng chọn Cổng Đăng Nhập phù hợp với vai trò của bạn</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
            CỔNG ĐĂNG NHẬP THEO VAI TRÒ NGUYÊN BẢN
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Mỗi đối tượng người dùng đều được phân quyền và cung cấp giao diện dành riêng nhằm tối ưu hóa việc theo dõi học tập, nề nếp & trao đổi.
          </p>
        </div>

        {/* 3 Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PORTAL 1: GIÁO VIÊN CHỦ NHIỆM */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-indigo-500/30 p-6 space-y-5 hover:border-indigo-500 transition-all shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center text-2xl font-bold shadow-inner">
                👩‍🏫
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest">Quyền Quản Lý Cao Nhất</span>
                <h3 className="text-xl font-black text-white">Giáo Viên Chủ Nhiệm</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quản lý toàn bộ lớp, hồ sơ 50 HS, điểm danh hàng ngày, rèn luyện, thi đua, bảng điểm, thông báo, báo cáo tự động & Trợ lý AI.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full Dashboard & AI Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Duyệt đơn nghỉ phép & Tạo Giấy khen</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('GVCN')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 group-hover:bg-indigo-500"
            >
              <span>Vào Bàn Làm Việc GVCN</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 2: HỌC SINH */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-emerald-500/30 p-6 space-y-5 hover:border-emerald-500 transition-all shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl font-bold shadow-inner">
                👨‍🎓
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-widest">Góc Học Sinh 12A9</span>
                <h3 className="text-xl font-black text-white">Học Sinh Lớp 12A9</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Xem hồ sơ cá nhân, làm nhiệm vụ lớp, Goal Tracker thiết lập mục tiêu năm học, thứ hạng thi đua & gửi chia sẻ Student Voice.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Goal Tracker mục tiêu ĐH</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>☑ Bấm hoàn thành nhiệm vụ</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRoleSelect('STUDENT')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2 group-hover:bg-emerald-500"
            >
              <span>Vào Góc Học Sinh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PORTAL 3: PHỤ HUYNH (MÃ PIN TRA CỨU / ACCOUNT) */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-amber-500/30 p-6 space-y-5 hover:border-amber-500 transition-all shadow-xl group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-2xl font-bold shadow-inner">
                👨‍👩‍👧
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">Tra Cứu Nhanh Cho Phụ Huynh</span>
                <h3 className="text-xl font-black text-white">Phụ Huynh Học Sinh</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Nhập mã PIN tra cứu riêng (không cần tạo tài khoản) để xem báo cáo tình hình học tập, nộp đơn xin nghỉ phép & nhắn tin GVCN.
                </p>
              </div>

              {/* Parent Quick PIN Form */}
              <form onSubmit={handleParentPinSubmit} className="space-y-2 pt-1">
                <label className="text-[11px] font-bold text-amber-300 block">Nhập mã PIN tra cứu của con:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ví dụ: PIN-STU001"
                    value={parentPinInput}
                    onChange={(e) => setParentPinInput(e.target.value)}
                    className="flex-1 text-xs font-mono font-bold bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-2 text-white uppercase focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3 py-2 rounded-xl shrink-0 transition-all"
                  >
                    Xem Ngay
                  </button>
                </div>
                {errorMessage && <p className="text-[10px] text-rose-400 font-medium">{errorMessage}</p>}
              </form>
            </div>

            <button
              onClick={() => handleRoleSelect('PARENT')}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs py-3.5 rounded-2xl transition-all shadow-lg shadow-amber-900/50 flex items-center justify-center gap-2 group-hover:bg-amber-500"
            >
              <span>Vào Portal Phụ Huynh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto w-full text-center py-4 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 Class Management System • Trường THPT Chuyên Nguyễn Du</p>
        <button
          onClick={() => handleRoleSelect('GVCN')}
          className="text-indigo-400 font-semibold hover:underline"
        >
          ⚡ Dùng thử ngay không cần đăng nhập →
        </button>
      </footer>

      {/* Auth Modal Component */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};
