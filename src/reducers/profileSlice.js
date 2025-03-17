import { createSlice, nanoid } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    gender: "",
    weight: [{ id: 0, weight: 0, date: "" }],
    height: 0,
    age: 0,
    activityLevel: 1.2,
    goal: 0,
    tdee: 0,
    birthDate: "åååå-mm-dd",
  },
  reducers: {
    addWeight: (state, action) => {
      const newWeight = {
        id: nanoid(),
        weight: action.payload.weight,
        date: action.payload.date,
      };
      state.weight.push(newWeight);
    },
    displayWeight: (state, action) => {
      state.weight = action.payload;
    },
    editWeight: (state, action) => {
      const { id, weight, date } = action.payload;
      const weightIndex = state.weight.findIndex((weight) => weight.id === id);
      if (weightIndex !== -1) {
        state.weight[weightIndex] = { id, weight, date };
      }
    },
    removeWeight: (state, action) => {
      state.weight = state.weight.filter(weight => weight.id !== action.payload.id)
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setActivityLevel: (state, action) => {
      state.activityLevel = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = parseFloat(action.payload);
    },
    setTDEE: (state, action) => {
      state.tdee = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
  },
});

// Exportera reducer och actions
export const {
  addWeight,
  displayWeight,
  editWeight,
  removeWeight,
  setGender,
  setWeight,
  setHeight,
  setAge,
  setActivityLevel,
  setGoal,
  setTDEE,
  setBirthDate,
} = profileSlice.actions;

export const selectTDEE = (state) => state.profile.tdee;

export default profileSlice.reducer;

