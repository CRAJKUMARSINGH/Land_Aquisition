/**
 * Test Runner for Local and Deployed Testing
 * Can test both local development server and deployed production URL
 */

import RobustnessTester, { TestResult } from "./robustnessTest";

export interface TestConfig {
  localUrl?: string;
  deployedUrl?: string;
  testLocal?: boolean;
  testDeployed?: boolean;
}

export class TestRunner {
  private config: TestConfig;

  constructor(config: TestConfig) {
    this.config = config;
  }

  // Run tests on local server
  public async testLocal(): Promise<TestResult> {
    console.log("🏠 Testing Local Development Server...\n");
    const url = this.config.localUrl || "http://localhost:3000";
    const tester = new RobustnessTester(url);
    return await tester.runTests();
  }

  // Run tests on deployed server
  public async testDeployed(): Promise<TestResult> {
    if (!this.config.deployedUrl) {
      throw new Error("Deployed URL not provided");
    }
    console.log("🌐 Testing Deployed Production Server...\n");
    const tester = new RobustnessTester(this.config.deployedUrl);
    return await tester.runTests();
  }

  // Run all configured tests
  public async runAllTests(): Promise<{ local?: TestResult; deployed?: TestResult }> {
    const results: { local?: TestResult; deployed?: TestResult } = {};

    if (this.config.testLocal) {
      try {
        results.local = await this.testLocal();
      } catch (error: any) {
        console.error("❌ Local test failed:", error.message);
      }
    }

    if (this.config.testDeployed) {
      try {
        results.deployed = await this.testDeployed();
      } catch (error: any) {
        console.error("❌ Deployed test failed:", error.message);
      }
    }

    return results;
  }

  // Generate comprehensive report
  public generateComprehensiveReport(results: { local?: TestResult; deployed?: TestResult }): string {
    let report = "\n" + "=".repeat(80) + "\n";
    report += "📋 COMPREHENSIVE TEST REPORT\n";
    report += "=".repeat(80) + "\n\n";

    if (results.local) {
      report += "🏠 LOCAL DEVELOPMENT SERVER RESULTS:\n";
      report += "-".repeat(80) + "\n";
      const localTester = new RobustnessTester();
      report += localTester.generateReport(results.local);
      report += "\n";
    }

    if (results.deployed) {
      report += "🌐 DEPLOYED PRODUCTION SERVER RESULTS:\n";
      report += "-".repeat(80) + "\n";
      const deployedTester = new RobustnessTester();
      report += deployedTester.generateReport(results.deployed);
      report += "\n";
    }

    // Comparison if both tests ran
    if (results.local && results.deployed) {
      report += "📊 COMPARISON:\n";
      report += "-".repeat(80) + "\n";
      report += `Local Success Rate: ${results.local.successRate.toFixed(2)}%\n`;
      report += `Deployed Success Rate: ${results.deployed.successRate.toFixed(2)}%\n`;
      report += `Difference: ${Math.abs(results.local.successRate - results.deployed.successRate).toFixed(2)}%\n\n`;

      if (results.local.successRate === 100 && results.deployed.successRate === 100) {
        report += "✅ BOTH ENVIRONMENTS PASSED - 100% SUCCESS RATE\n";
      } else {
        report += "⚠️  SOME ISSUES DETECTED - REVIEW ERRORS ABOVE\n";
      }
    }

    report += "=".repeat(80) + "\n";
    return report;
  }
}

// Export convenience function
export const runRobustnessTests = async (
  localUrl?: string,
  deployedUrl?: string
): Promise<void> => {
  const runner = new TestRunner({
    localUrl: localUrl || "http://localhost:3000",
    deployedUrl,
    testLocal: true,
    testDeployed: !!deployedUrl
  });

  const results = await runner.runAllTests();
  const report = runner.generateComprehensiveReport(results);
  
  console.log(report);
  
  // Save report to file (in browser environment, this would need adjustment)
  if (typeof window === "undefined") {
    const fs = require("fs");
    const path = require("path");
    const reportPath = path.join(process.cwd(), "test-report.txt");
    fs.writeFileSync(reportPath, report);
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }
};
