"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";

type LocationImageCarouselProps = {
  images: string[];
  locationName: string;
};

export function LocationImageCarousel({
  images,
  locationName,
}: LocationImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  if (!safeImages.length) {
    return null;
  }

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? safeImages.length - 1 : current - 1,
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === safeImages.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-theme-ink">
        Location Photos
      </h2>

      <div className="relative mt-4 overflow-hidden rounded-[1.2rem] border border-theme-line/80 bg-white shadow-[0_14px_32px_rgba(42,30,20,0.08)]">
        <div className="relative h-[280px] w-full sm:h-[420px]">
          <Image
            key={safeImages[activeIndex]}
            src={safeImages[activeIndex]}
            alt={`${locationName} image ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 896px"
            priority={activeIndex === 0}
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_DATA_URL}
          />
        </div>

        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
            >
              &gt;
            </button>

            <div className="absolute right-0 bottom-0 left-0 flex justify-center gap-2 bg-gradient-to-t from-black/40 via-black/15 to-transparent px-4 py-4">
              {safeImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={`h-2.5 rounded-full transition ${
                    index === activeIndex
                      ? "w-6 bg-white"
                      : "w-2.5 bg-white/65 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
