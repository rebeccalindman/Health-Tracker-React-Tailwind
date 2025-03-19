export const calculateTDEE = (
    gender: string,
    weight: number,  // ✅ Expect single number
    height: number,
    age: number,
    activityLevel: string,
    goal: string
  ): number | null => {
    if (!gender || !weight || !height || !age || !activityLevel || !goal) {
      return null;
    }
  
    const activityLevels: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };
  
    const goalAdjustments: { [key: string]: number } = {
      lose: -500,
      maintain: 0,
      gain: 500,
    };
  
    const activityFactor = activityLevels[activityLevel] ?? 1.2;
    const goalAdjustment = goalAdjustments[goal] ?? 0;
  
    let bmr: number;
    if (gender === "male") {
      bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
    } else if (gender === "female") {
      bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    } else {
      return null;
    }
  
    return Math.round(bmr * activityFactor + goalAdjustment);
  };
  