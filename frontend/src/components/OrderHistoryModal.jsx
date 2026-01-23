import React from 'react';

const OrderHistoryModal = ({ orders, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 font-bold text-xl">✕</button>
        
        <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4">Riwayat Pesanan Saya</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Belum ada riwayat pesanan.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                      Order #{order.id}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{order.created_at}</span>
                  </div>
                  <span className="font-bold text-slate-700 bg-yellow-100 px-2 py-1 rounded text-xs border border-yellow-200">
                    {order.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 font-medium">{order.items_summary}</p>
                
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-xs text-gray-500">Total Pembayaran</span>
                  <span className="text-lg font-black text-blue-600">
                    Rp {order.total_price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryModal;