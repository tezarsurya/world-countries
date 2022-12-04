import { Link } from "react-router-dom";

type Country = {
  flag: string;
  name: string;
  population: number;
  capital: string;
  region: string;
  code: string;
};

const Country = ({
  flag,
  name,
  population,
  capital,
  region,
  code,
}: Country) => {
  return (
    <Link
      to={`/${code}`}
      className='self-stretch transition-all duration-150 ease-in hover:-translate-y-1'
    >
      <div className='flex h-full flex-col rounded-md bg-white shadow-xl dark:bg-[#2b3945] dark:text-white/90'>
        <img
          src={flag}
          alt={`flag of ${name}`}
          className='w-full rounded-t-md object-cover object-center shadow-lg md:h-36 lg:h-44 xl:h-48'
          width={320}
          height={213}
        />
        <div className='p-6'>
          <h2 className='text-lg font-bold'>{name}</h2>
          <div className='mt-2'>
            <strong>Population:</strong> {population.toLocaleString("en-US")}
          </div>
          <div>
            <strong>Capital:</strong> {capital}
          </div>
          <div>
            <strong>Region:</strong> {region}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Country;
