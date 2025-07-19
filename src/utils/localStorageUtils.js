// src/utils/localStorageUtils.js

const MY_LIST_KEY = "userMyList";
const USER_PROFILE_KEY = "userProfile";

export const getMyList = () => {
  return JSON.parse(localStorage.getItem(MY_LIST_KEY)) || [];
};

export const saveToMyList = (item) => {
  const currentList = getMyList();
  const exists = currentList.find((i) => i.id === item.id);
  if (!exists) {
    localStorage.setItem(MY_LIST_KEY, JSON.stringify([...currentList, item]));
  }
};

export const removeFromMyList = (id) => {
  const updatedList = getMyList().filter((item) => item.id !== id);
  localStorage.setItem(MY_LIST_KEY, JSON.stringify(updatedList));
};

export const isInMyList = (id) => {
  return getMyList().some((item) => item.id === id);
};

// Profile helpers
export const getProfile = () => {
  return JSON.parse(localStorage.getItem(USER_PROFILE_KEY)) || { name: "", avatar: "" };
};

export const updateProfile = (profile) => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};
