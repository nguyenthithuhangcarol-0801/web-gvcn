import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  FileSpreadsheet,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Search,
  CheckCircle,
  FileText
} from 'lucide-react';

export const AcademicsModule = () => {
  const { students } = useApp();
  const [showImportModal, setShowImportModal] = useState(false);

  const atRiskStudents = students.filter(s => s.atRisk);
  const improvingStudents = students.filter(s => s.scoreTrend === 'IMPROVING');

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Học Tập & Theo Dõi Điểm Số Môn Học</h2>
          <p className="text-xs text-slate-500">Bảng điểm tổng hợp • Tự động phân tích cảnh báo học sinh nguy cơ & học sinh tiến bộ</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Import Bảng Điểm Excel</span>
          </button>
        </div>
      </div>

      {/* AI Automated Early Warning Cards (Yêu cầu quan trọng điểm #7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* At-risk Warning Card */}
        <div className="bg-rose-50 border border-rose-200 p-4.5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>CẢNH BÁO TỰ ĐỘNG: HỌC SINH CÓ NGUY CƠ (&lt; 5.0 HOẶC GIẢM MẠNH)</span>
            </h3>
            <span className="text-xs font-bold bg-rose-200 text-rose-950 px-2.5 py-0.5 rounded-full">
              {atRiskStudents.length} học sinh
            </span>
          </div>

          <div className="space-y-2">
            {atRiskStudents.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-white border border-rose-200 text-xs shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{s.fullName} ({s.studentCode})</span>
                  <span className="text-rose-600 font-extrabold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Điểm Toán {s.scores.math}
                  </span>
                </div>
                <p className="text-[11px] text-rose-800 font-medium">⚠️ {s.atRiskReason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improved Student Card */}
        <div className="bg-emerald-50 border border-emerald-200 p-4.5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>TUYÊN DƯƠNG: HỌC SINH CÓ TIẾN BỘ RÕ RỆT</span>
            </h3>
            <span className="text-xs font-bold bg-emerald-200 text-emerald-950 px-2.5 py-0.5 rounded-full">
              {improvingStudents.length} học sinh
            </span>
          </div>

          <div className="space-y-2">
            {improvingStudents.map(s => (
              <div key={s.id} className="p-3 rounded-xl bg-white border border-emerald-200 text-xs shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{s.fullName} ({s.studentCode})</span>
                  <span className="text-emerald-700 font-black">GPA {s.scores.gpa}</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  🌟 Môn Toán đạt 9.2 (Điểm 1 tiết cao nhất lớp). Rất chủ động hỗ trợ bạn bè.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">BẢNG ĐIỂM TỔNG HỢP LỚP 12A9</span>
          <span className="text-xs text-slate-500 font-medium">Học kỳ I - Năm học 2026-2027</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 pl-5">Học sinh</th>
                <th className="p-3.5 text-center">Môn Toán</th>
                <th className="p-3.5 text-center">Môn Văn</th>
                <th className="p-3.5 text-center">Môn Anh</th>
                <th className="p-3.5 text-center">Điểm TB (TBA)</th>
                <th className="p-3.5">Xu hướng / Cảnh báo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 pl-5">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900">{s.fullName}</div>
                        <div className="text-[10px] text-slate-500">{s.studentCode} • {s.group}</div>
                      </div>
                    </div>
                  </td>

                  {/* Math Score */}
                  <td className={`p-3.5 text-center font-black ${s.scores.math < 5.0 ? 'text-rose-600 bg-rose-50/60' : 'text-slate-800'}`}>
                    {s.scores.math}
                  </td>

                  {/* Lit Score */}
                  <td className="p-3.5 text-center font-black text-slate-800">
                    {s.scores.literature}
                  </td>

                  {/* English Score */}
                  <td className="p-3.5 text-center font-black text-emerald-700">
                    {s.scores.english}
                  </td>

                  {/* TBA Average */}
                  <td className="p-3.5 text-center font-black text-indigo-700 bg-indigo-50/40">
                    {s.scores.gpa}
                  </td>

                  {/* AI Warning column */}
                  <td className="p-3.5">
                    {s.atRisk ? (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-rose-100 text-rose-900 font-bold px-2.5 py-0.5 rounded-md border border-rose-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Cần lưu ý môn Toán
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Học lực Khá / Giỏi
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Modal Simulation */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base">Import Bảng Điểm Từ File Excel (.xlsx / .csv)</h3>
            <p className="text-xs text-slate-500">Tải lên file dữ liệu bảng điểm theo đúng định dạng mẫu của hệ thống quản lý trường học.</p>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center space-y-2 bg-slate-50">
              <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">Kéo thả file Excel vào đây hoặc click để duyệt file</p>
              <p className="text-[10px] text-slate-400">Hỗ trợ file XLSX, CSV tối đa 10MB</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  alert("Đã import thành công dữ liệu bảng điểm từ Excel!");
                  setShowImportModal(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
              >
                Tải Lên & Phân Tích
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
