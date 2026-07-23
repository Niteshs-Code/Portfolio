"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const INDIAN_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi (हिंदी)" },
  { code: "mr", name: "Marathi (मराठी)" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "kn", name: "Kannada (కನ್ನಡ)" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "as", name: "Assamese (অসমীয়া)" },
  { code: "or", name: "Odia (ଓଡ଼ିଆ)" },
];

export default function GoogleTranslator() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: "en", name: "English" });

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr,gu,ta,te,kn,ml,bn,pa,ur,as,or",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "hidden_google_translator"
        );
      }
    };

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const googTrans = getCookie("googtrans");
    if (googTrans) {
      const langCode = googTrans.split("/").pop();
      const activeLang = INDIAN_LANGUAGES.find(l => l.code === langCode);
      if (activeLang) {
        setCurrentLang(activeLang);
      }
    } else {
      setCurrentLang({ code: "en", name: "English" });
    }
  }, []);

  const changeLanguage = (lang) => {
    setIsOpen(false);

    if (lang.code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    } else {
      const cookieValue = `/en/${lang.code}`;
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
    }

    window.location.href = window.location.pathname + window.location.search;
  };

  return (
    <div className="notranslate relative z-50 inline-block" translate="no">
      <style jsx global>{`
        .goog-te-banner-frame, .goog-te-banner, .skiptranslate iframe, #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body { top: 0 !important; position: static !important; }
        #hidden_google_translator { display: none !important; }
      `}</style>

      <div className="relative inline-block text-left">
        {/* Dropdown Button - Mobile pe width thodi choti aur flexible ki hai */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex w-36 sm:w-48 items-center justify-between rounded-xl border border-white/10 bg-zinc-900/85 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-zinc-200 shadow-lg backdrop-blur-md transition-all hover:bg-zinc-800 hover:border-white/20"
        >
          <span className="flex items-center gap-1.5 truncate">
            🌐 <span className="truncate">{currentLang.name}</span>
          </span>
          <svg className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 sm:w-56 max-h-80 overflow-y-auto origin-top-right rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700">
            <div className="py-1">
              {INDIAN_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-xs sm:text-sm transition-colors ${
                    currentLang.code === lang.code
                      ? "bg-sky-500/20 text-white font-semibold"
                      : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div id="hidden_google_translator"></div>

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}