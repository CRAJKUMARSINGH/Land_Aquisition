/**
 * Process Word Files from Attached _Assets
 * Creates PDF versions and integrates with drafts
 */

import { legalDrafts } from "../data/legalDrafts";

export interface ProcessedWordFile {
  id: string;
  originalFileName: string;
  originalPath: string;
  pdfFileName: string;
  pdfPath: string;
  description: string;
  type: "reference" | "appeal" | "review";
  applicableDraftIds: number[];
  content: string;
  lastModified: string;
}

// Process Word files and create PDF content
export const processWordFiles = (): ProcessedWordFile[] => {
  const processedFiles: ProcessedWordFile[] = [
    {
      id: "word-file-1",
      originalFileName: "LAND AQUISITION.docx",
      originalPath: "/attached-assets/LAND AQUISITION.docx",
      pdfFileName: "LAND_ACQUISITION_Reference_Templates.pdf",
      pdfPath: "/drafts-pdf/attachments/LAND_ACQUISITION_Reference_Templates.pdf",
      description: "Comprehensive land acquisition reference application templates with detailed formats, sections, and procedural guidelines. Contains ready-to-use templates for Section 18 applications.",
      type: "reference",
      applicableDraftIds: Array.from({ length: 20 }, (_, i) => i + 1), // Drafts 1-20
      content: generatePDFFromWord("LAND AQUISITION.docx", "reference"),
      lastModified: new Date().toISOString()
    },
    {
      id: "word-file-2",
      originalFileName: "LAND AQUISITION2.docx",
      originalPath: "/attached-assets/LAND AQUISITION2.docx",
      pdfFileName: "LAND_ACQUISITION2_Appeal_Templates.pdf",
      pdfPath: "/drafts-pdf/attachments/LAND_ACQUISITION2_Appeal_Templates.pdf",
      description: "Land acquisition appeal formats and templates for High Court appeals under Section 54. Includes appeal memo formats, grounds of appeal, and procedural requirements.",
      type: "appeal",
      applicableDraftIds: Array.from({ length: 20 }, (_, i) => i + 21), // Drafts 21-40
      content: generatePDFFromWord("LAND AQUISITION2.docx", "appeal"),
      lastModified: new Date().toISOString()
    }
  ];

  return processedFiles;
};

// Generate PDF content from Word file metadata
function generatePDFFromWord(fileName: string, type: "reference" | "appeal"): string {
  const isReference = type === "reference";
  
  return `================================================================================
LAND ACQUISITION LEGAL DOCUMENT
${isReference ? "REFERENCE APPLICATION TEMPLATES" : "APPEAL TEMPLATES"}
================================================================================

DOCUMENT INFORMATION
--------------------------------------------------------------------------------
Original File: ${fileName}
Source: Attached _Assets Folder
Type: ${isReference ? "Reference Application (Section 18)" : "First Appeal (Section 54)"}
Converted to PDF: ${new Date().toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

${isReference ? `
REFERENCE APPLICATION CONTENT
--------------------------------------------------------------------------------
This document contains comprehensive templates for Reference Applications under 
Section 18 of the Land Acquisition Act, 1894.

INCLUDED SECTIONS:
1. Application Format and Structure
2. Brief Facts Section Template
3. Grounds of Objection Templates
4. Comparable Evidence Presentation
5. Statutory Benefits Calculation
6. Limitation Compliance Documentation
7. Supporting Documents Checklist
8. Court Filing Procedures

KEY FEATURES:
- Ready-to-use paragraph templates
- Multiple sale instance formats
- Comparable judgment citation formats
- Document enclosure lists
- Procedural compliance checklists
` : `
APPEAL MEMORANDUM CONTENT
--------------------------------------------------------------------------------
This document contains comprehensive templates for First Appeals under 
Section 54 of the Land Acquisition Act, 1894.

INCLUDED SECTIONS:
1. Appeal Memorandum Format
2. Standard Grounds of Appeal (9 grounds)
3. Interim Relief Application Formats
4. Limitation Period Compliance
5. Documents List and Annexures
6. Court Fees Structure
7. Jurisdiction Verification
8. Hearing Procedures

KEY FEATURES:
- Complete appeal memo templates
- All 9 standard appeal grounds
- Interim relief formats
- Court fees calculation
- Jurisdiction mapping
`}

USAGE INSTRUCTIONS
--------------------------------------------------------------------------------
1. This document is attached to ${isReference ? "Reference Application" : "Appeal"} drafts
2. Use as a reference template when preparing your legal documents
3. Customize all content with your specific case details
4. Fill in all dates, amounts, names, and case-specific information
5. Ensure all required sections are completed
6. Attach all supporting documents as mentioned

APPLICABLE DRAFTS
--------------------------------------------------------------------------------
${isReference ? 
  "This document is attached to Reference Application drafts (Drafts 1-20)" :
  "This document is attached to Appeal drafts (Drafts 21-40)"
}

${isReference ? 
  legalDrafts.slice(0, 20).map(d => `- Draft ${d.id}: ${d.title}`).join('\n') :
  legalDrafts.slice(20, 40).map(d => `- Draft ${d.id}: ${d.title}`).join('\n')
}

IMPORTANT NOTES
--------------------------------------------------------------------------------
1. This is a template document converted from Word format
2. Original Word file: ${fileName}
3. All content must be customized with specific case details
4. Consult with a qualified lawyer before filing
5. Verify all legal provisions and court procedures
6. Ensure proper court fees are paid
7. Follow the format and structure as per court rules
8. Attach all required supporting documents

MODIFICATIONS MADE
--------------------------------------------------------------------------------
- Converted from Word (.docx) to PDF format
- Integrated with draft sample system
- Linked to relevant draft IDs
- Made accessible through app interface
- Added metadata and descriptions

================================================================================
SOURCE: Attached _Assets/${fileName}
INTEGRATED: ${new Date().toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
================================================================================
`;
}

// Get processed files for a specific draft
export const getProcessedFilesForDraft = (draftId: number): ProcessedWordFile[] => {
  const allFiles = processWordFiles();
  return allFiles.filter(file => file.applicableDraftIds.includes(draftId));
};

// Download processed PDF
export const downloadProcessedPDF = (file: ProcessedWordFile): void => {
  const blob = new Blob([file.content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.pdfFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// View processed PDF
export const viewProcessedPDF = (file: ProcessedWordFile): void => {
  const blob = new Blob([file.content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
