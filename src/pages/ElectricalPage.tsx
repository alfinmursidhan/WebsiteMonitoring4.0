import React from 'react';
import { Sidebar, ElectricalDataCard } from '../components';

const ElectricalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              ⚡ Monitoring Listrik MCB
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Monitoring data listrik real-time dari Tuya Smart MCB
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ElectricalDataCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricalPage;
