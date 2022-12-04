import { SunIcon } from "@heroicons/react/24/outline";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import { useRecoilState } from "recoil";
import { themeState } from "../lib/recoil/atoms";

const Navbar = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const handleTheme = () => {
    setTheme((oldTheme) => (oldTheme === "dark" ? "light" : "dark"));
  };

  return (
    <header className='sticky top-0 z-20 bg-white py-6 text-[#111517] shadow-lg dark:bg-[#2b3945] dark:text-white/90'>
      <nav className='flex items-center justify-between px-6 lg:px-12 xl:px-16 2xl:px-32'>
        <div>
          <h1 className='font-bold md:text-lg xl:text-xl'>
            Where in the world?
          </h1>
        </div>
        <button
          type='button'
          onClick={handleTheme}
          className='grid place-items-center'
        >
          {theme === "light" ? (
            <MoonIcon className='h-5 w-5 stroke-2' />
          ) : (
            <SunIcon className='h-6 w-6 stroke-2' />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
