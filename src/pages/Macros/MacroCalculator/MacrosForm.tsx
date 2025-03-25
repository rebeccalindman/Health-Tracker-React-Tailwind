
import Form from "@/components/Form/Form"
import { InputFieldProps } from "@/components/Form/InputField"
import { RootState } from "@/redux/store";
import { Macros, MacrosFormData } from "@/types/macros";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { setMacros } from "@/redux/slices/macrosSlice";



const MacrosForm = () => {
    const dispatch = useDispatch()
    const { proteinPercentage, carbohydratePercentage, fatPercentage, protein, carbohydrate, fat } = useSelector((state: RootState) => state.macros)
    const tdee = useSelector((state: RootState) => state.profile.tdee)
  
    // 👇 Local form state
    const [formData, setFormData] = useState<Macros | null>(null)
  
    // ✅ 1. Load initial form data from Redux on mount or tdee change
    useEffect(() => {
      if (
        tdee !== null &&
        proteinPercentage !== null &&
        carbohydratePercentage !== null &&
        fatPercentage !== null
      ) {
        setFormData({
          dailyCalories: tdee,
          proteinPercentage,
          carbohydratePercentage,
          fatPercentage,
          protein,
          carbohydrate,
          fat,
        })
      }
    }, [tdee, proteinPercentage, carbohydratePercentage, fatPercentage, protein, carbohydrate, fat])
  
    // ✅ 2. Auto-calculate grams when percentages or calories change
    useEffect(() => {
      if (!formData) return
  
      const { dailyCalories, proteinPercentage, carbohydratePercentage, fatPercentage } = formData
  
      if (dailyCalories && proteinPercentage && carbohydratePercentage && fatPercentage) {
        const calculateGrams = (cal: number, percent: number, perGram: number) =>
          (cal * (percent / 100)) / perGram
  
        setFormData((prev) => ({
          ...prev!,
          protein: Math.round(calculateGrams(dailyCalories, proteinPercentage, 4)),
          carbohydrate: Math.round(calculateGrams(dailyCalories, carbohydratePercentage, 4)),
          fat: Math.round(calculateGrams(dailyCalories, fatPercentage, 9)),
        }))
      }
    }, [
      formData?.dailyCalories,
      formData?.proteinPercentage,
      formData?.carbohydratePercentage,
      formData?.fatPercentage,
    ])

    const percentageTotal =
    (formData?.proteinPercentage ?? 0) +
    (formData?.carbohydratePercentage ?? 0) +
    (formData?.fatPercentage ?? 0)

    const percentageTotalFooter = (
        <div className="col-span-full text-sm text-muted-foreground text-right pr-2 mt-1">
          Total:{" "}
          <span
            className={
              percentageTotal === 100
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {percentageTotal}%
          </span>{" "}
          of 100%
        </div>
      )
      
  
    // ✅ Form input fields
    const inputFields: InputFieldProps[] = [
      { label: "Daily Calories", name: "dailyCalories", type: "number", required: true },
  
      { label: "Carbs %", name: "carbohydratePercentage", type: "number", required: true, unit: "%" },
      { label: "Protein %", name: "proteinPercentage", type: "number", required: true, unit: "%" },
      { label: "Fat %", name: "fatPercentage", type: "number", required: true, unit: "%" },
  
      { label: "Carbs", name: "carbohydrate", type: "number", required: true, disabled: true },
      { label: "Protein", name: "protein", type: "number", required: true, disabled: true },
      { label: "Fat", name: "fat", type: "number", required: true, disabled: true },
    ]

    const inputFieldGroups = [
        {
          label: "Percentages of daily caloric intake per macronutrient",
          fields: inputFields.filter((field) =>
            ["carbohydratePercentage", "proteinPercentage", "fatPercentage"].includes(field.name)
          ),
          footer: percentageTotalFooter, // ✅ inject here
        },
        {
          label: "Calories from each macronutrient",
          fields: inputFields.filter((field) =>
            ["carbohydrate", "protein", "fat"].includes(field.name)
          ),
        },
      ]
      

    const validateTotalPercentage = (
        protein: number | null,
        carbs: number | null,
        fat: number | null
      ): string | null => {
        const total = (protein ?? 0) + (carbs ?? 0) + (fat ?? 0);
        return total !== 100 ? `Tot. % must be 100 (now ${total})` : null;
      }

      const validationRules = {
    proteinPercentage: (value: number) =>
      validateTotalPercentage(
        value,
        formData?.carbohydratePercentage ?? 0,
        formData?.fatPercentage ?? 0
      ),
    carbohydratePercentage: (value: number) =>
      validateTotalPercentage(
        formData?.proteinPercentage ?? 0,
        value,
        formData?.fatPercentage ?? 0
      ),
    fatPercentage: (value: number) =>
      validateTotalPercentage(
        formData?.proteinPercentage ?? 0,
        formData?.carbohydratePercentage ?? 0,
        value
      ),
  }
      

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            [name]: value === "" ? null : Number(value),
          };
        });
      };
      

      const handleSubmit = () => {
        if (formData) {
          dispatch(setMacros(formData));
          console.log("Submitted macros:", formData);
        }
      };


      
  return (
    <>
    {formData && (
        <Form
            fields={inputFields}
            fieldGroups={inputFieldGroups}
            validationRules={validationRules}
            onChange={handleChange}
            onSubmit={handleSubmit}
            initialData={formData}
        />
    )}
    </>
  )
}

export default MacrosForm