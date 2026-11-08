import { ArrowRight, CalendarDays, Clock, GraduationCap, MapPin, Shield, UsersRound } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'

export function Hero() {
  const { t } = useLang()
  const factIcons = [Shield, GraduationCap, UsersRound]

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(90deg,#fdfdfd_0%,#fafaf9_25%,#f5f4f2_44%,#f2f1ef_100%)]"
    >
      <div className="relative mx-auto max-w-[1440px] lg:min-h-[871px]">
        <img
          src="/images/hero-speaker.webp"
          srcSet="/images/hero-speaker-480.webp 480w, /images/hero-speaker-680.webp 680w, /images/hero-speaker.webp 846w"
          sizes="(min-width: 1024px) 55vw, min(100vw, 560px)"
          alt={t.hero.speaker}
          width={793}
          height={871}
          fetchPriority="high"
          className="fade-l mx-auto block aspect-[793/871] w-full max-w-[560px] object-cover object-[50%_0%] lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-[55.07%] lg:max-w-none lg:[aspect-ratio:auto]"
        />

        <div data-enter className="relative px-5 pt-10 pb-14 sm:px-8 lg:px-0 lg:pt-[78px] lg:pb-6 lg:pl-[61px]">
          <p className="flex items-center gap-[21px] text-[12px] leading-5 font-medium tracking-[0.34em] text-[#767171] uppercase sm:text-[13px]">
            <span aria-hidden className="h-px w-[56px] bg-[#b9939c]" />
            {t.hero.eyebrow}
          </p>

          {/* Each line is its own block (no <br>), with a line-height in em, so the larger wine word gets a line box that
              holds its descenders instead of spilling into the tag. Spacing below scales with the font size. */}
          <h1 className="mt-4 font-display text-[clamp(34px,11.5vw,44px)] leading-[1.08] font-semibold tracking-[-0.005em] text-ink sm:text-[64px] lg:mt-[23px] lg:text-[clamp(56px,5.97vw,86px)]">
            <span className="block">{t.hero.title[0]}</span>
            <span className="block text-[1.1em] leading-[1.12] text-wine-text">{t.hero.title[1]}</span>
            <span className="mt-[max(0.9em,14px)] block font-sans text-[0.3em] leading-none font-medium tracking-[0.28em] text-[#767171] uppercase">
              ({t.hero.tag})
            </span>
          </h1>

          <p className="mt-5 max-w-[500px] text-[19px] leading-[1.35] text-body sm:text-[24px] lg:mt-[28px] lg:max-w-[470px] lg:text-[27px] lg:leading-[36px]">
            {t.hero.lead}
          </p>

          <span aria-hidden className="mt-5 block h-px w-[94px] bg-[#cdc3bc] lg:mt-[26px]" />

          <p className="mt-5 font-display text-[28px] leading-[44px] font-semibold text-wine-text lg:mt-[23px] lg:text-[38px]">
            {t.hero.speaker}
          </p>

          <a
            href="#register"
            className="btn-3d mt-6 h-[64px] w-full gap-[14px] rounded-[14px] text-[19px] sm:w-[433px] lg:mt-[27px] lg:h-[78px] lg:rounded-[16px] lg:text-[22px]"
          >
            {t.reserve}
            <ArrowRight size={24} strokeWidth={1.8} aria-hidden="true" />
          </a>

          <ul className="mt-7 flex flex-wrap items-center gap-y-3 text-[17px] font-semibold text-ink lg:mt-[31px] lg:h-10 lg:text-[18px]">
            <li className="flex items-center gap-[20px] pr-[28px]">
              <CalendarDays size={38} strokeWidth={1.4} className="text-wine" />
              {t.hero.date}
            </li>
            <li className="flex items-center gap-[21px] pr-[28px] sm:h-10 sm:border-l sm:border-[#d9d2cd] sm:pl-[28px]">
              <MapPin size={32} strokeWidth={1.5} className="text-wine" />
              {t.hero.city}
            </li>
            <li className="flex items-center gap-[18px] sm:h-10 sm:border-l sm:border-[#d9d2cd] sm:pl-[28px]">
              <Clock size={30} strokeWidth={1.5} className="text-wine" />
              {t.hero.duration}
            </li>
          </ul>

          <ul className="mt-8 grid max-w-[562px] grid-cols-1 gap-4 border-t border-[#ddd8d4] pt-6 text-[15px] leading-[22px] text-[#3f3f3d] sm:grid-cols-[179px_203px_220px] sm:gap-0 lg:mt-[45px] lg:pt-[31px]">
            {t.hero.facts.map((f, i) => {
              const Icon = factIcons[i]
              return (
                <li
                  key={f}
                  className={`flex items-center gap-[17px] ${i > 0 ? 'sm:border-l sm:border-[#d9d2cd] sm:pl-[24px]' : ''} ${i === 0 ? 'sm:pr-2' : ''}`}
                >
                  <Icon size={36} strokeWidth={1.3} className="shrink-0 text-[#8b7d78]" />
                  <span className={i === 2 ? 'max-w-[140px]' : 'max-w-[110px]'}>{f}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
