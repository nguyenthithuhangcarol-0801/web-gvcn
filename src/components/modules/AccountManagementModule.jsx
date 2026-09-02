import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Unlock, Key, UserCheck, AlertTriangle } from 'lucide-react';

export const AccountManagementModule = () => {
  const { students, toggleLockAccount } = useApp();

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">AUTH-09: Quản Lý & Khóa Tài Khoản Học Sinh</h2>
            <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
              Quyền Giáo Viên / Admin
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Tạm khóa hoặc kích hoạt lại tài khoản học sinh • Quản lý Mã PIN tra cứu cho Phụ huynh</p>
        </div>
      </div>

      {/* Account Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">DANH SÁCH TÀI KHOẢN HỌC SINH LỚP 12A9</span>
          <span className="text-xs text-slate-500 font-medium">Tổng số: {students.length} tài khoản</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 pl-5">Học sinh</th>
                <th className="p-3.5">Mã PIN PH (AUTH-04)</th>
                <th className="p-3.5 text-center">Trạng thái Account</th>
                <th className="p-3.5 text-right pr-5">Thao tác (AUTH-09)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map(s => {
                const isLocked = s.isLocked || false;
                const parentPin = `PIN-${s.id.replace('STU_', 'STU')}`;

                return (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900">{s.fullName}</div>
                          <div className="text-[10px] text-slate-500">{s.studentCode} • {s.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* AUTH-04 Parent PIN */}
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                        {parentPin}
                      </span>
                    </td>

                    {/* Status badge */}
                    <td className="p-3.5 text-center">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${
                        isLocked
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {isLocked ? '🔴 Đã bị khóa' : '🟢 Hoạt động'}
                      </span>
                    </td>

                    {/* AUTH-09 Lock / Unlock Action button */}
                    <td className="p-3.5 text-right pr-5">
                      <button
                        onClick={() => toggleLockAccount(s.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ml-auto ${
                          isLocked
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>{isLocked ? 'Kích Hoạt Lại' : 'Tạm Khóa Account'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
