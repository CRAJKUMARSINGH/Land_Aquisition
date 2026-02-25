/**
 * Comprehensive Test Suite for Land Acquisition App
 * Tests all functionality programmatically
 */

import { successfulCases, rejectedCase, legalFormats, jurisdictionData, documentLibrary, searchFilters } from "../data/landAcquisitionData";
import { searchAll, filterByType, filterByState } from "./searchUtils";

export interface TestResult {
  testName: string;
  passed: boolean;
  message: string;
  details?: any;
}

export const runAllTests = (): TestResult[] => {
  const results: TestResult[] = [];

  // Test 1: Data Integrity
  results.push(testDataIntegrity());
  
  // Test 2: Search Functionality
  results.push(...testSearchFunctionality());
  
  // Test 3: Case Management
  results.push(...testCaseManagement());
  
  // Test 4: Document Library
  results.push(...testDocumentLibrary());
  
  // Test 5: Legal Formats
  results.push(...testLegalFormats());
  
  // Test 6: Jurisdiction Data
  results.push(...testJurisdictionData());
  
  // Test 7: Filters
  results.push(...testFilters());
  
  // Test 8: Search Utils
  results.push(...testSearchUtils());

  return results;
};

const testDataIntegrity = (): TestResult => {
  try {
    const hasSuccessfulCases = successfulCases && successfulCases.length > 0;
    const hasRejectedCase = rejectedCase && rejectedCase.id;
    const hasLegalFormats = legalFormats && Object.keys(legalFormats).length > 0;
    const hasJurisdictionData = jurisdictionData && Object.keys(jurisdictionData).length > 0;
    const hasDocumentLibrary = documentLibrary && Object.keys(documentLibrary).length > 0;

    const passed = hasSuccessfulCases && hasRejectedCase && hasLegalFormats && 
                   hasJurisdictionData && hasDocumentLibrary;

    return {
      testName: "Data Integrity Check",
      passed,
      message: passed 
        ? "All data structures are properly initialized"
        : "Some data structures are missing or empty",
      details: {
        successfulCases: hasSuccessfulCases,
        rejectedCase: hasRejectedCase,
        legalFormats: hasLegalFormats,
        jurisdictionData: hasJurisdictionData,
        documentLibrary: hasDocumentLibrary
      }
    };
  } catch (error: any) {
    return {
      testName: "Data Integrity Check",
      passed: false,
      message: `Error: ${error.message}`
    };
  }
};

