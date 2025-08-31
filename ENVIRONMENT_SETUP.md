# Environment Variables Setup Guide

This document outlines all required environment variables for the E-commerce application deployment.

## Required Environment Variables

### Database Configuration
```bash
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database_name"
```

### NextAuth Configuration
```bash
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

### Google OAuth Configuration
```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Stripe Payment Configuration
```bash
STRIPE_SECRET_KEY="sk_test_or_live_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_or_live_key"
STRIPE_WEBHOOK_SECRET="whsec_webhook_secret"
```

## Setup Instructions

### 1. Local Development
Create a `.env.local` file in the root directory with all the above variables.

### 2. GitHub Actions Secrets
Add the following secrets to your GitHub repository:
- Go to Repository Settings → Secrets and variables → Actions
- Add each environment variable as a repository secret

### 3. Vercel Environment Variables
Add environment variables in Vercel Dashboard:
- Go to your project in Vercel Dashboard
- Navigate to Settings → Environment Variables
- Add each variable for Production, Preview, and Development environments

### 4. Vercel CLI Setup (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables via CLI
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
# ... add all other variables
```

## Deployment Secrets for GitHub Actions

Add these additional secrets for automated deployment:

```bash
VERCEL_TOKEN="your-vercel-token"
VERCEL_ORG_ID="your-organization-id"
VERCEL_PROJECT_ID="your-project-id"
```

### How to get Vercel deployment tokens:

1. **VERCEL_TOKEN**: 
   - Go to Vercel → Account Settings → Tokens
   - Create a new token with appropriate scope

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   - Run `vercel link` in your project directory
   - Check the `.vercel/project.json` file for these IDs

## Security Best Practices

1. **Never commit environment variables to version control**
2. **Use different keys for development and production**
3. **Rotate secrets regularly**
4. **Limit scope of tokens and keys**
5. **Monitor usage of API keys**

## Testing Environment Variables

After setting up, verify your configuration:

```bash
# Test build locally
npm run build

# Test Prisma connection
npx prisma db push

# Test the application
npm run dev
```

## Troubleshooting

### Common Issues:
1. **Build fails**: Check if all required environment variables are set
2. **Database connection errors**: Verify DATABASE_URL format and credentials
3. **Authentication issues**: Ensure NEXTAUTH_SECRET is set and NEXTAUTH_URL matches your domain
4. **Payment issues**: Verify Stripe keys and webhook secret

### Debug Commands:
```bash
# Check Vercel environment variables
vercel env ls

# Test Prisma connection
npx prisma studio

# Validate environment in build
npm run build -- --debug
```