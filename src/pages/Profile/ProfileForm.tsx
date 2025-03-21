import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData, setTDEE } from "../../redux/slices/profileSlice";
import { addWeight } from "../../redux/slices/weightSlice";
import Form from "../../components/Form/Form";
import { InputFieldProps } from "../../components/Form/InputField";
import { calculateTDEE } from "../../utils/tdeeCalculator";
import { ProfileFormData } from "../../types/profile";
import { RootState } from "../../redux/store";
import { calculateAge } from "../../utils/dateUtils"; // ✅ Import the utility function

const ProfileForm = () => {
  const dispatch = useDispatch();

  // Get profile from Redux
  const {
    gender,
    weight,
    height,
    age,
    activityLevel,
    goal,
    birthDate,
  } = useSelector((state: RootState) => state.profile); // ✅ Destructure directly

  // Initialize form data (no tdee)
  const [formData, setFormData] = useState<ProfileFormData>({
    gender,
    weight,
    height,
    age,
    activityLevel,
    goal,
    birthDate,
  });

  const [previewTDEE, setPreviewTDEE] = useState<number | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    { label: "Age", 
      name: "age", 
      type: "number", 
      required: formData.birthDate ? false : true, 
      unit: "years", 
      disabled: !!formData.birthDate // Disable if birthDate is set
    },
    { label: "Activity Level", name: "activityLevel", type: "select", required: true, options: activityLevelOptions },
    { label: "Goal", name: "goal", type: "select", required: true, options: goalOptions },
    { label: "Birth Date", name: "birthDate", type: "date", required: false }, // Optional
  ];

  // Array of objects passed to form which passes it to FieldGroup component
  const profileFieldGroups = [
    {
      label: "Personal Information",
      fields: profileFields.filter((field) => ["gender", "birthDate"].includes(field.name)),
    },
    {
      label: "Health",
      fields: profileFields.filter((field) => ["weight", "height", "age"].includes(field.name)),
    },
    {
      label: "Activity",
      fields: profileFields.filter((field) => ["activityLevel", "goal"].includes(field.name)),
    },
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

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      // ✅ Use the utility function to calculate age
      if (name === "birthDate") {
        updatedData.age = value ? calculateAge(value) : null; // Use util function for accuracy
      }

      return updatedData;
    });

    setUnsavedChanges(true);
    setSuccessMessage(null);
  };

  
  

  const handleSave = () => {
    if (previewTDEE !== null) {
      dispatch(setTDEE(previewTDEE));
    }
  
    dispatch(setProfileData(formData));
  
    dispatch(addWeight({
      id: Date.now(),
      weight: formData.weight,
      date: new Date().toISOString().split("T")[0],
    }));
  
    setUnsavedChanges(false);
    setSuccessMessage("Profile updated successfully ✅");
  
    // Optional: auto-hide the message after a few seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100">
      <div className="card flex-grow overflow-auto">
        <Form
          fields={profileFields}
          fieldGroups={profileFieldGroups}
          initialData={formData}
          onChange={handleChange}
          onSubmit={handleSave}
          className="flex-1"
        />

        <div className="text-center font-bold bg-accent/20 rounded p-2">
          {previewTDEE !== null
            ? `Estimated Daily Intake: ${Math.round(previewTDEE)} kcal`
            : "Enter values to calculate TDEE"}
        </div>
        {successMessage && (
          <div className="text-green-600 font-medium mt-2">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
