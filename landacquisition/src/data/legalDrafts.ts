/**
 * 50 Different Situation-Based Legal Drafts
 * Reference Applications, Appeals, and Reviews for Different Courts
 */

export interface LegalDraft {
  id: number;
  title: string;
  type: "reference" | "appeal" | "review";
  court: string;
  state: string;
  situation: string;
  scenario: string;
  keyPoints: string[];
  applicableSections: string[];
  template: string;
  documents: string[];
  successFactors: string[];
}

export const legalDrafts: LegalDraft[] = [
  // REFERENCE APPLICATIONS (Section 18) - 20 situations
  {
    id: 1,
    title: "Reference Application - Delay Condonation with Financial Hardship",
    type: "reference",
    court: "Gujarat High Court",
    state: "Gujarat",
    situation: "Delay of 321 days in filing reference application",
    scenario: "Claimant faced financial crunch preventing payment of litigation fees. Compensation received but reference filed late due to poverty.",
    keyPoints: [
      "Financial hardship documented",
      "No intentional delay",
      "Ready to forego interest for delay period",
      "Substantive rights protected"
    ],
    applicableSections: ["Section 18(2) of LAA 1894", "Section 5 of Limitation Act"],
    template: "REFERENCE_APPLICATION_DELAY_FINANCIAL",
    documents: [
      "Affidavit of financial hardship",
      "Bank statements showing poverty",
      "Medical certificates (if applicable)",
      "Receipt of compensation under protest"
    ],
    successFactors: ["Liberal justice-oriented approach", "No intentional delay", "Financial crunch proven"]
  },
  {
    id: 2,
    title: "Reference Application - Parity Principle (Same Notification)",
    type: "reference",
    court: "Karnataka High Court",
    state: "Karnataka",
    situation: "Earlier judgment exists for same notification/project",
    scenario: "Similar land in same project awarded higher compensation. Claimant seeks parity with earlier judgment.",
    keyPoints: [
      "Same notification/project",
      "Similar or inferior land",
      "Earlier judgment cited",
      "Parity principle applicable"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_PARITY",
    documents: [
      "Copy of earlier judgment",
      "Notification comparison",
      "Land comparison report",
      "Survey numbers matching"
    ],
    successFactors: ["85-95% success rate with parity", "Same notification", "Comparable land"]
  },
  {
    id: 3,
    title: "Reference Application - Multiple Sale Deeds Evidence",
    type: "reference",
    court: "Madhya Pradesh High Court",
    state: "Madhya Pradesh",
    situation: "Strong comparable evidence with multiple sale deeds",
    scenario: "Claimant has 3-5 registered sale deeds from same village within 1-2 years of notification showing higher market value.",
    keyPoints: [
      "3-5 registered sale deeds",
      "Same village/locality",
      "Within 1-2 years of notification",
      "Higher prices than awarded"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23(1) of LAA 1894"],
    template: "REFERENCE_APPLICATION_SALE_DEEDS",
    documents: [
      "Registered sale deeds (3-5)",
      "Village map showing proximity",
      "Market value report",
      "Collector's guidelines"
    ],
    successFactors: ["60-75% success with strong evidence", "Multiple comparable sales", "Recent transactions"]
  },
  {
    id: 4,
    title: "Reference Application - Collector Guidelines Based",
    type: "reference",
    court: "Telangana High Court",
    state: "Telangana",
    situation: "Award below Collector's guidelines/Jantri rates",
    scenario: "Awarded compensation is lower than official Collector guidelines or Jantri rates for the area.",
    keyPoints: [
      "Collector's guidelines available",
      "Award below guidelines",
      "Official government rates",
      "Statutory compliance"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_COLLECTOR_GUIDELINES",
    documents: [
      "Collector's guidelines copy",
      "Jantri rates extract",
      "Official circulars",
      "Government notifications"
    ],
    successFactors: ["Official rates carry weight", "Government guidelines", "Statutory basis"]
  },
  {
    id: 5,
    title: "Reference Application - Time Escalation Claim",
    type: "reference",
    court: "Maharashtra High Court",
    state: "Maharashtra",
    situation: "Significant time gap between notification and award",
    scenario: "3+ years gap between Section 4 notification and award. Claimant seeks time escalation for market value increase.",
    keyPoints: [
      "3+ years gap",
      "Market value increased",
      "Time escalation justified",
      "Comparable evidence for later period"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_TIME_ESCALATION",
    documents: [
      "Notification dates",
      "Award date",
      "Sale deeds from later period",
      "Market trend analysis"
    ],
    successFactors: ["Time gap proven", "Market increase documented", "Escalation granted"]
  },
  {
    id: 6,
    title: "Reference Application - Under Protest Acceptance",
    type: "reference",
    court: "Rajasthan High Court",
    state: "Rajasthan",
    situation: "Compensation accepted with written protest",
    scenario: "Claimant accepted compensation but with written 'under protest' statement, reserving right to challenge.",
    keyPoints: [
      "Written protest statement",
      "Compensation accepted",
      "Right to challenge reserved",
      "Within limitation period"
    ],
    applicableSections: ["Section 18(2) of LAA 1894"],
    template: "REFERENCE_APPLICATION_UNDER_PROTEST",
    documents: [
      "Protest statement copy",
      "Receipt showing protest",
      "Award copy",
      "Application within time"
    ],
    successFactors: ["Protest documented", "Right reserved", "Timely filing"]
  },
  {
    id: 7,
    title: "Reference Application - Agricultural to Non-Agricultural",
    type: "reference",
    court: "Punjab and Haryana High Court",
    state: "Haryana",
    situation: "Land potential ignored - agricultural but suitable for development",
    scenario: "Agricultural land with high development potential near urban area. Award based only on agricultural value.",
    keyPoints: [
      "Development potential",
      "Location advantages",
      "Zoning changes",
      "Higher value justified"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23(1) of LAA 1894"],
    template: "REFERENCE_APPLICATION_POTENTIAL",
    documents: [
      "Location map",
      "Zoning certificates",
      "Development plans",
      "Comparable developed land sales"
    ],
    successFactors: ["Potential proven", "Location advantages", "Development value"]
  },
  {
    id: 8,
    title: "Reference Application - Expert Valuer Report",
    type: "reference",
    court: "Delhi High Court",
    state: "Delhi",
    situation: "Government-approved valuer report shows higher value",
    scenario: "Expert valuer appointed by government assessed higher market value than awarded amount.",
    keyPoints: [
      "Government-approved valuer",
      "Expert report",
      "Higher assessment",
      "Professional valuation"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_EXPERT_VALUER",
    documents: [
      "Expert valuer report",
      "Valuer credentials",
      "Valuation methodology",
      "Supporting documents"
    ],
    successFactors: ["Expert opinion", "Government approval", "Professional assessment"]
  },
  {
    id: 9,
    title: "Reference Application - Multiple Landowners Joint",
    type: "reference",
    court: "West Bengal High Court",
    state: "West Bengal",
    situation: "Joint family property with multiple claimants",
    scenario: "Large family property acquired. Multiple family members file joint reference application.",
    keyPoints: [
      "Joint family property",
      "Multiple claimants",
      "Unified application",
      "Consensus among owners"
    ],
    applicableSections: ["Section 18 of LAA 1894"],
    template: "REFERENCE_APPLICATION_JOINT",
    documents: [
      "Family tree",
      "Property documents",
      "Consent letters",
      "Power of attorney"
    ],
    successFactors: ["Unified approach", "All owners consent", "Proper documentation"]
  },
  {
    id: 10,
    title: "Reference Application - Infrastructure Project Impact",
    type: "reference",
    court: "Tamil Nadu High Court",
    state: "Tamil Nadu",
    situation: "Land acquired for highway - premium location value",
    scenario: "Land on highway alignment with commercial potential. Award doesn't reflect infrastructure impact value.",
    keyPoints: [
      "Highway proximity",
      "Commercial potential",
      "Infrastructure impact",
      "Premium location"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23(1) of LAA 1894"],
    template: "REFERENCE_APPLICATION_INFRASTRUCTURE",
    documents: [
      "Highway alignment map",
      "Commercial potential report",
      "Comparable highway land sales",
      "Infrastructure impact assessment"
    ],
    successFactors: ["Location premium", "Infrastructure benefit", "Commercial value"]
  },
  {
    id: 11,
    title: "Reference Application - RFCTLARR Act 2013 (Section 64)",
    type: "reference",
    court: "Kerala High Court",
    state: "Kerala",
    situation: "Acquisition under new 2013 Act",
    scenario: "Land acquired under Right to Fair Compensation Act 2013. Reference under Section 64.",
    keyPoints: [
      "2013 Act applicable",
      "Section 64 reference",
      "Higher compensation standards",
      "Rehabilitation benefits"
    ],
    applicableSections: ["Section 64 of RFCTLARR Act 2013"],
    template: "REFERENCE_APPLICATION_2013_ACT",
    documents: [
      "2013 Act notification",
      "Rehabilitation plan",
      "Compensation calculation",
      "Market value assessment"
    ],
    successFactors: ["2013 Act benefits", "Higher standards", "Rehabilitation rights"]
  },
  {
    id: 12,
    title: "Reference Application - Urban Development Project",
    type: "reference",
    court: "Karnataka High Court",
    state: "Karnataka",
    situation: "Land in urban area for development project",
    scenario: "Urban land acquired for smart city project. Award based on old rates, not current urban market value.",
    keyPoints: [
      "Urban location",
      "Development project",
      "Current market rates",
      "Urban premium"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_URBAN",
    documents: [
      "Urban development plan",
      "Current market rates",
      "Comparable urban sales",
      "Development potential"
    ],
    successFactors: ["Urban premium", "Current rates", "Development value"]
  },
  {
    id: 13,
    title: "Reference Application - Industrial Area Acquisition",
    type: "reference",
    court: "Gujarat High Court",
    state: "Gujarat",
    situation: "Land in industrial zone",
    scenario: "Land in notified industrial area acquired. Award doesn't reflect industrial zone premium.",
    keyPoints: [
      "Industrial zone",
      "Zone premium",
      "Industrial rates",
      "Development potential"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_INDUSTRIAL",
    documents: [
      "Industrial zone notification",
      "Zone classification",
      "Industrial land sales",
      "Premium calculation"
    ],
    successFactors: ["Zone premium", "Industrial rates", "Higher value"]
  },
  {
    id: 14,
    title: "Reference Application - Irrigation Project Impact",
    type: "reference",
    court: "Andhra Pradesh High Court",
    state: "Andhra Pradesh",
    situation: "Land near irrigation project",
    scenario: "Land acquired for irrigation project. Remaining land becomes more valuable due to irrigation.",
    keyPoints: [
      "Irrigation benefit",
      "Remaining land value",
      "Project impact",
      "Enhanced value"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_IRRIGATION",
    documents: [
      "Irrigation project details",
      "Remaining land assessment",
      "Value enhancement proof",
      "Comparable irrigated land"
    ],
    successFactors: ["Irrigation benefit", "Value enhancement", "Project impact"]
  },
  {
    id: 15,
    title: "Reference Application - Mining Area Acquisition",
    type: "reference",
    court: "Odisha High Court",
    state: "Odisha",
    situation: "Land with mineral resources",
    scenario: "Land acquired for mining project. Award doesn't account for mineral value or mining impact.",
    keyPoints: [
      "Mineral resources",
      "Mining value",
      "Resource premium",
      "Impact assessment"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_MINING",
    documents: [
      "Mineral survey report",
      "Mining lease details",
      "Resource valuation",
      "Impact assessment"
    ],
    successFactors: ["Mineral value", "Resource premium", "Mining impact"]
  },
  {
    id: 16,
    title: "Reference Application - Educational Institution",
    type: "reference",
    court: "Uttar Pradesh High Court",
    state: "Uttar Pradesh",
    situation: "Land for educational institution",
    scenario: "Land acquired for university/college. Award based on agricultural rates, not institutional land rates.",
    keyPoints: [
      "Educational use",
      "Institutional rates",
      "Higher value",
      "Public purpose"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_EDUCATIONAL",
    documents: [
      "Institution approval",
      "Institutional land rates",
      "Comparable sales",
      "Use classification"
    ],
    successFactors: ["Institutional rates", "Higher value", "Public purpose"]
  },
  {
    id: 17,
    title: "Reference Application - Hospital/Medical Facility",
    type: "reference",
    court: "Bihar High Court",
    state: "Bihar",
    situation: "Land for medical facility",
    scenario: "Land acquired for hospital. Award doesn't reflect commercial/institutional value of medical facility land.",
    keyPoints: [
      "Medical facility",
      "Institutional value",
      "Commercial potential",
      "Higher rates"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_MEDICAL",
    documents: [
      "Hospital approval",
      "Medical facility rates",
      "Comparable sales",
      "Commercial value"
    ],
    successFactors: ["Institutional value", "Commercial potential", "Higher rates"]
  },
  {
    id: 18,
    title: "Reference Application - Religious Institution",
    type: "reference",
    court: "Punjab and Haryana High Court",
    state: "Punjab",
    situation: "Temple/Gurudwara land acquisition",
    scenario: "Religious institution land acquired. Special considerations for religious property value.",
    keyPoints: [
      "Religious property",
      "Special value",
      "Religious significance",
      "Community impact"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_RELIGIOUS",
    documents: [
      "Religious institution registration",
      "Religious significance proof",
      "Community impact",
      "Special value assessment"
    ],
    successFactors: ["Religious value", "Special considerations", "Community impact"]
  },
  {
    id: 19,
    title: "Reference Application - Forest Land",
    type: "reference",
    court: "Himachal Pradesh High Court",
    state: "Himachal Pradesh",
    situation: "Forest land acquisition",
    scenario: "Forest land acquired for project. Environmental considerations and forest value not properly assessed.",
    keyPoints: [
      "Forest land",
      "Environmental value",
      "Forest clearance",
      "Ecological impact"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_FOREST",
    documents: [
      "Forest clearance certificate",
      "Environmental impact",
      "Forest value assessment",
      "Ecological report"
    ],
    successFactors: ["Environmental value", "Forest clearance", "Proper assessment"]
  },
  {
    id: 20,
    title: "Reference Application - Coastal Land",
    type: "reference",
    court: "Kerala High Court",
    state: "Kerala",
    situation: "Coastal land acquisition",
    scenario: "Coastal land acquired for port/beach development. Coastal premium and tourism value not considered.",
    keyPoints: [
      "Coastal location",
      "Tourism value",
      "Coastal premium",
      "Development potential"
    ],
    applicableSections: ["Section 18 of LAA 1894", "Section 23 of LAA 1894"],
    template: "REFERENCE_APPLICATION_COASTAL",
    documents: [
      "Coastal zone clearance",
      "Tourism potential",
      "Coastal land sales",
      "Development plans"
    ],
    successFactors: ["Coastal premium", "Tourism value", "Development potential"]
  },

  // APPEALS (Section 54) - 20 situations
  {
    id: 21,
    title: "First Appeal - Reference Court Rejection",
    type: "appeal",
    court: "Gujarat High Court",
    state: "Gujarat",
    situation: "Reference Court rejected enhancement claim",
    scenario: "Reference Court dismissed enhancement application. Appeal to High Court challenging rejection.",
    keyPoints: [
      "Reference Court rejection",
      "Grounds for appeal",
      "Error in judgment",
      "Merits of case"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_REFERENCE_REJECTION",
    documents: [
      "Reference Court judgment",
      "Grounds of appeal",
      "Evidence documents",
      "Error identification"
    ],
    successFactors: ["Strong grounds", "Error proven", "Merits clear"]
  },
  {
    id: 22,
    title: "First Appeal - Inadequate Enhancement",
    type: "appeal",
    court: "Madhya Pradesh High Court",
    state: "Madhya Pradesh",
    situation: "Reference Court granted enhancement but amount insufficient",
    scenario: "Reference Court enhanced compensation but amount still below market value. Appeal for further enhancement.",
    keyPoints: [
      "Enhancement granted",
      "Amount insufficient",
      "Further enhancement needed",
      "Market value higher"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_INADEQUATE_ENHANCEMENT",
    documents: [
      "Reference Court judgment",
      "Market value evidence",
      "Comparable sales",
      "Enhancement calculation"
    ],
    successFactors: ["Market value proven", "Insufficient amount", "Further enhancement justified"]
  },
  {
    id: 23,
    title: "First Appeal - Delay Condonation Rejection",
    type: "appeal",
    court: "Karnataka High Court",
    state: "Karnataka",
    situation: "Reference Court rejected delay condonation",
    scenario: "Reference Court rejected delay condonation application. Appeal seeking condonation of delay.",
    keyPoints: [
      "Delay condonation rejected",
      "Valid reasons for delay",
      "Liberal approach needed",
      "Substantive rights"
    ],
    applicableSections: ["Section 54 of LAA 1894", "Section 5 of Limitation Act"],
    template: "APPEAL_DELAY_CONDONATION",
    documents: [
      "Reference Court order",
      "Delay reasons",
      "Supporting documents",
      "Prejudice analysis"
    ],
    successFactors: ["Valid reasons", "No intentional delay", "Liberal approach"]
  },
  {
    id: 24,
    title: "First Appeal - Government Appeal Against Enhancement",
    type: "appeal",
    court: "Telangana High Court",
    state: "Telangana",
    situation: "Government appeals against Reference Court enhancement",
    scenario: "Reference Court enhanced compensation. Government appeals claiming enhancement excessive. Claimant defends enhancement.",
    keyPoints: [
      "Government appeal",
      "Defending enhancement",
      "Enhancement justified",
      "Market value correct"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_DEFEND_ENHANCEMENT",
    documents: [
      "Government appeal memo",
      "Enhancement justification",
      "Market value proof",
      "Defense arguments"
    ],
    successFactors: ["Enhancement justified", "Market value proven", "Strong defense"]
  },
  {
    id: 25,
    title: "First Appeal - Procedural Irregularity",
    type: "appeal",
    court: "Rajasthan High Court",
    state: "Rajasthan",
    situation: "Reference Court violated procedure",
    scenario: "Reference Court passed order without proper hearing or evidence consideration. Appeal on procedural grounds.",
    keyPoints: [
      "Procedural violation",
      "Natural justice",
      "Evidence not considered",
      "Hearing denied"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_PROCEDURAL",
    documents: [
      "Reference Court order",
      "Procedural violations",
      "Evidence list",
      "Hearing records"
    ],
    successFactors: ["Procedural error", "Natural justice", "Remand possible"]
  },
  {
    id: 26,
    title: "First Appeal - Comparable Evidence Ignored",
    type: "appeal",
    court: "Maharashtra High Court",
    state: "Maharashtra",
    situation: "Reference Court ignored strong comparable evidence",
    scenario: "Reference Court rejected strong comparable sale deeds without proper reasoning. Appeal challenging rejection.",
    keyPoints: [
      "Comparable evidence strong",
      "Improper rejection",
      "No reasoning",
      "Evidence valid"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_COMPARABLE_IGNORED",
    documents: [
      "Reference Court judgment",
      "Comparable sale deeds",
      "Evidence validity",
      "Rejection analysis"
    ],
    successFactors: ["Strong evidence", "Improper rejection", "Evidence valid"]
  },
  {
    id: 27,
    title: "First Appeal - Interest and Solatium",
    type: "appeal",
    court: "Punjab and Haryana High Court",
    state: "Punjab",
    situation: "Reference Court denied interest/solatium",
    scenario: "Reference Court enhanced compensation but denied statutory interest and solatium. Appeal for statutory benefits.",
    keyPoints: [
      "Statutory interest",
      "Solatium entitlement",
      "Statutory benefits",
      "Mandatory provisions"
    ],
    applicableSections: ["Section 54 of LAA 1894", "Section 23(2) of LAA 1894"],
    template: "APPEAL_STATUTORY_BENEFITS",
    documents: [
      "Reference Court order",
      "Statutory provisions",
      "Interest calculation",
      "Solatium calculation"
    ],
    successFactors: ["Statutory entitlement", "Mandatory benefits", "Clear provisions"]
  },
  {
    id: 28,
    title: "First Appeal - Multiple Landowners Dispute",
    type: "appeal",
    court: "West Bengal High Court",
    state: "West Bengal",
    situation: "Dispute among multiple landowners",
    scenario: "Reference Court apportioned compensation incorrectly among multiple landowners. Appeal for correct apportionment.",
    keyPoints: [
      "Multiple owners",
      "Apportionment dispute",
      "Correct shares",
      "Ownership proof"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_APPORTIONMENT",
    documents: [
      "Reference Court order",
      "Ownership documents",
      "Share calculations",
      "Apportionment proof"
    ],
    successFactors: ["Ownership clear", "Shares proven", "Correct apportionment"]
  },
  {
    id: 29,
    title: "First Appeal - Expert Evidence Rejected",
    type: "appeal",
    court: "Delhi High Court",
    state: "Delhi",
    situation: "Reference Court rejected expert valuer report",
    scenario: "Expert valuer report showing higher value rejected by Reference Court without valid reasons. Appeal challenging rejection.",
    keyPoints: [
      "Expert report rejected",
      "No valid reasons",
      "Expert qualified",
      "Report valid"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_EXPERT_REJECTED",
    documents: [
      "Reference Court judgment",
      "Expert report",
      "Expert credentials",
      "Rejection analysis"
    ],
    successFactors: ["Expert qualified", "Report valid", "Improper rejection"]
  },
  {
    id: 30,
    title: "First Appeal - Limitation Period Dispute",
    type: "appeal",
    court: "Tamil Nadu High Court",
    state: "Tamil Nadu",
    situation: "Reference Court dismissed on limitation grounds",
    scenario: "Reference Court dismissed application as time-barred. Appeal claiming application was within limitation period.",
    keyPoints: [
      "Limitation dispute",
      "Within time limit",
      "Date calculation",
      "Extension justified"
    ],
    applicableSections: ["Section 54 of LAA 1894", "Section 18(2) of LAA 1894"],
    template: "APPEAL_LIMITATION",
    documents: [
      "Reference Court order",
      "Date calculations",
      "Award date",
      "Application date"
    ],
    successFactors: ["Within limitation", "Date calculation correct", "Extension valid"]
  },
  {
    id: 31,
    title: "First Appeal - RFCTLARR Act 2013",
    type: "appeal",
    court: "Kerala High Court",
    state: "Kerala",
    situation: "Appeal under 2013 Act",
    scenario: "Reference under Section 64 of 2013 Act rejected. Appeal to High Court under Section 74.",
    keyPoints: [
      "2013 Act appeal",
      "Section 74 appeal",
      "Higher standards",
      "Rehabilitation benefits"
    ],
    applicableSections: ["Section 74 of RFCTLARR Act 2013"],
    template: "APPEAL_2013_ACT",
    documents: [
      "Reference Court judgment",
      "2013 Act provisions",
      "Rehabilitation plan",
      "Appeal grounds"
    ],
    successFactors: ["2013 Act benefits", "Higher standards", "Rehabilitation rights"]
  },
  {
    id: 32,
    title: "First Appeal - Interim Relief",
    type: "appeal",
    court: "Uttar Pradesh High Court",
    state: "Uttar Pradesh",
    situation: "Seeking interim relief during appeal",
    scenario: "Appeal filed. Seeking interim relief for payment of enhanced compensation or stay on possession.",
    keyPoints: [
      "Interim relief",
      "Payment pending",
      "Stay on possession",
      "Balance of convenience"
    ],
    applicableSections: ["Section 54 of LAA 1894", "Order 39 CPC"],
    template: "APPEAL_INTERIM_RELIEF",
    documents: [
      "Appeal memo",
      "Interim application",
      "Balance of convenience",
      "Irreparable loss"
    ],
    successFactors: ["Strong prima facie", "Balance of convenience", "Irreparable loss"]
  },
  {
    id: 33,
    title: "First Appeal - Cross Appeal",
    type: "appeal",
    court: "Bihar High Court",
    state: "Bihar",
    situation: "Both parties appeal",
    scenario: "Both claimant and government appeal against Reference Court order. Cross appeals filed.",
    keyPoints: [
      "Cross appeals",
      "Both parties",
      "Conflicting claims",
      "Consolidated hearing"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_CROSS",
    documents: [
      "Both appeal memos",
      "Conflicting claims",
      "Consolidation request",
      "Arguments"
    ],
    successFactors: ["Strong case", "Conflicting claims", "Consolidated hearing"]
  },
  {
    id: 34,
    title: "First Appeal - Additional Evidence",
    type: "appeal",
    court: "Odisha High Court",
    state: "Odisha",
    situation: "New evidence discovered after Reference Court order",
    scenario: "New comparable sale deeds or evidence discovered after Reference Court order. Appeal with additional evidence application.",
    keyPoints: [
      "New evidence",
      "After order",
      "Could not be produced earlier",
      "Relevant evidence"
    ],
    applicableSections: ["Section 54 of LAA 1894", "Order 41 Rule 27 CPC"],
    template: "APPEAL_ADDITIONAL_EVIDENCE",
    documents: [
      "New evidence",
      "Justification for delay",
      "Relevance proof",
      "Application"
    ],
    successFactors: ["New evidence", "Relevant", "Could not produce earlier"]
  },
  {
    id: 35,
    title: "First Appeal - Remand Request",
    type: "appeal",
    court: "Himachal Pradesh High Court",
    state: "Himachal Pradesh",
    situation: "Seeking remand for fresh consideration",
    scenario: "Reference Court order has errors. Appeal seeking remand to Reference Court for fresh consideration with proper procedure.",
    keyPoints: [
      "Remand request",
      "Errors in order",
      "Fresh consideration",
      "Proper procedure"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_REMAND",
    documents: [
      "Reference Court order",
      "Errors identified",
      "Remand grounds",
      "Fresh consideration needed"
    ],
    successFactors: ["Clear errors", "Remand justified", "Fresh consideration"]
  },
  {
    id: 36,
    title: "First Appeal - Constitutional Validity",
    type: "appeal",
    court: "Karnataka High Court",
    state: "Karnataka",
    situation: "Challenging constitutional validity",
    scenario: "Appeal challenging constitutional validity of acquisition or compensation provisions.",
    keyPoints: [
      "Constitutional challenge",
      "Fundamental rights",
      "Validity issue",
      "Constitutional provisions"
    ],
    applicableSections: ["Section 54 of LAA 1894", "Article 14, 21, 300A"],
    template: "APPEAL_CONSTITUTIONAL",
    documents: [
      "Constitutional provisions",
      "Violation proof",
      "Fundamental rights",
      "Validity challenge"
    ],
    successFactors: ["Constitutional violation", "Fundamental rights", "Validity issue"]
  },
  {
    id: 37,
    title: "First Appeal - Mandatory Provisions",
    type: "appeal",
    court: "Gujarat High Court",
    state: "Gujarat",
    situation: "Reference Court violated mandatory provisions",
    scenario: "Reference Court failed to follow mandatory provisions of Act. Appeal on violation of mandatory requirements.",
    keyPoints: [
      "Mandatory provisions",
      "Violation",
      "Non-compliance",
      "Statutory requirements"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_MANDATORY",
    documents: [
      "Reference Court order",
      "Mandatory provisions",
      "Violation proof",
      "Non-compliance"
    ],
    successFactors: ["Mandatory provisions", "Clear violation", "Non-compliance"]
  },
  {
    id: 38,
    title: "First Appeal - Calculation Error",
    type: "appeal",
    court: "Madhya Pradesh High Court",
    state: "Madhya Pradesh",
    situation: "Mathematical error in compensation calculation",
    scenario: "Reference Court made calculation error in compensation amount. Appeal for correction of calculation.",
    keyPoints: [
      "Calculation error",
      "Mathematical mistake",
      "Correct calculation",
      "Amount correction"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_CALCULATION",
    documents: [
      "Reference Court calculation",
      "Error identification",
      "Correct calculation",
      "Mathematical proof"
    ],
    successFactors: ["Clear error", "Correct calculation", "Mathematical proof"]
  },
  {
    id: 39,
    title: "First Appeal - Evidence Appreciation",
    type: "appeal",
    court: "Telangana High Court",
    state: "Telangana",
    situation: "Improper appreciation of evidence",
    scenario: "Reference Court improperly appreciated evidence leading to wrong conclusion. Appeal on evidence appreciation.",
    keyPoints: [
      "Evidence appreciation",
      "Improper assessment",
      "Wrong conclusion",
      "Correct appreciation"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_EVIDENCE_APPRECIATION",
    documents: [
      "Reference Court judgment",
      "Evidence analysis",
      "Improper appreciation",
      "Correct assessment"
    ],
    successFactors: ["Improper appreciation", "Correct assessment", "Evidence clear"]
  },
  {
    id: 40,
    title: "First Appeal - Jurisdiction Issue",
    type: "appeal",
    court: "Rajasthan High Court",
    state: "Rajasthan",
    situation: "Reference Court lacked jurisdiction",
    scenario: "Reference Court passed order without jurisdiction. Appeal challenging jurisdiction.",
    keyPoints: [
      "Jurisdiction issue",
      "Lack of jurisdiction",
      "Territorial jurisdiction",
      "Pecuniary jurisdiction"
    ],
    applicableSections: ["Section 54 of LAA 1894"],
    template: "APPEAL_JURISDICTION",
    documents: [
      "Reference Court order",
      "Jurisdiction proof",
      "Territorial limits",
      "Jurisdiction challenge"
    ],
    successFactors: ["Jurisdiction clear", "Lack proven", "Jurisdiction issue"]
  },

  // REVIEWS - 10 situations
  {
    id: 41,
    title: "Review Petition - Error Apparent on Face of Record",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "High Court judgment has error apparent",
    scenario: "High Court judgment has error apparent on face of record. Review petition seeking correction.",
    keyPoints: [
      "Error apparent",
      "Face of record",
      "Review grounds",
      "Correction needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC", "Article 137 Constitution"],
    template: "REVIEW_ERROR_APPARENT",
    documents: [
      "High Court judgment",
      "Error identification",
      "Review grounds",
      "Correction request"
    ],
    successFactors: ["Error apparent", "Face of record", "Clear error"]
  },
  {
    id: 42,
    title: "Review Petition - Discovery of New Evidence",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "New material evidence discovered",
    scenario: "New material evidence discovered after High Court judgment that could not be produced earlier.",
    keyPoints: [
      "New evidence",
      "Material evidence",
      "Could not produce",
      "Relevant evidence"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_NEW_EVIDENCE",
    documents: [
      "High Court judgment",
      "New evidence",
      "Justification",
      "Material relevance"
    ],
    successFactors: ["New evidence", "Material", "Could not produce"]
  },
  {
    id: 43,
    title: "Review Petition - Mistake in Judgment",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Mistake or error in judgment",
    scenario: "High Court judgment contains mistake or error that needs correction through review.",
    keyPoints: [
      "Mistake in judgment",
      "Error correction",
      "Review grounds",
      "Correction needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_MISTAKE",
    documents: [
      "High Court judgment",
      "Mistake identification",
      "Correct position",
      "Review application"
    ],
    successFactors: ["Clear mistake", "Error identified", "Correction clear"]
  },
  {
    id: 44,
    title: "Review Petition - Calculation Error",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Mathematical error in compensation",
    scenario: "High Court judgment has calculation error in compensation amount. Review for correction.",
    keyPoints: [
      "Calculation error",
      "Mathematical mistake",
      "Correct calculation",
      "Amount correction"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_CALCULATION",
    documents: [
      "High Court judgment",
      "Calculation error",
      "Correct calculation",
      "Mathematical proof"
    ],
    successFactors: ["Clear error", "Correct calculation", "Mathematical proof"]
  },
  {
    id: 45,
    title: "Review Petition - Procedural Error",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Procedural error in judgment",
    scenario: "High Court judgment passed with procedural error. Review seeking correction of procedural mistake.",
    keyPoints: [
      "Procedural error",
      "Process violation",
      "Natural justice",
      "Correction needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_PROCEDURAL",
    documents: [
      "High Court judgment",
      "Procedural error",
      "Process violation",
      "Correction request"
    ],
    successFactors: ["Procedural error", "Clear violation", "Correction needed"]
  },
  {
    id: 46,
    title: "Review Petition - Statutory Provision Overlooked",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Important statutory provision overlooked",
    scenario: "High Court overlooked important statutory provision affecting compensation. Review for consideration.",
    keyPoints: [
      "Statutory provision",
      "Overlooked",
      "Affects compensation",
      "Consideration needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_STATUTORY",
    documents: [
      "High Court judgment",
      "Statutory provision",
      "Overlooked proof",
      "Impact analysis"
    ],
    successFactors: ["Statutory provision", "Overlooked", "Affects case"]
  },
  {
    id: 47,
    title: "Review Petition - Precedent Not Considered",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Binding precedent not considered",
    scenario: "High Court did not consider binding Supreme Court precedent. Review for consideration of precedent.",
    keyPoints: [
      "Binding precedent",
      "Not considered",
      "Relevant precedent",
      "Consideration needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_PRECEDENT",
    documents: [
      "High Court judgment",
      "Precedent citation",
      "Relevance proof",
      "Binding nature"
    ],
    successFactors: ["Binding precedent", "Relevant", "Not considered"]
  },
  {
    id: 48,
    title: "Review Petition - Factual Error",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Factual error in judgment",
    scenario: "High Court judgment contains factual error affecting decision. Review for correction of facts.",
    keyPoints: [
      "Factual error",
      "Affects decision",
      "Correct facts",
      "Correction needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_FACTUAL",
    documents: [
      "High Court judgment",
      "Factual error",
      "Correct facts",
      "Impact analysis"
    ],
    successFactors: ["Factual error", "Affects decision", "Correct facts"]
  },
  {
    id: 49,
    title: "Review Petition - Interest Calculation",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Error in interest calculation",
    scenario: "High Court judgment has error in interest calculation. Review for correct interest computation.",
    keyPoints: [
      "Interest error",
      "Calculation mistake",
      "Correct interest",
      "Computation correction"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_INTEREST",
    documents: [
      "High Court judgment",
      "Interest calculation",
      "Error identification",
      "Correct calculation"
    ],
    successFactors: ["Interest error", "Correct calculation", "Clear mistake"]
  },
  {
    id: 50,
    title: "Review Petition - Solatium and Additional Benefits",
    type: "review",
    court: "Supreme Court of India",
    state: "All States",
    situation: "Error in solatium and additional benefits",
    scenario: "High Court judgment has error in solatium and additional benefits calculation. Review for correction.",
    keyPoints: [
      "Solatium error",
      "Additional benefits",
      "Calculation mistake",
      "Correction needed"
    ],
    applicableSections: ["Order 47 Rule 1 CPC"],
    template: "REVIEW_SOLATIUM",
    documents: [
      "High Court judgment",
      "Solatium calculation",
      "Additional benefits",
      "Correct computation"
    ],
    successFactors: ["Solatium error", "Correct calculation", "Benefits clear"]
  }
];

// Helper functions
export const getDraftsByType = (type: "reference" | "appeal" | "review"): LegalDraft[] => {
  return legalDrafts.filter(draft => draft.type === type);
};

export const getDraftsByCourt = (court: string): LegalDraft[] => {
  return legalDrafts.filter(draft => draft.court === court);
};

export const getDraftsByState = (state: string): LegalDraft[] => {
  return legalDrafts.filter(draft => draft.state === state);
};

export const getDraftById = (id: number): LegalDraft | undefined => {
  return legalDrafts.find(draft => draft.id === id);
};

export const searchDrafts = (query: string): LegalDraft[] => {
  const lowerQuery = query.toLowerCase();
  return legalDrafts.filter(draft =>
    draft.title.toLowerCase().includes(lowerQuery) ||
    draft.situation.toLowerCase().includes(lowerQuery) ||
    draft.scenario.toLowerCase().includes(lowerQuery) ||
    draft.court.toLowerCase().includes(lowerQuery) ||
    draft.state.toLowerCase().includes(lowerQuery) ||
    draft.keyPoints.some(point => point.toLowerCase().includes(lowerQuery))
  );
};
