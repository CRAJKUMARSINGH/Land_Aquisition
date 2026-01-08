import React, { useState } from 'react';

const Documentation = ({ files, searchQuery }) => {
  const [expandedFile, setExpandedFile] = useState(null);

  // Filter files based on search query
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type) => {
    if (type === 'txt') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };

  const getFileContentPreview = (fileName) => {
    // Return a preview of the file content based on the file name
    const previews = {
      "In the context of land acquisition.txt": "This document provides detailed analysis of land acquisition cases under the Land Acquisition Act, 1894, particularly regarding condonation of delay for Section 18 applications...",
      "README.md": "Master index and navigation guide for the land acquisition compensation claims documentation package. Contains information about all documents and how to use them...",
      "Under the Right to Fair Compensatio.txt": "Information about procedures for seeking enhancement of compensation under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013...",
      "courts_and_filing_guide.md": "Complete guide to courts and filing procedures for land acquisition compensation claims. Includes jurisdiction mapping for all 25 Indian states and 8 UTs...",
      "executive_summary.md": "Executive summary of the land acquisition compensation claims research project. Contains key findings from 5 analyzed cases and strategic guidance...",
      "sample_reference_appeal_market_value.md": "Sample legal formats for reference appeals and market value claims. Includes templates for Section 18 applications and Section 54 appeals...",
      "successful_cases_summary.md": "Detailed analysis of successful land acquisition cases from Indian Kanoon database. Covers 4 successful cases and 1 rejected case with key learnings..."
    };

    return previews[fileName] || "Preview not available for this file.";
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Documentation</h1>
        <p className="text-gray-600">Access all land acquisition legal documents and resources</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search documentation..."
          className="manupatra-search-bar"
          value={searchQuery}
          onChange={(e) => {}}
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">{files.length}</div>
          <div className="text-gray-700">Total Documents</div>
        </div>
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">{filteredFiles.length}</div>
          <div className="text-gray-700">Matching Results</div>
        </div>
        <div className="manupatra-stat-card p-6">
          <div className="text-3xl font-bold text-blue-700 mb-2">7</div>
          <div className="text-gray-700">Categories</div>
        </div>
      </div>

      {/* Documentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFiles.map((file) => (
          <div 
            key={file.id} 
            className="manupatra-card overflow-hidden card-hover"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800 text-lg">{file.name}</h3>
                    <p className="text-gray-500 text-sm">{file.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setExpandedFile(expandedFile === file.id ? null : file.id)}
                  className="text-hulu-green-600 hover:text-hulu-green-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <p className="mt-4 text-gray-600 text-sm">
                {getFileContentPreview(file.name)}
              </p>
              
              <div className="mt-6 flex space-x-3">
                <button className="manupatra-button-primary text-sm">
                  View Document
                </button>
                <button className="manupatra-button-secondary text-sm">
                  Download
                </button>
              </div>
            </div>
            
            {/* Expanded content */}
            {expandedFile === file.id && (
              <div className="bg-gray-50 border-t border-gray-200 p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Document Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Type:</span> {file.type.toUpperCase()} file</p>
                  <p><span className="font-medium">Size:</span> {file.size}</p>
                  <p><span className="font-medium">Category:</span> Legal Documentation</p>
                  <p><span className="font-medium">Last Updated:</span> January 7, 2026</p>
                </div>
                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-2">Key Topics:</h5>
                  <div className="flex flex-wrap gap-2">
                    {file.name.includes('acquisition') && (
                      <>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Land Acquisition</span>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Compensation</span>
                      </>
                    )}
                    {file.name.includes('compensatio') && (
                      <>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Fair Compensation</span>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">LARR Act</span>
                      </>
                    )}
                    {file.name.includes('guide') && (
                      <>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Courts</span>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Filing Procedures</span>
                      </>
                    )}
                    {file.name.includes('summary') && (
                      <>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Executive Summary</span>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Research</span>
                      </>
                    )}
                    {file.name.includes('appeal') && (
                      <>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Legal Formats</span>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Appeals</span>
                      </>
                    )}
                    {file.name.includes('cases') && (
                      <>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Case Studies</span>
                        <span className="bg-hulu-green-100 text-hulu-green-800 px-3 py-1 rounded-full text-xs">Successful Cases</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Helpful Resources */}
      <div className="mt-12 manupatra-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Getting Started</h3>
            <p className="text-gray-600 text-sm">Begin with the README to understand the documentation structure</p>
          </div>
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Key Documents</h3>
            <p className="text-gray-600 text-sm">Start with executive summary and successful cases summary</p>
          </div>
          <div className="manupatra-card p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Legal Templates</h3>
            <p className="text-gray-600 text-sm">Review sample formats for practical application</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;