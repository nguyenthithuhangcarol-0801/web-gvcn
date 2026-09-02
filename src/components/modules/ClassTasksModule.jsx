import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, CheckSquare, Clock, Users, FileCheck, XCircle, AlertCircle } from 'lucide-react';

export const ClassTasksModule = () => {
  const { tasks, students, activeStudent, currentRole, toggleTaskCompletion } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('tasks'); // 'tasks' | 'documents'

  const incompleteDocStudents = students.filter(s => !s.documents.infoForm || !s.documents.commitment);

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'tasks'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Nhiệm Vụ Lớp (Class Tasks)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('documents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'documents'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Checklist Hồ Sơ Đầu Năm</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline px-3">
          Thay vì nhắc nhóm chat, GVCN tạo nhiệm vụ để học sinh bấm hoàn thành.
        </span>
      </div>

      {activeSubTab === 'tasks' ? (
        /* SECTION 1: CLASS TASKS */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map(task => {
              const isCompletedByActiveStudent = task.completedStudents.includes(activeStudent.id);
              const unsubmittedCount = task.totalCount - task.submittedCount;

              return (
                <div key={task.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>Deadline: <strong>{task.deadline}</strong> • Phụ trách: {task.assignedTo}</span>
                      </p>
                    </div>

                    {/* Student Complete Toggle Button */}
                    {currentRole === 'STUDENT' && (
                      <button
                        onClick={() => toggleTaskCompletion(task.id, activeStudent.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                          isCompletedByActiveStudent
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>{isCompletedByActiveStudent ? '☑ Đã hoàn thành' : '☐ Bấm Hoàn thành'}</span>
                      </button>
                    )}
                  </div>

                  {/* Teacher Progress Breakdown Widget (Point #9 requirement) */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5" /> ✅ Đã nộp: {task.submittedCount}/{task.totalCount}
                      </span>
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> ❌ Chưa nộp: {unsubmittedCount}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${(task.submittedCount / task.totalCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* SECTION 2: DOCUMENT CHECKLIST (Yêu cầu quan trọng điểm #10) */
        <div className="space-y-6">
          {/* Overview Dashboard Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">HỒ SƠ ĐẦU NĂM CỦA LỚP</div>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Đã hoàn tất hồ sơ: <span className="text-emerald-600">44/50 học sinh</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Checklist: VNeID photo, Bằng THCS, Khai sinh, Phiếu TT, Cam kết nội quy</p>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-center">
              <div className="text-xs font-bold text-rose-800">Còn thiếu hồ sơ</div>
              <div className="text-2xl font-black text-rose-600">6 học sinh</div>
            </div>
          </div>

          {/* Drill-down Missing List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Danh Sách 6 Học Sinh Còn Thiếu Hồ Sơ:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {incompleteDocStudents.map(s => (
                <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{s.fullName} ({s.group})</div>
                      <div className="text-[10px] text-rose-600 font-semibold">
                        Thiếu: {!s.documents.infoForm ? 'Phiếu TT' : ''} {!s.documents.commitment ? '• Cam kết nội quy' : ''}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] bg-rose-100 text-rose-800 font-bold px-2.5 py-1 rounded-lg">
                    Chưa xong
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
