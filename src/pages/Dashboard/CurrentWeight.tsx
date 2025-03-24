import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.js';
import { Weight } from '../../types/weight.js';

const CurrentWeight: React.FC = () => {
  const weightEntries = useSelector((state: RootState) => state.weight.weightHistory);
  const latestWeight: Weight | null = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1] : null;

  return (
    <section className='card group flex items-center'>
      {latestWeight ? (
        <p className='text-lg w-[150px]'>
          <span className='font-bold text-2xl text-primary transition duration-200'>{latestWeight.weight} </span> kg
          <span className='block text-sm text-gray-500'> den {latestWeight.date}</span>
          <span className='mt-4 hidden group-hover:block text-md text-primary font-bold'> Register weight </span>
        </p>
      ) : (
        <p className='text-xl text-gray-500'>No weight data available</p>
      )}
    </section>
  );
};

export default CurrentWeight;

