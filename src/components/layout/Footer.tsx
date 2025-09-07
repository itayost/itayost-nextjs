// components/layout/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github,
  Twitter,
  ArrowLeft,
  Heart,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  services: [
    { label: 'פיתוח אתרים', href: '/services/web-development' },
    { label: 'אפליקציות', href: '/services/mobile-apps' },
    { label: 'חנויות אונליין', href: '/services/ecommerce' },
    { label: 'עיצוב UI/UX', href: '/services/ui-design' },
    { label: 'קידום אתרים', href: '/services/seo' },
    { label: 'תחזוקה', href: '/services/maintenance' },
  ],
  company: [
    { label: 'אודות', href: '/about' },
    { label: 'תיק עבודות', href: '/portfolio' },
    { label: 'בלוג', href: '/blog' },
    { label: 'קריירה', href: '/careers' },
    { label: 'צור קשר', href: '/contact' },
  ],
  legal: [
    { label: 'תנאי שימוש', href: '/terms' },
    { label: 'מדיניות פרטיות', href: '/privacy' },
    { label: 'נגישות', href: '/accessibility' },
    { label: 'Cookies', href: '/cookies' },
  ],
  resources: [
    { label: 'מדריכים', href: '/guides' },
    { label: 'תיעוד', href: '/docs' },
    { label: 'API', href: '/api-docs' },
    { label: 'שאלות נפוצות', href: '/faq' },
    { label: 'תמיכה', href: '/support' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };
  
  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/20 to-dark-950 pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full card-glass mb-6">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium">הישארו מעודכנים</span>
            </div>
            
            <h3 className="text-3xl font-bold mb-4">
              קבלו עדכונים וטיפים
            </h3>
            <p className="text-gray-400 mb-8">
              הצטרפו לרשימת התפוצה שלנו וקבלו תוכן בלעדי ועדכונים על טכנולוגיות חדשות
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="הכניסו את המייל שלכם"
                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-accent-purple focus:outline-none transition-all duration-300"
                required
              />
              <button 
                type="submit"
                className="btn-primary group"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    תודה!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    הרשמה
                    <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-accent-indigo rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-2xl">ItayOst</span>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-xs">
              פתרונות דיגיטליים מתקדמים לעסקים. 
              בונים את העתיד הדיגיטלי שלך עם טכנולוגיות חדשניות.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:0544994417" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>054-499-4417</span>
              </a>
              <a href="mailto:info@itayost.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@itayost.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>תל אביב, ישראל</span>
              </div>
            </div>
          </motion.div>
          
          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">שירותים</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">החברה</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">משאבים</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4">משפטי</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-sm text-center md:text-right"
            >
              <p>
                © {new Date().getFullYear()} ItayOst. כל הזכויות שמורות.
              </p>
              <p className="mt-1">
                נבנה עם <Heart className="w-3 h-3 inline text-accent-rose" /> בישראל
              </p>
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-2"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}