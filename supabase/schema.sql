-- SQL MIGRATION SCHEMA FOR WEB GVCN (TRUNG TÂM ĐIỀU HÀNH LỚP HỌC)
-- Chạy kịch bản này trong Supabase Dashboard -> SQL Editor để tạo bảng & khởi tạo dữ liệu

-- 1. Bảng Thông Tin Lớp
CREATE TABLE IF NOT EXISTS public.class_info (
    id TEXT PRIMARY KEY DEFAULT '12A9',
    class_name VARCHAR(50) NOT NULL,
    cohort VARCHAR(50) NOT NULL,
    academic_year VARCHAR(50) NOT NULL,
    total_students INT DEFAULT 50,
    present_today INT DEFAULT 48,
    excused_absence INT DEFAULT 1,
    unexcused_absence INT DEFAULT 1,
    late_today INT DEFAULT 2,
    gvcn_name VARCHAR(100) NOT NULL,
    school_name VARCHAR(150) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Bảng Học Sinh
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    student_code VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    dob DATE,
    avatar TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    group_name VARCHAR(20),
    father_name VARCHAR(100),
    father_phone VARCHAR(20),
    father_job VARCHAR(100),
    mother_name VARCHAR(100),
    mother_phone VARCHAR(20),
    mother_job VARCHAR(100),
    scores JSONB DEFAULT '{}'::jsonb,
    score_trend VARCHAR(20) DEFAULT 'STABLE',
    conduct_grade VARCHAR(20) DEFAULT 'Tốt',
    emulation_points INT DEFAULT 100,
    rank_in_class INT,
    attendance_stats JSONB DEFAULT '{"present": 45, "excused": 0, "unexcused": 0, "late": 0, "rate": 100}'::jsonb,
    at_risk BOOLEAN DEFAULT false,
    at_risk_reason TEXT,
    documents JSONB DEFAULT '{"vneid": true, "thcsCert": true, "birthCert": true, "infoForm": true, "commitment": true}'::jsonb,
    timeline JSONB DEFAULT '[]'::jsonb,
    goals JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Bảng Điểm Danh Hàng Ngày
CREATE TABLE IF NOT EXISTS public.attendance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(30) NOT NULL,
    arrival_time TIME,
    absence_reason TEXT,
    proof_url TEXT,
    note TEXT,
    parent_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Bảng Điểm Nề Nếp & Vi Phạm
CREATE TABLE IF NOT EXISTS public.conduct_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
    date_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    type VARCHAR(20) NOT NULL, -- 'BONUS' | 'PENALTY'
    category_title VARCHAR(100) NOT NULL,
    points INT NOT NULL,
    recorded_by VARCHAR(100) DEFAULT 'GVCN',
    notes TEXT
);

-- 5. Bảng Nhiệm Vụ Lớp
CREATE TABLE IF NOT EXISTS public.class_tasks (
    id TEXT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    deadline DATE,
    assigned_to VARCHAR(100) DEFAULT 'Tất cả học sinh',
    submitted_count INT DEFAULT 0,
    total_count INT DEFAULT 50,
    status VARCHAR(30) DEFAULT 'IN_PROGRESS',
    completed_students JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Bảng Thông Báo GVCN
CREATE TABLE IF NOT EXISTS public.announcements (
    id TEXT PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    content TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    event_time VARCHAR(100),
    location VARCHAR(100),
    target VARCHAR(50) DEFAULT 'Phụ huynh',
    read_count INT DEFAULT 0,
    confirm_attend_count INT DEFAULT 0,
    cannot_attend_count INT DEFAULT 0,
    pending_count INT DEFAULT 50,
    receipts JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. Bảng Đơn Xin Phép Nghỉ Học
CREATE TABLE IF NOT EXISTS public.leave_requests (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
    student_name VARCHAR(100) NOT NULL,
    parent_name VARCHAR(100),
    parent_phone VARCHAR(20),
    leave_date DATE NOT NULL,
    reason TEXT NOT NULL,
    proof_url TEXT,
    status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING' | 'APPROVED' | 'REJECTED'
    applied_at VARCHAR(50),
    teacher_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. Bảng Khảo Sát & Polls
CREATE TABLE IF NOT EXISTS public.polls (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    options JSONB DEFAULT '[]'::jsonb,
    voted_students JSONB DEFAULT '[]'::jsonb,
    total_votes INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'OPEN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. Bảng Student Voice (Góc Học Sinh)
CREATE TABLE IF NOT EXISTS public.student_voices (
    id TEXT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT true,
    author VARCHAR(100),
    date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'PENDING',
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. Bảng Chat GVCN ↔ PH
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES public.students(id) ON DELETE CASCADE,
    sender_role VARCHAR(20) NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    time VARCHAR(50),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.class_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conduct_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access for demo / anon role
CREATE POLICY "Public Anon Read Access" ON public.students FOR SELECT USING (true);
CREATE POLICY "Public Anon Write Access" ON public.students FOR ALL USING (true);

CREATE POLICY "Public Anon Class Info Read" ON public.class_info FOR SELECT USING (true);
CREATE POLICY "Public Anon Class Info Write" ON public.class_info FOR ALL USING (true);

CREATE POLICY "Public Anon Leave Requests" ON public.leave_requests FOR ALL USING (true);
CREATE POLICY "Public Anon Announcements" ON public.announcements FOR ALL USING (true);
CREATE POLICY "Public Anon Chat Messages" ON public.chat_messages FOR ALL USING (true);
CREATE POLICY "Public Anon Polls" ON public.polls FOR ALL USING (true);
CREATE POLICY "Public Anon Student Voices" ON public.student_voices FOR ALL USING (true);
CREATE POLICY "Public Anon Tasks" ON public.class_tasks FOR ALL USING (true);
