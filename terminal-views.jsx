// terminal-views.jsx — content views for the refined IDE portfolio

const { useState, useEffect, useRef, useMemo } = React;

const fmtN = (n) => n.toLocaleString("en-US");

function buildHeat() {
  // Real contribution data from GitHub API (last 12 months)
  const realWeeks = Array.from({ length: 53 }, () => Array(7).fill(0));
  // Week 52 (last week): Thu=17, Fri=11
  realWeeks[52][4] = 17;
  realWeeks[52][5] = 11;

  const cells = [];
  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      const count = realWeeks[w][d];
      let lvl = 0;
      if (count > 0)  lvl = 1;
      if (count >= 5) lvl = 2;
      if (count >= 10) lvl = 3;
      if (count >= 15) lvl = 4;
      cells.push({ w, d, lvl });
    }
  }
  return cells;
}

const L = (lang) => (o) => (typeof o === "string" ? o : o[lang]);

// ── HOME ─────────────────────────────────────────────────────────
function ViewHome({ lang, cv, navigate }) {
  const t = L(lang);
  return (
    <div className="view">
      <section className="hero">
        <div className="marker"><i/><span>{lang === "pt" ? "Desenvolvedor Backend & Automação de Sistemas" : "Backend & Automation Engineer"}</span></div>
        <h1>{cv.meta.name}</h1>
        <div className="role">{t(cv.role)}</div>
        <p className="tagline">{t(cv.tagline)}</p>

        <div className="hero-links">
          <button onClick={() => navigate("projects")}><span>{lang === "pt" ? "Ver projetos" : "View projects"}</span><span className="arr">→</span></button>
          <button onClick={() => navigate("experience")}><span>{lang === "pt" ? "Experiência" : "Experience"}</span><span className="arr">→</span></button>
          <a href={cv.meta.cvFile} target="_blank" rel="noopener"><span>{lang === "pt" ? "Baixar CV" : "Download CV"}</span><span className="arr">↓</span></a>
          <a href={`mailto:${cv.meta.email}`}><span>{cv.meta.email}</span><span className="arr">↗</span></a>
        </div>

        <div className="hero-stats">
          <div className="cell">
            <div className="k">{lang === "pt" ? "Linguagens" : "Languages"}</div>
            <div className="v">Python · C#</div>
          </div>
          <div className="cell">
            <div className="k">{lang === "pt" ? "Base" : "Based in"}</div>
            <div className="v">Rio de Janeiro</div>
          </div>
          <div className="cell">
            <div className="k">{lang === "pt" ? "Modo" : "Mode"}</div>
            <div className="v">{lang === "pt" ? "Remoto" : "Remote"}</div>
          </div>
          <div className="cell">
            <div className="k">{lang === "pt" ? "Status" : "Status"}</div>
            <div className="v mono" style={{ color: "var(--t-accent)" }}>{lang === "pt" ? "Disponível" : "Available"}</div>
          </div>
        </div>
      </section>

      <div className="prose" style={{ maxWidth: 720 }}>
        <p style={{ fontSize: 17, color: "var(--t-text-dim)", lineHeight: 1.65 }}>
          {t(cv.summary)}
        </p>
      </div>
    </div>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────
function ViewAbout({ lang, cv }) {
  const t = L(lang);
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">01</span><span>{lang === "pt" ? "Sobre" : "About"}</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Sistemas vivos, código defensivo." : "Living systems, defensive code."}
      </h2>
      <p className="section-lede">{t(cv.summary)}</p>

      <div className="prose" style={{ maxWidth: 720 }}>
        <h3>{lang === "pt" ? "Como eu trabalho" : "How I work"}</h3>
        <p>
          {lang === "pt"
            ? "Penso em sistemas como organismos vivos: eles falham de formas surpreendentes, e o trabalho de verdade está em torná-los previsíveis, observáveis e fáceis de consertar às três da manhã. Manter uma frota de 100+ crawlers em produção me ensinou que código defensivo, logs claros e retries inteligentes valem mais que qualquer arquitetura elegante no papel."
            : "I think of systems as living organisms — they fail in surprising ways, and the real work is making them predictable, observable, and easy to fix at three in the morning. Maintaining a fleet of 100+ production crawlers taught me that defensive code, clear logs and smart retries beat any elegant on-paper architecture."}
        </p>
        <p>
          {lang === "pt"
            ? "Comecei a codar dando aula de Python na UFRJ, e ensinar lógica me obrigou a entender de verdade o que eu pensava que sabia. Hoje curso Ciência da Computação na UVA, consolidando a base teórica que já aplico no dia a dia."
            : "I started programming by teaching Python at UFRJ, and explaining logic forced me to actually understand what I thought I knew. I'm currently studying Computer Science at UVA, building the theoretical foundation I already apply daily."}
        </p>

        <h3>{lang === "pt" ? "O que eu gosto de fazer" : "What I like to do"}</h3>
        <ul>
          <li>{lang === "pt" ? "Engenharia reversa de fluxos web com Playwright e Selenium." : "Reverse-engineering web flows with Playwright and Selenium."}</li>
          <li>{lang === "pt" ? "APIs REST bem desenhadas com FastAPI e ASP.NET Core." : "Cleanly-designed REST APIs with FastAPI and ASP.NET Core."}</li>
          <li>{lang === "pt" ? "Pipelines assíncronos, filas (RabbitMQ) e jobs agendados." : "Async pipelines, queues (RabbitMQ) and scheduled jobs."}</li>
          <li>{lang === "pt" ? "Resolver o problema de verdade, não o problema mais bonito." : "Solving the real problem, not the prettiest version of it."}</li>
        </ul>
      </div>
    </div>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────
function ViewExperience({ lang, cv }) {
  const t = L(lang);
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">02</span><span>{lang === "pt" ? "Experiência" : "Experience"}</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Cinco anos entre ensinar lógica, pesquisar com IA e manter automações em produção." : "Five years bouncing between teaching logic, researching with AI and maintaining production automations."}
      </h2>

      <div>
        {cv.experience.map((x, i) => (
          <article className="entry" key={i}>
            <div className="when">
              <b>{t(x.period)}</b>
              <span>{t(x.where)}</span>
            </div>
            <div>
              <h3>{t(x.role)}</h3>
              <div className="at">{lang === "pt" ? "em" : "at"} <b>{t(x.company)}</b></div>
              <ul>{x.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}</ul>
              <div className="stack">{x.stack.map((s) => <span key={s} className="tag-pill">{s}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────
function ViewProjects({ lang, cv }) {
  const t = L(lang);
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">03</span><span>{lang === "pt" ? "Projetos" : "Projects"}</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Construído do zero para resolver problemas reais." : "Built from scratch to solve real problems."}
      </h2>

      <div>
        {cv.projects.map((p, i) => (
          <article className="entry" key={i}>
            <div className="when">
              <b>0{i+1}</b>
              <span>{p.stack.slice(0, 3).join(" · ")}</span>
            </div>
            <div>
              <h3>{p.name}</h3>
              <div className="at" style={{ marginBottom: 14 }}>{t(p.summary)}</div>
              <ul>{p.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}</ul>
              <div className="stack" style={{ marginBottom: 14 }}>
                {p.stack.map((s) => <span key={s} className="tag-pill">{s}</span>)}
              </div>
              <a className="repo" href={p.url} target="_blank" rel="noopener">
                <span style={{ color: "var(--t-text-mute)" }}>↗</span> {p.repo}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── SKILLS ───────────────────────────────────────────────────────
function ViewSkills({ lang, cv }) {
  const groups = [
    { num: "01", t: { pt: "Linguagens",      en: "Languages" }, items: cv.skills.languages },
    { num: "02", t: { pt: "Frameworks",      en: "Frameworks" }, items: cv.skills.frameworks },
    { num: "03", t: { pt: "Scraping & automação", en: "Scraping & automation" }, items: cv.skills.scraping },
    { num: "04", t: { pt: "Bancos de dados", en: "Databases" }, items: cv.skills.databases },
    { num: "05", t: { pt: "Infra & deploy",  en: "Infra & deploy" }, items: cv.skills.infra },
    { num: "06", t: { pt: "Familiarizado",   en: "Familiar with" }, items: cv.skills.familiar },
    { num: "07", t: { pt: "Práticas",        en: "Practices" }, items: cv.skills.practices },
  ];
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">04</span><span>{lang === "pt" ? "Stack técnica" : "Technical stack"}</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "O que está no cinto de ferramentas." : "What's on the tool belt."}
      </h2>

      <div className="skills-grid">
        {groups.map((g) => (
          <div className="skill-cell" key={g.num}>
            <h4><span style={{ color: "var(--t-accent)", marginRight: 8 }}>{g.num}</span>{g.t[lang]}</h4>
            <div className="items">{g.items.map((v) => <span key={v}>{v}</span>)}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: "var(--t-sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: "56px 0 22px", color: "var(--t-text)" }}>
        {lang === "pt" ? "Idiomas falados" : "Spoken languages"}
      </h3>
      <div className="lang-list">
        {cv.languagesSpoken.map((l, i) => (
          <div className="lang-row" key={i}>
            <div className="top">
              <span className="name">{l.name[lang]}</span>
              <span className="lvl">— {l.level[lang]}</span>
            </div>
            <div className="bar"><i style={{ width: `${l.pct}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── EDUCATION ────────────────────────────────────────────────────
function ViewEducation({ lang, cv }) {
  const t = L(lang);
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">05</span><span>{lang === "pt" ? "Formação" : "Education"}</span><span className="rule"/></div>
      <h2 className="section-title">UVA.</h2>
      <p className="section-lede">
        {lang === "pt"
          ? "Universidade Veiga de Almeida — Bacharelado em Ciência da Computação, iniciado em 2026."
          : "Universidade Veiga de Almeida — B.Sc. in Computer Science, started in 2026."}
      </p>

      <div>
        {cv.education.map((e, i) => (
          <article className="entry" key={i}>
            <div className="when">
              <b>{t(e.period)}</b>
            </div>
            <div>
              <h3>{t(e.title)}</h3>
              <div className="at">{lang === "pt" ? "em" : "at"} <b>{t(e.school)}</b></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────
function ViewContact({ lang, cv }) {
  const rows = [
    { k: "email",    v: cv.meta.email,    href: `mailto:${cv.meta.email}` },
    { k: "phone",    v: cv.meta.phone,    href: `tel:${cv.meta.phone.replace(/\s/g, "")}` },
    { k: "github",   v: cv.meta.github,   href: cv.meta.githubUrl },
    { k: "linkedin", v: cv.meta.linkedin, href: cv.meta.linkedinUrl },
    { k: "location", v: cv.meta.location[lang] },
    { k: "remote",   v: cv.meta.remote[lang] },
  ];
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">06</span><span>{lang === "pt" ? "Contato" : "Contact"}</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Vamos construir alguma coisa." : "Let's build something."}
      </h2>
      <p className="section-lede">
        {lang === "pt"
          ? "A melhor forma de me alcançar é por email. Estou aberto a oportunidades remotas em backend ou scraping/automação."
          : "Best way to reach me is email. I'm open to remote opportunities in backend or scraping/automation."}
      </p>

      <pre className="codeblock">
<span className="punc">{"{"}</span>{"\n"}
{rows.map((r, i) => (
  <React.Fragment key={r.k}>
    {"  "}<span className="prop">"{r.k}"</span><span className="punc">: </span>
    {r.href
      ? <a href={r.href} target="_blank" rel="noopener"><span className="str">"{r.v}"</span></a>
      : <span className="str">"{r.v}"</span>}
    {i < rows.length - 1 && <span className="punc">,</span>}
    {"\n"}
  </React.Fragment>
))}
<span className="punc">{"}"}</span>
      </pre>
    </div>
  );
}

// ── GITHUB ───────────────────────────────────────────────────────
function ViewGitHub({ lang, cv }) {
  const cells = useMemo(() => buildHeat(), []);
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">07</span><span>GitHub · @{cv.meta.handle}</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Um recorte da atividade pública." : "A snapshot of public activity."}
      </h2>

      <div className="gh-grid">
        <div className="cell"><div className="k">{lang === "pt" ? "Repos" : "Repos"}</div><div className="v">{cv.gh.public_repos}</div></div>
        <div className="cell"><div className="k">{lang === "pt" ? "Estrelas" : "Stars"}</div><div className="v">{cv.gh.stars}</div></div>
        <div className="cell"><div className="k">{lang === "pt" ? "Seguidores" : "Followers"}</div><div className="v">{cv.gh.followers}</div></div>
        <div className="cell"><div className="k">{lang === "pt" ? "Contribs/ano" : "Contribs/yr"}</div><div className="v">{fmtN(cv.gh.contributions_last_year)}</div></div>
        <div className="cell"><div className="k">{lang === "pt" ? "Sequência" : "Streak"}</div><div className="v">{cv.gh.streak_weeks}<small>w</small></div></div>
      </div>

      <h3 style={{ fontFamily: "var(--t-sans)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.005em", margin: "0 0 16px", color: "var(--t-text)" }}>
        {lang === "pt" ? "Linguagens mais usadas" : "Most used languages"}
      </h3>
      <div className="gh-bar">
        {cv.gh.top_languages.map((l) => (
          <i key={l.name} style={{ width: `${l.pct}%`, background: l.color, height: "100%", display: "block" }} />
        ))}
      </div>
      <div className="gh-legend">
        {cv.gh.top_languages.map((l) => (
          <span key={l.name}><i style={{ background: l.color }}/>{l.name}<span className="pct">{l.pct}%</span></span>
        ))}
      </div>

      <h3 style={{ fontFamily: "var(--t-sans)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.005em", margin: "40px 0 16px", color: "var(--t-text)" }}>
        {lang === "pt" ? "Contribuições — últimos 12 meses" : "Contributions — last 12 months"}
      </h3>
      <div style={{ overflowX: "auto", paddingBottom: 6 }}>
        <div className="heat">
          {cells.map((c, i) => <i key={i} className={`l${c.lvl}`} style={{ gridColumn: c.w + 1, gridRow: c.d + 1 }} />)}
        </div>
      </div>
      <div className="heat-legend">
        <span>{lang === "pt" ? "menos" : "less"}</span>
        <i className="l0" /><i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" />
        <span>{lang === "pt" ? "mais" : "more"}</span>
      </div>
    </div>
  );
}

// ── ME.JS ────────────────────────────────────────────────────────
function ViewMe({ lang, cv }) {
  return (
    <div className="view">
      <div className="eyebrow"><span className="num">08</span><span>me.js</span><span className="rule"/></div>
      <h2 className="section-title">
        {lang === "pt" ? "Resumo, em código." : "Résumé, in code."}
      </h2>

      <pre className="codeblock">
<span className="cmt">{`// ${lang === "pt" ? "como me descrever em código" : "describing me in code"}`}</span>{"\n"}
<span className="kw">const</span> <span className="fn">me</span> <span className="punc">=</span> <span className="punc">{"{"}</span>{"\n"}
{"  "}<span className="prop">name</span><span className="punc">:</span> <span className="str">"{cv.meta.name}"</span><span className="punc">,</span>{"\n"}
{"  "}<span className="prop">role</span><span className="punc">:</span> <span className="str">"{typeof cv.role === "string" ? cv.role : cv.role[lang]}"</span><span className="punc">,</span>{"\n"}
{"  "}<span className="prop">location</span><span className="punc">:</span> <span className="str">"{cv.meta.location[lang]}"</span><span className="punc">,</span>{"\n"}
{"  "}<span className="prop">languages</span><span className="punc">:</span> <span className="punc">[</span><span className="str">"Python"</span><span className="punc">,</span> <span className="str">"C#"</span><span className="punc">],</span>{"\n"}
{"  "}<span className="prop">currentlyBuilding</span><span className="punc">:</span> <span className="punc">[</span>{"\n"}
{"    "}<span className="str">"{lang === "pt" ? "crawlers em produção" : "production crawlers"}"</span><span className="punc">,</span>{"\n"}
{"    "}<span className="str">"REST APIs (FastAPI + ASP.NET Core)"</span><span className="punc">,</span>{"\n"}
{"    "}<span className="str">"{lang === "pt" ? "workflows de automação" : "automation workflows"}"</span>{"\n"}
{"  "}<span className="punc">],</span>{"\n"}
{"  "}<span className="prop">available</span><span className="punc">:</span> <span className="kw">true</span><span className="punc">,</span>{"\n"}
{"  "}<span className="prop">remote</span><span className="punc">:</span> <span className="kw">true</span><span className="punc">,</span>{"\n"}
{"  "}<span className="prop">contact</span><span className="punc">:</span> <span className="punc">{"{"}</span>{"\n"}
{"    "}<span className="prop">email</span><span className="punc">:</span> <span className="str">"{cv.meta.email}"</span><span className="punc">,</span>{"\n"}
{"    "}<span className="prop">github</span><span className="punc">:</span> <span className="str">"{cv.meta.github}"</span>{"\n"}
{"  "}<span className="punc">{"}"}</span><span className="punc">,</span>{"\n"}
<span className="punc">{"}"}</span><span className="punc">;</span>
      </pre>
    </div>
  );
}

Object.assign(window, { ViewHome, ViewAbout, ViewExperience, ViewProjects, ViewSkills, ViewEducation, ViewContact, ViewGitHub, ViewMe });
