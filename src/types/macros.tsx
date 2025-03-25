//types/macros.tsx
export interface Macros {
    dailyCalories: number | null;
    protein: number | null;
    carbohydrate: number | null;
    fat: number | null;
    proteinPercentage: number | null;
    carbohydratePercentage: number | null;
    fatPercentage: number | null;
}

export type MacrosFormData = Macros;