import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import mealReducer from "./slices/mealSlice";
import weightReducer from "./slices/weightSlice";
import macrosReducer from "./slices/macrosSlice";

// Load from localStorage
import {
  loadMacros,
  loadMealLogs,
  loadProfile,
  loadWeightHistory,
  saveMacros,
  saveMealLogs,
  saveProfile,
  saveWeightHistory,
} from "../utils/storage"

const preloadedState = {
  meals: { mealLogs: loadMealLogs() },
  profile: loadProfile(),
  weight: { weightHistory: loadWeightHistory() },
  macros: loadMacros(), // ✅ add this
};

const store = configureStore({
  reducer: {
    profile: profileReducer,
    meals: mealReducer,
    weight: weightReducer,
    macros: macrosReducer,
  },
  preloadedState,
});

// Subscribe to changes and save to local storage
store.subscribe(() => {
  const state = store.getState()
  saveMealLogs(state.meals.mealLogs)
  saveProfile(state.profile)
  saveWeightHistory(state.weight.weightHistory)
  saveMacros(state.macros) 
})

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

