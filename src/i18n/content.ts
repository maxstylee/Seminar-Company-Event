export type Lang = 'ru' | 'en' | 'ka'
/** Order of the header language switch (RU · KA · EN). */
export const LANGS: Lang[] = ['ru', 'ka', 'en']

/** One timed block of the seminar program. A block with no groups (the break) renders as a compact row. */
interface ProgramItem {
  title: string
  duration: string
  groups: { title: string; points: string[] }[]
  note?: string
}

export interface Content {
  /** Browser tab title */
  pageTitle: string
  nav: { about: string; speaker: string; program: string; audience: string; brand: string; contacts: string }
  register: string
  reserve: string
  claim: string
  hero: {
    eyebrow: string
    title: [string, string]
    tag: string
    lead: string
    speaker: string
    date: string
    city: string
    duration: string
    facts: [string, string, string]
  }
  benefits: { eyebrow: string; title: string; lead: string; items: { title: string; text: string }[] }
  speaker: {
    label: string
    name: [string, string]
    roles: string[]
    /** the three count-up cards: final value (a "+" is appended) and the label under it.
     *  A label may carry soft hyphens (­): invisible, they mark where a long word may break in a narrow card. */
    stats: { value: number; label: string }[]
    points: string[]
  }
  program: {
    title: string
    duration: string
    speaker: string
    outro: string
    items: ProgramItem[]
  }
  audience: { title: [string, string]; items: { title: string; text: string }[] }
  brands: {
    title: string
    tagline: string
    organizer: string
    organizerText: string
    partner: string
    partnerText: string
    values: [string, string, string, string]
  }
  cta: { title: string; lead: string; note: string }
  footer: { place: string; tag: string; impressum: string; privacy: string }
  /** screen-reader-only labels (aria-label / skip link) */
  a11y: { skip: string; mainNav: string; mobileNav: string; menu: string; language: string; newTab: string; toTop: string }
  form: {
    title: string
    hint: string
    firstName: string
    lastName: string
    phone: string
    phonePlaceholder: string
    phoneHint: string
    profession: string
    experience: string
    optional: string
    select: string
    experienceOptions: [string, string, string, string, string]
    languages: string
    languageOptions: { ka: string; ru: string; en: string }
    sending: string
    /** shown after a successful POST to FORM_ENDPOINT */
    sent: string
    /** shown when no endpoint is set and the form opened a prefilled email */
    sentMail: string
    failed: string
    errors: { required: string; letters: string; phone: string; languages: string }
  }
}

