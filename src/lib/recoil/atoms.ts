import { atom } from "recoil";

export const countriesState = atom({
  key: "countries",
  default: [],
});

export const regionState = atom({
  key: "region",
  default: "Filter by Region",
  effects: [
    ({ onSet, setSelf }) => {
      const currentFilter = localStorage.getItem("wc_currentFilter");

      setSelf(currentFilter ?? "Filter by Region");

      onSet((newValue, oldvalue) => {
        localStorage.setItem("wc_currentFilter", newValue);
      });
    },
  ],
});

export const themeState = atom({
  key: "theme",
  default: "light",
  effects: [
    ({ onSet, setSelf }) => {
      const currentTheme = localStorage.getItem("wc_currentTheme");

      setSelf(currentTheme ?? "light");

      onSet((newValue) => {
        localStorage.setItem("wc_currentTheme", newValue);
      });
    },
  ],
});

export const flagCount = atom({
  key: "flagCount",
  default: 16,
});
