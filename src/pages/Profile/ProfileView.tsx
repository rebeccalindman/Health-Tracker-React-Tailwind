import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProfileView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isEditing = searchParams.get("edit") === "true"; // Read state from URL
  const [toggleForm, setToggleForm] = useState(isEditing); // ✅ Keep track of state

  useEffect(() => {
    setToggleForm(isEditing); // ✅ Ensure UI updates when URL changes
  }, [isEditing]);

  const handleClick = () => {
    setSearchParams(toggleForm ? {} : { edit: "true" }); // ✅ Toggle the query parameter
  };

  return (
    <main className="flex flex-col justify-start">
      <div className="flex flex-col items-center gap-4 h-fit">
        {toggleForm ? <ProfileForm /> : <ProfileCard />}
        <Button 
          onClick={handleClick}
          className="w-fit text-white rounded py-2 transition"
        >
          {toggleForm ? "Visa Profil" : "Ändra Profil"}
        </Button>
      </div>
    </main>
  );
};

export default ProfileView;
