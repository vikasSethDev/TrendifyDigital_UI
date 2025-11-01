
export interface IRowDTO {
  id: number;
  title: string;
  type: 'PDF' | 'VIDEO' | 'QUIZ' | 'EXERCISE' | string;
  link: string;
}

export interface IModuleDTO {
  moduleId: number;
  id: number;
  title: string;
  rows: IRowDTO[];
}