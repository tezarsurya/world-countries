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
        return countries.filter((country: any) => country.region == "Africa");
        break;

      case "Americas":
        return countries.filter((country: any) => country.region == "Americas");
        break;

      case "Asia":
        return countries.filter((country: any) => country.region == "Asia");
        break;

      case "Europe":
        return countries.filter((country: any) => country.region == "Europe");
        break;

      case "Oceania":
        return countries.filter((country: any) => country.region == "Oceania");
        break;

      default:
        return countries.slice(0, count);
        break;
    }
  },
});
