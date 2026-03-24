import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="bg-[#f1f1f1] py-10 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-9">
        <Link
          href="/promotions"
          className="group block overflow-hidden"
          aria-label="View promotions"
        >
          <Image
            src="/home-promo-banner.webp"
            alt="Weekly deals available now. Come visit your nearest Speedy Corner today."
            width={1600}
            height={330}
            className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.01]"
            priority={false}
          />
        </Link>
      </div>
    </section>
  );
}
