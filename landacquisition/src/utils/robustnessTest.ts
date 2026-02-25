/**
 * Comprehensive Robustness Test Suite
 * Simulates 1500 users (500 beginner, 500 intermediate, 500 advanced)
 * Each user randomly visits 90% of lessons/subjects
 * Tests all functionality programmatically
 */

import { successfulCases, rejectedCase, legalFormats, jurisdictionData, documentLibrary, searchFilters } from "../data/landAcquisitionData";
import { searchAll, filterByType, filterByState } from "./searchUtils";

export interface User {
  id: number;
  type: "beginner" | "intermediate" | "advanced" | "lawyer";
  visitedPages: Set<string>;
  actions: UserAction[];
  errors: TestError[];
}

export interface UserAction {
  timestamp: number;
  action: string;
  page: string;
  success: boolean;
  details?: any;
}

export interface TestError {
  user: number;
  action: string;
  error: string;
  page: string;
  timestamp: number;
}

export interface TestResult {
  totalUsers: number;
  totalActions: number;
  successfulActions: number;
  failedActions: number;
  successRate: number;
  errors: TestError[];
  pageVisits: Map<string, number>;
  userTypeStats: {
    beginner: { total: number; success: number; failed: number };
    intermediate: { total: number; success: number; failed: number };
    advanced: { total: number; success: number; failed: number };
  };
  testDuration: number;
}

// All available pages/routes
const ALL_PAGES = [
  "/",
  "/legal-research",
  "/case-management",
  "/document-drafting",
  "/jurisdiction-guide",
  "/risk-analysis"
];

// All available subjects/lessons
const ALL_SUBJECTS = [
  "cases",
  "documents",
  "formats",
  "jurisdictions",
  "risks",
  "search"
];

// Search queries for different user types
const BEGINNER_QUERIES = [
  "land acquisition",
  "compensation",
  "Gujarat",
  "how to file",
  "what is section 18",
  "court",
  "appeal",
  "delay",
  "successful cases"
];

const INTERMEDIATE_QUERIES = [
  "parity principle",
  "comparable evidence",
  "reference court",
  "enhancement",
  "section 54",
  "high court",
  "filing fees",
  "limitation period",
  "market value"
];

const ADVANCED_QUERIES = [
  "RFCTLARR Act 2013",
  "Section 64 application",
  "delay condonation",
  "fence-sitting behavior",
  "collector guidelines",
  "time escalation",
  "interim relief",
  "special leave petition",
  "substantive rights"
];

class RobustnessTester {
  private users: User[] = [];
  private startTime: number = 0;
  private endTime: number = 0;
  private baseUrl: string = "";

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  // Lightweight simulation specifically for 151 lawyer users visiting ~95% of content
  public async runLawyerSimulation(): Promise<TestResult> {
    console.log("🚀 Starting Lawyer Simulation Test...");
    console.log("👩‍⚖️ 151 virtual lawyers, each visiting ~95% of pages and subjects\n");

    this.startTime = Date.now();
    this.users = [];

    for (let i = 1; i <= 151; i++) {
      this.users.push({
        id: i,
        type: "lawyer",
        visitedPages: new Set(),
        actions: [],
        errors: []
      });
    }

    const pagesToVisit = Math.ceil(ALL_PAGES.length * 0.95);
    const subjectsToVisit = Math.ceil(ALL_SUBJECTS.length * 0.95);

    const total = this.users.length;
    let completed = 0;

    for (const user of this.users) {
      // Shuffle pages and subjects per user for randomness
      const shuffledPages = [...ALL_PAGES].sort(() => Math.random() - 0.5);
      const shuffledSubjects = [...ALL_SUBJECTS].sort(() => Math.random() - 0.5);

      for (let i = 0; i < pagesToVisit; i++) {
        const page = shuffledPages[i];
        this.simulatePageVisit(user, page);

        // Lawyers behave like advanced users: search + filter with high probability
        if (Math.random() > 0.2) {
          this.simulateSearch(user, this.getRandomQuery(user));
        }
        if (Math.random() > 0.3) {
          this.simulateFilter(user, page);
        }
      }

      for (let i = 0; i < subjectsToVisit; i++) {
        const subject = shuffledSubjects[i];
        this.simulateDataAccess(user, subject);
      }

      completed++;
      if (completed % 25 === 0 || completed === total) {
        console.log(`⏳ Lawyer Simulation Progress: ${completed}/${total} users tested (${Math.round((completed / total) * 100)}%)`);
      }
    }

    this.endTime = Date.now();

    const allActions = this.users.flatMap(u => u.actions);
    const successfulActions = allActions.filter(a => a.success).length;
    const failedActions = allActions.filter(a => !a.success).length;
    const allErrors = this.users.flatMap(u => u.errors);

    const pageVisits = new Map<string, number>();
    this.users.forEach(user => {
      user.visitedPages.forEach(page => {
        pageVisits.set(page, (pageVisits.get(page) || 0) + 1);
      });
    });

    const result: TestResult = {
      totalUsers: this.users.length,
      totalActions: allActions.length,
      successfulActions,
      failedActions,
      successRate: allActions.length ? (successfulActions / allActions.length) * 100 : 0,
      errors: allErrors,
      pageVisits,
      userTypeStats: {
        beginner: { total: 0, success: 0, failed: 0 },
        intermediate: { total: 0, success: 0, failed: 0 },
        advanced: { total: 0, success: 0, failed: 0 }
      },
      testDuration: this.endTime - this.startTime
    };

    return result;
  }

