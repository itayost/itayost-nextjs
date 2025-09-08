// Src/components/sections/Contact.tsx


import {motion } from 'framer-motion';
import { useState } from "react";

interface ContactProperties {
  locale?: "en" | 'he';
}

export default function Contact({locale = 'en' }: ContactProps) {
  const isRTL = locale === 'he';
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

  const content = {
    en: {
      label: '04 — Get In Touch',
      title1: "Let's",
      title2: 'Create', // Outline text
      title3: 'Together',
      subtitle: 'Ready to transform your digital presence? Wed love to hear about your project.',
      form: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        project: 'Project Type',
        budget: 'Budget Range',
        message: 'Tell us about your project',
        submit: 'Send Message'
      },
      projectTypes: [
        'Web Development',
        'Mobile App',
        'UI/UX Design',
        'Digital Strategy',
        'Other'
      ],
      budgetRanges: [
        '$10k - $25k',
        '$25k - $50k',
        '$50k - $100k',
        '$100k+'
      ],
      contact: {
        email: 'hello@itayost.com',
        phone: '+972 54 123 4567',
        location: 'Tel Aviv, Israel'
      }
    },
    he: {
      label: '04 — צור קשר',
      title1: 'בואו',
      title2: 'ניצור', // Outline text
      title3: 'ביחד',
      subtitle: 'מוכנים לשנות את הנוכחות הדיגיטלית שלכם? נשמח לשמוע על הפרויקט שלכם.',
      form: {
        name: 'שם',
        email: 'אימייל',
        company: 'חברה',
        project: 'סוג פרויקט',
        budget: 'טווח תקציב',
        message: 'ספרו לנו על הפרויקט שלכם',
        submit: 'שלח הודעה'
      },
      projectTypes: [
        'פיתוח ווב',
        'אפליקציית מובייל',
        'עיצוב UI/UX',
        'אסטרטגיה דיגיטלית',
        'אחר'
      ],
      budgetRanges: [
        '$10k - $25k',
        '$25k - $50k',
        '$50k - $100k',
        '$100k+'
      ],
      contact: {
        email: 'hello@itayost.com',
        phone: '+972 54 123 4567',
        location: 'תל אביב, ישראל'
      }
    }
  };

  const text = content[locale];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1.0]
      }
    }
  };

  return (
    <section 
      className="py-32 bg-gray-900 relative overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(0, 217, 255, 0.05) 50%, transparent 60%)`,
            backgroundSize: '200% 200%',
            animation: 'gradient 15s ease infinite'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-32 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-24"
        >
          <motion.span 
            variants={itemVariants}
            className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium"
          >
            {text.label}
          </motion.span>
          
          <motion.h2 
            variants={itemVariants}
            className="mt-4"
          >
            <span 
              className="block text-white font-bold"
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Space Grotesk, Inter, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: isRTL ? '0' : '-0.03em',
                lineHeight: '1'
              }}
            >
              {text.title1}
            </span>
            <span 
              className="block font-bold"
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Space Grotesk, Inter, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: isRTL ? '0' : '-0.03em',
                lineHeight: '1',
                WebkitTextStroke: '2px rgba(0, 217, 255, 0.5)',
                WebkitTextFillColor: 'transparent',
              
                color: 'transparent'
              }}
            >
              {text.title2}
            </span>
            <span 
              className="block text-white font-bold"
              style={{
                fontFamily: isRTL 
                  ? 'Heebo, Rubik, -apple-system, sans-serif' 
                  : 'Space Grotesk, Inter, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: isRTL ? '0' : '-0.03em',
                lineHeight: '1'
              }}
            >
              {text.title3}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-300 text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: isRTL 
                ? 'Heebo, Rubik, -apple-system, sans-serif' 
                : 'Inter, -apple-system, sans-serif',
              lineHeight: isRTL ? '1.8' : '1.7'
            }}
          >
            {text.subtitle}
          </motion.p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Form - Takes 3 columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={text.form.name}
                    onFocus={() => setHoveredField('name')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 transition-colors duration-300 outline-none"
                    style={{
                      fontFamily: isRTL 
                        ? 'Heebo, Rubik, -apple-system, sans-serif' 
                        : 'Inter, -apple-system, sans-serif'
                    }}
                  />
                  <motion.div
                    className="h-px bg-cyan-400 mt-[-1px]"
                    initial={{ width: '0%' }}
                    animate={{ width: hoveredField === 'name' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={text.form.email}
                    onFocus={() => setHoveredField('email')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 transition-colors duration-300 outline-none"
                    style={{
                      fontFamily: isRTL 
                        ? 'Heebo, Rubik, -apple-system, sans-serif' 
                        : 'Inter, -apple-system, sans-serif'
                    }}
                  />
                  <motion.div
                    className="h-px bg-cyan-400 mt-[-1px]"
                    initial={{ width: '0%' }}
                    animate={{ width: hoveredField === 'email' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Company Field */}
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={text.form.company}
                  onFocus={() => setHoveredField('company')}
                  onBlur={() => setHoveredField(null)}
                  className="w-full px-0 py-4 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 transition-colors duration-300 outline-none"
                  style={{
                    fontFamily: isRTL 
                      ? 'Heebo, Rubik, -apple-system, sans-serif' 
                      : 'Inter, -apple-system, sans-serif'
                  }}
                />
                <motion.div
                  className="h-px bg-cyan-400 mt-[-1px]"
                  initial={{ width: '0%' }}
                  animate={{ width: hoveredField === 'company' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Project Type & Budget Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    onFocus={() => setHoveredField('project')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b border-gray-700 text-white focus:border-cyan-400 transition-colors duration-300 outline-none cursor-pointer"
                    style={{
                      fontFamily: isRTL 
                        ? 'Heebo, Rubik, -apple-system, sans-serif' 
                        : 'Inter, -apple-system, sans-serif'
                    }}
                  >
                    <option value="" className="bg-gray-900">{text.form.project}</option>
                    {text.projectTypes.map((type, index) => (
                      <option key={index} value={type} className="bg-gray-900">
                        {type}
                      </option>
                    ))}
                  </select>
                  <motion.div
                    className="h-px bg-cyan-400 mt-[-1px]"
                    initial={{ width: '0%' }}
                    animate={{ width: hoveredField === 'project' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onFocus={() => setHoveredField('budget')}
                    onBlur={() => setHoveredField(null)}
                    className="w-full px-0 py-4 bg-transparent border-b border-gray-700 text-white focus:border-cyan-400 transition-colors duration-300 outline-none cursor-pointer"
                    style={{
                      fontFamily: isRTL 
                        ? 'Heebo, Rubik, -apple-system, sans-serif' 
                        : 'Inter, -apple-system, sans-serif'
                    }}
                  >
                    <option value="" className="bg-gray-900">{text.form.budget}</option>
                    {text.budgetRanges.map((range, index) => (
                      <option key={index} value={range} className="bg-gray-900">
                        {range}
                      </option>
                    ))}
                  </select>
                  <motion.div
                    className="h-px bg-cyan-400 mt-[-1px]"
                    initial={{ width: '0%' }}
                    animate={{ width: hoveredField === 'budget' ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div variants={itemVariants}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={text.form.message}
                  rows={4}
                  onFocus={() => setHoveredField('message')}
                  onBlur={() => setHoveredField(null)}
                  className="w-full px-0 py-4 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400 transition-colors duration-300 outline-none resize-none"
                  style={{
                    fontFamily: isRTL 
                      ? 'Heebo, Rubik, -apple-system, sans-serif' 
                      : 'Inter, -apple-system, sans-serif'
                  }}
                />
                <motion.div
                  className="h-px bg-cyan-400 mt-[-1px]"
                  initial={{ width: '0%' }}
                  animate={{ width: hoveredField === 'message' ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-4 bg-cyan-400 text-black font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:bg-cyan-500"
                  style={{
                    fontFamily: 'Inter, -apple-system, sans-serif'
                  }}
                >
                  {text.form.submit}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Direct Contact */}
            <div>
              <h3 className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium mb-6">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <a 
                  href={`mailto:${text.contact.email}`}
                  className="block text-white text-xl hover:text-cyan-400 transition-colors duration-300"
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif'
                  }}
                >
                  {text.contact.email}
                </a>
                <a 
                  href={`tel:${text.contact.phone.replace(/\s/g, '')}`}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {text.contact.phone}
                </a>
                <p className="text-gray-400">
                  {text.contact.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-cyan-400 text-sm uppercase tracking-[0.2em] font-medium mb-6">
                Connect
              </h3>
              <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {['LinkedIn', 'GitHub', 'Dribbble', 'Twitter'].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm uppercase tracking-wider"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="pt-8 border-t border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-gray-400 text-sm">
                  {locale === 'he' ? 'זמינים לפרויקטים חדשים' : 'Available for new projects'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}