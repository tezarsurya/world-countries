import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../components/Navbar";
import { themeState } from "../lib/recoil/atoms";

const CountryDetail = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col justify-start bg-[#eeeeee] py-8 px-6 dark:bg-[#202c37] lg:px-12 xl:px-16 2xl:px-32">
        hello
      </main>
    </>
  );
};

export default CountryDetail;
