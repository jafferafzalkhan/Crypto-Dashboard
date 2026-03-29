import React, { createContext, useState, useEffect } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const cache = JSON.parse(localStorage.getItem("newsCache"));

      // ✅ USE CACHE (5 MINUTES)
      if (cache && Date.now() - cache.time < 5 * 60 * 1000) {
        setNews(cache.data);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://newsdata.io/api/1/crypto?apikey=pub_1816f3a0faaf4c35986c2a105c2a31be`
      );

      // 🚨 HANDLE RATE LIMIT
      if (response.status === 429) {
        console.warn("News API rate limited");

        if (cache) {
          setNews(cache.data);
        }

        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }

      const data = await response.json();

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
      setError(null);

    } catch (err) {
      console.error("News error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 DELAY TO PREVENT SPAM
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNews();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};