  // Initialize users
  private initializeUsers(): void {
    this.users = [];
    
    // Create 500 beginner users
    for (let i = 1; i <= 500; i++) {
      this.users.push({
        id: i,
        type: "beginner",
        visitedPages: new Set(),
        actions: [],
        errors: []
      });
    }

    // Create 500 intermediate users
    for (let i = 501; i <= 1000; i++) {
      this.users.push({
        id: i,
        type: "intermediate",
        visitedPages: new Set(),
        actions: [],
        errors: []
      });
    }

    // Create 500 advanced users
    for (let i = 1001; i <= 1500; i++) {
      this.users.push({
        id: i,
        type: "advanced",
        visitedPages: new Set(),
        actions: [],
        errors: []
      });
    }
  }

  // Get random query based on user type
  private getRandomQuery(user: User): string {
    let queries: string[];
    switch (user.type) {
      case "beginner":
        queries = BEGINNER_QUERIES;
        break;
      case "intermediate":
        queries = INTERMEDIATE_QUERIES;
        break;
      case "advanced":
        queries = ADVANCED_QUERIES;
        break;
    }
    return queries[Math.floor(Math.random() * queries.length)];
  }

  // Simulate page visit
  private simulatePageVisit(user: User, page: string): boolean {
    try {
      // Test page data availability
      switch (page) {
        case "/":
          // Home page - test stats and features
          if (!successfulCases || successfulCases.length === 0) throw new Error("No successful cases");
          if (!documentLibrary || Object.keys(documentLibrary).length === 0) throw new Error("No documents");
          break;
        
        case "/legal-research":
          // Legal Research - test documents
          const docs = Object.values(documentLibrary);
          if (docs.length === 0) throw new Error("No documents available");
          docs.forEach(doc => {
            if (!doc.title || !doc.description) throw new Error("Invalid document structure");
          });
          break;
        
        case "/case-management":
          // Case Management - test cases
          if (successfulCases.length === 0) throw new Error("No successful cases");
          if (!rejectedCase || !rejectedCase.id) throw new Error("No rejected case");
          successfulCases.forEach(caseItem => {
            if (!caseItem.id || !caseItem.name || !caseItem.state) {
              throw new Error("Invalid case structure");
            }
          });
          break;
        
        case "/document-drafting":
          // Document Drafting - test formats
          const formats = Object.values(legalFormats);
          if (formats.length === 0) throw new Error("No legal formats");
          formats.forEach(format => {
            if (!format.title || !format.sections || format.sections.length === 0) {
              throw new Error("Invalid format structure");
            }
          });
          break;
        
        case "/jurisdiction-guide":
          // Jurisdiction Guide - test jurisdiction data
          const states = Object.keys(jurisdictionData);
          if (states.length === 0) throw new Error("No jurisdiction data");
          states.forEach(state => {
            const data = jurisdictionData[state as keyof typeof jurisdictionData];
            if (!data.highCourt || !data.bench || !data.districts) {
              throw new Error("Invalid jurisdiction structure");
            }
          });
          break;
        
        case "/risk-analysis":
          // Risk Analysis - test risk data
          if (!rejectedCase || !rejectedCase.keyPoints) throw new Error("No rejected case data");
          if (successfulCases.length === 0) throw new Error("No successful cases for comparison");
          break;
      }

      user.visitedPages.add(page);
      user.actions.push({
        timestamp: Date.now(),
        action: "page_visit",
        page,
        success: true
      });
      return true;
    } catch (error: any) {
      user.errors.push({
        user: user.id,
        action: "page_visit",
        error: error.message,
        page,
        timestamp: Date.now()
      });
      user.actions.push({
        timestamp: Date.now(),
        action: "page_visit",
        page,
        success: false,
        details: error.message
      });
      return false;
    }
  }

