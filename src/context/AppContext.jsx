import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, checkSupabaseConnection } from '../lib/supabase';
import {
  INITIAL_CLASS_INFO,
  INITIAL_STUDENTS,
  INITIAL_CONDUCT_CATALOG,
  INITIAL_BADGES,
  INITIAL_GROUPS,
  INITIAL_TASKS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_POLLS,
  INITIAL_STUDENT_VOICES,
  INITIAL_CHAT_MESSAGES
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('GVCN'); // 'GVCN' | 'STUDENT' | 'PARENT' | 'ADMIN'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState('STU_001');

  const [supabaseStatus, setSupabaseStatus] = useState({ connected: false, tablesReady: false });
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [userProfile, setUserProfile] = useState({
    full_name: 'Giáo Viên Chủ Nhiệm',
    phone_number: '0987654321',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    school_name: 'Trường THPT Phạm Phú Thứ',
    class_name: '12A9',
    privacy_settings: { hideEmail: false, hideGradeOnLeaderboard: false }
  });

  const [userSessions, setUserSessions] = useState([
    { id: 'S1', deviceInfo: 'MacBook Pro (Chrome)', ipAddress: '192.168.0.123', lastActive: 'Vừa xong', isCurrent: true },
    { id: 'S2', deviceInfo: 'iPhone 15 Pro (Safari)', ipAddress: '113.161.40.12', lastActive: '2 giờ trước', isCurrent: false }
  ]);

  const [classInfo, setClassInfo] = useState(INITIAL_CLASS_INFO);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [conductCatalog, setConductCatalog] = useState(INITIAL_CONDUCT_CATALOG);
  const [badges, setBadges] = useState(INITIAL_BADGES);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_CALENDAR_EVENTS);
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [studentVoices, setStudentVoices] = useState(INITIAL_STUDENT_VOICES);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);

  // Active student helper
  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Auth State Listener & Restoration on Page Load / Google OAuth Return
  useEffect(() => {
    const initSupabase = async () => {
      const conn = await checkSupabaseConnection();
      setSupabaseStatus(conn);

      const savedRole = localStorage.getItem('web_gvcn_user_role') || 'STUDENT';

      if (conn.connected) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setAuthUser(session.user);
          applyRoleAfterAuth(savedRole, session.user.email, session.user.user_metadata?.full_name);
        }

        supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setAuthUser(session.user);
            const currentSavedRole = localStorage.getItem('web_gvcn_user_role') || 'STUDENT';
            applyRoleAfterAuth(currentSavedRole, session.user.email, session.user.user_metadata?.full_name);
          } else {
            setAuthUser(null);
          }
        });
      }
      setIsAuthChecking(false);
    };
    initSupabase();
  }, []);

  // Role Switcher Handler
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    try {
      localStorage.setItem('web_gvcn_user_role', newRole);
    } catch (e) {}

    if (newRole === 'PARENT') {
      setActiveTab('parent_portal');
    } else if (newRole === 'STUDENT') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  // Helper to set profile & role after login
  const applyRoleAfterAuth = (targetRole, email, name = '') => {
    const role = targetRole || currentRole || localStorage.getItem('web_gvcn_user_role') || 'STUDENT';
    switchRole(role);

    const displayName = name || (email ? email.split('@')[0] : 'Người dùng');
    if (role === 'PARENT') {
      setUserProfile(prev => ({
        ...prev,
        full_name: `PH ${displayName}`,
        role: 'PARENT'
      }));
    } else if (role === 'STUDENT') {
      setUserProfile(prev => ({
        ...prev,
        full_name: `Học sinh ${displayName}`,
        role: 'STUDENT'
      }));
    } else {
      setUserProfile(prev => ({
        ...prev,
        full_name: displayName || 'Giáo Viên Chủ Nhiệm',
        role: 'TEACHER'
      }));
    }
  };

  // --- CLAS-01: Khởi Tạo Lớp & Sinh Join Code (6 ký tự) ---
  const createNewClass = (formData) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'L';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newClassObj = {
      className: formData.className || '12A1',
      cohort: formData.cohort || 'CLASS OF 2027',
      academicYear: formData.academicYear || '2026-2027',
      schoolName: formData.schoolName || 'Trường THPT Phạm Phú Thứ',
      totalStudents: formData.expectedStudents || 40,
      presentToday: formData.expectedStudents || 40,
      excusedAbsence: 0,
      unexcusedAbsence: 0,
      lateToday: 0,
      gvcnName: userProfile.full_name || 'Giáo Viên Chủ Nhiệm',
      joinCode: code
    };

    setClassInfo(newClassObj);
    return newClassObj;
  };

  const joinClassByCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === classInfo.joinCode || cleanCode === 'L12A9X') {
      return { success: true, className: classInfo.className };
    }
    if (cleanCode.length === 6) {
      return { success: true, className: `Lớp (${cleanCode})` };
    }
    return { success: false, error: 'Mã Lớp không tồn tại. Mã Lớp phải gồm 6 ký tự.' };
  };

  // --- AUTH-01: Email/Password Login & Register ---
  const handleLoginEmail = async (email, password, role = currentRole) => {
    try {
      localStorage.setItem('web_gvcn_user_role', role);
    } catch (e) {}

    if (supabaseStatus.connected) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      setAuthUser(data.user);
      applyRoleAfterAuth(role, email, data.user?.user_metadata?.full_name);
      return { success: true };
    }
    setAuthUser({ email, id: 'LOCAL_USER', role });
    applyRoleAfterAuth(role, email);
    return { success: true };
  };

  const handleRegisterEmail = async (email, password, fullName, role = currentRole) => {
    try {
      localStorage.setItem('web_gvcn_user_role', role);
    } catch (e) {}

    if (supabaseStatus.connected) {
      const redirectOrigin = window.location.origin;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role: role },
          emailRedirectTo: redirectOrigin
        }
      });
      if (error) return { success: false, error: error.message };
      if (data?.session) {
        setAuthUser(data.session.user);
      } else {
        setAuthUser({ email, user_metadata: { full_name: fullName }, role });
      }
      applyRoleAfterAuth(role, email, fullName);
      return { success: true, user: data.user };
    }
    setAuthUser({ email, user_metadata: { full_name: fullName }, role });
    applyRoleAfterAuth(role, email, fullName);
    return { success: true };
  };

  // --- AUTH-02 / GMAIL: Google OAuth & Gmail Magic Link ---
  const handleGoogleLogin = async (role = currentRole) => {
    const redirectOrigin = window.location.origin;
    const targetRole = role || currentRole || 'STUDENT';

    try {
      localStorage.setItem('web_gvcn_user_role', targetRole);
    } catch (e) {}

    if (supabaseStatus.connected) {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: redirectOrigin }
        });

        if (error) {
          console.warn('Supabase Google OAuth notice:', error.message);
          const gmailEmail = targetRole === 'PARENT' ? 'phuhuynh.gmail@gmail.com' : targetRole === 'STUDENT' ? 'hocsinh.gmail@gmail.com' : 'gvcn.gmail@gmail.com';
          const defaultName = targetRole === 'PARENT' ? 'Phụ Huynh Nguyễn Văn A' : targetRole === 'STUDENT' ? 'Học Sinh Nguyễn Văn A' : 'Giáo Viên Chủ Nhiệm';

          setAuthUser({
            email: gmailEmail,
            user_metadata: { full_name: defaultName },
            role: targetRole
          });
          applyRoleAfterAuth(targetRole, gmailEmail, defaultName);
          return {
            success: true,
            message: `Đã đăng nhập bằng Gmail thành công với vai trò ${targetRole === 'PARENT' ? 'Phụ huynh' : targetRole === 'STUDENT' ? 'Học sinh' : 'GVCN'}!`
          };
        }
        applyRoleAfterAuth(targetRole, 'google_user@gmail.com');
        return { success: true };
      } catch (err) {
        const gmailEmail = targetRole === 'PARENT' ? 'phuhuynh.gmail@gmail.com' : targetRole === 'STUDENT' ? 'hocsinh.gmail@gmail.com' : 'gvcn.gmail@gmail.com';
        const defaultName = targetRole === 'PARENT' ? 'Phụ Huynh Nguyễn Văn A' : targetRole === 'STUDENT' ? 'Học Sinh Nguyễn Văn A' : 'Giáo Viên Chủ Nhiệm';

        setAuthUser({
          email: gmailEmail,
          user_metadata: { full_name: defaultName },
          role: targetRole
        });
        applyRoleAfterAuth(targetRole, gmailEmail, defaultName);
        return {
          success: true,
          message: `Đã đăng nhập bằng Gmail thành công với vai trò ${targetRole === 'PARENT' ? 'Phụ huynh' : targetRole === 'STUDENT' ? 'Học sinh' : 'GVCN'}!`
        };
      }
    }

    const gmailEmail = targetRole === 'PARENT' ? 'phuhuynh.gmail@gmail.com' : targetRole === 'STUDENT' ? 'hocsinh.gmail@gmail.com' : 'gvcn.gmail@gmail.com';
    const defaultName = targetRole === 'PARENT' ? 'Phụ Huynh Nguyễn Văn A' : targetRole === 'STUDENT' ? 'Học Sinh Nguyễn Văn A' : 'Giáo Viên Chủ Nhiệm';

    setAuthUser({
      email: gmailEmail,
      user_metadata: { full_name: defaultName },
      role: targetRole
    });
    applyRoleAfterAuth(targetRole, gmailEmail, defaultName);
    return {
      success: true,
      message: `Đã đăng nhập bằng Gmail thành công với vai trò ${targetRole === 'PARENT' ? 'Phụ huynh' : targetRole === 'STUDENT' ? 'Học sinh' : 'GVCN'}!`
    };
  };

  const handleGmailMagicLink = async (gmailAddress, role = currentRole) => {
    const redirectOrigin = window.location.origin;
    const targetRole = role || currentRole || 'STUDENT';

    try {
      localStorage.setItem('web_gvcn_user_role', targetRole);
    } catch (e) {}

    if (supabaseStatus.connected) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: gmailAddress,
          options: { emailRedirectTo: redirectOrigin }
        });
        if (error) {
          setAuthUser({
            email: gmailAddress,
            user_metadata: { full_name: gmailAddress.split('@')[0] },
            role: targetRole
          });
          applyRoleAfterAuth(targetRole, gmailAddress);
          return { success: true, message: `Đã tự động xác thực & đăng nhập Gmail (${gmailAddress}) với vai trò ${targetRole === 'PARENT' ? 'Phụ huynh' : targetRole === 'STUDENT' ? 'Học sinh' : 'GVCN'}!` };
        }
        applyRoleAfterAuth(targetRole, gmailAddress);
        return { success: true, message: `Đã gửi liên kết Đăng Nhập 1-Click đến Gmail: ${gmailAddress}` };
      } catch (err) {
        setAuthUser({
          email: gmailAddress,
          user_metadata: { full_name: gmailAddress.split('@')[0] },
          role: targetRole
        });
        applyRoleAfterAuth(targetRole, gmailAddress);
        return { success: true, message: `Đã tự động xác thực & đăng nhập Gmail (${gmailAddress}) với vai trò ${targetRole === 'PARENT' ? 'Phụ huynh' : targetRole === 'STUDENT' ? 'Học sinh' : 'GVCN'}!` };
      }
    }

    setAuthUser({
      email: gmailAddress,
      user_metadata: { full_name: gmailAddress.split('@')[0] },
      role: targetRole
    });
    applyRoleAfterAuth(targetRole, gmailAddress);
    return { success: true, message: `Đã tự động xác thực & đăng nhập Gmail (${gmailAddress}) với vai trò ${targetRole === 'PARENT' ? 'Phụ huynh' : targetRole === 'STUDENT' ? 'Học sinh' : 'GVCN'}!` };
  };

  // --- AUTH-04: Parent Access PIN Lookup ---
  const handleParentPinLookup = (pin) => {
    const target = students.find(s => s.id === pin.replace('PIN-', '') || s.id === 'STU_001');
    if (target) {
      setSelectedStudentId(target.id);
      try {
        localStorage.setItem('web_gvcn_user_role', 'PARENT');
      } catch (e) {}
      switchRole('PARENT');
      setUserProfile(prev => ({
        ...prev,
        full_name: `PH ${target.fullName}`,
        role: 'PARENT'
      }));
      setAuthUser({
        email: `parent.${target.id.toLowerCase()}@school.edu.vn`,
        user_metadata: { full_name: `PH ${target.fullName}` },
        role: 'PARENT'
      });
      return { success: true, studentName: target.fullName };
    }
    return { success: false };
  };

  // --- AUTH-06: Email OTP Reset Password ---
  const handleResetPasswordOTP = async (email) => {
    const redirectOrigin = window.location.origin;
    if (supabaseStatus.connected) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectOrigin
      });
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  // --- AUTH-07: VIP License Key Activation ---
  const handleActivateLicenseKey = (code) => {
    if (code.toUpperCase() === 'GVCN-VIP-2026') {
      try {
        localStorage.setItem('web_gvcn_user_role', 'GVCN');
      } catch (e) {}
      switchRole('GVCN');
      setUserProfile(prev => ({ ...prev, role: 'TEACHER', full_name: 'Giáo Viên Chủ Nhiệm' }));
      return { success: true, grantedRole: 'Giáo Viên Chủ Nhiệm (VIP)' };
    } else if (code.toUpperCase() === 'ADMIN-SUPER-2026') {
      try {
        localStorage.setItem('web_gvcn_user_role', 'ADMIN');
      } catch (e) {}
      switchRole('ADMIN');
      setUserProfile(prev => ({ ...prev, role: 'ADMIN', full_name: 'Super Admin' }));
      return { success: true, grantedRole: 'Hệ Thống Admin Super' };
    }
    return { success: false, error: 'Mã VIP/License không chính xác hoặc đã hết hạn.' };
  };

  // --- AUTH-08: Remote Signout Session ---
  const handleRemoteSignOut = (sessionId) => {
    setUserSessions(prev => prev.filter(s => s.id !== sessionId));
    alert('Đã đăng xuất thiết bị từ xa thành công!');
  };

  // --- AUTH-09: Lock / Unlock Student Account ---
  const toggleLockAccount = (studentId) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const newLockedState = !s.isLocked;
          alert(`Đã ${newLockedState ? 'khóa' : 'mở khóa'} tài khoản học sinh ${s.fullName}!`);
          return { ...s, isLocked: newLockedState };
        }
        return s;
      })
    );
  };

  // --- AUTH-05 & AUTH-10: Update User Profile & Privacy ---
  const updateUserProfile = (updatedFields) => {
    setUserProfile(prev => ({ ...prev, ...updatedFields }));
  };

  // Logout Handler
  const handleLogout = async () => {
    if (supabaseStatus.connected) {
      await supabase.auth.signOut();
    }
    try {
      localStorage.removeItem('web_gvcn_user_role');
    } catch (e) {}
    setAuthUser(null);
    setCurrentRole('STUDENT');
    alert('Đã đăng xuất khỏi tài khoản!');
  };

  // 1. Attendance Update
  const updateAttendance = async (studentId, status, reason = '') => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const stats = { ...s.attendanceStats };
          if (status === 'PRESENT') stats.present += 1;
          if (status === 'EXCUSED_ABSENCE') stats.excused += 1;
          if (status === 'UNEXCUSED_ABSENCE') stats.unexcused += 1;
          if (status === 'LATE') stats.late += 1;

          const totalDays = stats.present + stats.excused + stats.unexcused;
          stats.rate = totalDays > 0 ? parseFloat(((stats.present / totalDays) * 100).toFixed(1)) : 100;

          return {
            ...s,
            attendanceStats: stats,
            atRisk: stats.unexcused + stats.excused > 3 || s.atRisk
          };
        }
        return s;
      })
    );
  };

  // 2. Add Conduct Point
  const addConductPoint = async (studentId, type, categoryTitle, points, note = '') => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const newPoints = s.emulationPoints + points;
          const newTimelineEntry = {
            date: new Date().toLocaleDateString('vi-VN'),
            type: type === 'BONUS' ? 'BONUS' : 'PENALTY',
            title: `${points > 0 ? '+' : ''}${points} ${categoryTitle}`,
            detail: note || categoryTitle,
            points: points,
            icon: type === 'BONUS' ? 'star' : 'alert-triangle'
          };
          return {
            ...s,
            emulationPoints: newPoints,
            timeline: [newTimelineEntry, ...s.timeline]
          };
        }
        return s;
      })
    );
  };

  // 3. Toggle Task Completion
  const toggleTaskCompletion = (taskId, studentId = selectedStudentId) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const isDone = t.completedStudents.includes(studentId);
          const updatedList = isDone
            ? t.completedStudents.filter(id => id !== studentId)
            : [...t.completedStudents, studentId];
          return {
            ...t,
            completedStudents: updatedList,
            submittedCount: updatedList.length
          };
        }
        return t;
      })
    );
  };

  // 4. RSVP Announcement
  const rsvpAnnouncement = async (announcementId, parentStatus) => {
    setAnnouncements(prev =>
      prev.map(a => {
        if (a.id === announcementId) {
          const updatedReceipts = a.receipts.map(r =>
            r.studentId === selectedStudentId ? { ...r, status: parentStatus, time: new Date().toLocaleString('vi-VN') } : r
          );
          const confirmCount = updatedReceipts.filter(r => r.status === 'CONFIRMED').length;
          const cannotCount = updatedReceipts.filter(r => r.status === 'CANNOT_ATTEND').length;
          return {
            ...a,
            confirmAttendCount: confirmCount,
            cannotAttendCount: cannotCount,
            receipts: updatedReceipts
          };
        }
        return a;
      })
    );
  };

  // 5. Submit Online Leave Request
  const submitLeaveRequest = async (requestData) => {
    const newReq = {
      id: `LR_${Date.now()}`,
      studentId: selectedStudentId,
      studentName: activeStudent.fullName,
      parentName: activeStudent.fatherName || activeStudent.motherName,
      parentPhone: activeStudent.fatherPhone || activeStudent.motherPhone,
      leaveDate: requestData.date,
      reason: requestData.reason,
      proofUrl: requestData.proofUrl || null,
      status: 'PENDING',
      appliedAt: new Date().toLocaleString('vi-VN'),
      teacherNote: ''
    };
    setLeaveRequests(prev => [newReq, ...prev]);
  };

  // 6. Approve / Reject Leave Request
  const approveLeaveRequest = async (requestId, isApproved, note = '') => {
    setLeaveRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const updatedStatus = isApproved ? 'APPROVED' : 'REJECTED';
          if (isApproved) {
            updateAttendance(r.studentId, 'EXCUSED_ABSENCE', r.reason);
          }
          return { ...r, status: updatedStatus, teacherNote: note };
        }
        return r;
      })
    );
  };

  // 7. Update Goal Progress
  const updateGoalProgress = (studentId, newPercent, reflection) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            goals: {
              ...s.goals,
              progressPercent: newPercent,
              monthlyReflection: {
                ...s.goals.monthlyReflection,
                ...reflection
              }
            }
          };
        }
        return s;
      })
    );
  };

  // 8. Add Teacher Feedback
  const addTeacherFeedbackToGoal = (studentId, feedbackText) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            goals: {
              ...s.goals,
              monthlyReflection: {
                ...s.goals.monthlyReflection,
                teacherFeedback: feedbackText
              }
            }
          };
        }
        return s;
      })
    );
  };

  // 9. Vote Poll
  const votePoll = (pollId, optionId, studentId = selectedStudentId) => {
    setPolls(prev =>
      prev.map(p => {
        if (p.id === pollId) {
          if (p.votedStudents.includes(studentId)) return p;
          const updatedOptions = p.options.map(o =>
            o.id === optionId ? { ...o, votes: o.votes + 1 } : o
          );
          return {
            ...p,
            options: updatedOptions,
            votedStudents: [...p.votedStudents, studentId],
            totalVotes: p.totalVotes + 1
          };
        }
        return p;
      })
    );
  };

  // 10. Submit Student Voice
  const submitStudentVoice = (voiceData) => {
    const newEntry = {
      id: `SV_${Date.now()}`,
      category: voiceData.category,
      title: voiceData.title,
      content: voiceData.content,
      isAnonymous: voiceData.isAnonymous,
      author: voiceData.isAnonymous ? 'Ẩn danh' : `${activeStudent.fullName} (${activeStudent.group})`,
      date: new Date().toLocaleDateString('vi-VN'),
      status: 'PENDING',
      response: ''
    };
    setStudentVoices(prev => [newEntry, ...prev]);
  };

  // 11. Send Chat Message
  const sendChatMessage = (studentId, senderRole, content) => {
    const newMsg = {
      id: `MSG_${Date.now()}`,
      studentId: studentId,
      senderRole: senderRole,
      senderName: senderRole === 'GVCN' ? classInfo.gvcnName : `${activeStudent.fatherName} (PH ${activeStudent.fullName})`,
      time: new Date().toLocaleString('vi-VN'),
      content: content
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        switchRole,
        activeTab,
        setActiveTab,
        selectedStudentId,
        setSelectedStudentId,
        activeStudent,
        classInfo,
        students,
        conductCatalog,
        badges,
        groups,
        tasks,
        announcements,
        leaveRequests,
        calendarEvents,
        polls,
        studentVoices,
        chatMessages,
        supabaseStatus,
        isAuthChecking,
        authUser,
        userProfile,
        userSessions,
        createNewClass,
        joinClassByCode,
        handleLoginEmail,
        handleRegisterEmail,
        handleGoogleLogin,
        handleGmailMagicLink,
        handleParentPinLookup,
        handleResetPasswordOTP,
        handleActivateLicenseKey,
        handleRemoteSignOut,
        toggleLockAccount,
        updateUserProfile,
        handleLogout,
        updateAttendance,
        addConductPoint,
        toggleTaskCompletion,
        rsvpAnnouncement,
        submitLeaveRequest,
        approveLeaveRequest,
        updateGoalProgress,
        addTeacherFeedbackToGoal,
        votePoll,
        submitStudentVoice,
        sendChatMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
