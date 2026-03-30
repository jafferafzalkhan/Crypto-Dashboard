import React, { createContext, useState, useEffect, useCallback } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      const response = await fetch(
        `https://newsdata.io/api/1/crypto?apikey=pub_1816f3a0faaf4c35986c2a105c2a31be`
      );

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 5000; // Default to 5 seconds if header is missing
        setError(`Too Many Requests. Retrying in ${delay / 1000} seconds...`);
        console.warn(`Rate limit hit. Retrying after ${delay / 1000} seconds.`);

        // Wait for the specified time before potentially trying again
        await new Promise(resolve => setTimeout(resolve, delay));
        // You might want to re-call fetchNews here, or let the user manually retry
        // For simplicity, we'll just set an error and stop for now.
        throw new Error("Rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNews(data.results || []);

    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchNews();
  }, [fetchNews]); // Depend on fetchNews. useCallback ensures it doesn't cause infinite loop.

  return (
    <NewsContext.Provider value={{ news, loading, error, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};
