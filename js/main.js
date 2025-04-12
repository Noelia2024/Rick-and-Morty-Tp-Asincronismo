const $$ = element => document.querySelectorAll (element);
const $ = element => document.querySelector (element);

let page = 1;
let pageMax = 0;
let data = [];

const $inputSearch = $("#search");
const $selectType = $("#type");
const $selectStatus = $("#status");
const $selectGender = $("#gender");
const $buttonSearch = $("#btn-search");
const $containerImages = $("#container-images");
const $containerButtons = $("#container-buttons");
const $btnPrev = $("#btn-prev");
const $btnNext = $("#btn-next");
const $h2 = $("#page");


//--------Pintar Datos-------//
function paintData(array) {
  $containerImages.innerHTML = ""; // Limpiar contenido anterior

  const tipo = $selectType.value;

  for (const item of array) {
    if (tipo === "character") {
      $containerImages.innerHTML += `
        <div class="bg-lime-100 p-4 rounded shadow-md text-center m-4 w-60">
          <img src="${item.image}" alt="${item.name}" class="mx-auto rounded-full w-24 h-24 object-cover">
          <h3 class="text-lg font-bold mt-2">${item.name}</h3>
          <p class="text-sm">Estado: ${item.status}</p>
          <p class="text-sm">Género: ${item.gender}</p>
          <p class="text-sm">Especie: ${item.species}</p>
        </div>
      `;
    } else if (tipo === "episode") {
      $containerImages.innerHTML += `
        <div class="bg-emerald-100 p-4 rounded shadow-md text-center m-4 w-60">
          <h3 class="text-lg font-bold">${item.name}</h3>
          <p class="text-sm">Episodio: ${item.episode}</p>
          <p class="text-sm">Fecha de emisión: ${item.air_date}</p>
        </div>
      `;
    }
  }
};
 

//----------Obtener Datos----------//
async function getData(page = 1) {
  const tipo = $selectType.value;
  const nombre = $inputSearch.value.trim();
  const estado = $selectStatus.value;
  const genero = $selectGender.value;

  $containerImages.innerHTML = '<h2 class="text-center text-xl">Cargando...</h2>';

  let url = `https://rickandmortyapi.com/api/${tipo}?page=${page}`;

  if (nombre !== "") {
    url += `&name=${nombre}`;
  }

  //--- Filtros si es personaje----//
  if (tipo === "character") {
    if (estado !== "") url += `&status=${estado}`;
    if (genero !== "") url += `&gender=${genero}`;
  }

  try {
    const response = await axios.get(url);
    pageMax = response.data.info.pages;
    $h2.innerText = `Página ${page} de ${pageMax}`;
    paintData(response.data.results);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    $containerImages.innerHTML = `<p class="text-red-500 text-center mt-4">No se encontraron resultados. Revisá tu búsqueda.</p>`;
  }
}

$buttonSearch.addEventListener("click", function () {
  page = 1;
  getData(page);
});


$btnPrev.addEventListener("click", function () {
  if (page > 1) {
    page--;
    getData(page);
  }
});

$btnNext.addEventListener("click", function () {
  if (page < pageMax) {
    page++;
    getData(page);
  }
});




window.onload = function () {

  page = 1;                           
  getData(page);                       
};


