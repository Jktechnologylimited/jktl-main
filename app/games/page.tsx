import { pageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { GameLanding } from "@/components/games/GameLanding";
export const metadata: Metadata = pageMetadata("/games", {
  title: "JKTL Games | Play Business Tycoon",
  description:
    "Play JKTL Business Tycoon immediately. Build a Nigerian business island with a free guest trial.",
  alternates: { canonical: "https://jktl.com.ng/games" },
});
export default function Page() {
  return <GameLanding />;
}
