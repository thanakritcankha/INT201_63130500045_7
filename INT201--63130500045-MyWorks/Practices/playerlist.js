import players from "./players.js";

// let students = [{ name: "thanakrit", lastname: "cankha" }
//     , { name: "thatpum", lastname: "kongnithichalerm" }
// ]

// function studentlist(student) {
//     let p = document.createElement("p")
//     p.style.color = "blue"
//     p.style.textAlign = "center"
//     p.style.fontSize = "50px"
//     p.textContent = student.name + " " + student.lastname
//     return p;
// }

// for(let std of students){
//     let list = studentlist(std)
//     root.appendChild(list)
// }
const root = document.querySelector("#full_sense")
const toggleSearchBtn = document.querySelector("#search");
const searchPanel = document.querySelector("#input");

renderPlayers(players, root);

toggleSearchBtn.addEventListener('click', () => {
  if (isSearching) {
    searchPanel.setAttribute('class', 'd-none');
  }
  else {
    searchPanel.setAttribute('class', ' ');
  }
  isSearching = !isSearching;
})

searchBtn.addEventListener('click', () => {
  const input = document.querySelector("#input_txt").value;
  const filteredProducts = findPlayer(input);
  renderProducts(filteredProducts, root);
});

function findPlayer(pname) {
  if (pname.length == 0) {
    return players;
  } else {
    return players.filter(name => name.gamename.toLowerCase().includes(pname.toLowerCase()));
  }
}

function renderPlayers(players, root) {
  root.innerHTML = '';

  players.forEach(player => {
    let itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "card mb-4 col-12 col-sm-6 col-md-4 col-lg-3 shadow-sm border-0");

    const playerImage = document.createElement("img");
    playerImage.setAttribute("class", "card-img-top px-4");
    playerImage.src = player.img;

    const playerBody = document.createElement("div");
    playerBody.setAttribute("class", "card-body");

    const playerTitle = document.createElement("h5");
    playerTitle.setAttribute("class", "card-title");
    playerTitle.textContent = player.gamename;

    const playerId = document.createElement("p");
    playerId.setAttribute("class", "card-subtitle text-muted");
    playerId.textContent = `Name : ${player.fullname}`;

    const playerDetails = document.createElement("p");
    playerDetails.setAttribute("class", "card-text mt-2");
    playerDetails.textContent = `Join Date : ${player.joindate}`;

    const twitch = document.createElement("button");
    twitch.setAttribute("class", "btn btn-outline-secondary waves-effect")
    twitch.textContent = "Twitch";

    const br = document.createElement("br");

    playerDetails.append(br);
    playerBody.append(playerTitle, playerId, playerDetails, twitch);
    itemContainer.append(playerImage, playerBody);
    root.append(itemContainer);
  });
}



