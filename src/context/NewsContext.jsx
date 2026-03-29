import React, { createContext, useState, useEffect } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://newsdata.io/api/1/crypto?apikey=pub_1816f3a0faaf4c35986c2a105c2a31be`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
      }

      const data = await response.json();

      setNews(data.results || []);
      setError(null);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};