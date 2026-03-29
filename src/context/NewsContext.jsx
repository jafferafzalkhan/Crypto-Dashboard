import React, { createContext, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const cache = JSON.parse(localStorage.getItem("newsCache"));

      // ✅ USE CACHE (15 MIN)
      if (cache && Date.now() - cache.time < 15 * 60 * 1000) {
        setNews(cache.data);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://newsdata.io/api/1/crypto?apikey=pub_1816f3a0faaf4c35986c2a105c2a31be`
      );

      // 🚨 HANDLE 429
      if (res.status === 429) {
        console.warn("Rate limited");

        if (cache) {
          setNews(cache.data);
        }

        setLoading(false);
        return;
      }

      const data = await res.json();

      const results = data.results || [];

      // 💾 SAVE CACHE
      localStorage.setItem(
        "newsCache",
        JSON.stringify({
          data: results,
          time: Date.now(),
        })
      );

      setNews(results);

    } catch (err) {
      console.error("News Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NewsContext.Provider value={{ news, loading, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};