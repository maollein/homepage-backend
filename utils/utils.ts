export const validationError = (): Error => {
  return new Error('Invalid value');
};

export const loginError = (): Error => {
  return new Error('Invalid username or password');
};

export const unauthorizedError = (): Error => {
  return new Error('Unauthorized');
};