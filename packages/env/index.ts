import { z } from 'zod';

const serverSchema = z.object({
  // Common
  PORT: z.string().optional().default('3001'),
  DATABASE_URL: z.string().url().optional(), // Opcional porque puede estar en apps/api pero no en apps/web si se usa REST
  
  // PayPal Private
  PAYPAL_ENV: z.enum(['production', 'sandbox']).default('sandbox'),
  PAYPAL_CLIENT_ID: z.string().min(1),
  PAYPAL_CLIENT_SECRET: z.string().min(1),
  PAYPAL_WEBHOOK_ID: z.string().optional(),

  // Resend
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email().optional().default('confirmaciones@jess-web.com'),

  // Calendly
  CALENDLY_TOKEN_SECRET: z.string().min(1),
  CALENDLY_EVENT_TYPE_URI: z.string().min(1),
});

const clientSchema = z.object({
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
});

/**
 * Validates environment variables.
 * In Next.js, this should be called in a server component or route.
 */
export function validateEnv() {
  const isServer = typeof window === 'undefined';
  
  // Validate Client Side (always needed)
  const clientResult = clientSchema.safeParse({
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  });

  if (!clientResult.success) {
    console.error('❌ Invalid Client Environment Variables:', clientResult.error.flatten().fieldErrors);
    throw new Error('Invalid Client Environment Variables');
  }

  // Validate Server Side (only if on server)
  if (isServer) {
    const serverResult = serverSchema.safeParse(process.env);
    if (!serverResult.success) {
      console.error('❌ Invalid Server Environment Variables:', serverResult.error.flatten().fieldErrors);
      throw new Error('Invalid Server Environment Variables');
    }
    return { ...clientResult.data, ...serverResult.data };
  }

  return clientResult.data;
}

// Export pre-validated env for ease of use (use with caution in SSR)
export const env = (typeof window === 'undefined') ? validateEnv() : {} as any;
