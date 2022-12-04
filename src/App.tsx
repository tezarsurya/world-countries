import { FormEvent, useEffect, useState } from "react";
import FilterDropdown from "./components/FilterDropdown";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import Loading from "./components/Loading";
import Country from "./components/Country";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  countriesState,
  flagCount,
  regionState,
  themeState,
} from "./lib/recoil/atoms";
import { regionFilter } from "./lib/recoil/selectors";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";

export default function App() {
  const [region, setRegion] = useRecoilState(regionState);
  const [countries, setCountries] = useRecoilState(countriesState);
  const filteredCountries = useRecoilValue(regionFilter);
  const [theme, setTheme] = useRecoilState(themeState);
  const [count, setCount] = useRecoilState(flagCount);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);
  const [errors, setErrors] = useState({});

  const debouncedSearch = useDebounce(search, 500);

  const fetchCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const data = response.data;
    return data;
  };

  const fetchByName = async (query: string) => {
    if (query == "") {
      return refetch();
    }

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${query}`
      );
      setIsFetchError(false);
      setCountries(response.data);
    } catch (error: any) {
      setIsFetchError(true);
      setErrors(error.response);
    }
    setSearchLoading(false);
  };

  const { isLoading, refetch, isRefetching } = useQuery(
    ["countries"],
    fetchCountries,
    {
      onSuccess: (data) => {
        setSearchLoading(false);
        setIsFetchError(false);
        setCountries(data);
      },
      onError: (err: any) => {
        setIsFetchError(true);
        setErrors(err.response);
      },
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    const root = document.documentElement;

    theme === "dark"
      ? root.classList.add("dark")
      : root.removeAttribute("class");
  }, [theme]);

  useEffect(() => {
    setRegion((oldRegion) => "Filter by Region");
    fetchByName(search);
  }, [debouncedSearch]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col justify-start bg-[#eeeeee] py-8 px-6 dark:bg-[#202c37] lg:px-12 xl:px-16 2xl:px-32">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="relative w-full md:w-[60%] lg:w-[50%] xl:w-[40%]">
            <label
              htmlFor="search"
              className="absolute top-0 left-5 bottom-0 grid place-items-center"
            >
              <MagnifyingGlassIcon className="h-6 w-6 text-[#858585]" />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for a country..."
              autoComplete="off"
              autoFocus={false}
              onInput={handleInput}
              onBeforeInput={() => setSearchLoading(true)}
              value={search}
              className="w-full rounded-md py-3 pr-5 pl-14 shadow-lg outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-[#2b3945] dark:text-white/90"
            />
          </div>
          <FilterDropdown />
        </div>
        <div
          className={`${
            isLoading || isRefetching || isFetchError || searchLoading
              ? "grid-cols-none"
              : "md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          } mt-6 flex w-full flex-col space-y-10 md:mt-10 md:grid md:grid-flow-row md:gap-8 md:space-y-0 lg:mt-12 xl:mt-16 xl:gap-12`}
        >
          {isLoading || isRefetching || searchLoading ? (
            <Loading />
          ) : !isFetchError ? (
            <>
              {filteredCountries.map(
                ({ cca3, name, flags, population, capital, region }: any) => (
                  <Country
                    key={cca3}
                    code={cca3}
                    flag={flags.png}
                    name={name.common}
                    population={population}
                    capital={capital}
                    region={region}
                  />
                )
              )}
            </>
          ) : (
            <div>Error</div>
          )}
        </div>
        {filteredCountries.length >= 16 ? (
          <div
            className={`${
              count > filteredCountries.length ||
              isLoading ||
              isRefetching ||
              searchLoading ||
              isFetchError
                ? "hidden"
                : "grid"
            } my-10 w-full place-items-center`}
          >
            <button
              onClick={() => setCount((oldCount) => oldCount + 16)}
              className="rounded-md bg-white py-2 px-4 font-semibold shadow-xl ring-emerald-500 hover:ring-2 dark:bg-[#2b3945] dark:text-white/90"
            >
              Load More
            </button>
          </div>
        ) : null}
      </main>
    </>
  );
}
