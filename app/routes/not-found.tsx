export default function NotFound() {
  throw new Response('not-found', { status: 404, statusText: 'not-found' });
}
