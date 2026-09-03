"use client";

import { useEffect, useState } from "react";
import { WHATSAPP_NUMERO } from "@/lib/config";

export function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        className={`${
          visible ? "block" : "hidden"
        } fixed right-[18px] bottom-[74px] z-[90] bg-marino text-white w-[42px] h-[42px] text-base`}
        aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
      <a
        className="fixed right-[18px] bottom-[18px] z-[90] bg-oliva text-white px-5 py-[13px] text-[0.9rem] font-bold shadow-[0_3px_14px_rgba(0,0,0,.24)] hover:bg-oliva-2"
        href={`https://wa.me/${WHATSAPP_NUMERO}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </>
  );
}
