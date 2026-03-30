export default async function handler(req, res) {
  try {
    const { path = [] } = req.query;

    const url = `https://api.coingecko.com/${path.join("/")}`;

    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "CoinGecko error",
        details: text,
      });
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
}