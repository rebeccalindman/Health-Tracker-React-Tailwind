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

  const { gender, weight, height, age, activityLevel, goal, birthDate } = useSelector(
    (state: RootState) => state.profile
  );

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
    { label: "Gender", name: "gender", type: "select", required: true, options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }], className: "col-span-1" },
    { label: "Birth Date", name: "birthDate", type: "date", required: false, className: "col-span-1" }, // Optional
    {
      label: "Age",
      name: "age",
      type: "number",
      required: formData.birthDate ? false : true,
      unit: "years",
      disabled: !!formData.birthDate,
      className: "col-span-1", // ✅ Compact width
    },
    { label: "Weight", name: "weight", type: "number", required: true, unit: "kg", className: "col-span-1" },
    { label: "Height", name: "height", type: "number", required: true, unit: "cm", className: "col-span-1" },
    { label: "Activity Level", name: "activityLevel", type: "select", required: true, options: activityLevelOptions, className: "col-span-2" },
    { label: "Goal", name: "goal", type: "select", required: true, options: goalOptions, className: "col-span-2" },
  ];

  const profileFieldGroups = [
    {
      label: "Personal Information",
      fields: profileFields.filter((field) => ["gender", "birthDate", "age"].includes(field.name)),
      className: "col-span-4",
    },
    {
      label: "Health",
      fields: profileFields.filter((field) => ["weight", "height"].includes(field.name)),
      className: "col-span-4",
    },
    {
      label: "Activity",
      fields: profileFields.filter((field) => ["activityLevel", "goal"].includes(field.name)),
      className: "col-span-4",
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

      if (name === "birthDate") {
        updatedData.age = value ? calculateAge(value) : null;
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

    dispatch(
      addWeight({
        id: Date.now(),
        weight: formData.weight,
        date: new Date().toISOString().split("T")[0],
      })
    );

    setUnsavedChanges(false);
    setSuccessMessage("Profile updated successfully ✅");

    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="w-full h-full p-4 bg-gray-100">
      <div className="card grid grid-cols-3 flex-grow overflow-auto">
        <div className="col-span-2">
        <Form
          fields={profileFields}
          fieldGroups={profileFieldGroups}
          initialData={formData}
          onChange={handleChange}
          onSubmit={handleSave}
          className="gridgrid-cols-4 gap-4"
        />
        </div>

        <div className="text-center font-bold bg-accent/20 rounded p-2 col-3">
          {previewTDEE !== null
            ? `Estimated Daily Intake: ${Math.round(previewTDEE)} kcal`
            : "Enter values to calculate TDEE"}
        </div>
        {successMessage && (
          <div className="text-green-600 font-medium mt-2">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
