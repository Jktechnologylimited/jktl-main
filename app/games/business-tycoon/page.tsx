import type {Metadata} from "next";
import {GameLanding} from "@/components/games/GameLanding";
export const metadata:Metadata={title:"JKTL Business Tycoon | Play now",description:"Build your Nigerian business island. Play the game immediately as a guest or continue with your JKTL account.",alternates:{canonical:"https://jktl.com.ng/games/business-tycoon"}};
export default function Page(){return <GameLanding/>;}
