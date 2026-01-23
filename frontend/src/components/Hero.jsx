import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Hero = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop", // Wanita kacamata hitam/gelap
      title: "Mata Adalah Jendela Dunia",
      subtitle:
        "Kami percaya bahwa kacamata bukan sekadar alat bantu penglihatan, melainkan ekspresi kepribadian.",
      gradient: "from-blue-900 via-blue-800 to-transparent",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1600&auto=format&fit=crop", // Close up kacamata mewah
      title: "Teknologi Lensa Terbaik", // Variasi judul untuk relevansi gambar
      subtitle:
        "Temukan kenyamanan visual dengan teknologi lensa terbaik dan desain bingkai yang 'timeless' di Optik Modern.",
      gradient: "from-slate-900 via-blue-900 to-transparent",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1740&auto=format&fit=crop", // Pria/model lain
      title: "Gaya Tanpa Batas",
      subtitle:
        "Eksplorasi koleksi terbaru kami yang dirancang untuk meningkatkan kepercayaan diri Anda setiap hari.",
      gradient: "from-mint-900 via-teal-900 to-transparent",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[600px] md:h-screen overflow-hidden shadow-2xl group">
      {/* BACKGROUND CAROUSEL */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Gambar Background */}
          <img
            src={slides[currentSlide].image}
            alt="Hero Slide"
            className="w-full h-full object-cover object-center"
          />

          {/* Gradient Overlay Mewah (Mirip Referensi User) */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} opacity-90 md:opacity-100 mix-blend-multiply md:mix-blend-normal`}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* KONTEN TEXT (Static Position, Dynamic Content) */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-10 w-full grid grid-cols-1 md:grid-cols-2">
          <div className="text-white space-y-8 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-blue-400"></div>
                  <span className="text-blue-300 font-bold tracking-[0.3em] text-sm uppercase">
                    Premium Collection
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 drop-shadow-lg">
                  {slides[currentSlide].title}
                </h1>

                <p className="text-slate-200 text-lg md:text-xl leading-relaxed opacity-90 font-medium max-w-lg">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={onShopNow}
                className="bg-white text-blue-900 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] flex items-center gap-3"
              >
                Belanja Sekarang <FiArrowRight className="text-lg" />
              </button>
              <button className="px-10 py-5 border-2 border-white/20 hover:border-white text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm">
                Pelajari Lensa
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* NAVIGASI CAROUSEL */}
      {/* Tombol Kiri/Kanan (Muncul saat hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-30 transform hover:scale-110"
      >
        <FiChevronLeft className="text-3xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-30 transform hover:scale-110"
      >
        <FiChevronRight className="text-3xl" />
      </button>

      {/* Indikator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? "w-10 h-3 bg-blue-500"
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
export default Hero;
