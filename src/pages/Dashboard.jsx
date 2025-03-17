import React, { useState } from 'react';
import CurrentWeight from '../components/dashboard/CurrentWeight';
import AddWeight from '../components/AddWeight';
import TodaysMeals from '../components/dashboard/TodaysMeals';
import KcalStatus from '../components/dashboard/KcalStatus';
import WelcomeProfile from '@/components/dashboard/WelcomeProfile';
import { Navigate } from 'react-router';
import EnergyPieChart from '../components/EnergyPieChart';

const Dashboard = () => {
  const [showAddWeight, setShowAddWeight] = useState(false);
  const energyData = [50, 30, 20]; // Exempeldata: 50% kolhydrater, 30% fett, 20% protein

  return (
    <main className='flex justify-center items-start'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-w-[800px] p-4'>

        {/* Left Column: Stacked vertically */}
        <div className="flex flex-col gap-4">
          <WelcomeProfile />
          <KcalStatus />
          {showAddWeight ? (
            <AddWeight onSubmit={() => setShowAddWeight(false)} />
          ) : (
            <div className="m-0 cursor-pointer w-fit h-fit" onClick={() => setShowAddWeight(true)}>
              <CurrentWeight />
            </div>
          )}

        <section className="card">
          <EnergyPieChart energyData={energyData} />
        </section>
        </div>

        {/* Right Column (on larger screens), but moves under on smaller screens */}
        <div className="md:col-span-1">
          <TodaysMeals />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
