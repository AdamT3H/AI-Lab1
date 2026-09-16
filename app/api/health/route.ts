import type { HealthResponse } from '@/src/health';

export function GET(): Response {
  const body: HealthResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };

  return Response.json(body, { status: 200 });
}
