// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import AllBrands from "./AllBrands";
import {
  Medal,
  Crown,
  DribbbleLogo,
  CurrencyBtc,
  SquareLogo,
} from "phosphor-react";
// import useSWR from "swr";


const FilteredHome = ({data}) => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(2);


  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 1,
      currentText: "navigateBrands.all",
      icon: <SquareLogo className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 2,
      currentCategories: 8,
      currentText: "navigateBrands.recommend",
      icon: <Medal className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 3,
      currentCategories: 9,
      currentText: "navigateBrands.newly",
      icon: <Crown className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 4,
      currentCategories: 2,
      currentText: "navigateBrands.crypto",
      icon: <CurrencyBtc className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 5,
      currentCategories: 3,
      currentText: "navigateBrands.sports",
      icon: <DribbbleLogo className="mr-2 pb-1" size={32} />,
    },
  ];

  const handleTabChange = (tabNumber) => {
    setCurrentTab(tabNumber);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 300);
  };


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
