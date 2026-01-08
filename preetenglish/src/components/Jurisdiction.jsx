import React, { useState } from 'react';

const Jurisdiction = ({ jurisdictionData }) => {
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const allStates = Object.keys(jurisdictionData);
  
  // Filter states based on search term
  const filteredStates = allStates.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (state) => {
    setSelectedState(state === selectedState ? '' : state);
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Court Jurisdiction Guide</h1>
        <p className="text-gray-600">Complete jurisdiction mapping for all Indian states and UTs</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a state or union territory..."
          className="manupatra-search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">{allStates.length}</div>
          <div className="text-gray-700">States & UTs Covered</div>
        </div>
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">{filteredStates.length}</div>
          <div className="text-gray-700">Matching Results</div>
        </div>
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">25+8</div>
          <div className="text-gray-700">States + UTs</div>
        </div>
      </div>

      {/* State List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredStates.map((state) => (
          <div 
            key={state}
            className={`manupatra-card p-4 cursor-pointer transition-colors ${
              selectedState === state 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
            }`}
            onClick={() => handleStateSelect(state)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{state}</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  selectedState === state ? 'rotate-180' : ''
                }`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Selected State Details */}
      {selectedState && jurisdictionData[selectedState] && (
        <div className="manupatra-card p-6 mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{selectedState}</h2>
            <span className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              High Court Jurisdiction
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">High Court</h3>
              <p className="text-gray-700">{jurisdictionData[selectedState].court}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Court Seats</h3>
              <ul className="list-disc list-inside text-gray-700">
                {jurisdictionData[selectedState].seats.map((seat, index) => (
                  <li key={index}>{seat}</li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-800 mb-2">Coverage Area</h3>
              <p className="text-gray-700">{jurisdictionData[selectedState].coverage}</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button className="btn-primary">
              View Court Website
            </button>
            <button className="btn-outline">
              Download Guide
            </button>
          </div>
        </div>
      )}

      {/* All States Overview */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-hulu-green-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Jurisdiction Overview</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-hulu-green-50">
              <tr>
                <th className="table-header">State/UT</th>
                <th className="table-header">High Court</th>
                <th className="table-header">Principal Seat</th>
                <th className="table-header">Circuit Benches</th>
              </tr>
            </thead>
            <tbody>
              {allStates.map((state, index) => {
                const courtInfo = jurisdictionData[state];
                const seats = courtInfo.seats;
                const principalSeat = seats[0];
                const circuitBenches = seats.slice(1).join(', ') || 'None';
                
                return (
                  <tr key={state} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="table-cell font-medium">{state}</td>
                    <td className="table-cell">{courtInfo.court.replace(/High Court.*/, 'High Court')}</td>
                    <td className="table-cell">{principalSeat.replace(/\(.*\)/, '').trim()}</td>
                    <td className="table-cell">{circuitBenches}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Filing Tips</h3>
          <ul className="space-y-2 text-yellow-700">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Always file in the High Court having territorial jurisdiction over the land location</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Check if your state has circuit benches that may be closer to your location</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Legal Resources</h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" clipRule="evenodd" />
              </svg>
              <span>High Court e-filing portals available for most jurisdictions</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" clipRule="evenodd" />
              </svg>
              <span>Official court websites provide procedural guidelines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jurisdiction;