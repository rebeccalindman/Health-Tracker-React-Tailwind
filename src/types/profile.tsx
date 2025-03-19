export type Profile = {
    gender: "male" | "female";
    weight: number; // ✅ Store latest weight as a single number
    height: number;
    age: number;
    activityLevel: string;
    goal: string;
    tdee?: number | null;
    birthDate: string;
  };
  