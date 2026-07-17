"use client";

import { useState } from "react";
import Papa from "papaparse";
import SongUploader from "@/components/SongUploader";
import { Song } from "@/types/song";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  function handleUpload(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const importedSongs: Song[] = (results.data as any[]).map(
          (row, index) => ({
            id: index,
            title: row.Song,
            artist: row.Artist,
            elo: 1500,
            wins: 0,
            losses: 0,
            comparisons: 0,
          })
        );

        setSongs(importedSongs);
      },
    });
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        Song Ranker
      </h1>

      <SongUploader onUpload={handleUpload} />

      <h2 className="mt-8 text-2xl">
        Songs Loaded: {songs.length}
      </h2>

      <div className="mt-6 space-y-2 max-h-[70vh] overflow-y-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-gray-800 rounded-lg p-4 flex justify-between"
          >
            <span>{song.title}</span>
            <span className="text-gray-400">{song.artist}</span>
          </div>
        ))}
      </div>
    </main>
  );
}