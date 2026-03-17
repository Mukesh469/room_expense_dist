// utils/validators/validateRoomForm.js

export const validateRoomForm = (name, value) => {
  if (name === "name") {
    if (!value.trim()) return "Room name is required";
    if (value.length < 3) return "Room name must be at least 3 characters";
  }

  if (name === "desc") {
    if (!value.trim()) return "Room description is required";
    if (value.length < 5) return "Description must be at least 5 characters";
  }

  return "";
};