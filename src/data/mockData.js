// Mock Data Engine for Class 12A9 - Class of 2027

export const INITIAL_CLASS_INFO = {
  className: "12A9",
  cohort: "CLASS OF 2027",
  academicYear: "2026-2027",
  totalStudents: 50,
  presentToday: 48,
  excusedAbsence: 1,
  unexcusedAbsence: 1,
  lateToday: 2,
  gvcnName: "Giáo Viên Chủ Nhiệm",
  schoolName: "Trường THPT Phạm Phú Thứ"
};

export const INITIAL_STUDENTS = [
  {
    id: "STU_001",
    studentCode: "HS12A901",
    fullName: "Nguyễn Văn A",
    gender: "Nam",
    dob: "2009-05-15",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    phone: "0987654321",
    email: "nguyenvana.12a9@school.edu.vn",
    group: "Tổ 1",
    fatherName: "Nguyễn Văn B",
    fatherPhone: "0901234567",
    fatherJob: "Kỹ sư CNTT",
    motherName: "Trần Thị C",
    motherPhone: "0907654321",
    motherJob: "Kế toán trưởng",
    scores: { math: 8.5, literature: 7.5, english: 9.0, gpa: 8.3 },
    scoreTrend: "DECLINING", // Mathematics dropped from 7.8 to 5.4 in recent test
    scoreHistory: [
      { test: "Bài 15p lần 1", math: 8.5, lit: 7.0, eng: 9.0 },
      { test: "Bài 1 tiết lần 1", math: 7.8, lit: 7.5, eng: 9.0 },
      { test: "Bài 15p lần 2", math: 5.4, lit: 8.0, eng: 9.0 }
    ],
    conductGrade: "Tốt",
    emulationPoints: 125,
    rank: 1,
    attendanceStats: { present: 42, excused: 2, unexcused: 0, late: 3, rate: 95.5 },
    atRisk: true,
    atRiskReason: "Điểm môn Toán giảm từ 7.8 → 5.4 trong 3 lần kiểm tra gần nhất.",
    documents: { vneid: true, thcsCert: true, birthCert: true, infoForm: false, commitment: false },
    timeline: [
      { date: "05/09/2026", type: "LATE", title: "Đi học muộn 10 phút", detail: "Do kẹt xe đường Lê Lợi", points: -5, icon: "clock" },
      { date: "12/09/2026", type: "BONUS", title: "Hỗ trợ hoạt động lớp", detail: "Kê bàn ghế & chuẩn bị loa đài đại hội chi đoàn", points: +5, icon: "star" },
      { date: "18/09/2026", type: "PARENT", title: "Phụ huynh trao đổi với GVCN", detail: "Mẹ nhắn tin trao đổi về định hướng thi ĐH ngành Marketing", points: 0, icon: "message" },
      { date: "25/09/2026", type: "ACADEMIC", title: "Đạt 9,0 kiểm tra tiếng Anh", detail: "Điểm cao nhất bài kiểm tra 15 phút toàn trường", points: +10, icon: "award" },
      { date: "30/09/2026", type: "TITLE", title: "Student of the Month", detail: "Tuyên dương sinh hoạt dưới cờ toàn trường", points: +15, icon: "trophy" }
    ],
    goals: {
      gpaTarget: 8.0,
      englishTarget: 8.5,
      punctualityTarget: "Không đi học muộn",
      universityTarget: "Đậu ngành Marketing – ĐH X",
      progressPercent: 80,
      monthlyReflection: {
        good: "Đạt 9.0 Tiếng Anh bài 15 phút, duy trì thói quen làm bài tập đúng giờ.",
        improve: "Cần phân bổ thêm 45 phút mỗi ngày ôn môn Ngữ văn.",
        nextGoal: "Nâng điểm Văn bài 1 tiết tới lên >= 8.0.",
        teacherFeedback: "Thầy rất tuyên dương tinh thần tự giác của A! Cố gắng phát huy bài Văn sắp tới nhé."
      }
    }
  },
  {
    id: "STU_002",
    studentCode: "HS12A902",
    fullName: "Gia Huy",
    gender: "Nam",
    dob: "2009-08-20",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "0987111222",
    email: "giahuy.12a9@school.edu.vn",
    group: "Tổ 1",
    fatherName: "Trần Gia Bảo",
    fatherPhone: "0912111222",
    fatherJob: "Bác sĩ",
    motherName: "Lê Minh Hương",
    motherPhone: "0913111222",
    motherJob: "Dược sĩ",
    scores: { math: 9.2, literature: 8.0, english: 8.8, gpa: 8.7 },
    scoreTrend: "IMPROVING",
    conductGrade: "Tốt",
    emulationPoints: 118,
    rank: 2,
    attendanceStats: { present: 45, excused: 0, unexcused: 0, late: 0, rate: 100 },
    atRisk: false,
    documents: { vneid: true, thcsCert: true, birthCert: true, infoForm: true, commitment: true },
    timeline: [
      { date: "01/09/2026", type: "BONUS", title: "Phát biểu xây dựng bài", detail: "Giải bài tập Toán nâng cao", points: +5, icon: "star" },
      { date: "15/09/2026", type: "ACADEMIC", title: "Đạt 9.2 kiểm tra Toán", detail: "Điểm cao nhất bài 1 tiết", points: +10, icon: "award" }
    ],
    goals: {
      gpaTarget: 9.0,
      englishTarget: 9.0,
      punctualityTarget: "Giữ vững 100% chuyên cần",
      universityTarget: "Khoa Học Máy Tính - ĐH Bách Khoa",
      progressPercent: 90,
      monthlyReflection: {
        good: "Đạt điểm 9.2 Toán, hỗ trợ bạn A ôn tập.",
        improve: "Cần cải thiện môn Ngữ văn.",
        nextGoal: "Đạt 8.5 Ngữ văn.",
        teacherFeedback: "Gia Huy là gương mặt xuất sắc và rất có tinh thần đồng đội."
      }
    }
  },
  {
    id: "STU_003",
    studentCode: "HS12A903",
    fullName: "Ngọc Mai",
    gender: "Nữ",
    dob: "2009-03-10",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "0987333444",
    email: "ngocmai.12a9@school.edu.vn",
    group: "Tổ 2",
    fatherName: "Phạm Văn Minh",
    fatherPhone: "0914333444",
    fatherJob: "Doanh nhân",
    motherName: "Phan Thanh Trúc",
    motherPhone: "0915333444",
    motherJob: "Giáo viên",
    scores: { math: 8.0, literature: 9.0, english: 9.2, gpa: 8.73 },
    scoreTrend: "IMPROVING",
    conductGrade: "Tốt",
    emulationPoints: 115,
    rank: 3,
    attendanceStats: { present: 44, excused: 1, unexcused: 0, late: 1, rate: 97.7 },
    atRisk: false,
    documents: { vneid: true, thcsCert: true, birthCert: true, infoForm: true, commitment: true },
    timeline: [
      { date: "02/09/2026", type: "BONUS", title: "Tham gia phong trào văn nghệ", detail: "Phụ trách tiết mục 20/11", points: +10, icon: "star" }
    ],
    goals: {
      gpaTarget: 8.8,
      englishTarget: 9.5,
      punctualityTarget: "Không đi muộn",
      universityTarget: "Ngôn Ngữ Anh - ĐH KHXH&NV",
      progressPercent: 85,
      monthlyReflection: {
        good: "Dẫn đầu môn Ngữ văn và Tiếng Anh.",
        improve: "Cần tập trung thêm môn Hóa học.",
        nextGoal: "Đạt 8.0 môn Hóa.",
        teacherFeedback: "Mai rất tích cực trong phong trào chung của lớp."
      }
    }
  },
  {
    id: "STU_004",
    studentCode: "HS12A904",
    fullName: "Lê Văn C",
    gender: "Nam",
    dob: "2009-11-02",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "0987555666",
    email: "levanc.12a9@school.edu.vn",
    group: "Tổ 2",
    fatherName: "Lê Văn Hoàng",
    fatherPhone: "0916555666",
    fatherJob: "Tài xế",
    motherName: "Nguyễn Thị Hoa",
    motherPhone: "0917555666",
    motherJob: "Buôn bán",
    scores: { math: 4.5, literature: 5.5, english: 5.0, gpa: 5.0 },
    scoreTrend: "DECLINING",
    conductGrade: "Khá",
    emulationPoints: 65,
    rank: 48,
    attendanceStats: { present: 38, excused: 4, unexcused: 3, late: 5, rate: 76.0 },
    atRisk: true,
    atRiskReason: "Vắng quá 3 buổi (7 buổi tổng cộng) & Môn Toán dưới 5.0 (4.5).",
    documents: { vneid: true, thcsCert: false, birthCert: true, infoForm: false, commitment: false },
    timeline: [
      { date: "08/09/2026", type: "PENALTY", title: "Vi phạm nội quy đi trễ", detail: "Đi trễ 30 phút tiết 1", points: -5, icon: "alert-triangle" },
      { date: "20/09/2026", type: "PENALTY", title: "Không làm bài tập", detail: "Bài tập môn Toán", points: -10, icon: "alert-triangle" }
    ],
    goals: {
      gpaTarget: 6.5,
      englishTarget: 6.0,
      punctualityTarget: "Giảm đi muộn",
      universityTarget: "Trường Cao Đẳng Kỹ Thuật",
      progressPercent: 40,
      monthlyReflection: {
        good: "Đã cố gắng đi học đầy đủ hơn tuần cuối.",
        improve: "Còn nghỉ học nhiều do bị ốm và ngủ quên.",
        nextGoal: "Không nghỉ không phép.",
        teacherFeedback: "C cần chú ý sức khỏe và tuân thủ thời gian đi học nhé. Thầy sẽ hỗ trợ C ôn môn Toán."
      }
    }
  },
  {
    id: "STU_005",
    studentCode: "HS12A905",
    fullName: "Minh Anh",
    gender: "Nữ",
    dob: "2009-09-02", // Birthday today!
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "0987777888",
    email: "minhanh.12a9@school.edu.vn",
    group: "Tổ 3",
    fatherName: "Nguyễn Minh Đức",
    fatherPhone: "0918777888",
    fatherJob: "Kiến trúc sư",
    motherName: "Đặng Thị Thảo",
    motherPhone: "0919777888",
    motherJob: "Bác sĩ thú y",
    scores: { math: 8.8, literature: 8.5, english: 9.4, gpa: 8.9 },
    scoreTrend: "IMPROVING",
    conductGrade: "Tốt",
    emulationPoints: 125,
    rank: 1,
    attendanceStats: { present: 45, excused: 0, unexcused: 0, late: 0, rate: 100 },
    atRisk: false,
    documents: { vneid: true, thcsCert: true, birthCert: true, infoForm: true, commitment: true },
    timeline: [
      { date: "02/09/2026", type: "TITLE", title: "Sinh nhật thứ 17", detail: "Lớp tổ chức chúc mừng sinh nhật", points: +5, icon: "gift" }
    ],
    goals: {
      gpaTarget: 9.0,
      englishTarget: 9.5,
      punctualityTarget: "100% Chuyên cần",
      universityTarget: "Đại Học Ngoại Thương",
      progressPercent: 95,
      monthlyReflection: {
        good: "Đạt kết quả xuất sắc môn Tiếng Anh và Toán.",
        improve: "Duy trì phong độ.",
        nextGoal: "Giữ vững vị trí đứng đầu lớp.",
        teacherFeedback: "Chúc mừng sinh nhật Minh Anh! Chúc em luôn tỏa sáng và đạt mọi mục tiêu."
      }
    }
  }
];

