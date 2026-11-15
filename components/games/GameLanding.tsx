import { GameStage } from "./GameStage";
export function GameLanding() {
  return <GameStage business={process.env.GAME_BUSINESS_ORIGIN || "https://business.jktl.com.ng"} />;
}
