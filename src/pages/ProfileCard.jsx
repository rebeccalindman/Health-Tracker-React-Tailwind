import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import AddWeight from '../components/AddWeight';
import { Button } from '@/components/ui/button';

const ProfileCard = () => {
  const { weight, height, age, activityLevel, goal, tdee } = useSelector((state) => state.profile);

  // Hämta första vikten
  const firstWeight = weight.length > 0 ? weight[0].weight : 0;
  const latestWeight = weight.length > 0 ? weight[weight.length - 1].weight : 0;
  const weightChange = latestWeight - firstWeight;

  const getActivityLevelDescription = (activityLevel) => {
    switch (activityLevel) {
      case 1.2:
        return "Stillasittande";
      case 1.375:
        return "Lätt aktivitet";
      case 1.55:
        return "Måttligt aktiv";
      case 1.725:
        return "Mycket aktiv";
      case 1.9:
        return "Elit/idrottare";
      default:
        return "Inget aktivitetsnivå valt";
    }
  };

  const getGoalDescription = (goal) => {
    switch (goal) {
      case -500:
        return "Gå ner i vikt";
      case 0:
        return "Hålla vikten";
      case 500:
        return "Gå upp i vikt";
      default:
        return "Inget mål valt";
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/profileform');
  };

  return (
    <main className="flex flex-col items-center gap-4 p-4">
    <div className="max-w-sm mx-auto bg-white text-black rounded-lg shadow-md p-6 mt-4 fixed-width">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Profilinformation</h2>
        
        <div className="flex justify-center mb-4">
          <img src="src\assets\profilbild.jpg" alt="Profilbild" className="rounded-full w-28 h-28 object-cover" />
        </div>

        <p className="mb-2 text-left text-lg"><strong>Vikt:</strong> {latestWeight} kg {weightChange < 0 ? `(${weightChange} kg)` : ''}</p>
        <p className="mb-2 text-left text-lg"><strong>Längd:</strong> {height} cm</p>
        <p className="mb-2 text-left text-lg"><strong>Ålder:</strong> {age} år</p>
        <p className="mb-2 text-left text-lg"><strong>Aktivitetsnivå:</strong> {getActivityLevelDescription(activityLevel)}</p>
        <p className="mb-2 text-left text-lg"><strong>Mål:</strong> {getGoalDescription(goal)}</p>
        <p className="mb-4 text-left text-lg"><strong>Dagliga intag:</strong> {tdee ? Math.round(tdee) : 'Beräknas...'} kcal</p>

        <Button 
          onClick={handleClick}
          className="w-full text-white rounded py-2 transition "
        >
          Ändra Profil
        </Button>
      </div>
      <AddWeight />
    </main>
  );
};

export default ProfileCard;