export const content: Record<Lang, Content> = {
  ru: {
    pageTitle: 'Фракционная мезотерапия · Professional derma series',
    nav: { about: 'О семинаре', speaker: 'Спикер', program: 'Программа', audience: 'Для кого', brand: 'Бренд', contacts: 'Контакты' },
    register: 'Зарегистрироваться',
    reserve: 'Забронировать место',
    claim: 'Забрать своё место',
    hero: {
      eyebrow: 'Научный семинар',
      title: ['Фракционная', 'мезотерапия'],
      tag: 'Микронидлинг',
      lead: 'Научные основы и современные комбинированные протоколы',
      speaker: 'Д-р Кетеван Паксашвили',
      date: '26 ноября 2026',
      city: 'Тбилиси, Грузия',
      duration: '4 часа',
      facts: ['Доказательная медицина', 'Практические протоколы', 'Ограниченное количество мест'],
    },
    benefits: {
      eyebrow: 'Инвестиция в ваш рост',
      title: 'Что вы получите',
      lead: 'Практичные знания, которые вы сможете применять в своей работе уже на следующий день',
      items: [
        { title: 'Сертификат участника', text: 'Официальный сертификат, подтверждающий ваше участие в семинаре.' },
        { title: 'Новые протоколы', text: 'Актуальные авторские протоколы процедур с разбором показаний, противопоказаний и особенностей применения.' },
        { title: 'Практические знания', text: 'Демонстрации на моделях, разбор клинических случаев и ответы на ваши вопросы от экспертов.' },
        { title: 'Нетворкинг', text: 'Общение с коллегами, экспертами отрасли и новые профессиональные возможности.' },
      ],
    },
    speaker: {
      label: 'О спикере',
      name: ['Д-р Кетеван', 'Паксашвили'],
      roles: ['Врач-дерматовенеролог', 'Косметолог', 'Трихолог', 'Международный эксперт'],
      stats: [
        { value: 13, label: 'лет опыта' },
        { value: 500, label: 'авторских семинаров' },
        { value: 3000, label: 'обученных специалистов' },
      ],
      points: [
        '13+ лет опыта в эстетической дерматологии и профессиональной косметологии.',
        'Основатель Aesthetic medicine Clinic — клиники эстетической медицины (Украина).',
        'Основатель и руководитель KOSMETIK PROFI (Германия) — сети косметологических практик и школы профессиональной косметологии и трихологии.',
        'Международный эксперт reNeo Cosmetics, ведущий европейский тренер и соавтор профессиональных протоколов.',
        '500+ авторских семинаров и мастер-классов в более чем 10 странах Европы.',
        '3 000+ обученных врачей, косметологов и специалистов эстетической медицины.',
        'Международный спикер и автор образовательных программ в области эстетической косметологии, дерматологии и трихологии.',
      ],
    },
    program: {
      title: 'Программа семинара',
      duration: 'Продолжительность: 4 часа',
      speaker: 'Спикер: Д-р Кетеван Паксашвили',
      outro: 'От понимания клеточных механизмов до эффективных комбинированных протоколов в практике косметолога.',
      items: [
        {
          title: 'Теоретическая часть',
          duration: '2 часа',
          groups: [
            {
              title: 'Механизмы действия микронидлинга',
              points: [
                'Гистологические и физиологические реакции кожи.',
                'Клеточные механизмы регенерации, неоколлагенез и ремоделирование тканей.',
                'Показания, противопоказания и профилактика осложнений.',
              ],
            },
            {
              title: 'Современные комбинированные протоколы',
              points: [
                'Микронидлинг + химические пилинги.',
                'Микронидлинг + экзосомальная терапия.',
                'Презентация профессиональных препаратов reNeo Cosmetics.',
                'Подбор протоколов для коррекции возрастных изменений, постакне, пигментации и других эстетических проблем.',
              ],
            },
            {
              title: 'Построение эффективного курса процедур',
              points: [
                'Как правильно сочетать методики и определять последовательность процедур.',
                'Оптимальные интервалы, количество сеансов и оценка результатов.',
                'Индивидуальные курсовые программы и домашний уход.',
              ],
            },
          ],
        },
        { title: 'Перерыв', duration: '30 минут', groups: [], note: 'Кофе-брейк · Нетворкинг' },
        {
          title: 'Практическая часть',
          duration: '1,5 часа',
          groups: [
            {
              title: 'Демонстрация процедуры микронидлинга на модели',
              points: [
                'Диагностика кожи и выбор протокола.',
                'Подготовка кожи, подбор препаратов и параметров воздействия.',
                'Пошаговая демонстрация процедуры.',
                'Постпроцедурный уход и рекомендации.',
                'Ответы на вопросы участников.',
              ],
            },
          ],
        },
      ],
    },
    audience: {
      title: ['Для', 'кого'],
      items: [
        { title: 'Врачи-косметологи', text: 'Для практикующих специалистов, которые хотят быть в курсе последних достижений' },
        { title: 'Владельцы клиник', text: 'Для руководителей, которые развивают свои клиники и внедряют эффективные методы' },
        { title: 'Специалисты в эстетической медицине', text: 'Для дерматологов, пластических хирургов, трихологов' },
      ],
    },
    brands: {
      title: 'О бренде',
      tagline: 'Экспертиза · Наука · Красота · Развитие',
      organizer: 'Организатор',
      organizerText: 'Организатор профессиональных семинаров для косметологов',
      partner: 'Партнер',
      partnerText: 'Европейский бренд профессиональной косметологии, сочетающий передовые научные разработки и высокие стандарты качества',
      values: ['Профессиональное обучение', 'Научный подход', 'Высокие стандарты', 'Развитие экспертов'],
    },
    cta: {
      title: 'Готовы повысить квалификацию?',
      lead: 'Забронируйте место на эксклюзивном семинаре уже сегодня',
      note: 'Количество мест ограничено',
    },
    footer: { place: 'Москва, Россия', tag: 'Наука для здоровой кожи', impressum: 'Правовая информация', privacy: 'Конфиденциальность' },
    a11y: {
      skip: 'Перейти к содержанию',
      mainNav: 'Основное меню',
      mobileNav: 'Мобильное меню',
      menu: 'Меню',
      language: 'Язык',
      newTab: 'открывается в новой вкладке',
      toTop: 'Наверх',
    },
    form: {
      title: 'Предварительная регистрация',
      hint: 'Имя и фамилию вводите английскими или русскими буквами. Поля, отмеченные *, обязательны.',
      firstName: 'Имя',
      lastName: 'Фамилия',
      phone: 'Номер телефона',
      phonePlaceholder: '5xx xx xx xx',
      phoneHint: 'Или в международном формате, например: +995 5xx xx xx xx',
      profession: 'Профессия',
      experience: 'Опыт работы',
      optional: '(необязательно)',
      select: 'Выберите',
      experienceOptions: ['До 1 года', '1–3 года', '3–5 лет', '5–10 лет', '10+ лет'],
      languages: 'Какими языками вы владеете',
      languageOptions: { ka: 'Грузинский', ru: 'Русский', en: 'Английский' },
      sending: 'Отправка…',
      sent: 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
      sentMail: 'Письмо с заявкой открыто в вашей почте. Отправьте его, чтобы завершить регистрацию.',
      failed: 'Не удалось отправить заявку. Попробуйте ещё раз.',
      errors: {
        required: 'Заполните это поле',
        letters: 'Только английские или русские буквы',
        phone: 'Проверьте номер: 5xx xx xx xx или +995 5xx xx xx xx',
        languages: 'Выберите хотя бы один язык',
      },
    },
  },
  en: {
    pageTitle: 'Fractional mesotherapy · Professional derma series',
    nav: { about: 'About', speaker: 'Speaker', program: 'Program', audience: 'Who it is for', brand: 'Brand', contacts: 'Contacts' },
    register: 'Register',
    reserve: 'Reserve a seat',
    claim: 'Claim your seat',
    hero: {
      eyebrow: 'Scientific seminar',
      title: ['Fractional', 'mesotherapy'],
      tag: 'Microneedling',
      lead: 'The science and current combined protocols',
      speaker: 'Dr. Ketevan Paksashvili',
      date: '26 November 2026',
      city: 'Tbilisi, Georgia',
      duration: '4 hours',
      facts: ['Evidence-based medicine', 'Practical protocols', 'Limited number of seats'],
    },
    benefits: {
      eyebrow: 'An investment in your growth',
      title: 'What you get',
      lead: 'Practical knowledge you can use in your work the very next day',
      items: [
        { title: 'Certificate of attendance', text: 'An official certificate confirming your participation in the seminar.' },
        { title: 'New protocols', text: 'Current author protocols with indications, contraindications and notes on use.' },
        { title: 'Hands-on knowledge', text: 'Demonstrations on models, clinical case reviews and answers from the experts.' },
        { title: 'Networking', text: 'Time with colleagues and industry experts, and new professional opportunities.' },
      ],
    },
    speaker: {
      label: 'About the speaker',
      name: ['Dr. Ketevan', 'Paksashvili'],
      roles: ['Dermatovenerologist', 'Cosmetologist', 'Trichologist', 'International expert'],
      stats: [
        { value: 13, label: 'years of experience' },
        { value: 500, label: 'original seminars' },
        { value: 3000, label: 'specialists trained' },
      ],
      points: [
        '13+ years of experience in aesthetic dermatology and professional cosmetology.',
        'Founder of Aesthetic medicine Clinic, a clinic of aesthetic medicine (Ukraine).',
        'Founder and head of KOSMETIK PROFI (Germany), a network of cosmetology practices and a school of professional cosmetology and trichology.',
        'International expert for reNeo Cosmetics, leading European trainer and co-author of professional protocols.',
        '500+ original seminars and master classes in more than 10 European countries.',
        '3,000+ physicians, cosmetologists and aesthetic medicine specialists trained.',
        'International speaker and author of educational programs in aesthetic cosmetology, dermatology and trichology.',
      ],
    },
    program: {
      title: 'Seminar program',
      duration: 'Duration: 4 hours',
      speaker: 'Speaker: Dr. Ketevan Paksashvili',
      outro: 'From understanding cellular mechanisms to effective combined protocols in a cosmetologist’s practice.',
      items: [
        {
          title: 'Theory',
          duration: '2 hours',
          groups: [
            {
              title: 'How microneedling works',
              points: [
                'Histological and physiological skin responses.',
                'Cellular mechanisms of regeneration, neocollagenesis and tissue remodeling.',
                'Indications, contraindications and prevention of complications.',
              ],
            },
            {
              title: 'Current combined protocols',
              points: [
                'Microneedling + chemical peels.',
                'Microneedling + exosome therapy.',
                'Presentation of reNeo Cosmetics professional products.',
                'Choosing protocols for age-related changes, post-acne, pigmentation and other aesthetic concerns.',
              ],
            },
            {
              title: 'Building an effective treatment course',
              points: [
                'How to combine techniques and set the order of procedures.',
                'Optimal intervals, number of sessions and assessing results.',
                'Individual treatment programs and home care.',
              ],
            },
          ],
        },
        { title: 'Break', duration: '30 minutes', groups: [], note: 'Coffee break · Networking' },
        {
          title: 'Practice',
          duration: '1.5 hours',
          groups: [
            {
              title: 'Live microneedling demonstration on a model',
              points: [
                'Skin diagnostics and choosing the protocol.',
                'Skin preparation, choice of products and treatment parameters.',
                'Step-by-step demonstration of the procedure.',
                'Post-procedure care and recommendations.',
                'Answers to participants’ questions.',
              ],
            },
          ],
        },
      ],
    },
    audience: {
      title: ['Who it is', 'for'],
      items: [
        { title: 'Cosmetology physicians', text: 'For practising specialists who want to keep up with the latest developments' },
        { title: 'Clinic owners', text: 'For managers who grow their clinics and adopt effective methods' },
        { title: 'Aesthetic medicine specialists', text: 'For dermatologists, plastic surgeons and trichologists' },
      ],
    },
    brands: {
      title: 'About the brand',
      tagline: 'Expertise · Science · Beauty · Growth',
      organizer: 'Organizer',
      organizerText: 'Organizer of professional seminars for cosmetologists',
      partner: 'Partner',
      partnerText: 'European brand of professional cosmetology, combining advanced scientific developments and high quality standards',
      values: ['Professional training', 'Scientific approach', 'High standards', 'Growing experts'],
    },
    cta: {
      title: 'Ready to raise your qualification?',
      lead: 'Reserve your seat at this exclusive seminar today',
      note: 'Seats are limited',
    },
    footer: { place: 'Moscow, Russia', tag: 'Science for healthy skin', impressum: 'Legal notice', privacy: 'Privacy policy' },
    a11y: {
      skip: 'Skip to content',
      mainNav: 'Main navigation',
      mobileNav: 'Mobile navigation',
      menu: 'Menu',
      language: 'Language',
      newTab: 'opens in a new tab',
      toTop: 'Back to top',
    },
    form: {
      title: 'Pre-registration',
      hint: 'Please enter your first and last name in English or Russian letters. Fields marked * are required.',
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone number',
      phonePlaceholder: '5xx xx xx xx',
      phoneHint: 'Or in international format, e.g. +995 5xx xx xx xx',
      profession: 'Profession',
      experience: 'Work experience',
      optional: '(optional)',
      select: 'Select',
      experienceOptions: ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'],
      languages: 'Which languages do you speak',
      languageOptions: { ka: 'Georgian', ru: 'Russian', en: 'English' },
      sending: 'Sending…',
      sent: 'Thank you! Your registration has been received. We will contact you soon.',
      sentMail: 'An email with your registration is open in your mail app. Send it to finish registering.',
      failed: 'Could not send your registration. Please try again.',
      errors: {
        required: 'Fill in this field',
        letters: 'Use English or Russian letters only',
        phone: 'Check the number: 5xx xx xx xx or +995 5xx xx xx xx',
        languages: 'Choose at least one language',
      },
    },
  },
  ka: {
    pageTitle: 'ფრაქციული მეზოთერაპია · Professional derma series',
    nav: { about: 'სემინარის შესახებ', speaker: 'სპიკერი', program: 'პროგრამა', audience: 'ვისთვის', brand: 'ბრენდი', contacts: 'კონტაქტი' },
    register: 'რეგისტრაცია',
    reserve: 'ადგილის დაჯავშნა',
    claim: 'დაიკავე ადგილი',
    hero: {
      eyebrow: 'სამეცნიერო სემინარი',
      title: ['ფრაქციული', 'მეზოთერაპია'],
      tag: 'მიკრონიდლინგი',
      lead: 'სამეცნიერო საფუძვლები და თანამედროვე კომბინირებული პროტოკოლები',
      speaker: 'დოქტ. ქეთევან ფაქსაშვილი',
      date: '26 ნოემბერი, 2026',
      city: 'თბილისი, საქართველო',
      duration: '4 საათი',
      facts: ['მტკიცებულებითი მედიცინა', 'პრაქტიკული პროტოკოლები', 'ადგილები შეზღუდულია'],
    },
    benefits: {
      eyebrow: 'ინვესტიცია თქვენს განვითარებაში',
      title: 'რას მიიღებთ',
      lead: 'პრაქტიკული ცოდნა, რომლის გამოყენებაც სამსახურში მეორე დღესვე შეგეძლებათ',
      items: [
        { title: 'მონაწილის სერტიფიკატი', text: 'ოფიციალური სერტიფიკატი, რომელიც სემინარში თქვენს მონაწილეობას ადასტურებს.' },
        { title: 'ახალი პროტოკოლები', text: 'ავტორისეული პროტოკოლები ჩვენებების, უკუჩვენებებისა და გამოყენების თავისებურებების განხილვით.' },
        { title: 'პრაქტიკული ცოდნა', text: 'დემონსტრაციები მოდელებზე, კლინიკური შემთხვევების განხილვა და ექსპერტების პასუხები.' },
        { title: 'ნეტვორქინგი', text: 'ურთიერთობა კოლეგებთან, დარგის ექსპერტებთან და ახალი პროფესიული შესაძლებლობები.' },
      ],
    },
    speaker: {
      label: 'სპიკერის შესახებ',
      name: ['დოქტ. ქეთევან', 'ფაქსაშვილი'],
      roles: ['ექიმი დერმატოვენეროლოგი', 'კოსმეტოლოგი', 'ტრიქოლოგი', 'საერთაშორისო ექსპერტი'],
      stats: [
        { value: 13, label: 'წლის გამოცდი\u00ADლება' },
        { value: 500, label: 'საავტორო სემინარი' },
        { value: 3000, label: 'გადამზადე\u00ADბული სპეცია\u00ADლისტი' },
      ],
      points: [
        '13+ წლის გამოცდილება ესთეტიკურ დერმატოლოგიასა და პროფესიულ კოსმეტოლოგიაში.',
        'Aesthetic medicine Clinic-ის — ესთეტიკური მედიცინის კლინიკის (უკრაინა) — დამფუძნებელი.',
        'KOSMETIK PROFI-ის (გერმანია) დამფუძნებელი და ხელმძღვანელი — კოსმეტოლოგიური პრაქტიკების ქსელი და პროფესიული კოსმეტოლოგიისა და ტრიქოლოგიის სკოლა.',
        'reNeo Cosmetics-ის საერთაშორისო ექსპერტი, წამყვანი ევროპელი ტრენერი და პროფესიული პროტოკოლების თანაავტორი.',
        '500+ საავტორო სემინარი და მასტერკლასი ევროპის 10-ზე მეტ ქვეყანაში.',
        '3 000+ გადამზადებული ექიმი, კოსმეტოლოგი და ესთეტიკური მედიცინის სპეციალისტი.',
        'საერთაშორისო სპიკერი და საგანმანათლებლო პროგრამების ავტორი ესთეტიკური კოსმეტოლოგიის, დერმატოლოგიისა და ტრიქოლოგიის სფეროში.',
      ],
    },
    program: {
      title: 'სემინარის პროგრამა',
      duration: 'ხანგრძლივობა: 4 საათი',
      speaker: 'სპიკერი: დოქტ. ქეთევან ფაქსაშვილი',
      outro: 'უჯრედული მექანიზმების გააზრებიდან ეფექტურ კომბინირებულ პროტოკოლებამდე კოსმეტოლოგის პრაქტიკაში.',
      items: [
        {
          title: 'თეორიული ნაწილი',
          duration: '2 საათი',
          groups: [
            {
              title: 'მიკრონიდლინგის მოქმედების მექანიზმები',
              points: [
                'კანის ჰისტოლოგიური და ფიზიოლოგიური რეაქციები.',
                'რეგენერაციის უჯრედული მექანიზმები, ნეოკოლაგენეზი და ქსოვილების რემოდელირება.',
                'ჩვენებები, უკუჩვენებები და გართულებების პრევენცია.',
              ],
            },
            {
              title: 'თანამედროვე კომბინირებული პროტოკოლები',
              points: [
                'მიკრონიდლინგი + ქიმიური პილინგები.',
                'მიკრონიდლინგი + ეგზოსომური თერაპია.',
                'reNeo Cosmetics-ის პროფესიული პრეპარატების პრეზენტაცია.',
                'პროტოკოლების შერჩევა ასაკობრივი ცვლილებების, პოსტაკნეს, პიგმენტაციისა და სხვა ესთეტიკური პრობლემების კორექციისთვის.',
              ],
            },
            {
              title: 'პროცედურების ეფექტური კურსის აგება',
              points: [
                'როგორ შევუთავსოთ მეთოდიკები ერთმანეთს და განვსაზღვროთ პროცედურების თანმიმდევრობა.',
                'ოპტიმალური ინტერვალები, სეანსების რაოდენობა და შედეგების შეფასება.',
                'ინდივიდუალური კურსები და სახლის მოვლა.',
              ],
            },
          ],
        },
        { title: 'შესვენება', duration: '30 წუთი', groups: [], note: 'ყავის შესვენება · ნეტვორქინგი' },
        {
          title: 'პრაქტიკული ნაწილი',
          duration: '1,5 საათი',
          groups: [
            {
              title: 'მიკრონიდლინგის პროცედურის დემონსტრაცია მოდელზე',
              points: [
                'კანის დიაგნოსტიკა და პროტოკოლის შერჩევა.',
                'კანის მომზადება, პრეპარატებისა და ზემოქმედების პარამეტრების შერჩევა.',
                'პროცედურის ეტაპობრივი დემონსტრაცია.',
                'პოსტპროცედურული მოვლა და რეკომენდაციები.',
                'პასუხები მონაწილეთა კითხვებზე.',
              ],
            },
          ],
        },
      ],
    },
    audience: {
      title: ['სემინარი', 'ვისთვის'],
      items: [
        { title: 'ექიმი კოსმეტოლოგები', text: 'პრაქტიკოსი სპეციალისტებისთვის, ვისაც სურს უახლეს მიღწევებს ფეხი აუწყოს' },
        { title: 'კლინიკების მფლობელები', text: 'ხელმძღვანელებისთვის, რომლებიც კლინიკას ავითარებენ და ეფექტურ მეთოდებს ნერგავენ' },
        { title: 'ესთეტიკური მედიცინის სპეციალისტები', text: 'დერმატოლოგებისთვის, პლასტიკური ქირურგებისა და ტრიქოლოგებისთვის' },
      ],
    },
    brands: {
      title: 'ბრენდის შესახებ',
      tagline: 'ექსპერტიზა · მეცნიერება · სილამაზე · განვითარება',
      organizer: 'ორგანიზატორი',
      organizerText: 'კოსმეტოლოგებისთვის პროფესიული სემინარების ორგანიზატორი',
      partner: 'პარტნიორი',
      partnerText: 'პროფესიული კოსმეტოლოგიის ევროპული ბრენდი, რომელიც აერთიანებს მოწინავე სამეცნიერო შემუშავებებსა და ხარისხის მაღალ სტანდარტებს',
      values: ['პროფესიული სწავლება', 'სამეცნიერო მიდგომა', 'მაღალი სტანდარტები', 'ექსპერტების განვითარება'],
    },
    cta: {
      title: 'მზად ხართ კვალიფიკაციის ასამაღლებლად?',
      lead: 'დაჯავშნეთ ადგილი ექსკლუზიურ სემინარზე დღესვე',
      note: 'ადგილების რაოდენობა შეზღუდულია',
    },
    footer: { place: 'მოსკოვი, რუსეთი', tag: 'მეცნიერება ჯანსაღი კანისთვის', impressum: 'სამართლებრივი ინფორმაცია', privacy: 'კონფიდენციალურობის პოლიტიკა' },
    a11y: {
      skip: 'შინაარსზე გადასვლა',
      mainNav: 'მთავარი მენიუ',
      mobileNav: 'მობილური მენიუ',
      menu: 'მენიუ',
      language: 'ენა',
      newTab: 'იხსნება ახალ ჩანართში',
      toTop: 'დასაწყისში დაბრუნება',
    },
    form: {
      title: 'წინასწარი რეგისტრაცია',
      hint: 'სახელი და გვარი შეავსეთ ინგლისური ან რუსული ასოებით. ვარსკვლავით (*) აღნიშნული ველები სავალდებულოა.',
      firstName: 'სახელი',
      lastName: 'გვარი',
      phone: 'ტელეფონის ნომერი',
      phonePlaceholder: '5xx xx xx xx',
      phoneHint: 'ან საერთაშორისო ფორმატით, მაგ.: +995 5xx xx xx xx',
      profession: 'პროფესია',
      experience: 'სამუშაო გამოცდილება',
      optional: '(არასავალდებულო)',
      select: 'აირჩიეთ',
      experienceOptions: ['1 წლამდე', '1–3 წელი', '3–5 წელი', '5–10 წელი', '10+ წელი'],
      languages: 'რა ენებს ფლობთ',
      languageOptions: { ka: 'ქართული', ru: 'რუსული', en: 'ინგლისური' },
      sending: 'იგზავნება…',
      sent: 'გმადლობთ! თქვენი განაცხადი მიღებულია. მალე დაგიკავშირდებით.',
      sentMail: 'განაცხადის წერილი გაიხსნა თქვენს ელფოსტაში. გააგზავნეთ, რომ რეგისტრაცია დასრულდეს.',
      failed: 'განაცხადის გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან.',
      errors: {
        required: 'შეავსეთ ეს ველი',
        letters: 'გამოიყენეთ მხოლოდ ინგლისური ან რუსული ასოები',
        phone: 'შეამოწმეთ ნომერი: 5xx xx xx xx ან +995 5xx xx xx xx',
        languages: 'აირჩიეთ მინიმუმ ერთი ენა',
      },
    },
  },
}
