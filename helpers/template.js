const getProductCards = (products, isDashboard) => {
  let html = '<div class="product-grid">';
  for (let product of products) {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="${isDashboard ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
        ${isDashboard ? `
          <a href="/dashboard/${product._id}/edit">Editar</a>
          <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
            <button type="submit">Eliminar</button>
          </form>
        ` : ''}
      </div>
    `;
  }
  html += '</div>';
  return html;
};

const getProductForm = (product = {}) => `
  <form action="${product._id ? `/dashboard/${product._id}?_method=PUT` : '/dashboard'}" method="POST" enctype="multipart/form-data">
    <label>Nombre:</label>
    <input type="text" name="name" value="${product.name || ''}" required>
    <label>Descripción:</label>
    <textarea name="description" required>${product.description || ''}</textarea>
    <label>Imagen (URL o archivo):</label>
    <input type="text" name="image" value="${product.image || ''}">
    <input type="file" name="imageFile">
    <label>Categoría:</label>
    <select name="category" required>
      <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
      <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
      <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
      <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
    </select>
    <label>Talla:</label>
    <select name="size" required>
      <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
      <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
      <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
      <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
      <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
    </select>
    <label>Precio:</label>
    <input type="number" name="price" value="${product.price || ''}" required>
    <button type="submit">${product._id ? 'Actualizar' : 'Crear'}</button>
  </form>
`;

module.exports = { getProductCards, getProductForm };