import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  PlusCircle,
  MinusCircle,
  Star,
  Flame,
  Trophy,
  Users,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const ConductModule = () => {
  const { students, conductCatalog, badges, groups, addConductPoint } = useApp();
  const [selectedStudentForPoint, setSelectedStudentForPoint] = useState(students[0].id);
  const [noteInput, setNoteInput] = useState('');

  const handleAddPresetPoint = (type, categoryTitle, points) => {
    addConductPoint(selectedStudentForPoint, type, categoryTitle, points, noteInput);
    setNoteInput('');
    alert(`Đã ghi nhận điểm: ${points > 0 ? '+' : ''}${points} (${categoryTitle}) cho học sinh!`);
  };

  const sortedStudents = [...students].sort((a, b) => b.emulationPoints - a.emulationPoints);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Quản Lý Nề Nếp – Thi Đua & Gamification</h2>
          <p className="text-xs text-slate-500">Cộng/Trừ điểm nề nếp với danh mục sẵn có • Bảng thi đua vinh danh & Bộ danh hiệu Badges</p>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs px-3.5 py-2 rounded-xl font-medium">
          <Lock className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Bảo mật: Vi phạm cá nhân chỉ hiển thị riêng cho Học sinh, PH & GVCN (Không bêu tên public)</span>
        </div>
      </div>

      {/* Preset Action Card (Giáo viên chỉ cần bấm) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-700">Chọn học sinh:</label>
            <select
              value={selectedStudentForPoint}
              onChange={(e) => setSelectedStudentForPoint(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.group}) - Hiện tại: {s.emulationPoints}đ
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Ghi chú thêm (không bắt buộc)..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          />
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bonus Points (+5, +10) */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Danh Mục Điểm Cộng (Bonus)</span>
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {conductCatalog.bonus.map(b => (
                <button
                  key={b.code}
                  onClick={() => handleAddPresetPoint('BONUS', b.title, b.points)}
                  className="p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-emerald-950 flex items-center justify-between">
                    <span>{b.title}</span>
                    <span className="text-xs font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md">+{b.points}</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 mt-1">Bấm để cộng điểm ngay</p>
                </button>
              ))}
            </div>
          </div>

          {/* Penalty Points (-5, -10) */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <MinusCircle className="w-4 h-4 text-rose-600" />
              <span>Danh Mục Điểm Trừ (Penalty)</span>
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {conductCatalog.penalty.map(p => (
                <button
                  key={p.code}
                  onClick={() => handleAddPresetPoint('PENALTY', p.title, p.points)}
                  className="p-3 rounded-xl bg-rose-50/70 hover:bg-rose-100 border border-rose-200 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-rose-950 flex items-center justify-between">
                    <span>{p.title}</span>
                    <span className="text-xs font-black bg-rose-600 text-white px-2 py-0.5 rounded-md">{p.points}</span>
                  </div>
                  <p className="text-[10px] text-rose-700 mt-1">Bấm để trừ điểm ngay</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard & Group Standings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Individual Leaderboard (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>🏆 CLASS LEADERBOARD – THÁNG 9/2026</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">Bảng xếp hạng rèn luyện cá nhân</span>
          </div>

          <div className="space-y-2">
            {sortedStudents.map((student, index) => {
              const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;
              return (
                <div
                  key={student.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    index === 0
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-xs'
                      : index === 1
                      ? 'bg-slate-50 border-slate-300'
                      : index === 2
                      ? 'bg-amber-900/5 border-amber-800/20'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-base font-extrabold w-8 text-center">{rankIcon}</span>
                    <img src={student.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{student.fullName}</span>
                        {index === 0 && <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2 py-0.5 rounded-md">TOP 1</span>}
                      </div>
                      <div className="text-[11px] text-slate-500">{student.group} • GPA {student.scores.gpa}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-indigo-700 block">{student.emulationPoints} đ</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">{student.attendanceStats.rate}% Chuyên cần</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Group Standings & Badges (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Group Standings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Thi Đua Theo Tổ (Group Standings)</span>
            </h3>
            <div className="space-y-2">
              {groups.map((g, idx) => (
                <div key={g.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{g.name} (Tổ trưởng: {g.leader})</div>
                    <div className="text-[10px] text-slate-500">Hạng #{g.rank} trong tháng</div>
                  </div>
                  <span className="text-xs font-black bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-lg">
                    {g.points} đ
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Collection (Highlight 🔥 Most Improved - Tiến bộ nhất) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Bộ Danh Hiệu Badges</span>
              </h3>
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-600" /> Most Improved
              </span>
            </div>

            <div className="space-y-2">
              {badges.map(b => (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                    b.code === 'MOST_IMPROVED'
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <span className="text-xl shrink-0">{b.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{b.name}</span>
                      {b.code === 'MOST_IMPROVED' && (
                        <span className="text-[9px] bg-orange-200 text-orange-950 font-black px-1.5 py-0.2 rounded-md">ƯU TIÊN LỚN</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5">{b.desc}</p>
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
