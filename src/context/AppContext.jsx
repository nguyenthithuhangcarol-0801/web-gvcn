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
  const [currentRole, setCurrentRole] = useState('GVCN'); // 'GVCN' | 'STUDENT' | 'PARENT'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState('STU_001');

  const [supabaseStatus, setSupabaseStatus] = useState({ connected: false, tablesReady: false });

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

  // Check Supabase connection on load
  useEffect(() => {
    const initSupabase = async () => {
      const conn = await checkSupabaseConnection();
      setSupabaseStatus(conn);

      if (conn.connected && conn.tablesReady) {
        try {
          // Fetch remote data from Supabase
          const { data: dbStudents } = await supabase.from('students').select('*');
          if (dbStudents && dbStudents.length > 0) {
            setStudents(dbStudents);
          }

          const { data: dbLeaveReqs } = await supabase.from('leave_requests').select('*');
          if (dbLeaveReqs && dbLeaveReqs.length > 0) {
            setLeaveRequests(dbLeaveReqs);
          }
        } catch (err) {
          console.warn('Could not sync with Supabase tables, using local fallback data:', err);
        }
      }
    };
    initSupabase();
  }, []);

  // Active student helper
  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Role Switcher Handler
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'PARENT') {
      setActiveTab('parent_portal');
    } else if (newRole === 'STUDENT') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('dashboard');
    }
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

    // Sync to Supabase if connected
    if (supabaseStatus.tablesReady) {
      await supabase.from('attendance_logs').insert([{
        student_id: studentId,
        date: new Date().toISOString().split('T')[0],
        status: status,
        absence_reason: reason
      }]).select();
    }
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

    if (supabaseStatus.tablesReady) {
      await supabase.from('conduct_logs').insert([{
        student_id: studentId,
        type: type,
        category_title: categoryTitle,
        points: points,
        notes: note
      }]);
    }
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

  // 5. Submit Online Leave Request (Parent)
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

    if (supabaseStatus.tablesReady) {
      await supabase.from('leave_requests').insert([{
        id: newReq.id,
        student_id: newReq.studentId,
        student_name: newReq.studentName,
        parent_name: newReq.parentName,
        parent_phone: newReq.parentPhone,
        leave_date: newReq.leaveDate,
        reason: newReq.reason,
        proof_url: newReq.proofUrl,
        status: newReq.status,
        applied_at: newReq.appliedAt
      }]);
    }
  };

  // 6. Approve / Reject Leave Request (GVCN)
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

    if (supabaseStatus.tablesReady) {
      await supabase.from('leave_requests').update({
        status: isApproved ? 'APPROVED' : 'REJECTED',
        teacher_note: note
      }).eq('id', requestId);
    }
  };

  // 7. Update Student Goal & Self Reflection
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

  // 8. Add Teacher Feedback to Goal
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