export const INITIAL_CONDUCT_CATALOG = {
  bonus: [
    { code: "BONUS_ACT", title: "Hỗ trợ hoạt động lớp", points: 5 },
    { code: "BONUS_DISC", title: "Phát biểu xây dựng bài", points: 5 },
    { code: "BONUS_ACAD", title: "Thành tích học tập", points: 10 },
    { code: "BONUS_MOVE", title: "Tham gia phong trào", points: 10 }
  ],
  penalty: [
    { code: "PENALTY_LATE", title: "Đi trễ", points: -5 },
    { code: "PENALTY_UNIFORM", title: "Không đồng phục", points: -5 },
    { code: "PENALTY_HOMEWORK", title: "Không làm bài", points: -10 },
    { code: "PENALTY_RULE", title: "Vi phạm nội quy", points: -10 }
  ]
};

export const INITIAL_BADGES = [
  { id: "B1", code: "EXCELLENCE", name: "Học tập xuất sắc", icon: "🌟", desc: "GPA >= 8.5 trong tháng" },
  { id: "B2", code: "HELPING_HAND", name: "Helping Hand", icon: "💙", desc: "Tích cực hỗ trợ hoạt động lớp" },
  { id: "B3", code: "MOST_IMPROVED", name: "Most Improved", icon: "🔥", desc: "Tiến bộ nhất tháng (Tăng điểm thi đua/học tập cao nhất)" },
  { id: "B4", code: "BOOKWORM", name: "Bookworm", icon: "📚", desc: "Đọc nhiều sách nhất thư viện" },
  { id: "B5", code: "GOAL_ACHIEVER", name: "Goal Achiever", icon: "🎯", desc: "Hoàn thành 100% mục tiêu Goal Tracker" },
  { id: "B6", code: "TEAM_PLAYER", name: "Team Player", icon: "🤝", desc: "Đóng góp tích cực nhất cho Tổ" },
  { id: "B7", code: "PERFECT_ATTENDANCE", name: "Perfect Attendance", icon: "⏰", desc: "100% chuyên cần, không đi muộn" }
];

