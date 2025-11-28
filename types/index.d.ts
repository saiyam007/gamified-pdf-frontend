export type RagAnswer = {
  answer: string;
  bullet_points?: string[];
  sources?: {content:string,page:number}[];
};
export type McqItem = {
  question: string;
  options: {label:string,text:string}[];
  correct_label: string;
  explanation?: string;
};
