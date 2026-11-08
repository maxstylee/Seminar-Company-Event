import { ArrowRight, Check, ChevronDown, CircleCheck, LoaderCircle, UsersRound } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { CONTACT_EMAIL, FORM_ENDPOINT } from '../config'
import type { Content } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'

type Spoken = 'ka' | 'ru' | 'en'
const SPOKEN: Spoken[] = ['ka', 'ru', 'en']

interface Values {
  firstName: string
  lastName: string
  phone: string
  profession: string
  /** index into form.experienceOptions, '' when nothing is chosen */
  experience: string
}
type Checked = 'firstName' | 'lastName' | 'phone' | 'languages'
type ErrorKey = keyof Content['form']['errors']
type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'failed'

/** Fields in the order they appear, so a failed submit focuses the first one that needs fixing. */
const ORDER: Checked[] = ['firstName', 'lastName', 'phone', 'languages']
const ALL_TOUCHED: Record<Checked, boolean> = { firstName: true, lastName: true, phone: true, languages: true }

// The form asks for names in English or Russian letters: Latin or Cyrillic, plus spaces, hyphens, apostrophes and dots.
const NAME_RE = /^[\p{Script=Latin}\p{Script=Cyrillic}][\p{Script=Latin}\p{Script=Cyrillic} '’.-]*$/u

/** Georgian mobile (5xx xx xx xx) or any international number (+995 5xx xx xx xx, 00…). */
function isPhone(raw: string): boolean {
  const v = raw.replace(/[\s()-]/g, '')
  return /^5\d{8}$/.test(v) || /^(\+|00)\d{8,15}$/.test(v)
}

function validate(v: Values, languages: Spoken[]): Partial<Record<Checked, ErrorKey>> {
  const e: Partial<Record<Checked, ErrorKey>> = {}
  for (const k of ['firstName', 'lastName'] as const) {
    const s = v[k].trim()
    if (!s) e[k] = 'required'
    else if (!NAME_RE.test(s)) e[k] = 'letters'
  }
  if (!v.phone.trim()) e.phone = 'required'
  else if (!isPhone(v.phone)) e.phone = 'phone'
  if (!languages.length) e.languages = 'languages'
  return e
}

const inputCls =
  'h-12 w-full rounded-[10px] border-[1.5px] border-[#e3dede] bg-white px-4 text-[16px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a19a9a] hover:border-[#cdc3c3] focus:border-wine-text focus:ring-[3px] focus:ring-wine-text/12 aria-[invalid=true]:border-red-700 aria-[invalid=true]:ring-red-700/10'

/** One cell of the form grid: label row, control row, message row. The subgrid lines the rows up across the columns,
 *  so inputs stay aligned even when one label wraps to two lines. */
function Cell({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`row-span-3 grid grid-rows-subgrid ${className}`}>{children}</div>
}

/** A `<label>` for a single control, or a plain text label (with an id for aria-labelledby) for a group. */
function Label({ htmlFor, id, text, required, optional }: { htmlFor?: string; id?: string; text: string; required?: boolean; optional?: string }) {
  const cls = 'self-end pb-2 text-[15px] leading-[1.3] font-semibold text-ink'
  const inner = (
    <>
      {text}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-wine">
          {' '}*
        </span>
      )}
      {optional && <span className="font-normal text-muted"> {optional}</span>}
    </>
  )
  return htmlFor ? (
    <label htmlFor={htmlFor} className={cls}>
      {inner}
    </label>
  ) : (
    <p id={id} className={cls}>
      {inner}
    </p>
  )
}

function Message({ id, error, hint }: { id?: string; error?: string; hint?: string }) {
  return (
    <p id={id} className={`pt-1.5 pb-4 text-[13px] leading-[1.35] ${error ? 'text-red-700' : 'text-muted'}`}>
      {error ?? hint}
    </p>
  )
}