  // Simulate search action
  private simulateSearch(user: User, query: string): boolean {
    try {
      const results = searchAll(query);
      if (!Array.isArray(results)) throw new Error("Search results not an array");
      
      // Test filtering
      const caseResults = filterByType(results, "case");
      const docResults = filterByType(results, "document");
      
      user.actions.push({
        timestamp: Date.now(),
        action: "search",
        page: "global",
        success: true,
        details: { query, resultCount: results.length }
      });
      return true;
    } catch (error: any) {
      user.errors.push({
        user: user.id,
        action: "search",
        error: error.message,
        page: "global",
        timestamp: Date.now()
      });
      user.actions.push({
        timestamp: Date.now(),
        action: "search",
        page: "global",
        success: false,
        details: error.message
      });
      return false;
    }
  }

  // Simulate filter action
  private simulateFilter(user: User, page: string): boolean {
    try {
      switch (page) {
        case "/case-management":
          // Test state filter
          const states = searchFilters.states.filter(s => s !== "All States");
          const randomState = states[Math.floor(Math.random() * states.length)];
          const filtered = successfulCases.filter(c => c.state === randomState);
          if (!Array.isArray(filtered)) throw new Error("Filter result not an array");
          break;
        
        case "/legal-research":
          // Test document filter
          const docs = Object.values(documentLibrary);
          if (docs.length === 0) throw new Error("No documents to filter");
          break;
      }

      user.actions.push({
        timestamp: Date.now(),
        action: "filter",
        page,
        success: true
      });
      return true;
    } catch (error: any) {
      user.errors.push({
        user: user.id,
        action: "filter",
        error: error.message,
        page,
        timestamp: Date.now()
      });
      user.actions.push({
        timestamp: Date.now(),
        action: "filter",
        page,
        success: false,
        details: error.message
      });
      return false;
    }
  }

  // Simulate data access
  private simulateDataAccess(user: User, subject: string): boolean {
    try {
      switch (subject) {
        case "cases":
          // Access case data
          if (successfulCases.length === 0) throw new Error("No cases available");
          const randomCase = successfulCases[Math.floor(Math.random() * successfulCases.length)];
          if (!randomCase.id || !randomCase.name) throw new Error("Invalid case data");
          break;
        
        case "documents":
          // Access document data
          const documents = Object.values(documentLibrary);
          if (documents.length === 0) throw new Error("No documents available");
          const randomDoc = documents[Math.floor(Math.random() * documents.length)];
          if (!randomDoc.title || !randomDoc.path) throw new Error("Invalid document data");
          break;
        
        case "formats":
          // Access format data
          const formats = Object.values(legalFormats);
          if (formats.length === 0) throw new Error("No formats available");
          const randomFormat = formats[Math.floor(Math.random() * formats.length)];
          if (!randomFormat.title || !randomFormat.sections) throw new Error("Invalid format data");
          break;
        
        case "jurisdictions":
          // Access jurisdiction data
          const states = Object.keys(jurisdictionData);
          if (states.length === 0) throw new Error("No jurisdiction data");
          const randomState = states[Math.floor(Math.random() * states.length)];
          const jurisdiction = jurisdictionData[randomState as keyof typeof jurisdictionData];
          if (!jurisdiction.highCourt || !jurisdiction.districts) {
            throw new Error("Invalid jurisdiction data");
          }
          break;
        
        case "risks":
          // Access risk data
          if (!rejectedCase || !rejectedCase.keyPoints) throw new Error("No risk data");
          if (successfulCases.length === 0) throw new Error("No comparison data");
          break;
        
        case "search":
          // Test search functionality
          const query = this.getRandomQuery(user);
          const results = searchAll(query);
          if (!Array.isArray(results)) throw new Error("Search failed");
          break;
      }

      user.actions.push({
        timestamp: Date.now(),
        action: "data_access",
        page: subject,
        success: true
      });
      return true;
    } catch (error: any) {
      user.errors.push({
        user: user.id,
        action: "data_access",
        error: error.message,
        page: subject,
        timestamp: Date.now()
      });
      user.actions.push({
        timestamp: Date.now(),
        action: "data_access",
        page: subject,
        success: false,
        details: error.message
      });
      return false;
    }
  }

