import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from "../../redux/store"; // ✅ Import RootState

import { Button } from '../../components/ui/button';

const ProfileCard = () => {
  const { gender, weight, height, age, activityLevel, goal, tdee, birthDate } = useSelector((state: RootState) => state.profile);

  /* const { tdee } = useSelector((state: RootState) => state.profile); */
  console.log("Redux tdee in ProfileCard:", tdee); // 🔍 Add this


  const profileInfo = [
    { label: 'Gender', value: gender },
    { label: 'Weight', value: `${weight} kg` },
    { label: 'Height', value: `${height} cm` },
    { label: 'Age', value: `${age} years` },
    { label: 'Activity Level', value: activityLevel },
    { label: 'Goal', value: goal },
    { label: 'Daily Intake', value: tdee ? `${Math.round(tdee)} kcal` : 'Calculating...' },
  ];

  return (
      <div className="card w-full">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Profile Information</h2>

        {profileInfo.map(({ label, value }) => (
          <p key={label} className="mb-2 text-left text-lg"><strong>{label}:</strong> {value}</p>
        ))}

      </div>
  );
};

export default ProfileCard;

