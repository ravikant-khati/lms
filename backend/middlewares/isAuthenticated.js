import jwt from 'jsonwebtoken'
const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "user is not authenticated" });
    const decoded =  jwt.verify(token ,process.env.JWT_SECRET_KEY);

    if(!decoded){
        return res.status(400).json({msg:"token is not valid"})
    }
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(500).json({ msg: "server error", error });
  }
};
export default isAuthenticate;



