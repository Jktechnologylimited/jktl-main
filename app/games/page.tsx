import { pageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { GameLanding } from "@/components/games/GameLanding";
export const metadata: Metadata = pageMetadata("/games", {
  title: "JKTL Games | Kora Skybound, Word Hunt & More",
  description:
    "Play Kora Skybound, Word Hunt, Street Run, Business Tycoon and Fantasy. Jump across rooftops, find hidden words and explore free JKTL games.",
  alternates: { canonical: "https://jktl.com.ng/games" },
});
export default function Page() {
  return <GameLanding />;
}
