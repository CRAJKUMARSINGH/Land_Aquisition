#!/usr/bin/env python3
"""
Production Flask Backend for Land Acquisition Legal Suite
Serves the React build and provides REST API
"""

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

# API Data
SUCCESSFUL_CASES = [
    {
        "id": 1,
        "name": "Kalabhai Hadabhai vs The Deputy Collector",
        "state": "Gujarat",
        "year": 2025,
        "result": "Delay condoned (321 days)",
        "compensation_details": "Delay condoned with condition of no interest for delay period",
        "url": "https://indiankanoon.org/doc/36243800/",
        "strategy": "Delay Condonation"
    },
    {
        "id": 2,
        "name": "The State of Madhya Pradesh vs Chhakkilal",
        "state": "Madhya Pradesh",
        "year": 2025,
        "result": "Compensation enhanced",
        "compensation_details": "Rs. 4,30,167 → Rs. 10,50,000 per hectare",
        "url": "https://indiankanoon.org/doc/123801780/",
        "strategy": "Comparable Evidence"
    },
    {
        "id": 3,
        "name": "Anand S/O Siddappa vs Special Land Acquisition Officer",
        "state": "Karnataka",
        "year": 2025,
        "result": "Compensation enhanced on parity principle",
        "compensation_details": "Rs. 51,000 → Rs. 5,08,000 per acre",
        "url": "https://indiankanoon.org/doc/158251358/",
        "strategy": "Parity Principle"
    },
    {
        "id": 4,
        "name": "Land Acquisition Officer vs Dodla Chinnaiah",
        "state": "Telangana",
        "year": 2024,
        "result": "Enhancement upheld",
        "compensation_details": "Rs. 15,000 → Rs. 45,000 per acre",
        "url": "https://indiankanoon.org/doc/156794082/",
        "strategy": "Market Value Evidence"
    }
]

REJECTED_CASE = {
    "id": 5,
    "name": "Nirubhai Bhurabhai vs SLAO",
    "state": "Gujarat",
    "year": 2025,
    "result": "Delay condonation rejected",
    "reason": "772 days delay, fence-sitting behavior",
    "url": "https://indiankanoon.org/doc/193253261/"
}

# API Routes
@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "message": "Land Acquisition Legal Suite API"})

@app.route('/api/cases')
def get_cases():
    return jsonify({
        "successful": SUCCESSFUL_CASES,
        "rejected": REJECTED_CASE
    })

@app.route('/api/stats')
def get_stats():
    return jsonify({
        "total_cases": len(SUCCESSFUL_CASES) + 1,
        "successful_cases": len(SUCCESSFUL_CASES),
        "rejected_cases": 1,
        "states_covered": 4
    })

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
