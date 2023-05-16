
export async function getReccomendationData(params) {
    const queryString = Object.entries(params)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.name)}`)
  .join('&');
  const url = `${process.env.REACT_APP_API_BASE_URL}/reccomendation/search?${queryString}`
    const response = await fetch(url,{
    });
    if (!response.ok) {
      throw new Error('Failed to fetch raw water data.');
    }
    const data = await response.json();
    return data;
  }
  