import { successfulCases, rejectedCase, legalFormats, jurisdictionData, documentLibrary } from "../data/landAcquisitionData";

export interface SearchResult {
  type: "case" | "document" | "format" | "jurisdiction";
  title: string;
  description: string;
  data: any;
  relevance: number;
}

export const searchAll = (query: string): SearchResult[] => {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return results;

  // Search cases
  const allCases = [...successfulCases, rejectedCase];
  allCases.forEach((caseItem) => {
    const relevance = calculateRelevance(caseItem, lowerQuery, [
      caseItem.name,
      caseItem.state,
      caseItem.result,
      caseItem.compensation,
      ...caseItem.keyPoints,
    ]);
    if (relevance > 0) {
      results.push({
        type: "case",
        title: caseItem.name,
        description: `${caseItem.state} - ${caseItem.result}`,
        data: caseItem,
        relevance,
      });
    }
  });

  // Search documents
  Object.entries(documentLibrary).forEach(([key, doc]) => {
    const relevance = calculateRelevance(doc, lowerQuery, [
      doc.title,
      doc.description,
    ]);
    if (relevance > 0) {
      results.push({
        type: "document",
        title: doc.title,
        description: doc.description,
        data: doc,
        relevance,
      });
    }
  });

  // Search formats
  Object.entries(legalFormats).forEach(([key, format]) => {
    const relevance = calculateRelevance(format, lowerQuery, [
      format.title,
      format.description,
      ...format.sections,
      ...format.keyFeatures,
    ]);
    if (relevance > 0) {
      results.push({
        type: "format",
        title: format.title,
        description: format.description,
        data: format,
        relevance,
      });
    }
  });

  // Search jurisdictions
  Object.entries(jurisdictionData).forEach(([state, data]) => {
    const relevance = calculateRelevance(data, lowerQuery, [
      state,
      data.highCourt,
      data.bench,
      ...data.districts,
    ]);
    if (relevance > 0) {
      results.push({
        type: "jurisdiction",
        title: `${state} - ${data.highCourt}`,
        description: `Principal Bench: ${data.bench}`,
        data: { state, ...data },
        relevance,
      });
    }
  });

  // Sort by relevance
  return results.sort((a, b) => b.relevance - a.relevance);
};

const calculateRelevance = (item: any, query: string, fields: string[]): number => {
  let relevance = 0;
  const queryWords = query.split(/\s+/);

  fields.forEach((field, index) => {
    const lowerField = field.toLowerCase();
    queryWords.forEach((word) => {
      if (lowerField.includes(word)) {
        // Exact match gets higher score
        if (lowerField === word) {
          relevance += 10;
        } else if (lowerField.startsWith(word)) {
          relevance += 5;
        } else {
          relevance += 2;
        }
        // First field (usually title) gets bonus
        if (index === 0) {
          relevance += 3;
        }
      }
    });
  });

  return relevance;
};

export const filterByType = (results: SearchResult[], type: SearchResult["type"]) => {
  return results.filter((r) => r.type === type);
};

export const filterByState = (results: SearchResult[], state: string) => {
  return results.filter((r) => {
    if (r.type === "case") {
      return r.data.state === state;
    }
    if (r.type === "jurisdiction") {
      return r.data.state === state;
    }
    return false;
  });
};
