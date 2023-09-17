const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

const validateName = (input) => {
  return input?.length >= 3 && !specialCharacters.test(input);
};
const validatePassword = (input) => {
  return (
    input?.length >= 8 && specialCharacters.test(input) && input.match(/\d/)
  );
};

const validateEmail = (input) => {
  return input?.length && /^\S+@\S+\.\S+$/.test(input);
};

module.exports = { validateEmail, validateName, validatePassword };
