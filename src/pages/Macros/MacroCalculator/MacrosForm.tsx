
import Form from "@/components/Form/Form"
import { InputFieldProps } from "@/components/Form/InputField"


const MacrosForm = () => {

    const inputFields: InputFieldProps[] = [
        {label:"Daily Calories", name:"dailyCalories", type: "number", required: true, className: ""},
        {label:"Carbohydrate", name:"carbs", type:"number", required:  true, className: ""},
        {label:"Protein", name:"protein", type:"number", required: true, className: ""},
        {label:"Fat", name:"fat", type:"number", required: true, className: ""},
    ]

    const handleChange = () => {
        console.log("changed, no function yet")
    }

    const handleSubmit = () => {
        console.log("submitted, no function yet")
    }
  return (
    <>
    <Form fields={inputFields} onChange={handleChange} onSubmit={handleSubmit}/>
    </>
  )
}

export default MacrosForm