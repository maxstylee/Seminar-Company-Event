import { asset, assetSet } from '../asset'
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

/*
 * The px values come from the 1440px-wide design PDF and are reached at that width. Below it nothing is pinned:
 * sections have no fixed heights (the content sets them, whatever the language), every section keeps a side gutter,
 * and headings / card text scale with the viewport (clamp + vw) instead of jumping between fixed sizes.
 */

function Eyebrow({ children }: { children: string }) {
  return (
    <p data-reveal className="flex items-center justify-center gap-4 text-[12px] sm:gap-[39px] leading-5 font-medium tracking-[0.34em] text-wine uppercase sm:text-[13px]">
      <span aria-hidden className="h-px w-8 shrink-0 bg-[#c97d8a] sm:w-[53px]" />
      {children}
      <span aria-hidden className="h-px w-8 shrink-0 bg-[#c97d8a] sm:w-[53px]" />
    </p>
  )
}

function TopRule({ width }: { width: number }) {
  return <span data-reveal aria-hidden className="mx-auto block h-[2px] bg-wine-deep" style={{ width }} />
}

export function Benefits() {
  const { t } = useLang()
  const icons = [CertificateIcon, FileText, Syringe, GroupIcon]
  return (
    <section id="benefits" className="slide bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pt-[32px] lg:pb-[40px]">
      <div className="mx-auto max-w-[calc(1287px/var(--k,1))] text-center">
        <Eyebrow>{t.benefits.eyebrow}</Eyebrow>
        <h2 data-reveal className="mt-3 font-serif text-[clamp(32px,4.19vw+17.66px,78px)] leading-[1.08] text-[#0a0a10] lg:mt-[20px]">
          {t.benefits.title}
        </h2>
        <p data-reveal className="mx-auto mt-3 max-w-[900px] text-[16px] leading-[1.5] text-[#4a4b50] sm:text-[17px] lg:mt-[20px] lg:text-[19px]">
          {t.benefits.lead}
        </p>

        {/* phones: compact rows (icon left, text right); from sm: centered cards, two per row, equal heights */}
        <ul className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 sm:auto-rows-fr sm:grid-cols-2 sm:gap-6 lg:mt-[41px] lg:gap-[30px]">
          {t.benefits.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li
                key={item.title}
                data-reveal
                className="card-shadow lift flex items-start gap-4 rounded-[18px] bg-white p-5 text-left sm:flex-col sm:items-center sm:gap-0 sm:px-6 sm:pt-[27px] sm:pb-7 sm:text-center lg:px-8"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-wine-soft text-wine min-[360px]:size-16 sm:size-[clamp(88px,7.8vw,112px)]">
                  <Icon strokeWidth={1.15} className="size-[66%]" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-[21px] leading-[1.25] text-[#0a0a0a] sm:mt-[17px] sm:text-[clamp(22px,2.3vw,33px)]">{item.title}</h3>
                  <p className="mt-1.5 max-w-[470px] text-[15.5px] leading-[1.55] text-[#515257] sm:mt-2 sm:text-[clamp(15px,1.32vw,19px)]">{item.text}</p>
                </div>
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
    <section id="speaker" data-tall data-split className="slide bg-white">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-[minmax(0,40%)_minmax(0,1fr)] lg:grid-cols-[minmax(0,48%)_minmax(0,1fr)] xl:grid-cols-[minmax(0,50%)_minmax(0,1fr)]">
        {/* Below md: a banner cropped to the face and shoulders (the full portrait would be taller than the screen).
            From md: the portrait keeps its own shape (never taller than the screen) and stays in view, sticky under
            the header, while the longer text column scrolls past. It is no longer stretched to the height of the
            text, which cropped it to a close-up of the face. */}
        <img
          data-reveal
          src={asset('/images/speaker.webp')}
          srcSet={assetSet('/images/speaker-480.webp 480w, /images/speaker.webp 815w')}
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 40vw, 100vw"
          decoding="async"
          alt={t.hero.speaker}
          width={764}
          height={960}
          loading="lazy"
          className="block aspect-square w-full object-cover object-top sm:aspect-[16/10] md:sticky md:top-[72px] md:aspect-[764/960] md:max-h-[calc(100svh-72px)] md:self-start lg:top-[88px] lg:max-h-[calc(100svh-88px)]"
        />
        <div className="min-w-0 px-5 py-10 sm:px-8 sm:py-12 md:py-10 lg:py-[clamp(48px,6.1vw,88px)] lg:pr-[min(64px,4.4vw)] lg:pl-[min(68px,4.72vw)]">
          <p data-reveal className="grid h-[40px] w-fit place-items-center rounded-full border-[1.5px] border-wine-text px-5 text-[13px] font-medium tracking-[0.18em] text-wine-text uppercase sm:h-[44px] sm:px-[26px] sm:text-[15px] sm:tracking-[0.2em] lg:text-[17px]">
            {t.speaker.label}
          </p>
          <h2 data-reveal className="mt-5 font-display text-[clamp(34px,9.5vw,60px)] leading-[1.06] font-medium tracking-[-0.01em] text-ink md:text-[clamp(38px,5.1vw,74px)] lg:mt-[22px]">
            <span className="block">{t.speaker.name[0]}</span>
            <span className="block">{t.speaker.name[1]}</span>
          </h2>
          {/* every role carries a divider on its left; the negative margin + overflow clip the divider of the first role on each line */}
          <div data-reveal className="mt-4 overflow-hidden lg:mt-6">
            <ul className="-ml-[13px] flex flex-wrap gap-y-1.5 text-[12px] font-medium tracking-[0.12em] text-wine-text uppercase sm:text-[14px]">
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
          <div data-reveal className="mt-7 lg:mt-10">
            <CountUpStats items={t.speaker.stats} />
          </div>
          <ul className="mt-7 flex flex-col gap-3.5 sm:gap-4 lg:mt-10">
            {t.speaker.points.map((p) => (
              <li key={p} data-reveal data-block className="flex items-start gap-3.5 text-[16px] leading-[1.55] text-[#292929] sm:gap-4 sm:text-[17px] sm:leading-[1.6] xl:text-[18px]">
                <span className="mt-[2px] grid size-[26px] shrink-0 place-items-center rounded-full bg-[#8a1820] text-white">
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="min-w-0">{withFigure(p)}</span>
              </li>
            ))}
          </ul>
          {/* sized by fit.ts so that the last page ends where the section does (see fitSplit) */}
          <div data-fill aria-hidden />
        </div>
      </div>
    </section>
  )
}

type ProgramItem = ReturnType<typeof useLang>['t']['program']['items'][number]

function ProgramCard({ item, index, photo }: { item: ProgramItem; index: number; photo: string }) {
  return (
    <li data-reveal className="card-shadow overflow-hidden rounded-[14px] border-l-[6px] border-wine-deep bg-white">
      {/* the photo, title and duration share one row only from md, where the title has room next to them */}
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-7 md:p-5 lg:pr-8">
        <img
          src={photo}
          alt=""
          width={525}
          height={236}
          loading="lazy"
          className="block aspect-[525/236] w-full shrink-0 rounded-[10px] object-cover md:w-[200px] lg:w-[240px]"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold tracking-[0.3em] text-wine">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-1 font-serif text-[22px] leading-[1.2] font-bold tracking-[0.01em] text-[#302825] uppercase sm:text-[24px] xl:text-[30px]">{item.title}</h3>
          {item.note && <p className="mt-1.5 text-[16px] text-[#6b6b6b] lg:text-[18px]">{item.note}</p>}
        </div>
        <span className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-wine-soft px-4 py-2 text-[15px] font-semibold whitespace-nowrap text-wine-text lg:text-[17px]">
          <Clock size={18} strokeWidth={2} aria-hidden="true" />
          {item.duration}
        </span>
      </div>

      {item.groups.length > 0 && (
        <div className={`grid gap-7 border-t border-[#eeeaea] px-5 pt-6 pb-6 sm:gap-8 sm:px-7 sm:pb-7 lg:px-8 lg:pb-8 ${item.groups.length > 1 ? 'lg:grid-cols-3 lg:gap-10' : ''}`}>
          {item.groups.map((g) => (
            <div key={g.title} className="min-w-0">
              <h4 className="font-serif text-[19px] leading-[1.3] font-bold text-[#302825] lg:text-[21px]">{g.title}</h4>
              {/* a single group (practice) flows into two columns, read top to bottom so the steps stay in order */}
              <ul className={`mt-3.5 ${item.groups.length === 1 ? 'md:columns-2 md:gap-x-10' : ''}`}>
                {g.points.map((p) => (
                  <li key={p} className="flex break-inside-avoid gap-3 pb-2.5 text-[16px] leading-[1.55] text-[#3b3b3a] lg:text-[17px]">
                    <span aria-hidden className="mt-[0.6em] size-2 shrink-0 rounded-full bg-wine-deep" />
                    <span className="min-w-0">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  )
}

/**
 * The program is two screens on a computer, cut where the content breaks (not in the middle of a card): the first is the
 * heading and the theory card, the second is the break, the practice card and the call to action. Each is its own
 * `.slide`, so fit.ts scales it to one screen. On a phone the two sections simply follow each other as one page.
 */
export function Program() {
  const { t } = useLang()
  // same order as the program: theory, break, practice
  const photos = ['/images/program-theory.webp', '/images/program-break.webp', '/images/program-practice.webp'].map(asset)
  const [first, ...rest] = t.program.items
  return (
    <>
      <section id="program" className="slide bg-[#fcfcfc] px-4 pt-12 pb-5 sm:px-6 sm:pt-14 lg:px-8 lg:pt-[33px] lg:pb-6">
        <div className="mx-auto max-w-[calc(1332px/var(--k,1))]">
          <div className="text-center">
            <TopRule width={88} />
            <h2 data-reveal className="mt-4 font-serif text-[clamp(32px,3.24vw+19.4px,66px)] leading-[1.1] text-[#342a28]">{t.program.title}</h2>
            <ul data-reveal className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[15px] text-[#494949] sm:text-[18px] lg:mt-[22px] lg:text-[19px]">
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
          <ol className="mt-8 sm:mt-10 lg:mt-12">
            <ProgramCard item={first} index={0} photo={photos[0]} />
          </ol>
        </div>
      </section>

      <section className="slide bg-[#fcfcfc] px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pt-6 lg:pb-8">
        <div className="mx-auto max-w-[calc(1332px/var(--k,1))]">
          <ol className="flex flex-col gap-5 lg:gap-6">
            {rest.map((item, i) => (
              <ProgramCard key={item.title} item={item} index={i + 1} photo={photos[i + 1]} />
            ))}
          </ol>

          <p data-reveal className="mx-auto mt-10 max-w-[860px] text-center font-display text-[20px] leading-[1.35] text-wine-text italic sm:mt-12 sm:text-[26px] lg:mt-8 lg:text-[30px]">
            {t.program.outro}
          </p>

          <div data-reveal className="mt-7 text-center sm:mt-8 lg:mt-6">
            <a href="#register" className="btn-3d h-[58px] w-full max-w-[425px] rounded-[14px] text-[18px] sm:h-[64px] sm:text-[20px] lg:h-[64px] lg:text-[22px]">
              {t.claim}
              <ArrowRight size={24} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export function Audience() {
  const { t } = useLang()
  const icons = [DoctorIcon, Hospital, GroupIcon]
  return (
    <section id="audience" className="slide bg-[#fdfdfd] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pt-[29px] lg:pb-[56px]">
      <div className="mx-auto max-w-[calc(1376px/var(--k,1))] text-center">
        <TopRule width={63} />
        <h2 data-reveal className="mt-4 font-serif text-[clamp(32px,3.24vw+19.4px,66px)] leading-[1.1] text-[#2d2f31]">
          {t.audience.title[0]} <span className="text-wine-text">{t.audience.title[1]}</span>
        </h2>

        {/* one centered column below md; three columns from md, with the icon circle (--c) and the text scaled to the card width */}
        <ul className="mx-auto mt-8 grid max-w-[460px] grid-cols-1 gap-5 sm:mt-10 md:max-w-none md:grid-cols-3 md:gap-4 lg:mt-[46px] lg:gap-5">
          {t.audience.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li
                key={item.title}
                data-reveal
                className="lift rounded-[16px] border border-[#ececec] bg-[#fbfbfb] p-[10px] [--c:88px] md:[--c:clamp(76px,8.1vw,117px)]"
              >
                <img
                  src={asset(`/images/audience-${i + 1}.webp`)}
                  alt=""
                  width={427}
                  height={270}
                  loading="lazy"
                  className="block aspect-[427/270] w-full rounded-t-[10px] object-cover"
                />
                <span className="relative mx-auto -mt-[calc(var(--c)/2)] grid size-(--c) place-items-center rounded-full bg-[#f6f0f0] text-wine-text shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Icon strokeWidth={1.15} className="size-[63%]" />
                </span>
                <h3 className="mx-auto mt-[12px] max-w-[380px] font-serif text-[22px] leading-[1.2] font-bold text-[#2e2f31] md:text-[clamp(17px,2.02vw,29px)]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[355px] pb-4 text-balance text-[16px] leading-[1.5] text-[#585858] md:text-[clamp(14px,1.36vw,19.5px)] md:leading-[1.42] lg:mt-[17px] lg:pb-6">
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
      className="slide relative overflow-hidden bg-[linear-gradient(180deg,#f5f5f5_0%,#f4f5f7_35%,#f2f3f5_70%,#eff0f2_100%)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:pt-[56px] lg:pb-[80px]"
    >
      {/* decorative side photos: only where the content leaves them room (they overlapped the logos and text below ~1400px) */}
      <img src={asset('/images/brand-left.webp')} alt="" aria-hidden width={155} height={960} loading="lazy" className="fade-x-r pointer-events-none absolute top-0 left-0 hidden h-full w-[155px] object-cover object-top min-[1400px]:block" />
      <img src={asset('/images/brand-right.webp')} alt="" aria-hidden width={163} height={960} loading="lazy" className="fade-x-l pointer-events-none absolute top-0 right-0 hidden h-full w-[163px] object-cover object-top min-[1400px]:block" />

      <div className="relative mx-auto max-w-[calc(1440px/var(--k,1))] text-center">
        <h2 data-reveal className="flex items-center justify-center gap-4 text-[20px] leading-[1.4] font-bold tracking-[0.2em] text-wine-text uppercase sm:gap-[33px] sm:text-[24px] sm:tracking-[0.27em] lg:text-[30px]">
          <span aria-hidden className="h-[1.5px] w-8 shrink-0 bg-[#a3515f] sm:w-[75px]" />
          {t.brands.title}
          <span aria-hidden className="h-[1.5px] w-8 shrink-0 bg-[#a3515f] sm:w-[75px]" />
        </h2>
        <p data-reveal className="mt-3 text-[12px] tracking-[0.2em] text-[#6c6c6e] uppercase sm:mt-4 sm:text-[14px] sm:tracking-[0.4em] lg:mt-[29px]">
          {t.brands.tagline}
        </p>

        <div className="relative mx-auto mt-10 grid max-w-[1256px] gap-12 md:grid-cols-2 md:gap-0 lg:mt-[83px]">
          <span aria-hidden className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-[#cbcdcc] md:block" />
          {[
            { label: t.brands.organizer, logo: asset('/images/logo-professional.webp'), w: 513, h: 131, alt: 'Professional derma series', text: t.brands.organizerText, max: 455, logoMt: 67, textMt: 70 },
            { label: t.brands.partner, logo: asset('/images/logo-reneo.webp'), w: 452, h: 155, alt: 'reNeo Cosmetics', text: t.brands.partnerText, max: 450, logoMt: 56, textMt: 56 },
          ].map((b) => (
            <div key={b.alt} data-reveal className="flex flex-col items-center px-2 md:px-6 lg:px-12">
              <p className="text-[15px] leading-6 font-bold tracking-[0.2em] text-wine-text uppercase sm:text-[17px] lg:text-[19px]">{b.label}</p>
              <span aria-hidden className="mt-4 block h-[1.5px] w-[93px] bg-[#b35b69] sm:mt-[22px]" />
              {/* never wider than the column: 86% of it on phones, the design width (--w) where it fits */}
              <img
                src={b.logo}
                alt={b.alt}
                width={b.w}
                height={b.h}
                loading="lazy"
                className="mt-8 h-auto w-full max-w-[min(var(--w),86%)] md:max-w-[min(var(--w),100%)] lg:mt-[var(--mt)]"
                style={{ ['--w' as string]: `${b.w}px`, ['--mt' as string]: `${b.logoMt}px` }}
              />
              <p
                className="mt-6 text-[17px] leading-[1.6] text-[#24272d] md:text-[clamp(16px,1.74vw,25px)] md:leading-[1.36] lg:mt-[var(--tmt)]"
                style={{ maxWidth: b.max, ['--tmt' as string]: `${b.textMt}px` }}
              >
                {b.text}
              </p>
            </div>
          ))}
        </div>

        <ul className="mx-auto mt-10 grid max-w-[1000px] grid-cols-2 gap-y-7 sm:mt-14 md:grid-cols-4 lg:mt-[78px]">
          {t.brands.values.map((v, i) => {
            const Icon = values[i]
            return (
              <li
                key={v}
                data-reveal
                className={`flex flex-col items-center gap-[14px] px-1 text-[clamp(11px,3.4vw,13px)] leading-[1.65] tracking-[0.04em] uppercase sm:px-3 md:border-[#cbcdcc] lg:text-[15px] ${i > 0 ? 'md:border-l' : ''} ${i === 2 ? 'text-wine-text' : 'text-[#656668]'}`}
              >
                <Icon size={40} strokeWidth={1.3} className="text-wine-text" />
                <span className="max-w-[min(190px,100%)]">{v}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
