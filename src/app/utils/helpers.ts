export const calculateAge = (dob: string): number => {
  const birthdate = new Date(dob);
  const dateNow = new Date();

  let age = dateNow.getFullYear() - birthdate.getFullYear();
  const monthDiff = dateNow.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && dateNow.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
};
