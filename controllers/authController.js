const bcrypt = require('bcryptjs');

exports.showLogin = (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Iniciar Sesión</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>Iniciar Sesión</h1>
      <form action="/auth/login" method="POST">
        <label>Usuario:</label>
        <input type="text" name="username" required>
        <label>Contraseña:</label>
        <input type="password" name="password" required>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </body>
    </html>
  `;
  res.send(html);
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username !== process.env.ADMIN_USER) {
    return res.redirect('/auth/login');
  }

  const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
  if (!isMatch) {
    return res.redirect('/auth/login');
  }

  req.session.isAuthenticated = true;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};