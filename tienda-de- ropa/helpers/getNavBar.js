const getNavBar = (isDashboard) => `
  <nav>
    <a href="/products">Inicio</a>
    <a href="/products?category=Camisetas">Camisetas</a>
    <a href="/products?category=Pantalones">Pantalones</a>
    <a href="/products?category=Zapatos">Zapatos</a>
    <a href="/products?category=Accesorios">Accesorios</a>
    ${isDashboard ? '<a href="/dashboard/new">Nuevo Producto</a> <a href="/auth/logout">Cerrar Sesión</a>' : ''}
  </nav>
`;

module.exports = getNavBar;