// Format: DD/MM/YYYY
export const formatDate = (date) => {
  if (!date) return '';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};

// Format DD MM YYYY
export const formatDateInput = (date) => {
  if (!date) return '';

  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, '0');
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = formattedDate.getFullYear();

  return `${day} ${month} ${year}`;
};

export const calculateAge = (birthday) => {
  if (!birthday) return '';
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
