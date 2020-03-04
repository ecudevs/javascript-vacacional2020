const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');
let pelicula = {};

async function obtenerPelicula(){
    let response = await fetch(`/peliculas/${imdbID}`);

    if(response.ok){
        pelicula = await response.json();

        document.getElementById('poster').innerHTML = `<img class="img-fluid" src="${pelicula.Poster}" />`;
        document.getElementById('info').innerHTML = `            
          <h1>${pelicula.Title}</h1>
          <h2>Año ${pelicula.Year}</h2>
          <h2>Sinopsis</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat magni repellat voluptatem molestias maxime, sequi nulla omnis dicta eaque explicabo sapiente? Eius minima molestiae distinctio harum voluptas totam recusandae pariatur!</p>`;
    }
}

obtenerPelicula();

console.log(imdbID);         