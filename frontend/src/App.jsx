import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import AuthModal from "./components/AuthModal";
import OrderHistoryModal from "./components/OrderHistoryModal";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AboutSection from "./components/AboutSection";
import Swal from "sweetalert2";
import CheckoutPage from "./components/CheckoutPage";
import CartModal from "./components/CartModal";
import ArticleDetail from "./components/ArticleDetail";

// --- DATA KONTEN KATEGORI ---
const CATEGORY_CONTENT = {
  frame: {
    title: "Koleksi Frame Eksklusif",
    description:
      "Bingkai premium dengan material ringan dan tahan lama. Temukan gaya yang mendefinisikan kepribadian Anda, dari klasik hingga modern.",
  },
  lensa: {
    title: "Lensa Teknologi Tinggi",
    description:
      "Lensa dengan lapisan anti-radiasi dan UV protection terbaik. Lindungi mata Anda dari kelelahan digital dengan kejernihan maksimal.",
  },
  softlens: {
    title: "Softlens Nyaman & Cantik",
    description:
      "Pilihan warna natural dan material breathable untuk kenyamanan sepanjang hari. Tampil beda dengan tatapan yang memukau.",
  },
  best_seller: {
    title: "Paling Diminati",
    description:
      "Produk-produk favorit pelanggan kami. Kualitas teruji dan desain yang selalu relevan dengan tren masa kini.",
  },
  aksesoris: {
    title: "Aksesoris Kacamata",
    description:
      "Lengkapi kebutuhan kacamata Anda dengan aksesoris berkualitas.",
  },
};

