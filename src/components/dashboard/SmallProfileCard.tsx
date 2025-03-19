import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // ✅ Import RootState

const SmallProfileCard = () => {
  const { weight, goal, tdee } = useSelector((state: RootState) => state.profile);

  const profileSummary = [
    { label: "Weight", value: `${weight} kg` },
    { label: "Goal", value: goal },
    { label: "Daily Intake", value: tdee ? `${Math.round(tdee)} kcal` : "Calculating..." },
  ];

  return (
    <div className="card p-4 w-full max-w-[300px] shadow-md">
      <h3 className="text-lg font-bold text-green-600 mb-3">Your Profile</h3>

      {profileSummary.map(({ label, value }) => (
        <p key={label} className="text-sm text-left">
          <strong>{label}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default SmallProfileCard;
