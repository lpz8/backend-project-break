const baseHtml = (title, content) => `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    ${content}
  </body>
  </html>
`;

module.exports = baseHtml;