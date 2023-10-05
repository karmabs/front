// TopBrands.jsx (Клиентский компонент)
"use client";

import { useTranslation } from "react-i18next";
import { Play, Eye } from "phosphor-react";
import Image from "next/image";
import Link from "next/link";

export default function TopBrands({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="main__container pb-6">
        <div className="heading flex items-center pt-12">
          <h2>{t("topBrands.title")}</h2>
        </div>
        <div className="flex flex-wrap px-0 py-6">
          {data.map((item) => (
            <div key={item.id} className="basis-[19%] card-brand mb-3">
              <div className="brandImage p-3">
                <Image
                  src={item.attributes.Preview.data.attributes.url}
                  alt={item.attributes.Preview.data.attributes.hash}
                  width={100}
                  height={75}
                  loading="lazy"
                />
              </div>
              {item.attributes.bonus.slice(0, 1).map((bonusItem) => (
                <div key={bonusItem.id} className="brandContent p-3">
                  <div className="review-bonus">
                    <div>{bonusItem.titlebonus}</div>
                  </div>
                </div>
              ))}
              <div className="buttons p-3">
                <Link
                  className="btn btn-primary flex justify-center items-center mt-1"
                  href={`${item.attributes.Link}`}
                  target="_blank"
                >
                  <Play className="mr-2" size={20} />
                  {t("button.play")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
