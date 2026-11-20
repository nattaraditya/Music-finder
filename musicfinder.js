const artists = [
  { name: "Bruno Mars",     genre: "Pop / Funk",      listeners: "140M", track: "Die With A Smile", cover: "BrunoMars.jpg" },
  { name: "Ariana Grande",  genre: "Pop",             listeners: "123M", track: "7 rings", cover: "ArianaGrande.jpg" },
  { name: "The Weeknd",     genre: "R&B / Synth-pop", listeners: "115M", track: "Blinding Lights", cover: "TheWeeknd.jpg" },
  { name: "Taylor Swift",   genre: "Pop",             listeners: "110M", track: "Cruel Summer", cover: "TaylorSwift.jpg" },
  { name: "Billie Eilish",  genre: "Alt Pop",         listeners: "105M", track: "BIRDS OF A FEATHER", cover: "BilliEilish.jpg" },
  { name: "Bad Bunny",      genre: "Latin Trap",      listeners: "98M",  track: "DtMF", cover: "BadBunny.jpg" },
  { name: "Ed Sheeran",     genre: "Pop / Folk",      listeners: "92M",  track: "Shape of You", cover: "EdSheeran.jpg" }
];
 
(function () {
  const stage = document.getElementById("stage");
  const dots = document.getElementById("dots");
  const n = artists.length;
  let index = 0;
 
  const initials = (name) =>
    name.split(" ").filter(w => w.toLowerCase() !== "the").slice(0, 2).map(w => w[0]).join("");
 
  const slides = artists.map((a, i) => {
    const el = document.createElement("article");
    el.className = "slide";
    el.style.setProperty("--h", (i * 47 + 20) % 360);
    el.setAttribute("aria-label", `${a.name}, number ${i + 1}`);
    el.innerHTML = `
      <div class="slide-info">
        <span class="slide-rank">No. ${i + 1} this month</span>
        <h3 class="slide-name">${a.name}</h3>
        <p class="slide-genre">${a.genre}</p>
        <p class="slide-listeners"><strong>${a.listeners}</strong> monthly listeners</p>
        <p class="slide-track">Top track: ${a.track}</p>
        <a class="slide-btn" target="_blank" rel="noopener"
           href="https://open.spotify.com/search/${encodeURIComponent(a.name)}">Listen on Spotify</a>
      </div>
      <div class="slide-art"${a.cover ? ` style="background-image:url('${a.cover}')"` : ""}>
        ${a.cover ? "" : `<span class="slide-initials">${initials(a.name)}</span>`}
        <span class="slide-badge">#${i + 1}</span>
      </div>`;
    el.addEventListener("click", () => { if (el.dataset.pos !== "0") go(i); });
    stage.appendChild(el);
 
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Show ${a.name}`);
    dot.addEventListener("click", () => go(i));
    dots.appendChild(dot);
    return el;
  });
 
  function render() {
    slides.forEach((el, i) => {
      let d = (i - index + n) % n;
      if (d > n / 2) d -= n;
      el.dataset.pos = Math.abs(d) <= 2 ? d : "hidden";
      el.setAttribute("aria-hidden", d !== 0);
      el.querySelector(".slide-btn").tabIndex = d === 0 ? 0 : -1;
    });
    [...dots.children].forEach((b, i) => b.classList.toggle("active", i === index));
  }
 
  function go(i) { index = (i + n) % n; render(); }
 
  document.getElementById("prev").addEventListener("click", () => go(index - 1));
  document.getElementById("next").addEventListener("click", () => go(index + 1));
 
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(index - 1);
    if (e.key === "ArrowRight") go(index + 1);
  });
 
  // Swipe support
  let startX = null;
  stage.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  stage.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
  stage.addEventListener("pointercancel", () => { startX = null; });
 
  render();
})();