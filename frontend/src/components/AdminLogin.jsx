import React, { useState } from "react";
import { FiShield, FiMail, FiLock, FiArrowLeft } from "react-icons/fi";

const AdminLogin = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-8 font-bold text-sm transition-all">
          <FiArrowLeft /> KEMBALI KE TOKO
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-200">
            <FiShield className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">ADMIN ACCESS</h2>
          <p className="text-slate-500 mt-2 font-medium">Panel Kendali Optic Pro</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin({ email, password }); }} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Administrator</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" required className="w-full bg-slate-50 border-2 border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 transition-all font-semibold" placeholder="admin@optic.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" required className="w-full bg-slate-50 border-2 border-slate-100 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 transition-all font-semibold" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-lg mt-4 active:scale-95">MASUK SEKARANG</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;