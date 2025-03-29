const getRawFormData = (formData) => {
  return Object.fromEntries(formData.entries());
};

export default getRawFormData;
