import { pageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { GameLanding } from "@/components/games/GameLanding";
export const metadata: Metadata = pageMetadata("/games", {
  title: "JKTL Games | Word Hunt, Street Run, Tycoon & Fantasy",
  description:
    "Play Word Hunt, Street Run, Business Tycoon and Fantasy. Switch between free JKTL games, find Nigerian words, race the streets and build your city.",
  alternates: { canonical: "https://jktl.com.ng/games" },
});
export default function Page() {
  return <GameLanding />;
}
