import React, { useState } from 'react';

const AuthModal = ({ onClose, onLogin, onRegister }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      onRegister({ name, email, password });
    } else {
      onLogin({ email, password });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">✕</button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
          {isRegisterMode ? "Buat Akun Baru" : "Login Pelanggan"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <input 
              type="text" placeholder="Nama Lengkap" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={name} onChange={e => setName(e.target.value)} required
            />
          )}
          <input 
            type="email" placeholder="Email Address" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={email} onChange={e => setEmail(e.target.value)} required
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password} onChange={e => setPassword(e.target.value)} required
          />
          
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            {isRegisterMode ? "Daftar Sekarang" : "Masuk"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          {isRegisterMode ? "Sudah punya akun? " : "Belum punya akun? "}
          <button 
            onClick={() => setIsRegisterMode(!isRegisterMode)} 
            className="text-blue-600 font-bold hover:underline"
          >
            {isRegisterMode ? "Login disini" : "Daftar disini"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;