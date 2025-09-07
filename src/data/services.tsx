// src/data/services.tsx
import { 
  Globe, 
  Smartphone, 
  Database, 
  Palette, 
  ShoppingCart,
  TrendingUp,
  MessageSquare} from 'lucide-react';
import { Service } from '../types/service';

export const servicesData: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'פיתוח אתרים ואפליקציות ווב',
    shortName: 'פיתוח אתרים',
    tagline: 'אתרים מודרניים שמניעים תוצאות',
    description: 'פיתוח אתרים ואפליקציות ווב מותאמים אישית עם טכנולוגיות מתקדמות',
    longDescription: 'אנו מתמחים בפיתוח אתרים ואפליקציות ווב מותאמים אישית, תוך שימוש בטכנולוגיות המתקדמות ביותר. מ-Landing Pages פשוטים ועד מערכות מורכבות, אנו מספקים פתרונות שמשלבים עיצוב מרהיב, ביצועים מעולים וחוויית משתמש אינטואיטיבית.',
    icon: <Globe className="h-6 w-6" />,
    category: 'development',
    features: [
      {
        title: 'אתרים רספונסיביים',
        description: 'עיצוב מותאם לכל מכשיר - מובייל, טאבלט ומחשב'
      },
      {
        title: 'ביצועים מהירים',
        description: 'אופטימיזציה לטעינה מהירה וחוויית משתמש חלקה'
      },
      {
        title: 'SEO מובנה',
        description: 'אופטימיזציה למנועי חיפוש לנראות מקסימלית'
      },
      {
        title: 'אבטחה מתקדמת',
        description: 'הגנה על המידע והנתונים של העסק שלכם'
      },
      {
        title: 'ניהול תוכן קל',
        description: 'מערכת ניהול תוכן ידידותית למשתמש'
      },
      {
        title: 'אנליטיקס מובנה',
        description: 'מעקב ודיווח על ביצועי האתר'
      }
    ],
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Next.js', category: 'framework' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'AWS', category: 'tool' }
    ],
    process: [
      {
        step: 1,
        title: 'תכנון ואפיון',
        description: 'הבנת הצרכים והגדרת היעדים',
        duration: '1-2 שבועות'
      },
      {
        step: 2,
        title: 'עיצוב UI/UX',
        description: 'יצירת מוקאפים ואבי טיפוס',
        duration: '2-3 שבועות'
      },
      {
        step: 3,
        title: 'פיתוח',
        description: 'כתיבת הקוד ובניית האתר',
        duration: '4-8 שבועות'
      },
      {
        step: 4,
        title: 'בדיקות',
        description: 'בדיקות איכות ותיקון באגים',
        duration: '1-2 שבועות'
      },
      {
        step: 5,
        title: 'השקה',
        description: 'העלאה לאוויר וליווי ראשוני',
        duration: '1 שבוע'
      }
    ],
    benefits: [
      'נוכחות דיגיטלית מקצועית',
      'הגדלת הנראות באינטרנט',
      'יצירת לידים איכותיים',
      'שיפור חוויית הלקוח',
      'יתרון תחרותי',
      'החזר השקעה גבוה'
    ],
    deliverables: [
      'אתר מותאם אישית',
      'מערכת ניהול תוכן',
      'אופטימיזציה למובייל',
      'הטמעת אנליטיקס',
      'תיעוד טכני',
      'הדרכה לשימוש'
    ],
    timeline: '6-12 שבועות',
    startingPrice: {
      amount: 5000,
      currency: '₪',
      unit: 'לפרויקט'
    },
    cta: {
      title: 'מוכנים להתחיל?',
      description: 'בואו נבנה יחד את האתר המושלם לעסק שלכם',
      buttonText: 'קבלו הצעת מחיר',
      buttonLink: '/contact?service=web-development'
    }
  },
  {
    id: 'mobile-apps',
    slug: 'mobile-apps',
    name: 'פיתוח אפליקציות מובייל',
    shortName: 'אפליקציות מובייל',
    tagline: 'אפליקציות שהלקוחות שלכם יאהבו',
    description: 'פיתוח אפליקציות native ו-cross-platform לאנדרואיד ו-iOS',
    longDescription: 'אנו מפתחים אפליקציות מובייל חדשניות ואינטואיטיביות שמספקות חוויית משתמש מעולה. בין אם אתם צריכים אפליקציה native או cross-platform, אנו נבנה את הפתרון המושלם עבורכם.',
    icon: <Smartphone className="h-6 w-6" />,
    category: 'development',
    features: [
      {
        title: 'תמיכה ב-iOS ואנדרואיד',
        description: 'אפליקציה אחת לכל הפלטפורמות'
      },
      {
        title: 'ממשק משתמש אינטואיטיבי',
        description: 'עיצוב נוח וקל לשימוש'
      },
      {
        title: 'עבודה אופליין',
        description: 'גישה לתכנים גם ללא חיבור לאינטרנט'
      },
      {
        title: 'התראות Push',
        description: 'תקשורת ישירה עם המשתמשים'
      },
      {
        title: 'אינטגרציה עם מכשיר',
        description: 'שימוש במצלמה, GPS ועוד'
      },
      {
        title: 'אבטחת מידע',
        description: 'הגנה מלאה על נתוני המשתמשים'
      }
    ],
    technologies: [
      { name: 'React Native', category: 'framework' },
      { name: 'Flutter', category: 'framework' },
      { name: 'Swift', category: 'frontend' },
      { name: 'Kotlin', category: 'frontend' },
      { name: 'Firebase', category: 'backend' },
      { name: 'Node.js', category: 'backend' }
    ],
    benefits: [
      'הגדלת מעורבות לקוחות',
      'נגישות 24/7',
      'חוויית משתמש מעולה',
      'הגדלת מכירות',
      'בניית נאמנות לקוחות',
      'יתרון על המתחרים'
    ],
    timeline: '8-16 שבועות',
    startingPrice: {
      amount: 15000,
      currency: '₪',
      unit: 'לאפליקציה'
    },
    cta: {
      title: 'רוצים אפליקציה משלכם?',
      description: 'נשמח לשמוע על הרעיון שלכם ולהפוך אותו למציאות',
      buttonText: 'דברו איתנו',
      buttonLink: '/contact?service=mobile-apps'
    }
  },
  {
    id: 'management-systems',
    slug: 'management-systems',
    name: 'מערכות ניהול ו-CRM',
    shortName: 'מערכות ניהול',
    tagline: 'ניהול חכם לעסק מצליח',
    description: 'פיתוח מערכות ניהול מותאמות אישית לצרכי העסק',
    longDescription: 'מערכות ניהול מותאמות אישית שמייעלות את התהליכים העסקיים שלכם. מ-CRM ועד ERP, אנו בונים פתרונות שחוסכים זמן, כסף ומשאבים.',
    icon: <Database className="h-6 w-6" />,
    category: 'development',
    features: [
      {
        title: 'ניהול לקוחות',
        description: 'מעקב וניהול מלא של קשרי לקוחות'
      },
      {
        title: 'אוטומציה',
        description: 'תהליכים אוטומטיים לחיסכון בזמן'
      },
      {
        title: 'דוחות ואנליטיקס',
        description: 'תובנות עסקיות בזמן אמת'
      },
      {
        title: 'ניהול משימות',
        description: 'מעקב אחר משימות ופרויקטים'
      },
      {
        title: 'אינטגרציות',
        description: 'חיבור למערכות קיימות'
      },
      {
        title: 'הרשאות מתקדמות',
        description: 'ניהול גישות ותפקידים'
      }
    ],
    technologies: [
      { name: 'React', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'Redis', category: 'database' },
      { name: 'Docker', category: 'tool' },
      { name: 'GraphQL', category: 'backend' }
    ],
    benefits: [
      'ייעול תהליכים',
      'חיסכון בזמן',
      'הפחתת טעויות',
      'שיפור שירות',
      'קבלת החלטות מושכלת',
      'צמיחה עסקית'
    ],
    timeline: '12-20 שבועות',
    startingPrice: {
      amount: 25000,
      currency: '₪',
      unit: 'למערכת'
    },
    cta: {
      title: 'זקוקים למערכת ניהול?',
      description: 'נבנה לכם מערכת שתתאים בדיוק לצרכים שלכם',
      buttonText: 'בואו נתחיל',
      buttonLink: '/contact?service=management-systems'
    }
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    name: 'עיצוב UI/UX',
    shortName: 'עיצוב ממשק',
    tagline: 'עיצוב שמדבר אל המשתמשים',
    description: 'עיצוב ממשקים וחוויית משתמש מקצועית',
    longDescription: 'עיצוב ממשק משתמש וחוויית משתמש שמשלב אסתטיקה עם פונקציונליות. אנו יוצרים עיצובים שלא רק נראים טוב אלא גם עובדים מצוין.',
    icon: <Palette className="h-6 w-6" />,
    category: 'design',
    features: [
      {
        title: 'מחקר משתמשים',
        description: 'הבנת הקהל והצרכים'
      },
      {
        title: 'אב טיפוס אינטראקטיבי',
        description: 'סימולציה של המוצר הסופי'
      },
      {
        title: 'עיצוב רספונסיבי',
        description: 'התאמה מושלמת לכל מסך'
      },
      {
        title: 'מדריך סגנון',
        description: 'שפה עיצובית אחידה'
      },
      {
        title: 'בדיקות משתמשים',
        description: 'אימות העיצוב עם משתמשים אמיתיים'
      },
      {
        title: 'אנימציות ומיקרו-אינטראקציות',
        description: 'חוויה חיה ומעניינת'
      }
    ],
    technologies: [
      { name: 'Figma', category: 'tool' },
      { name: 'Adobe XD', category: 'tool' },
      { name: 'Sketch', category: 'tool' },
      { name: 'Framer', category: 'tool' },
      { name: 'Principle', category: 'tool' }
    ],
    benefits: [
      'שיפור חוויית משתמש',
      'הגדלת המרות',
      'חיזוק המותג',
      'הפחתת נטישה',
      'שביעות רצון גבוהה',
      'יתרון תחרותי'
    ],
    timeline: '4-8 שבועות',
    startingPrice: {
      amount: 8000,
      currency: '₪',
      unit: 'לפרויקט'
    },
    cta: {
      title: 'מחפשים עיצוב מנצח?',
      description: 'ניצור לכם עיצוב שישאיר רושם',
      buttonText: 'בואו נעצב',
      buttonLink: '/contact?service=ui-ux-design'
    }
  },
  {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'חנויות אונליין ומסחר אלקטרוני',
    shortName: 'חנויות אונליין',
    tagline: 'חנות שמוכרת 24/7',
    description: 'הקמת חנויות אונליין מתקדמות עם מערכת ניהול מלאה',
    longDescription: 'פתרונות מסחר אלקטרוני מקצה לקצה - מהקמת החנות ועד אופטימיזציה למכירות. אנו בונים חנויות שלא רק נראות טוב אלא גם ממירות מבקרים ללקוחות.',
    icon: <ShoppingCart className="h-6 w-6" />,
    category: 'development',
    features: [
      {
        title: 'עגלת קניות חכמה',
        description: 'תהליך רכישה פשוט ומהיר'
      },
      {
        title: 'תשלומים מאובטחים',
        description: 'אינטגרציה עם כל שיטות התשלום'
      },
      {
        title: 'ניהול מלאי',
        description: 'מעקב אוטומטי אחר מלאי ומכירות'
      },
      {
        title: 'שיווק ומבצעים',
        description: 'כלים לקידום מכירות'
      },
      {
        title: 'משלוחים חכמים',
        description: 'חישוב וניהול משלוחים'
      },
      {
        title: 'דוחות מכירות',
        description: 'ניתוח ביצועים ומגמות'
      }
    ],
    technologies: [
      { name: 'Shopify', category: 'framework' },
      { name: 'WooCommerce', category: 'framework' },
      { name: 'Next.js', category: 'framework' },
      { name: 'Stripe', category: 'tool' },
      { name: 'PayPal', category: 'tool' }
    ],
    benefits: [
      'מכירות סביב השעון',
      'הרחבת קהל היעד',
      'הפחתת עלויות',
      'ניהול קל',
      'מדידה ואופטימיזציה',
      'סקיילביליות'
    ],
    timeline: '8-12 שבועות',
    startingPrice: {
      amount: 12000,
      currency: '₪',
      unit: 'לחנות'
    },
    cta: {
      title: 'מוכנים למכור אונליין?',
      description: 'נקים לכם חנות שתניע את המכירות',
      buttonText: 'התחילו למכור',
      buttonLink: '/contact?service=e-commerce'
    }
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    name: 'שיווק דיגיטלי ו-SEO',
    shortName: 'שיווק דיגיטלי',
    tagline: 'נראות שמניעה תוצאות',
    description: 'אסטרטגיות שיווק דיגיטלי וקידום אתרים',
    longDescription: 'שירותי שיווק דיגיטלי מקיפים שיביאו את העסק שלכם לחזית. מ-SEO ועד קמפיינים ממומנים, אנו נדאג שהלקוחות הנכונים ימצאו אתכם.',
    icon: <TrendingUp className="h-6 w-6" />,
    category: 'marketing',
    features: [
      {
        title: 'קידום אורגני SEO',
        description: 'מיקום גבוה בתוצאות החיפוש'
      },
      {
        title: 'קמפיינים ממומנים',
        description: 'Google Ads ו-Social Media'
      },
      {
        title: 'שיווק תוכן',
        description: 'יצירת תוכן איכותי ורלוונטי'
      },
      {
        title: 'ניהול רשתות חברתיות',
        description: 'נוכחות פעילה ומעניינת'
      },
      {
        title: 'אימייל מרקטינג',
        description: 'קמפיינים ממוקדים'
      },
      {
        title: 'אנליטיקס ודוחות',
        description: 'מעקב ואופטימיזציה'
      }
    ],
    benefits: [
      'הגדלת תנועה לאתר',
      'יצירת לידים',
      'חיזוק המותג',
      'החזר השקעה גבוה',
      'יתרון על המתחרים',
      'צמיחה מתמשכת'
    ],
    timeline: 'שירות מתמשך',
    startingPrice: {
      amount: 3000,
      currency: '₪',
      unit: 'לחודש'
    },
    cta: {
      title: 'רוצים להגדיל את הנוכחות הדיגיטלית?',
      description: 'נעזור לכם להגיע ללקוחות הנכונים',
      buttonText: 'קבלו ייעוץ חינם',
      buttonLink: '/contact?service=digital-marketing'
    }
  },
  {
    id: 'consulting',
    slug: 'consulting',
    name: 'ייעוץ ואסטרטגיה דיגיטלית',
    shortName: 'ייעוץ דיגיטלי',
    tagline: 'החלטות חכמות לעתיד דיגיטלי',
    description: 'ייעוץ מקצועי לאסטרטגיה דיגיטלית וטרנספורמציה',
    longDescription: 'ייעוץ אסטרטגי שיעזור לכם לנווט בעולם הדיגיטלי. מתכנון אסטרטגיה ועד יישום, אנו נלווה אתכם בכל צעד.',
    icon: <MessageSquare className="h-6 w-6" />,
    category: 'consulting',
    features: [
      {
        title: 'ניתוח מצב קיים',
        description: 'הערכה מקיפה של הנוכחות הדיגיטלית'
      },
      {
        title: 'תכנון אסטרטגי',
        description: 'בניית תוכנית פעולה מפורטת'
      },
      {
        title: 'בחירת טכנולוגיות',
        description: 'המלצות על כלים ופלטפורמות'
      },
      {
        title: 'אופטימיזציה',
        description: 'שיפור תהליכים קיימים'
      },
      {
        title: 'הדרכה וליווי',
        description: 'העברת ידע לצוות'
      },
      {
        title: 'מעקב ובקרה',
        description: 'וידוא השגת היעדים'
      }
    ],
    benefits: [
      'קבלת החלטות מושכלת',
      'חיסכון במשאבים',
      'הימנעות מטעויות',
      'התמקדות בליבה',
      'יישום מיטבי',
      'תוצאות מדידות'
    ],
    timeline: 'לפי צורך',
    startingPrice: {
      amount: 500,
      currency: '₪',
      unit: 'לשעה'
    },
    cta: {
      title: 'צריכים ייעוץ מקצועי?',
      description: 'נעזור לכם לקבל החלטות נכונות',
      buttonText: 'קבעו פגישה',
      buttonLink: '/contact?service=consulting'
    }
  }
];

