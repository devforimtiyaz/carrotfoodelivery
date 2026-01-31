const fs = require('fs');
const path = require('path');

// Read the service worker template
const swTemplatePath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.js.template');
const swOutputPath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.js');
let swContent = fs.readFileSync(swTemplatePath, 'utf8');

// Replace placeholders with actual environment variables
swContent = swContent
    .replace('FIREBASE_API_KEY_PLACEHOLDER', process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '')
    .replace('FIREBASE_AUTH_DOMAIN_PLACEHOLDER', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '')
    .replace('FIREBASE_PROJECT_ID_PLACEHOLDER', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '')
    .replace('FIREBASE_STORAGE_BUCKET_PLACEHOLDER', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '')
    .replace('FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER', process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '')
    .replace('FIREBASE_APP_ID_PLACEHOLDER', process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '');

// Write the updated content back
fs.writeFileSync(swOutputPath, swContent);

console.log('✅ Firebase service worker configured with environment variables');
