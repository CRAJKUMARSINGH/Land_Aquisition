import React, { useState } from "react";
import { FileText, Download, Copy, CheckCircle, BookOpen, Scale, AlertCircle, Sparkles, ArrowRight, Search, Filter } from "lucide-react";
import { legalFormats } from "../data/landAcquisitionData";
import SaraswatiMascot from "../components/SaraswatiMascot";

const DocumentDrafting = () => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const formats = Object.entries(legalFormats).map(([key, format]) => ({
    id: key,
    ...format,
  }));

  const filteredFormats = formats.filter(format =>
    format.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    format.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (formatId: string) => {
    console.log("Downloading format:", formatId);
    alert(`Downloading ${formats.find(f => f.id === formatId)?.title}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-hulu-green via-hulu-green-light to-hulu-purple rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI-Powered Document Drafting
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Generate professional legal documents with our intelligent templates. 
              Ready-to-use formats for Section 18 and Section 54 applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-hulu-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start Drafting
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all duration-200">
                View Templates
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <SaraswatiMascot size="xl" animated={true} />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search document templates, sections, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-5 h-5 mr-2" />
            Advanced Filter
          </button>
        </div>
      </div>

      {/* Document Templates Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {filteredFormats.map((format) => (
          <div
            key={format.id}
            className="card-hover group cursor-pointer"
            onClick={() => setSelectedFormat(selectedFormat === format.id ? null : format.id)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-hulu-green to-hulu-purple rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  format.id === "section18" 
                    ? "bg-hulu-green/10 text-hulu-green" 
                    : "bg-hulu-purple/10 text-hulu-purple"
                }`}>
                  {format.id === "section18" ? "Section 18" : "Section 54"}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-hulu-green transition-colors">
                {format.title}
              </h3>
              <p className="text-gray-600 mb-4">{format.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <BookOpen className="w-4 h-4 mr-2 text-hulu-green" />
                  <span className="font-medium">Sections:</span>
                  <span className="ml-2">{format.sections.length} main sections</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Scale className="w-4 h-4 mr-2 text-hulu-purple" />
                  <span className="font-medium">Features:</span>
                  <span className="ml-2">{format.keyFeatures.length} key features</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(format.id);
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-hulu-green text-white rounded-lg hover:bg-hulu-green-dark transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy();
                  }}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-hulu-purple text-white rounded-lg hover:bg-hulu-purple-dark transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedFormat === format.id && (
              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-hulu-green" />
                  Document Structure
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Main Sections:</h5>
                    <ul className="space-y-1">
                      {format.sections.map((section, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-hulu-green" />
                          {section}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Key Features:</h5>
                    <ul className="space-y-1">
                      {format.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <AlertCircle className="w-4 h-4 mr-2 text-hulu-purple" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Usage:</strong> This template is ready to use. Simply fill in the 
                    case-specific details and customize as needed for your particular situation.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-hulu-green/10 to-hulu-purple/10 rounded-xl p-6 border border-hulu-green/20">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-hulu-green mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Document Drafting Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Always customize templates with your specific case details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include all relevant evidence and supporting documents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Review and verify all dates, amounts, and legal citations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Consult with a qualified lawyer before filing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDrafting;
