import React, { useState } from 'react';

const LegalFormats = () => {
  const [activeFormat, setActiveFormat] = useState('reference');
  const [expandedSection, setExpandedSection] = useState(null);

  const formats = {
    reference: {
      title: "Reference Application (Section 18)",
      description: "Complete application to Collector for reference to court",
      sections: [
        {
          id: 1,
          title: "Brief Facts",
          description: "10 structured paragraphs covering land ownership, notification, acquisition process, and award details",
          keyElements: [
            "Land ownership and possession details",
            "Notification and declaration dates",
            "Award details and grounds for objection",
            "Receipt of compensation under protest"
          ]
        },
        {
          id: 2,
          title: "Grounds of Objection",
          description: "4 major categories of objections to LAO's award",
          keyElements: [
            "Undervaluation of land and comparable sales",
            "Errors in LAO's determination process",
            "Comparable evidence section with placeholders",
            "Statutory benefits calculation errors"
          ]
        },
        {
          id: 3,
          title: "Limitation Period",
          description: "3 scenarios for filing within limitation",
          keyElements: [
            "Presence at award - 6 weeks from award date",
            "Receipt of notice - 6 weeks from Section 12(2) notice",
            "Date of knowledge - 6 months from knowledge of award"
          ]
        },
        {
          id: 4,
          title: "Acceptance Under Protest",
          description: "Preserving rights while accepting compensation",
          keyElements: [
            "Explicit protest statement",
            "Reservation of rights clause",
            "Reference to Section 31(2) proviso"
          ]
        }
      ]
    },
    appeal: {
      title: "First Appeal to High Court (Section 54)",
      description: "Complete Memorandum of Appeal format",
      sections: [
        {
          id: 1,
          title: "Grounds of Appeal",
          description: "9 standard grounds of appeal with modifications",
          keyElements: [
            "Inadequate enhancement of compensation",
            "Ignoring superior comparable evidence",
            "Erroneous rejection of evidence",
            "Time escalation not granted",
            "Purpose of acquisition ignored",
            "Collector's guidelines ignored",
            "Errors in law and perversity",
            "Comparable judgment/parity principle",
            "All grounds customizable to facts"
          ]
        },
        {
          id: 2,
          title: "Relief Sought",
          description: "Specific reliefs requested from High Court",
          keyElements: [
            "Enhancement of market value",
            "Award of statutory benefits",
            "Grant of interest as per law",
            "Costs of the appeal"
          ]
        },
        {
          id: 3,
          title: "Limitation Compliance",
          description: "Filing within prescribed period",
          keyElements: [
            "Receipt of certified copy date",
            "Filing within 60-90 days",
            "Compliance with High Court rules"
          ]
        },
        {
          id: 4,
          title: "Interim Relief",
          description: "Applications for stay or payment during appeal",
          keyElements: [
            "Stay of operation of decree",
            "Payment of enhanced compensation",
            "Conditional relief options"
          ]
        }
      ]
    },
    guide: {
      title: "Courts & Filing Procedures Guide",
      description: "Complete procedural roadmap for all Indian states",
      sections: [
        {
          id: 1,
          title: "Court Hierarchy",
          description: "Three-stage process for compensation claims",
          keyElements: [
            "Reference Application stage (District Court)",
            "First Appeal stage (High Court)",
            "Second Appeal/SLP stage (Supreme Court)"
          ]
        },
        {
          id: 2,
          title: "High Court Jurisdiction",
          description: "Complete mapping for all 25 states + 8 UTs",
          keyElements: [
            "Principal seats and circuit benches",
            "Territorial jurisdiction rules",
            "Filing location determination",
            "Official websites and resources"
          ]
        },
        {
          id: 3,
          title: "Filing Procedures",
          description: "Step-by-step procedures for each stage",
          keyElements: [
            "Stage 1: Reference Application (7 steps)",
            "Stage 2: First Appeal to HC (7 steps with sub-procedures)",
            "Stage 3: SLP to Supreme Court",
            "Document preparation and filing"
          ]
        },
        {
          id: 4,
          title: "Court Fee Structure",
          description: "Fee calculations for different stages",
          keyElements: [
            "Reference application: Nominal fee (Rs. 50-500)",
            "First Appeal: Ad valorem (7.5%-10% of disputed value)",
            "Certified copy fees and other charges",
            "Ceiling limits for different states"
          ]
        }
      ]
    }
  };

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Legal Formats & Templates</h1>
        <p className="text-gray-600">Ready-to-use legal templates for land acquisition claims</p>
      </div>

      {/* Format Selection Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(formats).map(([key, format]) => (
          <button
            key={key}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeFormat === key
                ? 'manupatra-button-primary'
                : 'manupatra-button-secondary'
            }`}
            onClick={() => setActiveFormat(key)}
          >
            {format.title}
          </button>
        ))}
      </div>

      {/* Format Details */}
      <div className="manupatra-card p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {formats[activeFormat].title}
        </h2>
        <p className="text-gray-600 mb-6">
          {formats[activeFormat].description}
        </p>

        {/* Format Sections */}
        <div className="space-y-4">
          {formats[activeFormat].sections.map((section) => (
            <div 
              key={section.id} 
              className="manupatra-card overflow-hidden"
            >
              <div 
                className="bg-gray-50 p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection(section.id)}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              {expandedSection === section.id && (
                <div className="p-4 bg-white">
                  <h4 className="font-medium text-gray-800 mb-3">Key Elements:</h4>
                  <ul className="space-y-2">
                    {section.keyElements.map((element, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Format Utilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="manupatra-card p-6">
          <div className="text-blue-600 text-3xl mb-3">📋</div>
          <h3 className="font-semibold text-gray-800 mb-2">Template Generator</h3>
          <p className="text-gray-600 text-sm mb-4">
            Generate customized legal formats based on your specific case details
          </p>
          <button className="manupatra-button-primary w-full">Generate Template</button>
        </div>
        <div className="manupatra-card p-6">
          <div className="text-blue-600 text-3xl mb-3">🔍</div>
          <h3 className="font-semibold text-gray-800 mb-2">Format Checker</h3>
          <p className="text-gray-600 text-sm mb-4">
            Verify your legal formats for compliance with court requirements
          </p>
          <button className="manupatra-button-primary w-full">Check Format</button>
        </div>
        <div className="manupatra-card p-6">
          <div className="text-blue-600 text-3xl mb-3">📚</div>
          <h3 className="font-semibold text-gray-800 mb-2">Legal Resources</h3>
          <p className="text-gray-600 text-sm mb-4">
            Access additional legal resources and precedents for your case
          </p>
          <button className="manupatra-button-primary w-full">Access Resources</button>
        </div>
      </div>

      {/* Key Success Tips */}
      <div className="manupatra-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Success Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">🎯 Strategic Drafting</h3>
            <p className="text-gray-600">
              Always adapt templates to your specific facts. Generic templates may not address unique aspects of your case.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">⚖️ Legal Consultation</h3>
            <p className="text-gray-600">
              Consult with qualified legal counsel before filing. Templates are guides, not substitutes for legal advice.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">📄 Documentation</h3>
            <p className="text-gray-600">
              Ensure all supporting documents are properly certified and attached as required by the format.
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">⏰ Timeliness</h3>
            <p className="text-gray-600">
              File within limitation periods. Templates are most effective when used promptly after case assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalFormats;