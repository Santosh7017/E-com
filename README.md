This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## CI/CD Pipeline & Deployment

This project includes a comprehensive CI/CD pipeline with automated deployment to Vercel.

### 🚀 Automated Deployment Features

- **Continuous Integration**: Automated code quality checks, linting, and type checking
- **Automated Testing**: Build verification and security audits
- **Production Deployment**: Automatic deployment to Vercel on main branch pushes
- **Preview Deployments**: Automatic preview deployments for pull requests
- **Security Monitoring**: Weekly dependency updates and security scans

### 📋 Pipeline Workflow

1. **Code Quality Checks**
   - ESLint code linting
   - TypeScript type checking
   - Security vulnerability scanning
   - Dependency audit

2. **Build & Test**
   - Install dependencies with caching
   - Generate Prisma client
   - Build Next.js application
   - Cache build artifacts for faster subsequent builds

3. **Deployment**
   - **Production**: Automatic deployment to Vercel on main/master branch
   - **Preview**: Automatic preview deployments for pull requests
   - **Environment Variables**: Secure handling of sensitive configuration

### 🔧 Setup Instructions

#### 1. Environment Variables
Copy the environment template and configure your variables:
```bash
cp .env.example .env.local
```
See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed configuration instructions.

#### 2. GitHub Repository Secrets
Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

**Required for CI/CD:**
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

**Required for Vercel Deployment:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

#### 3. Vercel Project Setup
1. Import your GitHub repository to Vercel
2. Configure environment variables in Vercel Dashboard
3. Get your Vercel deployment tokens:
   ```bash
   vercel login
   vercel link
   # Check .vercel/project.json for ORG_ID and PROJECT_ID
   ```

### 📊 Monitoring & Maintenance

The pipeline includes automated maintenance features:

- **Weekly Security Scans**: Automated dependency vulnerability checks
- **Dependency Updates**: Automated PRs for package updates
- **Deployment Status**: Real-time deployment status notifications
- **Build Caching**: Optimized build times with intelligent caching

### 🛠 Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 📚 Additional Resources

- [Environment Variables Setup Guide](./ENVIRONMENT_SETUP.md)
- [Vercel Platform Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
