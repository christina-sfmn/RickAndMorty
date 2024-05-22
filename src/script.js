// VARIABLES
const detailsContainer = document.getElementById("DetailsContainer");
const cardsContainer = document.getElementById("CardsContainer");
const btnMain = document.getElementsByClassName("btn-main");

const baseURL = "https://rickandmortyapi.com/api";
const loading = `<div class="text-white font-semibold text-xl">Loading ...</div>`;

// ---------- EPISODES ----------

// FETCH EPISODES
function fetchEpisodes() {
  cardsContainer.innerHTML = loading;
  fetch(`${baseURL}/episode`, { method: "GET" })
    .then((response) => response.json())
    .then((episodes) => showEpisodeCards(episodes))
    .catch((error) => console.error("Error fetching episodes!", error));
}

// SHOW EPISODE CARDS
function showEpisodeCards(episodes) {
  detailsContainer.innerHTML = "";
  cardsContainer.innerHTML = "";

  btnMain[0].classList.add("active");
  btnMain[1].classList.remove("active");
  btnMain[2].classList.remove("active");
  console.log(episodes);

  // Create cards for each element & add to container
  episodes.results.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "card-list";

    const episodeName = document.createElement("h2");
    episodeName.innerText = episode.name;

    const episodeNo = document.createElement("p");
    episodeNo.innerText = "Episode: " + episode.episode;

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn-small";
    detailsBtn.innerText = "Details";
    detailsBtn.onclick = () => showEpisodeDetails(episode, episodes);

    card.appendChild(episodeName);
    card.appendChild(episodeNo);
    card.appendChild(detailsBtn);
    cardsContainer.appendChild(card);
  });
}

// SHOW EPISODE DETAILS
function showEpisodeDetails(episode, episodes) {
  console.log(episode);
  detailsContainer.classList.remove("hidden");
  cardsContainer.innerHTML = "";

  // Create detail elements & add to container
  const infoText = document.createElement("div");
  infoText.className = "info-text";

  const btnBack = document.createElement("button");
  btnBack.className = "btn-small";
  btnBack.innerText = "Back";
  btnBack.onclick = () => showEpisodeCards(episodes);

  const episodeName = document.createElement("h2");
  episodeName.innerText = episode.name;

  const episodeDate = document.createElement("p");
  episodeDate.innerText = "Air Date: " + episode.air_date;

  const episodeNo = document.createElement("p");
  episodeNo.innerText = "Episode: " + episode.episode;

  const line = document.createElement("hr");

  infoText.appendChild(btnBack);
  infoText.appendChild(episodeName);
  infoText.appendChild(episodeDate);
  infoText.appendChild(episodeNo);
  detailsContainer.appendChild(infoText);
  detailsContainer.appendChild(line);

  // Fetch characters by episode
  fetchCharactersByEpisodes(episode);
}

// FETCH CHARACTERS BY EPISODE
function fetchCharactersByEpisodes(episode) {
  cardsContainer.innerHTML = loading;

  // Get character-URLs
  let characterURLs = episode.characters;

  // Fetch all characters with URL matching with episode
  Promise.all(
    characterURLs.map((characterURL) =>
      fetch(`${characterURL}`, { method: "GET" }).then((response) =>
        response.json()
      )
    )
  )
    .then((characters) => showCharacterCardsByEpisode(characters))
    .catch((error) => console.error("Error fetching characters!", error));
}

// SHOW CHARACTER CARDS BY EPISODE
function showCharacterCardsByEpisode(characters) {
  cardsContainer.innerHTML = "";
  console.log(characters);

  // Create cards for each element & add to container
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "card-list card-centered";

    const characterName = document.createElement("h3");
    characterName.innerText = character.name;

    const characterImg = document.createElement("img");
    characterImg.setAttribute("src", character.image);

    const characterStatus = document.createElement("p");
    characterStatus.innerText = "Status: " + character.status;

    const characterSpecies = document.createElement("p");
    characterSpecies.innerText = "Species: " + character.species;

    card.appendChild(characterName);
    card.appendChild(characterImg);
    card.appendChild(characterStatus);
    card.appendChild(characterSpecies);
    cardsContainer.appendChild(card);
  });
}

// ---------- CHARACTERS ----------

// FETCH CHARACTERS
function fetchCharacters() {
  cardsContainer.innerHTML = loading;
  fetch(`${baseURL}/character`, { method: "GET" })
    .then((response) => response.json())
    .then((characters) => showCharacterCards(characters))
    .catch((error) => console.error("Error fetching characters!", error));
}

// SHOW CHARACTER CARDS
function showCharacterCards(characters) {
  detailsContainer.innerHTML = "";
  cardsContainer.innerHTML = "";

  btnMain[0].classList.remove("active");
  btnMain[1].classList.add("active");
  btnMain[2].classList.remove("active");
  console.log(characters);

  // Create cards for each element & add to container
  characters.results.forEach((character) => {
    const card = document.createElement("div");
    card.className = "card-list card-centered";

    const characterName = document.createElement("h2");
    characterName.innerText = character.name;

    const characterImg = document.createElement("img");
    characterImg.setAttribute("src", character.image);

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn-small";
    detailsBtn.innerText = "Details";
    detailsBtn.onclick = () => showCharacterDetails(character, characters);

    card.appendChild(characterName);
    card.appendChild(characterImg);
    card.appendChild(detailsBtn);
    cardsContainer.appendChild(card);
  });
}

