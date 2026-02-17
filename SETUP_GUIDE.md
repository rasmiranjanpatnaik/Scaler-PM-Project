# Setup Guide - AI Project Manager Prototype

This guide will walk you through setting up and running the AI Project Manager prototype.

## Prerequisites

Before starting, ensure you have:
- **Node.js** 18.0 or higher installed ([Download](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code, Cursor, or similar)
- (Optional) OpenAI API key for full AI features

## Quick Start (5 minutes)

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI SDK
- Other dependencies

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Or manually create .env file with:
OPENAI_API_KEY=your_key_here
```

**Note**: The app works without an API key, but AI features will be limited.

### Step 3: Get OpenAI API Key (Optional but Recommended)

1. Visit https://platform.openai.com
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key and add it to `.env` file

**Cost**: ~$0.0007 per task generation (very affordable for testing)

### Step 4: Run Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

You should see the AI Project Manager interface!

## Testing the Application

### Basic Functionality Test

1. **Add a Task**:
   - Type "Complete project documentation" in the input field
   - Press Enter or click "Add Task"
   - Task should appear in the list

2. **Complete a Task**:
   - Click the circle icon next to a task
   - Task should be marked as complete (green checkmark)

3. **Delete a Task**:
   - Click the trash icon
   - Task should be removed

### AI Features Test

1. **Generate Tasks with AI**:
   - In the "AI Task Generator" section, type: "Plan a marketing campaign"
   - Click "Generate" button
   - Wait 2-3 seconds
   - 4-6 tasks should appear automatically

2. **Quick Prompts**:
   - Click any quick prompt button (e.g., "Plan a software project")
   - Tasks should generate automatically

3. **Test Without API Key**:
   - Remove or comment out OPENAI_API_KEY in `.env`
   - Restart the dev server
   - AI generator should still work with fallback tasks

## Troubleshooting

### Issue: "Module not found" errors

**Solution**: Run `npm install` again to ensure all dependencies are installed.

### Issue: Port 3000 already in use

**Solution**: 
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Issue: OpenAI API errors

**Solutions**:
1. Check your API key is correct in `.env`
2. Ensure you have credits in your OpenAI account
3. Check your API usage limits
4. The app includes fallback, so it should still work

### Issue: TypeScript errors

**Solution**: 
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Styles not loading

**Solution**: Ensure Tailwind CSS is properly configured:
```bash
# Rebuild
npm run build
```

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Run Production Server

```bash
npm start
```

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your key

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. In Netlify dashboard:
   - Connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variable: `OPENAI_API_KEY`

## Project Structure

```
Pm project/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── generate-tasks/ # OpenAI integration
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── TaskCard.tsx      # Task display component
│   └── AISuggestions.tsx # AI generator UI
├── types/                # TypeScript types
│   └── task.ts           # Task interface
├── .env.example          # Environment template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
└── README.md             # Main documentation
```

## Environment Variables

### Required (for full functionality)
- `OPENAI_API_KEY`: Your OpenAI API key

### Optional
- `NODE_ENV`: Set to `production` for production builds

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm start`: Run production server
- `npm run lint`: Run ESLint

## Next Steps

1. **Customize the UI**: Edit components in `/components`
2. **Add Features**: Extend functionality in `/app/page.tsx`
3. **Modify AI Prompts**: Edit `/app/api/generate-tasks/route.ts`
4. **Add Authentication**: Integrate NextAuth.js or similar
5. **Add Database**: Integrate PostgreSQL, MongoDB, or Supabase

## Getting Help

- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

## Performance Tips

1. **Enable Caching**: Add Redis for API response caching
2. **Optimize Images**: Use Next.js Image component
3. **Code Splitting**: Already handled by Next.js
4. **API Rate Limiting**: Add middleware for rate limiting

## Security Checklist

- ✅ API keys in environment variables
- ✅ Input validation on client and server
- ✅ Error handling with fallbacks
- ⚠️ Add authentication for production
- ⚠️ Add rate limiting for API routes
- ⚠️ Add CORS configuration if needed
- ⚠️ Sanitize user inputs

---

**Happy coding! 🚀**