export function RegistrationSection() {
  const { t, lang } = useLang()
  const f = t.form
  const [values, setValues] = useState<Values>({ firstName: '', lastName: '', phone: '', profession: '', experience: '' })
  const [languages, setLanguages] = useState<Spoken[]>(['ka'])
  const [touched, setTouched] = useState<Partial<Record<Checked, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')

  // errors are derived from the values; a field shows its error once it has been left (blur) or the form was submitted
  const errors = validate(values, languages)
  const shown = (k: Checked) => (touched[k] && errors[k] ? f.errors[errors[k]] : undefined)

  const set = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const touch = (k: Checked) => () => setTouched((s) => ({ ...s, [k]: true }))
  const toggle = (l: Spoken) => {
    setLanguages((cur) => (cur.includes(l) ? cur.filter((x) => x !== l) : SPOKEN.filter((x) => x === l || cur.includes(x))))
    setTouched((s) => ({ ...s, languages: true }))
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setTouched(ALL_TOUCHED)
    const firstInvalid = ORDER.find((k) => errors[k])
    if (firstInvalid) {
      document.getElementById(firstInvalid === 'languages' ? 'reg-lang-ka' : `reg-${firstInvalid}`)?.focus()
      return
    }

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone: values.phone.trim(),
      profession: values.profession.trim(),
      experience: values.experience ? f.experienceOptions[Number(values.experience)] : '',
      languages: languages.map((l) => f.languageOptions[l]),
      siteLanguage: lang,
    }

    if (FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus('sent')
      } catch {
        setStatus('failed')
      }
      return
    }

    // no endpoint configured: open a prefilled email instead
    const body = [
      `${f.firstName}: ${payload.firstName}`,
      `${f.lastName}: ${payload.lastName}`,
      `${f.phone}: ${payload.phone}`,
      `${f.profession}: ${payload.profession || '-'}`,
      `${f.experience}: ${payload.experience || '-'}`,
      `${f.languages}: ${payload.languages.join(', ')}`,
    ].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(f.title)}&body=${encodeURIComponent(body)}`
    setStatus('mail')
  }

  const done = status === 'sent' || status === 'mail'

  return (
    <section id="register" aria-labelledby="register-title" className="relative overflow-hidden bg-[#fdfdfd] px-4 pt-14 pb-16 sm:px-6 lg:px-8 lg:pt-[40px] lg:pb-[80px]">
      <img src="/images/cta-left.webp" alt="" aria-hidden width={367} height={363} loading="lazy" className="fade-x-r pointer-events-none absolute top-0 left-0 hidden h-[363px] w-[367px] xl:block" />
      <img src="/images/cta-right.webp" alt="" aria-hidden width={365} height={363} loading="lazy" className="fade-x-l pointer-events-none absolute top-0 right-0 hidden h-[363px] w-[365px] xl:block" />

      <div className="relative mx-auto max-w-[1080px]">
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <h2 id="register-title" className="max-w-[560px] font-display text-[38px] leading-[1.05] text-[#6e0d1d] sm:text-[50px] lg:text-[56px] lg:leading-[58px]">
            {t.cta.title}
          </h2>
          <p className="mt-4 font-display text-[18px] leading-7 text-[#1a191e] lg:mt-[20px] lg:text-[22px]">{t.cta.lead}</p>
        </div>

        <div className="mt-8 rounded-[20px] border border-[#ece6e6] bg-white p-4 shadow-[0_28px_60px_-30px_rgba(70,20,30,0.3),0_2px_6px_rgba(30,20,20,0.04)] sm:p-7 lg:mt-10 lg:p-8">
          <h3 className="text-[20px] leading-tight font-bold text-ink sm:text-[22px]">{f.title}</h3>
          <p className="mt-1.5 text-[14px] leading-[1.45] text-muted">{f.hint}</p>

          {done ? (
            <div role="status" className="mt-6 flex items-start gap-3 rounded-[12px] bg-wine-soft p-5 text-[16px] leading-[1.5] text-wine-text">
              <CircleCheck size={24} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
              {status === 'sent' ? f.sent : f.sentMail}
            </div>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              className="mt-5 grid grid-cols-2 gap-x-3 sm:gap-x-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-x-5"
            >
              <Cell>
                <Label htmlFor="reg-firstName" text={f.firstName} required />
                <input
                  id="reg-firstName"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={values.firstName}
                  onChange={set('firstName')}
                  onBlur={touch('firstName')}
                  aria-invalid={!!shown('firstName')}
                  aria-describedby="reg-firstName-msg"
                  className={`${inputCls} text-ink`}
                />
                <Message id="reg-firstName-msg" error={shown('firstName')} />
              </Cell>

              <Cell>
                <Label htmlFor="reg-lastName" text={f.lastName} required />
                <input
                  id="reg-lastName"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  value={values.lastName}
                  onChange={set('lastName')}
                  onBlur={touch('lastName')}
                  aria-invalid={!!shown('lastName')}
                  aria-describedby="reg-lastName-msg"
                  className={`${inputCls} text-ink`}
                />
                <Message id="reg-lastName-msg" error={shown('lastName')} />
              </Cell>

              <Cell className="col-span-2 lg:col-span-1">
                <Label htmlFor="reg-phone" text={f.phone} required />
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder={f.phonePlaceholder}
                  value={values.phone}
                  onChange={set('phone')}
                  onBlur={touch('phone')}
                  aria-invalid={!!shown('phone')}
                  aria-describedby="reg-phone-msg"
                  className={`${inputCls} text-ink`}
                />
                <Message id="reg-phone-msg" error={shown('phone')} hint={f.phoneHint} />
              </Cell>

              <Cell>
                <Label htmlFor="reg-profession" text={f.profession} optional={f.optional} />
                <input
                  id="reg-profession"
                  name="profession"
                  autoComplete="organization-title"
                  maxLength={100}
                  value={values.profession}
                  onChange={set('profession')}
                  className={`${inputCls} text-ink`}
                />
                <Message />
              </Cell>

              <Cell>
                <Label htmlFor="reg-experience" text={f.experience} optional={f.optional} />
                <div className="relative self-start">
                  <select
                    id="reg-experience"
                    name="experience"
                    value={values.experience}
                    onChange={set('experience')}
                    className={`${inputCls} appearance-none pr-11 ${values.experience ? 'text-ink' : 'text-[#8d8686]'}`}
                  >
                    <option value="">{f.select}</option>
                    {f.experienceOptions.map((o, i) => (
                      <option key={o} value={String(i)} className="text-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={20} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink" />
                </div>
                <Message />
              </Cell>

              <Cell className="col-span-2 lg:col-span-1">
                <Label id="reg-languages-label" text={f.languages} required />
                <div role="group" aria-labelledby="reg-languages-label" aria-describedby="reg-languages-msg" className="flex flex-wrap items-center gap-1.5 self-start sm:gap-2">
                  {SPOKEN.map((l) => {
                    const on = languages.includes(l)
                    return (
                      <label key={l}>
                        <input id={`reg-lang-${l}`} type="checkbox" checked={on} onChange={() => toggle(l)} className="peer sr-only" />
                        <span
                          className={`flex h-11 items-center gap-1 rounded-full border-[1.5px] px-2.5 text-[14px] font-medium sm:h-12 sm:gap-1.5 sm:px-4 sm:text-[15px] sm:font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 select-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-wine-text/30 ${
                            on
                              ? 'border-transparent bg-[linear-gradient(180deg,#ab2a40_0%,#8a0e26_100%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_6px_14px_-8px_rgb(138_14_38/0.7)]'
                              : 'border-[#e3dede] bg-white text-ink hover:border-wine-text/40 hover:text-wine'
                          }`}
                        >
                          {on && <Check size={15} strokeWidth={2.6} aria-hidden="true" />}
                          {f.languageOptions[l]}
                        </span>
                      </label>
                    )
                  })}
                </div>
                <Message id="reg-languages-msg" error={shown('languages')} />
              </Cell>

              {status === 'failed' && (
                <p role="alert" className="col-span-full mb-3 rounded-[10px] bg-red-50 px-4 py-3 text-[14px] text-red-800">
                  {f.failed}
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-3d col-span-full mt-1 h-14 text-[18px] lg:h-[60px] lg:text-[20px]">
                {status === 'sending' ? (
                  <>
                    <LoaderCircle size={22} className="animate-spin" aria-hidden="true" />
                    {f.sending}
                  </>
                ) : (
                  <>
                    {t.register}
                    <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="mt-5 flex items-center gap-3 px-1 text-[16px] text-body lg:text-[17px]">
          <UsersRound size={24} strokeWidth={1.6} className="shrink-0 text-wine" aria-hidden="true" />
          {t.cta.note}
        </p>
      </div>
    </section>
  )
}
