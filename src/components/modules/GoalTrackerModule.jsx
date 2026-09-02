import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, CheckCircle2, Award, MessageSquare, Sparkles, Send } from 'lucide-react';

export const GoalTrackerModule = () => {
  const { activeStudent, currentRole, updateGoalProgress, addTeacherFeedbackToGoal } = useApp();
  const [progressVal, setProgressVal] = useState(activeStudent.goals?.progressPercent || 80);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [selfReflectionText, setSelfReflectionText] = useState({
    good: activeStudent.goals?.monthlyReflection?.good || '',
    improve: activeStudent.goals?.monthlyReflection?.improve || '',
    nextGoal: activeStudent.goals?.monthlyReflection?.nextGoal || ''
  });

  const handleSaveProgress = () => {
    updateGoalProgress(activeStudent.id, progressVal, selfReflectionText);
    alert('Đã cập nhật tiến độ mục tiêu & tự đánh giá tháng thành công!');
  };

  const handleSendTeacherFeedback = () => {
    if (!feedbackInput.trim()) return;
    addTeacherFeedbackToGoal(activeStudent.id, feedbackInput);
    setFeedbackInput('');
    alert('Đã gửi phản hồi của GVCN đến học sinh!');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-100 text-xs font-extrabold uppercase tracking-wider mb-1">
              <Target className="w-4 h-4" />
              <span>Goal Tracker – Mục tiêu cá nhân ⭐ (Khuyên dùng THPT / Lớp 12)</span>
            </div>
            <h2 className="text-2xl font-black">{activeStudent.fullName} – Lớp 12A9</h2>
            <p className="text-amber-100 text-xs mt-1">Xác định mục tiêu năm học, cập nhật tiến độ & Tự đánh giá cuối tháng</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-center">
            <div className="text-xs text-amber-100 font-medium">Tiến độ tổng thể</div>
            <div className="text-3xl font-black text-white">{activeStudent.goals.progressPercent}%</div>
          </div>
        </div>
      </div>

      {/* Target Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <span>🎯 Mục tiêu Điểm TB (GPA)</span>
          </div>
          <div className="text-xl font-black text-slate-900">&ge; {activeStudent.goals.gpaTarget}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Hiện tại: {activeStudent.scores.gpa}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <span>🎯 Mục tiêu Tiếng Anh</span>
          </div>
          <div className="text-xl font-black text-slate-900">&ge; {activeStudent.goals.englishTarget}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Hiện tại: {activeStudent.scores.english} (Đạt mốc)</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <span>🎯 Mục tiêu Chuyên cần</span>
          </div>
          <div className="text-xl font-black text-slate-900">{activeStudent.goals.punctualityTarget}</div>
          <p className="text-[11px] text-amber-600 font-semibold">Đã đi trễ {activeStudent.attendanceStats.late} lần</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs space-y-1 bg-indigo-50/30">
          <div className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
            <span>🎯 Ước mơ Đại học</span>
          </div>
          <div className="text-sm font-black text-indigo-950">{activeStudent.goals.universityTarget}</div>
          <p className="text-[11px] text-indigo-600 font-semibold">Mục tiêu thi ĐH năm 2027</p>
        </div>
      </div>

      {/* Visual Progress Bar Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Tiến độ hoàn thành mục tiêu (Progress Bar)</h3>
          <span className="font-mono text-sm font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
            ████████░░ {activeStudent.goals.progressPercent}%
          </span>
        </div>

        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${activeStudent.goals.progressPercent}%` }}
          ></div>
        </div>

        {/* Student Progress Slider */}
        {currentRole === 'STUDENT' && (
          <div className="pt-2 flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-600">Kéo slider để cập nhật % tiến độ:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progressVal}
              onChange={(e) => setProgressVal(Number(e.target.value))}
              className="flex-1 accent-indigo-600"
            />
            <span className="text-xs font-black text-indigo-700">{progressVal}%</span>
          </div>
        )}
      </div>

      {/* Monthly Self Reflection & Teacher Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Monthly Self Assessment */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Cuối tháng học sinh tự đánh giá (Monthly Self-Assessment)</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">✅ Điều mình đã làm tốt:</label>
              <textarea
                rows={2}
                disabled={currentRole !== 'STUDENT'}
                value={selfReflectionText.good}
                onChange={(e) => setSelfReflectionText({ ...selfReflectionText, good: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">⚠️ Điều cần cải thiện:</label>
              <textarea
                rows={2}
                disabled={currentRole !== 'STUDENT'}
                value={selfReflectionText.improve}
                onChange={(e) => setSelfReflectionText({ ...selfReflectionText, improve: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">🎯 Mục tiêu tháng tới:</label>
              <textarea
                rows={2}
                disabled={currentRole !== 'STUDENT'}
                value={selfReflectionText.nextGoal}
                onChange={(e) => setSelfReflectionText({ ...selfReflectionText, nextGoal: e.target.value })}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {currentRole === 'STUDENT' && (
              <button
                onClick={handleSaveProgress}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs"
              >
                Lưu Đánh Giá Tháng
              </button>
            )}
          </div>
        </div>

        {/* Right: Teacher Direct Feedback */}
        <div className="bg-indigo-950/5 border border-indigo-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>Phản hồi trực tiếp từ GVCN (Teacher Feedback)</span>
          </h3>

          <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-950">Thầy Nguyễn Quốc Đạt (GVCN)</span>
              <span className="text-[10px] text-slate-400">Vừa xong</span>
            </div>
            <p className="text-xs text-slate-700 italic">
              "{activeStudent.goals.monthlyReflection.teacherFeedback || 'Chưa có nhận xét.'}"
            </p>
          </div>

          {currentRole === 'GVCN' && (
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-indigo-900 block">Viết phản hồi động viên học sinh:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập lời khuyên / nhận xét của GVCN..."
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="flex-1 text-xs bg-white border border-indigo-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendTeacherFeedback}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
