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
const $modal = $("#modal");
const $modalTitle = $("#modal-title");
const $modalEpisode = $("#modal-episode");
const $modalAirDate = $("#modal-air-date");
const $modalCharactersCount = $("#modal-characters-count");
const $btnCloseModal = $("#btn-close-modal");



function paintData(array) {
  $containerImages.innerHTML = ""; // Limpiar contenido anterior

  const tipo = $selectType.value;

  for (const item of array) {
    if (tipo === "character") {
      $containerImages.innerHTML += `
        <div class="character-card bg-lime-100 p-4 rounded shadow-md text-center m-4 w-60 cursor-pointer" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="mx-auto rounded-full w-24 h-24 object-cover">
          <h3 class="text-lg font-bold mt-2">${item.name}</h3>
          <p class="text-sm">Estado: ${item.status}</p>
          <p class="text-sm">Género: ${item.gender}</p>
          <p class="text-sm">Especie: ${item.species}</p>
        </div>
      `;
    } else if (tipo === "episode") {
      $containerImages.innerHTML += `
        <div class="episode-card bg-emerald-100 p-4 rounded shadow-md text-center m-4 w-60 cursor-pointer" data-id="${item.id}">
          <h3 class="text-lg font-bold">${item.name}</h3>
          <p class="text-sm">Episodio: ${item.episode}</p>
          <p class="text-sm">Fecha de emisión: ${item.air_date}</p>
        </div>
      `;
    }
  }

  // Evento para cada episodio.
  if (tipo === "episode") {
    const $episodeCards = document.querySelectorAll(".episode-card");

    $episodeCards.forEach(function (card) {
      card.addEventListener("click", async function () {
        const id = card.getAttribute("data-id");
        await openModal(id);
      });
    });
  }
  // Evento para personajes
  if (tipo === "character") {
    const $characterCards = document.querySelectorAll(".character-card");
    $characterCards.forEach(function (card) {
      card.addEventListener("click", async function () {
        const id = card.getAttribute("data-id");
        await openCharacterModal(id);
      });
    });
  }
};

$selectType.addEventListener("change", function () {
  if ($selectType.value === "episode") {
    $selectStatus.parentElement.style.display = "none";
    $selectGender.parentElement.style.display = "none";
  } else {
    $selectStatus.parentElement.style.display = "block";
    $selectGender.parentElement.style.display = "block";
  }});

  async function openModal(id) {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      const episode = response.data;
  
      // Mostrar información del episodio
      $modalTitle.innerText = episode.name;
      $modalEpisode.innerText = `Episodio: ${episode.episode}`;
      $modalAirDate.innerText = `Fecha de emisión: ${episode.air_date}`;
      $modalCharactersCount.innerText = `Cantidad de personajes: ${episode.characters.length}`;
  
      // personajes que aparecen en este episodio
      const characterPromises = episode.characters.map(async (url) => {
        const characterResponse = await axios.get(url);
        return characterResponse.data.name;
      });
  
      const characters = await Promise.all(characterPromises);
  
      // mostrar los personajes en el modal
      let charactersHTML = "<ul class='list-disc pl-5 text-left'>";
      characters.forEach((character) => {
        charactersHTML += `<li>${character}</li>`;
      });
      charactersHTML += "</ul>";
  
      // listado de personajes en el modal
      $modalCharactersCount.innerHTML += `<br><strong>Personajes que aparecen en este episodio:</strong><br>${charactersHTML}`;
  
      $modal.classList.remove("hidden");
    } catch (error) {
      console.error("Error al obtener detalles del episodio:", error);
    }
  };
  
  
async function openCharacterModal(id) {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    const character = response.data;

    $modalTitle.innerText = character.name;
    $modalEpisode.innerHTML = `
      <img src="${character.image}" alt="${character.name}" class="mx-auto rounded-full w-32 h-32 object-cover mb-4">
    `;
    $modalAirDate.innerText = `Estado: ${character.status}`;
    $modalCharactersCount.innerHTML = `
      Género: ${character.gender}<br>
      Especie: ${character.species}<br>
      Origen: ${character.origin.name}<br>
      Ubicación actual: ${character.location.name}<br><br>
      <strong>Episodios:</strong><br>
    `;

    // traer los episodios en que aparece cada personaje.
    const episodesResponses = await Promise.all(
      character.episode.map(function (episodeUrl) {
        return axios.get(episodeUrl);
      })
    );

    let episodesHTML = "<ul class='list-disc pl-5 text-left'>";
    for (const epResponse of episodesResponses) {
      const epData = epResponse.data;
      episodesHTML += `<li>${epData.name} (${epData.episode})</li>`;
    }
    episodesHTML += "</ul>";

    // Agregar los episodios
    $modalCharactersCount.innerHTML += episodesHTML;

    $modal.classList.remove("hidden");
  } catch (error) {
    console.error("Error al obtener detalles del personaje:", error);
  }
}


$btnCloseModal.addEventListener("click", function () {
  $modal.classList.add("hidden");
});


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


