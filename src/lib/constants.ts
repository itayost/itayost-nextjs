export const SITE_CONFIG = {
  name: 'ItayOst',
  title: 'ItayOst - פיתוח דיגיטלי לעסקים',
  description: 'פתרונות דיגיטליים מותאמים אישית לעסקים',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://itayost.com',
  email: process.env.NEXT_PUBLIC_EMAIL_TO || 'itayost1@gmail.com',
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972544994417',
};

export const NAV_LINKS = [
  { href: '/', label: 'בית' },
  { href: '/about', label: 'אודות' },
  { href: '/services', label: 'שירותים' },
  { href: '/portfolio', label: 'תיק עבודות' },
  { href: '/blog', label: 'בלוג' },
  { href: '/process', label: 'תהליך' },
  { href: '/pricing', label: 'מחירון' },
  { href: '/contact', label: 'צור קשר' },
];

export const SOCIAL_LINKS = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
};
