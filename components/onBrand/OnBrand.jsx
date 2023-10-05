"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import {
  SketchLogo,
  Star,
  MinusCircle,
  Play,
  PlusCircle,
  SmileyXEyes,
  X,
  CaretDown,
  CaretRight,
  Gift,
} from "phosphor-react";
import Link from "next/link";

const OnBrand = ({ data }) => {
  const { t } = useTranslation();
  const ratingText = data.attributes.Rating;

  const numericRating = parseFloat(ratingText);
  const ratingPercentage = (numericRating / 5) * 100;

  const positives = data.attributes.Positives;
  const positivesArray = positives.split(",").map((item) => item.trim());
  const negatives = data.attributes.Negatives;
  const negativesArray = negatives.split(",").map((item) => item.trim());
  const interested = data.attributes.InterestedFacts;
  const interestedArray = interested.split(",").map((item) => item.trim());
  const restricted = data.attributes.RestrictedCountries;
  const restrictedArray = [];

  let insideParentheses = false;
  let currentItem = "";

  for (let i = 0; i < restricted.length; i++) {
    const char = restricted[i];

    if (char === "(") {
      insideParentheses = true;
    } else if (char === ")") {
      insideParentheses = false;
    }

    if (char === "," && !insideParentheses) {
      restrictedArray.push(currentItem.trim());
      currentItem = "";
    } else {
      currentItem += char;
    }
  }

  // Добавляем последний элемент
  if (currentItem) {
    restrictedArray.push(currentItem.trim());
  }

  const [isClassAdded, setClassAdded] = useState(false);

  // Функция для добавления или удаления класса
  const toggleClass = () => {
    setClassAdded(!isClassAdded);
  };
  const [isClassAddedProvider, setClassAddedProvider] = useState(false);

  // Функция для добавления или удаления класса
  const toggleClassProvider = () => {
    setClassAddedProvider(!isClassAddedProvider);
  };
  const [isClassAddedRestricted, setClassAddedRestricted] = useState(false);

  // Функция для добавления или удаления класса
  const toggleClassRestricted = () => {
    setClassAddedRestricted(!isClassAddedRestricted);
  };

  const DepositMethods = data.attributes.DepositMethods.data;
  const WithdrawalMethods = data.attributes.WithdrawalMethods.data;

  const totalMethods = DepositMethods.length;
  const totalWithdrawal = WithdrawalMethods.length;

  const [isDepositPopupOpen, setDepositPopupOpen] = useState(false);
  const [isWithdrawalPopupOpen, setWithdrawalPopupOpen] = useState(false);

  const handleDocumentClick = (event) => {
    // Проверяем, был ли клик сделан вне элементов попапов
    if (
      (isDepositPopupOpen && !event.target.closest(".deposit-popup")) ||
      (isWithdrawalPopupOpen && !event.target.closest(".withdrawal-popup"))
    ) {
      setDepositPopupOpen(false);
      setWithdrawalPopupOpen(false);
    }
  };

  // Добавляем слушатель события клика при монтировании компонента
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    // Убираем слушатель события клика при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDepositPopupOpen, isWithdrawalPopupOpen, handleDocumentClick]);

  const toggleDepositPopup = () => {
    setDepositPopupOpen(!isDepositPopupOpen);
  };

  const toggleWithdrawalPopup = () => {
    setWithdrawalPopupOpen(!isWithdrawalPopupOpen);
  };



  return (
    <div className="flex flex-col px-0 py-6 w-full">
      <div className="p-3 flex justify-between flex-wrap mb-2 card-brand-filtered w-full">
        <div className="flex w-full">
          <div className="mb-2 withdrawal withdrawal-limits flex flex-col basis-[25%]">
            <div className="brandImage p-3">
              <Image
                src={data.attributes.Preview.data.attributes.url}
                alt={data.attributes.Preview.data.attributes.hash}
                width={200}
                height={100}
                loading="lazy"
              />
            </div>
            <div className="block-rating flex flex-col">
              <div className="flex">
                <div className="raitText basis-[50%] flex justify-center items-center">
                  <Star className="mb-1 mr-2" size={24} />
                  {data.attributes.Rating}/5
                </div>
                <div className="basis-[50%] p-2 safeIndex">
                  <div className="font-bold">{t("brand.safety")}</div>
                  <div>{t("brand.our")}</div>
                </div>
              </div>
            </div>
            <div className="rating-bar mt-4">
              <SketchLogo
                className="rating-circle"
                style={{
                  left: `${ratingPercentage}%`,
                  transform: `translateX(-${ratingPercentage}%)`,
                }}
                size={24}
              />
            </div>

            <div className="title mt-2">{t("allBrands.withLimits")}</div>
            <div className="limits flex items-center">
              {data.attributes.WithdrawalLimits}
            </div>
            <Link
              className="btn btn-primary text-center flex justify-center items-center mt-2 mb-2"
              href={data.attributes.Link ? `${data.attributes.Link}` : ""}
              target="_blank"
            >
              <Play className="mr-2" size={24} /> {t("button.play")}
            </Link>
            <div className="one-brand-item mt-3 basis-[49%]">
              <div className="title flex items-center mb-2">
                <span className="mt-2 ">{t("allBrands.depMethods")}</span>
              </div>
              <div className="withdrawal flex flex-wrap">
                {data.attributes.DepositMethods.data.slice(0, 8).map((item) => (
                  <div
                    className="method flex justify-center items-center"
                    key={item.id}
                  >
                    <Image
                      src={item.attributes.url}
                      alt={item.attributes.name}
                      width={60}
                      height={38}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              {totalMethods > 8 && (
                <button className="showall" onClick={toggleDepositPopup}>
                  {t("show.all")} <span>({totalMethods})</span>
                </button>
              )}
              {isDepositPopupOpen && (
                <div className="popup-methods pt-5 deposit-popup">
                  <div className="withdrawal flex flex-wrap">
                    {DepositMethods.map((item) => (
                      <div
                        className="method flex justify-center items-center"
                        key={item.id}
                      >
                        <Image
                          src={item.attributes.url}
                          alt={item.attributes.name}
                          width={60}
                          height={38}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="absolute close-popup"
                    onClick={toggleDepositPopup}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="one-brand-item mt-3 basis-[49%]">
              <div className="title flex items-center mb-2">
                <span className="mt-2 ">{t("allBrands.withMethods")}</span>
              </div>
              <div className="withdrawal flex flex-wrap">
                {data.attributes.DepositMethods.data.slice(0, 8).map((item) => (
                  <div
                    className="method flex justify-center items-center"
                    key={item.id}
                  >
                    <Image
                      src={item.attributes.url}
                      alt={item.attributes.name}
                      width={60}
                      height={38}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              {totalWithdrawal > 8 && (
                <button className="showall" onClick={toggleWithdrawalPopup}>
                  {t("show.all")} <span>({totalWithdrawal})</span>
                </button>
              )}
              {isWithdrawalPopupOpen && (
                <div className="popup-methods pt-5 withdrawal-popup">
                  <div className="withdrawal flex flex-wrap">
                    {WithdrawalMethods.map((item) => (
                      <div
                        className="method flex justify-center items-center"
                        key={item.id}
                      >
                        <Image
                          src={item.attributes.url}
                          alt={item.attributes.name}
                          width={60}
                          height={38}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="absolute close-popup"
                    onClick={toggleWithdrawalPopup}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="licensing mt-3">
              <div className="title flex items-center mb-2">{t("license")}</div>
              <div>
                {data.attributes.Licensing.map((item) => (
                  <div key={item.id}>
                    {item.name}
                    <Image
                      // src={item.image.url}
                      // alt={item.image.attributes.hash}
                      width={200}
                      height={100}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="otherContent flex flex-wrap ml-6 basis-[75%]">
            <div className="title">
              <h1 className="font-medium"> {data.attributes.Title}</h1>
            </div>
            <div className="pt-3">
              <p
                className={`miniheight overflow-hidden ${
                  isClassAdded ? "show-text" : ""
                }`}
              >
                {data.attributes.Description}
              </p>
              <button onClick={toggleClass}>{t("show.all")}</button>
            </div>
            <div className="mt-3 flex emotions flex-wrap justify-between">
              <div className="flex flex-col positives basis-[33%]">
                {positivesArray.map((item) => {
                  return (
                    <span className="flex">
                      <PlusCircle className="mr-1" color="#128722" size={16} />
                      {item}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-col negatives basis-[33%]">
                {negativesArray.map((item) => {
                  return (
                    <span className="flex">
                      <MinusCircle className="mr-1" color="#dd3333" size={16} />
                      {item}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-col interested basis-[33%]">
                {interestedArray.map((item) => {
                  return (
                    <span className="flex">
                      <SmileyXEyes className="mr-1" color="#7b8c98" size={16} />
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="brand-bonuses flex flex-wrap mt-3 basis-[100%]">
                {data.attributes.bonus.map((bonusItem) => (
              <div className="flex item-bonus basis-[49%] relative mb-3">
                  <Link
                    key={bonusItem.id}
                    href={data.attributes.Link ? `${data.attributes.Link}` : ""}
                    target="_blank"
                    className="flex flex-col"
                  >
                    <div className="mb-2 font-medium bonus-name">
                      {bonusItem.badgebonus}
                    </div>
                    <div className="bonus-description flex">
                      <Gift className="mr-1" size={24} />
                      {bonusItem.titlebonus}
                    </div>
                    <CaretRight className="absolute right-3 top-7" size={24} />
                  </Link>
              </div>
                ))}
            </div>
            <div
              className={`providers-logo mt-3 ${
                isClassAddedProvider ? "show-more-providers" : ""
              }`}
            >
              <div className="title flex items-center ">
                <span className="">{t("brand.providers")}</span>
                <button
                  className="flex items-center ml-auto"
                  onClick={toggleClassProvider}
                >
                  {t("show.all.providers")}
                  <CaretDown
                    className={`${isClassAddedProvider ? "caretUp" : ""}`}
                    size={24}
                  />
                </button>
              </div>
              <div className="providers-items flex flex-wrap pt-2">
                {data.attributes.GameProviders.data.map((item) => (
                  <div
                    className="mb-2 flex justify-center items-center"
                    key={item.id}
                  >
                    <Image
                      src={item.attributes.url}
                      alt={item.attributes.name}
                      width={75}
                      height={45}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`one-brand-item restricted mt-3 ${
                isClassAddedRestricted ? "show-more-countries" : ""
              }`}
            >
              <div className="title flex items-center ">
                <span className="mt-2 ">{t("brand.restricted")}</span>
                <button
                  className="flex items-center ml-auto"
                  onClick={toggleClassRestricted}
                >
                  {t("show.all.restricted")}
                  <CaretDown
                    className={`${isClassAddedRestricted ? "caretUp" : ""}`}
                    size={24}
                  />
                </button>
              </div>
              <div className="countries-items pt-2 flex flex-wrap">
                {restrictedArray.map((item) => {
                  return (
                    <span className="flex mr-1">
                      <MinusCircle className="mr-1" color="#dd3333" size={16} />
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBrand;
