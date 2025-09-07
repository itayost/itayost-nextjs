// src/data/about.tsx
import { 
  AboutContent, 
  AboutStats, 
  Skill, 
  Experience, 
  Education, 
  Certification, 
  Achievement, 
  PersonalValue,
  WorkProcess,
  Testimonial,
  FAQ,
  SkillCategory
} from '@/types/about';
import { 
  Code2, 
  Rocket, 
  Heart, 
  Lightbulb, 
  Target,
  Sparkles,
  Shield,
  Palette,
  Award,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

export const aboutContent: AboutContent = {
  hero: {
    name: 'איתי אוסטרייכר',
    title: 'Full Stack Developer',
    subtitle: 'מומחה בפיתוח אתרים ואפליקציות',
    description: 'עם למעלה מ-5 שנים של ניסיון בפיתוח פתרונות דיגיטליים, אני מביא חזון לחיים דרך קוד נקי, עיצוב מרהיב וטכנולוגיות מתקדמות.',
    image: '/images/itay-profile.jpg',
    yearsOfExperience: 5,
    projectsCompleted: 50,
    clientsSatisfied: 40,
    availability: 'available',
    cta: {
      primary: {
        text: 'בואו נדבר',
        href: '/contact'
      },
      secondary: {
        text: 'צפו בעבודות',
        href: '/portfolio'
      }
    }
  },
  bio: {
    title: 'קצת עליי',
    content: [
      'היי, אני איתי! מפתח Full Stack עם תשוקה אמיתית לטכנולוגיה ויצירה דיגיטלית. המסע שלי בעולם הפיתוח התחיל מתוך סקרנות טהורה - רציתי להבין איך דברים עובדים באינטרנט, ומהר מאוד גיליתי שאני יכול לא רק להבין, אלא גם ליצור.',
      'במהלך השנים, פיתחתי עשרות פרויקטים מגוונים - מאתרי תדמית פשוטים ועד מערכות ניהול מורכבות. כל פרויקט הוא הזדמנות עבורי ללמוד משהו חדש, להתמודד עם אתגרים מרתקים, ובעיקר - לעזור לעסקים ויזמים להגשים את החזון הדיגיטלי שלהם.',
      'אני מאמין שפיתוח טוב הוא לא רק קוד שעובד, אלא קוד שקל לתחזק, עיצוב שנעים להשתמש בו, וחוויית משתמש שגורמת לאנשים לחזור. זו הגישה שאני מביא לכל פרויקט.'
    ],
    highlights: [
      'מומחה ב-React, Next.js ו-TypeScript',
      'ניסיון עשיר בפיתוח מערכות Full Stack',
      'גישה מוכוונת לקוח ותוצאות',
      'למידה מתמדת של טכנולוגיות חדשות'
    ]
  },
  mission: {
    title: 'המשימה שלי',
    description: 'לעזור לעסקים ויזמים להצליח בעולם הדיגיטלי באמצעות פתרונות טכנולוגיים חדשניים ומותאמים אישית.',
    points: [
      'יצירת פתרונות שמניעים צמיחה עסקית',
      'פיתוח מוצרים דיגיטליים איכותיים ומקצועיים',
      'מתן שירות אישי ומקצועי לכל לקוח',
      'שמירה על סטנדרטים גבוהים בכל פרויקט'
    ]
  },
  vision: {
    title: 'החזון שלי',
    description: 'להיות השותף הטכנולוגי המוביל עבור עסקים שרוצים להצליח בעידן הדיגיטלי.',
    points: [
      'להמשיך ולהתפתח מקצועית',
      'לבנות פתרונות שמשנים חיים',
      'ליצור ערך אמיתי ללקוחות',
      'להיות בחזית החדשנות הטכנולוגית'
    ]
  },
  approach: {
    title: 'הערכים שלי',
    description: 'הערכים שמנחים אותי בכל פרויקט ובכל אינטראקציה עם לקוחות.',
    values: [
      {
        id: 'quality',
        title: 'איכות ללא פשרות',
        description: 'כל שורת קוד, כל פיקסל, כל פרט - הכל חייב להיות מושלם.',
        icon: <Sparkles className="w-6 h-6" />,
        color: 'text-yellow-500'
      },
      {
        id: 'innovation',
        title: 'חדשנות מתמדת',
        description: 'תמיד מחפש את הטכנולוגיות והפתרונות הכי מתקדמים.',
        icon: <Lightbulb className="w-6 h-6" />,
        color: 'text-blue-500'
      },
      {
        id: 'communication',
        title: 'תקשורת פתוחה',
        description: 'שקיפות מלאה ועדכונים שוטפים לאורך כל הפרויקט.',
        icon: <MessageSquare className="w-6 h-6" />,
        color: 'text-green-500'
      },
      {
        id: 'reliability',
        title: 'אמינות מוחלטת',
        description: 'עמידה בלוחות זמנים, בתקציב ובהבטחות.',
        icon: <Shield className="w-6 h-6" />,
        color: 'text-purple-500'
      }
    ] as PersonalValue[]
  },
  social: {
    linkedin: 'https://linkedin.com/in/itayost',
    github: 'https://github.com/itayost',
    twitter: 'https://twitter.com/itayost',
    instagram: 'https://instagram.com/itayost'
  }
};

export const aboutStats: AboutStats = {
  yearsExperience: 5,
  projectsCompleted: 50,
  happyClients: 40,
  hoursOfCode: 10000,
  technologies: 25,
  coffeesCups: 2000
};

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'טכנולוגיות צד לקוח',
    skills: [
      { id: 'react', name: 'React', category: 'frontend', level: 95, yearsOfExperience: 4 },
      { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 90, yearsOfExperience: 3 },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 85, yearsOfExperience: 3 },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 90, yearsOfExperience: 2 },
      { id: 'html', name: 'HTML5', category: 'frontend', level: 100, yearsOfExperience: 5 },
      { id: 'css', name: 'CSS3', category: 'frontend', level: 95, yearsOfExperience: 5 },
      { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 95, yearsOfExperience: 5 }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'טכנולוגיות צד שרת',
    skills: [
      { id: 'nodejs', name: 'Node.js', category: 'backend', level: 85, yearsOfExperience: 4 },
      { id: 'express', name: 'Express', category: 'backend', level: 80, yearsOfExperience: 3 },
      { id: 'python', name: 'Python', category: 'backend', level: 75, yearsOfExperience: 2 },
      { id: 'graphql', name: 'GraphQL', category: 'backend', level: 70, yearsOfExperience: 2 },
      { id: 'rest', name: 'REST API', category: 'backend', level: 90, yearsOfExperience: 4 }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    description: 'בסיסי נתונים',
    skills: [
      { id: 'mongodb', name: 'MongoDB', category: 'database', level: 85, yearsOfExperience: 3 },
      { id: 'postgresql', name: 'PostgreSQL', category: 'database', level: 75, yearsOfExperience: 2 },
      { id: 'mysql', name: 'MySQL', category: 'database', level: 80, yearsOfExperience: 3 },
      { id: 'redis', name: 'Redis', category: 'database', level: 70, yearsOfExperience: 2 }
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'כלים ופלטפורמות',
    skills: [
      { id: 'git', name: 'Git', category: 'tools', level: 90, yearsOfExperience: 5 },
      { id: 'docker', name: 'Docker', category: 'tools', level: 75, yearsOfExperience: 2 },
      { id: 'aws', name: 'AWS', category: 'tools', level: 70, yearsOfExperience: 2 },
      { id: 'figma', name: 'Figma', category: 'tools', level: 85, yearsOfExperience: 3 },
      { id: 'vercel', name: 'Vercel', category: 'tools', level: 85, yearsOfExperience: 2 }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: 'freelance-current',
    role: 'Full Stack Developer - Freelance',
    type: 'freelance',
    startDate: '2020-01',
    description: 'פיתוח פתרונות דיגיטליים מותאמים אישית לעסקים ויזמים. התמחות בפיתוח אתרים, אפליקציות ומערכות ניהול.',
    achievements: [
      'פיתחתי למעלה מ-50 פרויקטים מוצלחים',
      'עבדתי עם לקוחות מתחומים מגוונים',
      'שמרתי על 100% שביעות רצון לקוחות',
      'הטמעתי טכנולוגיות חדשניות'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 'tech-company',
    role: 'Frontend Developer',
    company: 'TechStart Solutions',
    type: 'job',
    startDate: '2018-06',
    endDate: '2019-12',
    description: 'פיתוח ממשקי משתמש מתקדמים ורספונסיביים. עבודה בצוות Agile על מוצרי SaaS.',
    achievements: [
      'הובלתי את המעבר ל-React',
      'שיפרתי ביצועים ב-40%',
      'פיתחתי מערכת Component Library'
    ],
    technologies: ['React', 'Redux', 'SASS', 'Webpack', 'Jest']
  }
];

export const educationData: Education[] = [
  {
    id: 'computer-science',
    degree: 'תואר ראשון',
    institution: 'האוניברסיטה הפתוחה',
    field: 'מדעי המחשב',
    startYear: '2016',
    endYear: '2020',
    description: 'התמחות בפיתוח תוכנה ואלגוריתמים',
    achievements: [
      'ממוצע 85',
      'פרויקט גמר בהצטיינות'
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: 'react-advanced',
    name: 'React Advanced Certification',
    issuer: 'Meta',
    issueDate: '2023-03',
    link: 'https://certificates.example.com/react'
  },
  {
    id: 'aws-developer',
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    issueDate: '2022-09',
    expiryDate: '2025-09',
    credentialId: 'AWS-12345',
    link: 'https://aws.amazon.com/certification/'
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'best-website-2023',
    title: 'אתר השנה 2023',
    description: 'זכייה בתחרות אתר השנה בקטגוריית עסקים קטנים',
    date: '2023-12',
    category: 'award',
    icon: <Award className="w-6 h-6" />
  },
  {
    id: 'milestone-50-projects',
    title: '50 פרויקטים מוצלחים',
    description: 'השלמת 50 פרויקטים עם 100% שביעות רצון לקוחות',
    date: '2024-06',
    category: 'milestone',
    icon: <Rocket className="w-6 h-6" />
  },
  {
    id: 'open-source',
    title: 'תרומה ל-Open Source',
    description: 'תרומה פעילה לפרויקטים בקוד פתוח',
    date: '2024-01',
    category: 'project',
    icon: <Code2 className="w-6 h-6" />
  }
];

export const workProcessData: WorkProcess[] = [
  {
    id: 'discovery',
    step: 1,
    title: 'הכרות ותכנון',
    description: 'הבנת הצרכים, היעדים והחזון של הפרויקט',
    icon: <Target className="w-6 h-6" />,
    duration: '1-2 ימים'
  },
  {
    id: 'design',
    step: 2,
    title: 'עיצוב ואפיון',
    description: 'יצירת מוקאפים ואפיון טכני מפורט',
    icon: <Palette className="w-6 h-6" />,
    duration: '3-5 ימים'
  },
  {
    id: 'development',
    step: 3,
    title: 'פיתוח',
    description: 'כתיבת הקוד ובניית הפתרון',
    icon: <Code2 className="w-6 h-6" />,
    duration: '2-8 שבועות'
  },
  {
    id: 'testing',
    step: 4,
    title: 'בדיקות',
    description: 'בדיקות איכות מקיפות ותיקון באגים',
    icon: <CheckCircle className="w-6 h-6" />,
    duration: '3-5 ימים'
  },
  {
    id: 'launch',
    step: 5,
    title: 'השקה',
    description: 'העלאה לאוויר וליווי ראשוני',
    icon: <Rocket className="w-6 h-6" />,
    duration: '1-2 ימים'
  },
  {
    id: 'support',
    step: 6,
    title: 'תמיכה',
    description: 'תמיכה שוטפת ושדרוגים',
    icon: <Heart className="w-6 h-6" />,
    duration: 'מתמשך'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'דני כהן',
    role: 'מנכ"ל',
    company: 'StartUp Nation',
    content: 'איתי הוא מפתח מקצועי ברמה הגבוהה ביותר. הפרויקט שלנו הושלם בזמן, בתקציב, ומעבר לציפיות שלנו.',
    rating: 5,
    image: '/images/testimonials/danny.jpg'
  },
  {
    id: 'testimonial-2',
    name: 'שרה לוי',
    role: 'מנהלת שיווק',
    company: 'E-Commerce Plus',
    content: 'העבודה עם איתי הייתה חוויה מעולה. הוא הבין בדיוק את הצרכים שלנו וסיפק פתרון מושלם.',
    rating: 5,
    image: '/images/testimonials/sarah.jpg'
  },
  {
    id: 'testimonial-3',
    name: 'מיכאל רוזן',
    role: 'CTO',
    company: 'Tech Solutions',
    content: 'איכות הקוד והארכיטקטורה שאיתי מספק היא ברמה של חברות הייטק מובילות. ממליץ בחום!',
    rating: 5,
    image: '/images/testimonials/michael.jpg'
  }
];

export const faqData: FAQ[] = [
  {
    id: 'faq-1',
    question: 'כמה זמן לוקח לפתח אתר?',
    answer: 'זמן הפיתוח תלוי במורכבות הפרויקט. אתר תדמית פשוט יכול לקחת 2-4 שבועות, בעוד שמערכת מורכבת יכולה לקחת 2-3 חודשים.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'איזה טכנולוגיות אתה משתמש?',
    answer: 'אני מתמחה ב-React, Next.js, TypeScript ו-Node.js, אבל בוחר את הטכנולוגיה המתאימה ביותר לכל פרויקט.',
    category: 'technical'
  },
  {
    id: 'faq-3',
    question: 'האם אתה מספק תמיכה אחרי ההשקה?',
    answer: 'בהחלט! אני מציע חבילות תמיכה שונות כולל תיקון באגים, עדכונים ושדרוגים.',
    category: 'support'
  },
  {
    id: 'faq-4',
    question: 'כמה עולה לפתח אתר?',
    answer: 'המחיר תלוי בהיקף הפרויקט ובדרישות. אתר בסיסי מתחיל מ-5,000 ₪, ומערכות מורכבות יכולות להגיע לעשרות אלפי שקלים.',
    category: 'pricing'
  },
  {
    id: 'faq-5',
    question: 'האם אתה עובד מרחוק?',
    answer: 'כן, אני עובד מרחוק עם לקוחות מכל הארץ ומחו"ל. אני משתמש בכלי תקשורת מתקדמים לעדכונים שוטפים.',
    category: 'general'
  }
];

// Helper functions
export function getSkillsByCategory(category: string): Skill[] {
  const skillCategory = skillsData.find(sc => sc.id === category);
  return skillCategory ? skillCategory.skills : [];
}

export function getCurrentExperience(): Experience | undefined {
  return experienceData.find(exp => !exp.endDate);
}

export function getYearsOfExperience(): number {
  const startYear = 2018; // Started professional development
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

export function getFeaturedTestimonials(limit: number = 3): Testimonial[] {
  return testimonialsData.slice(0, limit);
}

export function getFAQsByCategory(category: string): FAQ[] {
  return faqData.filter(faq => faq.category === category);
}