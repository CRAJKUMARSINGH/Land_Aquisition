import React, { useState } from "react";
import { FileText, Download, Copy, CheckCircle, X, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { legalDrafts, LegalDraft } from "../data/legalDrafts";
import { generatePDFContent, downloadPDFFile, viewPDFFile } from "../utils/generatePDFFiles";
import SaraswatiMascot from "./SaraswatiMascot";

interface DraftGeneratorProps {
  onClose?: () => void;
}

const DraftGenerator: React.FC<DraftGeneratorProps> = ({ onClose }) => {
  const [selectedDraft, setSelectedDraft] = useState<LegalDraft | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (draft: LegalDraft) => {
    setSelectedDraft(draft);
  };

  const handleDownload = () => {
    if (selectedDraft) {
      downloadPDFFile(selectedDraft);
    }
  };

  const handleView = () => {
    if (selectedDraft) {
      viewPDFFile(selectedDraft);
    }
  };

  const handleCopy = () => {
    if (selectedDraft) {
      const content = generatePDFContent(selectedDraft);
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-hulu-green to-hulu-purple p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SaraswatiMascot size="md" animated={true} />
              <div>
                <h2 className="text-2xl font-bold">Quick Draft Generator</h2>
                <p className="text-white/90 text-sm">Generate legal drafts instantly</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {!selectedDraft ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select a Draft Type
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-hulu-green/10 border-2 border-hulu-green rounded-lg p-4 text-center cursor-pointer hover:bg-hulu-green/20 transition-colors" onClick={() => window.location.href = '/legal-drafts?type=reference'}>
                    <FileText className="w-8 h-8 text-hulu-green mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Reference Applications</div>
                    <div className="text-sm text-gray-600">20 Drafts Available</div>
                  </div>
                  <div className="bg-hulu-purple/10 border-2 border-hulu-purple rounded-lg p-4 text-center cursor-pointer hover:bg-hulu-purple/20 transition-colors" onClick={() => window.location.href = '/legal-drafts?type=appeal'}>
                    <FileText className="w-8 h-8 text-hulu-purple mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Appeals</div>
                    <div className="text-sm text-gray-600">20 Drafts Available</div>
                  </div>
                  <div className="bg-blue-100 border-2 border-blue-600 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-200 transition-colors" onClick={() => window.location.href = '/legal-drafts?type=review'}>
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">Reviews</div>
                    <div className="text-sm text-gray-600">10 Drafts Available</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Drafts
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {legalDrafts.slice(0, 6).map((draft) => (
                    <div
                      key={draft.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-hulu-green hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleGenerate(draft)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(draft.type)}`}>
                          {draft.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">#{draft.id}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {draft.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {draft.situation}
                      </p>
                      <div className="flex items-center text-hulu-green text-sm font-medium">
                        Generate Draft
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/legal-drafts"
                  className="btn-primary inline-flex items-center"
                >
                  View All 50 Drafts
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedDraft.type)}`}>
                      {selectedDraft.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">Draft #{selectedDraft.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDraft.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedDraft(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Situation</h4>
                <p className="text-gray-700">{selectedDraft.situation}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Scenario</h4>
                <p className="text-gray-700">{selectedDraft.scenario}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    {selectedDraft.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Success Factors</h4>
                  <ul className="space-y-1">
                    {selectedDraft.successFactors.map((factor, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <Sparkles className="w-4 h-4 text-hulu-purple mr-2 mt-0.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleView}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-hulu-green text-white rounded-lg hover:bg-hulu-green-dark transition-colors font-semibold"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View PDF
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-hulu-purple text-white rounded-lg hover:bg-hulu-purple-dark transition-colors font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftGenerator;
