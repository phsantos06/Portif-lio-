export interface CodeFile {
  name: string;
  language: string;
  content: string;
}

export interface ProjectCode {
  slug: string;
  title: string;
  files: CodeFile[];
}