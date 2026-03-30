export default async function handler(req, res) {
  try {
    const url = `https://api.coingecko.com${req.url.replace('/api/coingecko', '')}`;

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Proxy error" });
  }
}