const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const users = [
  {
    id: 1,
    username: "test@gmail.com",
    password: "091020",
    role: "author",
  },
  {
    id: 2,
    username: "test1@gmail.com",
    password: "210820",
    role: "admin",
  },
];

app.get("/", (req, res) => {
  console.log("Start server");
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
// , {
//     expiresIn: "30s",
//   }
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, "MPBA", {
    expiresIn: "10s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, "MA");
};

let listRefreshToken = [];

app.post("/api/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json("You're not authenticated");
  } else if (!listRefreshToken.includes(refreshToken)) {
    return res.status(400).json("Refresh token is invalid");
  }

  jwt.verify(refreshToken, "MA", (err, user) => {
    err && console.log(err);
    listRefreshToken = listRefreshToken.filter(
      (token) => token !== refreshToken
    );

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    listRefreshToken.push(newRefreshToken);
    console.log(
      "newAccessToken : " +
        newAccessToken +
        " - refreshToken: " +
        newRefreshToken
    );
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await users.find((u) => {
      return u?.username === username && u?.password === password;
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    listRefreshToken.push(refreshToken);

    res.status(200).json({
      id: user.id,
      role: user.role,
      accessToken,
      refreshToken,
    });
    console.log("login: " + listRefreshToken);
  } catch (err) {
    res.status(400).json("User name or password is invalid");
  }
});

const verify = (req, res, next) => {
  console.log("verify: " + listRefreshToken);
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("verify token: " + token);
    jwt.verify(token, "MPBA", (err, user) => {
      err && console.log(err);
      req.user = user;
      next();
    });
  } else {
    res.status(400).json("You're not authenticated");
  }
};

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  listRefreshToken = listRefreshToken.filter((token) => token !== refreshToken);
  res.status(200).json("Log out!");
});

app.delete("/api/user/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId) {
    console.log("User has been deleted");
  }
});
