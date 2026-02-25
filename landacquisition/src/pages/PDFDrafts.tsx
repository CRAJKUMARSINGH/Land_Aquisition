import React, { useState, useEffect } from "react";
import { Search, Filter, FileText, Download, Eye, Folder, Calendar, File, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { legalDrafts, searchDrafts } from "../data/legalDrafts";
import { getPDFPath, generatePDFFileName, downloadPDFFile, viewPDFFile } from "../utils/generatePDFFiles";
import SaraswatiMascot from "../components/SaraswatiMascot";

const PDFDrafts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [pdfList, setPdfList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate PDF info for all drafts
    const allPDFs = legalDrafts.map(draft => ({
      draftId: draft.id,
      fileName: generatePDFFileName(draft),
      path: getPDFPath(draft),
      size: "~50-100 KB",
      createdAt: new Date().toISOString(),
      draft: draft
    }));
    setPdfList(allPDFs);
  }, []);

  // Filter PDFs
  let filteredDrafts = legalDrafts;
  if (searchQuery) {
    filteredDrafts = searchDrafts(searchQuery);
  }
  if (selectedType !== "all") {
    filteredDrafts = filteredDrafts.filter(d => d.type === selectedType);
  }

  const filteredPDFs = pdfList.filter(pdf => 
    filteredDrafts.some(draft => draft.id === pdf.draftId)
  );

  const handleDownload = (draft: any) => {
    downloadPDFFile(draft);
  };

  const handleViewPDF = (draft: any) => {
    viewPDFFile(draft);
  };

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
                PDF Drafts Library
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Access all 50 legal drafts as PDF documents. Download or view PDFs for reference applications, appeals, and reviews.
            </p>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Folder className="w-5 h-5 mr-2" />
                <span>drafts-pdf/ folder</span>
              </div>
              <div className="flex items-center">
                <File className="w-5 h-5 mr-2" />
                <span>{pdfList.length} PDFs</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <SaraswatiMascot size="xl" animated={true} />
          </div>
        </div>
      </div>

      {/* Folder Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <Folder className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">PDF Generation</h3>
            <p className="text-sm text-gray-700 mb-2">
              PDFs are <strong>generated on-demand</strong> from the legal drafts data when you click "View" or "Download".
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Files are generated in real-time with all draft information, including situation, scenario, key points, applicable sections, required documents, and success factors.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> PDFs are generated as text files (.txt) that can be easily converted to PDF format using any text-to-PDF converter.
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
              placeholder="Search PDFs by title, court, state..."
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
        </div>
      </div>

      {/* PDF List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPDFs.map((pdfInfo) => {
          const draft = pdfInfo.draft || legalDrafts.find(d => d.id === pdfInfo.draftId);
          if (!draft) return null;

          return (
            <div key={pdfInfo.draftId} className="card-hover group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${getTypeColor(draft.type)}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(draft.type)}`}>
                    {draft.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-hulu-green transition-colors line-clamp-2">
                  {draft.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2 text-hulu-green" />
                    {pdfInfo.fileName}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-hulu-purple" />
                    {new Date(pdfInfo.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <File className="w-4 h-4 mr-2 text-blue-600" />
                    {pdfInfo.size}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleViewPDF(draft)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-hulu-green text-white rounded-lg hover:bg-hulu-green-dark transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(draft)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-hulu-purple text-white rounded-lg hover:bg-hulu-purple-dark transition-colors text-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center mb-1">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      Generated on-demand
                    </div>
                    <div className="text-gray-400 font-mono text-xs truncate" title={pdfInfo.path}>
                      {pdfInfo.fileName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPDFs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No PDFs Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">How to Access PDFs</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>View PDF:</strong> Click "View" button to open PDF in new tab
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Download PDF:</strong> Click "Download" button to save PDF to your device
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Direct Access:</strong> PDFs are stored in <code className="bg-white px-2 py-1 rounded">public/drafts-pdf/</code> folder
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>URL Format:</strong> <code className="bg-white px-2 py-1 rounded">/drafts-pdf/Draft_[ID]_[Title].pdf</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFDrafts;
