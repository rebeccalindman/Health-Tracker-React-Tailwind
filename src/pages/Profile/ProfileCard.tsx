import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from "../../redux/store"; // ✅ Import RootState

import { Button } from '../../components/ui/button';

const ProfileCard = () => {
  const { gender, weight, height, age, activityLevel, goal, tdee, birthDate } = useSelector((state: RootState) => state.profile);

/*   const navigate = useNavigate(); */
  const handleClick = () => {
    console.log("Edit Profile clicked")
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <div className="max-w-sm mx-auto bg-white text-black rounded-lg shadow-md p-6 mt-4 fixed-width">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Profile Information</h2>

        <p className="mb-2 text-left text-lg"><strong>Gender:</strong> {gender}</p>
        <p className="mb-2 text-left text-lg"><strong>Weight:</strong> {weight} kg</p>
        <p className="mb-2 text-left text-lg"><strong>Height:</strong> {height} cm</p>
        <p className="mb-2 text-left text-lg"><strong>Age:</strong> {age} years</p>
        <p className="mb-2 text-left text-lg"><strong>Activity Level:</strong> {activityLevel}</p>
        <p className="mb-2 text-left text-lg"><strong>Goal:</strong> {goal}</p>
        <p className="mb-4 text-left text-lg"><strong>Daily Intake:</strong> {tdee ? Math.round(tdee) : 'Calculating...'} kcal</p>

        <Button onClick={handleClick} className="w-full text-white rounded py-2 transition">
          Edit Profile
        </Button>
      </div>
    </main>
  );
};

export default ProfileCard;
