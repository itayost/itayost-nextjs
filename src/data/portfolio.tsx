// src/data/portfolio.tsx
import { Project, ProjectCategory } from '../types/portfolio';

export const portfolioData: Project[] = [
  {
    // Kitchen Optimizer - Management System
    id: 'kitchen-optimizer',
    slug: 'kitchen-optimizer',
    title: 'Kitchen Optimizer',
    subtitle: 'מערכת ניהול מטבחים מתקדמת',
    description: 'פלטפורמה מקיפה לניהול מטבחים מסחריים עם אופטימיזציה של מלאי, תפריטים וצוות',
    longDescription: 'פיתחנו מערכת ניהול מתקדמת למטבחים מסחריים המאפשרת ניהול מלאי בזמן אמת, תכנון תפריטים, ניהול צוות וניתוח ביצועים. המערכת כוללת אינטגרציה עם ספקים, התראות אוטומטיות וכלי דיווח מתקדמים.',
    
    category: 'management-system',
    tags: ['ניהול', 'מלאי', 'תפריטים', 'אוטומציה', 'דוחות'],
    featured: true,
    order: 1,
    
    thumbnail: '/images/portfolio/kitchen-optimizer-thumb.jpg',
    images: [
      { src: '/images/portfolio/kitchen-optimizer-1.jpg', alt: 'לוח בקרה ראשי', type: 'desktop', primary: true },
      { src: '/images/portfolio/kitchen-optimizer-2.jpg', alt: 'ניהול מלאי', type: 'desktop' },
      { src: '/images/portfolio/kitchen-optimizer-3.jpg', alt: 'תכנון תפריטים', type: 'desktop' },
      { src: '/images/portfolio/kitchen-optimizer-mobile.jpg', alt: 'גרסת מובייל', type: 'mobile' }
    ],
    color: '#00BFA5',
    
    technologies: [
      { name: 'React', type: 'frontend' },
      { name: 'TypeScript', type: 'frontend' },
      { name: 'Node.js', type: 'backend' },
      { name: 'PostgreSQL', type: 'database' },
      { name: 'Redis', type: 'database' },
      { name: 'Docker', type: 'deployment' },
      { name: 'AWS', type: 'deployment' }
    ],
    
    features: [
      {
        title: 'ניהול מלאי חכם',
        description: 'מעקב אוטומטי אחר מלאי עם התראות על פריטים חסרים',
        icon: 'Package'
      },
      {
        title: 'תכנון תפריטים',
        description: 'יצירת תפריטים דינמיים על בסיס מלאי וביקוש',
        icon: 'FileText'
      },
      {
        title: 'ניהול צוות',
        description: 'תזמון משמרות וניהול משימות לעובדים',
        icon: 'Users'
      },
      {
        title: 'דוחות וניתוחים',
        description: 'דוחות ביצועים מפורטים וניתוח מגמות',
        icon: 'BarChart'
      }
    ],
    
    liveUrl: 'https://kitchen-optimizer.co.il',
    
    client: 'רשת מסעדות שף',
    clientIndustry: 'מזון והסעדה',
    
    testimonial: {
      content: 'המערכת שינתה לנו את החיים! חסכנו 30% בעלויות המלאי וקיצרנו זמני הכנה ב-40%.',
      author: 'יוסי כהן',
      role: 'מנהל תפעול',
      company: 'רשת מסעדות שף',
      rating: 5
    },
    
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-04-20',
    
    stats: {
      duration: '3 חודשים',
      teamSize: 4,
      features: 25,
      performance: '99.9% uptime',
      users: '500+ משתמשים'
    },
    
    challenge: 'הלקוח התמודד עם בזבוז מלאי גבוה, קושי בתכנון תפריטים וחוסר שקיפות בביצועי המטבח.',
    solution: 'פיתחנו מערכת מקיפה המשלבת ניהול מלאי חכם, תכנון תפריטים דינמי וכלי ניתוח מתקדמים.',
    results: 'הפחתה של 30% בבזבוז מלאי, שיפור של 40% בזמני הכנה ועלייה של 25% ברווחיות.',
    process: [
      'מחקר משתמשים וניתוח צרכים',
      'עיצוב ממשק משתמש אינטואיטיבי',
      'פיתוח Backend סקלאבילי',
      'אינטגרציה עם מערכות קיימות',
      'בדיקות ואופטימיזציה',
      'הדרכה והטמעה'
    ]
  },
  
  {
    // TechStart - E-commerce
    id: 'techstart-shop',
    slug: 'techstart-shop',
    title: 'TechStart Shop',
    subtitle: 'חנות אונליין למוצרי טכנולוגיה',
    description: 'פלטפורמת מסחר אלקטרוני מתקדמת עם חוויית קנייה מותאמת אישית',
    longDescription: 'חנות אונליין מלאה למוצרי טכנולוגיה עם מערכת המלצות חכמה, תשלומים מאובטחים, ניהול מלאי אוטומטי וממשק ניהול מקיף למוכרים.',
    
    category: 'e-commerce',
    tags: ['מסחר אלקטרוני', 'תשלומים', 'מובייל', 'AI'],
    featured: true,
    order: 2,
    
    thumbnail: '/images/portfolio/techstart-thumb.jpg',
    images: [
      { src: '/images/portfolio/techstart-1.jpg', alt: 'דף הבית', type: 'desktop', primary: true },
      { src: '/images/portfolio/techstart-2.jpg', alt: 'דף מוצר', type: 'desktop' },
      { src: '/images/portfolio/techstart-3.jpg', alt: 'עגלת קניות', type: 'desktop' },
      { src: '/images/portfolio/techstart-mobile.jpg', alt: 'גרסת מובייל', type: 'mobile' }
    ],
    color: '#7C3AED',
    
    technologies: [
      { name: 'Next.js', type: 'frontend' },
      { name: 'Tailwind CSS', type: 'frontend' },
      { name: 'Stripe', type: 'api' },
      { name: 'MongoDB', type: 'database' },
      { name: 'Vercel', type: 'deployment' },
      { name: 'Cloudinary', type: 'other' }
    ],
    
    features: [
      {
        title: 'חיפוש חכם',
        description: 'חיפוש מתקדם עם פילטרים והמלצות מותאמות',
        icon: 'Search'
      },
      {
        title: 'תשלום מאובטח',
        description: 'אינטגרציה עם Stripe לתשלומים בטוחים',
        icon: 'CreditCard'
      },
      {
        title: 'מעקב משלוחים',
        description: 'מעקב בזמן אמת אחר סטטוס הזמנות',
        icon: 'Package'
      },
      {
        title: 'המלצות AI',
        description: 'המלצות מוצרים מותאמות אישית',
        icon: 'Zap'
      }
    ],
    
    liveUrl: 'https://techstart.co.il',
    demoUrl: 'https://demo.techstart.co.il',
    
    client: 'TechStart Ltd',
    clientIndustry: 'טכנולוגיה',
    
    testimonial: {
      content: 'הפלטפורמה החדשה הגדילה את המכירות שלנו ב-150% תוך 3 חודשים!',
      author: 'מיכל לוי',
      role: 'מנהלת מכירות',
      company: 'TechStart Ltd',
      rating: 5
    },
    
    status: 'completed',
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    
    stats: {
      duration: '3.5 חודשים',
      teamSize: 5,
      features: 30,
      performance: '100ms load time',
      users: '10,000+ רכישות'
    }
  },
  
  {
    // HealthConnect - Mobile App
    id: 'health-connect',
    slug: 'health-connect',
    title: 'HealthConnect',
    subtitle: 'אפליקציית בריאות דיגיטלית',
    description: 'אפליקציה לניהול בריאות אישי עם מעקב תרופות, תזכורות ותקשורת עם רופאים',
    longDescription: 'אפליקציית מובייל מקיפה לניהול בריאות אישי הכוללת מעקב תרופות, תזכורות לבדיקות, יומן בריאות ותקשורת ישירה עם צוות רפואי.',
    
    category: 'mobile-app',
    tags: ['בריאות', 'מובייל', 'IoT', 'תזכורות'],
    featured: true,
    order: 3,
    
    thumbnail: '/images/portfolio/healthconnect-thumb.jpg',
    images: [
      { src: '/images/portfolio/healthconnect-1.jpg', alt: 'מסך ראשי', type: 'mobile', primary: true },
      { src: '/images/portfolio/healthconnect-2.jpg', alt: 'מעקב תרופות', type: 'mobile' },
      { src: '/images/portfolio/healthconnect-3.jpg', alt: 'יומן בריאות', type: 'mobile' },
      { src: '/images/portfolio/healthconnect-tablet.jpg', alt: 'גרסת טאבלט', type: 'tablet' }
    ],
    color: '#10B981',
    
    technologies: [
      { name: 'React Native', type: 'frontend' },
      { name: 'Firebase', type: 'backend' },
      { name: 'Node.js', type: 'backend' },
      { name: 'MongoDB', type: 'database' },
      { name: 'Push Notifications', type: 'api' }
    ],
    
    features: [
      {
        title: 'מעקב תרופות',
        description: 'ניהול ומעקב אחר לקיחת תרופות עם תזכורות',
        icon: 'Bell'
      },
      {
        title: 'יומן בריאות',
        description: 'תיעוד מדדים ותסמינים יומיים',
        icon: 'Calendar'
      },
      {
        title: 'תקשורת עם רופאים',
        description: 'צאט מאובטח עם הצוות הרפואי',
        icon: 'Mail'
      },
      {
        title: 'דוחות רפואיים',
        description: 'יצירת דוחות מפורטים לביקורי רופא',
        icon: 'FileText'
      }
    ],
    
    liveUrl: 'https://apps.apple.com/healthconnect',
    
    client: 'קופת חולים כללית',
    clientIndustry: 'בריאות',
    
    status: 'maintenance',
    startDate: '2023-11-01',
    endDate: '2024-02-28',
    
    stats: {
      duration: '4 חודשים',
      teamSize: 6,
      features: 35,
      users: '50,000+ הורדות'
    }
  },
  
  {
    // ModernLaw - Corporate Site
    id: 'modernlaw',
    slug: 'modernlaw',
    title: 'ModernLaw',
    subtitle: 'אתר משרד עורכי דין',
    description: 'אתר תדמית מקצועי למשרד עורכי דין עם מערכת ניהול תיקים',
    longDescription: 'אתר תאגידי מלא למשרד עורכי דין הכולל הצגת שירותים, פרופילי עורכי דין, בלוג משפטי ומערכת פניות מתקדמת.',
    
    category: 'corporate-site',
    tags: ['משפט', 'תדמית', 'בלוג', 'SEO'],
    featured: false,
    order: 4,
    
    thumbnail: '/images/portfolio/modernlaw-thumb.jpg',
    images: [
      { src: '/images/portfolio/modernlaw-1.jpg', alt: 'דף הבית', type: 'desktop', primary: true },
      { src: '/images/portfolio/modernlaw-2.jpg', alt: 'אודות', type: 'desktop' },
      { src: '/images/portfolio/modernlaw-mobile.jpg', alt: 'מובייל', type: 'mobile' }
    ],
    color: '#1E40AF',
    
    technologies: [
      { name: 'WordPress', type: 'frontend' },
      { name: 'Custom Theme', type: 'frontend' },
      { name: 'MySQL', type: 'database' },
      { name: 'CloudFlare', type: 'deployment' }
    ],
    
    features: [
      {
        title: 'מערכת פניות',
        description: 'טופס יצירת קשר מתקדם עם ניתוב אוטומטי',
        icon: 'Mail'
      },
      {
        title: 'בלוג משפטי',
        description: 'מערכת ניהול תוכן לפרסום מאמרים',
        icon: 'FileText'
      },
      {
        title: 'SEO מותאם',
        description: 'אופטימיזציה מלאה למנועי חיפוש',
        icon: 'Search'
      }
    ],
    
    liveUrl: 'https://modernlaw.co.il',
    
    client: 'ModernLaw & Co',
    clientIndustry: 'משפט',
    
    status: 'completed',
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    
    stats: {
      duration: '1.5 חודשים',
      teamSize: 3
    }
  },
  
  {
    // FitLife - Landing Page
    id: 'fitlife',
    slug: 'fitlife',
    title: 'FitLife',
    subtitle: 'דף נחיתה לסטודיו כושר',
    description: 'דף נחיתה ממיר עם מערכת הרשמה לשיעורים',
    longDescription: 'דף נחיתה דינמי לסטודיו כושר עם הצגת מערכת שיעורים, פרופילי מאמנים, חבילות מנויים ומערכת הרשמה אונליין.',
    
    category: 'landing-page',
    tags: ['כושר', 'נחיתה', 'המרות', 'אנימציות'],
    featured: false,
    order: 5,
    
    thumbnail: '/images/portfolio/fitlife-thumb.jpg',
    images: [
      { src: '/images/portfolio/fitlife-1.jpg', alt: 'דף נחיתה', type: 'desktop', primary: true },
      { src: '/images/portfolio/fitlife-mobile.jpg', alt: 'מובייל', type: 'mobile' }
    ],
    color: '#F59E0B',
    
    technologies: [
      { name: 'HTML5', type: 'frontend' },
      { name: 'CSS3', type: 'frontend' },
      { name: 'JavaScript', type: 'frontend' },
      { name: 'GSAP', type: 'frontend' }
    ],
    
    features: [
      {
        title: 'הרשמה מהירה',
        description: 'טופס הרשמה חכם עם תיקוף בזמן אמת',
        icon: 'CheckCircle'
      },
      {
        title: 'אנימציות',
        description: 'אנימציות מרהיבות להגברת המעורבות',
        icon: 'Zap'
      }
    ],
    
    liveUrl: 'https://fitlife.co.il',
    
    client: 'FitLife Studio',
    clientIndustry: 'ספורט וכושר',
    
    status: 'completed',
    startDate: '2024-04-10',
    endDate: '2024-04-25',
    
    stats: {
      duration: '2 שבועות',
      teamSize: 2,
      performance: '95% conversion rate'
    }
  },
  
  {
    // SmartRetail - Custom System
    id: 'smart-retail',
    slug: 'smart-retail',
    title: 'SmartRetail POS',
    subtitle: 'מערכת קופה חכמה',
    description: 'מערכת נקודות מכירה מתקדמת לרשתות קמעונאיות',
    longDescription: 'פתרון POS מקיף לרשתות קמעונאיות הכולל ניהול מכירות, מלאי, לקוחות, מבצעים ודוחות בזמן אמת עם סנכרון בין סניפים.',
    
    category: 'custom-system',
    tags: ['POS', 'קמעונאות', 'מלאי', 'תשלומים'],
    featured: false,
    order: 6,
    
    thumbnail: '/images/portfolio/smartretail-thumb.jpg',
    images: [
      { src: '/images/portfolio/smartretail-1.jpg', alt: 'מסך קופה', type: 'tablet', primary: true },
      { src: '/images/portfolio/smartretail-2.jpg', alt: 'ניהול מלאי', type: 'desktop' }
    ],
    color: '#8B5CF6',
    
    technologies: [
      { name: 'Vue.js', type: 'frontend' },
      { name: 'Electron', type: 'frontend' },
      { name: 'Express', type: 'backend' },
      { name: 'PostgreSQL', type: 'database' },
      { name: 'Socket.io', type: 'api' }
    ],
    
    features: [
      {
        title: 'מכירה מהירה',
        description: 'ממשק קופה אינטואיטיבי ומהיר',
        icon: 'Zap'
      },
      {
        title: 'סנכרון סניפים',
        description: 'עדכון מלאי ומחירים בזמן אמת',
        icon: 'Cloud'
      },
      {
        title: 'ניהול מבצעים',
        description: 'יצירת מבצעים והנחות גמישות',
        icon: 'Target'
      },
      {
        title: 'דוחות מפורטים',
        description: 'ניתוח מכירות ומגמות',
        icon: 'BarChart'
      }
    ],
    
    client: 'SmartRetail Chain',
    clientIndustry: 'קמעונאות',
    
    status: 'in-progress',
    startDate: '2024-05-01',
    
    stats: {
      teamSize: 7,
      features: 40
    }
  }
];

