# Vercel Deployment Guide

## Quick Start

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

## Environment Variables Setup

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_GOOGLE_MAP_KEY=AIzaSyCG3ZhrC_ej2WjcROWDvf6s7f9GNVMHcN0
NEXT_PUBLIC_BASE_URL=https://carrotfoodelivery.com
NEXT_CLIENT_HOST_URL=https://carrotfoodelivery.com
GOOGLE_SIGN_IN_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_SITE_VERSION=3.1
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDD3Bs81nJUQ91wURfpGcmUl5_FJ3vpfWU
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=food-63111.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=food-63111
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=food-63111.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=383776666755
NEXT_PUBLIC_FIREBASE_APP_ID=1:383776666755:web:06bcea210c81c2350357b6
```

## Build Settings

Vercel will auto-detect Next.js. If needed, configure:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Domain Configuration

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Automatic Deployments

- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches
- **Pull Requests**: Automatic preview deployments

## CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify Node.js version compatibility
- Review build logs in Vercel dashboard

### Runtime Errors
- Check server-side logs in Vercel dashboard
- Verify API endpoints are accessible
- Ensure CORS is configured on backend

### Environment Variables Not Working
- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)
