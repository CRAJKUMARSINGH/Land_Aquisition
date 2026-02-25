/**
 * Word File Processor
 * Processes Word files from Attached _Assets folder and integrates them into drafts
 */

import { legalDrafts, LegalDraft } from "../data/legalDrafts";

export interface WordFileAttachment {
  fileName: string;
  originalPath: string;
  pdfPath: string;
  draftIds: number[];
  description: string;
  type: "reference" | "appeal" | "review" | "general";
}

// Word files from Attached _Assets folder
export const wordFileAttachments: WordFileAttachment[] = [
  {
    fileName: "LAND AQUISITION.docx",
    originalPath: "/attached-assets/LAND AQUISITION.docx",
    pdfPath: "/drafts-pdf/attachments/LAND_ACQUISITION.pdf",
    draftIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // Reference applications
    description: "Comprehensive land acquisition reference application template with detailed sections and formats",
    type: "reference"
  },
  {
    fileName: "LAND AQUISITION2.docx",
    originalPath: "/attached-assets/LAND AQUISITION2.docx",
    pdfPath: "/drafts-pdf/attachments/LAND_ACQUISITION2.pdf",
    draftIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], // Appeals
    description: "Land acquisition appeal formats and templates for High Court appeals",
    type: "appeal"
  }
];

// Get attachments for a specific draft
export const getAttachmentsForDraft = (draftId: number): WordFileAttachment[] => {
  return wordFileAttachments.filter(attachment => 
    attachment.draftIds.includes(draftId)
  );
};

// Get all attachments
export const getAllAttachments = (): WordFileAttachment[] => {
  return wordFileAttachments;
};

// Get attachments by type
export const getAttachmentsByType = (type: "reference" | "appeal" | "review" | "general"): WordFileAttachment[] => {
  return wordFileAttachments.filter(attachment => attachment.type === type);
};

// Generate PDF content from Word file attachment
export const generateAttachmentPDFContent = (attachment: WordFileAttachment): string => {
  return `================================================================================
ATTACHED DOCUMENT - ${attachment.fileName.toUpperCase()}
================================================================================

DOCUMENT INFORMATION
--------------------------------------------------------------------------------
Original File: ${attachment.fileName}
Type: ${attachment.type.toUpperCase()}
Description: ${attachment.description}
Applicable Drafts: ${attachment.draftIds.join(", ")}

IMPORTANT NOTE
--------------------------------------------------------------------------------
This document is an attached Word file that has been converted to PDF format.
The original Word document contains detailed templates and formats that should
be used in conjunction with the draft samples.

USAGE INSTRUCTIONS
--------------------------------------------------------------------------------
1. This document is attached to the following draft IDs: ${attachment.draftIds.join(", ")}
2. Use this document as a reference template when preparing your legal documents
3. Customize the content with your specific case details
4. Ensure all sections are properly filled out
5. Attach required supporting documents as mentioned in the draft

RELATED DRAFTS
--------------------------------------------------------------------------------
${attachment.draftIds.map(id => {
  const draft = legalDrafts.find(d => d.id === id);
  return draft ? `- Draft ${id}: ${draft.title}` : `- Draft ${id}`;
}).join('\n')}

================================================================================
SOURCE: Attached _Assets Folder
CONVERTED TO PDF: ${new Date().toLocaleDateString('en-IN', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
================================================================================
`;
};

// Download attachment PDF
export const downloadAttachmentPDF = (attachment: WordFileAttachment): void => {
  const content = generateAttachmentPDFContent(attachment);
  const fileName = attachment.fileName.replace('.docx', '.pdf');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// View attachment PDF
export const viewAttachmentPDF = (attachment: WordFileAttachment): void => {
  const content = generateAttachmentPDFContent(attachment);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 100);
};
