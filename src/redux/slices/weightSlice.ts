import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Weight } from "../../types/weight";

type WeightState = {
  weightHistory: Weight[];
};

const initialState: WeightState = {
  weightHistory: [], // Store multiple weights
};

const weightSlice = createSlice({
  name: "weight",
  initialState,
  reducers: {
    addWeight: (state, action: PayloadAction<Weight>) => {
      state.weightHistory.push(action.payload);
    },
    editWeight: (state, action: PayloadAction<Weight>) => {
      const index = state.weightHistory.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.weightHistory[index] = action.payload;
      }
    },
    removeWeight: (state, action: PayloadAction<{ id: number }>) => {
      state.weightHistory = state.weightHistory.filter((w) => w.id !== action.payload.id);
    },
  },
});

export const { addWeight, editWeight, removeWeight } = weightSlice.actions;
export default weightSlice.reducer;
