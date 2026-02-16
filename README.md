# AI Career Copilot

A production-ready prototype web application that analyzes users' career profiles and drives them to sign up for educational services. Built with Next.js 14, TypeScript, and Tailwind CSS.

**Note:** This is a hardcoded prototype with mock data. All AI analysis and job recommendations use realistic hardcoded responses - no external API calls required!

## 🚀 Features

- **Landing Page**: Modern, conversion-optimized landing page with hero section, benefits, and testimonials
- **Multi-Step Form**: 3-step form collecting user information (Basic Info, Career Info, Skills & Goals)
- **Career Analysis**: Comprehensive career reports with job readiness scores, skill gaps, and roadmaps
- **Results Dashboard**: Beautiful dashboard displaying job readiness score, skill gaps, roadmap, and more
- **Conversion CTAs**: Three conversion points (Free Masterclass, Career Consultation, Premium Course)
- **Lead Capture**: Structured for easy database integration
- **Responsive Design**: Mobile-first, fully responsive UI
- **Error Handling**: Comprehensive validation and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Data**: Hardcoded mock responses (no external APIs required)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- **No API keys required!** This prototype uses hardcoded mock data.

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "Pm project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # OpenAI API integration
│   ├── analysis/
│   │   └── page.tsx              # Multi-step form page
│   ├── report/
│   │   └── page.tsx              # Results dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   └── ui/
│       ├── Button.tsx            # Reusable button component
│       ├── Card.tsx              # Card component
│       ├── ProgressBar.tsx        # Progress bar component
│       └── LoadingSpinner.tsx    # Loading spinner component
├── lib/
│   └── utils.ts                  # Utility functions
└── package.json
```

## 🎯 Usage Flow

1. **Landing Page** (`/`): User sees the hero section and clicks "Start Free Analysis"
2. **Analysis Form** (`/analysis`): User completes 3-step form:
   - Step 1: Name and Email
   - Step 2: Current role, experience, salary, target role
   - Step 3: Skills, timeline, optional resume
3. **AI Processing**: Form data is sent to `/api/analyze` which calls OpenAI
4. **Report Page** (`/report`): Displays comprehensive career analysis with conversion CTAs

## 🔐 Environment Variables

**No environment variables needed!** This prototype uses hardcoded mock data.

If you want to integrate real APIs later, you can add:
```env
OPENAI_API_KEY=your_openai_api_key_here
LINKEDIN_CLIENT_ID=your_linkedin_client_id
NAUKRI_API_KEY=your_naukri_api_key
```

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add environment variables** (optional)
   - No environment variables needed for the prototype!
   - If integrating real APIs later, add your API keys in Vercel settings

4. **Deploy**
   - Vercel will automatically deploy your application
   - Your app will be live at `https://your-project.vercel.app`

## 📊 Analytics Integration

The codebase is structured to easily add analytics:

- Lead capture events are logged in the console (see `app/analysis/page.tsx`)
- User data is stored in sessionStorage (can be migrated to database)
- Conversion events can be tracked at the CTA buttons in `app/report/page.tsx`

To add analytics:
1. Install your analytics SDK (e.g., Google Analytics, Mixpanel)
2. Add tracking calls in:
   - Form submission (`app/analysis/page.tsx`)
   - CTA clicks (`app/report/page.tsx`)

## 🗄️ Database Integration

Currently, lead data is logged to console and stored in sessionStorage. To add database integration:

1. Choose your database (PostgreSQL, MongoDB, etc.)
2. Create a leads table/collection
3. Update `app/analysis/page.tsx` to save to database instead of console.log
4. Add API route for lead storage if needed

Example structure:
```typescript
// In app/analysis/page.tsx, replace console.log with:
await fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    completedAt: new Date().toISOString()
  })
})
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: {
    // Your color values
  }
}
```

### Content
- Landing page content: `app/page.tsx`
- Form fields: `app/analysis/page.tsx`
- Report sections: `app/report/page.tsx`
- AI prompt: `app/api/analyze/route.ts`

### Conversion CTAs
Update the CTA buttons in `app/report/page.tsx`:
- Replace placeholder URLs with your actual booking/checkout pages
- Integrate Calendly embed for consultation booking
- Connect to your course platform for premium program

## 🐛 Troubleshooting

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## 📝 License

This project is private and proprietary.

## 🤝 Support

For issues or questions, please contact the development team.

---

Built with ❤️ using Next.js, TypeScript, and OpenAI
