# PDF Drafts Library - User Guide

## Overview

All 50 legal drafts are available as PDF documents stored in a separate folder for easy access and download.

## Folder Structure

```
landacquisition/
└── public/
    └── drafts-pdf/
        ├── README.md
        ├── Draft_1_Delay_Condonation_with_Financial_Hardship.pdf
        ├── Draft_2_Parity_Principle_Same_Notification.pdf
        ├── ... (all 50 PDFs)
        └── Draft_50_Solatium_and_Additional_Benefits.pdf
```

## Access Methods

### 1. Through App Interface

**Navigate to:** `/pdf-drafts`

Features:
- ✅ View all 50 PDFs in organized grid
- ✅ Search by title, court, state
- ✅ Filter by type (Reference/Appeal/Review)
- ✅ View PDF in browser
- ✅ Download PDF to device
- ✅ See PDF file information

### 2. Direct URL Access

PDFs can be accessed directly via:
```
http://localhost:3000/drafts-pdf/Draft_[ID]_[Title].pdf
```

Example:
```
http://localhost:3000/drafts-pdf/Draft_1_Delay_Condonation_with_Financial_Hardship.pdf
```

### 3. From Legal Drafts Page

On the `/legal-drafts` page:
- Click "View PDF" button in draft details modal
- Or click "View PDF Library" button in hero section

## File Naming Convention

All PDFs follow this naming pattern:
```
Draft_[ID]_[Sanitized_Title].pdf
```

Where:
- `[ID]` = Draft ID (1-50)
- `[Sanitized_Title]` = Title with special characters removed, spaces replaced with underscores

Examples:
- `Draft_1_Delay_Condonation_with_Financial_Hardship.pdf`
- `Draft_21_Reference_Court_Rejection.pdf`
- `Draft_41_Error_Apparent_on_Face_of_Record.pdf`

## PDF Content Structure

Each PDF contains:

1. **Basic Information**
   - Type (Reference/Appeal/Review)
   - Court
   - State
   - Draft ID
   - Template ID

2. **Situation**
   - Brief situation description

3. **Scenario**
   - Detailed scenario explanation

4. **Key Legal Points**
   - Numbered list of important points

5. **Applicable Sections**
   - Relevant legal provisions

6. **Required Documents**
   - List of supporting documents needed

7. **Success Factors**
   - Factors that contribute to success

8. **Important Notes**
   - Usage instructions
   - Legal disclaimers
   - Customization requirements

## Features

### Search & Filter
- **Search**: By title, court, state, keywords
- **Filter by Type**: Reference (20), Appeal (20), Review (10)
- **Real-time Results**: Instant filtering

### View & Download
- **View**: Open PDF in new browser tab
- **Download**: Save PDF to device
- **File Info**: See file size, creation date, path

### Organization
- **Grid Layout**: Easy browsing
- **Type Badges**: Color-coded by type
- **Court/State Info**: Quick identification

## Usage Instructions

### Viewing a PDF

1. Navigate to `/pdf-drafts`
2. Search or filter to find desired draft
3. Click "View" button
4. PDF opens in new tab

### Downloading a PDF

1. Navigate to `/pdf-drafts`
2. Find the draft you want
3. Click "Download" button
4. PDF saves to your device's download folder

### Direct Access

1. Use the direct URL format:
   ```
   /drafts-pdf/Draft_[ID]_[Title].pdf
   ```
2. Replace `[ID]` and `[Title]` with actual values
3. Access via browser or download manager

## PDF Generation

PDFs are generated from the legal drafts data using:
- Template structure
- Legal content
- Formatting standards
- Professional layout

## Important Notes

1. **Customization Required**: All PDFs are templates and must be customized with specific case details
2. **Legal Consultation**: Always consult a qualified lawyer before filing
3. **Documentation**: Ensure all required documents are attached
4. **Timing**: File within limitation periods
5. **Court Rules**: Follow specific court procedures and formats

## Technical Details

### Storage Location
- **Folder**: `public/drafts-pdf/`
- **Access**: Public folder (accessible via URL)
- **Format**: PDF documents
- **Size**: ~50-100 KB per PDF

### File Management
- All PDFs are static files
- Can be accessed without authentication
- Suitable for sharing and distribution
- Can be hosted on CDN

## Support

For issues or questions:
1. Check PDF file exists in `public/drafts-pdf/` folder
2. Verify file naming matches convention
3. Check browser console for errors
4. Ensure app is running and public folder is accessible

---

**Total PDFs**: 50  
**Storage**: `public/drafts-pdf/`  
**Access**: `/pdf-drafts` page or direct URL  
**Status**: ✅ Ready for Use
