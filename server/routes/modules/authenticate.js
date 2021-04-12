function authenticate(req, res, next) {
  const auth = req.authentication;
  if (!auth) {
    return res.status(404).json('Authentication Required');
  } else if (!auth.userExist) {
    return res.status(404).json('user not found');
  } else if (!auth.pwdMatch) {
    return res.status(404).json('username and password does not match');
  } else {
    next();
  }
}

module.exports = authenticate;
