import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Clock, MapPin, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import portfolioData from '../data/portfolio.js';
import { validateContactForm, buildMailtoUrl, ContactFormState } from '../utils/portfolioUtils';
import useReducedMotion from '../hooks/useReducedMotion';
import MaskRevealTitle from './MaskRevealTitle';

export function Contact() {
  const { contact, personal } = portfolioData;
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<keyof ContactFormState, string>>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user types
    if (errors[name as keyof ContactFormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Build the mailto url
    const mailtoUrl = buildMailtoUrl(
      personal.email,
      formData.subject,
      formData.name,
      formData.message
    );

    // Open user's default email client
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({ name: '', email: '', subject: '', message: '' });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-b border-[#e5e5e5] dark:border-[#27272a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#6b7280] dark:text-[#a1a1aa] mb-2">
            <Mail className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{contact.eyebrow}</span>
          </div>
          {/* Section title with bottom-to-top clip-path mask wipe */}
          <MaskRevealTitle className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#ffffff] mb-3">
            {contact.title}
          </MaskRevealTitle>
          <p className="text-sm text-[#6b7280] dark:text-[#a1a1aa] max-w-xl">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Container */}
          <div className="lg:col-span-7 bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-12 h-12 mx-auto bg-[#4F46E5] text-white flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#111111] dark:text-[#ffffff] tracking-tight">
                  Mail Client Dispatched
                </h3>
                <p className="text-sm text-[#464555] dark:text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
                  Your mail app should have opened with your composed inquiry addressed to{' '}
                  <strong className="text-[#111111] dark:text-[#ffffff] font-mono">{personal.email}</strong>.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-mono font-semibold px-4 py-2 border border-[#111111] dark:border-[#ffffff] text-[#111111] dark:text-[#ffffff] hover:bg-[#111111] hover:text-white dark:hover:bg-[#ffffff] dark:hover:text-[#111111] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-[#111111] dark:text-[#ffffff] mb-1.5"
                    >
                      Name <span className="text-[#4F46E5]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Elena Rostova"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#f9f9f8] dark:bg-[#0c0c0c] border ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#e5e5e5] dark:border-[#27272a] focus:border-[#4F46E5]'
                      } text-[#111111] dark:text-[#ffffff] placeholder:text-[#a3a3a3] dark:placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] transition-colors`}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-[#111111] dark:text-[#ffffff] mb-1.5"
                    >
                      Email Address <span className="text-[#4F46E5]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="elena@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#f9f9f8] dark:bg-[#0c0c0c] border ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#e5e5e5] dark:border-[#27272a] focus:border-[#4F46E5]'
                      } text-[#111111] dark:text-[#ffffff] placeholder:text-[#a3a3a3] dark:placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] transition-colors`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-[#111111] dark:text-[#ffffff] mb-1.5"
                  >
                    Subject <span className="text-[#4F46E5]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry / Collaborative Exploration"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#f9f9f8] dark:bg-[#0c0c0c] border ${
                      errors.subject ? 'border-red-500 bg-red-50/20' : 'border-[#e5e5e5] dark:border-[#27272a] focus:border-[#4F46E5]'
                    } text-[#111111] dark:text-[#ffffff] placeholder:text-[#a3a3a3] dark:placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] transition-colors`}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-[#111111] dark:text-[#ffffff] mb-1.5"
                  >
                    Message & Inquiry Details <span className="text-[#4F46E5]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, academic collaboration idea, or question..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm bg-[#f9f9f8] dark:bg-[#0c0c0c] border ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#e5e5e5] dark:border-[#27272a] focus:border-[#4F46E5]'
                    } text-[#111111] dark:text-[#ffffff] placeholder:text-[#a3a3a3] dark:placeholder:text-[#71717a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] transition-colors resize-y`}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-600 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] dark:bg-[#ffffff] text-white dark:text-[#111111] text-xs font-semibold hover:bg-[#333333] dark:hover:bg-[#e4e4e7] border border-[#111111] dark:border-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                  >
                    <span>Dispatch Transmission</span>
                    <Send className="w-3.5 h-3.5 text-[#dad7ff] dark:text-[#4F46E5]" />
                  </button>

                  <span className="font-mono text-[10px] sm:text-[11px] text-[#6b7280] dark:text-[#a1a1aa]">
                    PROTO: MAILTO / OPEN IN EMAIL CLIENT
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Contact Details & Metadata Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] p-6 sm:p-7">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#6b7280] dark:text-[#a1a1aa] mb-3">
                DIRECT CHANNELS
              </div>

              {/* Email with copy button */}
              <div className="mb-6 p-3 bg-[#f9f9f8] dark:bg-[#0c0c0c] border border-[#e5e5e5] dark:border-[#27272a] flex items-center justify-between gap-2">
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-[#6b7280] dark:text-[#a1a1aa] uppercase">
                    Primary Inbox
                  </div>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-xs sm:text-sm font-semibold text-[#111111] dark:text-[#ffffff] hover:text-[#4F46E5] transition-colors truncate block"
                  >
                    {personal.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 border border-[#e5e5e5] dark:border-[#27272a] hover:border-[#111111] dark:hover:border-[#ffffff] bg-white dark:bg-[#18181b] text-[#111111] dark:text-[#ffffff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
                  aria-label={copiedEmail ? 'Email copied' : 'Copy email address'}
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs text-[#464555] dark:text-[#a1a1aa]">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#111111] dark:text-[#ffffff] block font-semibold">Response Horizon</strong>
                    <span>{contact.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#4F46E5] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#111111] dark:text-[#ffffff] block font-semibold">Base Coordinates</strong>
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#e5e5e5] dark:border-[#27272a]">
                <div className="text-[10px] font-mono text-[#6b7280] dark:text-[#a1a1aa] uppercase mb-1">
                  AVAILABILITY STATUS
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#111111] dark:text-[#ffffff]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{personal.availability}</span>
                </div>
              </div>
            </div>

            {/* Verification / Fingerprint Card */}
            <div className="bg-[#ffffff] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#27272a] p-5 font-mono text-[11px] text-[#6b7280] dark:text-[#a1a1aa]">
              <div className="flex items-center justify-between text-[#111111] dark:text-[#ffffff] font-semibold mb-2">
                <span>IDENTITY FINGERPRINT</span>
                <span>SHA-256</span>
              </div>
              <p className="font-mono text-[#464555] dark:text-[#a1a1aa] break-all leading-relaxed">
                4D9B 813C E502 9FA1 8752 44CC 910F BE28 7A14 36E0
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
