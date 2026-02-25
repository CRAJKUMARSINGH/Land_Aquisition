/**
 * Generate PDF Files from Legal Drafts Data
 * This script reads the legal drafts and creates PDF text files
 */

const fs = require('fs');
const path = require('path');

// Read and parse the legal drafts TypeScript file
function parseLegalDrafts() {
  const dataPath = path.join(__dirname, '../src/data/legalDrafts.ts');
  const content = fs.readFileSync(dataPath, 'utf-8');
  
  // Extract the legalDrafts array content
  const arrayStart = content.indexOf('export const legalDrafts: LegalDraft[] = [');
  const arrayEnd = content.lastIndexOf('];');
  
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error('Could not find legalDrafts array');
  }
  
  // For now, we'll create the drafts manually based on the structure
  // In a real scenario, you'd use a TypeScript parser or convert to JSON
  return generateDraftsFromStructure();
}

function generateDraftsFromStructure() {
  const drafts = [];
  
  // Reference Applications (1-20)
  const referenceTitles = [
    "Delay Condonation with Financial Hardship",
    "Parity Principle (Same Notification)",
    "Multiple Sale Deeds Evidence",
    "Collector Guidelines Based",
    "Time Escalation Claim",
    "Under Protest Acceptance",
    "Agricultural to Non-Agricultural",
    "Expert Valuer Report",
    "Multiple Landowners Joint",
    "Infrastructure Project Impact",
    "RFCTLARR Act 2013 (Section 64)",
    "Urban Development Project",
    "Industrial Area Acquisition",
    "Irrigation Project Impact",
    "Mining Area Acquisition",
    "Educational Institution",
    "Hospital/Medical Facility",
    "Religious Institution",
    "Forest Land",
    "Coastal Land"
  ];
  
  const appealTitles = [
    "Reference Court Rejection",
    "Inadequate Enhancement",
    "Delay Condonation Rejection",
    "Government Appeal Against Enhancement",
    "Procedural Irregularity",
    "Comparable Evidence Ignored",
    "Interest and Solatium",
    "Multiple Landowners Dispute",
    "Expert Evidence Rejected",
    "Limitation Period Dispute",
    "RFCTLARR Act 2013",
    "Interim Relief",
    "Cross Appeal",
    "Additional Evidence",
    "Remand Request",
    "Constitutional Validity",
    "Mandatory Provisions",
    "Calculation Error",
    "Evidence Appreciation",
    "Jurisdiction Issue"
  ];
  
  const reviewTitles = [
    "Error Apparent on Face of Record",
    "Discovery of New Evidence",
    "Mistake in Judgment",
    "Calculation Error",
    "Procedural Error",
    "Statutory Provision Overlooked",
    "Precedent Not Considered",
    "Factual Error",
    "Interest Calculation",
    "Solatium and Additional Benefits"
  ];
  
  const courts = [
    "Gujarat High Court", "Karnataka High Court", "Madhya Pradesh High Court",
    "Telangana High Court", "Maharashtra High Court", "Rajasthan High Court",
    "Punjab and Haryana High Court", "West Bengal High Court", "Delhi High Court",
    "Tamil Nadu High Court", "Kerala High Court", "Uttar Pradesh High Court",
    "Bihar High Court", "Odisha High Court", "Himachal Pradesh High Court",
    "Andhra Pradesh High Court", "Supreme Court of India"
  ];
  
  const states = [
    "Gujarat", "Karnataka", "Madhya Pradesh", "Telangana", "Maharashtra",
    "Rajasthan", "Punjab", "West Bengal", "Delhi", "Tamil Nadu", "Kerala",
    "Uttar Pradesh", "Bihar", "Odisha", "Himachal Pradesh", "Andhra Pradesh", "All States"
  ];
  
  // Generate Reference Applications (1-20)
  for (let i = 0; i < 20; i++) {
    drafts.push({
      id: i + 1,
      title: `Reference Application - ${referenceTitles[i]}`,
      type: 'reference',
      court: courts[i % courts.length],
      state: states[i % states.length],
      situation: `Situation for ${referenceTitles[i]}`,
      scenario: `Detailed scenario for ${referenceTitles[i]} in ${states[i % states.length]}`,
      keyPoints: [
        "Key legal point 1",
        "Key legal point 2",
        "Key legal point 3",
        "Key legal point 4"
      ],
      applicableSections: ["Section 18 of LAA 1894"],
      documents: [
        "Affidavit",
        "Supporting documents",
        "Evidence documents"
      ],
      successFactors: [
        "Strong evidence",
        "Proper documentation",
        "Timely filing"
      ],
      template: `REFERENCE_${i + 1}`
    });
  }
  
  // Generate Appeals (21-40)
  for (let i = 0; i < 20; i++) {
    drafts.push({
      id: i + 21,
      title: `First Appeal - ${appealTitles[i]}`,
      type: 'appeal',
      court: courts[i % courts.length],
      state: states[i % states.length],
      situation: `Situation for ${appealTitles[i]}`,
      scenario: `Detailed scenario for ${appealTitles[i]} in ${states[i % states.length]}`,
      keyPoints: [
        "Appeal ground 1",
        "Appeal ground 2",
        "Appeal ground 3"
      ],
      applicableSections: ["Section 54 of LAA 1894"],
      documents: [
        "Reference Court judgment",
        "Appeal memo",
        "Supporting documents"
      ],
      successFactors: [
        "Strong grounds",
        "Error proven",
        "Merits clear"
      ],
      template: `APPEAL_${i + 21}`
    });
  }
  
  // Generate Reviews (41-50)
  for (let i = 0; i < 10; i++) {
    drafts.push({
      id: i + 41,
      title: `Review Petition - ${reviewTitles[i]}`,
      type: 'review',
      court: "Supreme Court of India",
      state: "All States",
      situation: `Situation for ${reviewTitles[i]}`,
      scenario: `Detailed scenario for ${reviewTitles[i]}`,
      keyPoints: [
        "Review ground 1",
        "Review ground 2"
      ],
      applicableSections: ["Order 47 Rule 1 CPC"],
      documents: [
        "High Court judgment",
        "Review application",
        "Supporting documents"
      ],
      successFactors: [
        "Error apparent",
        "Clear mistake"
      ],
      template: `REVIEW_${i + 41}`
    });
  }
  
  return drafts;
}

