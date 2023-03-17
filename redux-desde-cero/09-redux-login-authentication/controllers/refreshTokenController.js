//jwt
import jwt from "jsonwebtoken";

//schemas
import User from "../model/User.js";

//config
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from "../config/config.js";

//functions
export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

  //evaluate JWT
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ roles, accessToken });
  });
};
