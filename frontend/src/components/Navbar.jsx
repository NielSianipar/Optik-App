import React from "react";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiClock,
  FiBookOpen,
} from "react-icons/fi";

const Navbar = ({
  user,
  cartCount,
  onShowLogin,
  onLogout,
  onCheckout,
  onShowHistory,
  onCategoryChange,
  onShowArticles,
  currentCategory,
  viewMode,
}) => {
  const categories = [
    { id: "frame", name: "Frame" },
    { id: "lensa", name: "Lensa" },
    { id: "softlens", name: "Softlens" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-mint-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* 1. LOGO */}
        <button
          onClick={() => onCategoryChange("")}
          className="text-2xl font-black text-blue-600 tracking-tighter hover:opacity-80 transition-opacity"
        >
          OPTIK<span className="text-mint-500">.MODERN</span>
        </button>

        {/* 2. MENU TENGAH */}
        <div className="hidden md:flex items-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                viewMode === "shop" && currentCategory === cat.id
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-slate-600 hover:text-mint-500"
              }`}
            >
              {cat.name}
            </button>
          ))}

          <button
            onClick={() => onCategoryChange("best_seller")}
            className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 transition-colors ${
              viewMode === "shop" && currentCategory === "best_seller"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-orange-500 hover:text-orange-600"
            }`}
          >
            Best Seller <span className="text-base">🔥</span>
          </button>

          <div className="w-px h-6 bg-slate-200 mx-2"></div>

          <button
            onClick={onShowArticles}
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              viewMode === "articles"
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-slate-800 hover:text-mint-500"
            }`}
          >
            <FiBookOpen className="text-lg" /> Artikel
          </button>
        </div>

        {/* 3. MENU USER & CART */}
        <div className="flex items-center gap-3">
          {/* TOMBOL CART (Selalu Muncul) */}
          <button
            onClick={onCheckout}
            className="relative flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-black text-xs hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            <FiShoppingCart className="text-base" />
            <span className="hidden sm:inline">CART</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            // TAMPILAN JIKA SUDAH LOGIN
            <div className="flex items-center gap-2 bg-mint-50 p-1.5 pr-4 rounded-full border border-mint-100">
              <div className="w-8 h-8 bg-mint-500 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg shadow-mint-200">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="hidden lg:flex flex-col leading-none ml-1">
                <span className="text-[10px] text-mint-600 font-bold uppercase tracking-tighter">
                  Welcome
                </span>
                <span className="text-xs font-black text-slate-800">
                  {user.name}
                </span>
              </div>

              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={onShowHistory}
                  title="Riwayat Pesanan"
                  className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <FiClock className="text-lg" />
                </button>
                <button
                  onClick={onLogout}
                  title="Keluar"
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            </div>
          ) : (
            // TAMPILAN JIKA BELUM LOGIN
            <button
              onClick={onShowLogin}
              className="flex items-center gap-2 bg-mint-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-mint-600 transition-all shadow-lg shadow-mint-200"
            >
              <FiUser className="text-lg" /> Masuk
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden flex gap-4 overflow-x-auto px-6 py-3 border-t border-slate-50 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className="text-[10px] font-black text-slate-500 uppercase whitespace-nowrap bg-slate-100 px-3 py-1 rounded-full"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
