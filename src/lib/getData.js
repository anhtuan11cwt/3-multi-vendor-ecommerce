const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getData(endpoint) {
  const response = await fetch(`${baseURL}/api/${endpoint}`);
  const data = await response.json();
  return data;
}
