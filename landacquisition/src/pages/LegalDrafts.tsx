import React, { useState } from "react";
import { Search, Filter, FileText, Scale, BookOpen, Download, Copy, CheckCircle, MapPin, Calendar, ArrowRight, Eye, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { legalDrafts, getDraftsByType, getDraftsByCourt, getDraftsByState, searchDrafts, getDraftById } from "../data/legalDrafts";
import { getAttachmentsForDraft, downloadAttachmentPDF, viewAttachmentPDF } from "../utils/wordFileProcessor";
import { getProcessedFilesForDraft, downloadProcessedPDF, viewProcessedPDF } from "../utils/processWordFiles";
import SaraswatiMascot from "../components/SaraswatiMascot";

const LegalDrafts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourt, setSelectedCourt] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Get unique courts and states
  const courts = Array.from(new Set(legalDrafts.map(d => d.court))).sort();
  const states = Array.from(new Set(legalDrafts.map(d => d.state))).sort();

  // Filter drafts
  let filteredDrafts = legalDrafts;

  if (searchQuery) {
    filteredDrafts = searchDrafts(searchQuery);
  }

  if (selectedType !== "all") {
    filteredDrafts = filteredDrafts.filter(d => d.type === selectedType);
  }

  if (selectedCourt !== "all") {
    filteredDrafts = filteredDrafts.filter(d => d.court === selectedCourt);
  }

  if (selectedState !== "all") {
    filteredDrafts = filteredDrafts.filter(d => d.state === selectedState);
  }

  const draft = selectedDraft ? getDraftById(selectedDraft) : null;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reference":
        return "bg-hulu-green/10 text-hulu-green";
      case "appeal":
        return "bg-hulu-purple/10 text-hulu-purple";
      case "review":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reference":
        return FileText;
      case "appeal":
        return Scale;
      case "review":
        return BookOpen;
      default:
        return FileText;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-hulu-green via-hulu-green-light to-hulu-purple rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              50 Situation-Based Legal Drafts
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Comprehensive reference applications, appeals, and reviews for different courts and scenarios.
              Ready-to-use templates for various land acquisition situations.
            </p>
            <div className="flex items-center gap-4 text-white/90 mb-4">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                <span>50 Drafts</span>
              </div>
              <div className="flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                <span>All Courts</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>All States</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link to="/pdf-drafts" className="bg-white text-hulu-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                View PDF Library
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
              <Link to="/word-attachments" className="bg-white text-hulu-purple px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Paperclip className="w-5 h-5 inline mr-2" />
                Word Attachments
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <SaraswatiMascot size="xl" animated={true} />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-hulu-green mb-2">50</div>
          <div className="text-sm text-gray-600">Total Drafts</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-hulu-purple mb-2">20</div>
          <div className="text-sm text-gray-600">Reference Applications</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">20</div>
          <div className="text-sm text-gray-600">Appeals</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">10</div>
          <div className="text-sm text-gray-600">Reviews</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by situation, court, state, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="reference">Reference (20)</option>
            <option value="appeal">Appeal (20)</option>
            <option value="review">Review (10)</option>
          </select>
          <select
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
          >
            <option value="all">All Courts</option>
            {courts.map(court => (
              <option key={court} value={court}>{court}</option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
          >
            <option value="all">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Drafts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDrafts.map((draftItem) => {
          const TypeIcon = getTypeIcon(draftItem.type);
          return (
            <div
              key={draftItem.id}
              className="card-hover group cursor-pointer"
              onClick={() => setSelectedDraft(draftItem.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(draftItem.type)}`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(draftItem.type)}`}>
                    {draftItem.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-hulu-green transition-colors line-clamp-2">
                  {draftItem.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-hulu-green" />
                    {draftItem.state}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Scale className="w-4 h-4 mr-2 text-hulu-purple" />
                    {draftItem.court}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {draftItem.situation}
                </p>

                <div className="flex items-center text-hulu-green text-sm font-medium">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Draft Details Modal */}
      {draft && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(draft.type)}`}>
                      {draft.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">ID: {draft.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{draft.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {draft.state}
                    </div>
                    <div className="flex items-center">
                      <Scale className="w-4 h-4 mr-1" />
                      {draft.court}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDraft(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-2xl text-gray-500">×</span>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Situation</h3>
                  <p className="text-gray-700">{draft.situation}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Scenario</h3>
                  <p className="text-gray-700">{draft.scenario}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {draft.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Applicable Sections</h3>
                  <div className="flex flex-wrap gap-2">
                    {draft.applicableSections.map((section, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Required Documents</h3>
                  <ul className="space-y-2">
                    {draft.documents.map((doc, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <FileText className="w-5 h-5 text-hulu-purple mr-2 mt-0.5 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Success Factors</h3>
                  <ul className="space-y-2">
                    {draft.successFactors.map((factor, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Template</h3>
                  <p className="text-sm text-gray-700">
                    Template ID: <span className="font-mono font-medium">{draft.template}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Use this template ID to generate the complete legal document.
                  </p>
                </div>

                {/* Word File Attachments */}
                {(() => {
                  const processedFiles = getProcessedFilesForDraft(draft.id);
                  if (processedFiles.length > 0) {
                    return (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Paperclip className="w-5 h-5 mr-2 text-green-600" />
                          Attached Word Documents (Converted to PDF)
                        </h3>
                        <div className="space-y-2">
                          {processedFiles.map((file, index) => (
                            <div key={index} className="bg-white rounded p-3 border border-green-100">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <FileText className="w-4 h-4 text-green-600 mr-2" />
                                  <div>
                                    <span className="font-medium text-gray-900 block">{file.originalFileName}</span>
                                    <span className="text-xs text-gray-500">→ {file.pdfFileName}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{file.description}</p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => viewProcessedPDF(file)}
                                  className="flex-1 flex items-center justify-center px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  View PDF
                                </button>
                                <button
                                  onClick={() => downloadProcessedPDF(file)}
                                  className="flex-1 flex items-center justify-center px-2 py-1 bg-green-700 text-white rounded text-xs hover:bg-green-800 transition-colors"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Download PDF
                                </button>
                                <a
                                  href={file.originalPath}
                                  download={file.originalFileName}
                                  className="flex-1 flex items-center justify-center px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  Original Word
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Word documents from "Attached _Assets" folder have been processed, modified, and converted to PDF format.
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-hulu-green text-white rounded-lg hover:bg-hulu-green-dark transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy Details
                    </>
                  )}
                </button>
                <Link
                  to="/pdf-drafts"
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-hulu-purple text-white rounded-lg hover:bg-hulu-purple-dark transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View PDF
                </Link>
                <button
                  onClick={() => alert(`Downloading ${draft.title}...`)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </button>
                <button
                  onClick={() => setSelectedDraft(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredDrafts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Drafts Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default LegalDrafts;
