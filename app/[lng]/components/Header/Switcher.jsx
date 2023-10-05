"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { languages } from "../../../i18n/settings";

const Switcher = ({ lng, url }) => {
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const switcherRef = useRef(null);

  const toggleLanguageVisibility = () => {
    setIsLanguageVisible(!isLanguageVisible);
  };

  const handleClickOutside = (event) => {
    if (switcherRef.current && !switcherRef.current.contains(event.target)) {
      setIsLanguageVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const flags = [
    { code: "en", label: "EN", flag: "🌍" },
    { code: "pl", label: "PL", flag: "🇵🇱" },
    { code: "no", label: "NO", flag: "🇳🇴" },
    { code: "ca", label: "CA", flag: "🇨🇦" },
    { code: "nz", label: "NZ", flag: "🇳🇿" },
    { code: "de", label: "DE", flag: "🇩🇪" },
    { code: "at", label: "AT", flag: "🇦🇹" },
    { code: "ch", label: "CH", flag: "🇨🇭" },
    { code: "au", label: "AU", flag: "🇦🇺"},
  ];

  // Находим объект с флагом по текущему языку (lng)
  const currentFlag = flags.find((flag) => flag.code === lng);

  return (
    <div className="flex justify-center items-center" ref={switcherRef}>
      <div className="selected">
        <strong onClick={toggleLanguageVisibility}>
          {currentFlag && currentFlag.flag} {lng}
        </strong>
      </div>
      {isLanguageVisible && (
        <div className="language-wrapper absolute">
          {languages
            .filter((l) => lng !== l)
            .map((l, index) => {
              const languageFlag = flags.find((flag) => flag.code === l);
              return (
                <span key={l}>
                  {index > 0}
                  <Link href={`/${l}/${url}`} passHref>
                    {languageFlag && languageFlag.flag} {l}
                  </Link>
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Switcher;
