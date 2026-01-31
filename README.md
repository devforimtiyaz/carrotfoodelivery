# Carrot FooDelivery - Food Delivery Platform

A modern food delivery web application built with Next.js, React, and Material-UI.

## Tech Stack

- **Framework**: Next.js 15.1.6
- **UI Library**: React 18.2.0
- **Styling**: Material-UI (MUI) 5.x, Emotion
- **State Management**: Redux Toolkit, Redux Persist
- **Data Fetching**: React Query
- **Maps**: Google Maps API
- **Authentication**: Firebase, Google Sign-In, Apple Login
- **Forms**: Formik + Yup validation
- **Internationalization**: i18next, react-i18next

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Google Maps API key
- Firebase project credentials

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pawan99saini/reactfood.git
   cd reactfood
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_GOOGLE_MAP_KEY=your_google_maps_api_key
   NEXT_PUBLIC_BASE_URL=your_backend_api_url
   NEXT_CLIENT_HOST_URL=your_frontend_url
   GOOGLE_SIGN_IN_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_SITE_VERSION=3.1
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pawan99saini/reactfood)

### Manual Deployment

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy from CLI**
   ```bash
   vercel
   ```

3. **Deploy from GitHub**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables in Vercel dashboard
   - Deploy

### Environment Variables in Vercel

Add these environment variables in your Vercel project settings:

| Variable Name | Description |
|--------------|-------------|
| `NEXT_PUBLIC_GOOGLE_MAP_KEY` | Google Maps API key |
| `NEXT_PUBLIC_BASE_URL` | Backend API URL |
| `NEXT_CLIENT_HOST_URL` | Frontend URL |
| `GOOGLE_SIGN_IN_CLIENT_ID` | Google OAuth client ID |
| `NEXT_PUBLIC_SITE_VERSION` | Site version (3.1) |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |

### Vercel Configuration

The project includes a `vercel.json` file with the following settings:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: Automatic (latest LTS)

## Project Structure

```
reactfood/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Next.js pages and routes
│   ├── redux/           # Redux store and slices
│   ├── hooks/           # Custom React hooks
│   ├── api/             # API configuration
│   ├── utils/           # Utility functions
│   ├── language/        # i18n translations
│   └── styled-components/ # Styled components
├── public/              # Static assets
├── scripts/             # Build scripts
├── vercel.json          # Vercel configuration
└── .env                 # Environment variables
```

## Recent Fixes (v3.1)

- Fixed Next.js TypeError on root route
- Resolved React unknown prop warnings in styled components
- Added missing `key` props to list items
- Fixed invalid DOM properties (`fontweight` → `fontWeight`)
- Improved error handling in `getServerSideProps`
- Fixed API data fetching with proper headers

## Features

- Browse restaurants and cuisines
- Shopping cart and checkout
- Location-based restaurant search
- Google Maps integration
- Multiple authentication methods
- Multi-language support (i18n)
- Responsive design
- Push notifications
- Order tracking
- Restaurant ratings and reviews

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software for Carrot FooDelivery.

## Contact

For support or inquiries, contact: founder@carrotfoodelivery.com
