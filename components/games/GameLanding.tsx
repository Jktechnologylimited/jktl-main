import Link from "next/link";
import styles from "./GameLanding.module.css";
export function GameLanding({ fantasy = false }: { fantasy?: boolean }) {
  const business =
    process.env.GAME_BUSINESS_ORIGIN || "https://business.jktl.com.ng";
  const fantasyOrigin =
    process.env.FANTASY_APP_ORIGIN || "https://fantasy.jktl.com.ng";
  return (
    <main className={styles.stage}>
      <div className={styles.bar}>
        <h1>{fantasy ? "JKTL Fantasy" : "JKTL Games"}</h1>
        <nav aria-label="Choose a game">
          <Link href="/games" aria-current={!fantasy ? "page" : undefined}>
            Business Tycoon
          </Link>
          <Link
            href="/games/fantasy"
            aria-current={fantasy ? "page" : undefined}
          >
            Fantasy
          </Link>
        </nav>
        <a
          href={
            fantasy
              ? "https://fantasy.jktl.com.ng"
              : "https://games.jktl.com.ng"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Open full screen ↗
        </a>
      </div>
      <iframe
        title={fantasy ? "Play JKTL Fantasy" : "Play JKTL Business Tycoon"}
        src={fantasy ? fantasyOrigin : `${business}/play/tycoon?return=main`}
        allow="fullscreen"
        className={styles.frame}
      />
    </main>
  );
}
