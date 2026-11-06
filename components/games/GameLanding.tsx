import {GameStage} from "./GameStage";
export function GameLanding({fantasy=false}:{fantasy?:boolean}){
 return <GameStage key={fantasy?"fantasy":"tycoon"} fantasy={fantasy} business={process.env.GAME_BUSINESS_ORIGIN||"https://business.jktl.com.ng"} fantasyOrigin={process.env.FANTASY_APP_ORIGIN||"https://fantasy.jktl.com.ng"}/>;
}
