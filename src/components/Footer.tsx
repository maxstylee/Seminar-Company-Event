import { Mail, MapPin, PhoneCall } from 'lucide-react'
import { CONTACT_EMAIL, CONTACT_PHONE } from '../config'
import { useLang } from '../i18n/LanguageContext'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons'

const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.replace(/\D/g, '')}`

// full-color brand logos (Icons.tsx), as in the reference. Each logo fills its whole tap target (44px, 39px on lg), no ring.
// Hover / keyboard focus: lift + slight scale + a glow in the brand's own color (`glow`); press scales down.
const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/derma_series_georgia/', Icon: InstagramIcon, glow: 'hover:drop-shadow-[0_6px_14px_rgb(214_36_159/0.55)] focus-visible:drop-shadow-[0_6px_14px_rgb(214_36_159/0.55)]' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61559038259266', Icon: FacebookIcon, glow: 'hover:drop-shadow-[0_6px_14px_rgb(8_102_255/0.55)] focus-visible:drop-shadow-[0_6px_14px_rgb(8_102_255/0.55)]' },
  { label: 'WhatsApp', href: WHATSAPP_URL, Icon: WhatsAppIcon, glow: 'hover:drop-shadow-[0_6px_14px_rgb(37_211_102/0.5)] focus-visible:drop-shadow-[0_6px_14px_rgb(37_211_102/0.5)]' },
]

export function Footer() {
  const { t } = useLang()
  return (
    <footer id="contacts" data-lang-fade className="bg-night px-5 py-10 font-display text-[#dcdcdc] lg:h-[213px] lg:px-0 lg:py-0">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-3 md:gap-6 lg:grid-cols-[34.51%_32.78%_minmax(0,1fr)] lg:gap-0">
        <div className="flex flex-col items-center md:items-start lg:pt-[36px] lg:pl-[min(134px,9.3vw)]">
          <img src="/images/logo-ds.png" alt="Professional derma series" width={184} height={220} loading="lazy" className="h-[104px] w-auto" />
          <p className="mt-[14px] text-[12px] tracking-[0.25em] text-[#d8d8d8] uppercase">{t.footer.tag}</p>
        </div>

        <ul className="flex flex-col items-center gap-[13px] text-[17px] md:items-start lg:mt-[51px] lg:h-[112px] lg:justify-center lg:border-x lg:border-[#5e5e5e] lg:pb-[10px] lg:pl-[min(97px,6.7vw)]">
          <li className="flex min-h-[28px] items-center gap-[16px]">
            <MapPin size={20} className="shrink-0 text-[#b5b5b5]" fill="currentColor" stroke="#2b2b2b" />
            {t.footer.place}
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex min-h-[28px] items-center gap-[16px] underline-offset-4 hover:underline">
              <Mail size={20} className="shrink-0 text-[#b5b5b5]" />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${CONTACT_PHONE} (${t.a11y.newTab})`}
              className="flex min-h-[28px] items-center gap-[16px] underline-offset-4 hover:underline"
            >
              <PhoneCall size={20} className="shrink-0 text-[#b5b5b5]" />
              {CONTACT_PHONE}
            </a>
          </li>
        </ul>

        <div className="flex flex-col items-center lg:pt-[34px] lg:pr-[20px]">
          <a href="#" className="flex min-h-[34px] items-center text-[17px] underline-offset-4 hover:underline">
            {t.footer.impressum}
          </a>
          <a href="#" className="flex min-h-[34px] items-center text-[17px] underline-offset-4 hover:underline">
            {t.footer.privacy}
          </a>
          <ul className="mt-[18px] flex gap-[16px]">
            {socials.map(({ label, href, Icon, glow }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (${t.a11y.newTab})`}
                  className={`block size-[44px] rounded-full transition-[transform,filter] duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 focus-visible:-translate-y-0.5 focus-visible:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:translate-y-0 active:scale-95 active:duration-75 motion-reduce:transform-none lg:size-[39px] ${glow}`}
                >
                  <Icon className="size-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
