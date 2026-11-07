import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size: number, strokeWidth: number | string | undefined, rest: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: strokeWidth ?? 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...rest,
})

/** Landscape certificate with a rosette, as drawn in the design. */
export function CertificateIcon({ size = 24, strokeWidth, ...rest }: P) {
  return (
    <svg {...base(size, strokeWidth, rest)}>
      <path d="M14 17H4.5A1.5 1.5 0 0 1 3 15.5v-10A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5V12" />
      <path d="M6.5 8h7M6.5 11h4" />
      <circle cx="17.5" cy="14.5" r="2.6" />
      <path d="m16 16.7-.8 3.8 2.3-1.2 2.3 1.2-.8-3.8" />
    </svg>
  )
}

/** Female doctor bust with stethoscope. */
export function DoctorIcon({ size = 24, strokeWidth, ...rest }: P) {
  return (
    <svg {...base(size, strokeWidth, rest)}>
      <path d="M8.2 9.6V7.8a3.8 3.8 0 0 1 7.6 0v1.8c0 1.6.4 2.6 1.2 3.4-1 .5-2.2.6-3.2.4" />
      <path d="M8.2 9.6c0 1.6-.4 2.6-1.2 3.4 1 .5 2.2.6 3.2.4" />
      <path d="M9.4 8.6a2.6 2.6 0 0 0 5.2 0" />
      <path d="M4 22v-1.6c0-2.6 2-4.4 4.6-4.9L12 19l3.4-3.5c2.6.5 4.6 2.3 4.6 4.9V22" />
      <path d="M8.6 15.5v2.7a1.3 1.3 0 1 0 0 .1M15.4 15.5v2.2a1.6 1.6 0 0 1-1.6 1.6" />
    </svg>
  )
}

/** Three people, the centre one in front. */
export function GroupIcon({ size = 24, strokeWidth, ...rest }: P) {
  return (
    <svg {...base(size, strokeWidth, rest)}>
      <circle cx="12" cy="7.2" r="2.7" />
      <path d="M6.6 19v-.8a5.4 5.4 0 0 1 10.8 0v.8" />
      <circle cx="5.2" cy="9.4" r="2" />
      <path d="M1.5 18.2v-.5a3.8 3.8 0 0 1 5.2-3.5" />
      <circle cx="18.8" cy="9.4" r="2" />
      <path d="M22.5 18.2v-.5a3.8 3.8 0 0 0-5.2-3.5" />
    </svg>
  )
}

export function InstagramIcon({ size = 18, ...rest }: P) {
  return (
    <svg {...base(size, 1.8, rest)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsAppIcon({ size = 20, ...rest }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.46 15.04L2 22l5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.97-.4-4.25-1.17l-.3-.18-3.03.8.81-2.95-.2-.31A8.1 8.1 0 1 1 12.04 20.1Zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}

export function FacebookIcon({ size = 18, ...rest }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" />
    </svg>
  )
}
