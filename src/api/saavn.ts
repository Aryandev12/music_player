const BASE_URL = "https://saavn.sumit.co";

export async function searchSongs(query: string, page = 1) {
  if (!query) return [];

  const response = await fetch(
    `${BASE_URL}/api/search/songs?query=${encodeURIComponent(query)}&page=${page}`
  );

  const json = await response.json();

  return json?.data?.results ?? [];
}