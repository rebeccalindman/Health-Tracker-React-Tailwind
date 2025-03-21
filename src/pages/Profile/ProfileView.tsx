import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router-dom";

const ProfileView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isEditing = searchParams.get("edit") === "true"; // Read from URL

  const handleClick = () => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (isEditing) {
        newParams.delete("edit"); // Remove query param when toggling back
      } else {
        newParams.set("edit", "true"); // Add query param
      }
      return newParams;
    });
  };

  return (
    <main className="flex flex-col justify-start">
      <div className="flex flex-col items-center gap-4 h-full">
        {isEditing ? <ProfileForm /> : <ProfileCard />}
        <Button 
          onClick={handleClick}
          className="w-fit text-white rounded py-2 transition"
        >
          {isEditing ? "Visa Profil" : "Ändra Profil"}
        </Button>
      </div>
    </main>
  );
};

export default ProfileView;
