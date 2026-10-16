(() => {
  "use strict";

  /* ------------------------------------------------------------------
   * Where each label sits on the photo, as [x %, y %] of the image.
   * These are first guesses. Open the page with ?edit on the end of the
   * URL (for example index.html?edit), drag the dots into place, then
   * copy the printed block back over this one.
   * ------------------------------------------------------------------ */
  const POSITIONS = {
    airglow: [74, 61],
    zodiacal: [21, 34],
    milkyway: [51, 30],
    smc: [85, 2.5],
    spica: [18, 23],
    andes: [10, 71.5],
    licancabur: [49.5, 72.3],
    sanpedro: [76, 72.5],
    staircase: [37, 75],
  };

  /* ------------------------------------------------------------------
   * Sources. Each "sources" list below (and PAGE_SOURCES for the intro
   * at the top of the page) takes entries like any of these:
   *
   *   "https://science.nasa.gov/...",                      (a bare link)
   *   { text: "NASA, Airglow", url: "https://science.nasa.gov/..." },
   *   "Astro 127 lecture notes, Week 6",                   (plain text)
   *
   * A Sources heading only shows once its list has at least one entry.
   * ------------------------------------------------------------------ */
  const PAGE_SOURCES = [];

  /* ------------------------------------------------------------------
   * Content. The four major kinds of light are listed nearest to
   * farthest; that order drives the legend and the Nearer/Farther
   * buttons. "side" is where the label text sits relative to the dot:
   * left, right, up or down.
   * ------------------------------------------------------------------ */
  const FEATURES = [
    {
      id: "airglow",
      major: true,
      side: "left",
      name: "Airglow",
      distance: "About 90 to 300 km overhead",
      where: "The faint green and red tint in the sky just above the horizon.",
      body: [
        "Airglow is light given off by the upper atmosphere itself. During the day, molecules in the atmosphere get energized by absorbing ultraviolet (UV) radiation from the Sun, which splits them apart. This energy is stored and needs to be released in some way. Since molecules in the upper atmosphere are more sparse, they rarely bump into each other, so when the pieces recombine at night, the energy is released as light, creating the glow that you see in the sky in the picture.",
        "The colors of the light tell you which gas is glowing and how high in the atmosphere it is sitting. Three gases produce this light: sodium (Na), hydroxyl radicals (OH), and atomic oxygen (O). Sodium generates a yellow-orange tint at around 90 km, hydroxyl radicals produce a red tint at around 85–90 km, and oxygen produces a green tint at around 90–100 km. Oxygen also produces a deep red tint much higher up, at around 150–300 km.",
      ],
      facts: [
        ["Height", "90 to 300 km"],
        ["When", "Every night, all over Earth"],
      ],
      sources: ["https://science.nasa.gov/earth/earth-observatory/airglow-over-the-indian-ocean-147367/", "https://en.wikipedia.org/wiki/Airglow",],
    },
    {
      id: "zodiacal",
      major: true,
      side: "right",
      name: "Zodiacal light",
      distance: "Dust spread through the inner Solar System",
      where: "The tilted band of soft light on the upper left, with the star Spica sitting inside it.",
      body: [
        "Zodiacal light is diffuse sunlight scattered by interplanetary dust, and it appears as a glow rising from the horizon. You can see it in the top left of the image as the white hue in the sky. Zodiacal light is brightest closest to the Sun and extends from the Sun’s direction along the zodiac. The fainter light that spans the entire ecliptic is known as the zodiacal band. Zodiacal light is usually faint and is easily washed out by moonlight and light pollution.",
        "The dust can't last forever. Sunlight slowly drains each grain's orbital energy, an effect called Poynting–Robertson drag, so the grains spiral into the Sun over tens of thousands to hundreds of thousands of years. Something has to keep resupplying the cloud. Most of the dust is thought to come from comets, especially Jupiter-family comets, with some from collisions between asteroids.",
      ],
      facts: [
        ["Grain size", "About 10 to 300 µm"],
        ["Lies along", "The ecliptic"],
      ],
      sources: ["https://en.wikipedia.org/wiki/Zodiacal_light", ],
    },
    {
      id: "milkyway",
      major: true,
      side: "right",
      name: "Milky Way",
      distance: "Hundreds to tens of thousands of light-years",
      where: "The bright band rising almost straight up behind the staircase, split by a dark lane.",
      body: [
        "The Milky Way is the home galaxy of our solar system. It spans roughly 100,000 light-years across and contains somewhere between 100 and 400 billion stars. We are located within the Milky Way’s flat disk, about 26,000 light-years from the center of the galaxy, in the direction of Sagittarius. Because we are inside the disk, when we look along it, we see the combined light of billions of distant stars as a glowing band stretching across the sky.",
        "The dark line you see in the picture isn’t a gap in the stars. Instead, it is caused by dust: cold clouds of tiny grains and gas located in the disk between us and more distant stars. This dust absorbs and scatters some of the starlight. It dims blue light more than red light, so stars viewed through thinner patches of dust can appear redder than they actually are.",
      ],
      facts: [
        ["Stars", "100 to 400 billion"],
        ["Sun to center", "About 26,000 ly"],
      ],
      sources: ["https://en.wikipedia.org/wiki/Milky_Way"],
    },
    {
      id: "smc",
      major: true,
      side: "left",
      name: "Small Magellanic Cloud",
      distance: "About 200,000 light-years away",
      where: "The small, faint, cloud-like smudge at the very top right.",
      body: [
        "The Small Magellanic Cloud is a dwarf galaxy that is separate from the Milky Way. This galaxy is located about 200,000 light-years away, is around 7,000 light-years across, and contains a few hundred million stars. The Small Magellanic Cloud’s larger partner is the Large Magellanic Cloud, and both galaxies interact gravitationally with the Milky Way.",
        "The two Magellanic Clouds have been pulling on each other and interacting with the Milky Way for billions of years, creating structures made of gas and stars. The Magellanic Bridge is a stream of gas and young stars connecting the two galaxies, while the Magellanic Stream is a long trail of gas extending from them. A fun fact about this gas is that it contains fewer heavy elements than gas in the Milky Way, allowing astronomers to study low-metallicity material and conditions that are somewhat similar to those found in the early universe.",
      ],
      facts: [
        ["Size", "About 7,000 ly across"],
        ["Visible from", "Southern hemisphere and tropics"],
      ],
      sources: ["https://en.wikipedia.org/wiki/Small_Magellanic_Cloud",],
    },

    /* Smaller labels: just a name, shown when you point at the dot. */
    {
      id: "spica",
      side: "right",
      name: "Spica",
    },
    {
      id: "andes",
      side: "right",
      name: "Andes",
    },
    {
      id: "licancabur",
      side: "up",
      name: "Licancabur",
    },
    {
      id: "sanpedro",
      side: "down",
      name: "San Pedro de Atacama",
    },
    {
      id: "staircase",
      side: "down",
      name: "Desert Staircase",
    },
  ];

  const MAJORS = FEATURES.filter((f) => f.major);
  const byId = Object.fromEntries(FEATURES.map((f) => [f.id, f]));
  const EDIT = new URLSearchParams(location.search).has("edit");

  // Used if images/desert-stairway.jpg hasn't been added to the repo yet.
  const FALLBACK_SRC =
    "https://assets.science.nasa.gov/content/dam/science/cds/apod/apod/2026/october/Stairway2Heaven_Looten_6750.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg";

  const $ = (id) => document.getElementById(id);
  const frame = $("frame");
  const img = $("sky");
  const marksEl = $("marks");
  const panel = $("panel");
  const legend = $("legend");
  const toggle = $("toggle-labels");

  /* ---------- Star field background ---------- */

  // The star field draws inside its own shadow root, so pause it from there
  // for anyone who has asked their system for less motion.
  const sky = $("night-sky");
  if (sky && sky.shadowRoot && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const still = document.createElement("style");
    still.textContent = ".star { animation-play-state: paused !important; }";
    sky.shadowRoot.append(still);
  }

  /* ---------- Image ---------- */

  const ready = () => frame.classList.add("is-ready");

  function useFallback() {
    if (img.dataset.fallback) return ready();
    img.dataset.fallback = "1";
    img.src = FALLBACK_SRC;
  }

  img.addEventListener("load", ready);
  img.addEventListener("error", useFallback);
  if (img.complete) {
    if (img.naturalWidth === 0) useFallback();
    else ready();
  }
  // Never leave the labels hidden if the image is slow or blocked.
  setTimeout(ready, 4000);

  /* ---------- Labels on the photo ---------- */

  const markEls = {};

  FEATURES.forEach((f, i) => {
    const [x, y] = POSITIONS[f.id];
    const b = document.createElement(f.major ? "button" : "span");
    b.className = `mark ${f.major ? "mark--major" : "mark--minor"} side-${f.side}`;
    b.style.left = `${x}%`;
    b.style.top = `${y}%`;
    b.style.setProperty("--i", i);
    if (f.major) b.style.setProperty("--c", `var(--${f.id})`);
    b.dataset.id = f.id;
    if (f.major) {
      b.type = "button";
      b.setAttribute("aria-expanded", "false");
      b.setAttribute("aria-controls", "panel");
    } else {
      // Focusable so keyboard users can reveal the name too.
      b.tabIndex = 0;
    }

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("aria-hidden", "true");
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = f.name;

    b.append(dot, tag);
    marksEl.append(b);
    markEls[f.id] = b;
  });

  /* ---------- Legend ---------- */

  const legendEls = {};

  MAJORS.forEach((f) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.id = f.id;
    b.style.setProperty("--c", `var(--${f.id})`);

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", "true");
    const name = document.createElement("span");
    name.className = "name";
    name.textContent = f.name;
    const dist = document.createElement("span");
    dist.className = "dist";
    dist.textContent = f.distance;

    b.append(swatch, name, dist);
    li.append(b);
    legend.append(li);
    legendEls[f.id] = b;
  });

  /* ---------- Sources ---------- */

  function renderSources(section, list) {
    const items = (list || []).map((entry) => {
      const { text, url } =
        typeof entry === "string"
          ? /^https?:\/\//.test(entry) ? { url: entry } : { text: entry }
          : entry;
      const li = document.createElement("li");
      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = text || url;
        li.append(a);
      } else {
        li.textContent = text;
      }
      return li;
    });
    section.querySelector("ol").replaceChildren(...items);
    section.hidden = items.length === 0;
  }

  renderSources($("page-sources"), PAGE_SOURCES);

  /* ---------- Detail panel ---------- */

  let current = null;
  let opener = null;

  function setNav(btn, f, word) {
    if (!f) {
      btn.hidden = true;
      return;
    }
    btn.hidden = false;
    btn.textContent = `${word}: ${f.name}`;
    btn.dataset.id = f.id;
  }

  function setActive(id, on) {
    markEls[id].classList.toggle("is-active", on);
    markEls[id].setAttribute("aria-expanded", String(on));
    legendEls[id].classList.toggle("is-active", on);
  }

  function openPanel(id, from) {
    const f = byId[id];
    if (!f || !f.major) return;
    const i = MAJORS.indexOf(f);
    if (from) opener = from;

    panel.style.setProperty("--c", `var(--${id})`);
    $("panel-title").textContent = f.name;
    $("panel-distance").textContent = f.distance;
    $("panel-where").textContent = f.where;

    $("panel-body").replaceChildren(
      ...f.body.map((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        return p;
      })
    );

    $("panel-facts").replaceChildren(
      ...f.facts.map(([label, value]) => {
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = value;
        row.append(dt, dd);
        return row;
      })
    );

    renderSources($("panel-sources"), f.sources);

    setNav($("prev"), MAJORS[i - 1], "Nearer");
    setNav($("next"), MAJORS[i + 1], "Farther");

    if (current) setActive(current, false);
    current = id;
    setActive(id, true);

    panel.inert = false;
    panel.classList.add("is-open");
    panel.scrollTop = 0;
    $("panel-title").focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  }

  function closePanel() {
    if (!current) return;
    setActive(current, false);
    current = null;
    panel.classList.remove("is-open");
    panel.inert = true;
    history.replaceState(null, "", location.pathname + location.search);
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    opener = null;
  }

  /* ---------- Events ---------- */

  marksEl.addEventListener("click", (e) => {
    if (EDIT) return;
    const m = e.target.closest(".mark--major");
    if (m) openPanel(m.dataset.id, m);
  });

  legend.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    openPanel(b.dataset.id, b);
  });

  $("prev").addEventListener("click", (e) => openPanel(e.currentTarget.dataset.id));
  $("next").addEventListener("click", (e) => openPanel(e.currentTarget.dataset.id));
  $("panel-close").addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });

  toggle.addEventListener("click", () => {
    const hidden = frame.classList.toggle("labels-hidden");
    toggle.textContent = hidden ? "Show labels" : "Hide labels";
  });

  // Links like index.html#milkyway open straight to that panel.
  const startId = location.hash.slice(1);
  if (byId[startId] && byId[startId].major && !EDIT) openPanel(startId);

  /* ---------- Position editor (?edit) ---------- */

  if (EDIT) {
    document.body.classList.add("editing");

    const box = document.createElement("div");
    box.className = "edit-box";
    box.innerHTML =
      "<p>Drag the dots into place, then copy this block over POSITIONS at the top of js/main.js.</p><pre></pre><button type=\"button\">Copy</button>";
    document.body.append(box);
    const out = box.querySelector("pre");
    const copyBtn = box.querySelector("button");

    const print = () => {
      const lines = Object.entries(POSITIONS).map(
        ([id, [x, y]]) => `    ${id}: [${x}, ${y}],`
      );
      out.textContent = `  const POSITIONS = {\n${lines.join("\n")}\n  };`;
    };
    print();

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(out.textContent);
        copyBtn.textContent = "Copied";
      } catch {
        copyBtn.textContent = "Select the text and copy it";
      }
      setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
    });

    const clamp = (n) => Math.min(100, Math.max(0, n));
    const round = (n) => Math.round(n * 2) / 2;

    marksEl.addEventListener("pointerdown", (e) => {
      const m = e.target.closest(".mark");
      if (!m) return;
      e.preventDefault();
      const id = m.dataset.id;
      const rect = frame.getBoundingClientRect();
      const [x0, y0] = POSITIONS[id];
      // Keep the grab offset so the dot doesn't jump to the cursor.
      const dx = e.clientX - (rect.left + (x0 / 100) * rect.width);
      const dy = e.clientY - (rect.top + (y0 / 100) * rect.height);
      m.setPointerCapture(e.pointerId);

      const move = (ev) => {
        const x = round(clamp(((ev.clientX - dx - rect.left) / rect.width) * 100));
        const y = round(clamp(((ev.clientY - dy - rect.top) / rect.height) * 100));
        POSITIONS[id] = [x, y];
        m.style.left = `${x}%`;
        m.style.top = `${y}%`;
        print();
      };
      const up = () => {
        m.removeEventListener("pointermove", move);
        m.removeEventListener("pointerup", up);
        m.removeEventListener("pointercancel", up);
      };
      m.addEventListener("pointermove", move);
      m.addEventListener("pointerup", up);
      m.addEventListener("pointercancel", up);
    });
  }
})();
