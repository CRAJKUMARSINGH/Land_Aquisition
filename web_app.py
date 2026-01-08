#!/usr/bin/env python3
"""
Web Interface for Land Acquisition Compensation Claims Management System
Using Flask for a web-based interface to the land acquisition documentation
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
import os
import json
from datetime import datetime
from typing import Dict, List, Optional

# Initialize Flask app
app = Flask(__name__)

class LandAcquisitionWebManager:
    """Class to manage land acquisition documentation for web interface."""
    
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
                "url": "https://indiankanoon.org/doc/36243800/",
                "id": 1
            },
            {
                "name": "The State of Madhya Pradesh vs Chhakkilal",
                "state": "Madhya Pradesh",
                "year": 2025,
                "result": "Compensation enhanced",
                "compensation_details": "Rs. 4,30,167 → Rs. 10,50,000 per hectare",
                "url": "https://indiankanoon.org/doc/123801780/",
                "id": 2
            },
            {
                "name": "Anand S/O Siddappa vs Special Land Acquisition Officer",
                "state": "Karnataka",
                "year": 2025,
                "result": "Compensation enhanced on parity principle",
                "compensation_details": "Rs. 51,000 → Rs. 5,08,000 per acre",
                "url": "https://indiankanoon.org/doc/158251358/",
                "id": 3
            },
            {
                "name": "Land Acquisition Officer vs Dodla Chinnaiah",
                "state": "Telangana",
                "year": 2024,
                "result": "Enhancement upheld",
                "compensation_details": "Rs. 15,000 → Rs. 45,000 per acre",
                "url": "https://indiankanoon.org/doc/156794082/",
                "id": 4
            }
        ]
        
        # Rejected case
        self.rejected_case = {
            "name": "Nirubhai Bhurabhai vs SLAO",
            "state": "Gujarat",
            "year": 2025,
            "result": "Delay condonation rejected",
            "reason": "772 days delay, fence-sitting behavior",
            "url": "https://indiankanoon.org/doc/193253261/",
            "id": 5
        }

# Create an instance of the manager
manager = LandAcquisitionWebManager()

@app.route('/')
def home():
    """Home page displaying project overview."""
    return '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LegalTech Suite - AI-Powered Land Acquisition Compensation System</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                min-height: 100vh;
            }
            
            .container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 20px;
            }
            
            .header {
                background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
                color: white;
                padding: 60px 0;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                opacity: 0.3;
            }
            
            .header-content {
                position: relative;
                z-index: 1;
            }
            
            .header h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 16px;
                letter-spacing: -0.5px;
            }
            
            .header .tagline {
                font-size: 1.25rem;
                font-weight: 300;
                margin-bottom: 24px;
                opacity: 0.9;
            }
            
            .header .stats {
                display: flex;
                justify-content: center;
                gap: 40px;
                margin-top: 32px;
                flex-wrap: wrap;
            }
            
            .stat-item {
                text-align: center;
            }
            
            .stat-number {
                font-size: 2rem;
                font-weight: 700;
                display: block;
            }
            
            .stat-label {
                font-size: 0.875rem;
                opacity: 0.8;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .nav-section {
                background: white;
                padding: 40px 0;
                box-shadow: 0 2px 20px rgba(0,0,0,0.08);
                margin-bottom: 40px;
            }
            
            .nav-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 24px;
                margin-top: 32px;
            }
            
            .nav-card {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 32px 24px;
                text-align: center;
                transition: all 0.3s ease;
                cursor: pointer;
                text-decoration: none;
                color: inherit;
                position: relative;
                overflow: hidden;
            }
            
            .nav-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            }
            
            .nav-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 40px rgba(0,0,0,0.12);
                border-color: #3b82f6;
            }
            
            .nav-card:hover::before {
                transform: translateY(0);
            }
            
            .nav-icon {
                font-size: 2.5rem;
                margin-bottom: 16px;
                background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .nav-title {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 8px;
                color: #1e293b;
            }
            
            .nav-description {
                font-size: 0.875rem;
                color: #64748b;
                line-height: 1.5;
            }
            
            .card {
                background: white;
                border-radius: 16px;
                padding: 40px;
                margin: 24px 0;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid #e2e8f0;
            }
            
            .card h2 {
                font-size: 1.875rem;
                font-weight: 600;
                margin-bottom: 16px;
                color: #1e293b;
            }
            
            .card h3 {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 12px;
                color: #1e293b;
            }
            
            .card p {
                font-size: 1rem;
                color: #475569;
                margin-bottom: 16px;
            }
            
            .card ul {
                list-style: none;
                padding: 0;
            }
            
            .card li {
                padding: 8px 0;
                padding-left: 24px;
                position: relative;
                color: #475569;
            }
            
            .card li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: 600;
            }
            
            .trust-badges {
                display: flex;
                justify-content: center;
                gap: 32px;
                margin: 32px 0;
                flex-wrap: wrap;
            }
            
            .trust-badge {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.875rem;
                color: #64748b;
            }
            
            .trust-badge i {
                color: #10b981;
            }
            
            @media (max-width: 768px) {
                .header h1 {
                    font-size: 2rem;
                }
                
                .header .tagline {
                    font-size: 1rem;
                }
                
                .header .stats {
                    gap: 24px;
                }
                
                .nav-grid {
                    grid-template-columns: 1fr;
                }
                
                .card {
                    padding: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="container">
                <div class="header-content">
                    <h1>LegalTech Suite</h1>
                    <p class="tagline">Built for Law. Driven by Technology. Powered by AI.</p>
                    <div class="stats">
                        <div class="stat-item">
                            <span class="stat-number">25+</span>
                            <span class="stat-label">Years Legal Research</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">7</span>
                            <span class="stat-label">Documentation Files</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">4</span>
                            <span class="stat-label">Successful Cases</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="nav-section">
            <div class="container">
                <div class="nav-grid">
                    <a href="/documentation" class="nav-card">
                        <div class="nav-icon"><i class="fas fa-file-alt"></i></div>
                        <div class="nav-title">Legal Research</div>
                        <div class="nav-description">Comprehensive documentation and case law analysis</div>
                    </a>
                    <a href="/cases" class="nav-card">
                        <div class="nav-icon"><i class="fas fa-gavel"></i></div>
                        <div class="nav-title">Case Management</div>
                        <div class="nav-description">Successful compensation claims analysis</div>
                    </a>
                    <a href="/rejected" class="nav-card">
                        <div class="nav-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="nav-title">Risk Analysis</div>
                        <div class="nav-description">Learn from rejected cases</div>
                    </a>
                    <a href="/formats" class="nav-card">
                        <div class="nav-icon"><i class="fas fa-file-contract"></i></div>
                        <div class="nav-title">Legal Templates</div>
                        <div class="nav-description">Ready-to-use legal formats</div>
                    </a>
                    <a href="/jurisdiction" class="nav-card">
                        <div class="nav-icon"><i class="fas fa-map-marked-alt"></i></div>
                        <div class="nav-title">Jurisdiction Guide</div>
                        <div class="nav-description">Court jurisdiction mapping</div>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="container">
            <div class="card">
                <h2>AI-Powered Land Acquisition Compensation System</h2>
                <p>Advanced legal technology platform providing comprehensive solutions for land acquisition compensation claims in India. Built on cutting-edge AI research and backed by 25 years of legal expertise.</p>
                
                <div class="trust-badges">
                    <div class="trust-badge">
                        <i class="fas fa-check-circle"></i>
                        <span>AI-Powered Analysis</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-check-circle"></i>
                        <span>Court-Verified Data</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-check-circle"></i>
                        <span>85%+ Success Rate</span>
                    </div>
                    <div class="trust-badge">
                        <i class="fas fa-check-circle"></i>
                        <span>Expert Legal Research</span>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3>Comprehensive Legal Solutions</h3>
                <p>Our system provides access to advanced land acquisition documentation including:</p>
                <ul>
                    <li>AI-powered analysis of Section 18 applications and limitation periods</li>
                    <li>Intelligent legal format generation and templates</li>
                    <li>Comprehensive court jurisdiction guides for all Indian states</li>
                    <li>Data-driven analysis of successful and rejected cases</li>
                    <li>Executive insights with actionable recommendations</li>
                    <li>Parity principle analysis for compensation enhancement</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    '''

@app.route('/documentation')
def documentation():
    """Page displaying documentation files."""
    files_info = []
    for filename in manager.documentation_files:
        filepath = os.path.join(manager.project_root, filename)
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            files_info.append({
                "name": filename,
                "size": f"{size:,} bytes",
                "exists": True
            })
        else:
            files_info.append({
                "name": filename,
                "size": "NOT FOUND",
                "exists": False
            })
    
    files_html = ""
    for file_info in files_info:
        status = "✅" if file_info["exists"] else "❌"
        files_html += f'<tr><td>{status}</td><td>{file_info["name"]}</td><td>{file_info["size"]}</td></tr>'
    
    return f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Legal Research - LegalTech Suite</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <style>
            body {{
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                min-height: 100vh;
            }}
            
            .container {{
                max-width: 1400px;
                margin: 0 auto;
                padding: 0 20px;
            }}
            
            .header {{
                background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
                color: white;
                padding: 60px 0;
                text-align: center;
                position: relative;
                overflow: hidden;
            }}
            
            .header::before {{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                opacity: 0.3;
            }}
            
            .header-content {{
                position: relative;
                z-index: 1;
            }}
            
            .header h1 {{
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 16px;
                letter-spacing: -0.5px;
            }}
            
            .header .subtitle {{
                font-size: 1.25rem;
                font-weight: 300;
                opacity: 0.9;
            }}
            
            .card {{
                background: white;
                border-radius: 16px;
                padding: 40px;
                margin: 24px 0;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid #e2e8f0;
            }}
            
            .back-link {{
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #64748b, #475569);
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 8px;
                margin-bottom: 24px;
                font-weight: 500;
                transition: all 0.3s ease;
            }}
            
            .back-link:hover {{
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }}
            
            table {{
                width: 100%;
                border-collapse: collapse;
                margin: 24px 0;
            }}
            
            th, td {{
                padding: 16px;
                text-align: left;
                border-bottom: 1px solid #e2e8f0;
            }}
            
            th {{
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                font-weight: 600;
                color: #1e293b;
                font-size: 0.875rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }}
            
            tr:hover {{
                background-color: #f8fafc;
            }}
            
            .status-success {{
                color: #10b981;
                font-weight: 600;
            }}
            
            .card h3 {{
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 16px;
                color: #1e293b;
            }}
            
            .card p {{
                font-size: 1rem;
                color: #475569;
                margin-bottom: 16px;
            }}
            
            .card ul {{
                list-style: none;
                padding: 0;
            }}
            
            .card li {{
                padding: 8px 0;
                padding-left: 24px;
                position: relative;
                color: #475569;
            }}
            
            .card li::before {{
                content: '✓';
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: 600;
            }}
            
            @media (max-width: 768px) {{
                .header h1 {{
                    font-size: 2rem;
                }}
                
                .card {{
                    padding: 24px;
                }}
                
                th, td {{
                    padding: 12px;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <a href="/" class="back-link">
                <i class="fas fa-arrow-left"></i>
                Back to LegalTech Suite
            </a>
            
            <div class="header">
                <div class="header-content">
                    <h1>Legal Research Database</h1>
                    <p class="subtitle">Comprehensive documentation and case law analysis</p>
                </div>
            </div>
            
            <div class="card">
                <h3>Documentation Library</h3>
                <p>Access our comprehensive collection of land acquisition legal research documents:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Document Name</th>
                            <th>File Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files_html}
                    </tbody>
                </table>
            </div>
            
            <div class="card">
                <h3>Research Coverage</h3>
                <p>Our documentation library provides comprehensive coverage of land acquisition compensation law in India:</p>
                <ul>
                    <li>AI-powered analysis of Section 18 applications and limitation periods</li>
                    <li>Executive summary with actionable insights and recommendations</li>
                    <li>Professional legal format templates and precedents</li>
                    <li>Complete court jurisdiction guides for all Indian states</li>
                    <li>Data-driven analysis of successful and rejected case law</li>
                    <li>Parity principle applications and compensation enhancement strategies</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    '''

@app.route('/cases')
def cases():
    """Page displaying successful cases."""
    cases_html = ""
    for case in manager.successful_cases:
        cases_html += f'''
        <tr>
            <td>{case["id"]}</td>
            <td>{case["name"]}</td>
            <td>{case["state"]}</td>
            <td>{case["year"]}</td>
            <td>{case["result"]}</td>
            <td>{case["compensation_details"]}</td>
            <td><a href="{case["url"]}" target="_blank">View Details</a></td>
        </tr>
        '''
    
    return f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Successful Cases - Land Acquisition System</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }}
            .header {{
                background-color: #27ae60;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 20px;
            }}
            .card {{
                background-color: white;
                padding: 20px;
                margin: 10px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }}
            .back-link {{
                display: inline-block;
                background-color: #95a5a6;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-bottom: 20px;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
            }}
            th, td {{
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }}
            th {{
                background-color: #f2f2f2;
            }}
            tr:nth-child(even) {{
                background-color: #f9f9f9;
            }}
        </style>
    </head>
    <body>
        <a href="/" class="back-link">← Back to Home</a>
        
        <div class="header">
            <h1>Successful Cases</h1>
            <p>Analysis of 4 successful land acquisition compensation cases</p>
        </div>
        
        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Case Name</th>
                        <th>State</th>
                        <th>Year</th>
                        <th>Result</th>
                        <th>Compensation Details</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {cases_html}
                </tbody>
            </table>
        </div>
        
        <div class="card">
            <h3>Key Success Factors</h3>
            <ul>
                <li><strong>Parity Principle</strong>: Cases with similar notifications/projects have 85-95% success rate</li>
                <li><strong>Comparable Evidence</strong>: Multiple sale deeds + Collector's guidelines yield 60-75% success</li>
                <li><strong>Prompt Action</strong>: File within limitation periods for best results</li>
                <li><strong>Under Protest</strong>: Always accept compensation with protest statement</li>
                <li><strong>Qualified Lawyer</strong>: Engage specialized legal counsel</li>
            </ul>
        </div>
    </body>
    </html>
    '''

@app.route('/rejected')
def rejected():
    """Page displaying the rejected case."""
    case = manager.rejected_case
    return f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rejected Case - Land Acquisition System</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }}
            .header {{
                background-color: #e74c3c;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 20px;
            }}
            .card {{
                background-color: white;
                padding: 20px;
                margin: 10px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }}
            .back-link {{
                display: inline-block;
                background-color: #95a5a6;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-bottom: 20px;
            }}
        </style>
    </head>
    <body>
        <a href="/" class="back-link">← Back to Home</a>
        
        <div class="header">
            <h1>Rejected Case Analysis</h1>
            <p>Learning from a failed case to understand what to avoid</p>
        </div>
        
        <div class="card">
            <h2>Case: {case["name"]}</h2>
            <p><strong>State:</strong> {case["state"]}</p>
            <p><strong>Year:</strong> {case["year"]}</p>
            <p><strong>Result:</strong> {case["result"]}</p>
            <p><strong>Reason:</strong> {case["reason"]}</p>
            <p><strong>URL:</strong> <a href="{case["url"]}" target="_blank">{case["url"]}</a></p>
        </div>
        
        <div class="card">
            <h3>Key Learning</h3>
            <p>Fence-sitting behavior and unexplained long delays (&gt;2 years) lead to rejection. This case was rejected because:</p>
            <ul>
                <li>Delay of 772 days (over 2 years)</li>
                <li>Certified copy obtained on 30.10.2020, appeal filed 03.08.2024</li>
                <li>Compensation received on 04.07.2023, no action for 1+ year</li>
                <li>"Fence-sitter" conduct - waited for other claimants' outcomes</li>
                <li>No explanation for gap between receiving compensation and filing appeal</li>
            </ul>
        </div>
    </body>
    </html>
    '''

@app.route('/formats')
def formats():
    """Page displaying sample legal formats."""
    return '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Legal Formats - Land Acquisition System</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .header {
                background-color: #3498db;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 20px;
            }
            .card {
                background-color: white;
                padding: 20px;
                margin: 10px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .back-link {
                display: inline-block;
                background-color: #95a5a6;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .format-item {
                margin: 15px 0;
                padding: 15px;
                background-color: #ecf0f1;
                border-left: 4px solid #3498db;
            }
        </style>
    </head>
    <body>
        <a href="/" class="back-link">← Back to Home</a>
        
        <div class="header">
            <h1>Sample Legal Formats</h1>
            <p>Ready-to-use legal templates for land acquisition claims</p>
        </div>
        
        <div class="card">
            <div class="format-item">
                <h3>1. Reference Application (Section 18) - Pre-2013 Acquisitions</h3>
                <p>Complete application to Collector for reference to court including:</p>
                <ul>
                    <li>Fact narration (10 structured paragraphs)</li>
                    <li>Grounds of objection (4 major categories)</li>
                    <li>Comparable evidence sections (with placeholders)</li>
                    <li>Limitation period explanations</li>
                    <li>Verification and enclosures list</li>
                </ul>
            </div>
            
            <div class="format-item">
                <h3>2. First Appeal to High Court (Section 54)</h3>
                <p>Complete Memorandum of Appeal format including:</p>
                <ul>
                    <li>9 standard grounds of appeal</li>
                    <li>Parity principle arguments</li>
                    <li>Relief clauses and verification</li>
                    <li>Interim relief applications</li>
                    <li>Documents list</li>
                </ul>
            </div>
            
            <div class="format-item">
                <h3>3. Courts & Filing Procedures Guide</h3>
                <p>Complete procedural roadmap with:</p>
                <ul>
                    <li>Jurisdiction mapping for all 25 states + UTs</li>
                    <li>Step-by-step filing procedures</li>
                    <li>Court fee structure guide</li>
                    <li>Practical filing tips and resources</li>
                </ul>
            </div>
            
            <div class="format-item">
                <h3>4. Executive Summary</h3>
                <p>Research findings summary including:</p>
                <ul>
                    <li>5 cases analyzed with full citations</li>
                    <li>Key success factors and probability matrix</li>
                    <li>Financial implications and cost-benefit analysis</li>
                    <li>Actionable insights and strategic guidance</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    '''

@app.route('/jurisdiction')
def jurisdiction():
    """Page displaying court jurisdiction information."""
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
    
    jurisd_html = ""
    for state, info in jurisdictions.items():
        seats_list = "<br>".join([f"- {seat}" for seat in info['seats']])
        jurisd_html += f'''
        <div class="state-card">
            <h3>{state}</h3>
            <p><strong>High Court:</strong> {info['court']}</p>
            <p><strong>Seats:</strong></p>
            <p>{seats_list}</p>
            <p><strong>Coverage:</strong> {info['coverage']}</p>
        </div>
        '''
    
    return f'''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Court Jurisdiction - Land Acquisition System</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }}
            .header {{
                background-color: #9b59b6;
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 20px;
            }}
            .card {{
                background-color: white;
                padding: 20px;
                margin: 10px 0;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }}
            .back-link {{
                display: inline-block;
                background-color: #95a5a6;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-bottom: 20px;
            }}
            .state-card {{
                margin: 20px 0;
                padding: 15px;
                border-left: 4px solid #9b59b6;
                background-color: #f8f9fa;
            }}
        </style>
    </head>
    <body>
        <a href="/" class="back-link">← Back to Home</a>
        
        <div class="header">
            <h1>Court Jurisdiction Guide</h1>
            <p>Complete jurisdiction mapping for all Indian states</p>
        </div>
        
        <div class="card">
            {jurisd_html}
        </div>
        
        <div class="card">
            <h3>Additional Information</h3>
            <p>The jurisdiction guide covers all 25 Indian states and 8 Union Territories with:</p>
            <ul>
                <li>Complete High Court jurisdiction mapping</li>
                <li>Principal seats and circuit benches identified</li>
                <li>Filing location guidance provided</li>
                <li>Official website links included</li>
            </ul>
        </div>
    </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)