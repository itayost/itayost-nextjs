// src/app/api/newsletter/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  // Add your email service logic here (SendGrid, Resend, etc.)
  // For now, just log and return success
  console.log('Newsletter subscription:', email);

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({ 
    success: true, 
    message: 'Successfully subscribed!' 
  });
}