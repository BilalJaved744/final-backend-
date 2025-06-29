const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',

  });
  console.log(token)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    // maxAge: 30 * 24 * 60 * 60 * 1000,
    maxAge: 10 * 1000
  });
};

module.exports = generateToken;