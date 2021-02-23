import create from "zustand";

function getItem(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "");
  } catch (err) {
    return false;
  }
}

const useDarkMode = create((set) => ({
  isDarkMode: getItem("darkMode"),
  setIsDarkMode: (value) => {
    window.localStorage.setItem("darkMode", value);
    return set({ isDarkMode: value });
  },
}));

const useAuth = create((set) => ({
  isLoggedIn: Boolean(window.localStorage.getItem("token")) || false,
  setIsLoggedIn: (value, token) => {
    if (value && token) {
      window.localStorage.setItem("token", token);
      return set({ isLoggedIn: value });
    }
    window.localStorage.removeItem("token");
    return set({ isLoggedIn: value });
  },
}));

export { useDarkMode, useAuth };
