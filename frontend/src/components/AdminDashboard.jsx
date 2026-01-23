import React, { useState, useEffect } from "react";
import {
  FiBox,
  FiShoppingCart,
  FiLogOut,
  FiPlus,
  FiTrash2,
  FiPieChart,
  FiDollarSign,
  FiUsers,
  FiEdit3,
  FiCheckCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Swal from "sweetalert2"; // Import Swal

const AdminDashboard = ({ onLogout, user }) => {
  // ... existing state ...
  const [theme, setTheme] = useState("dark"); // Default dark theme
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState([]);

  // ... existing useEffect ...
  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchStats();
  }, []);

  // ... existing fetch functions ...
  const fetchStats = () => {
    fetch("http://localhost:8080/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data || []));
  };

  const fetchOrders = () => {
    fetch("http://localhost:8080/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data || []));
  };

  const fetchProducts = () => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data || []));
  };

  // HANDLERS
  const handleAddProduct = async (productData) => {
    const method = productData.id ? "PUT" : "POST";
    const url = productData.id
      ? `http://localhost:8080/admin/products/${productData.id}`
      : "http://localhost:8080/admin/products";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Hapus produk ini secara permanen?")) {
      await fetch(`http://localhost:8080/admin/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await fetch(`http://localhost:8080/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders();
  };

  const handleValidatePayment = async (orderId) => {
    const result = await Swal.fire({
      title: "Validasi Pembayaran?",
      text: "Pastikan dana sudah masuk ke rekening Anda.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Ya, Validasi!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:8080/admin/orders/${orderId}/payment`,
          {
            method: "PUT",
          },
        );

        if (res.ok) {
          Swal.fire({
            title: "Berhasil!",
            text: "Status pembayaran telah diperbarui.",
            icon: "success",
            confirmButtonColor: "#3B82F6",
          });
          fetchOrders();
        } else {
          throw new Error("Gagal update");
        }
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat validasi.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      }
    }
  };

  // --- STATS LOGIC ---
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.payment_status === "Lunas" ? o.total_price : 0),
    0,
  );
  const pendingOrders = orders.filter((o) => o.status !== "Selesai").length;

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white p-4 rounded-xl shadow-2xl border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">{label}</p>
          <p className="text-lg font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            Rp {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`${theme} flex min-h-screen font-sans selection:bg-blue-500/30`}
    >
      <div className="flex-1 flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-500">
        {/* SIDEBAR - FLOATING GLASS */}
        <aside className="fixed left-4 top-4 bottom-4 w-72 bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col z-50 shadow-2xl dark:shadow-slate-900/50 overflow-hidden transition-colors duration-500">
          <div className="p-10 border-b border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20"></div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                OPTIK
                <span className="text-blue-500 dark:text-blue-400">APP</span>
              </h1>
            </div>
          </div>

          <nav className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 mb-2">
              Menu Utama
            </div>
            <SidebarItem
              icon={<FiPieChart className="text-lg" />}
              label="Overview"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarItem
              icon={<FiShoppingCart className="text-lg" />}
              label="Pesanan"
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
              badge={pendingOrders}
            />
            <SidebarItem
              icon={<FiBox className="text-lg" />}
              label="Produk"
              active={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
          </nav>

          <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-gradient-to-t from-slate-100/50 dark:from-slate-900/50 to-transparent">
            <button
              onClick={onLogout}
              className="flex items-center gap-4 w-full p-4 text-red-500 dark:text-red-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 rounded-2xl transition-all font-bold text-sm group border border-transparent hover:border-red-500/20"
            >
              <FiLogOut className="group-hover:-translate-x-1 transition-transform" />{" "}
              Keluar Panel
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-80 p-8 min-h-screen">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-12 sticky top-4 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl transition-colors duration-500">
            <div className="pl-4">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                {activeTab === "dashboard"
                  ? "Ringkasan Bisnis"
                  : activeTab === "products"
                    ? "Katalog Produk"
                    : "Daftar Pesanan"}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                Update terakhir: {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-4 pr-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 flex items-center justify-center border border-slate-200 dark:border-white/10 hover:scale-110 transition-transform shadow-sm"
              >
                {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              <div className="flex items-center gap-4 pl-6 pr-2 py-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-white/5">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mt-1">
                    Super Admin
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-white font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 text-red-500 dark:text-red-400 flex items-center justify-center border border-red-200 dark:border-red-500/20 hover:scale-110 transition-transform shadow-sm group"
                title="Keluar"
              >
                <FiLogOut
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {/* STATS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Pendapatan Bersih"
                  value={`Rp ${totalRevenue.toLocaleString()}`}
                  icon={<FiDollarSign />}
                  gradient="from-emerald-500 to-teal-600"
                  shadow="shadow-emerald-500/20"
                />
                <StatCard
                  title="Total Pesanan"
                  value={orders.length}
                  icon={<FiShoppingCart />}
                  gradient="from-blue-500 to-indigo-600"
                  shadow="shadow-blue-500/20"
                />
                <StatCard
                  title="Produk Aktif"
                  value={products.length}
                  icon={<FiBox />}
                  gradient="from-orange-500 to-pink-500"
                  shadow="shadow-orange-500/20"
                />
                <StatCard
                  title="Total Pelanggan"
                  value="Active"
                  icon={<FiUsers />}
                  gradient="from-purple-500 to-violet-600"
                  shadow="shadow-purple-500/20"
                />
              </div>

              {/* CHART SECTION */}
              <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="absolute top-0 right-0 p-8 opacity-50">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/20 dark:bg-red-500/20"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400/20 dark:bg-yellow-500/20"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400/20 dark:bg-green-500/20"></span>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      Analisis Pendapatan
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Grafik pendapatan valid (Lunas) 7 hari terakhir
                    </p>
                  </div>
                </div>

                <div className="h-96 w-full">
                  {stats.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={stats}
                        margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#3B82F6"
                              stopOpacity={0.5}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3B82F6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#334155"
                          vertical={false}
                          opacity={0.4}
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94a3b8",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                          dy={15}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94a3b8",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                          content={<CustomTooltip />}
                          cursor={{
                            stroke: "#3B82F6",
                            strokeWidth: 2,
                            strokeDasharray: "5 5",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stroke="#3B82F6"
                          strokeWidth={5}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700/50 rounded-3xl">
                      <FiPieChart className="text-5xl mb-4 opacity-50" />
                      <p className="font-bold">
                        Belum ada data penjualan lunas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <ProductsTab
              products={products}
              onSave={handleAddProduct}
              onDelete={handleDeleteProduct}
            />
          )}

          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              onUpdateStatus={updateOrderStatus}
              onValidatePayment={handleValidatePayment}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS STYLED ---

const ProductsTab = ({ products, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "frame",
    image_url: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (p) => {
    setFormData(p);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-end gap-4 mb-8">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-800 dark:text-white text-sm outline-none focus:ring-2 ring-blue-500/50 w-full max-w-sm backdrop-blur-sm"
        />
        <button
          onClick={() => {
            setFormData({
              name: "",
              price: 0,
              category: "frame",
              image_url: "",
              description: "",
            });
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <FiPlus className="text-lg" /> Tambah Produk
        </button>
      </div>

      <div className="grid gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200 dark:border-white/5 p-4 rounded-[2rem] hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all flex items-center justify-between shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-white/5">
                  <img
                    src={p.image_url}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={p.name}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                    {p.name}
                  </h4>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                    {p.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-12 pr-6">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Harga Satuan
                  </p>
                  <p className="text-lg font-black text-blue-500 dark:text-blue-400">
                    Rp {p.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-20 text-slate-500 dark:text-slate-500">
            Tidak ada produk ditemukan.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(formData);
              setIsModalOpen(false);
            }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-10 rounded-[2.5rem] w-full max-w-lg space-y-6 shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6">
              {formData.id ? "Edit Produk" : "Tambah Produk Baru"}
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nama Produk"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Harga"
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
                <select
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="frame">Frame</option>
                  <option value="lensa">Lensa</option>
                  <option value="softlens">Softlens</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="URL Gambar"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
              />
              <textarea
                placeholder="Deskripsi..."
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl h-32 border border-slate-200 dark:border-white/5 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02]"
            >
              SIMPAN PRODUK
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const OrdersTab = ({ orders, onUpdateStatus, onValidatePayment }) => (
  <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-4">
    {orders.map((o) => (
      <div
        key={o.id}
        className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all group shadow-sm hover:shadow-md"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-white border border-slate-200 dark:border-white/5">
              {o.customer_name.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                {o.customer_name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Order ID #{o.id}
              </p>
            </div>

            {/* Status Badges */}
            <div className="flex flex-col gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit ${o.status === "Selesai" ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" : "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20"}`}
              >
                Order: {o.status}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit ${o.payment_status === "Lunas" ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" : "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20"}`}
              >
                Bayar: {o.payment_status || "Belum Lunas"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between md:justify-end flex-1">
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Total Transaksi
              </p>
              <p className="text-xl font-black text-slate-800 dark:text-white">
                Rp {o.total_price.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3">
              {o.payment_status !== "Lunas" && o.payment_status !== "COD" && (
                <button
                  onClick={() => onValidatePayment(o.id)}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all text-xs font-bold border border-blue-200 dark:border-blue-500/20"
                  title="Validasi Pembayaran"
                >
                  <FiCheckCircle className="text-lg" />{" "}
                  <span className="hidden md:inline">Validasi</span>
                </button>
              )}
              {o.status !== "Selesai" && (
                <button
                  onClick={() => onUpdateStatus(o.id, "Selesai")}
                  className="flex items-center gap-2 px-4 py-3 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold border border-emerald-200 dark:border-emerald-500/20"
                >
                  <FiCheckCircle className="text-lg" />{" "}
                  <span className="hidden md:inline">Selesai</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
    {orders.length === 0 && (
      <div className="text-center p-20 text-slate-500 dark:text-slate-500 border-2 border-dashed border-slate-300 dark:border-slate-700/50 rounded-[2.5rem]">
        Belum ada pesanan masuk.
      </div>
    )}
  </div>
);

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${active ? "bg-blue-500 dark:bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-white"}`}
  >
    <div className="flex items-center gap-4 font-bold text-sm">
      <span
        className={`${active ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-white transition-colors"}`}
      >
        {icon}
      </span>{" "}
      {label}
    </div>
    {badge > 0 && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg shadow-red-500/20">
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, icon, gradient, shadow }) => (
  <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
    <div
      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-[2.5rem] transition-opacity group-hover:opacity-20`}
    ></div>

    <div
      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 shadow-lg ${shadow} text-xl`}
    >
      {icon}
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
      {title}
    </p>
    <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
      {value}
    </p>
  </div>
);

export default AdminDashboard;
