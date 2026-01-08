# Land Acquisition Web Application

This web application provides a browser-based interface to the comprehensive land acquisition documentation system.

## Features

- Browser-based interface to access all land acquisition documentation
- Responsive design that works on desktop and mobile devices
- Organized sections for different types of legal information
- Easy navigation between documentation, cases, and legal formats
- Detailed information about successful and rejected cases

## Components

- `web_app.py` - Flask web application
- `launch_web.bat` - Batch file to start the web server and open browser
- `WEB_APP_README.md` - This file

## How to Run

### Method 1: Using the batch file (Recommended)
1. Double-click on `launch_web.bat`
2. The web server will start and your browser will open automatically
3. The application will be available at `http://127.0.0.1:5000`

### Method 2: Manual startup
1. Open Command Prompt or PowerShell
2. Navigate to the project directory:
   ```
   cd c:\Users\Rajkumar\Land_Aquisition
   ```
3. Run the web application:
   ```
   python web_app.py
   ```
4. Open your browser and go to `http://127.0.0.1:5000`

## Sections Available

1. **Documentation Files** - Browse all 7 documentation files with size information
2. **Successful Cases** - Access detailed information about 4 successful land acquisition cases
3. **Rejected Case** - Review the rejected case to understand what to avoid
4. **Legal Formats** - View sample legal formats and templates
5. **Court Jurisdiction** - Check court jurisdiction information for all Indian states

## Technology Stack

- Backend: Python Flask
- Frontend: HTML, CSS
- Server: Built-in Flask development server

## Important Notes

- The web server runs locally on your machine
- The application is accessible at `http://127.0.0.1:5000` or `http://localhost:5000`
- To stop the server, press Ctrl+C in the command window where it's running
- This is a development server and should not be used in production

## Legal Disclaimer

This application and its underlying documentation are for educational and reference purposes only. They are not a substitute for qualified legal advice. Always consult a qualified lawyer before filing any legal proceedings. Success depends on specific facts and evidence in each case.