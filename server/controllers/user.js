import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body; // all values will be available in req body because post request

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) res.status(404).json({ message: "user doesn't exist" });
    
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json({ message: "user already exist" });
    if (password !== confirmPassword)
      res.status(400).json({ message: "passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12); // 12 is the difficulty level
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test"); // test is the secret that use to generate sign
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
