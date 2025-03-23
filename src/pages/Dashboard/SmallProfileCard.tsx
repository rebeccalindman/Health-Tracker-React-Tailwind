import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.js"; // ✅ Import RootState
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { Profile } from "../../types/profile.js";

const profileLabels: Record<keyof Pick<Profile, 'goal' | 'activityLevel'>, string> = {
  goal: "Goal",
  activityLevel: "Activity level",
};

const SmallProfileCard = () => {
  const { goal, activityLevel, userName } = useSelector((state: RootState) => state.profile);

  const profileSummary = [
    { label: profileLabels.goal, value: typeof goal === "string" ? capitalizeFirstLetter(goal) : "Not set" },
    { label: profileLabels.activityLevel, value: typeof activityLevel === "string" ? capitalizeFirstLetter(activityLevel) : "Calculating..." },
  ];

  return (
    <div className="card p-4 w-full max-w-[300px] shadow-md">
      <h2 className="mb-3">Hello <span>{userName}</span>!</h2>

      {profileSummary.map(({ label, value }) => (
        <div key={label} className="flex flex-col text-center md:text-left">
          <span className="py-1 text-lg md:text-md">{label}</span>
          <span className="text-lg font-bold">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default SmallProfileCard;

