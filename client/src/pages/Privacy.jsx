import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import siteConfig from '../data/siteConfig.json';

export default function Privacy() {
  return (
    <PageTransition className="pt-24 pb-16">
      <Helmet>
        <title>Privacy Notice – Xpressions Student Project | XIMB</title>
        <meta
          name="description"
          content="Privacy notice and data retention guidelines for the Xpressions student digital marketing project."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/privacy" />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <div>
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            Academic Project Disclosure
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-paper tracking-tight mt-2 mb-4">
            Privacy Notice
          </h1>
          <p className="text-sm text-paper/60 font-body">
            Effective Date: October 2026 · Project retention scheduled until November 2028
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm sm:text-base text-paper/80 font-body leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-paper">
              1. Purpose of This Website
            </h2>
            <p>
              This website is an academic assignment produced by students of Xavier Institute of Management (XIMB), XIM University, Bhubaneswar for the course Digital Marketing (Group Project Part II, Step 3). Its objective is to model real-world digital campaign traffic, audience interest capture, and conversion measurement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-paper">
              2. What Data We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Interest Form Submissions:</strong> We collect your email address, participation preference (Attending, Competing, or Both), and optionally your name and college/institution name. We do <em>not</em> collect phone numbers, government ID documents, or payment details.
              </li>
              <li>
                <strong>Campaign & Referral Data:</strong> If you arrived via a campaign link, non-personal UTM parameters (source, medium, campaign) and referrer information are recorded to measure marketing channel efficacy.
              </li>
              <li>
                <strong>Anonymised Behavioral Analytics:</strong> With your consent, Google Analytics 4 tracks aggregated interactions (page views, button clicks, scroll depth). No personal identifiers or emails are ever sent to analytics engines.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-paper">
              3. Data Retention & Automatic Purge
            </h2>
            <p>
              Collected interest records are stored in a secure database equipped with a Time-To-Live (TTL) index set to expire upon completion of academic evaluation. All records will be automatically erased or manually purged no later than <strong>November 1, 2028</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-paper">
              4. Third-Party Services
            </h2>
            <p>
              This site links to external platforms including Google Maps, Luma (historical pass listings), Unstop (competition registration), and official social channels. Please review the independent privacy policies of those respective services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-bold text-xl text-paper">
              5. Contact & Data Removal
            </h2>
            <p>
              To request immediate deletion of your submitted interest record or ask questions regarding this student project, contact the student team at:
            </p>
            <p className="font-heading font-bold text-teal">
              xpressions.group7@placeholder.example
            </p>
            <p className="text-xs text-paper/50">
              Institutional affiliation: Xavier Institute of Management (XIMB), XIM University, Xavier Square, Jayadev Vihar, Bhubaneswar 751013.
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
