/**
 * Entry point for the 151-lawyer simulation test.
 *
 * Usage:
 *   npm run test:lawyers
 */

import RobustnessTester from "./utils/robustnessTest";

async function main() {
  console.log("\n" + "=".repeat(80));
  console.log("🧪 LAND ACQUISITION APP - 151 LAWYER SIMULATION TEST");
  console.log("=".repeat(80) + "\n");

  const tester = new RobustnessTester("http://localhost:3000");
  const result = await tester.runLawyerSimulation();
  const report = tester.generateReport(result);
  console.log(report);

  if (result.successRate < 100) {
    console.error("\n⚠️ LAWYER SIMULATION COMPLETED WITH ERRORS");
  } else {
    console.log("\n✅ LAWYER SIMULATION PASSED - 100% Success Rate!");
  }

  console.log("\n" + "=".repeat(80));
  console.log("✅ 151 LAWYER SIMULATION FINISHED");
  console.log("=".repeat(80) + "\n");
}

main().catch((error) => {
  console.error("\n❌ Lawyer simulation test execution failed:", error);
  process.exit(1);
});

