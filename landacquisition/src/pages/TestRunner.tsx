import React from "react";
import BrowserTestRunner from "../utils/browserTestRunner";
import Header from "../components/Header";

const TestRunnerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <BrowserTestRunner />
      </div>
    </div>
  );
};

export default TestRunnerPage;
