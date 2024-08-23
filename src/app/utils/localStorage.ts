// src/utils/localStorage.ts

export const storeEvaluationResults = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrieveEvaluationResults = (key: string): any | null => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
