import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import AddWeight from '../AddWeight';
import { Button } from '../ui/button';

const ProfileCard = () => {
  const { weight, height, age, activityLevel, goal, tdee } = useSelector((state) => state.profile);

  // Hämta första vikten
  const firstWeight = weight.length > 0 ? weight[0].weight : 0;
  const latestWeight = weight.length > 0 ? weight[weight.length - 1].weight : 0;
  const weightChange = latestWeight - firstWeight;
  const userName = "User"

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
    <section className="group bg-white text-black rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Hej {userName}! </h2>
        
        <div className="flex justify-center mb-4">
          <img src="src\assets\profilbild.jpg" alt="Profilbild" className="rounded-full w-28 h-28 object-cover" />
        </div>


        <Button
          onClick={handleClick}
          className="hidden group-hover:block w-full"
        >
          Ändra Profil
        </Button>
      </section>
  );
};

export default ProfileCard;