
 

// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import AllBrands from "./AllBrands";
import {
  Gift,
  Crown,
  Handshake,
  Coins,
  RadioButton,
} from "phosphor-react";
// import useSWR from "swr";


const FilteredHome = ({data, url, currentTabActive}) => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(currentTabActive);


  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 7,
      currentText: "header.nodeposit",
      icon: <Gift className="mr-2 pb-1" size={32} />,
      slug: "no-deposit-bonuses",
    },
    {
      currentTab: 2,
      currentCategories: 8,
      currentText: "header.exclusive",
      icon: <Crown className="mr-2 pb-1" size={32} />,
      slug: "exclusive-bonuses",
    },
    {
      currentTab: 3,
      currentCategories: 9,
      currentText: "header.deposit",
      icon: <Coins className="mr-2 pb-1" size={32} />,
      slug: "deposit-bonuses",
    },
    {
      currentTab: 4,
      currentCategories: 3,
      currentText: "header.welcome",
      icon: <Handshake className="mr-2 pb-1" size={32} />,
      slug: "welcome-bonuses",
    },
    {
      currentTab: 5,
      currentCategories: 2,
      currentText: "header.nowager",
      icon: <RadioButton className="mr-2 pb-1" size={32} />,
      slug: "no-wagering-bonuses",
    },
  ];

  const handleTabChange = (tabNumber) => {
    setCurrentTab(tabNumber);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 300);
  };

  // В начале компонента FilteredBonuses
  // const { data: languageDetails, error: detailsError } = useSWR(
  //   "languageDetails",
  //   null,
  //   {
  //     fallbackData: { flag: "🌍", allBrand: 25, topBrand: 213 }, // Задаем начальное значение
  //   }
  // );

  return (
    <div className="main pt-10 pb-10 other-custom-bonuses overflow-hidden">
      <div className="main__container filter-brands">
        <div className="content flex flex-wrap">
          <div className="left flex flex-col justify-center basis-[60%]">
            <h2 className="">
            {t('filteredHome.title')}
            </h2>
            <p className="mt-3 pb-4">
            {t('filteredHome.description')}
            </p>
          </div>
   
        </div>
        <div className="flex navigate-filter">
          {navigateBrands.map((item) => (
            <button
              key={item.currentTab}
              type="button"
              className={`flex justify-center flex-col basis-[20%] items-center p-2 border text-lg button-tab ${
                currentTab === item.currentTab ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(item.currentTab);
              }}
            >
              {item.icon}
              {t(item.currentText)}
            </button>
          ))}
        </div>

        <div className="overlay-filter">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllBrands
                  key={item.currentTab}
                  choose={item.currentCategories}
                  filtered={data}
                  isLoader={isLoader}
                  url={url}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilteredHome;
