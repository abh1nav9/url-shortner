import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import type { ShortenedUrlResponse } from "../home.service";

interface ShortenedUrlDisplayProps {
  urlData: ShortenedUrlResponse;
}

export function ShortenedUrlDisplay({ urlData }: ShortenedUrlDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(urlData.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleClick = () => {
    window.open(urlData.shortUrl, "_blank");
  };

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 shadow-lg">
        <div className="mb-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Original URL:
          </p>
          <p className="text-sm text-neutral-800 dark:text-neutral-200 break-all">
            {urlData.originalUrl}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Shortened URL:
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClick}
              className="flex-1 text-left text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all cursor-pointer"
            >
              {urlData.shortUrl}
            </button>
            <ExternalLink className="h-5 w-5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Clicks: <span className="font-semibold">{urlData.clicks}</span>
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Code: <span className="font-mono">{urlData.shortCode}</span>
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Copied!
                </span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Copy
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

