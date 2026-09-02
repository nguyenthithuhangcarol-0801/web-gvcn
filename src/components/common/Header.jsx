import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Users, ShieldAlert, Bell, Search, GraduationCap, LogIn, User, LogOut, Home } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export const Header = ({ onReturnToPortal }) => {
  const { currentRole, switchRole, classInfo, activeStudent, setSelectedStudentId, students, authUser, userProfile, handleLogout, setActiveTab } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 lg:px-8 py-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToPortal}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 hover:scale-105 transition-transform"
            title="Quay lại Cổng Chọn Vai Trò Đăng Nhập Ban Đầu"
          >
            <GraduationCap className="w-6 h-6" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight">
                {classInfo.className} <span className="text-indigo-600 font-medium text-xs px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">{classInfo.cohort}</span>
              </h1>
              <button
                onClick={onReturnToPortal}
                className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3 h-3 text-indigo-600" />
                <span>Cổng Chọn Vai Trò</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 font-medium">{classInfo.schoolName} • {classInfo.gvcnName}</p>
          </div>
        </div>

        {/* Center: Live Class Quick Counters */}
        <div className="hidden xl:flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-200/80 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-700">
            <Users className="w-4 h-4 text-slate-500" />
            <span>Sĩ số: <strong className="text-slate-900">{classInfo.totalStudents}</strong></span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-1.5 text-emerald-700">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Có mặt: <strong className="text-emerald-800">{classInfo.presentToday}/50</strong></span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center gap-1.5 text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Trễ: <strong className="text-amber-800">{classInfo.lateToday}</strong></span>
          </div>
        </div>

        {/* Right: Role Switcher & User Auth Pill */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Select Active Student Scope */}
          {(currentRole === 'STUDENT' || currentRole === 'PARENT') && (
            <select
              value={activeStudent.id}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="text-xs bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {currentRole === 'PARENT' ? `PH ${s.fullName}` : s.fullName} ({s.studentCode})
                </option>
              ))}
            </select>
          )}

          {/* Role Switcher Pill Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => switchRole('GVCN')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentRole === 'GVCN'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👩‍🏫</span>
              <span>GVCN</span>
            </button>
            <button
              onClick={() => switchRole('STUDENT')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentRole === 'STUDENT'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👨‍🎓</span>
              <span>Học sinh</span>
            </button>
            <button
              onClick={() => switchRole('PARENT')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                currentRole === 'PARENT'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👨‍👩‍👧</span>
              <span>Phụ huynh</span>
            </button>
          </div>

          {/* AUTH Button / User Profile Pill */}
          {authUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('user_profile')}
                className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span className="max-w-24 truncate">{userProfile.full_name || authUser.email}</span>
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  if (onReturnToPortal) onReturnToPortal();
                }}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>🔑 Đăng Nhập / PIN</span>
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal Component */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};
