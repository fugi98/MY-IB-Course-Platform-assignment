import { http } from 'msw';

export const handlers = [
  http.get('/resource', () => {
    return new Response(JSON.stringify({ id: 'abc-123' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
