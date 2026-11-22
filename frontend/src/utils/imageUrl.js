
const API_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (image) => {
  if (!image) return "";

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  let imagePath = image.replace(/^\/+/, "");

  if (!imagePath.startsWith("images/")) {
    imagePath = `images/${imagePath}`;
  }

  return `${API_URL}/${imagePath}`;
};
