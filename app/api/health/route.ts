import { HealthResponse } from '../../../src/health';

export function GET() {
  const body: HealthResponse = HealthResponse.parse({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
  return Response.json(body);
}