function App() {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [viewMode, setViewMode] = useState("home"); // home, shop, articles
  const [currentCategory, setCurrentCategory] = useState(""); // State baru untuk tracking kategori aktif
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [cart, setCart] = useState(() => {
    // Ambil cart dari localStorage jika ada
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [user, setUser] = useState(null);
  // States untuk Route & Modal
  const [isAdminLoginView, setIsAdminLoginView] = useState(false);
  const [isDashboardView, setIsDashboardView] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  // --- 2. API FETCHERS ---
  const fetchProducts = (category = "") => {
    let url = "http://localhost:8080/products";
    if (category) url += `?category=${category}`;
    setCurrentCategory(category); // Update category state

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]));
  };

  const fetchFeaturedProducts = () => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((all) => setFeaturedProducts(all.slice(0, 3)))
      .catch(() => setFeaturedProducts([]));
  };

  // --- 1. INITIAL LOAD ---
  useEffect(() => {
    const path = window.location.pathname;

    // Deteksi URL khusus login admin (/admin)
    if (path === "/admin") {
      setIsAdminLoginView(true);
    }

    // Deteksi URL Dashboard (/dashboard)
    if (path === "/dashboard") {
      setIsDashboardView(true);
    }

    // Ambil Session dari LocalStorage
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("role");

    if (token && userName) {
      setUser({ name: userName, token: token, role: userRole });

      // Proteksi rute dashboard jika reload di /dashboard
      if (path === "/dashboard" && userRole !== "admin") {
        window.location.href = "/admin"; // Redirect ke login jika bukan admin
      }
    } else {
      // Jika tidak login, tapi akses dashboard
      if (path === "/dashboard") {
        window.location.href = "/admin";
      }
    }

    // Load data awal untuk Landing Page
    fetchFeaturedProducts();
    fetchProducts();
  }, []);

  // Simpan cart ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchArticles = () => {
    setViewMode("articles");
    fetch("http://localhost:8080/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data || []))
      .catch(() => {
        setArticles([]);
      });
  };

  // --- 3. AUTH HANDLERS ---
  const handleLoginAPI = async (formData) => {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("role", data.role);

        setUser({ name: data.name, token: data.token, role: data.role });
        setShowLogin(false);

        Swal.fire({
          icon: "success",
          title: "Login Berhasil!",
          text: `Selamat datang kembali, ${data.name}.`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirect Admin ke Dashboard
        if (data.role === "admin") {
          setIsDashboardView(true);
          setIsAdminLoginView(false); // Pastikan view login tertutup
          window.history.pushState({}, "", "/dashboard");
          return; // Stop eksekusi agar tidak lanjut ke logika bawah
        }

        // Bersihkan URL jika sebelumnya di mode admin login
        if (isAdminLoginView) {
          setIsAdminLoginView(false);
          window.history.replaceState({}, document.title, "/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: data.error || "Terjadi kesalahan saat login.",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Server tidak merespon. Coba lagi nanti.",
      });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      text: "Sesi Anda akan berakhir.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setUser(null);
        setCart([]);
        setViewMode("home");
        setIsDashboardView(false); // Reset dashboard view
        window.location.href = "/";
      }
    });
  };

  // --- 4. RENDER LOGIC ---

  // A. VIEW: DASHBOARD ADMIN
  if (user && user.role === "admin" && isDashboardView) {
    return <AdminDashboard onLogout={handleLogout} user={user} />;
  }

  // B. VIEW: LOGIN ADMIN KHUSUS
  if (isAdminLoginView) {
    return (
      <AdminLogin
        onLogin={handleLoginAPI}
        onBack={() => {
          setIsAdminLoginView(false);
          window.history.replaceState({}, document.title, "/");
        }}
      />
    );
  }

  // C. VIEW: PELANGGAN (NAVBAR + CONTENT + FOOTER)
  if (isCheckoutPage) {
    return (
      <CheckoutPage
        cart={cart}
        user={user}
        onBack={() => setIsCheckoutPage(false)}
        onSubmit={async ({ address, phone, payment }) => {
          // Kirim pesanan ke backend
          const items_summary = cart.map((item) => item.name).join(", ");
          const total_price = cart.reduce((sum, item) => sum + item.price, 0);
          const orderData = {
            customer_name: user?.name || "",
            total_price,
            items: items_summary,
            address,
            phone,
            payment,
          };
          const res = await fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });
          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Pesanan Berhasil!",
              text: "Terima kasih telah berbelanja di Optik Modern.",
            });
            setCart([]);
            setIsCheckoutPage(false);
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Gagal membuat pesanan. Silakan coba lagi.",
            });
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-mint-50 font-sans flex flex-col">
      <Navbar
        user={user}
        cartCount={cart.length}
        onShowLogin={() => setShowLogin(true)}
        onLogout={handleLogout}
        onShowHistory={async () => {
          if (!user) return setShowLogin(true);
          const res = await fetch(
            `http://localhost:8080/my-orders?name=${user.name}`,
          );
          const data = await res.json();
          setOrders(data || []);
          setShowHistory(true);
        }}
        onCategoryChange={(cat) => {
          if (cat === "") setViewMode("home");
          else {
            setViewMode("shop");
            fetchProducts(cat);
          }
        }}
        onShowArticles={fetchArticles}
        currentCategory={currentCategory}
        viewMode={viewMode}
        onCheckout={() => {
          if (user) {
            setShowCart(true);
          } else {
            Swal.fire({
              icon: "warning",
              title: "Belum Login",
              text: "Silakan login terlebih dahulu untuk mengakses keranjang!",
              confirmButtonText: "Login Sekarang",
              confirmButtonColor: "#2563EB",
            }).then(() => {
              setShowLogin(true);
            });
          }
        }}
      />

      {/* HERO SECTION (Full Width) */}
      {viewMode === "home" && (
        <div className="animate-in fade-in duration-700 w-full">
          <Hero
            onShopNow={() => {
              setViewMode("shop");
              fetchProducts();
            }}
          />
        </div>
      )}

      <main className="max-w-7xl mx-auto w-full flex-grow py-8">
        {/* HALAMAN HOME */}
        {viewMode === "home" && (
          <div className="animate-in fade-in duration-700">
            <section className="px-6 mt-16">
              <div className="mb-10 text-center max-w-2xl mx-auto">
                <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">
                  Best Seller
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Pilihan Terpopuler
                </h2>
                <p className="text-slate-500 text-lg">
                  Temukan produk yang paling dicintai oleh pelanggan kami,
                  dikurasi khusus untuk gaya dan kenyamanan Anda.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => {
                      if (user) {
                        setCart([...cart, prod]);
                        Swal.fire({
                          icon: "success",
                          title: "Berhasil",
                          text: `${prod.name} berhasil ditambahkan ke keranjang`,
                          timer: 1500,
                          showConfirmButton: false,
                          position: "top-end",
                          toast: true,
                        });
                      } else {
                        Swal.fire({
                          icon: "info",
                          title: "Akses Dibatasi",
                          text: "Silakan login terlebih dahulu untuk belanja!",
                        }).then(() => setShowLogin(true));
                      }
                    }}
                  />
                ))}
              </div>
            </section>

            {/* ABOUT SECTION */}
            <AboutSection />
          </div>
        )}

        {/* HALAMAN SHOP / KATALOG */}
        {viewMode === "shop" && (
          <div className="px-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header Kategori Dinamis */}
            <div className="mb-12 text-center bg-white p-8 rounded-[2rem] shadow-sm border border-mint-100">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 capitalize">
                {CATEGORY_CONTENT[currentCategory]?.title || "Katalog Produk"}
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                {CATEGORY_CONTENT[currentCategory]?.description ||
                  "Jelajahi koleksi lengkap kami dengan penawaran terbaik."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => {
                      if (user) {
                        setCart([...cart, prod]);
                        Swal.fire({
                          icon: "success",
                          title: "Berhasil",
                          text: `${prod.name} berhasil ditambahkan ke keranjang`,
                          timer: 1500,
                          showConfirmButton: false,
                          position: "top-end",
                          toast: true,
                        });
                      } else {
                        Swal.fire({
                          icon: "info",
                          title: "Akses Dibatasi",
                          text: "Silakan login terlebih dahulu untuk belanja!",
                        }).then(() => setShowLogin(true));
                      }
                    }}
                  />
                ))
              ) : (
                <p className="text-slate-400 font-bold col-span-3 text-center py-20">
                  Produk tidak ditemukan.
                </p>
              )}
            </div>
          </div>
        )}

        {/* HALAMAN ARTIKEL */}
        {viewMode === "articles" && (
          <div className="px-6 animate-in fade-in duration-500">
            <h2 className="text-3xl font-black mb-10 text-center">
              Edukasi & Tips Mata
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {articles.length > 0 ? (
                articles.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={a.image_url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={a.title}
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase">
                        {a.author || "Admin"}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-black mb-4 text-slate-800 leading-tight">
                        {a.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-sm line-clamp-3">
                        {a.content}
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedArticle(a);
                          setViewMode("article-detail");
                        }}
                        className="mt-6 text-blue-600 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                      >
                        Baca Selengkapnya →
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">
                    Belum ada artikel tersedia.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {viewMode === "article-detail" && (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setViewMode("articles")}
          />
        )}
      </main>

      <Footer />

      {/* MODALS */}
      {showLogin && (
        <AuthModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLoginAPI}
          onRegister={async (formData) => {
            const res = await fetch("http://localhost:8080/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            });
            if (res.ok) {
              Swal.fire({
                icon: "success",
                title: "Registrasi Berhasil!",
                text: "Akun Anda telah dibuat. Silakan login.",
              });
              setShowLogin(true);
            }
          }}
        />
      )}

      {showHistory && (
        <OrderHistoryModal
          orders={orders}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={(idx) => setCart(cart.filter((_, i) => i !== idx))}
          checkoutButton={
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-blue-700 transition-colors"
              onClick={() => {
                setShowCart(false);
                setTimeout(() => setIsCheckoutPage(true), 200);
              }}
              disabled={cart.length === 0}
            >
              Checkout
            </button>
          }
        />
      )}
    </div>
  );
}

export default App;
