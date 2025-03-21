export const calculateAge = (birthDateString: string): number => {
    if (!birthDateString) return 0; // Default to 0 if no birthDate is provided
  
    const birthDate = new Date(birthDateString);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    // Check if birthday has occurred this year
    const hasHadBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    if (!hasHadBirthday) {
      age -= 1; // Subtract 1 if birthday hasn't happened yet
    }
  
    return age;
  };
  