(function () {
  const form = document.getElementById("song-form");
  const input = document.getElementById("song-input");
 
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) { input.focus(); return; }
    window.open("https://open.spotify.com/search/" + encodeURIComponent(q), "_blank", "noopener");
  });
})();

const pictures = [
  { src: "iMissYou.jpg", alt: "Picture 1" },
  { src: "goldtriumph.jpg", alt: "Picture 2" },
  { src: "AboutU.jpg", alt: "Picture 3" },
  { src: "letdown.jpg", alt: "Picture 4" },
  { src: "OMW.jpg", alt: "Picture 5" }
];
const ROTATE_MS = 4000; // time between pictures
 
(function () {
  const stage = document.getElementById("pic-stage");
  const n = pictures.length;
  let index = 0;
  let timer = null;
 
  const slides = pictures.map((p, i) => {
    const el = document.createElement("div");
    el.className = "pic-slide";
    el.style.setProperty("--h", (i * 61 + 30) % 360);
    el.style.setProperty("--img", `url("${p.src}")`);
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", p.alt);
    el.addEventListener("click", () => { go(i); restart(); });
    stage.appendChild(el);
    return el;
  });
 
  function render() {
    slides.forEach((el, i) => {
      let d = (i - index + n) % n;
      if (d > n / 2) d -= n;
      el.dataset.pos = Math.abs(d) <= 1 ? d : "hidden";
    });
  }
 
  function go(i) { index = (i + n) % n; render(); }
 
  function start() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || timer) return;
    timer = setInterval(() => go(index + 1), ROTATE_MS);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }
 
  stage.addEventListener("mouseenter", stop);
  stage.addEventListener("mouseleave", start);
 
  render();
  start();
})();