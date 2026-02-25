# Draft Facility - User Guide

## Overview

The Draft Facility is a quick-access feature that allows users to generate legal drafts instantly from anywhere in the app.

## Access Points

### 1. Header Button (Desktop)
- **Location**: Top navigation bar
- **Button**: "Generate Draft" (with sparkle icon)
- **Style**: Gradient button (Hulu green to purple)
- **Action**: Opens Draft Generator modal

### 2. Home Page Button
- **Location**: Hero section, below main CTA buttons
- **Button**: "Generate Draft" (with file icon)
- **Style**: Gradient button matching header
- **Action**: Navigates to Legal Drafts page

### 3. Mobile Menu
- **Location**: Hamburger menu (mobile devices)
- **Button**: "Generate Draft" (with sparkle icon)
- **Action**: Opens Draft Generator modal

## Draft Generator Features

### Quick Access Modal
When you click "Generate Draft", a modal opens with:

1. **Draft Type Selection**
   - Reference Applications (20 drafts)
   - Appeals (20 drafts)
   - Reviews (10 drafts)
   - Click any type to view all drafts of that type

2. **Popular Drafts**
   - Shows 6 most commonly used drafts
   - Click any draft to generate it instantly

3. **View All Drafts**
   - Button to navigate to full Legal Drafts page
   - Access all 50 drafts with search and filters

### Draft Generation Options

Once you select a draft, you can:

1. **View PDF**
   - Opens PDF in new browser tab
   - Generated on-demand from draft data
   - Contains all draft information

2. **Download PDF**
   - Saves PDF to your device
   - Generated instantly
   - Ready to use

3. **Copy Content**
   - Copies draft content to clipboard
   - Paste into any document
   - Full text format

## Draft Content Includes

Each generated draft contains:

- ✅ Basic Information (type, court, state, ID)
- ✅ Situation Description
- ✅ Detailed Scenario
- ✅ Key Legal Points
- ✅ Applicable Sections
- ✅ Required Documents
- ✅ Success Factors
- ✅ Important Notes

## Usage Workflow

### Quick Draft Generation:
1. Click "Generate Draft" button (header or home)
2. Select draft type or popular draft
3. Review draft details
4. Click "View PDF", "Download PDF", or "Copy"

### Full Draft Library:
1. Click "View All 50 Drafts"
2. Search or filter drafts
3. Select desired draft
4. Generate PDF or copy content

## Benefits

- ✅ **Instant Access**: Generate drafts from anywhere
- ✅ **Quick Selection**: Popular drafts shown first
- ✅ **Multiple Formats**: View, download, or copy
- ✅ **Always Available**: Button in header on all pages
- ✅ **Mobile Friendly**: Works on all devices

## Technical Details

- **Component**: `DraftGenerator.tsx`
- **Location**: `src/components/`
- **Integration**: Header, Home page, Mobile menu
- **Data Source**: `legalDrafts.ts`
- **PDF Generation**: On-demand from data

## Customization

All drafts are templates and should be:
- Customized with specific case details
- Reviewed by qualified lawyer
- Filled with actual dates, amounts, names
- Attached with required documents

---

**Status**: ✅ Fully Integrated  
**Access**: Header button, Home page, Mobile menu  
**Drafts Available**: 50 (20 Reference, 20 Appeal, 10 Review)
