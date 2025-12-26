const API_URL = 'http://localhost:8000/api/v1';

export async function getLocations() {
  const res = await fetch(`${API_URL}/locations/`, {
    cache: 'no-store', // Fetch fresh data every time
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}
