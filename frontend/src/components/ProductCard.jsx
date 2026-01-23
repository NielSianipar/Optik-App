import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group hover:shadow-2xl transition-all duration-300">
      <div className="overflow-hidden relative h-64">
        <img 
          src={product.image_url || "https://placehold.co/600x400"} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-800">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-4 flex-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-black text-blue-600">
            Rp {product.price?.toLocaleString('id-ID')}
          </span>
          <button 
            onClick={() => onAddToCart(product)} 
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;