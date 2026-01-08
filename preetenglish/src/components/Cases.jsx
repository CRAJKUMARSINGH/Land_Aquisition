import React, { useState } from 'react';

const Cases = ({ successfulCases, rejectedCase }) => {
  const [activeTab, setActiveTab] = useState('successful');
  const [expandedCase, setExpandedCase] = useState(null);

  const toggleCase = (id) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Case Studies</h1>
        <p className="text-gray-600">Analyze successful and rejected land acquisition cases</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-8 border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === 'successful'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('successful')}
        >
          Successful Cases
        </button>
        <button
          className={`px-6 py-3 font-medium text-lg ${
            activeTab === 'rejected'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected Case
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-green-700 mb-2">{successfulCases.length}</div>
          <div className="text-gray-700">Successful Cases</div>
        </div>
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-red-700 mb-2">{activeTab === 'rejected' ? 1 : 0}</div>
          <div className="text-gray-700">{activeTab === 'rejected' ? 'Rejected Case' : 'Lessons Learned'}</div>
        </div>
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">5</div>
          <div className="text-gray-700">Total Cases</div>
        </div>
      </div>

      {/* Successful Cases */}
      {activeTab === 'successful' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Successful Land Acquisition Cases</h2>
          
          {successfulCases.map((caseItem) => (
            <div 
              key={caseItem.id} 
              className="manupatra-card overflow-hidden card-hover border-l-4 border-green-500"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3">
                        SUCCESS
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">{caseItem.name}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded mr-3">{caseItem.state}</span>
                      <span>{caseItem.year}</span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{caseItem.result}</p>
                    <p className="text-gray-600 text-sm">{caseItem.compensation_details}</p>
                  </div>
                  <button 
                    onClick={() => toggleCase(caseItem.id)}
                    className="text-hulu-green-600 hover:text-hulu-green-800 ml-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <a 
                    href={caseItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="manupatra-button-primary text-sm"
                  >
                    View Details
                  </a>
                  <button className="manupatra-button-secondary text-sm">
                    Analyze Strategy
                  </button>
                </div>
              </div>
              
              {/* Expanded content */}
              {expandedCase === caseItem.id && (
                <div className="bg-gray-50 border-t border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Case Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><span className="font-medium">State:</span> {caseItem.state}</p>
                      <p><span className="font-medium">Year:</span> {caseItem.year}</p>
                      <p><span className="font-medium">Result:</span> {caseItem.result}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Compensation Change:</span> {caseItem.compensation_details}</p>
                      <p><span className="font-medium">Key Strategy:</span> 
                        {caseItem.name.includes('Parity') ? ' Parity Principle Application' : 
                         caseItem.name.includes('Delay') ? ' Delay Condonation' :
                         ' Comparable Evidence'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-800 mb-2">Key Learnings:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      <li>Understanding of limitation periods and condonation</li>
                      <li>Importance of comparable evidence and judgments</li>
                      <li>Role of acceptance under protest in preserving rights</li>
                      <li>Application of parity principle in similar cases</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rejected Case */}
      {activeTab === 'rejected' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Rejected Case Analysis</h2>
          
          <div 
            className="manupatra-card overflow-hidden card-hover border-l-4 border-red-500"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3">
                      REJECTED
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{rejectedCase.name}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded mr-3">{rejectedCase.state}</span>
                    <span>{rejectedCase.year}</span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{rejectedCase.result}</p>
                  <p className="text-gray-600 text-sm">{rejectedCase.reason}</p>
                </div>
                <button 
                  onClick={() => toggleCase(rejectedCase.id)}
                  className="text-hulu-green-600 hover:text-hulu-green-800 ml-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <a 
                  href={rejectedCase.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="manupatra-button-primary text-sm"
                >
                  View Details
                </a>
                <button className="manupatra-button-secondary text-sm">
                  Learn Mistakes
                </button>
              </div>
            </div>
            
            {/* Expanded content */}
            {expandedCase === rejectedCase.id && (
              <div className="bg-gray-50 border-t border-gray-200 p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Case Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-medium">State:</span> {rejectedCase.state}</p>
                    <p><span className="font-medium">Year:</span> {rejectedCase.year}</p>
                    <p><span className="font-medium">Result:</span> {rejectedCase.result}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Reason:</span> {rejectedCase.reason}</p>
                    <p><span className="font-medium">Key Mistake:</span> Fence-sitting behavior</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-2">Critical Lessons:</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Never wait for outcomes of other claimants</li>
                    <li>File within limitation period or provide valid justification for delay</li>
                    <li>Don't accept compensation without stating protest</li>
                    <li>Document all dates and actions to prove diligence</li>
                    <li>Use Order 33 CPC remedy if indigent person status applies</li>
                  </ul>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-medium text-yellow-800 mb-2">Prevention Tips:</h5>
                  <p className="text-yellow-700 text-sm">
                    To avoid similar rejection, always act immediately upon knowledge of award, 
                    apply for certified copy within days, and file reference within limitation period.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Success Factors */}
      <div className="mt-12 manupatra-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Success Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-green-800 mb-2">🏆 Parity Principle</h3>
            <p className="text-green-700 text-sm">
              Find judgment for same notification/project - leads to 85-95% success rate
            </p>
          </div>
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-green-800 mb-2">📄 Comparable Evidence</h3>
            <p className="text-green-700 text-sm">
              3+ sale deeds + Collector's Guidelines + comparable judgments yield 70-85% success
            </p>
          </div>
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-green-800 mb-2">⏰ Prompt Action</h3>
            <p className="text-green-700 text-sm">
              File within limitation periods (6 weeks/months) for best results
            </p>
          </div>
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-green-800 mb-2">✍️ Under Protest</h3>
            <p className="text-green-700 text-sm">
              Always accept compensation with protest statement to preserve rights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;