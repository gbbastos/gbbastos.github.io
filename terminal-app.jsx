// terminal-app.jsx — Refined IDE-inspired portfolio shell (v2)
// No window-chrome cosplay, no persistent terminal, no status bar.
// Layout: thin topbar · sidebar file-index · scrolling content · footer.
// Terminal lives only on the Playground page.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e0a458",
  "dark": true,
  "animations": true,
  "density": 1,
  "font": "JetBrains Mono",
  "sections": {
    "about": true,
    "experience": true,
    "projects": true,
    "skills": true,
    "education": true,
    "me": true,
    "github": true,
    "contact": true,
    "playground": true
  }
}/*EDITMODE-END*/;

// ── routes ───────────────────────────────────────────────────────
const ROUTES = {
  home:       { label: { pt: "início",       en: "home" },        file: "home.md",         pre: "01", section: "ROOT" },
  about:      { label: { pt: "sobre",        en: "about" },       file: "about.md",        pre: "02", section: "ROOT" },
  experience: { label: { pt: "experiência",  en: "experience" },  file: "experience.json", pre: "03", section: "WORK" },
  projects:   { label: { pt: "projetos",     en: "projects" },    file: "projects/",       pre: "04", section: "WORK" },
  skills:     { label: { pt: "stack",        en: "stack" },       file: "skills.yml",      pre: "05", section: "ROOT" },
  education:  { label: { pt: "formação",     en: "education" },   file: "education.md",    pre: "06", section: "ROOT" },
  me:         { label: { pt: "em código",    en: "in code" },     file: "me.js",           pre: "07", section: "EXTRA" },
  github:     { label: { pt: "github",       en: "github" },      file: "github.stats",    pre: "08", section: "EXTRA" },
  playground: { label: { pt: "playground",   en: "playground" },  file: "playground.sh",   pre: "09", section: "EXTRA" },
  contact:    { label: { pt: "contato",      en: "contact" },     file: "contact.json",    pre: "10", section: "ROOT" },
};

