const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/baseMultiply', (req, res) => {
  let num = req.body.numero;
  num = parseInt(num);
  let insertarTexto = `Resultado \n`

  for (let i = 0; i <= 10; i++) {
    insertarTexto += `${num} * ${i} = ${num * i} \n`;
  }
  fs.writeFile('public/Resultado.txt', insertarTexto, (err) => {
    if (err) throw err;
    console.log('Archivo creado exitosamente');
  })

  let textoPag = `
    <h2>Resultado de la multiplicación</h2><br/>
  `
  for (let i = 0; i <= 10; i++) {
    textoPag += `<p>${num} * ${i} = ${num * i} </p>\n`;
  }

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Multiplicador</title>
      <link rel="icon" href="assets/img/logo.png">
      <link rel="stylesheet" href="assets/estilos/normalize.css">
      <link rel="stylesheet" type="text/css" href="assets/estilos/estilo.css">
  </head>
  <body>
    <header>
        <div class="logo">
            <a href="index.html"><img src="assets/img/logo.png" alt="logo"></a>
        </div>
        <nav>
            <ul>
                <li><a href=""><i class="far fa-user"></i></a></li>
                <li><a href=""><i class="fas fa-tags"></i></a></li>
                <li><a href=""><i class="fas fa-concierge-bell"></i></a></li>
                <li><a href=""><i class="fas fa-shopping-cart"></i></a></li>
                <li><a href="baseMultiply.html"><i class="fas fa-calculator"></i></a></li>
            </ul>
        </nav>
        <div class="cont_buscar">
            <div class="buscar">
                <input type="text" placeholder="¿Qué deseas buscar?">
                <div class="btn">
                    <i class="fas fa-search icon"></i>
                </div>
            </div>
        </div>
    </header>
    <div class="formulario">
        ${textoPag}
    </div>
    <footer class="site_footer">
        <div class="cont_footer">
            <div class="contenido_footer">
                <h2>FED ONLINE</h2>
                <div class="contacto_footer">
                    <P>DIRECCION: Villa Hermosa MZ5 LT5</P>
                    <P>NUMERO DE TELEFONO: 3208965743</P>
                    <P>E-MAIL: fed.ctg@gmail.com</P>
                </div>
            </div>
            <P class="copy"> &copy;2021 Todos los derechos reservados </P>
        </div>
    </footer>
    <script src="https://kit.fontawesome.com/4855da1ccc.js" crossorigin="anonymous"></script>
  </body>
  </html>
  `);

});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});