// src/types.ts

export interface Evaluation {
  overallScore: number;
  remark: string;
  date: string;
  criteriaA: number;
  criteriaB: number;
  criteriaC: number;
  criteriaAStrengths: string[];
  criteriaBStrengths: string[];
  criteriaCStrengths: string[];
  criteriaAImprovements: string[];
  criteriaBImprovements: string[];
  criteriaCImprovements: string[];
}
