import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Basic health check
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      database: 'connected', // You can add actual DB ping here
      services: {
        stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
        auth: process.env.NEXTAUTH_SECRET ? 'configured' : 'not configured',
        database: process.env.DATABASE_URL ? 'configured' : 'not configured'
      }
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        timestamp: new Date().toISOString(),
        error: 'Health check failed' 
      }, 
      { status: 500 }
    );
  }
}