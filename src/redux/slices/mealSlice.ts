import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../../types/meal";

interface MealState {
  mealLogs: Meal[];
}

const initialState: MealState = {
  mealLogs: [],
};

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.mealLogs.push(action.payload);
    },
    updateMeal: (state, action: PayloadAction<Meal>) => {
      const index = state.mealLogs.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.mealLogs[index] = action.payload;
      }
    },
    removeMeal: (state, action: PayloadAction<Pick<Meal, "id">>) => {
      state.mealLogs = state.mealLogs.filter(m => m.id !== action.payload.id);
    }
  },
});

export const { addMeal, updateMeal, removeMeal } = mealSlice.actions;
export default mealSlice.reducer;

