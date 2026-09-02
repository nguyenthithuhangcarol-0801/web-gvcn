import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Download, FileSpreadsheet, FileText, CheckCircle, AlertTriangle, Printer } from 'lucide-react';

export const ReportsModule = () => {
  const { classInfo, students } = useApp();

  const atRiskStudents = students.filter(s => s.atRisk);
  const improvingStudents = students.filter(s => s.scoreTrend === 'IMPROVING');

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Báo Cáo Tự Động Cho GVCN ⭐</h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Tổng hợp tuần / tháng
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Tự động tổng hợp chỉ số sĩ số, chuyên cần, vi phạm, học sinh tiến bộ & học sinh cần quan tâm</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Đã xuất file Excel báo cáo lớp 12A9 tháng 9!")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>In / Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card (Point #20 requirement) */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 p-8 shadow-lg space-y-6 max-w-4xl mx-auto">
        <div className="text-center border-b border-slate-200 pb-5 space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">TRƯỜNG THPT CHUYÊN NGUYỄN DU</div>
          <h2 className="text-2xl font-black text-slate-900">BÁO CÁO LỚP 12A9 – THÁNG 9/2026</h2>
          <p className="text-xs text-slate-600 font-medium">Giáo viên chủ nhiệm: <strong>{classInfo.gvcnName}</strong></p>
        </div>

        {/* Executive Summary Metrics Table */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-xs text-slate-500 font-semibold">Sĩ số lớp</div>
            <div className="text-xl font-black text-slate-900">50 HS</div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="text-xs text-emerald-800 font-semibold">Tỷ lệ chuyên cần</div>
            <div className="text-xl font-black text-emerald-900">97,2%</div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <div className="text-xs text-amber-800 font-semibold">Số lượt đi trễ</div>
            <div className="text-xl font-black text-amber-900">12 lượt</div>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-center">
            <div className="text-xs text-rose-800 font-semibold">Số lượt vi phạm</div>
            <div className="text-xl font-black text-rose-900">8 lượt</div>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-center col-span-2 md:col-span-1">
            <div className="text-xs text-indigo-800 font-semibold">Số HS tiến bộ</div>
            <div className="text-xl font-black text-indigo-900">14 HS</div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Top Improved Students */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-3">
            <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>TOP HỌC SINH TIẾN BỘ RÕ RỆT THÁNG 9</span>
            </h4>
            <div className="space-y-2 text-xs">
              {improvingStudents.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-emerald-100 font-medium text-slate-800">
                  <strong>{s.fullName} ({s.group}):</strong> GPA {s.scores.gpa} • Môn Toán tăng +2.4 điểm, tích cực hỗ trợ bạn bè.
                </div>
              ))}
            </div>
          </div>

          {/* Attention Needed Students */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-3">
            <h4 className="font-bold text-rose-950 text-xs uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>DANH SÁCH HỌC SINH CẦN QUAN TÂM NỔI BẬT</span>
            </h4>
            <div className="space-y-2 text-xs">
              {atRiskStudents.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-rose-100 font-medium text-slate-800">
                  <strong>{s.fullName} ({s.group}):</strong> {s.atRiskReason}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
