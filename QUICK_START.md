# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Testing the Application

1. **Landing Page**: Visit `/` to see the landing page
2. **Start Analysis**: Click "Start Free Analysis" button
3. **Fill Form**: Complete the 3-step form:
   - Step 1: Enter name and email
   - Step 2: Enter career information
   - Step 3: Enter skills and timeline
4. **View Report**: After submission, you'll see your personalized career report
5. **Test CTAs**: Click the conversion buttons at the bottom of the report

## 🔧 Troubleshooting

**Issue**: Build errors
- **Solution**: Delete `.next` folder and run `npm install` again

**Issue**: Port 3000 already in use
- **Solution**: Run `npm run dev -- -p 3001` to use a different port

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

For detailed instructions, see [README.md](./README.md)
