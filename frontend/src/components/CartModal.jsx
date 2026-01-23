import React from "react";

const CartModal = ({ cart, onClose, onRemove, checkoutButton }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 font-bold text-xl">✕</button>
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Keranjang Belanja</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Keranjang kosong.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">Rp {item.price.toLocaleString("id-ID")}</p>
                </div>
                <button onClick={() => onRemove(idx)} className="text-red-500 font-bold">Hapus</button>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t mt-4">
              <span className="font-bold text-slate-700">Total</span>
              <span className="font-black text-blue-600">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            {/* Tombol Checkout selalu muncul jika ada item di cart */}
            {checkoutButton}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
