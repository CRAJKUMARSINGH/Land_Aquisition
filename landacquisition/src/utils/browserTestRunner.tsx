/**
 * Browser-Based Test Runner Component
 * Can be embedded in the app for testing deployed URLs
 */

import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";
import RobustnessTester from "./robustnessTest";

interface TestRunnerProps {
  onComplete?: (result: any) => void;
}

export const BrowserTestRunner: React.FC<TestRunnerProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [mode, setMode] = useState<"full" | "lawyer">("full");

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    setErrors([]);
    setResult(null);

    try {
      const tester = new RobustnessTester(window.location.origin);
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 95));
      }, 100);

      const testResult =
        mode === "lawyer" ? await tester.runLawyerSimulation() : await tester.runTests();
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(testResult);
      
      if (onComplete) {
        onComplete(testResult);
      }
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Robustness Test Runner
        </h2>
        
        {!isRunning && !result && (
          <div className="text-center py-8">
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mr-3">
                Test mode:
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as "full" | "lawyer")}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-hulu-green focus:border-transparent"
              >
                <option value="full">
                  1500 users (beginner/intermediate/advanced, 90% coverage)
                </option>
                <option value="lawyer">
                  151 lawyer users (~95% coverage of content)
                </option>
              </select>
            </div>
            {mode === "full" ? (
              <p className="text-gray-600 mb-4">
                This will test the app with 1500 virtual users (500 beginner, 500 intermediate, 500 advanced).
                Each user will visit 90% of pages and subjects.
              </p>
            ) : (
              <p className="text-gray-600 mb-4">
                This will simulate 151 lawyer users, each randomly using about 95% of the app&apos;s pages and
                learning content.
              </p>
            )}
            <button
              onClick={runTests}
              className="btn-primary"
            >
              Start Robustness Tests
            </button>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-hulu-green mx-auto mb-4 animate-spin" />
            <p className="text-gray-600 mb-2">Running tests...</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-hulu-green h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{progress}% complete</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Test Results</h3>
              {result.successRate === 100 ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">100% Success</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{result.successRate.toFixed(2)}% Success</span>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Total Users</div>
                <div className="text-2xl font-bold text-gray-900">{result.totalUsers.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Total Actions</div>
                <div className="text-2xl font-bold text-gray-900">{result.totalActions.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-2xl font-bold text-hulu-green">{result.successRate.toFixed(2)}%</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">User Type Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Beginner Users:</span>
                  <span className="font-medium">
                    {((result.userTypeStats.beginner.success / result.userTypeStats.beginner.total) * 100).toFixed(2)}% success
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Intermediate Users:</span>
                  <span className="font-medium">
                    {((result.userTypeStats.intermediate.success / result.userTypeStats.intermediate.total) * 100).toFixed(2)}% success
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Advanced Users:</span>
                  <span className="font-medium">
                    {((result.userTypeStats.advanced.success / result.userTypeStats.advanced.total) * 100).toFixed(2)}% success
                  </span>
                </div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Errors Found: {result.errors.length}
                </h4>
                <div className="space-y-1 text-sm text-red-700 max-h-40 overflow-y-auto">
                  {result.errors.slice(0, 10).map((error: any, index: number) => (
                    <div key={index}>
                      User {error.user}: {error.error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setResult(null);
                setProgress(0);
              }}
              className="btn-primary w-full"
            >
              Run Tests Again
            </button>
          </div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-50 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-red-900 mb-2">Test Execution Errors</h4>
            <ul className="list-disc list-inside text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserTestRunner;
