import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  GraduationCap,
  Hospital,
  Microscope,
  ShieldCheck,
  Syringe,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { CountUpStats } from './CountUpStats'
import { CertificateIcon, DoctorIcon, GroupIcon } from './Icons'

/* Every px value below is measured from the 1440px-wide design PDF. */

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center justify-center gap-4 text-[12px] sm:gap-[39px] leading-5 font-medium tracking-[0.34em] text-wine uppercase sm:text-[13px]">
      <span aria-hidden className="h-px w-8 bg-[#c97d8a] sm:w-[53px]" />
      {children}
      <span aria-hidden className="h-px w-8 bg-[#c97d8a] sm:w-[53px]" />
    </p>
  )
}

function TopRule({ width }: { width: number }) {
  return <span aria-hidden className="mx-auto block h-[2px] bg-wine-deep" style={{ width }} />
}

export function Benefits() {
  const { t } = useLang()
  const icons = [CertificateIcon, FileText, Syringe, GroupIcon]
  return (
    <section id="benefits" className="bg-white px-4 py-14 sm:px-6 lg:h-[965px] lg:px-0 lg:pt-[38px] lg:pb-0">
      <div className="mx-auto max-w-[1287px] text-center">
        <Eyebrow>{t.benefits.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-serif text-[44px] leading-none text-[#0a0a10] sm:text-[64px] lg:mt-[20px] lg:text-[78px]">
          {t.benefits.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[900px] text-[17px] leading-[1.5] text-[#4a4b50] lg:mt-[20px] lg:text-[19px]">
          {t.benefits.lead}
        </p>

        <ul className="mt-10 grid gap-[30px] sm:grid-cols-2 lg:mt-[41px] lg:grid-rows-[330px_310px] lg:gap-x-[31px] lg:gap-y-[30px]">
          {t.benefits.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li key={item.title} className="card-shadow lift flex flex-col items-center rounded-[18px] bg-white px-8 pt-[27px] pb-7">
                <span className="grid size-[110px] place-items-center rounded-full bg-wine-soft text-wine lg:size-[131px]">
                  <Icon size={86} strokeWidth={1.15} />
                </span>
                <h3 className="mt-[17px] font-serif text-[28px] leading-10 text-[#0a0a0a] lg:text-[33px]">{item.title}</h3>
                <p className="mt-2 max-w-[470px] text-[17px] leading-[29px] text-[#515257] lg:text-[19px]">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Bold the leading figure of a bio line ("13+", "500+", "3 000+") so the numbers can be scanned. */
function withFigure(text: string) {
  const m = /^(\d[\d\s,.]*\+)(.*)$/s.exec(text)
  if (!m) return text
  return (
    <>
      <strong className="font-semibold text-wine-text">{m[1]}</strong>
      {m[2]}
    </>
  )
}

export function Speaker() {
  const { t } = useLang()
  return (
    <section id="speaker" className="bg-white">
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[960px] lg:grid-cols-[minmax(0,48%)_minmax(0,1fr)] xl:grid-cols-[minmax(0,50%)_minmax(0,1fr)]">
        <img
          src="/images/speaker.webp"
          srcSet="/images/speaker-480.webp 480w, /images/speaker.webp 815w"
          sizes="(min-width: 1024px) 50vw, 100vw"
          decoding="async"
          alt={t.hero.speaker}
          width={764}
          height={960}
          loading="lazy"
          className="block aspect-[764/960] w-full object-cover object-top lg:h-full lg:[aspect-ratio:auto]"
        />
        <div className="min-w-0 px-5 py-12 sm:px-10 lg:py-[88px] lg:pr-[min(64px,4.4vw)] lg:pl-[min(68px,4.72vw)]">
          <p className="grid h-[44px] w-fit place-items-center rounded-full border-[1.5px] border-wine-text px-[26px] text-[15px] font-medium tracking-[0.2em] text-wine-text uppercase lg:text-[17px]">
            {t.speaker.label}
          </p>
          <h2 className="mt-6 font-display text-[clamp(38px,12vw,52px)] leading-[1.05] font-medium tracking-[-0.01em] text-ink sm:text-[64px] lg:mt-[22px] lg:text-[clamp(52px,5.1vw,74px)] lg:leading-none">
            {t.speaker.name[0]}
            <br />
            {t.speaker.name[1]}
          </h2>
          {/* every role carries a divider on its left; the negative margin + overflow clip the divider of the first role on each line */}
          <div className="mt-5 overflow-hidden lg:mt-6">
            <ul className="-ml-[13px] flex flex-wrap gap-y-1.5 text-[13px] font-medium tracking-[0.12em] text-wine-text uppercase sm:text-[14px]">
              {t.speaker.roles.map((r) => (
                <li
                  key={r}
                  className="relative mr-3 pl-[13px] before:absolute before:top-1/2 before:left-0 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-[#d4aab2]"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 lg:mt-10">
            <CountUpStats items={t.speaker.stats} />
          </div>
          <ul className="mt-8 flex flex-col gap-4 lg:mt-10">
            {t.speaker.points.map((p) => (
              <li key={p} className="flex items-start gap-4 text-[16px] leading-[1.6] text-[#292929] sm:text-[17px] xl:text-[18px]">
                <span className="mt-[2px] grid size-[26px] shrink-0 place-items-center rounded-full bg-[#8a1820] text-white">
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                </span>
                <span>{withFigure(p)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-6 lg:mt-12 lg:gap-[min(48px,3.4vw)]">
            <span aria-hidden className="h-[2px] w-16 shrink-0 bg-[#a3515f] sm:w-24 lg:w-[min(160px,11vw)]" />
            <p className="min-w-0 text-[12px] leading-[25px] tracking-[0.25em] text-[#767676] uppercase sm:text-[13px] sm:tracking-[0.3em] lg:text-[clamp(13px,1.1vw,16px)]">
              {t.speaker.motto[0]}
              <br />
              {t.speaker.motto[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Program() {
  const { t } = useLang()
  // same order as the program: theory, break, practice
  const photos = ['/images/program-theory.webp', '/images/program-break.webp', '/images/program-practice.webp']
  return (
    <section id="program" className="bg-[#fcfcfc] px-4 py-14 sm:px-6 lg:px-8 lg:pt-[33px] lg:pb-[88px]">
      <div className="mx-auto max-w-[1332px]">
        <div className="text-center">
          <TopRule width={88} />
          <h2 className="mt-5 font-serif text-[42px] leading-none text-[#342a28] sm:text-[56px] lg:mt-[11px] lg:text-[66px]">{t.program.title}</h2>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[16px] text-[#494949] sm:text-[18px] lg:mt-[22px] lg:text-[19px]">
            <li className="flex items-center gap-2.5">
              <Clock size={22} strokeWidth={1.6} className="shrink-0 text-wine-text" aria-hidden="true" />
              {t.program.duration}
            </li>
            <li className="flex items-center gap-2.5">
              <UserRound size={22} strokeWidth={1.6} className="shrink-0 text-wine-text" aria-hidden="true" />
              {t.program.speaker}
            </li>
          </ul>
        </div>

        <ol className="mt-10 flex flex-col gap-5 lg:mt-12 lg:gap-6">
          {t.program.items.map((item, i) => (
            <li key={item.title} className="card-shadow overflow-hidden rounded-[14px] border-l-[6px] border-wine-deep bg-white">
              <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:gap-7 sm:p-5 lg:pr-8">
                <img
                  src={photos[i]}
                  alt=""
                  width={525}
                  height={236}
                  loading="lazy"
                  className="block aspect-[525/236] w-full shrink-0 rounded-[10px] object-cover sm:w-[200px] lg:w-[240px]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold tracking-[0.3em] text-wine">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 font-serif text-[24px] leading-[1.2] font-bold tracking-[0.01em] text-[#302825] uppercase xl:text-[30px]">{item.title}</h3>
                  {item.note && <p className="mt-1.5 text-[16px] text-[#6b6b6b] lg:text-[18px]">{item.note}</p>}
                </div>
                <span className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-wine-soft px-4 py-2 text-[15px] font-semibold whitespace-nowrap text-wine-text lg:text-[17px]">
                  <Clock size={18} strokeWidth={2} aria-hidden="true" />
                  {item.duration}
                </span>
              </div>

              {item.groups.length > 0 && (
                <div className={`grid gap-8 border-t border-[#eeeaea] px-5 pt-6 pb-7 sm:px-7 lg:px-8 lg:pb-8 ${item.groups.length > 1 ? 'lg:grid-cols-3 lg:gap-10' : ''}`}>
                  {item.groups.map((g) => (
                    <div key={g.title} className="min-w-0">
                      <h4 className="font-serif text-[19px] leading-[1.3] font-bold text-[#302825] lg:text-[21px]">{g.title}</h4>
                      {/* a single group (practice) flows into two columns, read top to bottom so the steps stay in order */}
                      <ul className={`mt-3.5 ${item.groups.length === 1 ? 'md:columns-2 md:gap-x-10' : ''}`}>
                        {g.points.map((p) => (
                          <li key={p} className="flex break-inside-avoid gap-3 pb-2.5 text-[16px] leading-[1.55] text-[#3b3b3a] lg:text-[17px]">
                            <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-wine-deep" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-12 max-w-[860px] text-center font-display text-[22px] leading-[1.35] text-wine-text italic sm:text-[26px] lg:mt-14 lg:text-[30px]">
          {t.program.outro}
        </p>

        <div className="mt-8 text-center lg:mt-10">
          <a href="#register" className="btn-3d h-[64px] w-full max-w-[425px] rounded-[14px] text-[20px] lg:h-[72px] lg:text-[22px]">
            {t.claim}
            <ArrowRight size={24} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function Audience() {
  const { t } = useLang()
  const icons = [DoctorIcon, Hospital, GroupIcon]
  return (
    <section id="audience" className="bg-[#fdfdfd] px-4 py-14 sm:px-6 lg:h-[720px] lg:px-0 lg:pt-[29px] lg:pb-0">
      <div className="mx-auto max-w-[1376px] text-center">
        <TopRule width={63} />
        <h2 className="mt-5 font-serif text-[44px] leading-none text-[#2d2f31] sm:text-[56px] lg:mt-[6px] lg:text-[66px]">
          {t.audience.title[0]} <span className="text-wine-text">{t.audience.title[1]}</span>
        </h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-[46px]">
          {t.audience.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li key={item.title} className="lift rounded-[16px] border border-[#ececec] bg-[#fbfbfb] p-[10px] lg:h-[516px]">
                <img
                  src={`/images/audience-${i + 1}.webp`}
                  alt=""
                  width={427}
                  height={270}
                  loading="lazy"
                  className="block aspect-[427/270] w-full rounded-t-[10px] object-cover"
                />
                <span className="relative mx-auto -mt-[57px] grid size-[117px] place-items-center rounded-full bg-[#f6f0f0] text-wine-text shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Icon size={74} strokeWidth={1.15} />
                </span>
                <h3 className="mx-auto mt-[12px] max-w-[380px] font-serif text-[26px] leading-[31px] font-bold text-[#2e2f31] lg:text-[29px]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-[17px] max-w-[355px] pb-6 text-balance text-[17px] leading-[27.6px] text-[#585858] lg:text-[19.5px]">
                  {item.text}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Brands() {
  const { t } = useLang()
  const values = [GraduationCap, Microscope, ShieldCheck, UsersRound]
  return (
    <section
      id="brand"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f5f5_0%,#f4f5f7_35%,#f2f3f5_70%,#eff0f2_100%)] px-4 py-14 sm:px-6 lg:h-[964px] lg:px-0 lg:py-0"
    >
      <img src="/images/brand-left.webp" alt="" aria-hidden width={155} height={960} loading="lazy" className="fade-x-r pointer-events-none absolute top-0 left-0 hidden h-[960px] w-[155px] lg:block" />
      <img src="/images/brand-right.webp" alt="" aria-hidden width={163} height={960} loading="lazy" className="fade-x-l pointer-events-none absolute top-0 right-0 hidden h-[960px] w-[163px] lg:block" />

      <div className="relative mx-auto max-w-[1440px] text-center lg:pt-[56px]">
        <h2 className="flex items-center justify-center gap-5 text-[24px] leading-10 font-bold tracking-[0.27em] text-wine-text uppercase sm:gap-[33px] lg:text-[30px]">
          <span aria-hidden className="h-[1.5px] w-10 bg-[#a3515f] sm:w-[75px]" />
          {t.brands.title}
          <span aria-hidden className="h-[1.5px] w-10 bg-[#a3515f] sm:w-[75px]" />
        </h2>
        <p className="mt-4 text-[12px] tracking-[0.3em] text-[#6c6c6e] uppercase sm:text-[14px] sm:tracking-[0.4em] lg:mt-[29px]">
          {t.brands.tagline}
        </p>

        <div className="relative mx-auto mt-12 grid max-w-[1256px] gap-14 md:grid-cols-2 md:gap-0 lg:mt-[83px] lg:h-[458px]">
          <span aria-hidden className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-[#cbcdcc] md:block" />
          {[
            { label: t.brands.organizer, logo: '/images/logo-professional.webp', w: 513, h: 131, alt: 'Professional derma series', text: t.brands.organizerText, max: 455, logoMt: 67, textMt: 70 },
            { label: t.brands.partner, logo: '/images/logo-reneo.webp', w: 452, h: 155, alt: 'reNeo Cosmetics', text: t.brands.partnerText, max: 450, logoMt: 56, textMt: 56 },
          ].map((b) => (
            <div key={b.alt} className="flex flex-col items-center px-4">
              <p className="text-[17px] leading-6 font-bold tracking-[0.2em] text-wine-text uppercase lg:text-[19px]">{b.label}</p>
              <span aria-hidden className="mt-[22px] block h-[1.5px] w-[93px] bg-[#b35b69]" />
              <img
                src={b.logo}
                alt={b.alt}
                width={b.w}
                height={b.h}
                loading="lazy"
                className="mt-10 h-auto w-full lg:mt-[var(--mt)]"
                style={{ maxWidth: b.w, ['--mt' as string]: `${b.logoMt}px` }}
              />
              <p
                className="mt-8 text-[19px] leading-[32px] text-[#24272d] lg:mt-[var(--tmt)] lg:text-[25px] lg:leading-[33px]"
                style={{ maxWidth: b.max, ['--tmt' as string]: `${b.textMt}px` }}
              >
                {b.text}
              </p>
            </div>
          ))}
        </div>

        <ul className="mx-auto mt-14 grid max-w-[1000px] grid-cols-2 gap-y-8 md:grid-cols-4 lg:mt-[78px]">
          {t.brands.values.map((v, i) => {
            const Icon = values[i]
            return (
              <li
                key={v}
                className={`flex flex-col items-center gap-[14px] px-3 text-[13px] leading-[21.5px] tracking-[0.04em] uppercase md:border-[#cbcdcc] lg:text-[15px] ${i > 0 ? 'md:border-l' : ''} ${i === 2 ? 'text-wine-text' : 'text-[#656668]'}`}
              >
                <Icon size={40} strokeWidth={1.3} className="text-wine-text" />
                <span className="max-w-[150px]">{v}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
