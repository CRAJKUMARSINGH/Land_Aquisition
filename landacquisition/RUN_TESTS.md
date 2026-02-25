# How to Run Robustness Tests

## Quick Start

### Option 1: Browser-Based Test (Easiest - Works on Deployed Site)

1. **Start your app:**
   ```bash
   npm start
   ```

2. **Navigate to test runner:**
   ```
   http://localhost:3000/test-runner
   ```

3. **Click "Start Robustness Tests"**
   - Tests run automatically
   - Results displayed in real-time
   - 100% success = Ready for launch! ✅

### Option 2: Command Line Test

1. **Install test dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   # Test local development server
   npm run test:data
   
   # For full robustness test, use the browser-based test runner
   # Navigate to http://localhost:3000/test-runner
   ```

## Testing Deployed Site

### Method 1: Browser Test Runner (Recommended)

1. Deploy your app to production
2. Navigate to: `https://your-deployed-url.com/test-runner`
3. Click "Start Robustness Tests"
4. Wait for results (usually 30-60 seconds)
5. Verify 100% success rate

### Method 2: Manual Verification

Test these manually on your deployed site:

1. **Home Page** (`/`)
   - ✅ Page loads
   - ✅ Stats display
   - ✅ Features visible
   - ✅ Navigation works

2. **Legal Research** (`/legal-research`)
   - ✅ Documents list loads
   - ✅ Search works
   - ✅ Filters work
   - ✅ Preview works

3. **Case Management** (`/case-management`)
   - ✅ Cases display
   - ✅ Search works
   - ✅ Filters work
   - ✅ Case details open

4. **Document Drafting** (`/document-drafting`)
   - ✅ Formats display
   - ✅ Expand/collapse works
   - ✅ Copy/Download work

5. **Jurisdiction Guide** (`/jurisdiction-guide`)
   - ✅ States list loads
   - ✅ State details display
   - ✅ Districts show

6. **Risk Analysis** (`/risk-analysis`)
   - ✅ Risk factors display
   - ✅ Success strategies show
   - ✅ Statistics display

7. **Global Search** (Header)
   - ✅ Search input works
   - ✅ Results appear
   - ✅ Navigation works

## Expected Results

### ✅ PASSED
- Success Rate: **100%**
- Errors: **0**
- All pages visited: **90%+ coverage**
- All subjects covered: **90%+ coverage**

### Test Statistics
- Total Users: 1500
- Beginner Users: 500
- Intermediate Users: 500
- Advanced Users: 500
- Total Actions: ~45,000
- Test Duration: 30-60 seconds

## Troubleshooting

### Test Runner Page Not Found
**Solution:** Ensure `/test-runner` route is added to `App.tsx`

### Tests Taking Too Long
**Solution:** This is normal - 1500 users testing takes 30-60 seconds

### Errors Found
**Solution:** 
1. Check error messages in test report
2. Verify all data files are properly formatted
3. Check browser console for JavaScript errors
4. Ensure all routes are configured

### 100% Success Not Achieved
**Solution:**
1. Review error details
2. Fix data issues
3. Fix component errors
4. Re-run tests
5. Verify 100% before launch

## Pre-Launch Checklist

- [ ] Run browser-based test on local server
- [ ] Achieve 100% success rate locally
- [ ] Fix any errors found
- [ ] Deploy to production
- [ ] Run browser-based test on deployed URL
- [ ] Verify 100% success rate on deployed site
- [ ] Document test results
- [ ] Ready for launch! 🚀

---

**Remember:** 100% success rate is mandatory before launch!
