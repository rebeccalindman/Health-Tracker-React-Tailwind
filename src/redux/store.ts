import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import mealReducer from "./slices/mealSlice";
import { loadMealLogs, saveMealLogs, loadProfile, saveProfile } from "../utils/storage";

// Ladda data från localStorage
const preloadedState = {
  meals: { mealLogs: loadMealLogs() },
  profile: loadProfile(),
};

const store = configureStore({
  reducer: {
    profile: profileReducer,
    meals: mealReducer,
  },
  preloadedState,
});

// Spara till localStorage vid ändringar
store.subscribe(() => {
  const state = store.getState();
  saveMealLogs(state.meals.mealLogs);
  saveProfile(state.profile);
});

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
