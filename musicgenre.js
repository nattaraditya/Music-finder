const SHOWN = 8;
 
const genres = [
  { name: "Pop",             query: "best pop songs", image: "Pop-Music-1.png" },
  { name: "Hip-Hop / Rap",   query: "best hip hop songs", image: "HipHop.jpg" },
  { name: "Rock",            query: "best rock songs", image: "Rock.jpg" },
  { name: "Latin",           query: "best latin songs", image: "Latin.jpg" },
  { name: "R&B",             query: "best r&b songs", image: "r&b.jpg" },
  { name: "Dance / EDM",     query: "best edm dance songs", image: "EDM.jpeg" },
  { name: "Country",         query: "best country songs", image: "country.jpg" },
  { name: "K-Pop",           query: "best k-pop songs", image: "Kpop.jpg" },
  { name: "Indie",           query: "best indie songs", image: "indie.jpg" },
  { name: "Metal",           query: "best metal songs", image: "metal.jpg" },
  { name: "Jazz",            query: "best jazz songs", image: "jazz.jpg" },
  { name: "Classical",       query: "best classical music", image: "Classical.jpg" },
  { name: "Reggaeton",       query: "best reggaeton songs", image: "Reggenation.jpg" },
  { name: "Afrobeats",       query: "best afrobeats songs", image: "afrobeats.jpg" },
  { name: "Soul",            query: "best soul songs", image: "soul.jpg" },
  { name: "Reggae",          query: "best reggae songs", image: "reggae.jpg" },
  { name: "Blues",           query: "best blues songs", image: "blues.jpg" },
  { name: "Folk",            query: "best folk songs", image: "folk.jpeg" },
  { name: "Punk",            query: "best punk songs", image: "punk.jpg" },
  { name: "House",           query: "best house music", image: "house.jpg" },
  { name: "Techno",          query: "best techno music", image: "techno.jpg" },
  { name: "Disco",           query: "best disco songs", image: "disco.jpg" },
  { name: "Funk",            query: "best funk songs", image: "funk.jpg" },
  { name: "Gospel",          query: "best gospel songs", image: "gospel.jpg" },
  { name: "Lo-fi",           query: "best lofi songs", image: "lofi.jpg" },
  { name: "Ambient",         query: "best ambient music", image: "ambient.jpg" },
  { name: "Anime / J-Pop",   query: "best j-pop anime songs", image: "Anime J-pop.jpg" },
  { name: "Thai Pop",        query: "best thai pop songs", image: "thaiPop.jpg" }
];
 
(function () {
  const grid = document.getElementById("genre-grid");
  const search = document.getElementById("genre-search");
  const note = document.getElementById("genre-note");
 
  const spotifyUrl = (q) =>
    "https://open.spotify.com/search/" + encodeURIComponent(q) + "/playlists";
 
  function card(g, rank) {
    const a = document.createElement("a");
    a.className = "genre-card";
    a.href = spotifyUrl(g.query);
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `
      <span class="genre-rank">${rank}</span>
      <span class="genre-name"></span>
      <span class="genre-go">Open on Spotify <span aria-hidden="true">&#8599;</span></span>`;
    a.querySelector(".genre-name").textContent = g.name;
    if (g.image) {
      a.classList.add("has-image");
      a.style.setProperty("--img", `url("${g.image}")`);
    }
    return a;
  }
 
  function render() {
    const raw = search.value.trim();
    const q = raw.toLowerCase();
    grid.innerHTML = "";
    note.hidden = true;
    note.innerHTML = "";
 
    if (!q) {
      genres.slice(0, SHOWN).forEach((g, i) =>
        grid.appendChild(card(g, String(i + 1).padStart(2, "0"))));
      return;
    }
 

    const matches = genres.filter((g) => g.name.toLowerCase().includes(q));
    matches.forEach((g) => grid.appendChild(card(g, "Match")));
 
    if (matches.length === 0) {
      note.hidden = false;
      const link = document.createElement("a");
      link.href = spotifyUrl("best " + raw + " songs");
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = `Search "${raw}" on Spotify ↗`;
      note.append("We don't have that genre listed. ", link);
    }
  }
 
  search.addEventListener("input", render);
  render();
})();