export const INITIAL_GROUPS = [
  { id: "G1", name: "Tổ 1", leader: "Gia Huy", points: 450, rank: 1 },
  { id: "G2", name: "Tổ 2", leader: "Ngọc Mai", points: 420, rank: 2 },
  { id: "G3", name: "Tổ 3", leader: "Minh Anh", points: 415, rank: 3 },
  { id: "G4", name: "Tổ 4", leader: "Phạm Hồng Phúc", points: 390, rank: 4 }
];

export const INITIAL_TASKS = [
  {
    id: "TSK_01",
    title: "📌 Nộp bản photo VNeID / CCCD",
    deadline: "2026-09-05",
    assignedTo: "Tất cả học sinh",
    submittedCount: 42,
    totalCount: 50,
    status: "IN_PROGRESS",
    completedStudents: ["STU_001", "STU_002", "STU_003", "STU_005"]
  },
  {
    id: "TSK_02",
    title: "🎤 Chuẩn bị tiết mục văn nghệ 20/11",
    deadline: "2026-11-12",
    assignedTo: "Tổ 2",
    submittedCount: 8,
    totalCount: 12,
    status: "IN_PROGRESS",
    completedStudents: ["STU_003"]
  },
  {
    id: "TSK_03",
    title: "📝 Nộp phiếu đăng ký nguyện vọng đại học đợt 1",
    deadline: "2026-09-20",
    assignedTo: "Tất cả học sinh",
    submittedCount: 35,
    totalCount: 50,
    status: "IN_PROGRESS",
    completedStudents: ["STU_001", "STU_002", "STU_003", "STU_005"]
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANC_01",
    title: "📢 HỌP PHỤ HUYNH ĐẦU NĂM HỌC 2026-2027",
    content: "Trân trọng kính mời Quý Phụ huynh học sinh lớp 12A9 đến tham dự buổi Họp Phụ huynh đầu năm vào lúc 07:30 - Chủ nhật ngày 20/09/2026 tại Phòng học 12A9 (Tầng 3, Dãy nhà A). Sự có mặt của Quý Phụ huynh là niềm vinh hạnh cho lớp.",
    date: "2026-09-01",
    eventTime: "7:30 – Chủ nhật 20/09/2026",
    location: "Phòng 12A9",
    target: "Phụ huynh",
    readCount: 46,
    confirmAttendCount: 43,
    cannotAttendCount: 3,
    pendingCount: 4,
    receipts: [
      { studentId: "STU_001", parentName: "Nguyễn Văn B", status: "CONFIRMED", time: "02/09/2026 08:15" },
      { studentId: "STU_002", parentName: "Trần Gia Bảo", status: "CONFIRMED", time: "02/09/2026 08:30" },
      { studentId: "STU_003", parentName: "Phạm Văn Minh", status: "CONFIRMED", time: "02/09/2026 09:00" },
      { studentId: "STU_004", parentName: "Lê Văn Hoàng", status: "CANNOT_ATTEND", time: "02/09/2026 10:12" },
      { studentId: "STU_005", parentName: "Nguyễn Minh Đức", status: "CONFIRMED", time: "02/09/2026 07:50" }
    ]
  }
];

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: "LR_101",
    studentId: "STU_003",
    studentName: "Ngọc Mai",
    parentName: "Phạm Văn Minh",
    parentPhone: "0914333444",
    leaveDate: "2026-09-15",
    reason: "Cháu bị sốt siêu vi cần nghỉ học đi khám bác sĩ tại Bệnh viện Nhi Đồng.",
    proofUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=300&auto=format&fit=crop&q=80",
    status: "APPROVED",
    appliedAt: "2026-09-14 19:30",
    teacherNote: "Đã duyệt. Chúc em mau khỏe!"
  },
  {
    id: "LR_102",
    studentId: "STU_004",
    studentName: "Lê Văn C",
    parentName: "Lê Văn Hoàng",
    parentPhone: "0916555666",
    leaveDate: "2026-09-02",
    reason: "Gia đình có việc riêng về quê đột xuất.",
    proofUrl: null,
    status: "PENDING",
    appliedAt: "2026-09-02 06:15",
    teacherNote: ""
  }
];

