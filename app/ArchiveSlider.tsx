"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";

const slides = [
  {
    front: "/media/buried-front.png",
    alternate: "/media/buried-back.png",
    label: "Pre-001 / Buried",
  },
  {
    front: "/media/traitor-front.png",
    alternate: "/media/traitor-back.png",
    label: "Pre-001 / Traitor",
  },
  {
    front: "/media/001-front.png",
    alternate: "/media/001-back.png",
    label: "001 / Correction",
  },
];

export default function ArchiveSlider() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const glide = new Glide(rootRef.current, {
      type: "slider",
      rewind: true,
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
            <li className="glide__slide" key={`${slide.label}-${index}`}>
              <a className="archive-panel" href="/archive">
                <Image className="archive-image archive-image-front" src={slide.front} alt={`${slide.label} front`} fill sizes="(max-width: 600px) 78vw, (max-width: 900px) 46vw, 30vw" />
                <Image className="archive-image archive-image-alternate" src={slide.alternate} alt={`${slide.label} back`} fill sizes="(max-width: 600px) 78vw, (max-width: 900px) 46vw, 30vw" />
                <span>{slide.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
