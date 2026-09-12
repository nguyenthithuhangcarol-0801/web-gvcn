import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, QrCode, Copy, Check, Sparkles, School, Users, RefreshCw, Share2, Download, ShieldCheck, Link as LinkIcon } from 'lucide-react';

export const ClassCreationModule = () => {
  const { classInfo, createNewClass, currentRole, joinClassByCode } = useApp();

  const [copied, setCopied] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinMessage, setJoinMessage] = useState('');

  const [formData, setFormData] = useState({
    className: '12A1',
    cohort: 'CLASS OF 2027',
    academicYear: '2026-2027',
    schoolName: 'Trường THPT Phạm Phú Thứ',
    expectedStudents: 45
  });

  const joinLink = `${window.location.origin}/?joinCode=${classInfo.joinCode || 'L12A9X'}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(joinLink)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newClass = createNewClass(formData);
    alert(`🎉 Tạo lớp học mới thành công!\nTên lớp: ${newClass.className}\nMã Join Code: ${newClass.joinCode}`);
    setShowCreateModal(false);
  };

  const handleJoinClass = (e) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;
    const res = joinClassByCode(joinCodeInput);
    if (res.success) {
      setJoinMessage(`🟢 Gia nhập lớp thành công! Đã tham gia lớp: ${res.className}`);
      setJoinCodeInput('');
    } else {
      setJoinMessage(`❌ ${res.error}`);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/30 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-bold text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CLAS-01: Quản Lý & Khởi Tạo Lớp Học</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight">
            TẠO LỚP HỌC MỚI & BỘ MÃ JOIN CODE / QR CODE
          </h2>
          <p className="text-xs text-indigo-200 max-w-2xl leading-relaxed">
            Hệ thống tự động khởi tạo Mã Lớp (6 ký tự) và Mã QR Code gia nhập công khai. Học sinh & Phụ huynh có thể quét bằng camera điện thoại để tham gia lớp học tức thì.
          </p>
        </div>

        {currentRole === 'GVCN' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl transition-all shadow-lg flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo Lớp Học Mới</span>
          </button>
        )}
      </div>

      {/* Grid: Live Join Code & QR Display + Join Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Current Active Class Join Code & QR Card (7 Cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-widest">Lớp Học Hiện Tại</span>
              <h3 className="text-lg font-black text-slate-900">{classInfo.className} - {classInfo.cohort}</h3>
            </div>
            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-xs px-3 py-1 rounded-full">
              {classInfo.schoolName}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* 6-Character Join Code Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 text-center space-y-3 shadow-lg border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">MÃ LỚP GIA NHẬP (JOIN CODE)</span>
              <div className="text-3xl font-black tracking-widest font-mono text-emerald-400 bg-slate-950 py-2.5 rounded-xl border border-slate-800 shadow-inner select-all">
                {classInfo.joinCode || 'L12A9X'}
              </div>
              <p className="text-[10px] text-slate-400">Dùng mã 6 ký tự này để nhập khi Đăng Nhập vào lớp</p>
            </div>

            {/* Live QR Code Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center space-y-2 flex flex-col items-center">
              <img
                src={qrCodeImageUrl}
                alt="QR Code Gia Nhập Lớp"
                className="w-36 h-36 rounded-xl border-2 border-white shadow-md object-contain"
              />
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-indigo-600" /> Quét QR để tham gia lớp
              </span>
            </div>
          </div>

          {/* Copy Direct Join Link Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Link gia nhập trực tiếp cho học sinh & PH:</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={joinLink}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã Sao Chép!' : 'Sao Chép'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Join Class via Code Form (5 Cols) */}
        <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-3">
              <LinkIcon className="w-4 h-4 text-indigo-600" />
              <span>Gia Nhập Lớp Bằng Mã Join Code</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nếu bạn là Học sinh hoặc Phụ huynh mới, hãy nhập Mã Lớp 6 ký tự (Ví dụ: <code className="bg-slate-100 font-bold px-1 text-slate-900">L12A9X</code>) do Giáo viên cung cấp để tham gia lớp học ngay.
            </p>

            {joinMessage && (
              <div className={`p-3 rounded-xl text-xs font-bold border ${joinMessage.startsWith('🟢') ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
                {joinMessage}
              </div>
            )}

            <form onSubmit={handleJoinClass} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mã Lớp (Join Code 6 ký tự):</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="L12A9X"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                  className="w-full text-sm font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 uppercase tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
              >
                Gia Nhập Lớp Ngay
              </button>
            </form>
          </div>

          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 space-y-1">
            <span className="font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Bảo mật lớp học:</span>
            <p className="text-indigo-800">Mã Lớp sinh tự động và duy nhất cho từng lớp, giúp bảo mật dữ liệu học sinh tuyệt đối.</p>
          </div>
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Khởi Tạo Lớp Học Mới (CLAS-01)</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên Lớp Học (Ví dụ: 12A1, 10B2):</label>
                <input
                  type="text"
                  required
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Niên khóa (Cohort):</label>
                <input
                  type="text"
                  required
                  value={formData.cohort}
                  onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên Trường Học:</label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Sĩ số dự kiến:</label>
                <input
                  type="number"
                  required
                  value={formData.expectedStudents}
                  onChange={(e) => setFormData({ ...formData, expectedStudents: parseInt(e.target.value) || 40 })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 text-[11px]">
                ✨ Khi tạo lớp mới, hệ thống sẽ <strong>tự động sinh Mã Lớp 6 ký tự</strong> &amp; <strong>QR Code</strong> gia nhập ngay lập tức.
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md"
              >
                Khởi Tạo Lớp &amp; Sinh Join Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
