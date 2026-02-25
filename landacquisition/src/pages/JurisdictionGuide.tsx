import React, { useState } from "react";
import { MapPin, Building, Search, ExternalLink, FileText, DollarSign, Calendar, Users, ArrowRight, Filter } from "lucide-react";
import { jurisdictionData, searchFilters } from "../data/landAcquisitionData";
import SaraswatiMascot from "../components/SaraswatiMascot";

const JurisdictionGuide = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const states = Object.keys(jurisdictionData);
  const filteredStates = states.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    jurisdictionData[state as keyof typeof jurisdictionData].highCourt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStateData = selectedState ? jurisdictionData[selectedState as keyof typeof jurisdictionData] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-hulu-green via-hulu-green-light to-hulu-purple rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Court Jurisdiction Guide
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Complete mapping of High Courts, benches, districts, and filing procedures 
              for land acquisition compensation claims across India.
            </p>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                <span>All High Courts</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Complete Coverage</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <SaraswatiMascot size="xl" animated={true} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by state or High Court name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
            />
          </div>
          <select
            value={selectedState || ""}
            onChange={(e) => setSelectedState(e.target.value || null)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
          >
            <option value="">All States</option>
            {searchFilters.states.filter(s => s !== "All States").map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* States List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-hulu-green" />
              Select State
            </h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredStates.map((state) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    selectedState === state
                      ? "bg-hulu-green text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-hulu-green/10 hover:text-hulu-green"
                  }`}
                >
                  <div className="font-medium">{state}</div>
                  <div className={`text-sm ${selectedState === state ? "text-white/90" : "text-gray-500"}`}>
                    {jurisdictionData[state as keyof typeof jurisdictionData].highCourt}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* State Details */}
        <div className="lg:col-span-2">
          {selectedStateData ? (
            <div className="space-y-6">
              {/* High Court Info */}
              <div className="card-hover">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-hulu-green to-hulu-purple rounded-xl flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-hulu-green/10 text-hulu-green rounded-full text-sm font-medium">
                      {selectedState}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedStateData.highCourt}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-hulu-green" />
                    <span>Principal Bench: {selectedStateData.bench}</span>
                  </div>
                </div>
              </div>

              {/* Districts */}
              <div className="card-hover">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-hulu-purple" />
                    Districts Under Jurisdiction
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedStateData.districts.map((district, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-hulu-green/10 transition-colors"
                      >
                        <div className="w-2 h-2 bg-hulu-green rounded-full mr-3"></div>
                        <span className="text-gray-700">{district}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filing Information */}
              <div className="card-hover">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-hulu-green" />
                    Filing Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <DollarSign className="w-5 h-5 mr-3 text-hulu-purple flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Filing Fees</div>
                        <div className="text-gray-600">{selectedStateData.filingFees}</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-hulu-green flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Limitation Period</div>
                        <div className="text-gray-600">90 days from Reference Court judgment (Section 54)</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="w-5 h-5 mr-3 text-hulu-purple flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Appellate Authority</div>
                        <div className="text-gray-600">High Court of {selectedState}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-hulu-green/10 to-hulu-purple/10 rounded-xl p-6 border border-hulu-green/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-primary">
                    View Court Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                  <button className="btn-secondary">
                    Download Filing Guide
                    <FileText className="w-4 h-4 ml-2" />
                  </button>
                  <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    View Sample Formats
                    <ArrowRight className="w-4 h-4 inline ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-hover">
              <div className="p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a State to View Details
                </h3>
                <p className="text-gray-600">
                  Choose a state from the list to see High Court jurisdiction, districts, and filing information.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JurisdictionGuide;
