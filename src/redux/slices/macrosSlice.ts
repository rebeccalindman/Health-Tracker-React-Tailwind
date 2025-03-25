// src/redux/slices/macrosSlice.ts

import { Macros } from "@/types/macros";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MacrosState {
    dailyCalories: number | null;
    protein: number | null;
    carbohydrate: number | null;
    fat: number | null;
    proteinPercentage: number | null;
    carbohydratePercentage: number | null;
    fatPercentage: number | null;
}

const initialState: Macros = { /* Default values based on an average 2000 calorie diet */
    dailyCalories: 2000,
    proteinPercentage: 15,
    carbohydratePercentage: 55,
    fatPercentage: 30,

    protein: null,
    carbohydrate: null,
    fat: null,
};

const mealSlice = createSlice({
    name: "macros",
    initialState,
    reducers: {
        setMacros: (state, action: PayloadAction<Macros>) => {
            state.dailyCalories = action.payload.dailyCalories;
            state.protein = action.payload.protein;
            state.carbohydrate = action.payload.carbohydrate;
            state.fat = action.payload.fat;
            state.proteinPercentage = action.payload.proteinPercentage;
            state.carbohydratePercentage = action.payload.carbohydratePercentage;
            state.fatPercentage = action.payload.fatPercentage;
        },
    },
});

export const { setMacros } = mealSlice.actions;
export default mealSlice.reducer;