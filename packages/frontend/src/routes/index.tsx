import { createFileRoute, Link } from '@tanstack/react-router';
import './index.css';
import { client } from '../lib/api';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 text-text">
      <div className="my-8 w-full">
        <div className="flex flex-row items-center justify-between w-full px-1">
          <h1 className="text-2xl font-semibold">Welcome, {/*user.name*/}</h1>
          <Link href="/song/upload">
            <button className="hover:opacity-90 rounded-full shadow shadow-black bg-lightest p-2 text-darkest">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="currentColor"
                fill="none"
              >
                <path
                  d="M12 4V20M20 12H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-4 text-gray-200 font-semibold">
          {/*
          {songs.length === 0 && <div>No songs found!</div>}
          {songs.map((song, index) => (
            <Link
              href={`/song/${song.id}/play`}
              key={index}
              className={`
              hover:opacity-90 cursor-pointer
            shadow-sm shadow-black
            bg-light flex flex-row justify-between items-center rounded-lg border-2 border-lightest w-full px-3 py-1.5`}
            >
              <p>
                {song.name} - {song.artist}
              </p>
              <div className="rounded-full bg-dark border-lightest border h-8 w-8 p-1">
                {genres.find((genre) => song.genre === genre.name)!.icon}
              </div>
            </Link>
          ))}
          */}
        </div>
      </div>
    </main>
  );
}
