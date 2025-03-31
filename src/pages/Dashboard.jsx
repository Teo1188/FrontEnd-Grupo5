import React from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import ExtraHoursPanel from '../components/ExtraHour';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-shrink-0">
        <Menu />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <Navbar />
        </div>
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <ExtraHoursPanel />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;