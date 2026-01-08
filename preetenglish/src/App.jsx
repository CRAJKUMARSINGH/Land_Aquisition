import React, { useState } from 'react';
import './index.css';
import Home from './components/Home';
import Documentation from './components/Documentation';
import Cases from './components/Cases';
import LegalFormats from './components/LegalFormats';
import Jurisdiction from './components/Jurisdiction';
import Search from './components/Search';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Land acquisition data
  const documentationFiles = [
    { id: 1, name: "In the context of land acquisition.txt", size: "30.8 KB", type: "txt" },
    { id: 2, name: "README.md", size: "17.4 KB", type: "md" },
    { id: 3, name: "Under the Right to Fair Compensatio.txt", size: "3.7 KB", type: "txt" },
    { id: 4, name: "courts_and_filing_guide.md", size: "21.2 KB", type: "md" },
    { id: 5, name: "executive_summary.md", size: "18.8 KB", type: "md" },
    { id: 6, name: "sample_reference_appeal_market_value.md", size: "25.0 KB", type: "md" },
    { id: 7, name: "successful_cases_summary.md", size: "13.2 KB", type: "md" }
  ];

  const successfulCases = [
    {
      id: 1,
      name: "Kalabhai Hadabhai vs The Deputy Collector",
      state: "Gujarat",
      year: 2025,
      result: "Delay condoned (321 days)",
      compensation_details: "Delay condoned with condition of no interest for delay period",
      url: "https://indiankanoon.org/doc/36243800/"
    },
    {
      id: 2,
      name: "The State of Madhya Pradesh vs Chhakkilal",
      state: "Madhya Pradesh",
      year: 2025,
      result: "Compensation enhanced",
      compensation_details: "Rs. 4,30,167 → Rs. 1,050,000 per hectare",
      url: "https://indiankanoon.org/doc/123801780/"
    },
    {
      id: 3,
      name: "Anand S/O Siddappa vs Special Land Acquisition Officer",
      state: "Karnataka",
      year: 2025,
      result: "Compensation enhanced on parity principle",
      compensation_details: "Rs. 51,000 → Rs. 5,08,000 per acre",
      url: "https://indiankanoon.org/doc/158251358/"
    },
    {
      id: 4,
      name: "Land Acquisition Officer vs Dodla Chinnaiah",
      state: "Telangana",
      year: 2024,
      result: "Enhancement upheld",
      compensation_details: "Rs. 15,000 → Rs. 45,000 per acre",
      url: "https://indiankanoon.org/doc/156794082/"
    }
  ];

  const rejectedCase = {
    id: 5,
    name: "Nirubhai Bhurabhai vs SLAO",
    state: "Gujarat",
    year: 2025,
    result: "Delay condonation rejected",
    reason: "772 days delay, fence-sitting behavior",
    url: "https://indiankanoon.org/doc/193253261/"
  };

  const jurisdictionData = {
    "Karnataka": {
      court: "Karnataka High Court",
      seats: ["Bengaluru (Principal)", "Dharwad Bench", "Kalaburagi Bench"],
      coverage: "Dharwad, Belagavi, Bagalkot, Vijayapura, Gadag, Haveri, Uttara Kannada (Dharwad Bench); Kalaburagi, Bidar, Yadgir, Raichur, Koppal, Ballari (Kalaburagi Bench)"
    },
    "Madhya Pradesh": {
      court: "Madhya Pradesh High Court",
      seats: ["Jabalpur (Principal)", "Gwalior Bench", "Indore Bench"],
      coverage: "Gwalior, Morena, Sheopur, Bhind, Datia, Shivpuri, Guna, Ashoknagar (Gwalior Bench); Indore, Ujjain, Dewas, Mandsaur, Ratlam, Neemuch, Shajapur, Dhar, Jhabua, Alirajpur, Khargone, Barwani, Burhanpur, Khandwa, Dhar (Indore Bench)"
    },
    "Maharashtra": {
      court: "Bombay High Court",
      seats: ["Mumbai (Principal)", "Nagpur Bench", "Aurangabad Bench", "Panaji Bench"],
      coverage: "Vidarbha region (Nagpur Bench); Marathwada region (Aurangabad Bench); Goa (Panaji Bench)"
    },
    "Tamil Nadu": {
      court: "Madras High Court",
      seats: ["Chennai (Principal)", "Madurai Bench"],
      coverage: "Southern districts (Madurai, Tirunelveli, etc.) (Madurai Bench)"
    },
    "Telangana": {
      court: "Telangana High Court",
      seats: ["Hyderabad (Principal)"],
      coverage: "All districts of Telangana"
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <Home />;
      case 'documentation':
        return <Documentation files={documentationFiles} searchQuery={searchQuery} />;
      case 'cases':
        return <Cases successfulCases={successfulCases} rejectedCase={rejectedCase} />;
      case 'formats':
        return <LegalFormats />;
      case 'jurisdiction':
        return <Jurisdiction jurisdictionData={jurisdictionData} />;
      case 'search':
        return <Search 
          documentationFiles={documentationFiles} 
          successfulCases={successfulCases} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="manupatra-header bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Land Acquisition Legal Suite</h1>
              <p className="text-blue-200 text-sm">Built for Law. Driven by Technology. Trusted for Land Rights.</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-800 px-3 py-1 rounded-full text-sm">
                <span className="font-medium">Cases Analyzed:</span> 5
              </div>
              <div className="bg-blue-800 px-3 py-1 rounded-full text-sm">
                <span className="font-medium">States Covered:</span> 25
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200 manupatra-navigation">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex space-x-1 overflow-x-auto py-2">
              {[
                { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { id: 'documentation', label: 'Documentation', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { id: 'cases', label: 'Cases', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                { id: 'formats', label: 'Legal Formats', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { id: 'jurisdiction', label: 'Jurisdiction', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'manupatra-nav-active'
                      : 'manupatra-nav-inactive'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="manupatra-footer bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Land Acquisition Legal Suite
              </h3>
              <p className="text-blue-200 text-sm">
                AI-powered legal research platform for land acquisition compensation claims based on Indian Kanoon research.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Research</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Case Database</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Precedents</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Statutes</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Regulations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Operations</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Document Automation</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Compliance Tracking</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Workflow Management</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Time & Billing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Education & Training</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Legal Academy</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Training Modules</a></li>
                <li><a href="#" className="manupatra-footer-link hover:text-white transition-colors">Certifications</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-300 text-sm flex flex-col md:flex-row justify-between items-center">
            <div>
              © 2026 Land Acquisition Legal Suite. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-blue-400">Built for Law. Driven by Technology. Trusted for 25 Years.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;