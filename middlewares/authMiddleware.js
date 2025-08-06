const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user === process.env.ADMIN_USER) {
    next();
  } else {
    res.status(403).send('Acceso denegado. Solo el administrador puede acceder.');
  }
};

module.exports = { isAdmin };