// src/utils/formatDate.js

export const formatDate = (isoDate) => {
  if (!isoDate) return "";

  return new Date(isoDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};