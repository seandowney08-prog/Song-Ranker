"use client";

import { useRef } from "react";

export default function SongUploader({
  onUpload,
}: {
  onUpload: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    onUpload(file);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        hidden
        onChange={handleFile}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
      >
        Upload CSV
      </button>
    </>
  );
}