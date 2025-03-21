import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfileState = {
  gender: "male" | "female";
  weight: number;
  height: number;
  age: number | null;
  activityLevel: string;
  goal: string;
  birthDate?: string;
  tdee: number | null;
};


const initialState: ProfileState = {
  gender: "male",
  weight: 0,
  height: 0,
  age: null,
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
