module.exports = function(req, res) {
  req.logOut();
  res.redirect('/');
}