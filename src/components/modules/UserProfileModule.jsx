import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Phone, Mail, Shield, Key, Smartphone, Lock, Eye, EyeOff, Save, CheckCircle, Sparkles, LogOut } from 'lucide-react';

export const UserProfileModule = () => {
  const { currentRole, userProfile, updateUserProfile, handleActivateLicenseKey, userSessions, handleRemoteSignOut } = useApp();

  const [profileData, setProfileData] = useState({
    fullName: userProfile?.full_name || 'Nguyễn Văn A',
    phone: userProfile?.phone_number || '0987654321',
    avatarUrl: userProfile?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    schoolName: userProfile?.school_name || 'Trường THPT Chuyên Nguyễn Du',
    className: userProfile?.class_name || '12A9'
  });

  const [licenseInput, setLicenseInput] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    hideEmail: userProfile?.privacy_settings?.hideEmail || false,
    hideGradeOnLeaderboard: userProfile?.privacy_settings?.hideGradeOnLeaderboard || false
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(profileData);
    alert('Đã cập nhật thông tin Profile cá nhân thành công!');
  };

  const handleActivateVIP = (e) => {
    e.preventDefault();
    if (!licenseInput.trim()) return;
    const res = handleActivateLicenseKey(licenseInput);
    if (res.success) {
      alert(`🎉 Kích hoạt mã VIP/License thành công! Tài khoản của bạn đã nâng cấp lên vai trò: ${res.grantedRole}`);
      setLicenseInput('');
    } else {
      alert(`❌ ${res.error}`);
    }
  };

  const togglePrivacy = (key) => {
    const updated = { ...privacySettings, [key]: !privacySettings[key] };
    setPrivacySettings(updated);
    updateUserProfile({ privacy_settings: updated });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={profileData.avatarUrl}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold">{profileData.fullName}</h2>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                {currentRole}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{profileData.schoolName} • Lớp {profileData.className}</p>
          </div>
        </div>
      </div>

      {/* Grid: Profile Edit Left + License & Privacy Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AUTH-05 Edit Profile (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-200 pb-3">
            <User className="w-4 h-4 text-indigo-600" />
            <span>AUTH-05: Cập Nhật Profile Cá Nhân</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Họ và tên:</label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Số điện thoại liên hệ:</label>
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Link Ảnh đại diện (Avatar URL):</label>
              <input
                type="text"
                value={profileData.avatarUrl}
                onChange={(e) => setProfileData({ ...profileData, avatarUrl: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Trường học:</label>
                <input
                  type="text"
                  value={profileData.schoolName}
                  onChange={(e) => setProfileData({ ...profileData, schoolName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Lớp chủ nhiệm:</label>
                <input
                  type="text"
                  value={profileData.className}
                  onChange={(e) => setProfileData({ ...profileData, className: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Thay Đổi Profile</span>
            </button>
          </form>
        </div>

        {/* Right: AUTH-07 License + AUTH-10 Privacy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AUTH-07: VIP License Activation */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>AUTH-07: Mã Kích Hoạt VIP / License Key</span>
            </h3>
            <p className="text-[11px] text-amber-800">
              Nhập mã kích hoạt (Thử nghiệm: <code className="bg-amber-200 px-1 font-bold">GVCN-VIP-2026</code>) để nâng cấp tài khoản lên Giáo Viên/Admin.
            </p>

            <form onSubmit={handleActivateVIP} className="flex gap-2">
              <input
                type="text"
                placeholder="GVCN-VIP-2026"
                value={licenseInput}
                onChange={(e) => setLicenseInput(e.target.value)}
                className="flex-1 text-xs font-mono font-bold bg-white border border-amber-300 rounded-xl px-3 py-2 text-slate-900 uppercase"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 shadow-xs"
              >
                Kích Hoạt
              </button>
            </form>
          </div>

          {/* AUTH-10: Privacy Settings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>AUTH-10: Thiết Lập Quyền Riêng Tư</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div
                onClick={() => togglePrivacy('hideEmail')}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-900">Ẩn Email cá nhân</div>
                  <div className="text-[10px] text-slate-500">Không hiển thị Email với các học sinh khác</div>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${privacySettings.hideEmail ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
                </div>
              </div>

              <div
                onClick={() => togglePrivacy('hideGradeOnLeaderboard')}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-900">Ẩn điểm số trên Leaderboard</div>
                  <div className="text-[10px] text-slate-500">Chỉ hiển thị thứ hạng mà không hiện điểm số chi tiết</div>
                </div>
                <div className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${privacySettings.hideGradeOnLeaderboard ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
                </div>
              </div>
            </div>
          </div>

          {/* AUTH-08: Session Management */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>AUTH-08: Quản Lý Session Đăng Nhập</span>
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              {userSessions.map(session => (
                <div key={session.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{session.deviceInfo}</span>
                      {session.isCurrent && <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">Hiện tại</span>}
                    </div>
                    <div className="text-[10px] text-slate-500">IP: {session.ipAddress} • {session.lastActive}</div>
                  </div>

                  {!session.isCurrent && (
                    <button
                      onClick={() => handleRemoteSignOut(session.id)}
                      className="text-[11px] text-rose-600 font-bold hover:underline flex items-center gap-1"
                    >
                      <LogOut className="w-3 h-3" /> Đăng xuất từ xa
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