  // Run test for a single user
  private runUserTest(user: User): void {
    // Determine how many pages/subjects to visit (90% coverage)
    const pagesToVisit = Math.ceil(ALL_PAGES.length * 0.9);
    const subjectsToVisit = Math.ceil(ALL_SUBJECTS.length * 0.9);

    // Shuffle pages and subjects for randomness
    const shuffledPages = [...ALL_PAGES].sort(() => Math.random() - 0.5);
    const shuffledSubjects = [...ALL_SUBJECTS].sort(() => Math.random() - 0.5);

    // Visit pages
    for (let i = 0; i < pagesToVisit; i++) {
      const page = shuffledPages[i];
      this.simulatePageVisit(user, page);
      
      // Perform actions on page based on user type
      if (user.type === "beginner") {
        // Beginners do simple searches
        if (Math.random() > 0.5) {
          this.simulateSearch(user, this.getRandomQuery(user));
        }
      } else if (user.type === "intermediate") {
        // Intermediate users do searches and filters
        if (Math.random() > 0.3) {
          this.simulateSearch(user, this.getRandomQuery(user));
        }
        if (Math.random() > 0.5) {
          this.simulateFilter(user, page);
        }
      } else {
        // Advanced users do everything
        if (Math.random() > 0.2) {
          this.simulateSearch(user, this.getRandomQuery(user));
        }
        if (Math.random() > 0.3) {
          this.simulateFilter(user, page);
        }
      }
    }

    // Access subjects/lessons
    for (let i = 0; i < subjectsToVisit; i++) {
      const subject = shuffledSubjects[i];
      this.simulateDataAccess(user, subject);
    }
  }

  // Run all tests
  public async runTests(): Promise<TestResult> {
    console.log("🚀 Starting Robustness Test Suite...");
    console.log(`📊 Testing with 1500 users (500 beginner, 500 intermediate, 500 advanced)`);
    console.log(`🎯 Each user visits 90% of pages and subjects\n`);

    this.startTime = Date.now();
    this.initializeUsers();

    // Run tests for all users
    let completed = 0;
    const total = this.users.length;

    for (const user of this.users) {
      this.runUserTest(user);
      completed++;
      
      if (completed % 100 === 0) {
        console.log(`⏳ Progress: ${completed}/${total} users tested (${Math.round(completed/total*100)}%)`);
      }
    }

    this.endTime = Date.now();
    const duration = this.endTime - this.startTime;

    // Calculate statistics
    const allActions = this.users.flatMap(u => u.actions);
    const successfulActions = allActions.filter(a => a.success).length;
    const failedActions = allActions.filter(a => !a.success).length;
    const allErrors = this.users.flatMap(u => u.errors);

    // Count page visits
    const pageVisits = new Map<string, number>();
    this.users.forEach(user => {
      user.visitedPages.forEach(page => {
        pageVisits.set(page, (pageVisits.get(page) || 0) + 1);
      });
    });

    // User type statistics
    const beginnerUsers = this.users.filter(u => u.type === "beginner");
    const intermediateUsers = this.users.filter(u => u.type === "intermediate");
    const advancedUsers = this.users.filter(u => u.type === "advanced");

    const beginnerActions = beginnerUsers.flatMap(u => u.actions);
    const intermediateActions = intermediateUsers.flatMap(u => u.actions);
    const advancedActions = advancedUsers.flatMap(u => u.actions);

    const result: TestResult = {
      totalUsers: this.users.length,
      totalActions: allActions.length,
      successfulActions,
      failedActions,
      successRate: (successfulActions / allActions.length) * 100,
      errors: allErrors,
      pageVisits,
      userTypeStats: {
        beginner: {
          total: beginnerActions.length,
          success: beginnerActions.filter(a => a.success).length,
          failed: beginnerActions.filter(a => !a.success).length
        },
        intermediate: {
          total: intermediateActions.length,
          success: intermediateActions.filter(a => a.success).length,
          failed: intermediateActions.filter(a => !a.success).length
        },
        advanced: {
          total: advancedActions.length,
          success: advancedActions.filter(a => a.success).length,
          failed: advancedActions.filter(a => !a.success).length
        }
      },
      testDuration: duration
    };

    return result;
  }

