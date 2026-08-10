// Swiggy ka API browser se seedha call nahi ho sakta — CORS block karta hai.
// Yeh Vercel serverless function server-side se fetch karti hai, jahan CORS lagta hi nahi.

const ALLOWED_HOSTS = ["www.swiggy.com"]

// Swiggy bina browser User-Agent ke 403 deta hai.
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

export default async function handler(req, res) {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' query param" })
  }

  let target
  try {
    target = new URL(url)
  } catch {
    return res.status(400).json({ error: "Invalid url" })
  }

  // Open proxy banne se bachne ke liye — sirf Swiggy allowed hai.
  if (target.protocol !== "https:" || !ALLOWED_HOSTS.includes(target.hostname)) {
    return res.status(403).json({ error: "Host not allowed" })
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent": BROWSER_UA,
        Accept: "application/json",
      },
    })

    const body = await upstream.text()

    // Browser ko CDN se cached response mile taaki har visit pe Swiggy hit na ho.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600")
    res.setHeader("Content-Type", "application/json")

    return res.status(upstream.status).send(body)
  } catch (error) {
    console.error("Swiggy proxy failed:", error)
    return res.status(502).json({ error: "Upstream fetch failed" })
  }
}
