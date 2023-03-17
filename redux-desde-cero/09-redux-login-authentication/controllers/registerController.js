//bcrypt
import bcrypt from "bcrypt";

//schemas
import User from "../model/User.js";

//functions
export const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required." });

  const duplicated = await User.findOne({ username: user }).exec();
  if (duplicated) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.info(result);
    res.status(201).json({ success: `New user ${user} created!!!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
