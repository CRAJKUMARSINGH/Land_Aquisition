#!/usr/bin/env python3
"""
Launcher for the Land Acquisition Compensation Claims Management System
"""

import subprocess
import sys
import os

def main():
    print("="*60)
    print("LAND ACQUISITION COMPENSATION CLAIMS MANAGEMENT SYSTEM")
    print("="*60)
    print("Launching the application...")
    print()
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    app_path = os.path.join(script_dir, "land_acquisition_app.py")
    
    if not os.path.exists(app_path):
        print(f"Error: Application file not found at {app_path}")
        print("Please make sure land_acquisition_app.py exists in this directory.")
        return
    
    try:
        # Launch the main application
        result = subprocess.run([sys.executable, app_path])
        
        if result.returncode == 0:
            print("\nApplication exited successfully.")
        else:
            print(f"\nApplication exited with code: {result.returncode}")
            
    except FileNotFoundError:
        print("Error: Python interpreter not found.")
        print("Please make sure Python is installed and in your system PATH.")
    except Exception as e:
        print(f"An error occurred while launching the application: {e}")

if __name__ == "__main__":
    main()