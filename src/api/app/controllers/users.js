function isSignedIn(req, res) {
  res.status(200).send();
}

function signIn(req, res) {
  const userInfo = {
    email: req.user.email
  };

  res.status(200).json(userInfo);
}

function signOut(req, res) {
  req.logout();
  res.status(200).send();
}

module.exports = {
  isSignedIn,
  signIn,
  signOut
};
