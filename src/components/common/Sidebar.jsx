import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Users,
  CalendarCheck,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  Calendar,
  Megaphone,
  MessageSquare,
  Trophy,
  BarChart3,
  Sparkles,
  Settings,
  HeartHandshake,
  User,
  Shield,
  Key
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, currentRole, leaveRequests, tasks } = useApp();

  const pendingLeavesCount = leaveRequests.filter(r => r.status === 'PENDING').length;
  const pendingTasksCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;

  const menuItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home, roles: ['GVCN', 'STUDENT', 'ADMIN'] },
    { id: 'parent_portal', label: 'Góc phụ huynh', icon: HeartHandshake, roles: ['PARENT'] },
    { id: 'students', label: 'Hồ sơ học sinh', icon: Users, roles: ['GVCN', 'ADMIN'] },
    { id: 'attendance', label: 'Chuyên cần', icon: CalendarCheck, badge: pendingLeavesCount > 0 ? pendingLeavesCount : null, roles: ['GVCN', 'STUDENT', 'PARENT', 'ADMIN'] },
    { id: 'conduct', label: 'Rèn luyện & Thi đua', icon: ShieldCheck, roles: ['GVCN', 'STUDENT', 'PARENT', 'ADMIN'] },
    { id: 'academics', label: 'Học tập & Điểm số', icon: BookOpen, roles: ['GVCN', 'STUDENT', 'PARENT', 'ADMIN'] },
    { id: 'goals', label: 'Goal Tracker ⭐', icon: Trophy, roles: ['GVCN', 'STUDENT', 'ADMIN'] },
    { id: 'tasks', label: 'Công việc lớp', icon: ClipboardList, badge: pendingTasksCount > 0 ? pendingTasksCount : null, roles: ['GVCN', 'STUDENT', 'ADMIN'] },
    { id: 'announcements', label: 'Thông báo ⭐', icon: Megaphone, roles: ['GVCN', 'STUDENT', 'PARENT', 'ADMIN'] },
    { id: 'chat', label: 'GVCN ↔ PH', icon: MessageSquare, roles: ['GVCN', 'PARENT', 'ADMIN'] },
    { id: 'calendar', label: 'Lịch lớp & Sinh nhật 🎂', icon: Calendar, roles: ['GVCN', 'STUDENT', 'PARENT', 'ADMIN'] },
    { id: 'polls_voice', label: 'Khảo sát & Student Voice', icon: MessageSquare, roles: ['GVCN', 'STUDENT', 'ADMIN'] },
    { id: 'certificates', label: 'Certificate Khen thưởng', icon: Trophy, roles: ['GVCN', 'STUDENT', 'ADMIN'] },
    { id: 'reports', label: 'Báo cáo tự động ⭐', icon: BarChart3, roles: ['GVCN', 'ADMIN'] },
    { id: 'ai_assistant', label: 'AI Assistant cho GVCN 🤖', icon: Sparkles, roles: ['GVCN', 'ADMIN'] },
    { id: 'user_profile', label: 'Profile & Bảo mật (AUTH)', icon: User, roles: ['GVCN', 'STUDENT', 'PARENT', 'ADMIN'] },
    { id: 'account_mgmt', label: 'Quản lý Account HS (AUTH-09)', icon: Shield, roles: ['GVCN', 'ADMIN'] },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings, roles: ['GVCN', 'ADMIN'] }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-61px)]">
      <div className="p-4 border-b border-slate-800">
        <div className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Cấu trúc Menu</div>
        <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{currentRole === 'GVCN' ? 'Bàn làm việc GVCN' : currentRole === 'STUDENT' ? 'Góc Học Sinh' : currentRole === 'ADMIN' ? 'Admin Dashboard' : 'Portal Phụ Huynh'}</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-900/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${
                  isActive ? 'bg-white text-indigo-700' : 'bg-rose-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center justify-between text-slate-400 font-medium">
          <span>Hệ thống Bảo mật</span>
          <span className="text-emerald-400 font-semibold">Auth Suite Active</span>
        </div>
        <p className="text-slate-500">Bảo mật RLS 3 Cấp • Supabase Auth Integrated</p>
      </div>
    </aside>
  );
};