// Helper function to get service by slug
export const getServiceBySlug = (slug: string): Service | undefined => {
  return servicesData.find(service => service.slug === slug);
};

// Helper function to get related services
export const getRelatedServices = (currentSlug: string, limit: number = 3): Service[] => {
  const currentService = getServiceBySlug(currentSlug);
  if (!currentService) return [];
  
  // Get services from the same category first
  const sameCategory = servicesData
    .filter(s => s.slug !== currentSlug && s.category === currentService.category)
    .slice(0, limit);
  
  // If not enough, add from other categories
  if (sameCategory.length < limit) {
    const others = servicesData
      .filter(s => s.slug !== currentSlug && s.category !== currentService.category)
      .slice(0, limit - sameCategory.length);
    return [...sameCategory, ...others];
  }
  
  return sameCategory;
};

// Categories for filtering
export const serviceCategories = [
  { id: 'all', name: 'הכל', count: servicesData.length },
  { id: 'development', name: 'פיתוח', count: servicesData.filter(s => s.category === 'development').length },
  { id: 'design', name: 'עיצוב', count: servicesData.filter(s => s.category === 'design').length },
  { id: 'marketing', name: 'שיווק', count: servicesData.filter(s => s.category === 'marketing').length },
  { id: 'consulting', name: 'ייעוץ', count: servicesData.filter(s => s.category === 'consulting').length }
];