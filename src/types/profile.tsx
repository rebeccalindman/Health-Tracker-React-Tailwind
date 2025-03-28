// Original Redux profile state
export type Profile = {
  gender: "male" | "female" | "other";
  userName: string;
  weight: number | null;
  height: number |null ;
  age: number | null;
  activityLevel: string;
  goal: string;
  birthDate?: string;
  tdee: number | null;
};

// New type for just the form fields
export type ProfileFormData = Omit<Profile, "tdee">;