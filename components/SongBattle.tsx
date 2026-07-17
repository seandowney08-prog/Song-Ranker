"use client";

import { Song } from "@/types/song";

export default function SongBattle({
  left,
  right,
  onVote,
}: {
  left: Song;
  right: Song;
  onVote: (winner: "A" | "B") => void;
}) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Which song is better?
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <button
          onClick={() => onVote("A")}
          className="bg-gray-800 hover:bg-gray-700 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold">
            {left.title}
          </h3>
          <p className="text-gray-400">
            {left.artist}
          </p>
        </button>


        <button
          onClick={() => onVote("B")}
          className="bg-gray-800 hover:bg-gray-700 rounded-xl p-8"
        >
          <h3 className="text-2xl font-bold">
            {right.title}
          </h3>
          <p className="text-gray-400">
            {right.artist}
          </p>
        </button>

      </div>
    </div>
  );
}
