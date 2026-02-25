# Land Acquisition LegalTech Suite

A modern, AI-powered legal technology platform for land acquisition compensation claims in India. Built with React, TypeScript, and Tailwind CSS, inspired by Manupatra.ai and featuring Hulu green branding.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
cd landacquisition
npm install
```

### Run Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
landacquisition/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Global navigation with search
│   │   └── SaraswatiMascot.tsx # Animated mascot component
│   ├── pages/
│   │   ├── Home.tsx           # Landing page
│   │   ├── LegalResearch.tsx  # Document library
│   │   ├── CaseManagement.tsx # Case analysis
│   │   ├── DocumentDrafting.tsx # Legal templates
│   │   ├── JurisdictionGuide.tsx # Court mapping
│   │   └── RiskAnalysis.tsx   # Risk factors
│   ├── data/
│   │   └── landAcquisitionData.ts # All app data
│   ├── utils/
│   │   ├── searchUtils.ts     # Search functionality
│   │   └── testApp.ts         # Test suite
│   ├── App.tsx                # Main app component
│   └── index.css              # Global styles
├── tailwind.config.js         # Tailwind configuration
└── package.json
```

## ✨ Features

### 1. **Legal Research**
- Browse comprehensive documentation
- Search documents by keywords
- Preview and download documents
- Filter by document type

### 2. **Case Management**
- View successful cases (4 cases)
- Analyze rejected cases (1 case)
- Filter by state, year, result
- Detailed case information

### 3. **Document Drafting**
- Section 18 templates (Reference Application)
- Section 54 templates (First Appeal)
- Expandable format details
- Copy and download functionality

### 4. **Jurisdiction Guide**
- State-wise High Court mapping
- District information
- Filing fees and procedures
- Quick access to court details

### 5. **Risk Analysis**
- Common risk factors
- Success strategies
- Prevention guidelines
- Success rate statistics

### 6. **Global Search**
- Search across all data types
- Real-time results
- Navigate directly to relevant pages
- Relevance-based ranking

## 🎨 Design Features

- **Hulu Green** (#1CE783) primary color
- **Manupatra-inspired** professional UX
- **SaraswatiMascot** animated component
- **Responsive** design for all devices
- **Smooth animations** and transitions
- **Modern gradients** and shadows

## 🧪 Testing

Run the comprehensive test suite:

```typescript
import { runTests } from './utils/testApp';

// Run all tests
runTests();
```

Tests cover:
- Data integrity
- Search functionality
- Case management
- Document library
- Legal formats
- Jurisdiction data
- Filters and utilities

## 📊 Data Integration

All data is integrated in `src/data/landAcquisitionData.ts`:
- ✅ 4 successful cases
- ✅ 1 rejected case
- ✅ 2 legal formats (Section 18 & 54)
- ✅ 4 states jurisdiction data
- ✅ 4 document references
- ✅ Complete search filters

## 🔗 Navigation

All pages are properly linked:
- Home → Feature pages
- Header → All sections
- Search → Relevant pages
- Cards → Direct navigation

## 📝 Documentation Files

The app references these markdown files:
- `executive_summary.md`
- `successful_cases_summary.md`
- `sample_reference_appeal_market_value.md`
- `courts_and_filing_guide.md`

These are referenced in the document library and can be accessed through the Legal Research page.

## 🎯 Key Features

1. **Comprehensive Search** - Search across cases, documents, formats, and jurisdictions
2. **Case Analysis** - Detailed view of successful and rejected cases
3. **Legal Templates** - Ready-to-use Section 18 and Section 54 formats
4. **Court Mapping** - Complete jurisdiction guide for all covered states
5. **Risk Assessment** - Learn from failures and implement success strategies
6. **Professional UI** - Modern, clean interface inspired by leading legal tech platforms

## 🚀 Production Ready

The app is fully functional and ready for deployment:
- ✅ All pages implemented
- ✅ All data integrated
- ✅ Search working
- ✅ Navigation complete
- ✅ Responsive design
- ✅ No linting errors
- ✅ Comprehensive testing

## 📄 License

This project is for educational and reference purposes. Always consult a qualified lawyer before filing any legal proceedings.

---

**Built with ❤️ for legal professionals**
