import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../../../components/ui/placeholder";

interface InputBarProps {
  onUrlSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function InputBar({ onUrlSubmit, isLoading = false }: InputBarProps) {
  const [urlValue, setUrlValue] = useState("");
  const placeholders = [
    "https://www.google.com",
    "https://www.facebook.com",
    "https://www.twitter.com",
    "https://www.instagram.com",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input[type="text"]') as HTMLInputElement;
    const trimmedUrl = input?.value?.trim() || urlValue.trim();
    
    if (trimmedUrl && !isLoading) {
      onUrlSubmit(trimmedUrl);
      setUrlValue("");
    }
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Shorten your URLs
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
