import React, { useState, useEffect } from 'react';

const Search = ({ documentationFiles, successfulCases, searchQuery, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [recentSearches, setRecentSearches] = useState([]);

  // Combine all data sources for search
  const allData = [
    ...documentationFiles.map(file => ({ 
      id: `doc-${file.id}`, 
      title: file.name, 
      type: 'Documentation', 
      content: file.name + ' ' + (file.size || '') 
    })),
    ...successfulCases.map(caseItem => ({ 
      id: `case-${caseItem.id}`, 
      title: caseItem.name, 
      type: 'Case Study', 
      content: caseItem.name + ' ' + caseItem.state + ' ' + caseItem.result + ' ' + caseItem.compensation_details 
    }))
  ];

  // Perform search whenever searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = allData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]); // Keep last 5 searches
    }
  };

  // Filter results by type
  const filteredResults = searchResults.filter(result => {
    if (activeTab === 'all') return true;
    return result.type.toLowerCase().includes(activeTab);
  });

  // Search suggestions based on common terms
  const searchSuggestions = [
    "Section 18",
    "Compensation",
    "Court Jurisdiction",
    "Successful Cases",
    "Legal Formats",
    "Delay Condonation",
    "Parity Principle",
    "Comparable Evidence"
  ].filter(suggestion => 
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Legal Resources</h1>
        <p className="text-gray-600">Find specific information across all land acquisition documentation</p>
      </div>

      {/* Search Bar */}
      <div className="manupatra-card p-6 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation, cases, legal formats..."
            className="manupatra-search-bar pr-12"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Search Suggestions */}
        {searchQuery && searchSuggestions.length > 0 && (
          <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                onClick={() => handleSearch(suggestion)}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Recent Searches */}
        {searchQuery === '' && recentSearches.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'all'
                  ? 'manupatra-button-primary'
                  : 'manupatra-button-secondary'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Results ({searchResults.length})
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'documentation'
                  ? 'manupatra-button-primary'
                  : 'manupatra-button-secondary'
              }`}
              onClick={() => setActiveTab('documentation')}
            >
              Documentation ({searchResults.filter(r => r.type === 'Documentation').length})
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'case'
                  ? 'manupatra-button-primary'
                  : 'manupatra-button-secondary'
              }`}
              onClick={() => setActiveTab('case')}
            >
              Cases ({searchResults.filter(r => r.type === 'Case Study').length})
            </button>
          </div>

          {filteredResults.length > 0 ? (
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <div 
                  key={result.id} 
                  className="manupatra-card p-6 card-hover"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3">
                          {result.type}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800">{result.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {result.content.substring(0, 200)}...
                      </p>
                    </div>
                    <button className="manupatra-button-primary text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="manupatra-card p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any matches for "{searchQuery}". Try different keywords or check the spelling.
              </p>
              <button 
                className="manupatra-button-primary"
                onClick={() => handleSearch('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}

      {/* Popular Searches */}
      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchSuggestions.slice(0, 6).map((suggestion, index) => (
              <div 
                key={index}
                className="manupatra-card p-4 hover:border-blue-300 cursor-pointer card-hover"
                onClick={() => handleSearch(suggestion)}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-medium text-gray-800">{suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Tips */}
      <div className="mt-12 manupatra-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 Be Specific</h3>
            <p className="text-gray-600">
              Use specific terms like "Section 18 application" or "compensation enhancement" for better results.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Use Keywords</h3>
            <p className="text-gray-600">
              Search for legal concepts, case names, or procedural terms to find relevant information quickly.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📋 Check Documentation</h3>
            <p className="text-gray-600">
              Browse our comprehensive documentation if you're looking for general information about land acquisition.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">⚖️ Review Cases</h3>
            <p className="text-gray-600">
              Look at successful case studies to understand strategies that have worked in similar situations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;