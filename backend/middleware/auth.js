import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401).json({});
  }

  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user=decoded
    return next()
  }catch(err) {
    res.status(403).json({error:err.message})
  }
};

export default authenticateToken;