// SHOW CHARACTER DETAILS
function showCharacterDetails(character, characters) {
  console.log(character);
  detailsContainer.classList.remove("hidden");
  cardsContainer.innerHTML = "";
  
  // Create detail elements & add to container
  const btnBack = document.createElement("button");
  btnBack.className = "btn-small";
  btnBack.innerText = "Back";
  btnBack.onclick = () => showCharacterCards(characters);

  const characterName = document.createElement("h2");
  characterName.innerText = character.name;

  const characterImg = document.createElement("img");
  characterImg.setAttribute("src", character.image);

  const characterStatus = document.createElement("p");
  characterStatus.innerText = "Status: " + character.status;

  const characterSpecies = document.createElement("p");
  characterSpecies.innerText = "Species: " + character.species;

  const characterGender = document.createElement("p");
  characterGender.innerText = "Gender: " + character.gender;

  const characterOrigin = document.createElement("p");
  characterOrigin.innerText = "Origin: " + character.origin.name;

  const characterLocation = document.createElement("p");
  characterLocation.innerText = "Location: " + character.location.name;

  detailsContainer.appendChild(btnBack);
  detailsContainer.appendChild(characterName);
  detailsContainer.appendChild(characterImg);
  detailsContainer.appendChild(characterStatus);
  detailsContainer.appendChild(characterSpecies);
  detailsContainer.appendChild(characterGender);
  detailsContainer.appendChild(characterOrigin);
  detailsContainer.appendChild(characterLocation);
}

// FETCH CHARACTERS BY LOCATION
function fetchCharactersByLocation(location) {
  cardsContainer.innerHTML = loading;

  // Get character-URLs
  let residentsURLs = location.residents;

  // Fetch all characters with URL matching with episode
  Promise.all(
    residentsURLs.map((residentURL) =>
      fetch(`${residentURL}`, { method: "GET" }).then((response) =>
        response.json()
      )
    )
  )
    .then((characters) => showCharacterCardsByLocation(characters))
    .catch((error) => console.error("Error fetching characters!", error));
}

// SHOW CHARACTER CARDS BY LOCATION
function showCharacterCardsByLocation(characters) {
  cardsContainer.innerHTML = "";
  console.log(characters);

  // Create cards for each element & add to container
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "card-list card-centered";

    const characterName = document.createElement("h3");
    characterName.innerText = character.name;

    const characterImg = document.createElement("img");
    characterImg.setAttribute("src", character.image);

    const characterStatus = document.createElement("p");
    characterStatus.innerText = "Status: " + character.status;

    const characterSpecies = document.createElement("p");
    characterSpecies.innerText = "Species: " + character.species;

    card.appendChild(characterName);
    card.appendChild(characterImg);
    card.appendChild(characterStatus);
    card.appendChild(characterSpecies);
    cardsContainer.appendChild(card);
  });
}

// ---------- LOCATIONS ----------

// FETCH LOCATIONS
function fetchLocations() {
  cardsContainer.innerHTML = loading;
  fetch(`${baseURL}/location`, { method: "GET" })
    .then((response) => response.json())
    .then((locations) => showLocationCards(locations))
    .catch((error) => console.error("Error fetching locations!", error));
}

// SHOW LOCATION CARDS
function showLocationCards(locations) {
  detailsContainer.innerHTML = "";
  cardsContainer.innerHTML = "";

  btnMain[0].classList.remove("active");
  btnMain[1].classList.remove("active");
  btnMain[2].classList.add("active");
  console.log(locations);

  // Create cards for each element & add to container
  locations.results.forEach((location) => {
    const card = document.createElement("div");
    card.className = "card-list";

    const locationName = document.createElement("h2");
    locationName.innerText = location.name;

    const locationType = document.createElement("p");
    locationType.innerText = "Type: " + location.type;

    const locationDimension = document.createElement("p");
    locationDimension.innerText = "Dimension: " + location.dimension;

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn-small";
    detailsBtn.innerText = "Details";
    detailsBtn.onclick = () => showLocationDetails(location, locations);

    card.appendChild(locationName);
    card.appendChild(locationType);
    card.appendChild(locationDimension);
    card.appendChild(detailsBtn);
    cardsContainer.appendChild(card);
  });
}

// SHOW LOCATION DETAILS
function showLocationDetails(location, locations) {
  console.log(location);
  detailsContainer.classList.remove("hidden");
  cardsContainer.innerHTML = "";

  // Create detail elements & add to container
  const infoText = document.createElement("div");
  infoText.className = "info-text";

  const btnBack = document.createElement("button");
  btnBack.className = "btn-small";
  btnBack.innerText = "Back";
  btnBack.onclick = () => showLocationCards(locations);

  const locationName = document.createElement("h2");
  locationName.innerText = location.name;

  const locationType = document.createElement("p");
  locationType.innerText = "Type: " + location.type;

  const locationDimension = document.createElement("p");
  locationDimension.innerText = "Dimension: " + location.dimension;

  const locationResidents = document.createElement("p");
  locationResidents.innerText = "Residents: ";

  infoText.appendChild(btnBack);
  infoText.appendChild(locationName);
  infoText.appendChild(locationType);
  infoText.appendChild(locationDimension);
  infoText.appendChild(locationResidents);
  detailsContainer.appendChild(infoText);

  // Fetch characters by location
  fetchCharactersByLocation(location);
}