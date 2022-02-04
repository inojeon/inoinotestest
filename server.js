const express = require("express");
const next = require("next");

const session = require("express-session");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const admin = {
  id: "admin",
  password: "1234",
};

app.prepare().then(() => {
  const server = express();
  server.use(
    session({
      secret: "ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@",
      resave: false,
      saveUninitialized: true,
    })
  );

  server.get("/", (req, res) => {
    return app.render(req, res, "/");
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
