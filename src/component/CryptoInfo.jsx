import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaChartLine, FaGlobe } from "react-icons/fa";

const data = [
  {
    title: "What is Cryptocurrency?",
    desc: "Cryptocurrency is a digital currency secured by cryptography.",
    img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=60",
    icon: <FaLock />,
    stats: "Secure & Decentralized",
    link: "https://www.investopedia.com/terms/c/cryptocurrency.asp",
  },
  {
    title: "What is Blockchain?",
    desc: "Blockchain is a distributed ledger that records transactions.",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=60",
    icon: <FaGlobe />,
    stats: "100% Transparent",
    link: "https://www.ibm.com/think/topics/blockchain",
  },
  {
    title: "Why is Crypto Popular?",
    desc: "Crypto offers fast transactions and global accessibility.",
    img: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=800&q=60",
    icon: <FaChartLine />,
    stats: "High Growth Market",
    link: "https://www.forbes.com/advisor/investing/what-is-cryptocurrency/",
  },
];

export default function CryptoInfo() {
  return (
    <section className="bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20 px-6">

      {/*  removed bg-fixed */}

      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
        Learn Crypto
      </h2>

      <div className="space-y-16 max-w-6xl mx-auto">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} //  faster
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.title}
              loading="lazy" //  LAZY LOAD
              className="w-full md:w-1/2 rounded-xl shadow-lg object-cover h-60"
            />

            {/* CARD */}
            <div className="md:w-1/2 bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
              <div className="text-3xl text-purple-400 mb-3">
                {item.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-300 mb-4">
                {item.desc}
              </p>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 text-sm hover:underline"
              >
                {item.stats} →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}