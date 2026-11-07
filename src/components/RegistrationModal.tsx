import { ArrowRight, Building, Mail, Phone, UserRound, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { CONTACT_EMAIL, FORM_ENDPOINT } from '../config'
import { useLang } from '../i18n/LanguageContext'

type Fields = { name: string; phone: string; email: string; clinic: string }
const empty: Fields = { name: '', phone: '', email: '', clinic: '' }

export function RegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()
  const [values, setValues] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    dialogRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    ;(['name', 'phone', 'email'] as const).forEach((k) => {
      if (!values[k].trim()) next[k] = t.form.required
    })
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = t.form.required
    setErrors(next)
    if (Object.keys(next).length) return

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(String(res.status))
        setFailed(false)
        setSent(true)
      } catch {
        setFailed(true)
      }
      return
    }

    const body = `Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\nClinic: ${values.clinic}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Seminar registration')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const fields = [
    { key: 'name', label: t.form.name, type: 'text', auto: 'name', Icon: UserRound },
    { key: 'phone', label: t.form.phone, type: 'tel', auto: 'tel', Icon: Phone },
    { key: 'email', label: t.form.email, type: 'email', auto: 'email', Icon: Mail },
    { key: 'clinic', label: t.form.clinic, type: 'text', auto: 'organization', Icon: Building },
  ] as const

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-[#2b2522] bg-[url('/images/modal-bg.webp')] bg-cover bg-center p-3 sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reg-title"
        className="relative outline-none w-full max-w-[743px] rounded-[13px] bg-white px-5 pt-14 pb-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] sm:px-[69px] sm:pt-[78px] sm:pb-[48px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.form.close}
          className="absolute top-[14px] right-[14px] grid size-11 place-items-center rounded-full text-wine-text hover:bg-wine-soft sm:top-[14px] sm:right-[13px]"
        >
          <X size={40} strokeWidth={2} />
        </button>
        <h2 id="reg-title" className="text-center font-serif text-[32px] leading-[1.1] text-wine-text sm:-mx-6 sm:text-[49px] sm:leading-[60px]">
          {t.form.title}
        </h2>

        {sent ? (
          <p role="status" className="mt-8 rounded-lg bg-wine-soft p-4 text-center text-base text-wine-text">
            {t.form.sent}
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="mt-8 flex flex-col sm:mt-[45px]">
            <div className="flex flex-col gap-[15px]">
              {fields.map(({ key, label, type, auto, Icon }) => (
                <div key={key}>
                  <label className="relative block">
                    <span className="sr-only">{label}</span>
                    <Icon size={27} strokeWidth={1.4} className="pointer-events-none absolute top-1/2 left-[28px] -translate-y-1/2 text-[#555]" />
                    <input
                      type={type}
                      autoComplete={auto}
                      placeholder={label}
                      value={values[key]}
                      onChange={set(key)}
                      aria-invalid={!!errors[key]}
                      className="h-[64px] w-full rounded-[9px] border-[1.5px] border-[#e1e1e1] bg-[#fafafa] pr-4 pl-[88px] text-[19px] text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#787878] focus:border-wine-text focus:ring-2 focus:ring-wine-text/15 sm:h-[75px] sm:text-[21px] aria-[invalid=true]:border-red-700"
                    />
                  </label>
                  {errors[key] && <span className="mt-1 block pl-2 text-sm text-red-700">{errors[key]}</span>}
                </div>
              ))}
            </div>
            {failed && <p role="alert" className="mt-4 text-sm text-red-700">Error. Please try again.</p>}
            <button
              type="submit"
              className="btn relative mt-8 h-[68px] rounded-[9px] bg-[linear-gradient(90deg,#86202b,#6c1520)] font-serif text-[26px] text-white shadow-[0_10px_24px_-14px_rgba(110,18,30,0.8)] sm:mt-[39px] sm:h-[81px] sm:text-[30px]"
            >
              {t.register}
              <ArrowRight size={30} strokeWidth={1.5} className="absolute top-1/2 right-[40px] -translate-y-1/2" />
            </button>
            <p className="mt-6 text-center text-[17px] text-[#575555] sm:mt-[27px] sm:text-[20px]">{t.form.note}</p>
          </form>
        )}
      </div>
    </div>
  )
}
