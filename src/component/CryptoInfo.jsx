import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaChartLine, FaGlobe } from "react-icons/fa";

const data = [
    {
        title: "What is Cryptocurrency?",
        desc: "Cryptocurrency is a digital currency secured by cryptography and powered by blockchain technology.",
        img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
        icon: <FaLock />,
        stats: "Secure & Decentralized",
        link: "https://www.investopedia.com/terms/c/cryptocurrency.asp",
    },
    {
        title: "What is Blockchain?",
        desc: "Blockchain is a distributed ledger that records transactions transparently and securely.",
        img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
        icon: <FaGlobe />,
        stats: "100% Transparent",
        link: "https://www.ibm.com/think/topics/blockchain",
    },
    {
        title: "Why is Crypto Popular?",
        desc: "Crypto offers fast transactions, low fees, and high investment potential globally.",
        img: "https://images.unsplash.com/photo-1640161704729-cbe966a08476",
        icon: <FaChartLine />,
        stats: "High Growth Market",
        link: "https://www.forbes.com/advisor/investing/what-is-cryptocurrency/",
    },
];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemAnim = {
    hidden: { opacity: 0, y: 80 },
    show: { opacity: 1, y: 0 },
};

export default function CryptoInfo() {
    return (
        <section className="relative bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24 px-6 overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621504450181-5a2c4dbf7c58')] bg-fixed bg-cover bg-center opacity-10"></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
                    Learn Crypto
                </h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-24 max-w-6xl mx-auto"
                >
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemAnim}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* IMAGE */}
                            <motion.img
                                src={item.img}
                                alt={item.title}
                                whileHover={{ scale: 1.05 }}
                                className={`w-full md:w-1/2 rounded-2xl shadow-xl object-cover ${index === 0
                                        ? "h-62.5 md:h-75"
                                        : "h-75 md:h-87.5"
                                    }`}
                            />

                            {/* CARD */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                className="md:w-1/2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl"
                            >
                                <div className="text-4xl text-purple-400 mb-4">
                                    {item.icon}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-gray-300 mb-5 leading-relaxed">
                                    {item.desc}
                                </p>


                                <div className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm hover:bg-purple-500/30 transition">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {item.stats} →
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}