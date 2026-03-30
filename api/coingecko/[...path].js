export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;

    // ✅ join path
    let finalPath = path.join("/");

    // ✅ remove accidental duplication
    if (finalPath.startsWith("api/coingecko/")) {
      finalPath = finalPath.replace("api/coingecko/", "");
    }

    // ✅ ensure correct base path
    if (!finalPath.startsWith("api/")) {
      finalPath = "api/" + finalPath;
    }

    const query = req.url.includes("?")
      ? req.url.split("?")[1]
      : "";

    const url = `https://api.coingecko.com/${finalPath}${
      query ? `?${query}` : ""
    }`;

    console.log("FINAL URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error("CoinGecko ERROR:", text);
      return res.status(response.status).json({
        error: "CoinGecko error",
        details: text,
      });
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Proxy error" });
  }
}