export const INITIAL_CALENDAR_EVENTS = [
  { id: "E1", title: "📚 Kiểm tra 1 tiết môn Toán", date: "2026-09-10", category: "EXAM" },
  { id: "E2", title: "📢 Họp Phụ Huynh Đầu Năm", date: "2026-09-20", category: "MEETING" },
  { id: "E3", title: "🎂 Sinh nhật Minh Anh (12A9)", date: "2026-09-02", category: "BIRTHDAY" },
  { id: "E4", title: "📌 Deadline nộp VNeID photo", date: "2026-09-05", category: "DEADLINE" },
  { id: "E5", title: "🏫 Đại hội Chi đoàn 12A9", date: "2026-09-28", category: "ACTIVITY" }
];

export const INITIAL_POLLS = [
  {
    id: "POL_01",
    question: "Bạn chọn mẫu áo lớp nào cho năm học 12A9 (2026-2027)?",
    options: [
      { id: "O1", text: "Mẫu A - Áo Polo Nâu Phối Tay", votes: 24 },
      { id: "O2", text: "Mẫu B - Áo Oversize Xanh Navy", votes: 18 },
      { id: "O3", text: "Mẫu C - Áo Hoodie Đen Trắng", votes: 8 }
    ],
    votedStudents: ["STU_001", "STU_002", "STU_003", "STU_005"],
    totalVotes: 50,
    status: "OPEN"
  }
];

