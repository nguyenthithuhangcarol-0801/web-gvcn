import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, CheckCircle, XCircle, Clock, Plus, Upload, Check } from 'lucide-react';

export const LeaveRequestsModule = () => {
  const { leaveRequests, currentRole, activeStudent, submitLeaveRequest, approveLeaveRequest } = useApp();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState('2026-09-15');
  const [reason, setReason] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Vui lòng nhập lý do nghỉ học!');
      return;
    }
    submitLeaveRequest({ date: leaveDate, reason, proofUrl });
    setShowSubmitModal(false);
    setReason('');
    alert('Đã nộp phiếu xin phép nghỉ học trực tuyến thành công đến GVCN!');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Phiếu Xin Phép Nghỉ Học Trực Tuyến</h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Tự động đồng bộ Chuyên cần
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Phụ huynh gửi đơn trực tuyến → GVCN duyệt → Tự động chuyển thành Vắng có phép</p>
        </div>

        {currentRole === 'PARENT' && (
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nộp Đơn Xin Nghỉ Mới</span>
          </button>
        )}
      </div>

      {/* Leave Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {leaveRequests.map(req => (
          <div key={req.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm">{req.studentName}</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">12A9</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Phụ huynh: {req.parentName} ({req.parentPhone}) • Ngày nộp: {req.appliedAt}
                </p>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border ${
                req.status === 'APPROVED'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : req.status === 'REJECTED'
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse'
              }`}>
                {req.status === 'APPROVED' ? '🔵 Đã duyệt (Vắng có phép)' : req.status === 'REJECTED' ? '❌ Không duyệt' : '⏳ Chờ GVCN duyệt'}
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1">
              <p><strong>Ngày xin nghỉ:</strong> <span className="font-bold text-indigo-700">{req.leaveDate}</span></p>
              <p><strong>Lý do nghỉ:</strong> {req.reason}</p>
              {req.proofUrl && (
                <div className="pt-1">
                  <a href={req.proofUrl} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Xem minh chứng bác sĩ/giấy tờ kèm theo
                  </a>
                </div>
              )}
            </div>

            {/* Teacher Action Controls (Point #13 requirement) */}
            {currentRole === 'GVCN' && req.status === 'PENDING' && (
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => approveLeaveRequest(req.id, false, "Không đủ lý do chính đáng")}
                  className="px-3.5 py-1.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" /> ❌ Từ chối
                </button>
                <button
                  onClick={() => approveLeaveRequest(req.id, true, "Đã duyệt đơn")}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> ✅ Duyệt & Đồng bộ Chuyên cần
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Leave Modal (Parent View) */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base">ĐƠN XIN PHÉP NGHỈ HỌC TRỰC TUYẾN</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Học sinh:</label>
                <input
                  type="text"
                  disabled
                  value={`${activeStudent.fullName} (Lớp 12A9)`}
                  className="w-full text-xs bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Ngày nghỉ:</label>
                <input
                  type="date"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Lý do nghỉ học:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập lý do cụ thể (ốm, việc gia đình...)"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Link ảnh minh chứng (nếu có):</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Gửi GVCN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
