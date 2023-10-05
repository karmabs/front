import { Metadata } from "next";
import GuideSlotsGuide from "../../../components/guides/GuideSlotsGuide";
import { Header } from "../components/Header";



export const metadata: Metadata = {
  title: "Gambling Guides | XXLCasinoList",
  description: "Master the art of online casino gaming with our extensive collection of Gambling Guides at XXLCasinoList. Whether you're a novice looking for beginner's tips or a seasoned player in search of advanced strategies, our guides have got you covered. Learn the rules, strategies, and best practices for popular games like slots, blackjack, roulette, and more. Our expert-written articles break down complex concepts into easy-to-understand insights, helping you gain an edge over the competition. Enhance your skills, boost your winning chances, and enjoy a more fulfilling gaming experience with our indispensable Gambling Guides!",
};

interface PageProps {
  params: {
    lng: string;
  };
}

export default function Guides({ params: { lng } }: PageProps) {
  const url = "guides";
  return (
    <>
      <Header lng={lng} url={url} />

      <div className="main__container">
        

       <GuideSlotsGuide lng={lng} />
      </div>
    </>
  );
}
