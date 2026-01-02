import { useState } from "react";
import { InputBar } from "./components/input-bar";
import { ShortenedUrlDisplay } from "./components/shortened-url-display";
import { homeService, type ShortenedUrlResponse } from "./home.service";

export default function Home() {
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setShortenedUrl(null);

    try {
      const result = await homeService.shortenUrl(url);
      setShortenedUrl(result);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to shorten URL. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <InputBar onUrlSubmit={handleUrlSubmit} isLoading={isLoading} />
      
      {error && (
        <div className="mt-8 w-full max-w-2xl mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {shortenedUrl && <ShortenedUrlDisplay urlData={shortenedUrl} />}
    </div>
  );
}

