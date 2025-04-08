
const $$ = element => document.querySelectorAll (element);
const $ = element => document.querySelector (element);

const $inputSearch = document.querySelector ("#search");
const $selectType = document.querySelector ("#type");
const $selectStatus = document.querySelector ("#status");
const $selectGender = document.querySelector ("#gender");
const $buttonSearch = document.querySelector ("#btn-search");


function showStyles (){
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
              <option value="unknow" class="font-grands">Desconocido</option>
            </select>
          </div>

          <div  class="sm:w-full md:w-28 lg:w-36 h-24 pl-4 mt-7 ">
            <label for="gender" class="text-lg font-grands">GENERO</label>
            <select name="" id="gender" class="border rounded-md p-2 w-full font-grands">
              <option value="femme" class="font-grands">Femenino</option>
              <option value="male" class="font-grands">Masculino</option>
              <option value="unknow" class="font-grands">Desconocido</option>
            </select>
          </div>
      
          <div class="sm:w-24 lg:w-28 h-16 pl-4  mt-7 mr-9">
            <button id="btn-search" class="bg-emerald-400 font-grands text-white py-2 px-4 rounded-md hover:bg-fuchsia-600 w-full lg:w-auto">Buscar</button>
          </div>
        </div>  
      </div> 
    </div>  
  </main>
  <footer class="w-full h-16 flex justify-center items-center p-0 text-center  bg-green-800 text-white">
      <p class="font-grands">Hecho con &#x1F49D por Noe</p> 
  </footer>`
  console.log($body);
}
showStyles()

