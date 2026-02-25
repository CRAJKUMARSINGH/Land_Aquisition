# Land Acquisition Legal Suite - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Quick Start

```bash
cd landacquisition
npm install
npm run build
pip install -r requirements.txt
python server.py
```

Access at: http://localhost:5000

## 📦 Build for Production

```bash
cd landacquisition
npm run build
```

This creates an optimized production build in `dist/` folder.

## 🌐 Deployment Options

### Option 1: Heroku

```bash
cd landacquisition
heroku create your-app-name
git push heroku main
```

### Option 2: Vercel (Frontend) + Backend Separately

Frontend:
```bash
cd landacquisition
vercel --prod
```

Backend: Deploy server.py to any Python hosting (Railway, Render, etc.)

### Option 3: Docker

```bash
cd landacquisition
docker build -t land-acquisition-app .
docker run -p 5000:5000 land-acquisition-app
```

### Option 4: Traditional Server

1. Build the app: `npm run build`
2. Copy `dist/` folder and `server.py` to server
3. Install Python dependencies: `pip install -r requirements.txt`
4. Run with gunicorn: `gunicorn server:app -b 0.0.0.0:5000`

## 🔧 Environment Variables

Create `.env` file:
```
PORT=5000
NODE_ENV=production
```

## 📊 Performance Optimization

- ✅ React production build (minified)
- ✅ Code splitting enabled
- ✅ Lazy loading for routes
- ✅ Optimized images
- ✅ Gzip compression
- ✅ CDN-ready static assets

## 🔒 Security Checklist

- [ ] Enable HTTPS
- [ ] Set secure headers
- [ ] Configure CORS properly
- [ ] Rate limiting on API
- [ ] Input validation
- [ ] Regular dependency updates

## 📈 Monitoring

Add monitoring tools:
- Application performance: New Relic, DataDog
- Error tracking: Sentry
- Analytics: Google Analytics, Plausible

## 🎯 Post-Deployment

1. Test all features
2. Check mobile responsiveness
3. Verify API endpoints
4. Test search functionality
5. Monitor performance
6. Set up backups

---

**Status:** Production Ready ✅
