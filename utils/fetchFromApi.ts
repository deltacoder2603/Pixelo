import axios from "axios";

interface ApiOptions {
  url: string;
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
  };
}

const BASE_URL = "https://yt-api.p.rapidapi.com";

const getOptions = (apiKey: string): ApiOptions => {
  return {
    url: BASE_URL,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
    },
  };
};

type ApiKey = string | undefined; 

const apiKeys: ApiKey[] = [
  process.env.NEXT_PUBLIC_API_KEY_1,
  process.env.NEXT_PUBLIC_API_KEY_2,
  process.env.NEXT_PUBLIC_API_KEY_3,
];

const filteredApiKeys = apiKeys.filter((key) => key !== undefined);

let currentApiKeyIndex = 0;

export const fetchFromAPI = async (url: string, retries = 3): Promise<any> => {
  try {
    const currentApiKey = filteredApiKeys[currentApiKeyIndex];
    if (!currentApiKey) {
      throw new Error("No available API keys"); 
    }
    const { data } = await axios.get(`${BASE_URL}/${url}`, getOptions(currentApiKey));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      if (status === 401) {
        throw error;
      } else if (status === 429 && retries > 0) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % filteredApiKeys.length;
        return fetchFromAPI(url, retries - 1);
      }
    }
    throw error;
  }
};