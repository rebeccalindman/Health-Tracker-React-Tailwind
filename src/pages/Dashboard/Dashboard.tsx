import { useState } from 'react';
import CurrentWeight from './CurrentWeight.js';
import AddWeight from './AddWeight.js';
import TodaysMeals from './TodaysMeals.js';
import KcalStatus from './KcalStatus.js';
import WelcomeProfile from './WelcomeProfile.js';
import WeightChart from './WeightChart.js';
import { Button } from '@/components/ui/button.js';
import { Navigate } from 'react-router';
import { Edit } from 'lucide-react';

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  const [showAddWeight, setShowAddWeight] = useState(false);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full p-4'>

        {/* Left Column: Stacked vertically */}
        <div className="flex flex-col gap-4">
          <WelcomeProfile />
          
          {showAddWeight ? (
            <AddWeight onSubmit={() => setShowAddWeight(false)} />
          ) : (
            <div className="m-0 cursor-pointer w-full h-fit" onClick={() => setShowAddWeight(true)}>
              <CurrentWeight />
            </div>
          )}
          
          <div className='card'>
            <h2 className='text-center'>Weight History</h2>
            <WeightChart />
            <Button className='w-fit self-center' onClick={() => { window.location.href = '/profile' }}>
              <Edit className='mr-1' />
              Edit Weight History
            </Button>
          </div>
        </div>

        {/* Right Column (on larger screens), but moves under on smaller screens */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <KcalStatus />
          <TodaysMeals />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