export const INITIAL_STUDENT_VOICES = [
  {
    id: "SV_01",
    category: "💬 Góp ý",
    title: "Góp ý thời gian sinh hoạt lớp cuối tuần",
    content: "Dạ thưa Thầy, mong Thầy dành 15 phút cuối giờ sinh hoạt thứ 7 để lớp chơi trò chơi minigame giải trí ạ.",
    isAnonymous: true,
    author: "Ẩn danh",
    date: "2026-08-30",
    status: "RESOLVED",
    response: "Thầy rất hoan nghênh! Thầy giao Ban cán sự lớp chuẩn bị minigame cho tuần tới nhé."
  },
  {
    id: "SV_02",
    category: "💡 Ý tưởng",
    title: "Tổ chức trang trí góc học tập 12A9",
    content: "Lớp mình có thể mua thêm cây xanh mini và bảng vinh danh mảng tường phía sau không ạ?",
    isAnonymous: false,
    author: "Ngọc Mai (Tổ 2)",
    date: "2026-09-01",
    status: "PENDING",
    response: ""
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: "M1",
    studentId: "STU_001",
    senderRole: "PARENT",
    senderName: "Nguyễn Văn B (PH Nguyễn Văn A)",
    time: "2026-09-01 18:30",
    content: "Dạ chào Thầy Đạt, đợt này cháu A ôn thi tổ hợp KHTN ở trường thế nào ạ?"
  },
  {
    id: "M2",
    studentId: "STU_001",
    senderRole: "GVCN",
    senderName: "Giáo Viên Chủ Nhiệm (GVCN)",
    time: "2026-09-01 18:45",
    content: "Chào anh B! Cháu A học môn Tiếng Anh rất xuất sắc (vừa đạt 9.0 bài kiểm tra). Môn Toán bài vừa rồi có giảm chút do nhầm lẫn tính toán, Thầy đã nhắc nhở cháu ôn tập kĩ hơn ạ."
  }
];
