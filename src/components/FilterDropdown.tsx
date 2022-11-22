import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { regionState } from "../lib/recoil/atoms";

type MenuItem = {
  text: string;
};

const MenuItem = ({ text }: MenuItem) => {
  const [region, setRegion] = useRecoilState(regionState);

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    const btnValue = e.currentTarget.innerHTML;

    setRegion((oldRegion) =>
      btnValue === "All" ? "Filter by Region" : btnValue,
    );
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={handleFilter}
          className={`${
            active && "bg-emerald-500 text-white dark:bg-emerald-600"
          } w-full rounded-md px-4 py-1 text-left font-semibold transition-colors duration-300 ease-in-out dark:text-white/90`}
        >
          {text}
        </button>
      )}
    </Menu.Item>
  );
};

const FilterDropdown = () => {
  const [region, setRegion] = useRecoilState(regionState);

  return (
    <div className='relative z-10 mt-8 w-full md:mt-0 md:w-fit'>
      <Menu>
        <Menu.Button className='flex w-[60%] items-center justify-between space-x-1 rounded-md bg-white px-6 py-4 shadow-lg transition-colors duration-200 ease-in-out dark:bg-[#2b3945] dark:text-white/90 md:w-48 md:py-3'>
          <span>{region}</span>
          <ChevronDownIcon className='h-4 w-4 text-right' />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute mt-2 w-[60%] origin-top-left flex-col items-start space-y-2 rounded-md bg-white shadow-lg dark:bg-[#2b3945] md:right-0 md:w-48 md:origin-top-right'>
            <div className='w-full p-1'>
              <MenuItem text='All' />
              <MenuItem text='Africa' />
              <MenuItem text='Americas' />
              <MenuItem text='Asia' />
              <MenuItem text='Europe' />
              <MenuItem text='Oceania' />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterDropdown;
