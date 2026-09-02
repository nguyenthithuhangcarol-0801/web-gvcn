import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Vote, MessageSquare, Plus, Send, ShieldCheck } from 'lucide-react';

export const PollsVoiceModule = () => {
  const { polls, studentVoices, activeStudent, currentRole, votePoll, submitStudentVoice } = useApp();
  const [activePoll, setActivePoll] = useState(polls[0]);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [voiceForm, setVoiceForm] = useState({
    category: '💬 Góp ý',
    title: '',
    content: '',
    isAnonymous: true
  });

  const hasVoted = activePoll.votedStudents.includes(activeStudent.id);

  const handleVoiceSubmit = (e) => {
    e.preventDefault();
    if (!voiceForm.content.trim()) return;
    submitStudentVoice(voiceForm);
    setShowVoiceModal(false);
    setVoiceForm({ category: '💬 Góp ý', title: '', content: '', isAnonymous: true });
    alert('Đã gửi ý kiến Góc Học Sinh thành công đến GVCN!');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Khảo Sát & Student Voice (Góc Học Sinh)</h2>
          <p className="text-xs text-slate-500">Tạo poll bình chọn nhanh • Học sinh gửi góp ý, ý tưởng & chia sẻ (Có thể gửi ẩn danh)</p>
        </div>

        {currentRole === 'STUDENT' && (
          <button
            onClick={() => setShowVoiceModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Gửi Ý Kiến / Student Voice</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Poll (Point #16 requirement) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Vote className="w-4 h-4 text-indigo-600" />
              <span>Biểu Quyết / Poll Bình Chọn Lớp</span>
            </h3>
            <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
              {activePoll.totalVotes} lượt bình chọn
            </span>
          </div>

          <div className="text-xs font-bold text-slate-900">{activePoll.question}</div>

          {/* Options & Live Chart */}
          <div className="space-y-3 pt-1">
            {activePoll.options.map(opt => {
              const percent = activePoll.totalVotes > 0 ? Math.round((opt.votes / activePoll.totalVotes) * 100) : 0;
              return (
                <div
                  key={opt.id}
                  onClick={() => !hasVoted && votePoll(activePoll.id, opt.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    hasVoted
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{opt.text}</span>
                    <span className="font-black text-indigo-700">{opt.votes} phiếu ({percent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {hasVoted && (
            <p className="text-[11px] text-emerald-600 font-semibold text-center italic">
              ✅ Bạn đã hoàn thành bình chọn cho khảo sát này.
            </p>
          )}
        </div>

        {/* Right: Student Voice Entries (Point #17 requirement) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Góc Học Sinh (Student Voice)</span>
          </h3>

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {studentVoices.map(voice => (
              <div key={voice.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {voice.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{voice.author} • {voice.date}</span>
                </div>
                <div className="text-xs font-bold text-slate-900">{voice.title}</div>
                <p className="text-xs text-slate-700">{voice.content}</p>

                {voice.response && (
                  <div className="bg-indigo-50 p-2.5 rounded-lg text-[11px] text-indigo-950 font-medium border border-indigo-100">
                    <strong>Phản hồi GVCN:</strong> "{voice.response}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Voice Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-slate-900 text-base">GỬI Ý KIẾN / STUDENT VOICE</h3>
            <form onSubmit={handleVoiceSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phân loại:</label>
                <select
                  value={voiceForm.category}
                  onChange={(e) => setVoiceForm({ ...voiceForm, category: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 font-bold"
                >
                  <option value="💬 Góp ý">💬 Góp ý</option>
                  <option value="💡 Ý tưởng">💡 Ý tưởng</option>
                  <option value="🆘 Xin hỗ trợ">🆘 Xin hỗ trợ</option>
                  <option value="❤️ Điều muốn chia sẻ">❤️ Điều muốn chia sẻ</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tiêu đề:</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tiêu đề ý kiến..."
                  value={voiceForm.title}
                  onChange={(e) => setVoiceForm({ ...voiceForm, title: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nội dung chi tiết:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập nội dung chia sẻ đến thầy chủ nhiệm..."
                  value={voiceForm.content}
                  onChange={(e) => setVoiceForm({ ...voiceForm, content: e.target.value })}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={voiceForm.isAnonymous}
                  onChange={(e) => setVoiceForm({ ...voiceForm, isAnonymous: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="anonymousCheck" className="text-xs font-semibold text-slate-700">
                  Gửi ẩn danh (Không hiển thị tên học sinh)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVoiceModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Gửi Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
