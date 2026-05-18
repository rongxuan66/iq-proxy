export default async function handler(req, res) {
  const params = new URLSearchParams(req.query).toString()
  const resp = await fetch(`https://admin.iqapi.cn/ajax.php?${params}`)
  const data = await resp.text()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(resp.status).send(data)
}
