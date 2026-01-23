import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAward, FiUsers } from "react-icons/fi";

const AboutSection = () => {
  const features = [
    {
      icon: <FiAward className="text-3xl" />,
      title: "Kualitas Premium",
      desc: "Frame dan lensa bersertifikat standar internasional.",
    },
    {
      icon: <FiCheckCircle className="text-3xl" />,
      title: "Garansi Seumur Hidup",
      desc: "Layanan purna jual terbaik untuk kenyamanan Anda.",
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Ahli Berpengalaman",
      desc: "Diperiksa langsung oleh tenaga ahli refraksi optisi.",
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title Header */}
        <div className="text-center mb-16 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-mint-600 font-bold uppercase tracking-widest text-sm bg-mint-100 px-4 py-1 rounded-full"
          >
            Tentang Kami
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-slate-800 mt-4 leading-tight"
          >
            Lebih Dari Sekadar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-mint-500">
              Kacamata Biasa
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Images Grid */}
          <div className="relative">
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-mint-200 rounded-full blur-3xl opacity-30 animate-pulse delay-700"></div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4 mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"
                  className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 object-cover h-48 w-full"
                  alt="Kacamata detail"
                />
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.osDg3dckla6K1h468pYHZgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
                  className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 object-cover h-64 w-full"
                  alt="Rak kacamata"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop"
                  className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 object-cover h-64 w-full"
                  alt="Orang memakai kacamata"
                />
                <div className="bg-gradient-to-br from-blue-600 to-mint-500 rounded-2xl p-6 flex flex-col justify-center items-center text-white shadow-xl h-48">
                  <h3 className="text-4xl font-black mb-2">15+</h3>
                  <p className="text-center text-sm font-medium">
                    Tahun Pengalaman
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="pl-0 md:pl-10">
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-600 leading-relaxed mb-10"
            >
              Optik Modern hadir dengan misi sederhana: memberikan penglihatan
              terbaik dengan gaya yang tak tertandingi. Setiap frame dikurasi
              dengan teliti, memastikan kenyamanan maksimal tanpa mengorbankan
              estetika.
            </motion.p>

            <div className="space-y-8">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-mint-100"
                >
                  <div className="w-12 h-12 bg-mint-50 text-mint-600 rounded-full flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-slate-200 hover:bg-blue-600 transition-colors"
            >
              Kenali Kami Lebih Dekat
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
