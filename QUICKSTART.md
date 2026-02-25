# 🚀 Quick Start Guide

## Land Acquisition Legal Suite

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git (for deployment)

## 🏃 Run Locally (Development)

### Option 1: Using Batch File (Windows)
```bash
START.bat
```

### Option 2: Manual Steps
```bash
cd landacquisition
npm install
npm start
```

Access at: **http://localhost:3000**

## 🌐 Production Deployment

### Step 1: Build
```bash
cd landacquisition
npm install
npm run build
```

### Step 2: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Run Server
```bash
python server.py
```

Access at: **http://localhost:5000**

## 🐳 Docker Deployment

```bash
cd landacquisition
docker build -t land-acquisition-app .
docker run -p 5000:5000 land-acquisition-app
```

Access at: **http://localhost:5000**

## ☁️ Cloud Deployment

### Heroku
```bash
cd landacquisition
heroku create your-app-name
git push heroku main
```

### Vercel (Frontend Only)
```bash
cd landacquisition
npm install -g vercel
vercel --prod
```

### Railway
```bash
cd landacquisition
railway up
```

## 📊 Features

- ✅ Legal Research Database
- ✅ Case Management (4 successful + 1 rejected)
- ✅ Document Drafting Templates
- ✅ Jurisdiction Guide (All Indian States)
- ✅ Risk Analysis
- ✅ Global Search

## 🧪 Testing

```bash
cd landacquisition
npm run test:data          # Data integrity
npm run test:robustness    # 1500 virtual users
```

## 📖 Documentation

- **[HOW_TO_USE.md](HOW_TO_USE.md)** - Complete user guide (START HERE!)
- **[README.md](README.md)** - Main documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Legal documentation
- **[landacquisition/README.md](landacquisition/README.md)** - App details

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Build Errors
```bash
cd landacquisition
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Python Errors
```bash
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 📞 Support

For issues:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md)
2. Review console logs
3. Verify all dependencies installed
4. Check port availability

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0
