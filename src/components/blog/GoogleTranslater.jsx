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
  { code: "ml", name: "Malayalam (മലയാളం)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "as", name: "Assamese (অসমীয়া)" },
  { code: "or", name: "Odia (ଓੜିଆ)" },
];

export default function GoogleTranslator() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: "en", name: "English" });

  useEffect(() => {
    // 1. Google Translate Init
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

    // 2. Read exact language from cookie
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

  // 3. Cookie based logic using static language codes
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

    // Direct hard reload to clear previous state cleanly
    window.location.href = window.location.pathname + window.location.search;
  };

  return (
    // 'notranslate' class lagane se Google is container ke kisi bhi text ko touch nahi karega
    <div className=" mr-4 rounded-r-2xl rounded-l-md notranslate relative z-50 my-6 flex w-full justify-end px-4 sm:px-0" translate="no">
      
      <style jsx global>{`
        .goog-te-banner-frame, .goog-te-banner, .skiptranslate iframe, #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body { top: 0 !important; position: static !important; }
        #hidden_google_translator { display: none !important; }
      `}</style>

      <div className="relative inline-block text-left">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex w-52 items-center justify-between rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-sm font-medium text-zinc-200 shadow-lg backdrop-blur-md transition-all hover:bg-zinc-800 hover:border-white/20"
        >
          <span className="flex items-center gap-2">
            🌐 {currentLang.name}
          </span>
          <svg className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto origin-top-right rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none scrollbar-thin scrollbar-thumb-zinc-700">
            <div className="py-1">
              {INDIAN_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang)}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors ${
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