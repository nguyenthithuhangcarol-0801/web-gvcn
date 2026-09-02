import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  Clock,
  BookOpen,
  Star,
  ClipboardList,
  Megaphone,
  MessageSquare,
  FilePlus,
  ArrowRight
} from 'lucide-react';

export const ParentPortalModule = () => {
  const { activeStudent, setActiveTab, announcements, tasks } = useApp();

  const unreadAnnouncementsCount = announcements.filter(a => a.pendingCount > 0).length;
  const uncompletedTasksCount = tasks.filter(t => !t.completedStudents.includes(activeStudent.id)).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-amber-200 text-xs font-extrabold uppercase tracking-wider">
          <span>👨‍👩‍👧 DÀNH RIÊNG CHO PHỤ HUYNH</span>
        </div>
        <h2 className="text-2xl font-black">{activeStudent.fullName} – LỚP 12A9</h2>
        <p className="text-amber-100 text-xs">Phụ huynh: {activeStudent.fatherName || activeStudent.motherName} ({activeStudent.fatherPhone})</p>
      </div>

      {/* Simplified Dashboard Card (Point #19 requirement) */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base">TỔNG QUAN TÌNH HÌNH CỦA CON THÁNG 9</h3>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-200">
            Học lực Khá/Giỏi
          </span>
        </div>

        {/* 6 Metric Quick Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Tỷ lệ chuyên cần</span>
            </div>
            <div className="text-2xl font-black text-emerald-950">{activeStudent.attendanceStats.rate}%</div>
            <p className="text-[10px] text-emerald-700">Đi học rất đúng giờ</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Số lần đi trễ</span>
            </div>
            <div className="text-2xl font-black text-amber-950">{activeStudent.attendanceStats.late} lần</div>
            <p className="text-[10px] text-amber-700">Trễ dưới 15 phút</p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1">
            <div className="text-xs font-semibold text-indigo-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Điểm trung bình (GPA)</span>
            </div>
            <div className="text-2xl font-black text-indigo-950">{activeStudent.scores.gpa}</div>
            <p className="text-[10px] text-indigo-700">Tiếng Anh 9.0 • Toán 8.5</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
            <div className="text-xs font-semibold text-purple-800 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-purple-600" />
              <span>🌟 Điểm cộng tháng</span>
            </div>
            <div className="text-2xl font-black text-purple-950">{activeStudent.emulationPoints} đ</div>
            <p className="text-[10px] text-purple-700">Tuyên dương nề nếp</p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
            <div className="text-xs font-semibold text-rose-800 flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-rose-600" />
              <span>📌 Tasks chưa xong</span>
            </div>
            <div className="text-2xl font-black text-rose-950">{uncompletedTasksCount}</div>
            <p className="text-[10px] text-rose-700">Nhiệm vụ nộp VNeID</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
            <div className="text-xs font-semibold text-blue-800 flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-blue-600" />
              <span>📢 Thông báo mới</span>
            </div>
            <div className="text-2xl font-black text-blue-950">{unreadAnnouncementsCount}</div>
            <p className="text-[10px] text-blue-700">Cần bấm xác nhận</p>
          </div>
        </div>

        {/* Quick Action Buttons for Parents */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveTab('attendance')}
            className="p-3.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <FilePlus className="w-4 h-4 text-emerald-400" />
              <span>Nộp Đơn Xin Phép Nghỉ</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className="p-3.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-amber-300" />
              <span>Xác Nhận Họp PH</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className="p-3.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-all flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Chat Riêng Với GVCN</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
