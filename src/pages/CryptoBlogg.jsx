import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export default function CryptoBlogg() {
  const { news, loading, error } = useContext(NewsContext);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-10">
        {Array(6).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-2xl bg-white/5 backdrop-blur-lg animate-pulse border border-white/10"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-20 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Crypto Insights & News
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {news
          ?.filter(item => item && item.title)
          .map((item) => (
            <div
              key={item.article_id}
              className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500 transition duration-300 flex flex-col"
            >

              <div className="relative h-48 overflow-hidden">
                <img
                  src={item?.image_url || "https://picsum.photos/400/300"} // ✅ FIXED
                  referrerPolicy="no-referrer" // ✅ FIXED
                  alt={item?.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-4 flex flex-col gap-3 grow">

                <h2 className="text-white font-semibold text-lg leading-snug line-clamp-2 group-hover:text-purple-300 transition">
                  {item?.title || "No Title"}
                </h2>

                <p className="text-gray-400 text-sm line-clamp-3">
                  {item?.description || "No description available"}
                </p>

                <div className="flex justify-between items-center mt-auto">

                  <span className="text-xs text-gray-500">
                    {item?.source_id || "Unknown"}
                  </span>

                  {item?.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs hover:text-white px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition"
                    >
                      Read →
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}

      </div>
    </div>
  );
}