// Helper functions
export function getAllProjects(): Project[] {
  return portfolioData.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = portfolioData.filter(p => p.featured).sort((a, b) => a.order - b.order);
  return limit ? featured.slice(0, limit) : featured;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolioData.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return portfolioData.filter(p => p.category === category).sort((a, b) => a.order - b.order);
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const currentProject = getProjectBySlug(currentSlug);
  if (!currentProject) return [];
  
  return portfolioData
    .filter(p => 
      p.slug !== currentSlug && 
      (p.category === currentProject.category || 
       p.tags.some(tag => currentProject.tags.includes(tag)))
    )
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
}

export function getProjectCategories(): { id: ProjectCategory; name: string; count: number }[] {
  const categories: Record<ProjectCategory, { name: string; count: number }> = {
    'web-development': { name: 'פיתוח אתרים', count: 0 },
    'mobile-app': { name: 'אפליקציות', count: 0 },
    'e-commerce': { name: 'מסחר אלקטרוני', count: 0 },
    'management-system': { name: 'מערכות ניהול', count: 0 },
    'landing-page': { name: 'דפי נחיתה', count: 0 },
    'corporate-site': { name: 'אתרי תדמית', count: 0 },
    'custom-system': { name: 'מערכות ייעודיות', count: 0 }
  };
  
  portfolioData.forEach(project => {
    if (categories[project.category]) {
      categories[project.category].count++;
    }
  });
  
  return Object.entries(categories)
    .map(([id, data]) => ({ id: id as ProjectCategory, ...data }))
    .filter(cat => cat.count > 0);
}

export function searchProjects(query: string): Project[] {
  const lowerQuery = query.toLowerCase();
  return portfolioData.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    p.client.toLowerCase().includes(lowerQuery)
  );
}