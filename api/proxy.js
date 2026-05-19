const http = require('http')
const https = require('https')

module.exports = (req, res) => {
  const params = new URLSearchParams(req.query).toString()
  const target = `https://admin.iqapi.cn/ajax.php?${params}`

  https.get(target, {
    headers: {
      'Referer': 'https://admin.iqapi.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
    },
  }, (proxyRes) => {
    let data = ''
    proxyRes.on('data', chunk => data += chunk)
    proxyRes.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(proxyRes.statusCode).send(data)
    })
  }).on('error', err => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(500).send(err.message)
  })
}
