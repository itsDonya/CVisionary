const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function getUser(req, res, next) {
  const userTokenBearer = req.header("Authorization");
  const accessToken = userTokenBearer?.split(" ")[1];

  if (!accessToken) {
    return next();
  }

  jwt.verify(accessToken, process.env.TOKEN_KEY, async (err, payload) => {
    try {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).send({ error: "Authentication failed" });
        }
        return res.status(403).send({ error: "Access denied; Please sign in" });
      }

      const { userId } = payload;
      const user = await User.findById(userId, {
        password: 0,
      });

      if (!user) {
        return res.status(403).send({ error: "Failed to detect user" });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });
}

async function verifyAccessToken(req, res, next) {
  try {
    const userTokenBearer = req.header("Authorization");
    const accessToken = userTokenBearer?.split(" ")[1];

    if (!accessToken) {
      return res.status(403).send({ error: "Access denied; Please sign in" });
    }

    jwt.verify(accessToken, process.env.TOKEN_KEY, async (err, payload) => {
      try {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).send({ error: "Authentication failed" });
          }

          return res
            .status(403)
            .send({ error: "Access denied; Please sign in" });
        }

        const { userId } = payload;

        const user = await User.findById(userId, {
          password: 0,
          refresh: 0,
        });

        if (!user) {
          return res
            .status(403)
            .send({ error: "Access denied; Please sign in" });
        }
        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

const checkIsAdmin = async (req, res, next) => {
  try {
    const userTokenBearer = req.header("Authorization");
    const accessToken = userTokenBearer?.split(" ")[1];

    if (!accessToken) {
      return res.status(403).send({ error: "Access denied; Please sign in" });
    }

    if (req.user.role != "admin") {
      return res.status(403).send({ error: "Access denied; Please sign in" });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, verifyAccessToken, checkIsAdmin };
