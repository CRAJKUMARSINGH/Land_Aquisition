import React, { useState } from 'react';

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "AI-Powered Research",
      description: "Analyze successful and rejected land acquisition cases to understand winning strategies",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Legal Documentation",
      description: "Access comprehensive legal documents and templates for land acquisition claims",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Court Jurisdiction",
      description: "Find the correct court for your land acquisition case across all Indian states",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const stats = [
    { value: "5", label: "Cases Analyzed" },
    { value: "25", label: "States Covered" },
    { value: "7", label: "Legal Documents" },
    { value: "4", label: "Successful Strategies" }
  ];

  const aiFeatures = [
    { title: "Intelligent Search", description: "Find relevant case law instantly" },
    { title: "Automated Analysis", description: "Get insights from legal precedents" },
    { title: "Predictive Analytics", description: "Estimate case outcomes" },
    { title: "Document Automation", description: "Generate legal documents" }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="manupatra-hero">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Land Acquisition Legal Suite</h1>
              <p className="text-xl mb-6 text-blue-200">
                AI-powered legal research platform for compensation claims based on Indian Kanoon research
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-900 hover:bg-blue-100 font-bold py-3 px-6 rounded-lg transition-colors shadow-md">
                  Get Started
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white/20 font-bold py-3 px-6 rounded-lg transition-colors">
                  Explore Cases
                </button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              {/* Saraswati Mascot - Legal Advisor */}
              <div className="relative">
                <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-300">
                  <div className="text-6xl flex items-center justify-center w-full h-full">
                    <div className="bg-blue-100 rounded-full w-32 h-32 flex items-center justify-center">
                      <span className="text-blue-700 text-4xl">⚖️</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  AI Legal Assistant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="manupatra-stat-card text-center">
              <div className="text-3xl font-bold text-blue-700 mb-2">{stat.value}</div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Section */}
      <section className="mb-12">
        <h2 className="manupatra-section-title">AI-Powered Legal Research</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <div key={index} className="manupatra-card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">{['🔍', '📊', '🔮', '📝'][index]}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="manupatra-section-title">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`manupatra-card p-6 border-l-4 ${
                activeFeature === index ? 'border-blue-600' : 'border-transparent'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Strategies Section */}
      <section className="mb-12">
        <h2 className="manupatra-section-title">Success Strategies</h2>
        <div className="manupatra-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">🏆 Parity Principle</h3>
              <p className="text-gray-600">Cases with similar notifications/projects have 85-95% success rate. Find judgment for same notification/project.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">📄 Comparable Evidence</h3>
              <p className="text-gray-600">Multiple sale deeds + Collector's Guidelines yield 70-85% success. Use 3+ sale deeds with Collector's Guidelines.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">⏰ Prompt Action</h3>
              <p className="text-gray-600">File within limitation periods for best results. File within 6 weeks/months limitation.</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">✍️ Under Protest</h3>
              <p className="text-gray-600">Always accept compensation with protest statement. Accept compensation with protest statement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="manupatra-section-title">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button 
            onClick={() => document.querySelector('nav').querySelectorAll('button')[1].click()}
            className="manupatra-card p-6 text-center border border-gray-300"
          >
            <div className="text-blue-600 text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 mb-2">View Documentation</h3>
            <p className="text-gray-600 text-sm">Access all legal documents</p>
          </button>
          <button 
            onClick={() => document.querySelector('nav').querySelectorAll('button')[2].click()}
            className="manupatra-card p-6 text-center border border-gray-300"
          >
            <div className="text-blue-600 text-3xl mb-3">⚖️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Case Studies</h3>
            <p className="text-gray-600 text-sm">Analyze successful cases</p>
          </button>
          <button 
            onClick={() => document.querySelector('nav').querySelectorAll('button')[3].click()}
            className="manupatra-card p-6 text-center border border-gray-300"
          >
            <div className="text-blue-600 text-3xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Legal Formats</h3>
            <p className="text-gray-600 text-sm">Use ready templates</p>
          </button>
          <button 
            onClick={() => document.querySelector('nav').querySelectorAll('button')[4].click()}
            className="manupatra-card p-6 text-center border border-gray-300"
          >
            <div className="text-blue-600 text-3xl mb-3">🏛️</div>
            <h3 className="font-semibold text-gray-800 mb-2">Court Guide</h3>
            <p className="text-gray-600 text-sm">Find your jurisdiction</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;