const testSearchFunctionality = (): TestResult[] => {
  const results: TestResult[] = [];

  // Test search with valid query
  try {
    const searchResults = searchAll("Gujarat");
    results.push({
      testName: "Search - Valid Query",
      passed: searchResults.length > 0,
      message: searchResults.length > 0 
        ? `Found ${searchResults.length} results for "Gujarat"`
        : "No results found for valid query",
      details: { resultCount: searchResults.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Search - Valid Query",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  // Test search with empty query
  try {
    const searchResults = searchAll("");
    results.push({
      testName: "Search - Empty Query",
      passed: searchResults.length === 0,
      message: searchResults.length === 0
        ? "Empty query correctly returns no results"
        : "Empty query should return no results",
      details: { resultCount: searchResults.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Search - Empty Query",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  // Test search with case name
  try {
    const searchResults = searchAll("Kalabhai");
    results.push({
      testName: "Search - Case Name",
      passed: searchResults.length > 0 && searchResults.some(r => r.type === "case"),
      message: searchResults.length > 0
        ? `Found case: ${searchResults[0].title}`
        : "Should find case by name",
      details: { resultCount: searchResults.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Search - Case Name",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

const testCaseManagement = (): TestResult[] => {
  const results: TestResult[] = [];

  // Test successful cases structure
  try {
    const allValid = successfulCases.every(caseItem => 
      caseItem.id && caseItem.name && caseItem.state && caseItem.year && 
      caseItem.result && caseItem.status === "success"
    );
    results.push({
      testName: "Case Management - Successful Cases Structure",
      passed: allValid,
      message: allValid
        ? `All ${successfulCases.length} successful cases have valid structure`
        : "Some successful cases have missing required fields",
      details: { caseCount: successfulCases.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Case Management - Successful Cases Structure",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  // Test rejected case structure
  try {
    const rejectedValid = rejectedCase.id && rejectedCase.name && 
                          rejectedCase.status === "rejected" && rejectedCase.reason;
    results.push({
      testName: "Case Management - Rejected Case Structure",
      passed: rejectedValid,
      message: rejectedValid
        ? "Rejected case has valid structure"
        : "Rejected case missing required fields"
    });
  } catch (error: any) {
    results.push({
      testName: "Case Management - Rejected Case Structure",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  // Test case filtering by state
  try {
    const gujaratCases = successfulCases.filter(c => c.state === "Gujarat");
    results.push({
      testName: "Case Management - Filter by State",
      passed: gujaratCases.length > 0,
      message: gujaratCases.length > 0
        ? `Found ${gujaratCases.length} Gujarat cases`
        : "Should find cases by state",
      details: { caseCount: gujaratCases.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Case Management - Filter by State",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

const testDocumentLibrary = (): TestResult[] => {
  const results: TestResult[] = [];

  try {
    const documents = Object.values(documentLibrary);
    const allValid = documents.every(doc => 
      doc.title && doc.size && doc.readTime && doc.description && doc.path
    );
    results.push({
      testName: "Document Library - Structure",
      passed: allValid,
      message: allValid
        ? `All ${documents.length} documents have valid structure`
        : "Some documents missing required fields",
      details: { documentCount: documents.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Document Library - Structure",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

const testLegalFormats = (): TestResult[] => {
  const results: TestResult[] = [];

  try {
    const formats = Object.values(legalFormats);
    const allValid = formats.every(format => 
      format.title && format.description && 
      format.sections && format.sections.length > 0 &&
      format.keyFeatures && format.keyFeatures.length > 0
    );
    results.push({
      testName: "Legal Formats - Structure",
      passed: allValid,
      message: allValid
        ? `All ${formats.length} legal formats have valid structure`
        : "Some legal formats missing required fields",
      details: { formatCount: formats.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Legal Formats - Structure",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  // Test Section 18 format
  try {
    const section18 = legalFormats.section18;
    const hasSections = section18.sections.length >= 5;
    results.push({
      testName: "Legal Formats - Section 18",
      passed: hasSections,
      message: hasSections
        ? `Section 18 has ${section18.sections.length} sections`
        : "Section 18 should have at least 5 sections",
      details: { sectionCount: section18.sections.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Legal Formats - Section 18",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

const testJurisdictionData = (): TestResult[] => {
  const results: TestResult[] = [];

  try {
    const states = Object.keys(jurisdictionData);
    const allValid = states.every(state => {
      const data = jurisdictionData[state as keyof typeof jurisdictionData];
      return data.highCourt && data.bench && 
             data.districts && data.districts.length > 0 && 
             data.filingFees;
    });
    results.push({
      testName: "Jurisdiction Data - Structure",
      passed: allValid,
      message: allValid
        ? `All ${states.length} states have valid jurisdiction data`
        : "Some states missing required jurisdiction fields",
      details: { stateCount: states.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Jurisdiction Data - Structure",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

const testFilters = (): TestResult[] => {
  const results: TestResult[] = [];

  try {
    const hasStates = searchFilters.states && searchFilters.states.length > 0;
    const hasYears = searchFilters.years && searchFilters.years.length > 0;
    const hasResults = searchFilters.results && searchFilters.results.length > 0;
    const hasCompensation = searchFilters.compensation && searchFilters.compensation.length > 0;

    results.push({
      testName: "Search Filters - Availability",
      passed: hasStates && hasYears && hasResults && hasCompensation,
      message: hasStates && hasYears && hasResults && hasCompensation
        ? "All filter types are available"
        : "Some filter types are missing",
      details: {
        states: hasStates,
        years: hasYears,
        results: hasResults,
        compensation: hasCompensation
      }
    });
  } catch (error: any) {
    results.push({
      testName: "Search Filters - Availability",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

const testSearchUtils = (): TestResult[] => {
  const results: TestResult[] = [];

  // Test filterByType
  try {
    const searchResults = searchAll("Gujarat");
    const caseResults = filterByType(searchResults, "case");
    results.push({
      testName: "Search Utils - Filter by Type",
      passed: caseResults.every(r => r.type === "case"),
      message: caseResults.every(r => r.type === "case")
        ? `Filtered ${caseResults.length} case results`
        : "Filter by type not working correctly",
      details: { filteredCount: caseResults.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Search Utils - Filter by Type",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  // Test filterByState
  try {
    const searchResults = searchAll("Gujarat");
    const stateResults = filterByState(searchResults, "Gujarat");
    results.push({
      testName: "Search Utils - Filter by State",
      passed: stateResults.length > 0,
      message: stateResults.length > 0
        ? `Filtered ${stateResults.length} Gujarat results`
        : "Filter by state not working correctly",
      details: { filteredCount: stateResults.length }
    });
  } catch (error: any) {
    results.push({
      testName: "Search Utils - Filter by State",
      passed: false,
      message: `Error: ${error.message}`
    });
  }

  return results;
};

// Export test runner
export const runTests = () => {
  console.log("🧪 Running Comprehensive Test Suite...\n");
  const results = runAllTests();
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${results.length}\n`);
  
  results.forEach(result => {
    const icon = result.passed ? "✅" : "❌";
    console.log(`${icon} ${result.testName}: ${result.message}`);
    if (result.details) {
      console.log(`   Details:`, result.details);
    }
  });
  
  return results;
};
