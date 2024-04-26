
import { LampDisplay } from "@/components/Lamp";
import InfiniteMovingCardsDisplay from "@/components/MovingCards";
import Image from "next/image";

export default function Home() {
  return (
   <div className="text-white">
    <LampDisplay/>
    <InfiniteMovingCardsDisplay/>
   </div>
  );
}
