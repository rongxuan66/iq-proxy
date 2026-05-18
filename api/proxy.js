export default async function handler(req, res) {
  try {
    const params = new URLSearchParams(req.query).toString()
    const resp = await fetch(`https://admin.iqapi.cn/ajax.php?${params}`, {
      headers: {
        "Referer": "https://admin.iqapi.cn",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
      },
      signal: AbortSignal.timeout(10000)
    })
    const data = await resp.text()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(resp.status).send(data)
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(500).send('代理异常：' + err.message)
  }
}
