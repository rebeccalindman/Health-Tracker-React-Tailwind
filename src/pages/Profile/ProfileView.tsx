import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import { Button } from "../../components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Edit, ArrowLeft } from "lucide-react"; // Import icons

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
    <>
      {isEditing ? <ProfileForm /> : <ProfileCard />}
      <Button 
        onClick={handleClick}
        className="w-fit text-white rounded py-2 transition flex items-center gap-2" // Add flex and gap
      >
        {isEditing ? (
          <>
            <ArrowLeft className="w-4 h-4" /> {/* Icon for "Show Profile" */}
            Show Profile
          </>
        ) : (
          <>
            <Edit className="w-4 h-4" /> {/* Icon for "Edit Profile" */}
            Edit Profile
          </>
        )}
      </Button>
    </>
  );
};

export default ProfileView;

