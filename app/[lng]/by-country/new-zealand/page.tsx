import { Metadata } from "next";
import { useTranslation } from "../../../i18n";

import { Header } from "../../components/Header";
import TopBrands from "../../../../components/home/TopBrands";
import Newzealand from "../../../../components/country/Newzealand"
import FilteredCountriesCasino from "../../../../components/country/FilteredCountriesCasino";

export const metadata: Metadata = {
  title:
    "XXLCasinoList: Your Comprehensive Source for Casino Reviews and Insights",
  description:
    "Welcome to XXLCasinoList, your ultimate destination for comprehensive casino reviews and invaluable insights. Whether you're a seasoned gambler or just starting your casino journey, we're here to guide you through the world of online casinos. Our expert team meticulously reviews casinos, covering game variety, bonuses, payment options, security, and more. With our in-depth analysis and unbiased recommendations, you can make informed decisions and elevate your gaming experience. Explore our extensive database, stay updated with the latest trends, and embark on a rewarding casino adventure with XXLCasinoList.",
};

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
export default async function Page({ params: { lng } }: PageProps) {
  const res = await fetch(`${API_URL}/api/brands?&populate=*&locale=${lng}`, {
    headers: {
      Authorization: `bearer ${API_TOKEN}`,
    },
  });

  const { data } = await res.json();
  const url = "new-zealand";

  const filteredData = data
    ? data.filter((item: Item) => {
        const categories = item.attributes.categories.data;
        return categories && categories.some((category) => category.id === 7);
      })
    : [];
  const filteredData2 = data
    ? data.filter((item: Item) => {
        const categories = item.attributes.categories.data;
        return categories && categories.some((category) => category.id === 8);
      })
    : [];
  const currentTab = 7;
  //   console.log("filter", filteredData);
  const { t } = await useTranslation(lng);
  return (
    <>
      <Header lng={lng} url={url} />
      <Newzealand />
      <TopBrands data={filteredData} />
      <FilteredCountriesCasino data={data} url={url} currentTabActive={currentTab} />
    </>
  );
}
