const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();


let peliculas = [
  {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "1",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
  },
  {
    "Title": "Batman v Superman: Dawn of Justice",
    "Year": "2016",
    "imdbID": "2",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  },
  {
    "Title": "Batman",
    "Year": "1989",
    "imdbID": "3",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
  },
  {
    "Title": "Batman Returns",
    "Year": "1992",
    "imdbID": "4",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
  },
  {
    "Title": "Batman Forever",
    "Year": "1995",
    "imdbID": "5",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  },
  {
    "Title": "Batman & Robin",
    "Year": "1997",
    "imdbID": "6",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
  },
  {
    "Title": "The Lego Batman Movie",
    "Year": "2017",
    "imdbID": "7",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
  },
  {
    "Title": "Batman: The Animated Series",
    "Year": "1992–1995",
    "imdbID": "8",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
  },
  {
    "Title": "Batman: Under the Red Hood",
    "Year": "2010",
    "imdbID": "9",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
  },
  {
    "Title": "Batman: The Dark Knight Returns, Part 1",
    "Year": "2012",
    "imdbID": "10",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"
  },

];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.get("/saludar", function (req, res){
  res.send('Hola mundo! ' + JSON.stringify(req.query));  
});

app.get("/saludar/:nombre/:apellido", function (req, res){
  res.send('Hola mundo! ' + req.params.nombre + ' '+ req.params.apellido);  
});


app.post('/saludar/:accion', function(req, res){
  res.send('Hola por post! '+ req.params.accion +' '+ JSON.stringify(req.body));
});

app.put('/saludar', function(req, res){
  res.send('Hola por put! ' + JSON.stringify(req.body));
});

app.post('/_login', function (req, res){
  let { usuario, password } = req.body;

  if(usuario === 'thianlopezz' && password === 'password') {
    console.log('usuario válido');
    // devolver el token
    let usuario = { nombre:'Thian Lopez', feNacimiento:'1993-03-16' };
    let token = jwt.sign(usuario, 'GO_ON', { expiresIn: '24h' });

    res.send({ usuario: {...usuario, token } });
  } else {
    res.status(401).send({ mensaje:'Usuario o contraseña incorrectas!' });
  }
});

app.get("/detalle", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/detalle.html"));
});



app.get("/loginE", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/loginE.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// MIDDLEWARE
app.use(function(req, res, next) {
  
  let token = req.headers.token;
  console.log(token);
  jwt.verify(token, 'GO_ON', function(error) {
    if(error){
      res.status(401).send({mensaje: 'Token incorrecto'});
    } else {
      next();
    }
  });  
});

// ACCIONES PARA MODELO PELICULA
app.get("/peliculas", function (req, res){
  res.send(peliculas);  
});

app.get("/peliculas/:imdbID", function (req, res){
  let pelicula = peliculas.find(function(item){
    return item.imdbID == req.params.imdbID
  });
  res.send(pelicula);  
});

app.post('/pelicula', function(req, res) {
   peliculas.push({...req.body, imdbID: peliculas.length + 1});
   res.send({mensaje: 'Pelicula guardada!'});
});

app.put('/pelicula', function(req, res) {
  let index = peliculas.findIndex(function(item){
    return item.imdbID == req.body.imdbID
  });
  peliculas[index] = req.body;
  res.send({mensaje: 'Pelicula modificada!'});
});

app.delete('/pelicula/:imdbID', function(req, res) {
  let index = peliculas.findIndex(function(item){
    return item.imdbID == req.params.imdbID
  });
  peliculas.splice(index, 1);
  res.send({mensaje: 'Pelicula eliminada!'});
});

const port = process.env.PORT || "9000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port: ${port}`));