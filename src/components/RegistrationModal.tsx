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
        className="relative outline-none w-full max-w-[640px] rounded-[13px] bg-white px-5 pt-14 pb-7 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] sm:px-14 sm:pt-14 sm:pb-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.form.close}
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-full text-wine-text transition-colors hover:bg-wine-soft"
        >
          <X size={30} strokeWidth={2} />
        </button>
        <h2 id="reg-title" className="text-center font-serif text-[30px] leading-[1.15] text-wine-text sm:text-[40px] sm:leading-[48px]">
          {t.form.title}
        </h2>

        {sent ? (
          <p role="status" className="mt-8 rounded-lg bg-wine-soft p-4 text-center text-base text-wine-text">
            {t.form.sent}
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6 flex flex-col sm:mt-7">
            <div className="flex flex-col gap-3">
              {fields.map(({ key, label, type, auto, Icon }) => (
                <div key={key}>
                  <label className="relative block">
                    <span className="sr-only">{label}</span>
                    <Icon size={22} strokeWidth={1.5} className="pointer-events-none absolute top-1/2 left-[22px] -translate-y-1/2 text-[#555]" />
                    <input
                      type={type}
                      autoComplete={auto}
                      placeholder={label}
                      value={values[key]}
                      onChange={set(key)}
                      aria-invalid={!!errors[key]}
                      className="h-14 w-full rounded-[9px] border-[1.5px] border-[#e1e1e1] bg-[#fafafa] pr-4 pl-[62px] text-[17px] text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#787878] focus:border-wine-text focus:ring-2 focus:ring-wine-text/15 sm:h-[58px] sm:text-[18px] aria-[invalid=true]:border-red-700"
                    />
                  </label>
                  {errors[key] && <span className="mt-1 block pl-2 text-sm text-red-700">{errors[key]}</span>}
                </div>
              ))}
            </div>
            {failed && <p role="alert" className="mt-4 text-sm text-red-700">Error. Please try again.</p>}
            <button
              type="submit"
              className="btn relative mt-6 h-[60px] rounded-[9px] bg-[linear-gradient(90deg,#86202b,#6c1520)] font-serif text-[22px] text-white shadow-[0_10px_24px_-14px_rgba(110,18,30,0.8)] sm:mt-6 sm:h-16 sm:text-[24px]"
            >
              {t.register}
              <ArrowRight size={26} strokeWidth={1.5} className="absolute top-1/2 right-8 -translate-y-1/2" />
            </button>
            <p className="mt-4 text-center text-[15px] text-[#575555] sm:mt-5 sm:text-[17px]">{t.form.note}</p>
          </form>
        )}
      </div>
    </div>
  )
}
