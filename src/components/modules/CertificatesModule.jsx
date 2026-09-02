import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Download, Printer, Sparkles } from 'lucide-react';

export const CertificatesModule = () => {
  const { students, classInfo } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [awardTitle, setAwardTitle] = useState('🏆 Student of the Month');

  const targetStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const presetTitles = [
    '🏆 Student of the Month',
    '🌟 Most Improved Student (Tiến Bộ Nhất)',
    '🤝 Outstanding Contribution',
    '📚 Academic Excellence',
    '💙 Kindness Award'
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Khen Thưởng – Tự Động Tạo Certificate Giấy Khen</h2>
          <p className="text-xs text-slate-500">Tự động xuất Giấy khen điện tử cho học sinh xuất sắc & học sinh tiến bộ nhất</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Xuất PDF / In Giấy Khen</span>
          </button>
        </div>
      </div>

      {/* Generator Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700 shrink-0">Học sinh được khen:</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.group})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700 shrink-0">Danh hiệu:</label>
          <select
            value={awardTitle}
            onChange={(e) => setAwardTitle(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          >
            {presetTitles.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Printable Certificate Template Card (Point #18 requirement) */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/50 p-10 rounded-3xl border-8 border-double border-amber-300 shadow-2xl text-center space-y-6 relative overflow-hidden max-w-3xl mx-auto">
        <div className="absolute top-4 left-4 text-3xl">🏅</div>
        <div className="absolute top-4 right-4 text-3xl">🌟</div>

        <div className="space-y-1">
          <div className="text-xs font-black tracking-widest text-amber-800 uppercase">TRƯỜNG THPT CHUYÊN NGUYỄN DU • LỚP 12A9</div>
          <h2 className="text-3xl font-black text-amber-950 uppercase tracking-tight pt-2">CERTIFICATE OF ACHIEVEMENT</h2>
          <p className="text-xs font-semibold text-amber-700 italic">GIẤY KHEN VẪN CỨ VUI & VINH DANH THÀNH TÍCH</p>
        </div>

        <div className="space-y-2 py-4 border-y border-amber-200">
          <p className="text-xs text-slate-600">Tuyên dương & Trao tặng danh hiệu cho học sinh:</p>
          <h3 className="text-3xl font-black text-indigo-950 font-serif tracking-wide">{targetStudent.fullName}</h3>
          <p className="text-xs font-bold text-slate-700">Lớp 12A9 – Niên khóa 2026-2027</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-slate-600">Vì đã đạt thành tích xuất sắc với danh hiệu:</p>
          <div className="text-xl font-black text-amber-900 bg-amber-200/60 inline-block px-6 py-2 rounded-2xl border border-amber-300 shadow-2xs">
            {awardTitle}
          </div>
        </div>

        <div className="pt-8 flex items-center justify-between text-xs text-slate-700">
          <div>
            <p className="font-semibold">Ngày trao tặng: 30/09/2026</p>
            <p className="text-[10px] text-slate-500">Mã chứng nhận: CERT-12A9-2026</p>
          </div>

          <div className="text-center font-bold">
            <p className="text-indigo-950">GIÁO VIÊN CHỦ NHIỆM</p>
            <p className="text-indigo-600 font-serif italic text-lg pt-4">{classInfo.gvcnName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
