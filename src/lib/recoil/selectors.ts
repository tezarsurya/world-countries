import { selector } from "recoil";
import { countriesState, flagCount, regionState } from "./atoms";

export const regionFilter = selector({
  key: "FilteredCountries",
  get: ({ get }) => {
    const region = get(regionState);
    const countries = get(countriesState);
    const count = get(flagCount);

    switch (region) {
      case "Africa":
        return countries
          .filter((country: any) => country.region == "Africa")
          .slice(0, count);
        break;

      case "Americas":
        return countries
          .filter((country: any) => country.region == "Americas")
          .slice(0, count);
        break;

      case "Asia":
        return countries
          .filter((country: any) => country.region == "Asia")
          .slice(0, count);
        break;

      case "Europe":
        return countries
          .filter((country: any) => country.region == "Europe")
          .slice(0, count);
        break;

      case "Oceania":
        return countries
          .filter((country: any) => country.region == "Oceania")
          .slice(0, count);
        break;

      default:
        return countries.slice(0, count);
        break;
    }
  },
});
