const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3000;

// This line tells Express to serve static files (like index.html)
// from the current directory.
app.use(express.static("."));

// This line forwards any requests for '/vc...' to the verbe.cc API.
app.use(
  "/vc",
  createProxyMiddleware({
    target: "http://verbe.cc",
    changeOrigin: true,
    pathRewrite: {
      "^/vc": "", // strip /vc so it maps correctly to /verbecc
    },
    onProxyReq(proxyReq, req, res) {
      console.log(`[Proxy] ${req.method} ${req.url} -> ${proxyReq.path}`);
    },
  })
);

app.listen(port, () => {
  console.log(`Server and proxy are running on http://localhost:${port}`);
});
