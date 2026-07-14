"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

const slides = [
  { src: "/media/traitor-front.png", label: "Traitor / Front" },
  { src: "/media/traitor-back.png", label: "Traitor / Back" },
  { src: "/media/buried-front.png", label: "Buried / Front" },
  { src: "/media/buried-back.png", label: "Buried / Back" },
  { src: "/media/traitor-alt.png", label: "Traitor / Detail" },
  { src: null, label: "Unassigned / 003" },
  { src: null, label: "Unassigned / 004" },
  { src: null, label: "Unassigned / 005" },
  { src: null, label: "Unassigned / 006" },
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
      gap: "0px",
      arrows: false,
      pagination: false,
      wheel: true,
      wheelSleep: 90,
      releaseWheel: false,
      waitForTransition: false,
      autoScroll: {
        speed: 0.45,
        pauseOnHover: false,
        pauseOnFocus: true,
      },
    });

    splide.mount({ AutoScroll });

    const root = rootRef.current;
    let lastSpeed = 0.45;

    const setSpeed = (speed: number) => {
      if (Math.abs(speed - lastSpeed) < 0.08) return;
      lastSpeed = speed;
      splide.options = {
        autoScroll: {
          speed,
          pauseOnHover: false,
          pauseOnFocus: true,
        },
      };
    };

    const steer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = root.getBoundingClientRect();
      const position = (event.clientX - bounds.left) / bounds.width;
      const distanceFromCenter = Math.abs(position - 0.5) * 2;
      if (distanceFromCenter < 0.08) return setSpeed(0.12);
      const magnitude = 0.35 + distanceFromCenter * 1.1;
      setSpeed(position < 0.5 ? -magnitude : magnitude);
    };

    const resetDirection = () => setSpeed(0.45);
    root.addEventListener("pointermove", steer);
    root.addEventListener("pointerleave", resetDirection);

    return () => {
      root.removeEventListener("pointermove", steer);
      root.removeEventListener("pointerleave", resetDirection);
      splide.destroy();
    };
  }, []);

  return (
    <section className="splide archive-splide" ref={rootRef} aria-label="Archived release previews">
      <div className="splide__track">
        <ul className="splide__list">
          {slides.map((slide, index) => (
            <li className={`splide__slide${slide.src ? "" : " is-empty"}`} key={`${slide.label}-${index}`}>
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
    </section>
  );
}
