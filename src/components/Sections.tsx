import {
  ArrowRight,
  BookOpen,
  Check,
  Coffee,
  FileText,
  GraduationCap,
  Hospital,
  Microscope,
  ShieldCheck,
  Syringe,
  UsersRound,
} from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
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

export function Speaker() {
  const { t } = useLang()
  return (
    <section id="speaker" className="bg-white">
      <div className="mx-auto grid max-w-[1440px] lg:h-[960px] lg:grid-cols-[53.06%_minmax(0,1fr)]">
        <img
          src="/images/speaker.webp"
          srcSet="/images/speaker-480.webp 480w, /images/speaker.webp 815w"
          sizes="(min-width: 1024px) 53vw, 100vw"
          decoding="async"
          alt={t.hero.speaker}
          width={764}
          height={960}
          loading="lazy"
          className="block aspect-[764/960] w-full object-cover lg:h-[960px] lg:[aspect-ratio:auto]"
        />
        <div className="min-w-0 px-5 py-12 sm:px-10 lg:px-0 lg:py-0 lg:pt-[96px] lg:pl-[min(68px,4.72vw)]">
          <p className="grid h-[48px] w-fit place-items-center rounded-full border-[1.5px] border-wine-text px-[30px] text-[17px] font-medium tracking-[0.2em] text-wine-text uppercase lg:text-[19px]">
            {t.speaker.label}
          </p>
          <h2 className="mt-6 font-display text-[clamp(38px,12.5vw,52px)] leading-[1.05] font-medium tracking-[-0.01em] text-ink sm:text-[72px] lg:mt-[24px] lg:text-[clamp(60px,6.53vw,94px)] lg:leading-none">
            {t.speaker.name[0]}
            <br />
            {t.speaker.name[1]}
          </h2>
          <ul className="mt-8 flex flex-col gap-[22px] lg:mt-[54px]">
            {t.speaker.points.map((p) => (
              <li key={p} className="flex min-h-[50px] items-center gap-6 text-[19px] leading-[1.3] text-[#292929] sm:text-[20px] lg:gap-[34px] lg:text-[clamp(20px,2.01vw,29px)]">
                <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-[#8a1820] text-white lg:size-[50px]">
                  <Check size={26} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex items-center gap-6 lg:mt-[90px] lg:gap-[min(61px,4.2vw)]">
            <span aria-hidden className="h-[2px] w-16 shrink-0 bg-[#a3515f] sm:w-24 lg:w-[min(193px,13.4vw)]" />
            <p className="min-w-0 text-[12px] leading-[25px] tracking-[0.25em] text-[#767676] uppercase sm:text-[13px] sm:tracking-[0.3em] lg:text-[clamp(13px,1.25vw,18px)]">
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

export function Program({ onReserve }: { onReserve: () => void }) {
  const { t } = useLang()
  const icons = [BookOpen, Syringe, Coffee]
  const photos = ['/images/program-theory.webp', '/images/program-practice.webp', '/images/program-break.webp']
  return (
    <section id="program" className="bg-[#fcfcfc] px-4 py-14 sm:px-6 lg:h-[838px] lg:px-0 lg:pt-[33px] lg:pb-0">
      <div className="mx-auto max-w-[1332px] text-center">
        <TopRule width={88} />
        <h2 className="mt-5 font-serif text-[42px] leading-none text-[#342a28] sm:text-[56px] lg:mt-[11px] lg:text-[66px]">
          {t.program.title}
        </h2>
        <p className="mt-4 text-[16px] tracking-[0.12em] text-[#494949] sm:text-[19px] lg:mt-[22px] lg:text-[21px] lg:tracking-[0.18em]">
          {t.program.lead}
        </p>

        <ul className="mt-10 grid gap-[27px] text-left md:grid-cols-2 lg:mt-[27px] lg:grid-cols-3">
          {t.program.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <li key={item.title} className="card-shadow lift overflow-hidden rounded-[10px] border-t-[10px] border-wine-deep bg-[#fafafa] lg:h-[488px]">
                <img src={photos[i]} alt="" width={426} height={193} loading="lazy" className="block aspect-[426/193] w-full object-cover" />
                <div className="px-6 pt-[23px] pb-8 sm:px-8">
                  <div className="flex items-center gap-5 xl:gap-[34px]">
                    <span className="grid size-[72px] shrink-0 place-items-center rounded-full bg-[#f6eeee] text-wine-text xl:size-[87px]">
                      <Icon size={50} strokeWidth={1.3} className="size-[42px] xl:size-[50px]" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-[26px] leading-[34px] font-bold tracking-[0.01em] text-[#302825] uppercase xl:text-[32px]">
                        {item.title}
                      </h3>
                      <p className="mt-[4px] text-[19px] leading-7 text-[#6b6b6b] lg:text-[21px]">{item.duration}</p>
                    </div>
                  </div>
                  <hr className="mt-[18px] border-[#eaeaea]" />
                  <ul className="mt-[21px] flex flex-col gap-[12px]">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-center gap-[13px] text-[19px] leading-7 text-[#3b3b3a] lg:text-[21px]">
                        <span aria-hidden className="ml-[10px] size-2 shrink-0 rounded-full bg-wine-deep" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={onReserve}
          className="btn mt-10 h-[64px] w-full max-w-[425px] rounded-full bg-wine-alt text-[20px] text-white lg:mt-[45px] lg:h-[76px] lg:text-[24px]"
        >
          {t.claim}
        </button>
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

export function CtaBand({ onReserve }: { onReserve: () => void }) {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden bg-[#fdfdfd] px-4 py-14 sm:px-6 lg:h-[363px] lg:px-0 lg:py-0">
      <img src="/images/cta-left.webp" alt="" aria-hidden width={367} height={363} loading="lazy" className="fade-x-r pointer-events-none absolute top-0 left-0 hidden h-[363px] w-[367px] lg:block" />
      <img src="/images/cta-right.webp" alt="" aria-hidden width={365} height={363} loading="lazy" className="fade-x-l pointer-events-none absolute top-0 right-0 hidden h-[363px] w-[365px] lg:block" />
      <div className="relative mx-auto flex max-w-[700px] flex-col items-center text-center lg:pt-[25px]">
        <h2 className="max-w-[500px] font-display text-[40px] leading-[1.05] text-[#6e0d1d] sm:text-[50px] lg:text-[56px] lg:leading-[58px]">
          {t.cta.title}
        </h2>
        <p className="mt-4 font-display text-[18px] leading-7 text-[#1a191e] lg:mt-[26px] lg:text-[24px]">{t.cta.lead}</p>
        <button
          type="button"
          onClick={onReserve}
          className="btn mt-6 inline-flex h-[60px] w-full max-w-[418px] items-center justify-center gap-[30px] rounded-[8px] bg-wine-deep font-display text-[22px] text-white shadow-[0_10px_24px_-14px_rgba(110,18,30,0.7)] lg:mt-[30px] lg:h-[66px] lg:text-[24px]"
        >
          {t.register}
          <ArrowRight size={28} strokeWidth={1.4} />
        </button>
        <p className="mt-3 font-display text-[15px] text-[#222] lg:mt-[16px] lg:text-[16px]">{t.cta.note}</p>
      </div>
    </section>
  )
}
