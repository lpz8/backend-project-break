const bcrypt = require('bcryptjs');
const password = 'Realmadrid'; 


bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error al hashear la contraseña:', err);
    return;
  }
  console.log('Contraseña hasheada:', hash);
});