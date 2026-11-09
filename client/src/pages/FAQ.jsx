import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import Accordion from '../components/ui/Accordion';
import siteConfig from '../data/siteConfig.json';

const FAQ_ITEMS = [
  {
    id: 'pass-vs-competition-vs-interest',
    question: 'What is the difference between registering interest, passes, and competition registration?',
    answer: (
      <div className="space-y-3 font-body">
        <p className="font-semibold text-paper">
          These three actions must never be confused:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-paper/80">
          <li>
            <strong className="text-teal">1. Expression of Interest (This Site):</strong> Non-binding expression recorded by our academic marketing project (Group 7). It alerts you when official dates or passes drop. It does <em>not</em> reserve a pass or register you for any competition.
          </li>
          <li>
            <strong className="text-amber">2. Festival Pass (Organiser-Managed):</strong> General festival entry is managed exclusively by the official fest committee, historically run on Luma.
          </li>
          <li>
            <strong className="text-paper">3. Competition Registration:</strong> Event-specific participation normally managed via Unstop (formerly Dare2Compete) per individual event rules and guidelines.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'pass-cost',
    question: 'How much do general entry passes cost?',
    answer: (
      <p>
        In past editions (e.g., Xpressions'25 on Luma), festival passes were completely free of charge and not for sale. Details for the upcoming edition are to be announced once the official student committee opens pass applications.
      </p>
    ),
  },
  {
    id: 'college-id-entry',
    question: 'Can XIM University and XIMB students enter directly?',
    answer: (
      <p>
        Historically (past edition rule, for reference), currently enrolled XIM students gained entry by displaying their valid college identity card. Rules for the upcoming edition will be published upon official verification.
      </p>
    ),
  },
  {
    id: 'dates-announcement',
    question: 'When will the upcoming edition dates be officially announced?',
    answer: (
      <p>
        Edition dates are currently <strong>to be announced</strong>. We do not publish speculative dates or countdowns until formally verified by institutional authorities.
      </p>
    ),
  },
  {
    id: 'participating-colleges',
    question: 'Who is eligible to compete in Xpressions events?',
    answer: (
      <p>
        Undergraduate, postgraduate, and B-school students from accredited institutions across India participate in Xpressions. Detailed team size and eligibility criteria for each competition will be linked directly to their Unstop listings once live.
      </p>
    ),
  },
  {
    id: 'pro-night-headliners',
    question: 'Who is performing at Celeblitz and EDM Night?',
    answer: (
      <p>
        The artist lineup for the upcoming edition is <strong>to be announced</strong>. While legends like Amit Trivedi, Sunidhi Chauhan, Vishal-Shekhar, and Darshan Raval have headlined past stages, no artist is confirmed for the next edition until official announcements are made.
      </p>
    ),
  },
  {
    id: 'project-disclaimer',
    question: 'Who created and maintains this microsite?',
    answer: (
      <p>
        This microsite is an educational university digital marketing initiative developed by {siteConfig.groupLabel} at Xavier Institute of Management (XIMB), XIM University. It serves to explore creative digital engagement and campaign tracking.
      </p>
    ),
  },
];

export default function FAQ() {
  return (
    <PageTransition className="pt-24 pb-16">
      <Helmet>
        <title>FAQ – Frequently Asked Questions | Xpressions</title>
        <meta
          name="description"
          content="Get answers on passes, event registrations, venue details, and the difference between project interest and official passes for Xpressions at XIMB."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/faq" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        <div>
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            Clarifications & Details
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-paper tracking-tight mt-2 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-paper/75 font-body leading-relaxed">
            Clear facts on pass regulations, competition registrations, and institutional guidelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="p-6 sm:p-8 rounded-2xl bg-paper/[0.03] border border-paper/10">
          <Accordion items={FAQ_ITEMS} />
        </div>

        {/* Contact Banner */}
        <div className="p-6 rounded-xl bg-paper/5 border border-paper/10 text-xs sm:text-sm text-paper/70 font-body space-y-2">
          <p className="font-heading font-bold text-paper text-base">Still have questions?</p>
          <p>
            Official institutional inquiries should be routed through official channels at{' '}
            <a href="https://www.ximb.ac.in/" target="_blank" rel="noopener noreferrer" className="underline text-teal">
              ximb.ac.in
            </a>{' '}
            or the official Instagram handle{' '}
            <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="underline text-teal">
              @ximbxpressions
            </a>.
          </p>
          <p className="text-paper/50 pt-1">
            For academic feedback regarding this student website: xpressions.group7@placeholder.example
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
