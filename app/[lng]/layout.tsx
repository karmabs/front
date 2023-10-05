import { dir } from "i18next";
import { languages } from "../i18n/settings";
// import "./global.css"
// import { Header } from './components/Header/Header';
import RandomWindow from "../../components/random/RandomWindow";
import { TheFooter } from "../../components/TheFooter";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

// import { Header } from "./components/Header";
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}


const API_URL = "https://kind-approval-da99393621.strapiapp.com";
const API_TOKEN =
  "08ec56e76f2f87dee10005fcd184c16b58cf70d49ab88b983b12001a01e657ca4215cf4a5ea0a1f95d3ebbdaf2e70bfb024cf162463845d98503c748d8c07ce0bbc0f03cdfbe081abfe973384198a2ace7cb6e0faa3b16d572e9dd02b2a6a2eb1ae07fe55ce519dc647ea874af7e9e4ac0ca219532aa250b08546e7c6557f3bf";
  
  
  export default async function RootLayout({
    children,
    params: { lng },
}: RootLayoutProps) {
  const res = await fetch(`${API_URL}/api/brands?&populate=*&locale=${lng}`, {
    headers: {
      Authorization: `bearer ${API_TOKEN}`,
    },
  });
  const { data } = await res.json();
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      {/* <Header lng={lng} /> */}
      <RandomWindow data={data} />

      <body>{children}</body>
      <TheFooter />
    </html>
  );
}
