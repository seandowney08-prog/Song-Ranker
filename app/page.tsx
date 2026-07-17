"use client";

import { useState } from "react";
import Papa from "papaparse";
import SongUploader from "@/components/SongUploader";
import SongBattle from "@/components/SongBattle";
import { Song } from "@/types/song";
import { updateElo } from "@/lib/elo";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [battleSongs, setBattleSongs] = useState<{
    left: Song;
    right: Song;
  } | null>(null);

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
        createBattle(importedSongs);
      },
    });
  }

  function createBattle(songList: Song[]) {
    const first = Math.floor(Math.random() * songList.length);

    let second = Math.floor(Math.random() * songList.length);

    while (second === first) {
      second = Math.floor(Math.random() * songList.length);
    }

    setBattleSongs({
      left: songList[first],
      right: songList[second],
    });
  }


  function handleVote(winner: "A" | "B") {
    if (!battleSongs) return;

    const { left, right } = battleSongs;

    const updated = [...songs];

    const leftIndex = updated.findIndex(
      (song) => song.id === left.id
    );

    const rightIndex = updated.findIndex(
      (song) => song.id === right.id
    );


    const result = updateElo(
      left.elo,
      right.elo,
      winner
    );


    updated[leftIndex].elo = result.newA;
    updated[rightIndex].elo = result.newB;


    if (winner === "A") {
      updated[leftIndex].wins++;
      updated[rightIndex].losses++;
    } else {
      updated[rightIndex].wins++;
      updated[leftIndex].losses++;
    }


    updated[leftIndex].comparisons++;
    updated[rightIndex].comparisons++;


    setSongs(updated);

    createBattle(updated);
  }


  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-5xl font-bold">
        Song Ranker
      </h1>


      {songs.length === 0 && (
        <div className="mt-8">
          <SongUploader onUpload={handleUpload} />
        </div>
      )}


      {battleSongs && (
        <SongBattle
          left={battleSongs.left}
          right={battleSongs.right}
          onVote={handleVote}
        />
      )}


      {songs.length > 0 && (
        <p className="mt-8 text-gray-400">
          Songs loaded: {songs.length}
        </p>
      )}

    </main>
  );
}
