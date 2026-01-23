import React, { useState } from "react";

const paymentMethods = [
  { id: "bank", label: "Transfer Bank" },
  { id: "ewallet", label: "E-Wallet (OVO, GoPay, Dana)" },
  { id: "cod", label: "Bayar di Tempat (COD)" },
];

const CheckoutModal = ({ cart, onClose, onSubmit, user }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert("Alamat dan nomor HP wajib diisi!");
      return;
    }
    setLoading(true);
    await onSubmit({ address, phone, payment });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 font-bold text-xl">✕</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Nama</label>
            <input type="text" value={user?.name || ""} disabled className="w-full p-3 border rounded-lg bg-slate-100" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Alamat Pengiriman</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} required className="w-full p-3 border rounded-lg" placeholder="Alamat lengkap" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Nomor HP</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-3 border rounded-lg" placeholder="08xxxxxxxxxx" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Metode Pembayaran</label>
            <select value={payment} onChange={e => setPayment(e.target.value)} className="w-full p-3 border rounded-lg">
              {paymentMethods.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <span className="font-bold text-slate-700">Total</span>
            <span className="font-black text-blue-600">Rp {total.toLocaleString("id-ID")}</span>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-blue-700 transition-colors">
            {loading ? "Memproses..." : "Pesan Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
