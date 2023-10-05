
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import Image from "next/image";
import Img from "../../../../public/logo3.png";
import TheHeader from "../../../../components/TheHeader";
import Switcher from "./Switcher";

export const HeaderBase = ({ t, lng, url }) => {


  return (
    <header className="header">
      <div className="header__bg">
        <div className="header__container ">
          <div className="logo">
            <Link href="/">
              <Image src={Img} alt="logo" width={130} loading="lazy" />
            </Link>
          </div>
          <div className="search-container flex items-center justify-center ml-auto"></div>
          <Switcher lng={lng} url={url} />
          
        </div>
      </div>
      <TheHeader lng={lng} />
    </header>
  );
};
