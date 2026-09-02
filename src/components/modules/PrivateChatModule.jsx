import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, Paperclip, Image, ShieldCheck, User } from 'lucide-react';

export const PrivateChatModule = () => {
  const { chatMessages, activeStudent, currentRole, sendChatMessage, students, setSelectedStudentId } = useApp();
  const [inputText, setInputText] = useState('');

  const currentMessages = chatMessages.filter(m => m.studentId === activeStudent.id);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendChatMessage(activeStudent.id, currentRole, inputText);
    setInputText('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Trao Đổi Riêng GVCN ↔ Phụ Huynh</h2>
          <p className="text-xs text-slate-500">Kênh trao đổi trực tiếp riêng biệt theo từng học sinh • Lưu trữ vết lịch sử cả năm học</p>
        </div>

        {currentRole === 'GVCN' && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-600">Chọn phụ huynh HS:</label>
            <select
              value={activeStudent.id}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  Kênh PH {s.fullName} ({s.studentCode})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[550px]">
        {/* Chat Channel Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">KÊNH TRAO ĐỔI: GVCN ↔ PH {activeStudent.fullName}</div>
              <div className="text-[11px] text-slate-500">Phụ huynh: {activeStudent.fatherName || activeStudent.motherName} ({activeStudent.fatherPhone})</div>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            Kênh bảo mật 1-1
          </span>
        </div>

        {/* Message Log Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
          {currentMessages.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs italic">
              Chưa có tin nhắn nào. Bắt đầu trò chuyện với GVCN...
            </div>
          ) : (
            currentMessages.map(msg => {
              const isMe = (currentRole === 'GVCN' && msg.senderRole === 'GVCN') || (currentRole === 'PARENT' && msg.senderRole === 'PARENT');
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="text-[10px] text-slate-400 font-medium mb-1 px-1">
                    {msg.senderName} • {msg.time}
                  </div>
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-none font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder="Nhập nội dung trao đổi..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Gửi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
