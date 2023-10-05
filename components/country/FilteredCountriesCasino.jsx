// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllCountryCasinos from "./AllCountryCasinos";
import Loader from "@/components/Loader";

const FilteredCasinos = ({data, url, currentTabActive}) => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(currentTabActive);

  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 17,
      topCurrentCategories: 213,
      currentText: "tab.casinos",
      icon: "🌍",
      slug: "by-country",
    },
    {
      currentTab: 2,
      currentCategories: 2,
      topCurrentCategories: 184,
      currentText: "tab.casinos",
      icon: "🇦🇺",
      slug: "australia",
    },
    {
      currentTab: 3,
      currentCategories: 119,
      topCurrentCategories: 84,
      currentText: "tab.casinos",
      icon: "🇧🇷",
      slug: "brazil",
    },
    {
      currentTab: 4,
      currentCategories: 4,
      topCurrentCategories: 46,
      currentText: "tab.casinos",
      icon: "🇨🇦",
      slug: "canada",
    },
    {
      currentTab: 5,
      currentCategories: 11,
      topCurrentCategories: 43,
      currentText: "tab.casinos",
      icon: "🇫🇮",
      slug: "finland",
    },
    {
      currentTab: 6,
      currentCategories: 5,
      topCurrentCategories: 45,
      currentText: "tab.casinos",
      icon: "🇩🇪",
      slug: "germany",
    },
    {
      currentTab: 7,
      currentCategories: 6,
      topCurrentCategories: 47,
      currentText: "tab.casinos",
      icon: "🇳🇿",
      slug: "new-zealand",
    },
    {
      currentTab: 8,
      currentCategories: 12,
      topCurrentCategories: 44,
      currentText: "tab.casinos",
      icon: "🇳🇴",
      slug: "norway",
    },
    {
      currentTab: 9,
      currentCategories: 13,
      topCurrentCategories: 48,
      currentText: "tab.casinos",
      icon: "🇵🇱",
      slug: "poland",
    },
  ];

  // useEffect(() => {
  //   const pathSegments = window.location.pathname.split("/by-country/");
  //   const slugFromUrl = pathSegments[1]; // Используйте [1] для первого сегмента после "/"
  //   const foundTab = navigateBrands.find((item) => item.slug === slugFromUrl);
  //   if (foundTab) {
  //     setCurrentTab(foundTab.currentTab);
  //   }
  // }, []);

  const handleTabChange = (tabNumber) => {
    setCurrentTab(tabNumber);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 300);
  }
  return (
    <div className="main pt-10 pb-10 custom-bonuses">
      <div className="main__container filter-brands">
        <div className="content flex flex-wrap">
          <div className="left flex flex-col justify-center basis-[60%]">
            <h2>{t("filtered.countries.title")}</h2>
            <p className="mt-5">
              {t("filtered.countries.description")}
            </p>
          </div>
        </div>
        <div className="flex navigate-filter">
          {navigateBrands.map((item) => (
            <button
              key={item.currentTab}
              className={`flex justify-center flex-col basis-[20%] items-center p-2 border text-lg button-tab ${
                currentTab === item.currentTab ? "active" : ""
              }`}
              onClick={() => handleTabChange(item.currentTab)}
            >
              <div className="flag-countries mb-1"> {item.icon}</div>

              {t(item.currentText)}
            </button>
          ))}
        </div>

        <div className="overlay-filter">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllCountryCasinos
                key={item.currentTab}
                choose={item.currentCategories}
                filtered={data}
                isLoader={isLoader}
                url={url}
                icon={item.icon}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilteredCasinos;
