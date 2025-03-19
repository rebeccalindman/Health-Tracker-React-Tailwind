// src/storage/storage.js

export const loadState = () => {
  try {
    const mealLogs = JSON.parse(localStorage.getItem("mealLogs")) || [];
    const profile = JSON.parse(localStorage.getItem("profile")) || {
      gender: "male",
      weight: [/* { id: 1, weight: 0, date: "åååå-mm-dd" } */],
      height: 0,
      age: 0,
      activityLevel: 1.2,
      goal: 0,
      tdee: 0,
      birthDate: "",
    };

    return { meals: { mealLogs }, profile };
  } catch (err) {
    console.error("Error loading state:", err);
    return {
      meals: { mealLogs: [] },
      profile: {
        gender: "",
        weight: [{ id: 1, weight: 0, date: "åååå-mm-dd" }],
        height: 0,
        age: 0,
        activityLevel: 0,
        goal: 0,
        tdee: 0,
        birthDate: "",
      },
    };
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(
      "mealLogs",
      JSON.stringify(state.meals?.mealLogs || [])
    );
    localStorage.setItem("profile", JSON.stringify(state.profile));
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

// Ladda mealLogs från localStorage
export const loadMealLogs = () => {
  try {
    const mealLogs = JSON.parse(localStorage.getItem("mealLogs")) || [];
    return mealLogs;
  } catch (err) {
    console.error("Error loading mealLogs:", err);
    return [];
  }
};

// Spara mealLogs till localStorage
export const saveMealLogs = (mealLogs) => {
  try {
    localStorage.setItem("mealLogs", JSON.stringify(mealLogs));
  } catch (err) {
    console.error("Error saving mealLogs:", err);
  }
};

// Ladda profile från localStorage
export const loadProfile = () => {
  try {
    const profile = JSON.parse(localStorage.getItem("profile")) || {
      gender: "male",
      weight: [/* { id: 1, weight: 0, date: "åååå-mm-dd" } */],
      height: 0,
      age: 0,
      activityLevel: 1.2,
      goal: 0,
      tdee: 0,
      birthDate: "",
    };
    return profile;
  } catch (err) {
    console.error("Error loading profile:", err);
    return {
      gender: "",
      weight: [{ id: 1, weight: 0, date: "åååå-mm-dd" }],
      height: 0,
      age: 0,
      activityLevel: 0,
      goal: 0,
      tdee: 0,
      birthDate: "",
    };
  }
};

// Spara profile till localStorage
export const saveProfile = (profile) => {
  try {
    localStorage.setItem("profile", JSON.stringify(profile));
  } catch (err) {
    console.error("Error saving profile:", err);
  }
};
