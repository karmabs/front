"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
// import { useTopBrandsFilter } from "../useBrands";
import Loader from "../Loader";
import FilterLoader from "./FilterLoader";

import {
  Gift,
  ShieldPlus,
  CaretDown,
  Bank,
  CurrencyCircleDollar,
  Play,
  Eye,
  Prohibit,
  MinusCircle,
  DotsThreeCircle,
  Handshake,
} from "phosphor-react";



export default function AllBrands({ choose, filtered, isLoader }) {
  const { t } = useTranslation();
  const itemsPerPage = 7;
  const [visibleBrands, setVisibleBrands] = useState(itemsPerPage);
  const [hasMoreBrands, setHasMoreBrands] = useState(false);
  const [openPlusesId, setOpenPlusesId] = useState(null);
  const [openWithdrawalId, setOpenWithdrawalId] = useState(null);
  const [openDepositsId, setOpenDepositsId] = useState(null);
  const [openCountriesId, setOpenCountriesId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  

  const handleLinkClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };


  
  
  const filteredData = filtered
  ? filtered.filter((item) => {
      const categories = item.attributes.categories.data;
      return (
        categories &&
        categories.some((category) => category.id === choose) &&
        (selectedCategory ? categories.some((category) => category.id === selectedCategory) : true)
      );
    })
  : [];


  useEffect(() => {
    setHasMoreBrands(visibleBrands < filteredData.length);
  }, [visibleBrands, filteredData.length]);
  

 


  const loadMoreBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + itemsPerPage);
  };
  const handlePlusesClick = (brandId) => {
    setOpenPlusesId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleWithdrawalClick = (brandId) => {
    setOpenWithdrawalId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleDepositsClick = (brandId) => {
    setOpenDepositsId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleCountriesClick = (brandId) => {
    setOpenCountriesId((prevId) => (prevId === brandId ? null : brandId));
  };

  return (
    <>
      {isLoader ? (
        <FilterLoader />
      ) : (
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-col px-0 py-6 basis-[75%]">
            {filteredData.slice(0, visibleBrands).map((brand) => {
              const isPlusesOpen = openPlusesId === brand.id;
              const isWithdrawalOpen = openWithdrawalId === brand.id;
              const isDepositsOpen = openDepositsId === brand.id;
              const isCountriesOpen = openCountriesId === brand.id;

              return (
                <div
                  className="p-3 flex justify-between flex-wrap mb-2 card-brand-filtered w-full"
                  key={brand.id}
                  id={brand.id}
                >
                  <div className="flex flex-col basis-[63%]">
                   
                    <div className="flex mb-1">
                      <Gift className="mr-1" size={24} />
                      {brand.attributes.bonus.slice(0, 1).map((bonusItem) => (
                        <div key={bonusItem.id}>
                          <div className="bonus-description">
                            {bonusItem.titlebonus}
                          </div>
                        </div>
                      ))}
                  
                    </div>
                    <div className="mb-2 withdrawal withdrawal-limits flex items-center">
                      <Handshake className="mr-1 mb-1" size={24} />
                      <div className="title mr-2">
                        {t("allBrands.withLimits")}
                      </div>
                      <div
                      className="items-center"
                    
                    >{brand.attributes.WithdrawalLimits}</div>
                    </div>
                    <div
                      onClick={() => handlePlusesClick(brand.id)}
                      className="pluses custom-list-item mb-1"
                    >
                      <div className="title flex items-center">
                        <ShieldPlus size={24} />
                        <span className="mt-1 ml-2">
                          {t("allBrands.advantages")}
                        </span>
                        <CaretDown className="ml-auto" size={20} />
                      </div>
                      {isPlusesOpen && (
                        <div className="items-center ml-3">
                          {brand.attributes.Positives}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => handleDepositsClick(brand.id)}
                      className="withdrawal custom-list-item mb-1"
                    >
                      <div className="title flex items-center">
                        <CurrencyCircleDollar size={24} />
                        <span className="mt-1 ml-2">
                          {t("allBrands.depMethods")}
                        </span>
                        <CaretDown className="ml-auto" size={20} />
                      </div>
                      {isDepositsOpen && (
                        <div className="withdrawal flex flex-wrap mt-3">
                          {brand.attributes.DepositMethods.data.map(
                            (item) => (
                              <div className="method flex justify-center items-center">
                                <Image
                                  key={item.id}
                                  src={item.attributes.url}
                                  alt={item.attributes.name}
                                  width={60}
                                  height={38}
                                  loading="lazy"
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <div
                      onClick={() => handleWithdrawalClick(brand.id)}
                      className="withdrawal custom-list-item mb-1"
                    >
                      <div className="title flex items-center">
                        <Bank size={24} />
                        <span className="mt-1 ml-2">
                          {t("allBrands.withMethods")}
                        </span>
                        <CaretDown className="ml-auto" size={20} />
                      </div>
                      {isWithdrawalOpen && (
                       <div className="withdrawal flex flex-wrap mt-3">
                       {brand.attributes.WithdrawalMethods.data.map(
                         (item) => (
                           <div className="method flex justify-center items-center">
                             <Image
                               key={item.id}
                               src={item.attributes.url}
                               alt={item.attributes.name}
                               width={60}
                               height={38}
                               loading="lazy"
                             />
                           </div>
                         )
                       )}
                     </div>
                    )}
                    </div>
                    <div
                      onClick={() => handleCountriesClick(brand.id)}
                      className="withdrawal custom-list-item mb-1"
                    >
                      <div className="title flex items-center">
                        <Prohibit size={24} />
                        <span className="mt-1 ml-2">
                          {t("allBrands.restricted")}
                        </span>
                        <CaretDown className="ml-auto" size={20} />
                      </div>
                      {isCountriesOpen && (
                        <div className="withdrawal">
                          {/* Виводимо обмежені країни */}
                          <div className="countries flex flex-wrap justify-between mt-1">
                       
                          {brand.attributes.RestrictedCountries}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="basis-[36%]">
                    <div className="brandImage p-3">
                      <Link key={brand.id} href={`/bonuses/${brand.id}`}>
                        <Image
                          src={brand.attributes.Preview.data.attributes.url}
                          alt={brand.attributes.Preview.data.attributes.hash}
                          width={200}
                          height={100}
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    <div className="buttons ml-auto flex items-center">
                      <Link
                        className="btn btn-secondary text-center flex justify-center items-center"
                        href={`/bonuses/${brand.id}`}
                        onClick={handleLinkClick}
                      >
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <Eye className="mr-2" size={20} />
                        )}
                        {t("button.review")}
                      </Link>
                      <div className="flex flex-col items-center w-full p-4 howUse mt-2 mb-2">
                        <span className="text-center">
                          {t("allBrands.howGet")}
                        </span>
                        <p className="text-center m-0 text-slate-500">
                          {t("allBrands.activate")}
                        </p>
                      </div>
                      <Link
                        className="btn btn-primary mt-0 text-center flex justify-center items-center"
                        href={brand.attributes.Link ? `${brand.attributes.Link}` : ''}
                        target="_blank"
                      >
                        <Play className="mr-2" size={24} /> {t("button.play")}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {hasMoreBrands && (
              <button
                className="btn-primary btn-more text-lg max-w-sm p-3 ml-auto mr-auto mt-4 font-semibold text-white flex justify-center items-center"
                onClick={loadMoreBrands}
              >
                <DotsThreeCircle className="mr-1" size={24} />
                {t("button.load")}
              </button>
            )}
          </div>
          <div className="flex flex-col basis-[24%] py-6">
            <div className="popular-filter">
                <span>Popular filters</span>
                <ul>
                  <li onClick={() => handleCategoryClick(10)}>Crypto Casinos</li>
                </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
