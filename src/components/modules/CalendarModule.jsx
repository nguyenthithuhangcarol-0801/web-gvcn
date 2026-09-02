import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Gift, Award, Clock, Sparkles } from 'lucide-react';

export const CalendarModule = () => {
  const { calendarEvents, students } = useApp();
  const [showBirthdayCard, setShowBirthdayCard] = useState(false);

  const birthdayStudent = students.find(s => s.dob.endsWith('09-02')) || students[4]; // Minh Anh

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Calendar – Lịch Lớp & Sinh Nhật 🎂</h2>
          <p className="text-xs text-slate-500">Lịch dùng chung cho GVCN, Học sinh & Phụ huynh cùng theo dõi</p>
        </div>
      </div>

      {/* Point #15: Automated Birthday Banner Widget */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🎂
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-pink-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-300" /> 🎉 BIRTHDAY TODAY!
              </div>
              <h3 className="text-xl font-black">Chúc mừng sinh nhật {birthdayStudent.fullName} – 12A9</h3>
              <p className="text-pink-100 text-xs mt-0.5">Chúc em luôn vui vẻ, học giỏi và đạt 100% mục tiêu năm học!</p>
            </div>
          </div>

          <button
            onClick={() => setShowBirthdayCard(true)}
            className="bg-white text-pink-600 hover:bg-pink-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Gift className="w-4 h-4" />
            <span>Tạo Thiệp Birthday Card</span>
          </button>
        </div>
      </div>

      {/* Shared Class Calendar List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-indigo-600" />
          <span>Danh Sách Sự Kiện & Lịch Học Tháng 9/2026</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {calendarEvents.map(evt => (
            <div key={evt.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 hover:border-indigo-300 transition-colors">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                {evt.date}
              </span>
              <div className="text-xs font-bold text-slate-900 pt-1">{evt.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Birthday Card Generator Modal */}
      {showBirthdayCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border-4 border-pink-200 text-center relative overflow-hidden">
            <div className="text-5xl">🎉 🎂 ✨</div>
            <div>
              <div className="text-xs font-bold text-pink-600 uppercase tracking-widest">HAPPY BIRTHDAY</div>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{birthdayStudent.fullName}</h3>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">Lớp 12A9 – Class of 2027</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-pink-100 text-xs italic text-slate-700">
              "Chúc em sinh nhật thứ 17 tràn ngập niềm vui, luôn rạng rỡ, tự tin và đỗ nv1 vào trường Đại Học ước mơ nhé!"
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={() => setShowBirthdayCard(false)}
                className="px-5 py-2.5 text-xs font-bold bg-pink-600 text-white rounded-xl hover:bg-pink-700 shadow-md"
              >
                Đóng / Tải Thiệp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
