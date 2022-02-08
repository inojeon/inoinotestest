const express = require("express");
const next = require("next");

const net = require("net");

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EXPIRATION_TIME = process.env.EXPIRATION_TIME;
const HOSTKEY = process.env.HOSTKEY;

const admin = {
  id: process.env.ADMIN,
  password: process.env.PASSWORD,
};
let datas = "";
let count = 0;
let recvData = "";
let tpcinterval;
let hostKey;

let hostExfiredDate;

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get("/api/login", (req, res) => {
    const { id, password } = req.query;
    // console.log(id, password);
    if (admin.id === id && admin.password === password) {
      const token = jwt.sign({ id }, PRIVATE_KEY, {
        algorithm: "HS256",
        expiresIn: EXPIRATION_TIME,
      });
      res.json({ ok: true, token });
    } else {
      res.json({ ok: false });
    }
  });
  server.get("/api/me", (req, res) => {
    let token = req.headers["x-jwt"];
    console.log(token);
    if (token) {
      try {
        jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
          if (err) {
            res.json({ ok: false, message: "JWTExpired" });
            return;
          }
        });
        res.json({ ok: true });
        return;
      } catch (err) {
        res.json({ ok: false });
        return;
      }
    } else {
      res.json({ ok: false });
      return;
    }
  });

  server.get("/api/update", (req, res) => {
    // console.log(req.query);

    res.json({ ok: true });
    recvData = req.query;
  });

  server.get("/api/monitoring", (req, res) => {
    let token = "";
    // console.log(req.headers["x-jwt"]);

    if (req.headers["x-jwt"] === "init") {
      res.json({ ok: false, message: "LoginInit" });
      return;
    }

    if (req.headers["x-jwt"]) {
      token = req.headers["x-jwt"];
    } else {
      console.log("loginFailed");
      res.json({ ok: false, message: "LoginFailed" });
      return;
    }

    // let decoded = "";
    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        res.json({ ok: false, message: "JWTExpired" });
        return;
      }
    });
    // console.log(decoded);
    if (datas === "") {
      console.log("Data Not Updated.");
      res.json({ ok: false, message: "DataNotUpdated" });
      return;
    }

    // console.log(datas);
    let { datas: newDatas } = JSON.parse(datas);
    count = count + 1;
    res.json({ ok: true, datas: newDatas });
    return;
  });

  server.get("/host/login", (req, res) => {
    const { host } = req.query;
    if (host === HOSTKEY) {
      hostKey = require("uuid/v4").uuidv4();

      hostExfiredDate = addMinutes(new Date(), 1);
      res.json({ ok: true, key: uuidv4 });
    } else {
      res.json({ ok: false });
    }
  });
  server.get("/host/logout", (req, res) => {
    const { host } = req.query;
    if (host === HOSTKEY) {
      hostKey = require("uuid/v4").uuidv4();
      res.json({ ok: true });
    } else {
      res.json({ ok: false });
    }
  });

  server.get("/host/getRelayInfo", (req, res) => {
    const { key } = req.query;
    if (hostKey === key) {
      if (hostExfiredDate < new Date()) {
        res.json({
          ok: false,
          message: "The host key has expired. Please log in again.",
        });
        return;
      }
      hostExfiredDate = addMinutes(new Date(), 1);
      datas = req_datas;
      res.json({ ok: true });
    } else {
      res.json({ ok: false, message: "Invalid hostkey" });
    }
    return;
  });

  server.get("/host/putAllData", (req, res) => {
    const { key, datas: req_datas } = req.query;
    if (hostKey === key) {
      if (hostExfiredDate < new Date()) {
        res.json({
          ok: false,
          message: "The host key has expired. Please log in again.",
        });
        return;
      }
      hostExfiredDate = addMinutes(new Date(), 1);
      datas = req_datas;
      res.json({ ok: true });
    } else {
      res.json({ ok: false, message: "Invalid hostkey" });
    }
    return;
  });

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

const tcpserver = net.createServer(function (socket) {
  // connection event
  console.log("클라이언트 접속");
  socket.write("Welcome to Socket Server");

  socket.on("data", function (chunk) {
    console.log("클라이언트가 보냄");
    preDatas = datas;
    datas = chunk.toString();
  });

  socket.on("end", function () {
    console.log("클라이언트 접속 종료");
  });

  if (tpcinterval) {
    clearInterval(tpcinterval);
  }

  tpcinterval = setInterval(() => sendRelayData(socket), 100);
});

const sendRelayData = (socket) => {
  if (recvData === "") return;
  socket.write(JSON.stringify(recvData));
  recvData = "";
};

tcpserver.on("listening", function () {
  console.log("Server is listening");
});

tcpserver.on("close", function () {
  clearInterval(interval);
  console.log("Server closed");
});

tcpserver.listen(5005, () => console.log(`Listening TCP on port 5005`));
