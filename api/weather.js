export default async function handler(req, res) {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "Location query is required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}`);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch weather data" });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}