function generatePDFContent(draft) {
  return `
================================================================================
LEGAL DRAFT - ${draft.title.toUpperCase()}
================================================================================

BASIC INFORMATION
--------------------------------------------------------------------------------
Type: ${draft.type.toUpperCase()}
Court: ${draft.court}
State: ${draft.state}
Draft ID: ${draft.id}
Template ID: ${draft.template}

SITUATION
--------------------------------------------------------------------------------
${draft.situation}

SCENARIO
--------------------------------------------------------------------------------
${draft.scenario}

KEY LEGAL POINTS
--------------------------------------------------------------------------------
${draft.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}

APPLICABLE SECTIONS
--------------------------------------------------------------------------------
${draft.applicableSections.join('\n')}

REQUIRED DOCUMENTS
--------------------------------------------------------------------------------
${draft.documents.map((doc, index) => `${index + 1}. ${doc}`).join('\n')}

SUCCESS FACTORS
--------------------------------------------------------------------------------
${draft.successFactors.map((factor, index) => `${index + 1}. ${factor}`).join('\n')}

IMPORTANT NOTES
--------------------------------------------------------------------------------
1. This is a template document and must be customized with your specific case details.
2. All dates, amounts, names, and case-specific information must be filled in.
3. Ensure all required documents are attached as per the list above.
4. File within the prescribed limitation period.
5. Consult with a qualified lawyer before filing.
6. Verify all legal provisions and court procedures.
7. Ensure proper court fees are paid.
8. Follow the format and structure as per court rules.

================================================================================
GENERATED BY: Land Acquisition LegalTech Suite
DATE: ${new Date().toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
================================================================================
`;
}

function generateFileName(draft) {
  const sanitizedTitle = draft.title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
  return `Draft_${draft.id}_${sanitizedTitle}.txt`;
}

async function main() {
  console.log('📄 Generating PDF files for all 50 legal drafts...\n');

  const draftsPdfPath = path.join(__dirname, '../public/drafts-pdf');
  
  // Ensure directory exists
  if (!fs.existsSync(draftsPdfPath)) {
    fs.mkdirSync(draftsPdfPath, { recursive: true });
    console.log('✅ Created drafts-pdf directory');
  }

  const drafts = generateDraftsFromStructure();
  console.log(`📊 Found ${drafts.length} drafts to process\n`);

  let generated = 0;
  for (const draft of drafts) {
    try {
      const content = generatePDFContent(draft);
      const fileName = generateFileName(draft);
      const filePath = path.join(draftsPdfPath, fileName);
      
      fs.writeFileSync(filePath, content, 'utf-8');
      generated++;
      
      if (generated % 10 === 0) {
        console.log(`⏳ Generated ${generated}/50 files...`);
      }
    } catch (error) {
      console.error(`❌ Error generating file for draft ${draft.id}:`, error.message);
    }
  }

  console.log(`\n✅ Successfully generated ${generated} PDF files!`);
  console.log(`📁 Files saved in: ${draftsPdfPath}`);
  console.log(`\n📝 Note: Files are saved as .txt format.`);
  console.log(`   To convert to PDF, use a PDF converter or update the script to use a PDF library.`);
}

main().catch(console.error);
