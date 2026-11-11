import { asset, assetSet } from '../asset'
import { ArrowRight, CalendarDays, Clock, GraduationCap, MapPin, Shield, UsersRound } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

/*
 * Layout by width:
 * - below md (768px): the photo is a short banner on top (face + shoulders), the text follows;
 * - md and up: the photo fills the right 55% and the text sits on the left, as in the design. Sizes scale with the
 *   viewport (clamp + vw) and reach the design values at 1440px;
 * - the date row and the facts row wrap inside the text column until xl (1280px), where they fit in one line.
 */
export function Hero() {
  const { t } = useLang()
  const factIcons = [Shield, GraduationCap, UsersRound]

  return (
    <section
      id="top"
      className="slide relative overflow-hidden bg-[linear-gradient(90deg,#fdfdfd_0%,#fafaf9_25%,#f5f4f2_44%,#f2f1ef_100%)]"
    >
      {/* grows with the slide, so the photo always fills its height; from md the text is centered beside it */}
      <div className="relative mx-auto max-w-[calc(1440px/var(--k,1))] grow md:flex md:min-h-[min(871px,60.5vw)] md:flex-col md:justify-center">
        <img
          src={asset('/images/hero-speaker.webp')}
          srcSet={assetSet('/images/hero-speaker-480.webp 480w, /images/hero-speaker-680.webp 680w, /images/hero-speaker.webp 846w')}
          sizes="(min-width: 768px) 55vw, 100vw"
          alt={t.hero.speaker}
          width={793}
          height={871}
          fetchPriority="high"
          className="hero-photo block aspect-[5/4] w-full object-cover object-[50%_8%] sm:aspect-[16/10] md:absolute md:top-0 md:right-0 md:aspect-auto md:h-full md:w-[55.07%] md:object-[50%_0%]"
        />

        <div
          data-enter
          className="relative px-5 pt-7 pb-10 sm:px-8 sm:pt-9 sm:pb-12 md:pt-[clamp(40px,5.4vw,78px)] lg:pl-[clamp(40px,4.24vw,61px)] xl:pb-6"
        >
          <p className="flex items-center gap-4 text-[12px] leading-5 font-medium tracking-[0.34em] text-[#767171] uppercase sm:gap-[21px] sm:text-[13px]">
            <span aria-hidden className="h-px w-10 shrink-0 bg-[#b9939c] sm:w-[56px]" />
            {t.hero.eyebrow}
          </p>

          {/* Each line is its own block (no <br>), with a line-height in em, so the larger wine word gets a line box that
              holds its descenders instead of spilling into the tag. Spacing below scales with the font size. */}
          <h1 className="mt-3 font-display text-[clamp(34px,10vw,56px)] leading-[1.08] font-semibold tracking-[-0.005em] text-ink md:mt-[clamp(14px,1.6vw,23px)] md:text-[clamp(40px,5.97vw,86px)]">
            <span className="block">{t.hero.title[0]}</span>
            <span className="block text-[1.1em] leading-[1.12] text-wine-text">{t.hero.title[1]}</span>
            <span className="mt-[max(0.9em,12px)] block font-sans text-[max(0.3em,12px)] leading-none font-medium tracking-[0.28em] text-[#767171] uppercase">
              ({t.hero.tag})
            </span>
          </h1>

          <p className="mt-4 max-w-[500px] text-[17px] leading-[1.4] text-body sm:text-[20px] md:mt-[clamp(16px,1.95vw,28px)] md:max-w-[min(470px,44vw)] md:text-[clamp(17px,1.875vw,27px)] md:leading-[1.34]">
            {t.hero.lead}
          </p>

          <span aria-hidden className="mt-4 block h-px w-[94px] bg-[#cdc3bc] md:mt-[clamp(16px,1.8vw,26px)]" />

          <p className="mt-4 font-display text-[clamp(24px,7vw,32px)] leading-[1.2] font-semibold text-wine-text md:mt-[clamp(14px,1.6vw,23px)] md:text-[clamp(24px,2.64vw,38px)]">
            {t.hero.speaker}
          </p>

          <a
            href="#register"
            className="btn-3d mt-5 h-[58px] w-full gap-[14px] rounded-[14px] text-[18px] sm:w-[433px] sm:max-w-full md:mt-[clamp(18px,1.9vw,27px)] md:h-[clamp(58px,5.42vw,78px)] md:max-w-[44vw] md:text-[clamp(17px,1.53vw,22px)] lg:rounded-[16px]"
          >
            {t.reserve}
            <ArrowRight size={24} strokeWidth={1.8} aria-hidden="true" />
          </a>

          {/* until xl the items wrap as plain chips; from xl they sit in one row with dividers, as in the design */}
          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[16px] font-semibold text-ink md:mt-[clamp(20px,2.15vw,31px)] md:max-w-[46vw] xl:max-w-none xl:flex-nowrap xl:gap-x-0 xl:text-[18px]">
            <li className="flex items-center gap-3 xl:gap-[20px] xl:pr-[28px]">
              <CalendarDays strokeWidth={1.4} aria-hidden="true" className="size-7 shrink-0 text-wine xl:size-[38px]" />
              {t.hero.date}
            </li>
            <li className="flex items-center gap-3 xl:h-10 xl:gap-[21px] xl:border-l xl:border-[#d9d2cd] xl:px-[28px]">
              <MapPin strokeWidth={1.5} aria-hidden="true" className="size-7 shrink-0 text-wine xl:size-8" />
              {t.hero.city}
            </li>
            <li className="flex items-center gap-3 xl:h-10 xl:gap-[18px] xl:border-l xl:border-[#d9d2cd] xl:pl-[28px]">
              <Clock strokeWidth={1.5} aria-hidden="true" className="size-7 shrink-0 text-wine xl:size-[30px]" />
              {t.hero.duration}
            </li>
          </ul>

          {/* every fact is as wide as its text needs (min-w-min lets a long word widen it), so nothing runs into a divider */}
          <ul className="mt-6 flex flex-col gap-3 border-t border-[#ddd8d4] pt-5 text-[15px] leading-[22px] text-[#3f3f3d] sm:flex-row sm:flex-wrap sm:gap-x-8 md:mt-[clamp(24px,3.1vw,45px)] md:max-w-[46vw] md:pt-[clamp(20px,2.15vw,31px)] xl:w-fit xl:max-w-none xl:flex-nowrap xl:gap-x-0">
            {t.hero.facts.map((f, i) => {
              const Icon = factIcons[i]
              return (
                <li
                  key={f}
                  className={`flex items-center gap-3 xl:gap-[17px] ${i > 0 ? 'xl:border-l xl:border-[#d9d2cd] xl:pl-[24px]' : ''} ${i < 2 ? 'xl:pr-4' : ''}`}
                >
                  <Icon strokeWidth={1.3} aria-hidden="true" className="size-8 shrink-0 text-[#8b7d78] xl:size-9" />
                  <span className={`sm:min-w-min ${i === 2 ? 'sm:max-w-[140px]' : 'sm:max-w-[110px]'}`}>{f}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
