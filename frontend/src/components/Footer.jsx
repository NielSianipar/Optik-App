import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* KOLOM 1: Brand & Visi */}
          <div>
            <h2 className="text-3xl font-bold text-blue-500 mb-4 tracking-tighter">OPTIK.MODERN</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Pusat kacamata dan lensa terlengkap dengan teknologi pemeriksaan mata terkini. 
              Kami berkomitmen menjaga kesehatan mata Anda dengan gaya yang tetap "trendy".
            </p>
            <div className="flex gap-4">
              {/* Ikon Sosmed Sederhana */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">WA</a>
            </div>
          </div>

          {/* KOLOM 2: Struktur Pemilik (Yang sudah ada) */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-2 text-blue-400">Tim Ahli Kami</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 hover:bg-slate-800 p-2 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">DS</div>
                <div>
                  <p className="font-bold text-base">Daniel Sianipar</p>
                  <p className="text-slate-400 text-xs">CEO & Founder</p>
                </div>
              </div>
              <div className="flex items-center gap-4 hover:bg-slate-800 p-2 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-sm">MR</div>
                <div>
                  <p className="font-bold text-base">M.rifqi</p>
                  <p className="text-slate-400 text-xs">Head Optometrist</p>
                </div>
              </div>
              <div className="flex items-center gap-4 hover:bg-slate-800 p-2 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-sm">BS</div>
                <div>
                  <p className="font-bold text-base">Budi Santoso</p>
                  <p className="text-slate-400 text-xs">Store Manager</p>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 3: LOKASI & KONTAK (BARU) */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-2 text-blue-400">Kunjungi Toko</h3>
            
            {/* Alamat */}
            <div className="mb-4">
              <p className="text-slate-300 font-semibold flex items-center gap-2">
                📍 Alamat:
              </p>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                Jl. Sunggal Gg. Bakul No. 12<br/>
                Kec. Medan Sunggal, Kota Medan<br/>
                Sumatera Utara, 20128
              </p>
            </div>

            {/* Embed Google Maps */}
            <div className="w-full h-32 bg-slate-800 rounded-lg overflow-hidden mb-4 border border-slate-700">
              <iframe 
                title="Lokasi Optik Modern"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.990426177894!2d98.636657!3d3.589417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e52e4f04c7d%3A0x6b7b7b7b7b7b7b7b!2sJl.%20Sunggal%2C%20Medan!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>

            {/* Kontak & Jam Buka */}
            <div className="space-y-2 text-sm text-slate-400">
              <p>📞 <span className="text-white hover:text-blue-400 cursor-pointer">+62 812-3456-7890</span></p>
              <p>✉️ <span className="text-white hover:text-blue-400 cursor-pointer">hello@optikmodern.com</span></p>
              <p>🕒 <span className="text-yellow-500 font-semibold">Buka Setiap Hari: 09.00 - 21.00 WIB</span></p>
            </div>
          </div>

        </div>
        
        <div className="text-center text-slate-600 text-sm pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Optik Modern by Daniel. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500">Kebijakan Privasi</a>
            <a href="#" className="hover:text-blue-500">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;