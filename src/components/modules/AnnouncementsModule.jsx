import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, CheckCircle2, XCircle, Clock, Eye, Send, Users } from 'lucide-react';

export const AnnouncementsModule = () => {
  const { announcements, activeStudent, currentRole, rsvpAnnouncement } = useApp();
  const [activeAnnouncement, setActiveAnnouncement] = useState(announcements[0]);

  const currentReceipt = activeAnnouncement.receipts.find(r => r.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Thông Báo GVCN – PH – HS</h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Tracking Đã đọc & RSVP ⭐
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Đăng thông báo 1 lần • Phụ huynh bấm xác nhận • GVCN biết ngay ai chưa phản hồi</p>
        </div>

        {currentRole === 'GVCN' && (
          <button
            onClick={() => alert("Mở form tạo thông báo mới...")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Megaphone className="w-4 h-4" />
            <span>Tạo thông báo mới</span>
          </button>
        )}
      </div>

      {/* Main Container: Announcement Detail Left + Live Tracking Dashboard Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Announcement Content Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="border-b border-slate-200 pb-4 space-y-1">
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
              Dành cho: {activeAnnouncement.target}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">{activeAnnouncement.title}</h3>
            <p className="text-xs text-slate-500">Đăng ngày: {activeAnnouncement.date} • GVCN Lớp 12A9</p>
          </div>

          <div className="text-xs text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {activeAnnouncement.content}
          </div>

          <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 text-xs space-y-1 text-indigo-950 font-medium">
            <p><strong>Thời gian:</strong> {activeAnnouncement.eventTime}</p>
            <p><strong>Địa điểm:</strong> {activeAnnouncement.location}</p>
          </div>

          {/* Parent RSVP Action Buttons (Point #11 requirement) */}
          {(currentRole === 'PARENT' || currentRole === 'STUDENT') && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-3">
              <div className="text-xs font-bold text-amber-900">
                📌 XÁC NHẬN TỪ PHỤ HUYNH ({activeStudent.fatherName || activeStudent.fullName}):
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => rsvpAnnouncement(activeAnnouncement.id, 'CONFIRMED')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    currentReceipt?.status === 'CONFIRMED'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <span>✅</span>
                  <span>Xác nhận tham dự</span>
                </button>

                <button
                  onClick={() => rsvpAnnouncement(activeAnnouncement.id, 'CANNOT_ATTEND')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    currentReceipt?.status === 'CANNOT_ATTEND'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-rose-50'
                  }`}
                >
                  <span>❌</span>
                  <span>Không thể tham dự</span>
                </button>
              </div>

              {currentReceipt && (
                <p className="text-[11px] text-amber-800 italic">
                  Trạng thái hiện tại: <strong>{currentReceipt.status === 'CONFIRMED' ? 'Đã xác nhận tham dự' : 'Không thể tham dự'}</strong> ({currentReceipt.time})
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right: Teacher Receipt Tracking Dashboard (Point #11 requirement) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tracking Stats Counters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>GVCN TRACKING KẾT QUẢ XÁC NHẬN</span>
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-center">
                <div className="text-[11px] font-bold text-indigo-700">Đã đọc</div>
                <div className="text-xl font-black text-indigo-900">{activeAnnouncement.readCount}/50</div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                <div className="text-[11px] font-bold text-emerald-700">Xác nhận tham dự</div>
                <div className="text-xl font-black text-emerald-900">{activeAnnouncement.confirmAttendCount}/50</div>
              </div>

              <div className="bg-rose-50 p-3 rounded-xl border border-rose-100 text-center">
                <div className="text-[11px] font-bold text-rose-700">Không tham dự</div>
                <div className="text-xl font-black text-rose-900">{activeAnnouncement.cannotAttendCount}</div>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-center">
                <div className="text-[11px] font-bold text-amber-700">Chưa phản hồi</div>
                <div className="text-xl font-black text-amber-900">{activeAnnouncement.pendingCount}</div>
              </div>
            </div>
          </div>

          {/* Receipt list per parent */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Chi tiết từng Phụ huynh:</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {activeAnnouncement.receipts.map((r, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{r.parentName}</div>
                    <div className="text-[10px] text-slate-500">Phụ huynh học sinh ID {r.studentId}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                    r.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : r.status === 'CANNOT_ATTEND'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.status === 'CONFIRMED' ? '✅ Xác nhận' : r.status === 'CANNOT_ATTEND' ? '❌ Báo bận' : 'Chưa đọc'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
