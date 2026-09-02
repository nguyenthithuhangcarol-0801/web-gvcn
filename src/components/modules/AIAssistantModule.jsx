import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Send, Bot, User, RefreshCw, Copy, Check } from 'lucide-react';

export const AIAssistantModule = () => {
  const { students, classInfo } = useApp();
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Xin chào ${classInfo.gvcnName}! Tôi là AI Assistant trợ lý cho GVCN Lớp ${classInfo.className}.\n\nTôi có thể giúp Thầy:\n1. Phân tích học sinh cần quan tâm tuần này (chuyên cần, điểm số, vi phạm, nhiệm vụ).\n2. Soạn bản nháp nhận xét tháng cho học sinh dựa trên dữ liệu thực tế.\n3. Soạn tin nhắn cá nhân hóa gửi phụ huynh.`
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const presetQueries = [
    "Học sinh nào cần quan tâm tuần này?",
    "Viết nhận xét tháng cho Nguyễn Văn A.",
    "Soạn tin nhắn cho phụ huynh những học sinh nghỉ trên 3 buổi."
  ];

  const handleSendPrompt = (promptText) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let aiResponseText = '';
      if (textToSend.includes("Học sinh nào cần quan tâm")) {
        aiResponseText = `🤖 **Dựa trên dữ liệu thực tế tuần này của lớp 12A9, có 3 học sinh cần Thầy lưu ý:**\n\n1. **Lê Văn C (Tổ 2):** Vắng tổng cộng 7 buổi (3 buổi không phép), điểm Toán 4.5 và chưa hoàn thành 2 nhiệm vụ lớp. ➔ *Đề xuất:* Gọi điện trực tiếp cho phụ huynh.\n2. **Nguyễn Văn A (Tổ 1):** Điểm Toán bài 15p vừa rồi giảm mạnh từ 7.8 xuống 5.4. ➔ *Đề xuất:* Nhắc nhở A ôn tập bài 1 tiết sắp tới.\n3. **Phạm Văn E (Tổ 4):** Chưa nộp photo VNeID và vắng 2 buổi có phép do ốm.`;
      } else if (textToSend.includes("Viết nhận xét tháng")) {
        aiResponseText = `🤖 **Bản nháp nhận xét tháng 9 cho học sinh Nguyễn Văn A (12A9):**\n\n"Em Nguyễn Văn A có tinh thần rèn luyện tốt, tích cực hỗ trợ lớp (đạt +125 điểm thi đua, đứng top 1). Môn Tiếng Anh xuất sắc (9.0). Tuy nhiên điểm môn Toán gần đây có dấu hiệu giảm nhẹ (từ 7.8 xuống 5.4). Đề nghị em phân bổ lại thời gian ôn tập môn Toán kĩ hơn trong tháng tới."\n\n*(GVCN có thể duyệt & chỉnh sửa trước khi gửi phụ huynh)*`;
      } else if (textToSend.includes("Soạn tin nhắn cho phụ huynh")) {
        aiResponseText = `🤖 **Mẫu tin nhắn cá nhân hóa gửi Phụ Huynh:**\n\n"Kính gửi Quý Phụ huynh học sinh Lê Văn C (Lớp 12A9). Thầy Nguyễn Quốc Đạt - GVCN xin thông báo: Trong tháng này em C đã nghỉ tổng cộng 7 buổi học (trong đó có 3 buổi chưa gửi đơn xin phép). Nhờ Quý Phụ huynh phối hợp nhắc nhở cháu đảm bảo thời gian đi học đúng giờ. Xin cảm ơn Quý Phụ huynh!"`;
      } else {
        aiResponseText = `🤖 Dựa trên dữ liệu tổng hợp của lớp 12A9 (Sĩ số 50, Chuyên cần 97.2%, Top 1 thi đua: Minh Anh), hệ thống ghi nhận tình hình lớp duy trì rất tốt. Thầy có thể yêu cầu tôi soạn báo cáo hoặc tạo nhận xét cụ thể.`;
      }

      const aiMsg = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1000);
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">AI Assistant Cho Giáo Viên Chủ Nhiệm 🤖</h2>
            <p className="text-indigo-200 text-xs mt-0.5">Trợ lý trí tuệ nhân tạo phân tích thông minh, tự tạo nhận xét & soạn tin nhắn gửi phụ huynh</p>
          </div>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-600 block">💡 Gợi ý câu hỏi nhanh cho GVCN:</span>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="text-xs font-semibold bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 px-3.5 py-2 rounded-xl transition-all shadow-2xs text-left"
            >
              ✨ "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[500px]">
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="space-y-1 max-w-xl">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-bl-none whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>

                {msg.sender === 'ai' && (
                  <button
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium px-1"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Đã sao chép!' : 'Sao chép văn bản'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI đang phân tích dữ liệu lớp 12A9...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Hỏi AI bất kỳ câu hỏi nào về lớp 12A9..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
          <button
            onClick={() => handleSendPrompt()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Gửi câu hỏi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
