# Land Acquisition Legal Assistant

A comprehensive React application for land acquisition compensation claims based on Indian Kanoon research.

## Overview

This application provides a complete solution for managing land acquisition documentation, analyzing successful cases, and accessing legal templates for compensation claims in India. The application features a modern UI with a color scheme inspired by Hulu green and branding similar to Manupatra.ai.

## Features

- **Documentation Management**: Browse and search all land acquisition legal documents
- **Case Studies**: Analyze 5 detailed case studies (4 successful, 1 rejected)
- **Legal Templates**: Access ready-to-use formats for Section 18 applications and Section 54 appeals
- **Court Jurisdiction Guide**: Complete mapping for all 25 Indian states and 8 UTs
- **Advanced Search**: Find specific information across all resources
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom Hulu green theme
- **Build Tool**: Vite
- **Package Manager**: npm

## Key Success Strategies Integrated

1. **🏆 Parity Principle** (85-95% success rate)
   - Find judgment for same notification/project

2. **📄 Comparable Evidence** (70-85% success)
   - 3+ sale deeds + Collector's Guidelines + comparable judgments

3. **⏰ Prompt Action** (Critical)
   - File within limitation periods (6 weeks/months)

4. **✍️ Under Protest** (Essential)
   - Always accept compensation with protest statement

5. **👨‍⚖️ Qualified Lawyer** (Necessary)
   - Specialized in land acquisition law

## Project Structure

```
src/
├── components/
│   ├── Home.jsx          # Home page with Saraswati mascot
│   ├── Documentation.jsx # Documentation viewer
│   ├── Cases.jsx         # Case studies analyzer
│   ├── LegalFormats.jsx  # Legal templates
│   ├── Jurisdiction.jsx  # Court jurisdiction guide
│   └── Search.jsx        # Search functionality
├── App.jsx              # Main application component
├── main.jsx             # Entry point
└── index.css            # Tailwind and custom styles
```

## Setup Instructions

1. **Clone the repository** (or use the existing files)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests (placeholder)

## Color Scheme

- **Primary Color**: Hulu Green (`#16a34a`)
- **Dark Green**: (`#15803d`)
- **Light Green**: (`#22c55e`)
- **Background**: (`#f0fdf4`)

## Legal Disclaimer

This application and its underlying documentation are for educational and reference purposes only. They are not a substitute for qualified legal advice. Always consult a qualified lawyer before filing any legal proceedings. Success depends on specific facts and evidence in each case.

## Key Data Sources

- 7 comprehensive documentation files
- 4 successful case studies with detailed analysis
- 1 rejected case study with lessons learned
- Complete jurisdiction mapping for all Indian states
- Legal templates for Section 18 and Section 54 procedures
- Court fee structure and filing procedures