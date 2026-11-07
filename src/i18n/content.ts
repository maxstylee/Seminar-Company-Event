export type Lang = 'ru' | 'en' | 'ka'
export const LANGS: Lang[] = ['ru', 'en', 'ka']

export interface Content {
  /** Browser tab title */
  pageTitle: string
  nav: { about: string; program: string; speaker: string; audience: string; contacts: string }
  register: string
  reserve: string
  claim: string
  hero: {
    eyebrow: string
    title: [string, string]
    lead: string
    speaker: string
    date: string
    city: string
    facts: [string, string, string]
  }
  benefits: { eyebrow: string; title: string; lead: string; items: { title: string; text: string }[] }
  speaker: { label: string; name: [string, string]; points: string[]; motto: [string, string] }
  program: {
    title: string
    lead: string
    items: { title: string; duration: string; points: string[] }[]
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
  form: {
    title: string
    name: string
    phone: string
    email: string
    clinic: string
    note: string
    close: string
    sent: string
    required: string
  }
}

export const content: Record<Lang, Content> = {
  ru: {
    pageTitle: 'Фракционная мезотерапия · Professional derma series',
    nav: { about: 'О семинаре', program: 'Программа', speaker: 'Спикер', audience: 'Для кого', contacts: 'Контакты' },
    register: 'Зарегистрироваться',
    reserve: 'Забронировать место',
    claim: 'Забрать своё место',
    hero: {
      eyebrow: 'Научный семинар',
      title: ['Фракционная', 'мезотерапия'],
      lead: 'Научные основы и современные комбинированные протоколы',
      speaker: 'Dr. Ketevan Paksashvili',
      date: '26 ноября 2026',
      city: 'Тбилиси, Грузия',
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
      name: ['Dr. Ketevan', 'Paksashvili'],
      points: ['Врач-дерматовенеролог', '13+ лет опыта', 'Международный эксперт reNeo', '500+ семинаров', '3000+ обученных врачей'],
      motto: ['Экспертность.', 'Знания. Результаты.'],
    },
    program: {
      title: 'Программа семинара',
      lead: 'Теория. Практика. Профессиональное сообщество.',
      items: [
        { title: 'Теория', duration: '(2 часа)', points: ['Механизмы действия', 'Протоколы применения', 'Клинические исследования'] },
        { title: 'Практика', duration: '(1.5 часа)', points: ['Живая демонстрация', 'Разбор клинических случаев', 'Вопросы и ответы'] },
        { title: 'Перерыв', duration: '(30 мин)', points: ['Кофе-брейк', 'Нетворкинг'] },
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
      organizerText: 'Organizer of professional seminars for cosmetologists',
      partner: 'Партнер',
      partnerText: 'European brand of professional cosmetology, combining advanced scientific developments and high quality standards',
      values: ['Профессиональное обучение', 'Научный подход', 'Высокие стандарты', 'Развитие экспертов'],
    },
    cta: {
      title: 'Готовы повысить квалификацию?',
      lead: 'Забронируйте место на эксклюзивном семинаре уже сегодня',
      note: 'Количество мест ограничено',
    },
    footer: { place: 'Москва, Россия', tag: 'Science for healthy skin', impressum: 'Impressum', privacy: 'Datenschutz' },
    form: {
      title: 'Забронируйте ваше место',
      name: 'Ваше имя',
      phone: 'Телефон',
      email: 'Email',
      clinic: 'Название клиники',
      note: 'Количество мест ограничено',
      close: 'Закрыть',
      sent: 'Письмо с заявкой открыто в вашей почте. Отправьте его, чтобы завершить бронирование.',
      required: 'Заполните это поле',
    },
  },
  en: {
    pageTitle: 'Fractional mesotherapy · Professional derma series',
    nav: { about: 'About', program: 'Program', speaker: 'Speaker', audience: 'Who it is for', contacts: 'Contacts' },
    register: 'Register',
    reserve: 'Reserve a seat',
    claim: 'Claim your seat',
    hero: {
      eyebrow: 'Scientific seminar',
      title: ['Fractional', 'mesotherapy'],
      lead: 'The science and current combined protocols',
      speaker: 'Dr. Ketevan Paksashvili',
      date: '26 November 2026',
      city: 'Tbilisi, Georgia',
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
      points: ['Dermatovenerologist', '13+ years of experience', 'International reNeo expert', '500+ seminars', '3000+ physicians trained'],
      motto: ['Expertise.', 'Knowledge. Results.'],
    },
    program: {
      title: 'Seminar program',
      lead: 'Theory. Practice. A professional community.',
      items: [
        { title: 'Theory', duration: '(2 hours)', points: ['Mechanisms of action', 'Protocols for use', 'Clinical studies'] },
        { title: 'Practice', duration: '(1.5 hours)', points: ['Live demonstration', 'Clinical case review', 'Questions and answers'] },
        { title: 'Break', duration: '(30 min)', points: ['Coffee break', 'Networking'] },
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
    footer: { place: 'Moscow, Russia', tag: 'Science for healthy skin', impressum: 'Impressum', privacy: 'Privacy' },
    form: {
      title: 'Reserve your seat',
      name: 'Your name',
      phone: 'Phone',
      email: 'Email',
      clinic: 'Clinic name',
      note: 'Seats are limited',
      close: 'Close',
      sent: 'An email with your request is open in your mail app. Send it to finish the booking.',
      required: 'Fill in this field',
    },
  },
  ka: {
    pageTitle: 'ფრაქციული მეზოთერაპია · Professional derma series',
    nav: { about: 'სემინარის შესახებ', program: 'პროგრამა', speaker: 'სპიკერი', audience: 'ვისთვის', contacts: 'კონტაქტი' },
    register: 'რეგისტრაცია',
    reserve: 'ადგილის დაჯავშნა',
    claim: 'დაიკავე ადგილი',
    hero: {
      eyebrow: 'სამეცნიერო სემინარი',
      title: ['ფრაქციული', 'მეზოთერაპია'],
      lead: 'სამეცნიერო საფუძვლები და თანამედროვე კომბინირებული პროტოკოლები',
      speaker: 'Dr. Ketevan Paksashvili',
      date: '26 ნოემბერი, 2026',
      city: 'თბილისი, საქართველო',
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
      name: ['Dr. Ketevan', 'Paksashvili'],
      points: ['ექიმი დერმატოვენეროლოგი', '13+ წლის გამოცდილება', 'reNeo-ს საერთაშორისო ექსპერტი', '500+ სემინარი', '3000+ გადამზადებული ექიმი'],
      motto: ['ექსპერტიზა.', 'ცოდნა. შედეგი.'],
    },
    program: {
      title: 'სემინარის პროგრამა',
      lead: 'თეორია. პრაქტიკა. პროფესიული საზოგადოება.',
      items: [
        { title: 'თეორია', duration: '(2 საათი)', points: ['მოქმედების მექანიზმები', 'გამოყენების პროტოკოლები', 'კლინიკური კვლევები'] },
        { title: 'პრაქტიკა', duration: '(1.5 საათი)', points: ['ცოცხალი დემონსტრაცია', 'კლინიკური შემთხვევების განხილვა', 'კითხვები და პასუხები'] },
        { title: 'შესვენება', duration: '(30 წთ)', points: ['ყავის შესვენება', 'ნეტვორქინგი'] },
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
      organizerText: 'Organizer of professional seminars for cosmetologists',
      partner: 'პარტნიორი',
      partnerText: 'European brand of professional cosmetology, combining advanced scientific developments and high quality standards',
      values: ['პროფესიული სწავლება', 'სამეცნიერო მიდგომა', 'მაღალი სტანდარტები', 'ექსპერტების განვითარება'],
    },
    cta: {
      title: 'მზად ხართ კვალიფიკაციის ასამაღლებლად?',
      lead: 'დაჯავშნეთ ადგილი ექსკლუზიურ სემინარზე დღესვე',
      note: 'ადგილები შეზღუდულია',
    },
    footer: { place: 'მოსკოვი, რუსეთი', tag: 'Science for healthy skin', impressum: 'Impressum', privacy: 'კონფიდენციალურობა' },
    form: {
      title: 'დაჯავშნეთ თქვენი ადგილი',
      name: 'თქვენი სახელი',
      phone: 'ტელეფონი',
      email: 'ელფოსტა',
      clinic: 'კლინიკის სახელწოდება',
      note: 'ადგილები შეზღუდულია',
      close: 'დახურვა',
      sent: 'განაცხადის წერილი გაიხსნა თქვენს ელფოსტაში. გააგზავნეთ, რომ დაჯავშნა დასრულდეს.',
      required: 'შეავსეთ ეს ველი',
    },
  },
}
