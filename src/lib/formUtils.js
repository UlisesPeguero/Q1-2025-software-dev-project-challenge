export function getRawFormData(formData) {
  return Object.fromEntries(formData.entries());
}

export function validateFormData(formData, schema) {
  const data = getRawFormData(formData);
  const validation = schema.safeParse(data);

  let validationResult = {
    success: true,
  };

  if (!validation.success) {
    validationResult = {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  return [data, validationResult];
}
