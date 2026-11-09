import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import siteConfig from '../data/siteConfig.json';
import { trackEvent } from '../lib/analytics';

export default function ExpressInterest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-fill category if passed from quiz or URL
  const initialCategory = searchParams.get('category') || '';
  const initialQuiz = searchParams.get('quiz') || '';

  const [formData, setFormData] = useState({
    email: '',
    interestCategory: ['Attending', 'Competing', 'Both'].includes(initialCategory)
      ? initialCategory
      : '',
    name: '',
    institution: '',
    consent: false,
    updatesOptIn: false,
    _hp: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Track form_start on first user interaction
  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('form_start', { page: '/express-interest' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.interestCategory) {
      errs.interestCategory = 'Please choose how you plan to participate.';
    }

    if (!formData.consent) {
      errs.consent = 'You must agree to the academic data terms to continue.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      trackEvent('form_error', { error_type: 'client_validation' });
      return;
    }

    setIsSubmitting(true);

    // Retrieve UTM and session metadata
    let utm = {};
    let referrer = '';
    let landingPath = '';
    let quizResult = initialQuiz;

    try {
      const storedUtm = sessionStorage.getItem('xp_utm');
      if (storedUtm) utm = JSON.parse(storedUtm);
      referrer = sessionStorage.getItem('xp_referrer') || document.referrer || '';
      landingPath = sessionStorage.getItem('xp_landing') || '';
      if (!quizResult) {
        quizResult = sessionStorage.getItem('xp_quiz_result') || '';
      }
    } catch {
      // Safe fallback
    }

    const payload = {
      email: formData.email.trim().toLowerCase(),
      interestCategory: formData.interestCategory,
      name: formData.name.trim() || undefined,
      institution: formData.institution.trim() || undefined,
      consent: formData.consent,
      updatesOptIn: formData.updatesOptIn,
      _hp: formData._hp || undefined,
      utm_source: utm.utm_source || undefined,
      utm_medium: utm.utm_medium || undefined,
      utm_campaign: utm.utm_campaign || undefined,
      utm_content: utm.utm_content || undefined,
      referrer: referrer || undefined,
      landingPath: landingPath || undefined,
      quizResult: quizResult || undefined,
    };

    const apiUrl = import.meta.env.VITE_API_URL || 'https://xpressions-microsite.onrender.com';

    try {
      const res = await fetch(`${apiUrl}/api/interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        trackEvent('form_submit_success', {
          interest_category: formData.interestCategory,
          quiz_result: quizResult || 'none',
        });
        navigate('/thank-you', {
          state: {
            interestCategory: formData.interestCategory,
            name: formData.name,
          },
        });
      } else {
        const errorMsg = json.message || 'Submission failed. Please check your details.';
        setServerError(errorMsg);
        trackEvent('form_error', { error_type: 'server_rejection' });
      }
    } catch (err) {
      setServerError('Unable to connect to the server right now. Free-tier hosts may be waking up.');
      trackEvent('form_error', { error_type: 'network_error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="pt-24 pb-16">
      <Helmet>
        <title>Register Your Interest – Xpressions | XIMB</title>
        <meta
          name="description"
          content="Express your non-binding interest for Xpressions at XIMB. Receive notifications when official passes and competitions open."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/express-interest" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            Student Project Portal
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-paper tracking-tight">
            Register Your Interest
          </h1>
          <p className="text-sm sm:text-base text-paper/75 font-body">
            Stay in the loop as official dates, pass releases on Luma, and Unstop competition entries are confirmed.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl bg-paper/[0.04] border border-paper/15 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Prominent Notice Banner */}
          <div className="p-4 rounded-xl bg-amber/10 border border-amber/30 text-amber text-xs sm:text-sm font-body leading-relaxed mb-8 flex items-start gap-3">
            <span className="text-base leading-none">⚠️</span>
            <p>
              <strong>Notice:</strong> This is a student-project expression of interest. It does not reserve a pass or register you for a competition.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot hidden input */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_hp">Do not fill this</label>
              <input
                id="_hp"
                type="text"
                name="_hp"
                value={formData._hp}
                onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Email (Required) */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-heading font-bold uppercase tracking-wider text-paper/90">
                Email Address <span className="text-amber">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onFocus={handleFocus}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full px-4 py-3 rounded-lg bg-navy border ${
                  errors.email ? 'border-red-400 focus:ring-red-400' : 'border-paper/20 focus:ring-amber'
                } text-paper text-sm font-body focus-visible:outline-none focus-visible:ring-2`}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-400 font-body">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Interest Category (Required) */}
            <div className="space-y-2">
              <fieldset onFocus={handleFocus}>
                <legend className="block text-xs font-heading font-bold uppercase tracking-wider text-paper/90 mb-2">
                  I Am Primarily Interested In: <span className="text-amber">*</span>
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'Attending', label: 'Attending Only' },
                    { val: 'Competing', label: 'Competing in Events' },
                    { val: 'Both', label: 'Both' },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.interestCategory === opt.val
                          ? 'bg-teal/20 border-teal text-paper'
                          : 'bg-paper/[0.02] border-paper/15 text-paper/70 hover:border-paper/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interestCategory"
                        value={opt.val}
                        checked={formData.interestCategory === opt.val}
                        onChange={(e) => {
                          setFormData({ ...formData, interestCategory: e.target.value });
                          if (errors.interestCategory) setErrors({ ...errors, interestCategory: null });
                        }}
                        className="text-teal focus:ring-amber h-4 w-4"
                      />
                      <span className="font-heading font-semibold text-xs sm:text-sm">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {errors.interestCategory && (
                <p className="text-xs text-red-400 font-body">
                  {errors.interestCategory}
                </p>
              )}
            </div>

            {/* Name (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-heading font-bold uppercase tracking-wider text-paper/90">
                Full Name <span className="text-paper/40 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Alex Kumar"
                value={formData.name}
                onFocus={handleFocus}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-navy border border-paper/20 text-paper text-sm font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              />
            </div>

            {/* Institution (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="institution" className="block text-xs font-heading font-bold uppercase tracking-wider text-paper/90">
                College / University <span className="text-paper/40 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="institution"
                type="text"
                placeholder="e.g., XIMB, IIM Calcutta, etc."
                value={formData.institution}
                onFocus={handleFocus}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-navy border border-paper/20 text-paper text-sm font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              />
            </div>

            {/* Required Consent Checkbox */}
            <div className="space-y-1.5 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (errors.consent) setErrors({ ...errors, consent: null });
                  }}
                  className="mt-1 h-4 w-4 text-teal rounded border-paper/30 focus:ring-amber cursor-pointer"
                />
                <span className="text-xs text-paper/80 font-body leading-relaxed">
                  I consent to the collection of my email strictly for this university digital marketing academic project ({siteConfig.groupLabel}). No commercial data sales or unsolicited spam will occur. Records are purged automatically by retention policy (November 2028). Contact: xpressions.group7@placeholder.example. <span className="text-amber">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-red-400 font-body pl-7">
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Optional Updates Checkbox */}
            <div className="space-y-1.5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.updatesOptIn}
                  onChange={(e) => setFormData({ ...formData, updatesOptIn: e.target.checked })}
                  className="mt-1 h-4 w-4 text-teal rounded border-paper/30 focus:ring-amber cursor-pointer"
                />
                <span className="text-xs text-paper/70 font-body leading-relaxed">
                  (Optional) Send me an email notification when verified festival dates and official pass links open.
                </span>
              </label>
            </div>

            {/* Server Error Display */}
            {serverError && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs sm:text-sm font-body space-y-2"
              >
                <p>{serverError}</p>
                <p className="text-paper/60 text-xs">
                  Having trouble? You can directly email our project team at{' '}
                  <a
                    href="mailto:xpressions.group7@placeholder.example?subject=Xpressions%20Interest"
                    className="underline text-teal"
                  >
                    xpressions.group7@placeholder.example
                  </a>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-heading font-bold text-base text-white transition-all shadow-xl min-h-[50px] flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-teal/50 cursor-not-allowed'
                    : 'bg-teal hover:bg-teal/90 active:scale-[0.99] shadow-teal/20'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Interest...</span>
                  </>
                ) : (
                  <span>Register Interest</span>
                )}
              </button>
            </div>

            {/* Repeated disclaimer */}
            <p className="text-[11px] text-paper/40 text-center italic font-body">
              Reminder: This is a student-project expression of interest. It does not reserve a pass or register you for a competition.
            </p>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
