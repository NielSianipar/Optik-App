import React, { useState } from "react";

const paymentMethods = [
  { id: "qris", label: "QRIS (Scan Barcode)" },
  { id: "dana", label: "DANA" },
  { id: "cod", label: "Bayar di Tempat (COD)" },
];

const CheckoutPage = ({ cart, user, onBack, onSubmit }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert("Alamat dan nomor HP wajib diisi!");
      return;
    }

    if (payment === "qris") {
      setShowQRModal(true);
      return;
    }

    // Default submit for other methods
    await processOrder();
  };

  const processOrder = async () => {
    setLoading(true);
    await onSubmit({ address, phone, payment });
    setLoading(false);
    setShowQRModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-10 relative">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in duration-500">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 font-bold hover:underline"
        >
          ← Kembali ke Keranjang
        </button>
        <h2 className="text-2xl font-black mb-6 text-center text-slate-800">
          Checkout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Nama
            </label>
            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Alamat Pengiriman
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 ring-blue-500 outline-none transition-all"
              placeholder="Alamat lengkap penerima"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Nomor HP
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 ring-blue-500 outline-none transition-all"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Metode Pembayaran
            </label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 ring-blue-500 outline-none transition-all font-bold text-slate-700"
            >
              {paymentMethods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>

            {/* CONDITIONAL PAYMENT INFO */}
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 dark:border-slate-200">
              {payment === "dana" && (
                <div className="text-center animate-in zoom-in-95 duration-300">
                  <p className="text-sm font-bold text-slate-500 mb-1">
                    Silakan Transfer ke Nomor DANA:
                  </p>
                  <p className="text-2xl font-black text-blue-600 tracking-wider select-all cursor-pointer bg-white p-2 rounded-lg border border-dashed border-blue-200 inline-block">
                    0821 6215 4841
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    Ketuk nomor untuk menyalin
                  </p>
                </div>
              )}

              {payment === "qris" && (
                <div className="text-center animate-in zoom-in-95 duration-300">
                  <p className="text-sm font-bold text-slate-500">
                    Klik "Pesan Sekarang" untuk menampilkan QR Code pembayaran.
                  </p>
                </div>
              )}

              {payment === "cod" && (
                <div className="text-center animate-in zoom-in-95 duration-300 flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                    <span className="font-bold text-lg">Rp</span>
                  </div>
                  <p className="text-sm font-bold text-slate-600">
                    Siapkan uang tunai saat kurir tiba
                  </p>
                  <p className="text-xs text-slate-400">
                    Pastikan alamat pengiriman sudah lengkap
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="pt-4 border-t mt-4">
            <span className="font-bold text-slate-700">Ringkasan Pesanan:</span>
            <ul className="mt-2 mb-2 text-sm text-slate-600">
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.name} - Rp {item.price.toLocaleString("id-ID")}
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center font-bold mt-2">
              <span>Total</span>
              <span className="font-black text-blue-600">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Memproses..." : "Pesan Sekarang"}
          </button>
        </form>
      </div>

      {/* QRIS PAYMENT MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Pembayaran QRIS
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Scan QR di bawah ini untuk membayar sebesar{" "}
              <span className="font-bold text-slate-800">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </p>

            <div className="bg-white p-4 rounded-xl inline-block shadow-inner border border-slate-100 mb-6 relative group">
              <img
                src="/qris.jpeg"
                alt="Scan QRIS DANA"
                className="w-48 h-48 mx-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/200x200?text=QR+Code+Missing";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Scan untuk Bayar
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={processOrder}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Memproses..." : "Saya Sudah Bayar"}
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                disabled={loading}
                className="w-full bg-slate-100 text-slate-500 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Batal / Ganti Metode
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
