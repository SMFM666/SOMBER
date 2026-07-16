"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";

const slides = [
  { src: "/media/001-front.png", label: "001 / Correction / Front" },
  { src: "/media/001-back.png", label: "001 / Correction / Back" },
  { src: "/media/ad-001.png", label: "001 / Correction / Campaign" },
];

export default function ArchiveSlider() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const glide = new Glide(rootRef.current, {
      type: "carousel",
      startAt: 0,
      perView: 3,
      focusAt: "center",
      gap: 18,
      autoplay: 2600,
      hoverpause: true,
      animationDuration: 850,
      animationTimingFunc: "cubic-bezier(.2,.7,.2,1)",
      keyboard: true,
      swipeThreshold: 40,
      dragThreshold: 70,
      peek: { before: 80, after: 80 },
      breakpoints: {
        900: { perView: 2, gap: 14, peek: { before: 32, after: 32 } },
        600: { perView: 1, gap: 12, peek: { before: 42, after: 42 } },
      },
    });

    glide.mount();

    return () => {
      glide.destroy();
    };
  }, []);

  return (
    <div className="glide archive-glide" ref={rootRef} aria-label="Archived release previews">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {slides.map((slide, index) => (
            <li className={`glide__slide${slide.src ? "" : " is-empty"}`} key={`${slide.label}-${index}`}>
              <a className="archive-panel" href="/archive">
                {slide.src ? (
                  <Image src={slide.src} alt={slide.label} fill sizes="(max-width: 700px) 72vw, 30vw" />
                ) : (
                  <span className="empty-panel-mark" aria-hidden="true">+</span>
                )}
                <span>{slide.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