function parseHash() {
  const h = (location.hash || "#/home").replace(/^#\/?/, "");
  return ROUTES[h] ? h : "home";
}

// ── Sidebar ──────────────────────────────────────────────────────
function Sidebar({ current, onSelect, lang, sections }) {
  const cv = window.CV;
  const items = Object.entries(ROUTES).filter(([k]) => k === "home" || sections[k] !== false);
  const grouped = {};
  items.forEach(([k, r]) => {
    const sec = r.section;
    if (!grouped[sec]) grouped[sec] = [];
    grouped[sec].push([k, r]);
  });
  const order = ["ROOT", "WORK", "EXTRA"];
  const groupLabel = {
    ROOT:  lang === "pt" ? "PRINCIPAL"  : "MAIN",
    WORK:  lang === "pt" ? "TRABALHO"   : "WORK",
    EXTRA: lang === "pt" ? "EXTRAS"     : "EXTRAS",
  };

  return (
    <aside className="sidebar">
      {order.filter((g) => grouped[g]?.length).map((g) => (
        <div className="sb-group" key={g}>
          <div className="sb-group-h">{groupLabel[g]}</div>
          {grouped[g].map(([k, r]) => (
            <div
              key={k}
              className={`sb-item ${current === k ? "active" : ""}`}
              onClick={() => onSelect(k)}
            >
              <span className="pre">{r.pre}</span>
              <span>{r.label[lang]}</span>
              <span className="ext">{r.file.includes(".") ? r.file.split(".").pop() : ""}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="sb-foot">
        <div className="meta">
          <div><b>{cv.meta.name.split(" ")[0]} {cv.meta.name.split(" ").slice(-1)}</b></div>
          <div>{cv.meta.location[lang]}</div>
          <div>{cv.meta.email}</div>
        </div>
        <a href={cv.meta.cvFile} target="_blank" rel="noopener">↓ CV.pdf</a>
        <a href={cv.meta.githubUrl} target="_blank" rel="noopener">↗ {cv.meta.github}</a>
        <a href={cv.meta.linkedinUrl} target="_blank" rel="noopener">↗ LinkedIn</a>
      </div>
    </aside>
  );
}

// ── Playground command set ──────────────────────────────────────
function makePgCmds({ lang, navigate, setLang, setMode, setAccent }) {
  const cv = window.CV;
  const T = (o) => (typeof o === "string" ? o : o[lang]);
  const out = (txt, cls = "pg-out") => ({ cls, txt });

  const cmds = {
    help: () => [
      out(lang === "pt" ? "comandos:" : "commands:", "pg-warn"),
      out("  help                        " + (lang === "pt" ? "esta lista" : "this list")),
      out("  whoami                      " + (lang === "pt" ? "resumo rápido" : "quick summary")),
      out("  ls [projects|experience]"),
      out("  cat <file>                  " + (lang === "pt" ? "abrir arquivo" : "open file")),
      out("  open <section>"),
      out("  skills                      " + (lang === "pt" ? "stack inline" : "stack inline")),
      out("  projects"),
      out("  contact"),
      out("  cv                          " + (lang === "pt" ? "baixar CV" : "download CV")),
      out("  lang <pt|en>"),
      out("  theme <dark|light>"),
      out("  accent <#hex>"),
      out("  clear"),
    ],
    whoami: () => [
      out(`${cv.meta.name} — ${T(cv.role)}`, "pg-cmd-in"),
      out(`${T(cv.meta.location)} · ${T(cv.meta.remote)}`),
      out(`${cv.meta.email}`),
      out(`${cv.meta.github}`),
    ],
    ls: (args) => {
      const dir = (args[0] || ".").toLowerCase();
      if (dir === "." || dir === "/" || dir === "") {
        return [
          out("home.md   about.md   skills.yml   education.md   contact.json   me.js   github.stats   playground.sh"),
          out("experience/   projects/", "pg-warn"),
        ];
      }
      if (dir.startsWith("proj")) return cv.projects.map((p) => out(`drwxr-xr-x  ${p.name.padEnd(20)}  ${p.repo}`));
      if (dir.startsWith("exp"))  return cv.experience.map((x) => out(`-rw-r--r--  ${x.company.padEnd(25)}  ${T(x.period)}`));
      return [out(`ls: ${dir}: ${lang === "pt" ? "diretório não encontrado" : "no such directory"}`, "pg-err")];
    },
    cat: (args) => {
      const map = { "home.md": "home", "about.md": "about", "skills.yml": "skills",
        "experience.json": "experience", "experience": "experience", "projects": "projects",
        "education.md": "education", "contact.json": "contact", "me.js": "me", "github.stats": "github" };
      const k = map[(args[0] || "").toLowerCase()];
      if (k) { navigate(k); return [out(`→ ${args[0]}`, "pg-warn")]; }
      return [out(`cat: ${args[0] || "?"}: ${lang === "pt" ? "arquivo não encontrado" : "no such file"}`, "pg-err")];
    },
    open: (args) => {
      const k = (args[0] || "").toLowerCase();
      if (ROUTES[k]) { navigate(k); return [out(`→ /${k}`, "pg-warn")]; }
      return [out(`open: ${args[0] || "?"}: not found`, "pg-err")];
    },
    skills: () => [out(cv.skills.languages.concat(cv.skills.frameworks, cv.skills.databases).join(" · "), "pg-cmd-in")],
    projects: () => cv.projects.map((p) => out(`▸ ${p.name} — ${T(p.summary)}`, "pg-cmd-in")),
    contact: () => [out(cv.meta.email, "pg-cmd-in"), out(cv.meta.phone, "pg-cmd-in"), out(cv.meta.github, "pg-cmd-in"), out(cv.meta.linkedin, "pg-cmd-in")],
    cv: () => { window.open(cv.meta.cvFile, "_blank"); return [out(lang === "pt" ? "↓ baixando CV.pdf" : "↓ downloading CV.pdf", "pg-warn")]; },
    lang: (args) => {
      const v = (args[0] || "").toLowerCase();
      if (v === "pt" || v === "en") { setLang(v); return [out(`→ ${v.toUpperCase()}`, "pg-warn")]; }
      return [out("lang: pt | en", "pg-err")];
    },
    theme: (args) => {
      const v = (args[0] || "").toLowerCase();
      if (v === "dark" || v === "light") { setMode(v); return [out(`→ ${v}`, "pg-warn")]; }
      return [out("theme: dark | light", "pg-err")];
    },
    accent: (args) => {
      const v = args[0];
      if (v && /^#?[0-9a-f]{3,8}$/i.test(v.replace("#", ""))) {
        const col = v.startsWith("#") ? v : "#" + v;
        setAccent(col);
        return [out(`→ ${col}`, "pg-warn")];
      }
      return [out("accent: #hex", "pg-err")];
    },
    clear: () => "CLEAR",
    echo: (args) => [out(args.join(" "), "pg-cmd-in")],
    date: () => [out(new Date().toString(), "pg-cmd-in")],
    // hidden — not listed in help
    "sudo": (args) => args[0] === "hire-me"
      ? [out("[sudo] password for recruiter: ●●●●●●"), out(`${lang === "pt" ? "✓ aprovado. convite enviado para " : "✓ approved. invite sent to "}${cv.meta.email}`, "pg-cmd-in")]
      : [out(`sudo: ${args.join(" ")}: command not found`, "pg-err")],
    "curl": (args) => {
      const target = (args[0] || "").toLowerCase();
      if (target.includes("gbbastos") || target.includes(".dev")) {
        return [
          out("HTTP/2 200 OK", "pg-warn"),
          out("content-type: application/json"),
          out(""),
          out(`{ "status": "${lang === "pt" ? "aberto a oportunidades" : "open to opportunities"}", "remote": true }`, "pg-cmd-in"),
        ];
      }
      return [out(`curl: ${lang === "pt" ? "url inválida" : "invalid url"}`, "pg-err")];
    },
  };
  return cmds;
}

// ── Playground view ─────────────────────────────────────────────
function ViewPlayground({ lang, navigate, setLang, setMode, setAccent }) {
  const [history, setHistory] = useState(() => [
    { cls: "pg-warn", txt: lang === "pt" ? "Shell pronto. Digite `help` para listar comandos." : "Shell ready. Type `help` to list commands." },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const cmds = useMemo(
    () => makePgCmds({ lang, navigate, setLang, setMode, setAccent }),
    [lang, navigate, setLang, setMode, setAccent]
  );

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const promptStr = (
    <span className="pg-prompt">
      gbbastos<span className="at">@</span>portfolio<span className="at">:</span>~<span className="at">$</span>
    </span>
  );

  const submit = (raw) => {
    const line = raw.trim();
    const newHist = [...history, { txt: line, prompt: true }];
    if (!line) { setHistory(newHist); return; }
    const [cmd, ...args] = line.split(/\s+/);
    const fn = cmds[cmd.toLowerCase()];
    if (fn) {
      const result = fn(args);
      if (result === "CLEAR") setHistory([]);
      else setHistory([...newHist, ...result]);
    } else {
      setHistory([...newHist, { cls: "pg-err", txt: `${cmd}: command not found. ${lang === "pt" ? "tente `help`" : "try `help`"}` }]);
    }
    setCmdHistory((h) => [line, ...h]);
    setHistIdx(-1);
  };

  const onKey = (e) => {
    if (e.key === "Enter") { submit(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(cmdHistory.length - 1, histIdx + 1);
      if (ni >= 0 && cmdHistory[ni] !== undefined) { setHistIdx(ni); setInput(cmdHistory[ni]); }
    }
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(-1, histIdx - 1);
      setHistIdx(ni);
      setInput(ni === -1 ? "" : cmdHistory[ni]);
    }
    else if (e.key === "Tab") {
      e.preventDefault();
      const all = Object.keys(cmds);
      const matches = all.filter((c) => c.startsWith(input));
      if (matches.length === 1) setInput(matches[0] + " ");
    }
  };

  return (
    <div className="view">
      <div className="eyebrow"><span className="num">09</span><span>Playground</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Um shell interativo." : "An interactive shell."}
      </h2>
      <p className="section-lede">
        {lang === "pt"
          ? <>Curiosidade é a melhor entrevista. Digite <code style={{ background: "var(--t-bg-2)", padding: "1px 6px", borderRadius: 3, border: "1px solid var(--t-border)", fontFamily: "var(--t-mono)", fontSize: 12, color: "var(--t-accent)" }}>help</code> para listar todos os comandos.</>
          : <>Curiosity is the best interview. Type <code style={{ background: "var(--t-bg-2)", padding: "1px 6px", borderRadius: 3, border: "1px solid var(--t-border)", fontFamily: "var(--t-mono)", fontSize: 12, color: "var(--t-accent)" }}>help</code> to list all commands.</>}
      </p>

      <div className="pg-frame" onClick={() => inputRef.current?.focus()}>
        <div className="pg-hd"><span className="dot"/><span>bash · gbbastos@portfolio</span></div>
        <div className="pg-body" ref={bodyRef}>
          {history.map((h, i) => (
            <div className="pg-line" key={i}>
              {h.prompt
                ? <>{promptStr} <span className="pg-cmd-in">{h.txt}</span></>
                : <span className={h.cls}>{h.txt}</span>}
            </div>
          ))}
          <div className="pg-input">
            {promptStr}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              aria-label="terminal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────
function TerminalApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => localStorage.getItem("gb_lang") || "pt");
  const [current, setCurrent] = useState(parseHash());

  useEffect(() => { localStorage.setItem("gb_lang", lang); }, [lang]);

  const navigate = useCallback((key) => {
    if (!ROUTES[key]) return;
    setCurrent(key);
    location.hash = "#/" + key;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onHash = () => setCurrent(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // apply styling vars
  useEffect(() => {
    document.documentElement.dataset.mode = t.dark ? "dark" : "light";
    document.documentElement.style.setProperty("--t-accent", t.accent);
    document.documentElement.style.setProperty("--t-density", t.density);
    const ff = t.font === "JetBrains Mono" ? '"JetBrains Mono", ui-monospace, monospace'
      : t.font === "IBM Plex Mono" ? '"IBM Plex Mono", ui-monospace, monospace'
      : t.font === "Fira Code"     ? '"Fira Code", ui-monospace, monospace'
      : t.font === "Geist Mono"    ? '"Geist Mono", ui-monospace, monospace'
      : 'ui-monospace, Menlo, Consolas, monospace';
    document.documentElement.style.setProperty("--t-mono", ff);
  }, [t]);

  const setAccent = (c) => setTweak("accent", c);
  const setMode = (m) => setTweak("dark", m === "dark");

  const sections = t.sections;
  useEffect(() => {
    const allowed = current === "home" || sections[current] !== false;
    if (!allowed) navigate("home");
  }, [current, sections, navigate]);

  const cv = window.CV;
  const route = ROUTES[current];

  const renderView = () => {
    switch (current) {
      case "home":       return <ViewHome lang={lang} cv={cv} navigate={navigate} />;
      case "about":      return <ViewAbout lang={lang} cv={cv} />;
      case "experience": return <ViewExperience lang={lang} cv={cv} />;
      case "projects":   return <ViewProjects lang={lang} cv={cv} />;
      case "skills":     return <ViewSkills lang={lang} cv={cv} />;
      case "education":  return <ViewEducation lang={lang} cv={cv} />;
      case "contact":    return <ViewContact lang={lang} cv={cv} />;
      case "me":         return <ViewMe lang={lang} cv={cv} />;
      case "github":     return <ViewGitHub lang={lang} cv={cv} />;
      case "playground": return <ViewPlayground lang={lang} navigate={navigate} setLang={setLang} setMode={setMode} setAccent={setAccent} />;
      default:           return <ViewHome lang={lang} cv={cv} navigate={navigate} />;
    }
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="mark">G</span>
            <span><b>gbbastos</b> <span style={{ color: "var(--t-text-mute)" }}>/ portfolio</span></span>
            <span className="v">v2.0</span>
          </div>
          <div className="crumb">
            <span>~ </span>
            <span className="slash">/</span>
            <span> </span>
            <b>{route.file}</b>
          </div>
          <div className="topbar-r">
            <span className="chip" onClick={() => setLang(lang === "pt" ? "en" : "pt")} title="toggle language">
              {lang === "pt" ? "PT  /  en" : "pt  /  EN"}
            </span>
            <span className="chip" onClick={() => setTweak("dark", !t.dark)} title="toggle theme">
              {t.dark ? "Dark" : "Light"}
            </span>
            <a href={cv.meta.cvFile} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
              <span className="chip cv">↓ CV</span>
            </a>
          </div>
        </div>
      </header>

      <div className="shell">
        <Sidebar current={current} onSelect={navigate} lang={lang} sections={sections} />
        <main className="main">
          <div className="breadcrumb">
            <span className="seg">~</span><span className="slash">/</span>
            <span className="seg">{route.section.toLowerCase()}</span><span className="slash">/</span>
            <span className="seg cur">{route.file}</span>
          </div>
          {renderView()}
        </main>
      </div>

      <footer className="foot">
        <div>© {new Date().getFullYear()} Gabriel Bastos</div>
        <div>{lang === "pt" ? "Construído à mão em React e CSS" : "Hand-built in React and CSS"}</div>
        <div>
          <a href={cv.meta.githubUrl} target="_blank" rel="noopener">{cv.meta.github}</a>
          {" · "}
          <a href={cv.meta.linkedinUrl} target="_blank" rel="noopener">LinkedIn</a>
          {" · "}
          <a href={`mailto:${cv.meta.email}`}>Email</a>
        </div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === "pt" ? "Tema" : "Theme"} />
        <TweakToggle label={lang === "pt" ? "Modo escuro" : "Dark mode"} value={t.dark} onChange={(v) => setTweak("dark", v)} />
        <TweakColor label="Accent" value={t.accent}
          options={["#e0a458", "#9eecb5", "#7cb7d4", "#c69cd6", "#e07b78", "#f0b94a", "#b8c5a0"]}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label={lang === "pt" ? "Tipografia" : "Typography"} />
        <TweakSelect label={lang === "pt" ? "Fonte mono" : "Mono font"} value={t.font}
          options={["JetBrains Mono", "IBM Plex Mono", "Fira Code", "Geist Mono", "System Mono"]}
          onChange={(v) => setTweak("font", v)} />
        <TweakRadio label={lang === "pt" ? "Densidade" : "Density"}
          value={t.density === 0.85 ? "compact" : t.density === 1.15 ? "comfy" : "regular"}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v === "compact" ? 0.85 : v === "comfy" ? 1.15 : 1)} />

        <TweakSection label={lang === "pt" ? "Comportamento" : "Behavior"} />
        <TweakToggle label={lang === "pt" ? "Animações" : "Animations"} value={t.animations} onChange={(v) => setTweak("animations", v)} />
        <TweakRadio label={lang === "pt" ? "Idioma" : "Language"} value={lang} options={["pt", "en"]} onChange={setLang} />

        <TweakSection label={lang === "pt" ? "Seções" : "Sections"} />
        {[
          ["about",      lang === "pt" ? "Sobre"      : "About"],
          ["experience", lang === "pt" ? "Experiência": "Experience"],
          ["projects",   lang === "pt" ? "Projetos"   : "Projects"],
          ["skills",     "Stack"],
          ["education",  lang === "pt" ? "Educação"   : "Education"],
          ["me",         "me.js"],
          ["github",     "GitHub"],
          ["playground", "Playground"],
          ["contact",    lang === "pt" ? "Contato"    : "Contact"],
        ].map(([k, lbl]) => (
          <TweakToggle key={k} label={lbl} value={!!t.sections[k]}
            onChange={(v) => setTweak("sections", { ...t.sections, [k]: v })} />
        ))}
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TerminalApp />);
