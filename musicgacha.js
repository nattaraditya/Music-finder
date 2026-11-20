const moods = {
  "Chill": [
    { title: "Lo-fi chill beats",   query: "lofi chill beats" },
    { title: "Acoustic evenings",   query: "acoustic chill" },
    { title: "Soft jazz",           query: "relaxing jazz" },
    { title: "Ambient calm",        query: "ambient calm" },
    { title: "Rainy day piano",     query: "rainy day piano" }
  ],
  "Focus": [
    { title: "Deep focus",          query: "deep focus" },
    { title: "Instrumental study",  query: "instrumental study music" },
    { title: "Classical for work",  query: "classical focus" },
    { title: "Electronic flow",     query: "electronic focus" }
  ],
  "Workout": [
    { title: "Gym hip-hop",         query: "gym hip hop workout" },
    { title: "Rock to run to",      query: "rock workout" },
    { title: "EDM energy",          query: "edm workout" },
    { title: "Pop power hour",      query: "pop workout" }
  ],
  "Party": [
    { title: "Dance floor hits",    query: "party dance hits" },
    { title: "Latin party",         query: "latin party" },
    { title: "Throwback party",     query: "throwback party hits" },
    { title: "Pre-game pop",        query: "pregame pop" }
  ],
  "Feel-good": [
    { title: "Good vibes only",     query: "feel good hits" },
    { title: "Sunny pop",           query: "happy pop" },
    { title: "Road trip singalong", query: "road trip singalong" },
    { title: "Funk and soul",       query: "feel good funk soul" }
  ],
  "Sad": [
    { title: "Late night feelings", query: "sad songs late night" },
    { title: "Heartbreak ballads",  query: "heartbreak ballads" },
    { title: "Sad indie",           query: "sad indie" },
    { title: "Slow R&B",            query: "slow r&b sad" }
  ]
};
 
(function () {
  const row = document.getElementById("mood-row");
  const btn = document.getElementById("surprise-btn");
  const result = document.getElementById("surprise-result");
  const rMood = document.getElementById("result-mood");
  const rTitle = document.getElementById("result-title");
  const rLink = document.getElementById("result-link");
  const history = document.getElementById("surprise-history");
  const list = document.getElementById("history-list");
 
  const url = (q) => "https://open.spotify.com/search/" + encodeURIComponent(q + " playlist") + "/playlists";
 
  let mood = "Any";
  let last = null;
  const past = [];
 
  // mood chips
  ["Any", ...Object.keys(moods)].forEach((name) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "mood-chip";
    b.textContent = name;
    b.setAttribute("aria-pressed", name === mood);
    b.addEventListener("click", () => {
      mood = name;
      [...row.children].forEach((c) => c.setAttribute("aria-pressed", c === b));
    });
    row.appendChild(b);
  });
 
  function pool() {
    if (mood !== "Any") return moods[mood].map((p) => ({ ...p, mood }));
    return Object.entries(moods).flatMap(([m, items]) => items.map((p) => ({ ...p, mood: m })));
  }
 
  function pick() {
    const options = pool();
    let choice;
    do {
      choice = options[Math.floor(Math.random() * options.length)];
    } while (options.length > 1 && last && choice.query === last.query);
    return choice;
  }
 
  function show(p) {
    rMood.textContent = p.mood;
    rTitle.textContent = p.title;
    rLink.href = url(p.query);
    result.hidden = false;
  }
 
  function addHistory(p) {
    past.unshift(p);
    if (past.length > 5) past.pop();
    // the newest pick is already on screen, so list only the earlier ones
    list.innerHTML = "";
    past.slice(1).forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url(item.query);
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = item.title;
      li.appendChild(a);
      list.appendChild(li);
    });
    history.hidden = past.length < 2;
  }
 
  btn.addEventListener("click", () => {
    const p = pick();
    last = p;
    show(p);
    addHistory(p);
    btn.textContent = "Surprise me again";
  });
})();