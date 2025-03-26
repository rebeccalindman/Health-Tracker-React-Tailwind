import MacrosForm from "./MacrosForm"

const MacroCalculator = () => {
  return (
    <div className="card text-center md:text-left">
      <h2>Calculate macronutirent intake per day</h2>
      <p>If you have a profile set up, the daily calories should be prefilled with your recommended total daily estimated energy based on your personal information, activity and goals. You can also adjust the <i>daily calories</i> manually.</p>
      <MacrosForm/>
      </div>
  )
}

export default MacroCalculator