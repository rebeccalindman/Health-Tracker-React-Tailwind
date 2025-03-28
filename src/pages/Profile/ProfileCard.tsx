import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Profile } from "../../types/profile";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import Highlighted from "../../components/Highlighted"; // Import the new component

const ProfileCard = () => {
  const profile = useSelector((state: RootState) => state.profile) as Profile;

  const profileLabels: Record<keyof Profile, string> = {
    gender: "Gender",
    userName: "Name",
    age: "Age",
    weight: "Weight",
    height: "Height",
    activityLevel: "Activity Level",
    goal: "Goal",
    birthDate: "Birth Date",
    tdee: "TDEE",
  };

  const sections = [
    { title: "Personal Information", keys: ["gender", "age"] },
    { title: "Health", keys: ["weight", "height"] },
    { title: "Activity", keys: ["activityLevel", "goal"] },
  ];

  return (
    <>
      {profile.userName &&<div className="card max-w-[400px]">
        <h2>{profile.userName}'s Profile</h2>

        {/* TDEE Section */}
        <Highlighted>
          <p className="text-center">Estimated daily kcal</p>
          <p className="font-bold text-xl">{profile.tdee || "N/A"} kcal</p>
        </Highlighted>

        {/* Profile Sections */}
        {sections.map((section) => (
          <div key={section.title} className="rounded flex flex-col items-center justify-center text-center md:items-start md:text-left w-full">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <div className="grid grid-cols-2 gap-4 px-2 w-fit">
              {section.keys.map((key) => (
                <div key={key} className="flex flex-col">
                  <span className="py-1 text-lg md:text-md">{profileLabels[key as keyof Profile]}</span>
                  <span className="text-lg font-bold">
                    {typeof profile[key as keyof Profile] === "string"
                      ? capitalizeFirstLetter(profile[key as keyof Profile] as string)
                      : profile[key as keyof Profile] || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>}
      {!profile.userName &&<div className="card">
        <h2>No profile found</h2>
        <p className="text-center">Set up your profile to get started.</p>
      </div>}
    </>
  );
};

export default ProfileCard;
