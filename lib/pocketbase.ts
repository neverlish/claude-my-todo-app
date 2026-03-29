import PocketBase from 'pocketbase';

const pb = new PocketBase(
  (process.env.NEXT_PUBLIC_POCKETBASE_URL ?? 'http://127.0.0.1:8090').replace(/\/$/, '')
);

// Clear any cached auth token in the browser (no auth used yet)
if (typeof window !== 'undefined') {
  pb.authStore.clear();
}

export default pb;
