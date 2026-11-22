
export const validateName = (name) => {
  return /^[A-Za-z ]+$/.test(name.trim());
};


export const validatePhone = (phone) => {
  return /^(?!0+$)[0-9]{10,15}$/.test(phone.trim());
};
