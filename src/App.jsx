import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';

import { DashboardModule } from './components/modules/DashboardModule';
import { StudentProfileModule } from './components/modules/StudentProfileModule';
import { AttendanceModule } from './components/modules/AttendanceModule';
import { ConductModule } from './components/modules/ConductModule';
import { AcademicsModule } from './components/modules/AcademicsModule';
import { GoalTrackerModule } from './components/modules/GoalTrackerModule';
import { ClassTasksModule } from './components/modules/ClassTasksModule';
import { AnnouncementsModule } from './components/modules/AnnouncementsModule';
import { PrivateChatModule } from './components/modules/PrivateChatModule';
import { LeaveRequestsModule } from './components/modules/LeaveRequestsModule';
import { CalendarModule } from './components/modules/CalendarModule';
import { PollsVoiceModule } from './components/modules/PollsVoiceModule';
import { CertificatesModule } from './components/modules/CertificatesModule';
import { ParentPortalModule } from './components/modules/ParentPortalModule';
import { ReportsModule } from './components/modules/ReportsModule';
import { AIAssistantModule } from './components/modules/AIAssistantModule';
import { UserProfileModule } from './components/modules/UserProfileModule';
import { AccountManagementModule } from './components/modules/AccountManagementModule';
import { LandingLoginPortal } from './components/auth/LandingLoginPortal';
import { Settings, Shield, RefreshCw, LogOut } from 'lucide-react';

const SettingsModule = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 max-w-3xl">
    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
      <Settings className="w-5 h-5 text-indigo-600" />
      <span>Cài Đặt Hệ Thống & Bảo Mật Quyền Riêng Tư (Settings)</span>
    </h2>
    <div className="space-y-3 text-xs text-slate-700">
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Bảo mật RLS 3 Cấp (ADMIN, TEACHER, STUDENT)</span>
        </div>
        <p className="text-slate-600">Đã kích hoạt: Phụ huynh CHỈ xem dữ liệu của con mình qua Mã PIN hoặc Account. Học sinh không xem dữ liệu riêng tư của bạn khác.</p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <RefreshCw className="w-4 h-4 text-indigo-600" />
          <span>Supabase Auth & Remote Session Management</span>
        </div>
        <p className="text-slate-600">Hỗ trợ Đăng nhập Google OAuth, Khôi phục mật khẩu OTP, Quản lý Session thiết bị & Mã kích hoạt VIP License Key.</p>
      </div>
    </div>
  </div>
);

const MainContent = () => {
  const { activeTab } = useApp();

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardModule />;
      case 'parent_portal':
        return <ParentPortalModule />;
      case 'students':
        return <StudentProfileModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'conduct':
        return <ConductModule />;
      case 'academics':
        return <AcademicsModule />;
      case 'goals':
        return <GoalTrackerModule />;
      case 'tasks':
      case 'documents':
        return <ClassTasksModule />;
      case 'announcements':
        return <AnnouncementsModule />;
      case 'chat':
        return <PrivateChatModule />;
      case 'leave_requests':
        return <LeaveRequestsModule />;
      case 'calendar':
      case 'birthday':
        return <CalendarModule />;
      case 'polls_voice':
        return <PollsVoiceModule />;
      case 'certificates':
        return <CertificatesModule />;
      case 'reports':
        return <ReportsModule />;
      case 'ai_assistant':
        return <AIAssistantModule />;
      case 'user_profile':
        return <UserProfileModule />;
      case 'account_mgmt':
        return <AccountManagementModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <main className="flex-1 p-4 lg:p-8 bg-slate-50 overflow-y-auto max-w-7xl">
      {renderModule()}
    </main>
  );
};

const AppContainer = () => {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);

  if (!hasEnteredApp) {
    return <LandingLoginPortal onEnterApp={() => setHasEnteredApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Inter',sans-serif]">
      <Header onReturnToPortal={() => setHasEnteredApp(false)} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContainer />
    </AppProvider>
  );
}
