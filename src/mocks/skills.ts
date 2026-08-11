export interface LangItem {
  nameKey: string;
  levelKey: string;
}

export const skills = [
  { name: "HTML5", level: 90, icon: "ri-html5-line", category: "Frontend" },
  { name: "CSS3", level: 85, icon: "ri-css3-line", category: "Frontend" },
  { name: "JavaScript", level: 80, icon: "ri-javascript-line", category: "Frontend" },
  { name: "React", level: 75, icon: "ri-reactjs-line", category: "Frontend" },
  { name: "TypeScript", level: 70, icon: "ri-code-s-slash-line", category: "Frontend" },
  { name: "Tailwind CSS", level: 80, icon: "ri-windy-line", category: "Frontend" },
  { name: "Python", level: 85, icon: "ri-code-s-line", category: "Backend" },
  { name: "SQL", level: 75, icon: "ri-database-2-line", category: "Backend" },
  { name: "C++", level: 75, icon: "ri-terminal-line", category: "Backend" },
  { name: "C#", level: 75, icon: "ri-code-box-line", category: "Backend" },
  { name: "Node.js", level: 65, icon: "ri-server-line", category: "Backend" },
  { name: "Express.js", level: 60, icon: "ri-route-line", category: "Backend" },
  { name: "Git & GitHub", level: 85, icon: "ri-github-line", category: "Tools" },
  { name: "Desenvolvimento Web", level: 85, icon: "ri-global-line", category: "Tools" },
  { name: "VS Code", level: 90, icon: "ri-terminal-box-line", category: "Tools" },
  { name: "Linux", level: 70, icon: "ri-ubuntu-line", category: "Tools" },
  { name: "Figma", level: 65, icon: "ri-pencil-ruler-2-line", category: "Tools" },
];

export const personalSkillsCount = 8;

export const languages: LangItem[] = [
  { nameKey: "portuguese", levelKey: "native" },
  { nameKey: "english", levelKey: "basic" },
  { nameKey: "spanish", levelKey: "basic" },
];