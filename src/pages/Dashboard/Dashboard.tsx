import { useState } from 'react';
import CurrentWeight from './CurrentWeight.js';
import AddWeight from '../../components/AddWeight.js';
import TodaysMeals from './TodaysMeals.js';
import KcalStatus from './KcalStatus.js';
import WelcomeProfile from './WelcomeProfile.js';

const Dashboard = () => {
  const [showAddWeight, setShowAddWeight] = useState(false);
/*   const energyData = [50, 30, 20]; // Exempeldata: 50% kolhydrater, 30% fett, 20% protein
 */
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full p-4'>

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
          {/* Todo add energy pie chart component */}
        </section>
        </div>

        {/* Right Column (on larger screens), but moves under on smaller screens */}
        <div className="md:col-span-1">
          <TodaysMeals />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
