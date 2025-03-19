import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfileState = {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: string;
  goal: string;
  birthDate: string;
  tdee: number | null;
};


const initialState: ProfileState = {
  gender: "",
  weight: 0,
  height: 0,
  age: 0,
  activityLevel: "",
  goal: "",
  birthDate: "",
  tdee: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    setTDEE: (state, action: PayloadAction<number>) => {
      state.tdee = action.payload;
    },
  },
});

export const { setProfileData, setTDEE } = profileSlice.actions;
export default profileSlice.reducer;
