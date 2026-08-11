export interface EducationItem {
  id: number;
  status: "Completo" | "Cursando";
}

export const education: EducationItem[] = [
  { id: 1, status: "Completo" },
  { id: 2, status: "Cursando" },
];

export const courseCount = 12;

export interface ContinuousItem {
  nameKey: string;
  progress: number;
  statusKey: string;
}

export const continuousLearning: ContinuousItem[] = [
  { nameKey: "react", progress: 45, statusKey: "inProgress" },
  { nameKey: "typescript", progress: 55, statusKey: "inProgress" },
  { nameKey: "nodejs", progress: 35, statusKey: "inProgress" },
  { nameKey: "nextjs", progress: 25, statusKey: "inProgress" },
  { nameKey: "docker", progress: 15, statusKey: "inProgress" },
  { nameKey: "aws", progress: 10, statusKey: "starting" },
  { nameKey: "graphql", progress: 20, statusKey: "inProgress" },
  { nameKey: "testing", progress: 30, statusKey: "inProgress" },
  { nameKey: "reactNative", progress: 15, statusKey: "starting" },
  { nameKey: "english", progress: 40, statusKey: "inProgress" },
];