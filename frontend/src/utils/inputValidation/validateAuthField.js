export const validateAuthField = (name, value) => {
  let error = "";

  const phoneRgx = /^[0-9]+$/
  const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  switch (name) {

    case "phone":
      if (!value.trim()) {
        error = "Phone is required";
      } else if (!phoneRgx.test(value)) {
        error = "Phone must contain only digits";
      } else if (value.length !== 10) {
        error = "Phone must be exactly 10 digits";
      }
      break;

    case "password":
      if (!value.trim()) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
      break;

    case "email":
      if (!value.trim()) {
        error = "Email is required";
      } else if (!emailRgx.test(value)) {
        error = "Invalid email format";
      }
      break;

    case "name":
      if (!value.trim()) {
        error = "Name is required";
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        error = "Name must contain only letters";
      }
      break;

    default:
      break;
  }

  return error;
};