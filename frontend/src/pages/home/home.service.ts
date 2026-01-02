import axios from "axios";

export interface ShortenedUrlResponse {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

class HomeService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  }

  async shortenUrl(originalUrl: string): Promise<ShortenedUrlResponse> {
    const response = await axios.post<ShortenedUrlResponse>(
      `${this.baseUrl}/api/url/shorten`,
      { originalUrl }
    );
    return response.data;
  }
}

export const homeService = new HomeService();

