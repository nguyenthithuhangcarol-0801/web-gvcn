import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserCheck,
  Clock,
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  BellRing,
  Gift,
  CheckSquare,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DashboardModule = () => {
  const { classInfo, students, tasks, announcements, setActiveTab } = useApp();

  const atRiskStudents = students.filter(s => s.atRisk);
  const unconfirmedAnnouncements = announcements.filter(a => a.pendingCount > 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Trung tâm điều hành lớp học chủ nhiệm</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight">
              {classInfo.className} – {classInfo.cohort}
            </h2>
            <p className="text-indigo-200 text-sm mt-1">
              GVCN: <strong className="text-white">{classInfo.gvcnName}</strong> • {classInfo.schoolName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('attendance')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Điểm danh hôm nay</span>
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all border border-white/20 backdrop-blur-xs flex items-center gap-2"
            >
              <BellRing className="w-4 h-4" />
              <span>Đăng thông báo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Daily Attendance Snapshot Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Sĩ số lớp</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">{classInfo.totalStudents}</div>
          <div className="text-[11px] text-slate-500 font-medium">Học sinh niên khóa 2027</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs space-y-1 bg-emerald-50/30">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-medium">
            <span>Có mặt hôm nay</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-800">{classInfo.presentToday}/50</div>
          <div className="text-[11px] text-emerald-600 font-medium">Đạt 96,0% sĩ số</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs space-y-1 bg-indigo-50/30">
          <div className="flex items-center justify-between text-indigo-700 text-xs font-medium">
            <span>Vắng có phép</span>
            <FileCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-900">{classInfo.excusedAbsence}</div>
          <div className="text-[11px] text-indigo-600 font-medium">Có phiếu đơn PH gửi</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs space-y-1 bg-rose-50/30">
          <div className="flex items-center justify-between text-rose-700 text-xs font-medium">
            <span>Vắng không phép</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-800">{classInfo.unexcusedAbsence}</div>
          <div className="text-[11px] text-rose-600 font-medium font-bold">Cần liên hệ phụ huynh</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs space-y-1 bg-amber-50/30 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-amber-700 text-xs font-medium">
            <span>Đi học muộn</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-800">{classInfo.lateToday}</div>
          <div className="text-[11px] text-amber-600 font-medium">Trễ dưới 15 phút</div>
        </div>
      </div>

      {/* 2. Action Required Widget (Việc cần xử lý ngay) */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Việc cần xử lý ngay (Action Items)</h3>
              <p className="text-xs text-slate-500">Các tác vụ ưu tiên GVCN cần thực hiện trong tuần</p>
            </div>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200">
            5 công việc pending
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            onClick={() => setActiveTab('documents')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">3 học sinh</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-2">Chưa nộp đủ hồ sơ đầu năm</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Thiếu phiếu thông tin & cam kết nội quy</p>
          </div>

          <div
            onClick={() => setActiveTab('announcements')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">5 phụ huynh</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-2">Chưa xác nhận thông báo Họp PH</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Thông báo Họp Phụ Huynh 20/09</p>
          </div>

          <div
            onClick={() => setActiveTab('attendance')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">2 học sinh</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-2">Số buổi nghỉ vượt ngưỡng (&gt;3 buổi)</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Lê Văn C & Nguyễn Văn A</p>
          </div>

          <div
            onClick={() => setActiveTab('calendar')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">4 học sinh</span>
              <Gift className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-2">Có sinh nhật trong tháng này 🎂</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Minh Anh (hôm nay 02/09)</p>
          </div>

          <div
            onClick={() => setActiveTab('tasks')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/40 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">6 nhiệm vụ</span>
              <CheckSquare className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-2">Nhiệm vụ lớp sắp đến hạn nộp</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Bản photo VNeID deadline 05/09</p>
          </div>

          <div
            onClick={() => setActiveTab('ai_assistant')}
            className="p-3.5 rounded-xl border border-indigo-200 hover:border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> AI Assistant
              </span>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs font-bold text-indigo-950 mt-2">Hỏi AI học sinh cần quan tâm</p>
            <p className="text-[11px] text-indigo-700 mt-0.5">Phân tích chuyên cần & điểm số tự động</p>
          </div>
        </div>
      </div>

      {/* 3. Visual Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Chuyên cần theo tuần (% Đi học đúng giờ)</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Tháng 9/2026</span>
          </div>
          <div className="space-y-2 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Tuần 1 (01/09 - 05/09)</span>
                <span className="font-bold text-emerald-700">97.5%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '97.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Tuần 2 (08/09 - 12/09)</span>
                <span className="font-bold text-emerald-700">96.0%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.0%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Tuần 3 (15/09 - 19/09)</span>
                <span className="font-bold text-emerald-700">98.2%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98.2%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Emulation Leaderboard Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Bảng thi đua top đầu tháng 9</span>
            </h3>
            <button
              onClick={() => setActiveTab('conduct')}
              className="text-xs text-indigo-600 font-semibold hover:underline"
            >
              Xem tất cả →
            </button>
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/80">
              <div className="flex items-center gap-3">
                <span className="text-lg">🥇</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">Minh Anh</div>
                  <div className="text-[10px] text-slate-500">Tổ 3 • Điểm 125</div>
                </div>
              </div>
              <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-md">125 đ</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-lg">🥈</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">Gia Huy</div>
                  <div className="text-[10px] text-slate-500">Tổ 1 • Điểm 118</div>
                </div>
              </div>
              <span className="text-xs bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-md">118 đ</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-900/5 border border-amber-900/10">
              <div className="flex items-center gap-3">
                <span className="text-lg">🥉</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ngọc Mai</div>
                  <div className="text-[10px] text-slate-500">Tổ 2 • Điểm 115</div>
                </div>
              </div>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">115 đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
