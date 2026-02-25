import React, { useState } from "react";
import { FileText, Download, Eye, Paperclip, Search, Filter, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { wordFileAttachments, getAllAttachments, getAttachmentsByType, downloadAttachmentPDF, viewAttachmentPDF } from "../utils/wordFileProcessor";
import { processWordFiles, downloadProcessedPDF, viewProcessedPDF } from "../utils/processWordFiles";
import { legalDrafts } from "../data/legalDrafts";
import SaraswatiMascot from "../components/SaraswatiMascot";

const WordAttachments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const processedFiles = processWordFiles();
  let filteredAttachments = processedFiles.map(file => ({
    fileName: file.originalFileName,
    pdfFileName: file.pdfFileName,
    description: file.description,
    type: file.type,
    file: file,
    applicableDraftIds: file.applicableDraftIds
  }));

  if (searchQuery) {
    filteredAttachments = filteredAttachments.filter(attachment =>
      attachment.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attachment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attachment.pdfFileName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedType !== "all") {
    filteredAttachments = filteredAttachments.filter(attachment => attachment.type === selectedType);
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "reference":
        return "bg-hulu-green/10 text-hulu-green border-hulu-green";
      case "appeal":
        return "bg-hulu-purple/10 text-hulu-purple border-hulu-purple";
      case "review":
        return "bg-blue-100 text-blue-600 border-blue-600";
      default:
        return "bg-gray-100 text-gray-600 border-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-hulu-green via-hulu-green-light to-hulu-purple rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/legal-drafts" className="text-white hover:text-white/80">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Word Document Attachments
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Word documents from Attached _Assets folder, converted to PDF and integrated with draft samples.
            </p>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Paperclip className="w-5 h-5 mr-2" />
                <span>{wordFileAttachments.length} Documents</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                <span>PDF Format</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <SaraswatiMascot size="xl" animated={true} />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <Paperclip className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About Attached Documents</h3>
            <p className="text-sm text-gray-700 mb-2">
              These Word documents from the <code className="bg-white px-2 py-1 rounded text-blue-600">Attached _Assets</code> folder have been processed and converted to PDF format.
            </p>
            <p className="text-sm text-gray-600">
              They are automatically attached to relevant draft samples and can be used as reference templates.
            </p>
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
              placeholder="Search attachments by name or description..."
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
            <option value="reference">Reference (1)</option>
            <option value="appeal">Appeal (1)</option>
          </select>
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredAttachments.map((attachment, index) => {
          const relatedDrafts = legalDrafts.filter(d => attachment.applicableDraftIds.includes(d.id));
          
          return (
            <div key={index} className="card-hover">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${getTypeColor(attachment.type)}`}>
                    <Paperclip className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(attachment.type)}`}>
                    {attachment.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {attachment.fileName}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Converted to: {attachment.pdfFileName}
                </p>

                <p className="text-gray-600 mb-4">
                  {attachment.description}
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Attached to {attachment.file.applicableDraftIds.length} Drafts:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {attachment.file.applicableDraftIds.slice(0, 5).map((draftId) => {
                      const draft = legalDrafts.find(d => d.id === draftId);
                      return (
                        <span key={draftId} className="px-2 py-1 bg-white rounded text-xs text-gray-700 border">
                          Draft {draftId}
                        </span>
                      );
                    })}
                    {attachment.file.applicableDraftIds.length > 5 && (
                      <span className="px-2 py-1 bg-white rounded text-xs text-gray-700 border">
                        +{attachment.file.applicableDraftIds.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => viewProcessedPDF(attachment.file)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-hulu-green text-white rounded-lg hover:bg-hulu-green-dark transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View PDF
                  </button>
                  <button
                    onClick={() => downloadProcessedPDF(attachment.file)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-hulu-purple text-white rounded-lg hover:bg-hulu-purple-dark transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <a
                    href={attachment.file.originalPath}
                    download={attachment.file.originalFileName}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Original Word
                  </a>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center mb-1">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      Converted from Word to PDF
                    </div>
                    <div className="text-gray-400 font-mono text-xs truncate" title={attachment.originalPath}>
                      Source: {attachment.originalPath}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAttachments.length === 0 && (
        <div className="text-center py-12">
          <Paperclip className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Attachments Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">How to Use Attached Documents</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>View PDF:</strong> Click "View PDF" to open the converted document in your browser
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Download:</strong> Click "Download" to save the PDF to your device
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Integration:</strong> These documents are automatically attached to relevant draft samples
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Usage:</strong> Use these as reference templates when preparing your legal documents
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordAttachments;
