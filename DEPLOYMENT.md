# Deployment Guide

## Prerequisites
- Vercel account
- GitHub account (repository already connected)
- Supabase PostgreSQL database (or compatible PostgreSQL)

## Environment Variables

Set these in your Vercel project settings (Settings → Environment Variables):

### Required
```
DATABASE_URL=postgresql://user:password@host:port/database
```

Get your `DATABASE_URL` from:
- Supabase: Project Settings → Database → Connection String (Session Pooler)
- Replace `[YOUR-PASSWORD]` with actual password
- URL encode special characters in password

## Deployment Steps

### 1. Vercel Dashboard Setup
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Settings → Environment Variables**
4. Add `DATABASE_URL` variable
5. Set it to your Supabase connection string

### 2. Redeploy
- Go to **Deployments** tab
- Click the latest deployment's three-dot menu
- Select **Redeploy**
- Or push a new commit to `main` branch to trigger automatic deployment

### 3. Verify Deployment
- Visit your deployment URL
- Test admin panel at `/admin` with password `Ward`
- Create a test project to verify database connection

## Domain Setup

To use a custom domain like `seisdelocho.com`:

1. In Vercel **Settings → Domains**
2. Add your custom domain
3. Follow the DNS setup instructions
4. Wait for DNS propagation (can take 24 hours)

## Troubleshooting

### Build fails with "DATABASE_URL not found"
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Trigger a new build/redeploy after setting the variable

### API routes return 500 errors
- Check that DATABASE_URL is correctly set
- Verify Supabase connection is working
- Check function logs in Vercel dashboard

### Admin panel shows 401 errors
- Clear browser cookies
- Log in again with password `Ward`
- Check that cookies are enabled in browser

## Local Development

For local development, create `.env.local`:
```
DATABASE_URL="your-database-url"
```

Then run:
```bash
npm install
npm run dev
```

Visit http://localhost:3000
