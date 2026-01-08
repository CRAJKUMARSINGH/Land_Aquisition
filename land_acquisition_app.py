#!/usr/bin/env python3
"""
Land Acquisition Compensation Claims Management Application
This application provides a user-friendly interface to access and manage
the comprehensive land acquisition documentation created on January 7, 2026.
"""

import os
import json
from datetime import datetime
from typing import Dict, List, Optional


class LandAcquisitionManager:
    """Main class to manage land acquisition documentation and cases."""
    
    def __init__(self):
        self.project_root = r"c:\Users\Rajkumar\Land_Aquisition"
        self.documentation_files = [
            "In the context of land acquisition.txt",
            "README.md",
            "Under the Right to Fair Compensatio.txt",
            "courts_and_filing_guide.md",
            "executive_summary.md",
            "sample_reference_appeal_market_value.md",
            "successful_cases_summary.md"
        ]
        
        # Successful cases data
        self.successful_cases = [
            {
                "name": "Kalabhai Hadabhai vs The Deputy Collector",
                "state": "Gujarat",
                "year": 2025,
                "result": "Delay condoned (321 days)",
                "compensation_details": "Delay condoned with condition of no interest for delay period",
                "url": "https://indiankanoon.org/doc/36243800/"
            },
            {
                "name": "The State of Madhya Pradesh vs Chhakkilal",
                "state": "Madhya Pradesh",
                "year": 2025,
                "result": "Compensation enhanced",
                "compensation_details": "Rs. 4,30,167 → Rs. 10,50,000 per hectare",
                "url": "https://indiankanoon.org/doc/123801780/"
            },
            {
                "name": "Anand S/O Siddappa vs Special Land Acquisition Officer",
                "state": "Karnataka",
                "year": 2025,
                "result": "Compensation enhanced on parity principle",
                "compensation_details": "Rs. 51,000 → Rs. 5,08,000 per acre",
                "url": "https://indiankanoon.org/doc/158251358/"
            },
            {
                "name": "Land Acquisition Officer vs Dodla Chinnaiah",
                "state": "Telangana",
                "year": 2024,
                "result": "Enhancement upheld",
                "compensation_details": "Rs. 15,000 → Rs. 45,000 per acre",
                "url": "https://indiankanoon.org/doc/156794082/"
            }
        ]
        
        # Rejected case
        self.rejected_case = {
            "name": "Nirubhai Bhurabhai vs SLAO",
            "state": "Gujarat",
            "year": 2025,
            "result": "Delay condonation rejected",
            "reason": "772 days delay, fence-sitting behavior",
            "url": "https://indiankanoon.org/doc/193253261/"
        }

    def display_menu(self):
        """Display the main menu."""
        print("\n" + "="*60)
        print("LAND ACQUISITION COMPENSATION CLAIMS MANAGEMENT SYSTEM")
        print("="*60)
        print(f"Project Created: January 7, 2026")
        print(f"Documentation Files: {len(self.documentation_files)}")
        print(f"Successful Cases: {len(self.successful_cases)}")
        print("-"*60)
        print("SELECT AN OPTION:")
        print("1. View Documentation Files")
        print("2. Browse Successful Cases")
        print("3. View Rejected Case")
        print("4. View Sample Legal Formats")
        print("5. View Court Jurisdiction Guide")
        print("6. Search Documentation")
        print("7. Exit")
        print("-"*60)

    def view_documentation_files(self):
        """List all documentation files with options to read them."""
        print("\nDOCUMENTATION FILES:")
        print("-"*50)
        
        for i, filename in enumerate(self.documentation_files, 1):
            filepath = os.path.join(self.project_root, filename)
            if os.path.exists(filepath):
                size = os.path.getsize(filepath)
                print(f"{i}. {filename} ({size:,} bytes)")
            else:
                print(f"{i}. {filename} (NOT FOUND)")
        
        print("\nEnter the number of the file to read (or 0 to go back): ", end="")
        try:
            choice = int(input())
            if choice == 0:
                return
            elif 1 <= choice <= len(self.documentation_files):
                filename = self.documentation_files[choice-1]
                filepath = os.path.join(self.project_root, filename)
                
                if os.path.exists(filepath):
                    print(f"\nREADING: {filename}")
                    print("-"*50)
                    
                    # Read and display first 20 lines of the file
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        
                    for i, line in enumerate(lines[:20]):
                        print(f"{i+1:3}: {line.rstrip()}")
                    
                    if len(lines) > 20:
                        print(f"... ({len(lines)-20} more lines)")
                        print("\nPress Enter to continue reading more...")
                        input()
                        
                        # Display next 20 lines
                        for i, line in enumerate(lines[20:40]):
                            print(f"{i+21:3}: {line.rstrip()}")
                        
                        if len(lines) > 40:
                            print(f"... ({len(lines)-40} more lines)")
                else:
                    print(f"Error: File '{filepath}' not found.")
            else:
                print("Invalid selection.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    def browse_successful_cases(self):
        """Display information about successful cases."""
        print("\nSUCCESSFUL CASES ANALYZED:")
        print("-"*80)
        
        for i, case in enumerate(self.successful_cases, 1):
            print(f"{i}. {case['name']}")
            print(f"   State: {case['state']} | Year: {case['year']}")
            print(f"   Result: {case['result']}")
            print(f"   Details: {case['compensation_details']}")
            print(f"   URL: {case['url']}")
            print("-" * 80)

    def view_rejected_case(self):
        """Display information about the rejected case."""
        print("\nREJECTED CASE ANALYSIS:")
        print("-"*80)
        case = self.rejected_case
        print(f"Case: {case['name']}")
        print(f"State: {case['state']} | Year: {case['year']}")
        print(f"Result: {case['result']}")
        print(f"Reason: {case['reason']}")
        print(f"URL: {case['url']}")
        print("\nKEY LEARNING: Fence-sitting behavior and unexplained long delays (>2 years) lead to rejection.")
        print("-"*80)

    def view_sample_formats(self):
        """Display information about sample legal formats."""
        print("\nSAMPLE LEGAL FORMATS AVAILABLE:")
        print("-"*60)
        print("1. Reference Application (Section 18) - Pre-2013 Acquisitions")
        print("   - Complete application to Collector for reference to court")
        print("   - Contains grounds for objection to LAO's award")
        print("   - Includes limitation period explanations")
        print("   - Provides sample enclosures list")
        
        print("\n2. First Appeal to High Court (Section 54)")
        print("   - Complete Memorandum of Appeal format")
        print("   - 9 standard grounds of appeal")
        print("   - Relief clauses and verification")
        print("   - Documents list and filing procedures")
        
        print("\n3. Courts & Filing Procedures Guide")
        print("   - Complete jurisdiction mapping for all 25 states + UTs")
        print("   - Step-by-step filing procedures")
        print("   - Court fee structure guide")
        print("   - Practical filing tips and resources")
        
        print("\n4. Executive Summary")
        print("   - Research findings summary (5 cases analyzed)")
        print("   - Key success factors and probability matrix")
        print("   - Financial implications and cost-benefit analysis")

    def view_court_jurisdiction(self):
        """Display court jurisdiction information."""
        print("\nHIGH COURT JURISDICTION GUIDE:")
        print("-"*60)
        
        jurisdictions = {
            "Karnataka": {
                "court": "Karnataka High Court",
                "seats": ["Bengaluru (Principal)", "Dharwad Bench", "Kalaburagi Bench"],
                "coverage": "Dharwad, Belagavi, Bagalkot, Vijayapura, Gadag, Haveri, Uttara Kannada (Dharwad Bench); Kalaburagi, Bidar, Yadgir, Raichur, Koppal, Ballari (Kalaburagi Bench)"
            },
            "Madhya Pradesh": {
                "court": "Madhya Pradesh High Court",
                "seats": ["Jabalpur (Principal)", "Gwalior Bench", "Indore Bench"],
                "coverage": "Gwalior, Morena, Sheopur, Bhind, Datia, Shivpuri, Guna, Ashoknagar (Gwalior Bench); Indore, Ujjain, Dewas, Mandsaur, Ratlam, Neemuch, Shajapur, Dhar, Jhabua, Alirajpur, Khargone, Barwani, Burhanpur, Khandwa, Dhar (Indore Bench)"
            },
            "Maharashtra": {
                "court": "Bombay High Court",
                "seats": ["Mumbai (Principal)", "Nagpur Bench", "Aurangabad Bench", "Panaji Bench"],
                "coverage": "Vidarbha region (Nagpur Bench); Marathwada region (Aurangabad Bench); Goa (Panaji Bench)"
            },
            "Tamil Nadu": {
                "court": "Madras High Court",
                "seats": ["Chennai (Principal)", "Madurai Bench"],
                "coverage": "Southern districts (Madurai, Tirunelveli, etc.) (Madurai Bench)"
            },
            "Telangana": {
                "court": "Telangana High Court",
                "seats": ["Hyderabad (Principal)"],
                "coverage": "All districts of Telangana"
            }
        }
        
        for state, info in jurisdictions.items():
            print(f"\n{state}:")
            print(f"  High Court: {info['court']}")
            print(f"  Seats: {', '.join(info['seats'])}")
            print(f"  Coverage: {info['coverage']}")

    def search_documentation(self):
        """Simple search functionality for documentation."""
        print("\nSEARCH DOCUMENTATION:")
        print("-"*40)
        print("Enter search term (case-insensitive): ", end="")
        search_term = input().strip().lower()
        
        if not search_term:
            print("Empty search term.")
            return
        
        print(f"\nSearching for '{search_term}' in documentation...")
        results = []
        
        for filename in self.documentation_files:
            filepath = os.path.join(self.project_root, filename)
            if os.path.exists(filepath):
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read().lower()
                        if search_term in content:
                            # Count occurrences
                            count = content.count(search_term)
                            results.append((filename, count))
                except UnicodeDecodeError:
                    # If UTF-8 fails, try with 'latin-1' encoding
                    try:
                        with open(filepath, 'r', encoding='latin-1') as f:
                            content = f.read().lower()
                            if search_term in content:
                                count = content.count(search_term)
                                results.append((filename, count))
                    except:
                        print(f"Could not read file: {filename}")
        
        if results:
            print(f"\nFound {len(results)} file(s) containing '{search_term}':")
            for filename, count in results:
                print(f"  - {filename} ({count} occurrence{'s' if count != 1 else ''})")
        else:
            print(f"No files found containing '{search_term}'.")

    def run(self):
        """Run the main application loop."""
        print("Welcome to the Land Acquisition Compensation Claims Management System!")
        print("This application helps you navigate the comprehensive documentation")
        print("created on January 7, 2026, based on Indian Kanoon research.")
        
        while True:
            self.display_menu()
            try:
                choice = int(input("Enter your choice (1-7): "))
                
                if choice == 1:
                    self.view_documentation_files()
                elif choice == 2:
                    self.browse_successful_cases()
                elif choice == 3:
                    self.view_rejected_case()
                elif choice == 4:
                    self.view_sample_formats()
                elif choice == 5:
                    self.view_court_jurisdiction()
                elif choice == 6:
                    self.search_documentation()
                elif choice == 7:
                    print("\nThank you for using the Land Acquisition Compensation Claims Management System!")
                    print("Remember to consult with a qualified legal professional before filing any claims.")
                    break
                else:
                    print("\nInvalid choice. Please select 1-7.")
                
                if choice != 7:
                    print("\nPress Enter to continue...")
                    input()
                    
            except ValueError:
                print("\nInvalid input. Please enter a number between 1 and 7.")
                print("Press Enter to continue...")
                input()


if __name__ == "__main__":
    app = LandAcquisitionManager()
    app.run()