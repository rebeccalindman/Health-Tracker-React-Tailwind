// Original Redux profile state
export type Profile = {
  gender: "male" | "female";
  weight: number;
  height: number;
  age: number | null;
  activityLevel: string;
  goal: string;
  birthDate?: string;
  tdee: number | null;
};

// New type for just the form fields
export type ProfileFormData = Omit<Profile, "tdee">;