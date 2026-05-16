// content.js — shared CV data for all three portfolio variants (i18n PT/EN)

window.CV = {
  meta: {
    name: "Gabriel Bernardo Bastos",
    handle: "gbbastos",
    email: "gbbastos99@gmail.com",
    phone: "+55 21 98253-0799",
    github: "github.com/gbbastos",
    githubUrl: "https://github.com/gbbastos",
    linkedin: "linkedin.com/in/gbbastos",
    linkedinUrl: "https://linkedin.com/in/gbbastos",
    location: { pt: "Rio de Janeiro, Brasil", en: "Rio de Janeiro, Brazil" },
    remote: { pt: "Aberto a remoto", en: "Open to remote" },
    cvFile: "assets/Gabriel_Bernardo_Bastos.pdf",
  },

  role: {
    pt: "Backend Developer & Automation Engineer",
    en: "Backend Developer & Automation Engineer",
  },

  tagline: {
    pt: "Backend e automação com Python e C#. Sistemas que integram, coletam e entregam em produção.",
    en: "Backend and automation with Python and C#. Systems that integrate, collect and deliver in production.",
  },

  summary: {
    pt: "Desenvolvedor backend e engenheiro de automação com experiência em Python e C#/.NET, focado em web scraping, crawling e workflows de automação. Mantenho sistemas de automação em produção, integro APIs REST, opero MongoDB e SQL, e faço deploys em Windows Server.",
    en: "Backend developer and automation engineer with hands-on experience in Python and C#/.NET, specializing in web scraping, crawling and automation workflows. I maintain production automation systems, integrate REST APIs, operate MongoDB and SQL, and deploy to Windows Server.",
  },

  nav: {
    pt: { home: "início", about: "sobre", experience: "experiência", projects: "projetos", skills: "skills", education: "educação", contact: "contato", playground: "playground" },
    en: { home: "home",   about: "about", experience: "experience", projects: "projects", skills: "skills", education: "education", contact: "contact", playground: "playground" },
  },

  experience: [
    {
      role: { pt: "Backend Developer & Automation Engineer", en: "Backend Developer & Automation Engineer" },
      company: "Iprazos",
      where: { pt: "Rio de Janeiro (Remoto)", en: "Rio de Janeiro (Remote)" },
      period: { pt: "Jan 2025 — Presente", en: "Jan 2025 — Present" },
      bullets: {
        pt: [
          "Mantenho e estabilizo crawlers e automações em produção com C#/.NET e Selenium.",
          "Desenvolvo novos workflows de automação integrando APIs REST e pipelines HTTP.",
          "Automação de browser com Selenium e Playwright para sites dinâmicos e JS-heavy.",
          "Deploy e monitoramento de processos .NET (DLLs) em Windows Server.",
          "Análise operacional e troubleshooting com MongoDB e SQL.",
          "Monitoramento de filas RabbitMQ para integridade dos pipelines.",
        ],
        en: [
          "Maintain and stabilize production crawlers and automations built with C#/.NET and Selenium.",
          "Develop new automation workflows integrating REST APIs and HTTP-based pipelines.",
          "Browser automation with Selenium and Playwright for dynamic and JS-heavy websites.",
          "Deploy and monitor .NET DLL processes on Windows Server in production.",
          "Operational analysis and troubleshooting with MongoDB and SQL.",
          "Monitor RabbitMQ queues to ensure pipeline integrity and system health.",
        ],
      },
      stack: ["C#", ".NET", "Selenium", "Playwright", "MongoDB", "SQL", "RabbitMQ", "Windows Server"],
    },
    {
      role: { pt: "Software Development Intern", en: "Software Development Intern" },
      company: "PUC-Rio — Ignição Petrobras (ECOA)",
      where: { pt: "Rio de Janeiro", en: "Rio de Janeiro" },
      period: { pt: "2023 — 2024", en: "2023 — 2024" },
      bullets: {
        pt: [
          "Projetos de predição de dados com Python e métodos de data science aplicados a datasets reais.",
          "Experimentos com IA Generativa integrando a API da OpenAI (GPT) em workflows internos.",
          "Programa de pesquisa em soluções aplicadas de data science e IA.",
        ],
        en: [
          "Data prediction projects with Python and data science methods on real-world datasets.",
          "Generative AI experiments integrating the OpenAI API (GPT) into internal research workflows.",
          "Applied research program for data science and AI solutions.",
        ],
      },
      stack: ["Python", "OpenAI API", "Data Science"],
    },
    {
      role: { pt: "Instrutor & Monitor de Lógica de Programação", en: "Programming Logic Instructor & Teaching Assistant" },
      company: { pt: "Universidade Federal do Rio de Janeiro (UFRJ)", en: "Federal University of Rio de Janeiro (UFRJ)" },
      where: { pt: "Rio de Janeiro", en: "Rio de Janeiro" },
      period: { pt: "2020 — 2022", en: "2020 — 2022" },
      bullets: {
        pt: [
          "Convidado como instrutor após desempenho destaque no curso de Python.",
          "Ensino de lógica e fundamentos de Python para graduandos.",
          "Planos de aula, exercícios, avaliações e tutoria individual.",
          "Contribuições em biblioteca interna em Pygame para apoio didático.",
        ],
        en: [
          "Invited as instructor after top performance in the Python programming course.",
          "Taught programming logic and Python fundamentals to undergraduates.",
          "Designed lesson plans, exercises, assessments and tutored individually.",
          "Contributed to an internal Pygame-based teaching library.",
        ],
      },
      stack: ["Python", "Pygame", "Teaching"],
    },
  ],

  projects: [
    {
      name: "PromoGamer API",
      repo: "github.com/gbbastos/Promo-Gamer-API",
      url: "https://github.com/gbbastos/Promo-Gamer-API",
      stack: ["Python", "FastAPI", "MongoDB", "Playwright", "APScheduler"],
      summary: {
        pt: "API REST que agrega jogos grátis e promoções de Epic, Steam e GOG usando APIs públicas.",
        en: "REST API aggregating free games and deals from Epic, Steam and GOG via public APIs.",
      },
      bullets: {
        pt: [
          "Persiste resultados no MongoDB com upsert; auto-refresh a cada 6h via scheduler.",
          "Endpoints filtráveis por plataforma, tipo de promoção e desconto, com paginação.",
        ],
        en: [
          "Persists results to MongoDB with upsert logic; auto-refresh every 6h via scheduler.",
          "Filtered endpoints by platform, deal type and discount, with pagination.",
        ],
      },
    },
    {
      name: "PriceWatch API",
      repo: "github.com/gbbastos/pricewatch-api",
      url: "https://github.com/gbbastos/pricewatch-api",
      stack: ["C#", "ASP.NET Core", "MongoDB", "Playwright"],
      summary: {
        pt: "API REST que monitora produtos do Mercado Livre e alerta quando preço cai ao alvo.",
        en: "REST API that monitors Mercado Livre products and alerts when price drops to target.",
      },
      bullets: {
        pt: [
          "Scraper Playwright roda automaticamente a cada 6h via .NET BackgroundService.",
          "Histórico completo no MongoDB com filtro de alertas e checagem manual on-demand.",
        ],
        en: [
          "Playwright scraper runs every 6h via .NET BackgroundService.",
          "Full history in MongoDB with alert filtering and on-demand manual check endpoint.",
        ],
      },
    },
  ],

  skills: {
    languages: ["Python", "C#"],
    frameworks: [".NET", "ASP.NET Core", "FastAPI", "Selenium", "Playwright"],
    scraping: ["Selenium WebDriver", "Playwright", "HTTP integrations", "Headless browsing", "Workflow design"],
    databases: ["MongoDB", "SQL"],
    infra: ["Windows Server", "Linux", "Git", "GitHub", "Oracle Cloud"],
    familiar: ["RabbitMQ", "REST API design", "HTML", "CSS"],
    practices: ["Agile/Scrum", "SOLID", "Production support", "CI/CD concepts"],
  },

  education: [
    {
      title: { pt: "Bacharelado em Ciências Matemáticas e da Terra", en: "B.Sc. in Mathematical and Earth Sciences" },
      school: { pt: "Universidade Federal do Rio de Janeiro (UFRJ)", en: "Federal University of Rio de Janeiro (UFRJ)" },
      period: { pt: "2021 — Presente", en: "2021 — Present" },
    },
    {
      title: { pt: "Lógica de Programação em Python", en: "Programming Logic in Python" },
      school: { pt: "Universidade Federal do Rio de Janeiro (UFRJ)", en: "Federal University of Rio de Janeiro (UFRJ)" },
      period: { pt: "2019", en: "2019" },
    },
  ],

  languagesSpoken: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" }, pct: 100 },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "Profissional", en: "Professional" }, pct: 80 },
  ],

  gh: {
    public_repos: 5,
    followers: 0,
    following: 0,
    stars: 0,
    contributions_last_year: 28,
    top_languages: [
      { name: "Python",     pct: 40, color: "#3572A5" },
      { name: "C#",         pct: 40, color: "#178600" },
      { name: "TypeScript", pct: 12, color: "#3178c6" },
      { name: "JavaScript", pct: 8,  color: "#f1e05a" },
    ],
    streak_weeks: 1,
  },
};
