import React, { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, TrendingDown, TrendingUp, Search, Filter, BookOpen, Clock, Shield, Target, ArrowRight } from "lucide-react";
import { rejectedCase, successfulCases } from "../data/landAcquisitionData";
import SaraswatiMascot from "../components/SaraswatiMascot";

const RiskAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const riskFactors = [
    {
      category: "Timing",
      title: "Excessive Delay",
      severity: "high",
      description: "Delays beyond 6 months without valid justification significantly reduce success chances",
      example: rejectedCase,
      prevention: [
        "File within 6 weeks of receiving compensation",
        "Document genuine causes for any delay",
        "Avoid waiting for other claimants' outcomes",
        "Act immediately after knowledge of award"
      ],
      successRate: "15-25%"
    },
    {
      category: "Evidence",
      title: "Weak Comparable Evidence",
      severity: "medium",
      description: "Insufficient or weak comparable evidence leads to rejection",
      example: null,
      prevention: [
        "Gather multiple sale deeds from same locality",
        "Include Collector's guidelines/Jantri rates",
        "Cite comparable judgments for same project",
        "Provide expert valuer reports"
      ],
      successRate: "30-40%"
    },
    {
      category: "Procedure",
      title: "Procedural Non-Compliance",
      severity: "high",
      description: "Missing deadlines, incorrect filing, or incomplete documentation",
      example: null,
      prevention: [
        "File within limitation periods",
        "Accept compensation 'under protest'",
        "Include all required documents",
        "Follow proper court procedures"
      ],
      successRate: "10-20%"
    },
    {
      category: "Strategy",
      title: "Fence-Sitting Behavior",
      severity: "high",
      description: "Waiting for others' outcomes before filing your own case",
      example: rejectedCase,
      prevention: [
        "File independently without delay",
        "Don't wait for other claimants",
        "Act on your own timeline",
        "Seek legal advice promptly"
      ],
      successRate: "5-15%"
    }
  ];

  const successFactors = [
    {
      title: "Parity Principle",
      description: "Using judgments from same notification/project",
      successRate: "85-95%",
      examples: successfulCases.filter(c => c.keyPoints.some(p => p.toLowerCase().includes("parity")))
    },
    {
      title: "Strong Comparable Evidence",
      description: "Multiple sale deeds + Collector guidelines",
      successRate: "60-75%",
      examples: successfulCases.filter(c => c.keyPoints.some(p => p.toLowerCase().includes("comparable") || p.toLowerCase().includes("sale")))
    },
    {
      title: "Timely Filing",
      description: "Filing within limitation with valid reasons",
      successRate: "70-85%",
      examples: successfulCases.filter(c => c.result.toLowerCase().includes("delay"))
    },
    {
      title: "Under Protest Acceptance",
      description: "Accepting compensation with written protest",
      successRate: "65-80%",
      examples: successfulCases
    }
  ];

  const filteredRisks = riskFactors.filter(risk =>
    risk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    risk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (selectedCategory !== "all" && risk.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-8 mb-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Risk Analysis & Prevention
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Learn from rejected cases and understand what to avoid. 
              Identify risks and implement proven success strategies.
            </p>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Risk Prevention</span>
              </div>
              <div className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                <span>Success Strategies</span>
              </div>
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
              placeholder="Search risks, prevention strategies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="timing">Timing</option>
            <option value="evidence">Evidence</option>
            <option value="procedure">Procedure</option>
            <option value="strategy">Strategy</option>
          </select>
        </div>
      </div>

      {/* Rejected Case Highlight */}
      <div className="card-hover border-red-200 bg-red-50/50 mb-8">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <XCircle className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Rejected Case Study</h2>
                <p className="text-gray-600">Learn from this failure</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
              Rejected
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{rejectedCase.name}</h3>
          <p className="text-gray-700 mb-4">{rejectedCase.reason}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Delay Period</div>
              <div className="text-lg font-bold text-red-600">{rejectedCase.keyPoints[0]}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Key Issue</div>
              <div className="text-lg font-bold text-red-600">{rejectedCase.keyPoints[1]}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Lessons Learned:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              {rejectedCase.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-8 h-8 mr-3 text-red-500" />
          Common Risk Factors
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRisks.map((risk, index) => (
            <div key={index} className="card-hover border-l-4 border-red-500">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(risk.severity)}`}>
                      {risk.severity.toUpperCase()} RISK
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{risk.title}</h3>
                  </div>
                  <TrendingDown className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-600 mb-4">{risk.description}</p>
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Success Rate with this risk:</div>
                  <div className="text-2xl font-bold text-red-600">{risk.successRate}</div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-hulu-green" />
                    Prevention Strategies:
                  </h4>
                  <ul className="space-y-2">
                    {risk.prevention.map((strategy, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-hulu-green mr-2 mt-0.5 flex-shrink-0" />
                        {strategy}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Factors */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-hulu-green" />
          Proven Success Strategies
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {successFactors.map((factor, index) => (
            <div key={index} className="card-hover border-l-4 border-hulu-green">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{factor.title}</h3>
                    <p className="text-gray-600">{factor.description}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-hulu-green" />
                </div>
                <div className="bg-hulu-green/10 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Success Rate:</div>
                  <div className="text-2xl font-bold text-hulu-green">{factor.successRate}</div>
                </div>
                {factor.examples.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Example Cases: {factor.examples.length}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {factor.examples.slice(0, 2).map((example, idx) => (
                        <span key={idx} className="px-3 py-1 bg-hulu-green/20 text-hulu-green rounded-full text-xs">
                          {example.state}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-gradient-to-r from-hulu-green/10 to-hulu-purple/10 rounded-xl p-6 border border-hulu-green/20">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-hulu-green mb-2">85%+</div>
            <div className="text-sm text-gray-600">Success with Parity</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600 mb-2">15-25%</div>
            <div className="text-sm text-gray-600">Success with Delays</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-hulu-purple mb-2">60-75%</div>
            <div className="text-sm text-gray-600">Success with Evidence</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">5-15%</div>
            <div className="text-sm text-gray-600">Success with Fence-Sitting</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
