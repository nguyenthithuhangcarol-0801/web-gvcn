import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileCheck,
  AlertOctagon,
  ShieldAlert,
  Save,
  Check,
  FileText
} from 'lucide-react';

export const AttendanceModule = () => {
  const { students, updateAttendance } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-09-02');
  const [attendanceState, setAttendanceState] = useState(
    students.reduce((acc, s) => {
      acc[s.id] = { status: 'PRESENT', reason: '', arrivalTime: '06:55', note: '' };
      return acc;
    }, {})
  );

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status: newStatus }
    }));
  };

  const handleReasonChange = (studentId, text) => {
    setAttendanceState(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], reason: text }
    }));
  };

  const saveAttendanceSession = () => {
    Object.entries(attendanceState).forEach(([studentId, data]) => {
      updateAttendance(studentId, data.status, data.reason);
    });
    alert(`Đã lưu thành công dữ liệu điểm danh ngày ${selectedDate}! Hệ thống đã tự động tính lại tỷ lệ chuyên cần.`);
  };

  const atRiskAttendanceStudents = students.filter(s => s.attendanceStats.excused + s.attendanceStats.unexcused >= 3);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Điểm Danh & Chuyên Cần Hàng Ngày</h2>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Ưu tiên số 1
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Chọn trạng thái, lý do xin phép và cập nhật minh chứng từ phụ huynh</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
            <CalendarCheck className="w-4 h-4 text-indigo-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none"
            />
          </div>
          <button
            onClick={saveAttendanceSession}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Lưu điểm danh</span>
          </button>
        </div>
      </div>

      {/* Threshold Alert Banner if students exceed limit */}
      {atRiskAttendanceStudents.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl flex items-start gap-3 shadow-xs">
          <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider">
              ⚠️ CẢNH BÁO: CÓ {atRiskAttendanceStudents.length} HỌC SINH VƯỢT NGƯỠNG NGHỈ HỌC (&gt;3 BUỔI)
            </h4>
            <p className="text-xs text-rose-800">
              Danh sách học sinh nghỉ nhiều: {atRiskAttendanceStudents.map(s => `${s.fullName} (${s.attendanceStats.excused + s.attendanceStats.unexcused} buổi)`).join(', ')}. GVCN cần trao đổi ngay với phụ huynh!
            </p>
          </div>
        </div>
      )}

      {/* Attendance Check-in Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">DANH SÁCH HỌC SINH LỚP 12A9</span>
          <span className="text-xs text-slate-500 font-medium">Ngày điểm danh: <strong>{selectedDate}</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 pl-5">Học sinh</th>
                <th className="p-3.5">Trạng thái</th>
                <th className="p-3.5">Lý do nghỉ / Ghi chú</th>
                <th className="p-3.5 text-center">Tỷ lệ chuyên cần cả năm</th>
                <th className="p-3.5 text-right pr-5">PH Xác nhận</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map(s => {
                const current = attendanceState[s.id] || { status: 'PRESENT', reason: '' };
                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Student Name & Code */}
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{s.fullName}</div>
                          <div className="text-[10px] text-slate-500">{s.studentCode} • {s.group}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status Pill Options */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleStatusChange(s.id, 'PRESENT')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                            current.status === 'PRESENT'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'
                          }`}
                        >
                          <span>✅</span>
                          <span>Có mặt</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(s.id, 'LATE')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                            current.status === 'LATE'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                          }`}
                        >
                          <span>🟡</span>
                          <span>Đi trễ</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(s.id, 'EXCUSED_ABSENCE')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                            current.status === 'EXCUSED_ABSENCE'
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-indigo-50'
                          }`}
                        >
                          <span>🔵</span>
                          <span>Có phép</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange(s.id, 'UNEXCUSED_ABSENCE')}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                            current.status === 'UNEXCUSED_ABSENCE'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-rose-50'
                          }`}
                        >
                          <span>🔴</span>
                          <span>Không phép</span>
                        </button>
                      </div>
                    </td>

                    {/* Reason input */}
                    <td className="p-3.5">
                      {current.status !== 'PRESENT' ? (
                        <input
                          type="text"
                          placeholder="Nhập lý do nghỉ / trễ..."
                          value={current.reason}
                          onChange={(e) => handleReasonChange(s.id, e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Đúng giờ</span>
                      )}
                    </td>

                    {/* Cumulative Rate */}
                    <td className="p-3.5 text-center font-bold">
                      <div className="text-slate-900">{s.attendanceStats.rate}%</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {s.attendanceStats.present} có mặt / {s.attendanceStats.excused + s.attendanceStats.unexcused} vắng
                      </div>
                    </td>

                    {/* Parent Verification Icon */}
                    <td className="p-3.5 text-right pr-5">
                      <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đã xác nhận</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
