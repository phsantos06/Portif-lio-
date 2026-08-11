import type { ProjectCode } from "./types";
import { taskManagerCode } from "./task-manager";
import { dataDashboardCode } from "./data-dashboard";
import { apiRestCode } from "./api-rest-cadastro";
import { calculadoraCode } from "./calculadora-financeira";
import { portfolioCode } from "./portfolio-responsivo";
import { sistemaEstoqueCode } from "./sistema-estoque";

export type { CodeFile, ProjectCode } from "./types";

export const projectCodes: ProjectCode[] = [
  taskManagerCode,
  dataDashboardCode,
  apiRestCode,
  calculadoraCode,
  portfolioCode,
  sistemaEstoqueCode,
];

export function getProjectCode(slug: string): ProjectCode | undefined {
  return projectCodes.find((p) => p.slug === slug);
}