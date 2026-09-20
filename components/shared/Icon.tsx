import {
  Users, CalendarCheck, Receipt, Package, Wallet, Globe, Smartphone, UsersRound,
  Scissors, Dumbbell, Sparkles, UtensilsCrossed, Store, PartyPopper, Camera,
  Music, Plane, Shirt, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Users, CalendarCheck, Receipt, Package, Wallet, Globe, Smartphone, UsersRound,
  Scissors, Dumbbell, Sparkles, UtensilsCrossed, Store, PartyPopper, Camera,
  Music, Plane, Shirt,
};

export default function Icon({ name, size = 22, className, style }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const Cmp = ICONS[name] || Users;
  return <Cmp size={size} className={className} style={style} strokeWidth={1.75} />;
}
