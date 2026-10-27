import { pageMetadata } from "@/lib/seo/metadata";
import { GameLanding } from "@/components/games/GameLanding";
export const metadata = pageMetadata("/games/fantasy", {
  title: "JKTL Fantasy",
  description: "JKTL Fantasy game interface.",
  alternates: { canonical: "https://jktl.com.ng/games/fantasy" },
});
export default function Page() {
  return <GameLanding fantasy />;
}
