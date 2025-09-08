import { Link } from "react-router-dom";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { useAppStore } from "@/stores/appStore";

const Dashboard = () => {
  const { resumes } = useAppStore();

  const stats = {
    total: resumes.length,
    completed: resumes.filter((r) => r.isCompleted).length,
    inProgress: resumes.filter((r) => !r.isCompleted).length,
  };

  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 font-normal">
            Manage your professional resumes
          </p>
        </div>

        <Link
          to="/panel/resume/create"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-purple-500/25 min-w-[160px] justify-center">
          <Plus size={18} />
          Create Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400"></div>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <FileText size={20} className="text-purple-500" />
            </div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">
              Total Resumes
            </p>
          </div>
          <h2 className="text-4xl font-extrabold text-white">{stats.total}</h2>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircle2 size={20} className="text-green-500" />
            </div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">
              Completed
            </p>
          </div>
          <h2 className="text-4xl font-extrabold text-white">
            {stats.completed}
          </h2>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Clock size={20} className="text-amber-500" />
            </div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">
              In Progress
            </p>
          </div>
          <h2 className="text-4xl font-extrabold text-white">
            {stats.inProgress}
          </h2>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 min-h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
            <FileText size={24} />
            Recent Resumes
          </h2>
        </div>

        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="p-6 rounded-2xl bg-purple-500/5 border-2 border-dashed border-purple-500/20 mb-6">
              <FileText size={48} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Start building your professional resume to showcase your skills
              and experience
            </p>
            <Link
              to="/panel/resume/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white px-8 py-3 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:shadow-purple-500/25">
              <Plus size={18} />
              Create Your First Resume
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {resumes.slice(0, 5).map((resume) => (
              <div
                key={resume.id}
                className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/20 hover:bg-slate-700/50 hover:border-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-400/10 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                      <FileText size={20} className="text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {resume.title}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          <span className="text-sm text-slate-400">
                            Updated{" "}
                            {new Date(resume.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-lg border flex items-center gap-2 ${
                            resume.isCompleted
                              ? "bg-green-500/10 border-green-500/20"
                              : "bg-amber-500/10 border-amber-500/20"
                          }`}>
                          {resume.isCompleted ? (
                            <CheckCircle2
                              size={12}
                              className="text-green-500"
                            />
                          ) : (
                            <Clock size={12} className="text-amber-500" />
                          )}
                          <span
                            className={`text-xs font-medium ${
                              resume.isCompleted
                                ? "text-green-500"
                                : "text-amber-500"
                            }`}>
                            {resume.isCompleted ? "Complete" : "In Progress"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg text-slate-400 hover:bg-purple-500/10 hover:text-purple-500 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
