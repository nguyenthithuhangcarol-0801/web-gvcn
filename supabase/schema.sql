-- FULL SUPABASE SCHEMA & RLS MIGRATION FOR AUTH-01 TO AUTH-10

-- 1. Bảng User Profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150),
    avatar_url TEXT,
    phone_number VARCHAR(30),
    school_name VARCHAR(150) DEFAULT 'THPT Chuyên Nguyễn Du',
    class_name VARCHAR(50) DEFAULT '12A9',
    role VARCHAR(20) DEFAULT 'STUDENT', -- 'ADMIN' | 'TEACHER' | 'STUDENT'
    is_locked BOOLEAN DEFAULT false,
    parent_access_pin VARCHAR(20) UNIQUE,
    license_key VARCHAR(50),
    privacy_settings JSONB DEFAULT '{"hideEmail": false, "hideGradeOnLeaderboard": false}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Bảng Catalog Mã Kích Hoạt License (AUTH-07)
CREATE TABLE IF NOT EXISTS public.license_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_code VARCHAR(50) UNIQUE NOT NULL,
    role_granted VARCHAR(20) DEFAULT 'TEACHER',
    is_used BOOLEAN DEFAULT false,
    used_by_user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Chèn sẵn mã License Mẫu: GVCN-VIP-2026
INSERT INTO public.license_keys (key_code, role_granted)
VALUES ('GVCN-VIP-2026', 'TEACHER'), ('ADMIN-SUPER-2026', 'ADMIN')
ON CONFLICT (key_code) DO NOTHING;

-- 3. Bảng Session Thiết Bị Đăng Nhập (AUTH-08)
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    device_info TEXT,
    ip_address VARCHAR(50),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Phân Quyền Row Level Security 3 Cấp (AUTH-03)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Policies cho User Profiles
CREATE POLICY "Admin Full Access Profiles" ON public.user_profiles
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR EXISTS (
        SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'ADMIN'
    ));

CREATE POLICY "Users Read Own & Public Profiles" ON public.user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Users Update Own Profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Trigger Tự Động Tạo Profile Khi Đăng Ký Tài Khoản Mới
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, parent_access_pin)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'STUDENT',
    'PIN-' || upper(substring(md5(random()::text) from 1 for 6))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
