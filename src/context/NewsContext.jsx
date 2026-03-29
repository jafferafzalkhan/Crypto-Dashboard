import React, { createContext, useState, useEffect } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const cache = JSON.parse(localStorage.getItem("newsCache"));

      // ✅ CACHE 10 MIN
      if (cache && Date.now() - cache.time < 10 * 60 * 1000) {
        setNews(cache.data);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://gnews.io/api/v4/search?q=crypto&lang=en&apikey=YOUR_API_KEY`
      );

      const data = await res.json();

      const formatted = data.articles || [];

      localStorage.setItem(
        "newsCache",
        JSON.stringify({
          data: formatted,
          time: Date.now(),
        })
      );

      setNews(formatted);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading }}>
      {children}
    </NewsContext.Provider>
  );
};