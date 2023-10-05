import { Metadata } from "next";
import { Header } from "../../components/Header";
import OnBrand from "../../../../components/onBrand/OnBrand";
import Link from "next/link";
// import {
//   Gift,
//   ShieldPlus,
//   CaretDown,
//   Bank,
//   CurrencyCircleDollar,
//   Play,
//   Eye,
//   Prohibit,
//   MinusCircle,
//   DotsThreeCircle,
//   Handshake,
//   Star
// } from "phosphor-react";

import { useTranslation } from "../../../i18n";
// import BrandById from "@/components/BrandById";
// import CarouselSlider from "@/components/CarouselSlider";
// import NewBrands from "@/components/NewBrands";
// import GuideSlotsPage from "@/components/GuideSlotsPage";

const API_URL = "https://kind-approval-da99393621.strapiapp.com";
const API_TOKEN =
  "08ec56e76f2f87dee10005fcd184c16b58cf70d49ab88b983b12001a01e657ca4215cf4a5ea0a1f95d3ebbdaf2e70bfb024cf162463845d98503c748d8c07ce0bbc0f03cdfbe081abfe973384198a2ace7cb6e0faa3b16d572e9dd02b2a6a2eb1ae07fe55ce519dc647ea874af7e9e4ac0ca219532aa250b08546e7c6557f3bf";

interface Item {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    Preview: {
      data: {
        attributes: {
          url: string;
          hash: string;
        };
      };
    };
    DepositMethods: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          hash: string;
        };
      }>;
    };
  };
}

interface PageProps {
  params: {
    lng: string;
  };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  //   const brand = await getData(id);
  return {
    title: ` | XXLCasinoList | Casinos`,
  };
}

export default async function Brand({ params: { lng, id } }: PageProps) {
  const res = await fetch(
    `${API_URL}/api/brands/${id}?&populate=*&locale=${lng}`,
    {
      headers: {
        Authorization: `bearer ${API_TOKEN}`,
      },
    }
  );
  const { data } = await res.json();
  console.log("===================", data);

  const url = `crypto-casinos/${id}`;
  const { t } = await useTranslation(lng);

  return (
    <>
      <Header lng={lng} url={url} />
      <div className="main__container brandUtils">
        <OnBrand data={data} />
        {/* <BrandById brand={brand.id} /> */}
        {/* <CarouselSlider slides={[]} /> */}
        <div className="wrapper-container background-block">
          {/* <NewBrands /> */}
        </div>
        <div className="wrapper-container mt-6 mb-6">
          {/* <GuideSlotsPage /> */}
        </div>
      </div>
    </>
  );
}