  // Generate detailed report
  public generateReport(result: TestResult): string {
    let report = "\n" + "=".repeat(80) + "\n";
    report += "📊 ROBUSTNESS TEST REPORT\n";
    report += "=".repeat(80) + "\n\n";

    report += `⏱️  Test Duration: ${(result.testDuration / 1000).toFixed(2)} seconds\n`;
    report += `👥 Total Users: ${result.totalUsers}\n`;
    report += `   - Beginner: 500 users\n`;
    report += `   - Intermediate: 500 users\n`;
    report += `   - Advanced: 500 users\n\n`;

    report += `📈 Overall Statistics:\n`;
    report += `   - Total Actions: ${result.totalActions.toLocaleString()}\n`;
    report += `   - Successful: ${result.successfulActions.toLocaleString()} (${result.successRate.toFixed(2)}%)\n`;
    report += `   - Failed: ${result.failedActions.toLocaleString()} (${(100 - result.successRate).toFixed(2)}%)\n\n`;

    report += `📊 User Type Breakdown:\n`;
    report += `   Beginner:\n`;
    report += `     - Total Actions: ${result.userTypeStats.beginner.total.toLocaleString()}\n`;
    report += `     - Success Rate: ${((result.userTypeStats.beginner.success / result.userTypeStats.beginner.total) * 100).toFixed(2)}%\n`;
    report += `   Intermediate:\n`;
    report += `     - Total Actions: ${result.userTypeStats.intermediate.total.toLocaleString()}\n`;
    report += `     - Success Rate: ${((result.userTypeStats.intermediate.success / result.userTypeStats.intermediate.total) * 100).toFixed(2)}%\n`;
    report += `   Advanced:\n`;
    report += `     - Total Actions: ${result.userTypeStats.advanced.total.toLocaleString()}\n`;
    report += `     - Success Rate: ${((result.userTypeStats.advanced.success / result.userTypeStats.advanced.total) * 100).toFixed(2)}%\n\n`;

    report += `📄 Page Visit Statistics:\n`;
    result.pageVisits.forEach((count, page) => {
      const percentage = (count / result.totalUsers) * 100;
      report += `   ${page}: ${count.toLocaleString()} visits (${percentage.toFixed(1)}%)\n`;
    });
    report += "\n";

    if (result.errors.length > 0) {
      report += `❌ Errors Found: ${result.errors.length}\n`;
      report += `   First 10 errors:\n`;
      result.errors.slice(0, 10).forEach((error, index) => {
        report += `   ${index + 1}. User ${error.user} - ${error.action} on ${error.page}: ${error.error}\n`;
      });
      report += "\n";
    } else {
      report += `✅ No Errors Found!\n\n`;
    }

    report += `🎯 Test Result: `;
    if (result.successRate === 100) {
      report += `✅ PASSED - 100% Success Rate\n`;
    } else if (result.successRate >= 99) {
      report += `⚠️  WARNING - ${result.successRate.toFixed(2)}% Success Rate (Target: 100%)\n`;
    } else {
      report += `❌ FAILED - ${result.successRate.toFixed(2)}% Success Rate (Target: 100%)\n`;
    }

    report += "=".repeat(80) + "\n";

    return report;
  }
}

export default RobustnessTester;
