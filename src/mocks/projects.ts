export interface Project {
  id: number;
  slug: string;
  techs: string[];
  image: string;
  images: string[];
  demoLink: string;
  repoLink: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "task-manager",
    techs: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    image:
      "https://readdy.ai/api/search-image?query=Modern%20task%20management%20dashboard%20web%20application%20UI%20design%2C%20dark%20theme%2C%20minimalist%20interface%20with%20task%20cards%20and%20progress%20bars%2C%20clean%20layout%20with%20sidebar%20navigation%2C%20professional%20software%20design%20screenshot&width=800&height=500&seq=proj-1&orientation=landscape",
    images: [
      "https://readdy.ai/api/search-image?query=Task%20management%20app%20dashboard%20with%20kanban%20board%20layout%2C%20dark%20theme%2C%20colorful%20task%20cards%20in%20columns%2C%20minimalist%20professional%20UI%20design&width=800&height=500&seq=proj-1a&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Task%20creation%20form%20modal%20web%20interface%2C%20dark%20theme%2C%20input%20fields%20with%20labels%2C%20dropdown%20selectors%2C%20modern%20UI%20design&width=800&height=500&seq=proj-1b&orientation=landscape",
    ],
    demoLink: "/demo/task-manager",
    repoLink: "https://github.com/phsantos06/task-manager",
    category: "web",
  },
  {
    id: 2,
    slug: "data-dashboard",
    techs: ["Python", "JavaScript", "HTML5", "CSS3", "Chart.js"],
    image:
      "https://readdy.ai/api/search-image?query=Data%20analytics%20dashboard%20web%20interface%2C%20dark%20theme%20with%20colorful%20charts%20and%20graphs%2C%20modern%20minimalist%20design%2C%20statistics%20panels%20and%20data%20visualization%2C%20professional%20software%20UI&width=800&height=500&seq=proj-2&orientation=landscape",
    images: [
      "https://readdy.ai/api/search-image?query=Interactive%20line%20and%20bar%20charts%20on%20dark%20dashboard%2C%20colorful%20data%20visualization%2C%20analytics%20panels%2C%20modern%20BI%20tool%20interface&width=800&height=500&seq=proj-2a&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Data%20table%20with%20filters%20and%20sorting%20on%20dark%20theme%2C%20export%20buttons%2C%20pagination%2C%20web%20application%20UI&width=800&height=500&seq=proj-2b&orientation=landscape",
    ],
    demoLink: "/demo/data-dashboard",
    repoLink: "https://github.com/phsantos06/data-dashboard",
    category: "data",
  },
  {
    id: 3,
    slug: "api-rest-cadastro",
    techs: ["Python", "Flask", "SQL", "JWT", "Pydantic"],
    image:
      "https://readdy.ai/api/search-image?query=API%20development%20code%20interface%20with%20terminal%20and%20code%20editor%2C%20dark%20theme%20IDE%20with%20REST%20API%20endpoints%20and%20JSON%20responses%2C%20modern%20developer%20workspace%20with%20code%20syntax%20highlighting&width=800&height=500&seq=proj-3&orientation=landscape",
    images: [
      "https://readdy.ai/api/search-image?query=Swagger%20API%20documentation%20page%20with%20endpoints%20listed%2C%20dark%20theme%2C%20REST%20API%20docs%2C%20try%20it%20out%20buttons&width=800&height=500&seq=proj-3a&orientation=landscape",
      "https://readdy.ai/api/search-image?query=VS%20Code%20editor%20with%20Python%20code%20and%20terminal%20showing%20API%20test%20results%2C%20dark%20theme%2C%20JSON%20responses&width=800&height=500&seq=proj-3b&orientation=landscape",
    ],
    demoLink: "/demo/api-rest-cadastro",
    repoLink: "https://github.com/phsantos06/api-rest-cadastro",
    category: "backend",
  },
  {
    id: 4,
    slug: "calculadora-financeira",
    techs: ["C#", ".NET", "HTML5", "CSS3", "JavaScript"],
    image:
      "https://readdy.ai/api/search-image?query=Financial%20calculator%20web%20application%20interface%2C%20dark%20theme%20with%20input%20fields%20and%20result%20panels%2C%20modern%20minimalist%20design%20with%20green%20accent%20colors%2C%20professional%20fintech%20software%20UI%20screenshot&width=800&height=500&seq=proj-4&orientation=landscape",
    images: [
      "https://readdy.ai/api/search-image?query=Investment%20simulation%20chart%20with%20projected%20growth%20graph%2C%20dark%20theme%2C%20financial%20dashboard%2C%20compound%20interest%20calculator&width=800&height=500&seq=proj-4a&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Loan%20amortization%20table%20with%20monthly%20breakdown%2C%20dark%20theme%2C%20SAC%20and%20Price%20methods%2C%20financial%20app%20UI&width=800&height=500&seq=proj-4b&orientation=landscape",
    ],
    demoLink: "/demo/calculadora-financeira",
    repoLink: "https://github.com/phsantos06/calculadora-financeira",
    category: "desktop",
  },
  {
    id: 5,
    slug: "portfolio-responsivo",
    techs: ["React", "TypeScript", "Tailwind CSS", "i18next", "Vite"],
    image:
      "https://readdy.ai/api/search-image?query=Modern%20personal%20portfolio%20website%20design%2C%20dark%20theme%20with%20elegant%20typography%20and%20hero%20section%2C%20minimalist%20web%20design%20with%20smooth%20gradients%2C%20professional%20developer%20portfolio%20screenshot%20on%20multiple%20devices&width=800&height=500&seq=proj-5&orientation=landscape",
    images: [
      "https://readdy.ai/api/search-image?query=Developer%20portfolio%20hero%20section%20with%20animated%20background%2C%20dark%20theme%2C%20profile%20photo%2C%20social%20links%2C%20modern%20web%20design&width=800&height=500&seq=proj-5a&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Portfolio%20projects%20grid%20section%20with%20cards%2C%20dark%20theme%2C%20hover%20effects%2C%20tech%20tags%2C%20modern%20UI&width=800&height=500&seq=proj-5b&orientation=landscape",
    ],
    demoLink: "/demo/portfolio-responsivo",
    repoLink: "https://github.com/phsantos06/phsantos06.github.io",
    category: "web",
  },
  {
    id: 6,
    slug: "sistema-estoque",
    techs: ["C#", "SQL Server", "HTML5", "CSS3", "JavaScript"],
    image:
      "https://readdy.ai/api/search-image?query=Inventory%20management%20system%20web%20interface%2C%20dark%20theme%20with%20product%20table%20and%20statistics%20cards%2C%20modern%20minimalist%20design%2C%20professional%20warehouse%20software%20dashboard%20UI&width=800&height=500&seq=proj-6&orientation=landscape",
    images: [
      "https://readdy.ai/api/search-image?query=Product%20registration%20form%20with%20fields%20and%20image%20upload%2C%20dark%20theme%2C%20inventory%20management%20UI%2C%20modern%20web%20app&width=800&height=500&seq=proj-6a&orientation=landscape",
      "https://readdy.ai/api/search-image?query=Stock%20dashboard%20with%20charts%20and%20low%20stock%20alerts%2C%20dark%20theme%2C%20inventory%20KPIs%2C%20warehouse%20management%20software&width=800&height=500&seq=proj-6b&orientation=landscape",
    ],
    demoLink: "/demo/sistema-estoque",
    repoLink: "https://github.com/phsantos06/sistema-estoque",
    category: "fullstack",
  },
];