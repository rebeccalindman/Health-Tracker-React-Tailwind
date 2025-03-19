import React from 'react';
import { useSelector } from 'react-redux';

const CurrentWeight = () => {
  // Select the latest weight entry
  const weightEntries = useSelector((state) => state.profile.weight);
  const latestWeight = weightEntries.length > 0 ? weightEntries[weightEntries.length - 1] : null;

  return (
    <section className='card group flex items-center'>
      {latestWeight ? (
        <p className='text-xl w-[150px]'>
          <span className='font-bold text-xl text-primary transition duration-200'>{latestWeight.weight} </span> kg
          <span className='block text-sm text-gray-500'> den {latestWeight.date}</span>
          <span className='mt-4 hidden group-hover:block text-sm text-primary font-bold'> Lägg till ny vikt</span>
        </p>
      ) : (
        <p className='text-xl text-gray-500'>No weight data available</p>
      )}
    </section>
  );
};

export default CurrentWeight;
