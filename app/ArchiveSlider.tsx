"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css/core";

const slides = [
  { src: "/media/traitor-front.png", label: "Traitor / Front" },
  { src: "/media/traitor-back.png", label: "Traitor / Back" },
  { src: "/media/buried-front.png", label: "Buried / Front" },
  { src: "/media/buried-back.png", label: "Buried / Back" },
  { src: "/media/traitor-alt.png", label: "Traitor / Detail" },
];

export default function ArchiveSlider() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const splide = new Splide(rootRef.current, {
      type: "loop",
      autoWidth: true,
      focus: "center",
      drag: "free",
      snap: false,
      gap: "clamp(10px, 1.5vw, 24px)",
      arrows: false,
      pagination: false,
      wheel: true,
      wheelSleep: 90,
      releaseWheel: false,
      waitForTransition: false,
      autoScroll: {
        speed: 0.45,
        pauseOnHover: true,
        pauseOnFocus: true,
      },
    });

    splide.mount({ AutoScroll });
    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <section className="splide archive-splide" ref={rootRef} aria-label="Archived release previews">
      <div className="splide__track">
        <ul className="splide__list">
          {slides.map((slide) => (
            <li className="splide__slide" key={slide.src}>
              <a className="archive-panel" href="/archive">
                <Image src={slide.src} alt={slide.label} fill sizes="(max-width: 700px) 72vw, 30vw" />
                <span>{slide.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
