"use client";
import { GameGrowth } from "./GameGrowth";
import Link from "next/link";
import { useState } from "react";
import styles from "./GameLanding.module.css";
export function GameStage({
  fantasy,
  business,
  fantasyOrigin,
}: {
  fantasy: boolean;
  business: string;
  fantasyOrigin: string;
}) {
  const [game, setGame] = useState(fantasy ? "fantasy" : "tycoon");
  const names: Record<string, string> = {
    "market-slice": "Market Slice",
    "market-match": "Market Match",
    "lagos-stack": "Lagos Stack",
    "word-mix": "Naija Word Mix",
    skybound: "Kora Skybound",
    tycoon: "Business Tycoon",
    "word-hunt": "Word Hunt",
    run: "Street Run",
    fantasy: "Fantasy",
  };
  const source =
    game === "fantasy" ? fantasyOrigin : `${business}/play/${game}?return=main`;
  return (
    <>
      <main className={styles.stage}>
        <div className={styles.bar}>
          <Link
            href="/"
            className={styles.homeLink}
            aria-label="JKTL main site"
          >
            JKTL
          </Link>
          <h1>JKTL Games</h1>
          <nav aria-label="Choose a game">
            <label className={styles.gameLabel} htmlFor="jktl-game-picker">
              Now playing
            </label>
            <select
              id="jktl-game-picker"
              aria-label="Choose a game"
              className={styles.gameSelect}
              value={game}
              onChange={(event) => setGame(event.target.value)}
            >
              {Object.entries(names).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <a
              href="https://games.jktl.com.ng"
              target="_top"
              className={styles.allGames}
            >
              All games ↗
            </a>
          </nav>
          <a href={source} target="_blank" rel="noopener noreferrer">
            <span className={styles.fullLabel}>Open full screen ↗</span>
            <span className={styles.shortLabel}>Full screen ↗</span>
          </a>
        </div>
        <iframe
          key={game}
          title={`Play JKTL ${names[game]}`}
          src={source}
          allow="fullscreen"
          className={styles.frame}
        />
      </main>
      <GameGrowth />
    </>
  );
}
