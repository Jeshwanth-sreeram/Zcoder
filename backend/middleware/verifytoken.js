const jwt = require('jsonwebtoken');

// Middleware to check the authorization, i haven't used this but this is same as isauth middleware function


const verifyToken = (req, res, next) => {

  const token = req.body.token || req.headers['authorization'];

  if (!token) return res.status(401).json({ 
    success: false, 
    message: 'No token provided' 
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (err) {
    return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' });
  }
};
