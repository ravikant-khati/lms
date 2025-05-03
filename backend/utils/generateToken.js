import jwt from "jsonwebtoken";
const GenerateToken = (user, res) => {
  const { _id, email } = user;
  const token = jwt.sign({ userId: _id, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return res
    .status(201)
    .cookie("token", token, { httpOnly: true,sameSite:"strict" ,  maxAge: 1000 * 60 * 60 * 24 , path:"/"
    })
    .json({ msg: "user logged in successfully" , user });
};

export default GenerateToken;
