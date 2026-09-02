import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Phone,
  Mail,
  Home,
  Users,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  FileText,
  Lock,
  Plus
} from 'lucide-react';

export const StudentProfileModule = () => {
  const { students, selectedStudentId, setSelectedStudentId } = useApp();
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [filterGroup, setFilterGroup] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInternalNotes, setShowInternalNotes] = useState(true);

  const filteredStudents = students.filter(s => {
    const matchesGroup = filterGroup === 'ALL' || s.group === filterGroup;
    const matchesSearch = s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || s.studentCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Quản Lý Hồ Sơ Học Sinh (Student Profiles)</h2>
          <p className="text-xs text-slate-500">Xem thông tin chi tiết, liên hệ gia đình & Timeline quá trình rèn luyện cả năm</p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Tìm tên hoặc mã HS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
          />
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">Tất cả tổ (50 HS)</option>
            <option value="Tổ 1">Tổ 1</option>
            <option value="Tổ 2">Tổ 2</option>
            <option value="Tổ 3">Tổ 3</option>
            <option value="Tổ 4">Tổ 4</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Student List Left + Active Profile Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Student Selector List */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredStudents.map(s => {
            const isSelected = selectedStudent.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedStudent(s);
                  setSelectedStudentId(s.id);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.avatar}
                    alt={s.fullName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{s.fullName}</span>
                      {s.atRisk && <span className="w-2 h-2 rounded-full bg-rose-500" title="Học sinh cần lưu ý"></span>}
                    </div>
                    <div className="text-[11px] text-slate-500">{s.studentCode} • {s.group}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-indigo-600 block">{s.emulationPoints} đ</span>
                  <span className="text-[10px] text-slate-500 font-medium">Rank #{s.rank}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Profile Card & Timeline */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          {/* Header info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.fullName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/20 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900">{selectedStudent.fullName}</h3>
                  <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {selectedStudent.studentCode}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ngày sinh: {selectedStudent.dob} • Giới tính: {selectedStudent.gender} • {selectedStudent.group}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl border border-emerald-200">
                Chuyên cần: {selectedStudent.attendanceStats.rate}%
              </span>
              <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-xl border border-amber-200">
                Thi đua: {selectedStudent.emulationPoints} đ
              </span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Contact & Family */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Gia đình & Liên hệ</span>
              </h4>
              <div className="space-y-1 text-slate-600">
                <p><strong>Điện thoại HS:</strong> {selectedStudent.phone}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Cha:</strong> {selectedStudent.fatherName} ({selectedStudent.fatherJob}) - {selectedStudent.fatherPhone}</p>
                <p><strong>Mẹ:</strong> {selectedStudent.motherName} ({selectedStudent.motherJob}) - {selectedStudent.motherPhone}</p>
              </div>
            </div>

            {/* Academic & Conduct */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Học tập & Rèn luyện</span>
              </h4>
              <div className="space-y-1 text-slate-600">
                <p><strong>Điểm TB (GPA):</strong> <strong className="text-indigo-700">{selectedStudent.scores.gpa}</strong></p>
                <p><strong>Môn mạnh:</strong> {selectedStudent.scores.english >= 8.5 ? 'Tiếng Anh, Toán' : 'Toán'}</p>
                <p><strong>Hạnh kiểm:</strong> {selectedStudent.conductGrade}</p>
                <p><strong>Nghỉ học:</strong> {selectedStudent.attendanceStats.excused + selectedStudent.attendanceStats.unexcused} buổi ({selectedStudent.attendanceStats.late} lần đi trễ)</p>
              </div>
            </div>
          </div>

          {/* Internal Teacher Confidential Notes */}
          <div className="bg-indigo-950/5 border border-indigo-200 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Ghi chú nội bộ của GVCN (Bảo mật - Chỉ GVCN xem)</span>
              </h4>
              <button
                onClick={() => setShowInternalNotes(!showInternalNotes)}
                className="text-[11px] text-indigo-600 font-semibold hover:underline"
              >
                {showInternalNotes ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            {showInternalNotes && (
              <p className="text-xs text-indigo-900 italic bg-white/70 p-2.5 rounded-lg border border-indigo-100">
                "Học sinh có tư duy môn Tiếng Anh rất tốt. Cần động viên em tập trung môn Ngữ văn hơn. Phụ huynh rất quan tâm phối hợp cùng GVCN."
              </p>
            )}
          </div>

          {/* TIMELINE HỌC SINH (Yêu cầu quan trọng điểm #3) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Timeline Hoạt Động & Tiến Trình Cả Năm</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">Toàn bộ vết rèn luyện</span>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200">
              {selectedStudent.timeline.map((entry, idx) => (
                <div key={idx} className="relative group">
                  {/* Circle Marker */}
                  <div className={`absolute -left-[23px] top-0.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow-xs ${
                    entry.points > 0
                      ? 'bg-emerald-500 text-white'
                      : entry.points < 0
                      ? 'bg-rose-500 text-white'
                      : 'bg-indigo-500 text-white'
                  }`}>
                    {entry.points > 0 ? '+' : entry.points < 0 ? '-' : '•'}
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-indigo-700">{entry.date}</span>
                      {entry.points !== 0 && (
                        <span className={`font-black px-2 py-0.5 rounded-md text-[11px] ${
                          entry.points > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {entry.points > 0 ? `+${entry.points}` : entry.points} đ
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900">{entry.title}</div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
