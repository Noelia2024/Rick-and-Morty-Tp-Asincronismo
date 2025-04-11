const $$ = element => document.querySelectorAll (element);
const $ = element => document.querySelector (element);

let page = 1;
let pageMax = 0;
let data = [];

const $inputSearch = document.querySelector ("#search");
const $selectType = document.querySelector ("#type");
const $selectStatus = document.querySelector ("#status");
const $selectGender = document.querySelector ("#gender");
const $buttonSearch = document.querySelector ("#btn-search");
const $containerImages = document.querySelector ("#container-images");
const $containerButtons = document.querySelector ("#container-buttons");
const $btnPrev = document.querySelector ("#btn-prev");
const $btnNext = document.querySelector ("#btn-next");
const $h2 = document.querySelector ("#page");





function showStyles (){   //muestra el maquetado
  const $body = document.querySelector ("body");
  $body.innerHTML = `<header class="h-16  bg-green-800 flex justify-center items-center ">
    <h1 class="sm:text-3xl md:text-4xl lg:text-5xl font-bang text-center  text-lime-300">ADA SERIES PRESENTA: RICK AND MORTY</h1>
  </header>  

  <div class="flex justify-center">
    <img class="w-full" src="./image/invasionalienigena.jpg" alt="">
  </div>
  <main class="flex-grow">
    
      <div class="ml-5 mr-5 sm:flex flex-col">
        <div class="sm:w-full h-12 mt-4">
          <h2 class="text-lg font-grands">Búsqueda</h2>
        </div>
       
      <div class="ml-1 mr-1 sm:flex flex-col md:flex justify-between">
        <div class="sm:w-full md:w-3/4 lg:w-3/6 h-16 mt-7 flex justify-between">
          <i class="fa-brands fa-searchengin flex items-center text-2xl border-t-0 border-l-0 border-r-0 border-2 border-b-zinc-900"></i>
          <input id="search" type="text" placeholder="Ingresa tu búsqueda" class="p-2 w-full font-grands border-t-0 border-l-0 border-r-0 border-2 border-b-zinc-900  bg-lime-200">
        </div>

        <div class="sm:flex flex-col gap-3 md:flex-row lg:flex-row gap-8 justify-between mt-7 ">
          <div  class="sm:w-full md:w-28 lg:w-36 h-24 pl-4  mt-7">
            <label for="type" class=" text-lg font-grands">TIPO</label>
            <select name="" id="type" class="border rounded-md p-2 w-full font-grands">
              <option value="character" class="font-grands">Personaje</option>
              <option value="episodes" class="font-grands">Episodios</option>
            </select>
          </div>
      
          <div  class="sm:w-full md:w-28 lg:w-32 h-24 pl-4 mt-7 ">
            <label for="status" class="text-lg font-grands">ESTADO</label>
            <select name="" id="status" class="border rounded-md p-2 w-full font-grands">
              <option value="alive" class="font-grands">Vivo</option>
              <option value="dead" class="font-grands">Muerto</option>
              <option value="unknown" class="font-grands">Desconocido</option>
            </select>
          </div>

          <div  class="sm:w-full md:w-28 lg:w-36 h-24 pl-4 mt-7 ">
            <label for="gender" class="text-lg font-grands">GENERO</label>
            <select name="" id="gender" class="border rounded-md p-2 w-full font-grands">
              <option value="female" class="font-grands">Femenino</option>
              <option value="male" class="font-grands">Masculino</option>
              <option value="unknown" class="font-grands">Desconocido</option>
            </select>
          </div>
      
          <div class="sm:w-24 lg:w-28 h-16 pl-4  mt-7 mr-9">
            <button id="btn-search" class="bg-emerald-400 font-grands text-white py-2 px-4 rounded-md hover:bg-fuchsia-600 w-full lg:w-auto">Buscar</button>
          </div>
        </div>  
      </div> 
    </div>
  </main>
  <section id="container-images" class="flex flex-wrap justify-center mt-8">
    <!-- Aquí se mostrarán las imágenes -->
  </section>
  <section id="container-buttons">
    <button id="btn-prev">
      <i class="fa-solid fa-backward"></i>
    </button>
    <h2 id="page"></h2>
    <button id="btn-next">
      <i class="fa-solid fa-forward"></i>
    </button>
  </section>
  <footer class="w-full h-16 flex justify-center items-center p-0 text-center  bg-green-800 text-white">
      <p class="font-grands">Hecho con &#x1F49D por Noe</p> 
  </footer>`
  console.log($body);
}
//showStyles()




/*function paintData(array) {   //pintarDatos me pinta las imagenes en pantalla
  const $containerImages = document.querySelector("#container-images");  // Seleccionar el contenedor correctamente
  $containerImages.innerHTML = "";  // Limpiar cualquier contenido previo
  for (const character of array) {
    // Agregar las imágenes de los personajes
    $containerImages.innerHTML += `<img class="character-image" src="${character.image}" style="width: 150px; margin: 10px;"><h3>${character.name}</h3>`;
  }
};//esta la tenia origialmente, no borrar!*/


/*window.onload = async () => {
  showStyles(); //  función que carga el HTML
  paintData(characters);
  //pageMax = data.info.pages;
  
};*/
















function paintData(array) {
  const $containerImages = document.querySelector("#container-images");
  $containerImages.innerHTML = "";  // Limpiar cualquier contenido previo

  for (const item of array) {
    // Pintar las imágenes y los nombres de personajes o episodios
    if (item.image) {
      // Si es un personaje (tiene imagen)
      $containerImages.innerHTML += `
        <div class="character-card" style="text-align: center; margin-bottom: 20px;">
          <img class="character-image" src="${item.image}" style="width: 150px; margin: 10px;">
          <h3>${item.name}</h3>
        </div>
      `;
    } else {
      // Si es un episodio (sin imagen)
      $containerImages.innerHTML += `
        <div class="episode-card" style="text-align: center; margin-bottom: 20px;">
          <h3>${item.name}</h3>
          <p>Fecha de emisión: ${item.air_date}</p>
        </div>
      `;
    }
  }
};






window.onload = async () => {
  showStyles();
  try {
    const response = await axios("https://rickandmortyapi.com/api/character");
    console.log(response.data); // Para verificar la respuesta
    const characters = response.data.results; // Array de personajes
    paintData(characters); // Llamamos a paintData con los datos obtenidos
  } catch (error) {
    console.error('Error al cargar los personajes', error);
  }
};
