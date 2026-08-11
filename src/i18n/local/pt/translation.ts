export default {
  // Navbar
  nav: {
    home: "Início",
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    education: "Educação",
    contact: "Contato",
    hire: "Contratar",
  },

  // Hero
  hero: {
    title: "Desenvolvedor de Software em Formação",
    bio: "Olá! Me chamo Paulo e sou um jovem estudante de Engenharia de Software, focado em tecnologia, aprendizado contínuo e criação de soluções eficientes.",
    btnProjects: "Ver Projetos",
    btnContact: "Entrar em Contato",
    scroll: "Scroll",
  },

  // About
  about: {
    label: "Quem Sou Eu",
    title: "Estudante de Engenharia de Software",
    subtitle: "Apaixonado por Tecnologia",
    bioExtra: "Estou sempre em busca de novos desafios que me permitam crescer como profissional e contribuir com soluções inovadoras.",
    stats: {
      years: "Anos de Estudo",
      projects: "Projetos",
      techs: "Tecnologias",
      languages: "Idiomas",
    },
    softSkillsTitle: "Habilidades Pessoais",
    languagesTitle: "Idiomas",
  },

  // Skills
  skills: {
    label: "Habilidades",
    title: "Tecnologias que Domino",
    subtitle: "Conhecimentos adquiridos através de cursos, projetos pessoais e formação acadêmica. Sempre aprendendo e evoluindo.",
    categories: {
      Frontend: "Frontend",
      Backend: "Backend",
      Tools: "Ferramentas",
    },
  },

  // Projects
  projects: {
    label: "Portfólio",
    title: "Meus Projetos",
    subtitle: "Projetos desenvolvidos durante minha trajetória de aprendizado. Cada um representa um desafio superado e novas habilidades adquiridas.",
    btnDemo: "Ver Demo",
    btnCode: "Código",
    btnDetails: "Ver Detalhes",
    categories: {
      all: "Todos",
      web: "Web",
      data: "Dados",
      backend: "Backend",
      desktop: "Desktop",
      fullstack: "Full Stack",
    },
    items: {
      "task-manager": {
        title: "Sistema de Gestão de Tarefas",
        description: "Aplicação web para organização de tarefas pessoais e profissionais, com cadastro, edição e exclusão de tarefas. Interface responsiva e intuitiva.",
        longDescription: "Um sistema completo de gerenciamento de tarefas desenvolvido com HTML, CSS e JavaScript puro. O projeto implementa CRUD completo (criar, ler, atualizar e deletar), persistência de dados via Local Storage, filtros por status e prioridade, e uma interface moderna e responsiva que se adapta a qualquer dispositivo. Ideal para quem busca organização no dia a dia, seja para tarefas pessoais ou projetos em equipe.",
        features: [
          "CRUD completo de tarefas com validação de campos",
          "Filtros por status (pendente, em andamento, concluída)",
          "Sistema de prioridades (baixa, média, alta)",
          "Persistência de dados via Local Storage",
          "Design responsivo adaptado para mobile, tablet e desktop",
          "Animações suaves nas transições de estado",
          "Tema escuro para conforto visual",
        ],
      },
      "data-dashboard": {
        title: "Dashboard de Análise de Dados",
        description: "Dashboard interativo para visualização de dados com gráficos e estatísticas. Desenvolvido com Python para processamento de dados e interface web.",
        longDescription: "Um dashboard de análise de dados que transforma dados brutos em insights visuais. Construído com Python no backend para processamento e análise de dados, combinado com JavaScript e HTML/CSS no frontend para visualizações interativas. O projeto inclui gráficos dinâmicos (barras, linhas, pizza), tabelas filtráveis, exportação de relatórios e um painel de métricas em tempo real.",
        features: [
          "Gráficos interativos com Chart.js (barras, linhas, pizza, radar)",
          "Processamento de dados com Python e Pandas",
          "Filtros dinâmicos por período, categoria e região",
          "Exportação de relatórios em CSV e PDF",
          "Painel de KPIs com indicadores visuais",
          "Tabelas com ordenação e paginação",
          "Design responsivo e tema escuro",
        ],
      },
      "api-rest-cadastro": {
        title: "API REST de Cadastro",
        description: "API RESTful para cadastro e autenticação de usuários. Implementação de endpoints CRUD com validação de dados e conexão com banco de dados SQL.",
        longDescription: "Uma API RESTful robusta construída com Python e Flask, implementando um sistema completo de cadastro e autenticação de usuários. A API oferece endpoints para registro, login, recuperação de senha, atualização de perfil e exclusão de conta. Utiliza JWT para autenticação, validação de dados com Pydantic, e conexão com banco de dados SQL. A documentação interativa é gerada automaticamente com Swagger/OpenAPI.",
        features: [
          "Endpoints RESTful para CRUD de usuários",
          "Autenticação com JWT (JSON Web Tokens)",
          "Validação de dados com schemas Pydantic",
          "Hash de senhas com bcrypt",
          "Conexão com banco de dados SQL (SQLite/PostgreSQL)",
          "Documentação Swagger/OpenAPI integrada",
          "Testes unitários com Pytest",
          "Tratamento de erros com respostas padronizadas",
        ],
      },
      "calculadora-financeira": {
        title: "Calculadora Financeira",
        description: "Aplicação desktop e web para cálculos financeiros como juros compostos, amortização e simulação de investimentos. Desenvolvida com C# e interface moderna.",
        longDescription: "Uma calculadora financeira completa que reúne as principais ferramentas de cálculo do mercado financeiro em uma única aplicação. Desenvolvida com C# e Windows Forms para desktop, com uma versão web em HTML/CSS/JavaScript. Inclui módulos para juros compostos, amortização (SAC e Price), simulação de investimentos com projeção de rentabilidade, conversão de taxas de juros e cálculo de valor presente/futuro.",
        features: [
          "Cálculo de juros compostos com simulação de aportes mensais",
          "Tabela de amortização SAC e Price com gráficos",
          "Simulador de investimentos com projeção ano a ano",
          "Conversão entre taxas de juros (anual, mensal, diária)",
          "Cálculo de valor presente líquido (VPL) e TIR",
          "Exportação de resultados em PDF",
          "Histórico de cálculos salvos",
        ],
      },
      "portfolio-responsivo": {
        title: "Portfólio Responsivo",
        description: "Site de portfólio pessoal totalmente responsivo, com design moderno, animações suaves e otimização para SEO. Desenvolvido com React e Tailwind CSS.",
        longDescription: "Meu portfólio pessoal — este site que você está visitando! Construído com React 19 e Tailwind CSS, este projeto é a prova viva das minhas habilidades em desenvolvimento frontend moderno. Inclui modo escuro, internacionalização (PT/EN), animações de entrada com Intersection Observer, formulário de contato funcional, partículas animadas no fundo, e otimização completa para SEO com meta tags, Open Graph e dados estruturados.",
        features: [
          "Design responsivo adaptado para todos os dispositivos",
          "Sistema de temas com modo escuro",
          "Internacionalização (Português e Inglês)",
          "Animações de entrada usando Intersection Observer",
          "Efeitos visuais com partículas e orbs animados",
          "Formulário de contato funcional com validação",
          "SEO otimizado com meta tags e dados estruturados",
          "Performance otimizada com lazy loading",
        ],
      },
      "sistema-estoque": {
        title: "Sistema de Gerenciamento de Estoque",
        description: "Sistema para controle de estoque com cadastro de produtos, relatórios de entrada e saída, e alertas de reposição. Utiliza SQL para persistência de dados.",
        longDescription: "Um sistema completo de gerenciamento de estoque desenvolvido com C# no backend e interface web moderna. Permite o cadastro e controle de produtos, fornecedores, entradas e saídas de mercadorias, com geração automática de relatórios e alertas de estoque baixo. O sistema utiliza SQL Server para persistência confiável dos dados e inclui dashboard com indicadores visuais de performance do estoque.",
        features: [
          "Cadastro completo de produtos com categorias e fornecedores",
          "Controle de entradas e saídas com histórico completo",
          "Alertas automáticos de estoque mínimo",
          "Dashboard com gráficos de giro de estoque",
          "Relatórios em PDF de inventário e movimentações",
          "Busca rápida por código, nome ou fornecedor",
          "Sistema de permissões por nível de usuário",
          "Backup automático do banco de dados",
        ],
      },
    },
  },

  // Project Detail
  project: {
    notFound: "Projeto não encontrado",
    back: "Voltar ao Início",
    backToProjects: "← Voltar aos Projetos",
    liveDemo: "Ver Demo Ao Vivo",
    sourceCode: "Código Fonte",
    features: "Funcionalidades",
    techStack: "Tecnologias Utilizadas",
    gallery: "Galeria",
    interested: "Gostou deste projeto?",
    interestedDesc: "Estou disponível para desenvolver soluções sob medida para o seu negócio. Entre em contato e vamos conversar!",
    viewOnGithub: "Ver no GitHub",
    hireMe: "Me Contrate",
  },

  // Code Viewer
  code: {
    title: "Código Fonte",
    lines: "linhas",
    copy: "Copiar",
    copied: "Copiado!",
    files: "arquivo",
    filesPlural: "arquivos",
    language: "Linguagem",
  },

  // Education
  education: {
    label: "Trajetória",
    title: "Educação e Cursos",
    subtitle: "Minha jornada acadêmica e cursos complementares que moldaram minha base de conhecimento em tecnologia.",
    academicTitle: "Formação Acadêmica",
    coursesTitle: "Cursos e Certificações",
    continuousTitle: "Aprendizado Contínuo",
    status: {
      completed: "Concluído",
      ongoing: "Cursando",
      inProgress: "Em andamento",
      starting: "Iniciando",
    },
    items: {
      "0": {
        degree: "Ensino Médio + Técnico em Informática",
        institution: "Complexo Integrado de Educação Básica Profissional e Tecnológica de Ipiaú",
        description: "Curso Técnico em Informática Básica e Avançada, com formação em hardware, software, redes e programação.",
        period: "Conclusão: 2024",
      },
      "1": {
        degree: "Engenharia de Software",
        institution: "Universidade Estácio de Sá",
        description: "Graduação em Engenharia de Software, com foco em desenvolvimento de sistemas, arquitetura de software e metodologias ágeis.",
        period: "Previsão de Conclusão: 2030",
      },
    },
    courses: [
      "Programação em Python",
      "Desenvolvimento Web com HTML e CSS",
      "Banco de Dados e SQL",
      "Lógica de Programação",
      "Informática Avançada",
      "Git e GitHub",
      "JavaScript Moderno",
      "React.js Fundamentos",
      "TypeScript Essencial",
      "Tailwind CSS do Zero",
      "Node.js para Iniciantes",
      "Figma para Desenvolvedores",
    ],
    continuous: {
      react: "React.js Avançado",
      typescript: "TypeScript",
      nodejs: "Node.js",
      nextjs: "Next.js",
      docker: "Docker & Containers",
      aws: "AWS / Cloud Computing",
      graphql: "GraphQL",
      testing: "Testes Automatizados (Jest)",
      reactNative: "React Native",
      english: "Inglês Técnico",
    },
  },

  // Personal
  personal: {
    bio: "Olá! Me chamo Paulo e sou um jovem estudante de Engenharia de Software, focado em tecnologia, aprendizado contínuo e criação de soluções eficientes.",
    bioExtra: "Estou sempre em busca de novos desafios que me permitam crescer como profissional e contribuir com soluções inovadoras.",
    objective: "Busco oportunidades nas áreas de Tecnologia da Informação e Administrativa, onde possa desenvolver minhas habilidades, adquirir experiência prática e contribuir com organização, eficiência e soluções digitais. Tenho interesse em crescimento profissional e atuação em trabalho remoto (home office), com responsabilidade, disciplina e foco em resultados.",
    location: "Ipiaú, Bahia, Brasil",
    personalSkills: [
      "Responsabilidade e comprometimento",
      "Facilidade em aprender novas funções",
      "Boa comunicação",
      "Trabalho em equipe",
      "Organização e atenção aos detalhes",
      "Cumprimento de prazos",
      "Proatividade",
      "Agilidade com computador",
    ],
    languageLevels: {
      native: "Nativo",
      basic: "Básico",
      intermediate: "Intermediário",
      advanced: "Avançado",
    },
    languages: {
      portuguese: "Português",
      english: "Inglês",
      spanish: "Espanhol",
    },
  },

  // Contact
  contact: {
    label: "Contato",
    title: "Vamos Trabalhar Juntos?",
    subtitle: "Estou disponível para oportunidades de freelance, estágios e projetos. Entre em contato e vamos conversar sobre como posso ajudar.",
    infoTitle: "Informações de Contato",
    emailLabel: "E-mail",
    whatsappLabel: "WhatsApp",
    whatsappValue: "Enviar mensagem",
    linkedinLabel: "LinkedIn",
    linkedinValue: "Paulo Henrique",
    locationLabel: "Localização",
    formTitle: "Envie uma Mensagem",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome completo",
    emailInputLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    subjectLabel: "Assunto",
    subjectPlaceholder: "Assunto da mensagem",
    messageLabel: "Mensagem",
    messagePlaceholder: "Descreva sua proposta ou dúvida...",
    maxChars: "Máximo 500 caracteres",
    submit: "Enviar Mensagem",
    submitting: "Enviando...",
    success: "Mensagem enviada com sucesso! Responderei em breve.",
    error: "Erro ao enviar mensagem. Tente novamente.",
    connectionError: "Erro de conexão. Verifique sua internet e tente novamente.",
  },

  // Footer
  footer: {
    role: "Desenvolvedor de Software em Formação",
    copyright: "© {{year}} Paulo Henrique. Todos os direitos reservados.",
  },

  // NotFound
  notFound: {
    title: "Esta página ainda não foi criada",
    subtitle: "Me conte mais sobre esta página para que eu possa gerá-la",
  },

  // Language toggle
  lang: {
    pt: "PT",
    en: "EN",
    es: "ES",
    fr: "FR",
    de: "DE",
  },
};