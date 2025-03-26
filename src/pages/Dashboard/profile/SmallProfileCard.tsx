import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.js"; // ✅ Import RootState
import { capitalizeFirstLetter } from "../../../utils/stringUtils.js";
import { Profile } from "../../../types/profile.js";
import { Button } from "@/components/ui/button.js";
import { Edit } from "lucide-react";

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
    <div className="card p-4 w-full text-center group md:text-left shadow-md">
      <h2 className="mb-3">Hello <span>{userName}</span>!</h2>
      <p>Keep track of your progress and reach your fitness goals. Adjust your goals and activity level to see how you're doing.</p>

      <div className="flex flex-row gap-8">
        {profileSummary.map(({ label, value }) => (
          <div key={label} className="flex flex-col text-center md:text-left">
            <span className="py-1 text-lg md:text-md">{label}</span>
            <span className="text-lg font-bold">{value}</span>
          </div>
        ))}
      </div>
        <Button variant="default" aria-label="Edit profile" className="absolute top-8 right-8 w-fit self-center block md:hidden group-hover:block" onClick={() => { window.location.href = '/profile?edit=true' }} size={"sm"}><Edit/></Button>
    </div>
  );
};

export default SmallProfileCard;

