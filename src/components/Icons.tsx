import { useId, type SVGProps } from 'react'

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

/*
 * Full-color brand logos (as in the reference): each one paints its own brand colors, so they ignore `currentColor`.
 * Paths follow the official marks (Simple Icons geometry), drawn on a 24×24 grid.
 */
type LogoProps = Omit<P, 'strokeWidth'>
const logo = (size: number, rest: SVGProps<SVGSVGElement>) => ({ width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, ...rest })

/** Green speech bubble with a white handset. */
export function WhatsAppIcon({ size = 22, ...rest }: LogoProps) {
  return (
    <svg {...logo(size, rest)}>
      <path
        fill="#25d366"
        d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 12.05 0Z"
      />
      <path
        fill="#fff"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"
      />
    </svg>
  )
}

/** Rounded square in Instagram's radial gradient with the white camera outline. */
export function InstagramIcon({ size = 22, ...rest }: LogoProps) {
  const id = `ig-${useId().replace(/:/g, '')}`
  return (
    <svg {...logo(size, rest)}>
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.5">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      <rect x="0.5" y="0.5" width="23" height="23" rx="6.5" fill={`url(#${id})`} />
      <g fill="none" stroke="#fff" strokeWidth="1.9">
        <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4" />
        <circle cx="12" cy="12" r="3.3" />
      </g>
      <circle cx="16.15" cy="7.85" r="1.05" fill="#fff" />
    </svg>
  )
}

/** Blue circle with the white "f" running off its bottom edge. */
export function FacebookIcon({ size = 22, ...rest }: LogoProps) {
  return (
    <svg {...logo(size, rest)}>
      <circle cx="12" cy="12.044" r="12" fill="#0866ff" />
      <path
        fill="#fff"
        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245A12 12 0 0 1 9.101 23.691Z"
      />
    </svg>
  )
}
