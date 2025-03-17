import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealLogs: [],
};

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMeal: (state, action) => {
      state.mealLogs.push(action.payload);
    },
    updateMeal: (state, action) => {
      const index = state.mealLogs.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.mealLogs[index] = action.payload;
      }
    },
    getMealsByDate: (state, action) => {
      return state.mealLogs.filter(m => m.date === action.payload.date);
    }
  },
});

export const { addMeal, updateMeal, getMealsByDate } = mealSlice.actions;
export default mealSlice.reducer;

