/**
 * Main Test Entry Point
 * Run this file to execute comprehensive robustness tests
 * 
 * Usage:
 *   npm run test:robustness
 *   or
 *   node src/test-robustness.ts
 */

import RobustnessTester from "./utils/robustnessTest";
import { TestRunner } from "./utils/testRunner";

// Get command line arguments
const args = process.argv.slice(2);
const deployedUrl = args.find(arg => arg.startsWith("--url="))?.split("=")[1];
const testLocal = !args.includes("--deployed-only");
const testDeployed = !!deployedUrl || args.includes("--deployed");

async function main() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 LAND ACQUISITION APP - ROBUSTNESS TEST SUITE");
  console.log("=".repeat(80) + "\n");

  if (testLocal) {
    console.log("🏠 Testing Local Development Server...\n");
    const localTester = new RobustnessTester("http://localhost:3000");
    const localResult = await localTester.runTests();
    console.log(localTester.generateReport(localResult));

    if (localResult.successRate < 100) {
      console.error("\n❌ LOCAL TESTS FAILED - Fix errors before deployment!");
      process.exit(1);
    } else {
      console.log("\n✅ LOCAL TESTS PASSED - 100% Success Rate!");
    }
  }

  if (testDeployed && deployedUrl) {
    console.log("\n🌐 Testing Deployed Production Server...\n");
    const deployedTester = new RobustnessTester(deployedUrl);
    const deployedResult = await deployedTester.runTests();
    console.log(deployedTester.generateReport(deployedResult));

    if (deployedResult.successRate < 100) {
      console.error("\n❌ DEPLOYED TESTS FAILED - Fix errors immediately!");
      process.exit(1);
    } else {
      console.log("\n✅ DEPLOYED TESTS PASSED - 100% Success Rate!");
    }
  }

  if (!testLocal && !testDeployed) {
    console.log("⚠️  No tests configured. Use --deployed-only or provide --url=<deployed-url>");
    process.exit(1);
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ ALL TESTS COMPLETED SUCCESSFULLY");
  console.log("=".repeat(80) + "\n");
}

// Run tests
main().catch((error) => {
  console.error("\n❌ Test execution failed:", error);
  process.exit(1);
});
