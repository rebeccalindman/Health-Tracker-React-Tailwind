import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setTDEE } from "../../redux/slices/profileSlice";
import { addWeight } from "../../redux/slices/weightSlice"; // ✅ Import weight actions
import Form from "../../components/Form/Form";
import { InputFieldProps } from "../../components/Form/InputField";
import { calculateTDEE } from "../../utils/tdeeCalculator";
import { Profile } from "../../types/profile";
import { RootState } from "../../redux/store";

const ProfileForm = () => {
  const dispatch = useDispatch();

  // ✅ Get latest weight from Redux weight history if available
  const weightHistory = useSelector((state: RootState) => state.weight.weightHistory);
  const latestWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : 70; // Default weight if none found

  const [formData, setFormData] = useState<Profile>({
    gender: "male",
    weight: latestWeight, // ✅ Store latest weight as a number
    height: 170,
    age: 25,
    activityLevel: "sedentary",
    goal: "maintain",
    birthDate: new Date().toISOString().split("T")[0],
  });

  const [previewTDEE, setPreviewTDEE] = useState<number | null>(null);

  const activityLevelOptions = [
    { value: "sedentary", label: "Sedentary (Little to no exercise)" },
    { value: "light", label: "Lightly active (1-3 days/week)" },
    { value: "moderate", label: "Moderately active (3-5 days/week)" },
    { value: "very_active", label: "Very active (6-7 days/week)" },
    { value: "extra_active", label: "Super active (hard exercise/sports & physical job)" },
  ];

  const goalOptions = [
    { value: "lose", label: "Lose Weight" },
    { value: "maintain", label: "Maintain Weight" },
    { value: "gain", label: "Gain Weight" },
  ];

  const profileFields: InputFieldProps[] = [
    { label: "Gender", name: "gender", type: "select", required: true, options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] },
    { label: "Weight", name: "weight", type: "number", required: true, unit: "kg" },
    { label: "Height", name: "height", type: "number", required: true, unit: "cm" },
    { label: "Age", name: "age", type: "number", required: true, unit: "years" },
    { label: "Activity Level", name: "activityLevel", type: "select", required: true, options: activityLevelOptions },
    { label: "Goal", name: "goal", type: "select", required: true, options: goalOptions },
    { label: "Birth Date", name: "birthDate", type: "date", required: true },
  ];

  useEffect(() => {
    const { gender, weight, height, age, activityLevel, goal } = formData;
    
    if (!weight || !height || !age || !activityLevel || !goal) {
      setPreviewTDEE(null);
      return;
    }

    const calculatedTDEE = calculateTDEE(gender, weight, height, age, activityLevel, goal);
    setPreviewTDEE(calculatedTDEE);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "weight" ? parseFloat(value) || 0 : value, // ✅ Convert weight to number
    }));
  };

  const handleSave = () => {
    if (previewTDEE !== null) {
      dispatch(setTDEE(previewTDEE));
    }
  
    // ✅ Dispatch latest weight separately to weight history slice
    dispatch(addWeight({
      id: Date.now(),
      weight: formData.weight,
      date: new Date().toISOString().split("T")[0],
    }));

    dispatch(setProfileData(formData));
  };

  return (
    <div className="card">
      <Form fields={profileFields} initialData={formData} onChange={handleChange} onSubmit={handleSave} />

      <div className="text-center font-bold">
        {previewTDEE !== null ? `Estimated Daily Intake: ${Math.round(previewTDEE)} kcal` : "Enter values to calculate TDEE"}
      </div>
    </div>
  );
};

export default ProfileForm;
