import { useState } from "react"
import { useDispatch } from "react-redux"
import { addWeight } from "../../redux/slices/weightSlice"
import { Button } from "../../components/ui/button"

const AddWeight = ({ onSubmit }: { onSubmit: () => void }) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    weight: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddWeight = () => {
    const parsedWeight = parseFloat(formData.weight)
    if (!parsedWeight || parsedWeight <= 0) return

    dispatch(
      addWeight({
        id: Date.now(),
        weight: parsedWeight,
        date: formData.date,
      })
    )

    setFormData({
      weight: "",
      date: new Date().toISOString().split("T")[0],
    })
    onSubmit()
  }

  return (
    <div className="card">
      <h2>Registrera din nya vikt</h2>

      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Ny vikt (kg)"
        className="block w-full border rounded p-2 my-4"
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="block w-full border rounded p-2 my-4"
      />

      <div className="flex flex-col gap-2">
        <Button onClick={handleAddWeight} className="w-full">
          Registrera vikt
        </Button>
        <Button variant="secondary" onClick={onSubmit} className="w-full">
          Avbryt
        </Button>
      </div>
    </div>
  )
}

export default AddWeight
