import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/hero/HeroSection';
import ProofStrip from '../components/sections/ProofStrip';
import FourWorlds from '../components/sections/FourWorlds';
import PreFestEvents from '../components/sections/PreFestEvents';
import FindMyStage from '../components/sections/FindMyStage';
import Marquee from '../components/ui/Marquee';
import HighlightsStrip from '../components/sections/HighlightsStrip';
import ClosingCTA from '../components/sections/ClosingCTA';
import headlinersData from '../data/headliners.json';
import siteConfig from '../data/siteConfig.json';

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Xpressions – Find Your Stage | XIMB Annual Fest</title>
        <meta
          name="description"
          content="Find your stage at Xpressions, the flagship annual management-cultural fest of Xavier Institute of Management (XIMB), XIM University, Bhubaneswar."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/" />

        {/* Generate JSON-LD Event structured data ONLY when datesConfirmed is true */}
        {siteConfig.datesConfirmed && siteConfig.eventDates && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Festival',
              name: 'Xpressions',
              location: {
                '@type': 'Place',
                name: siteConfig.venueLabel,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Xavier Square, Jayadev Vihar',
                  addressLocality: 'Bhubaneswar',
                  postalCode: '751013',
                  addressCountry: 'IN',
                },
              },
              organizer: {
                '@type': 'Organization',
                name: 'XIMB, XIM University',
                url: 'https://www.ximb.ac.in/',
              },
            })}
          </script>
        )}
      </Helmet>

      {/* 3D Hero Section */}
      <HeroSection />

      {/* Proof Strip with Count-Ups */}
      <ProofStrip />

      {/* Four Worlds (CSS 3D tilt) */}
      <FourWorlds />

      {/* Campus Buzz & Pre-Fest Events Showcase */}
      <PreFestEvents />

      {/* Find My Stage 3-Question Mini-Quiz */}
      <FindMyStage />

      {/* Past Headliners Marquee */}
      <Marquee items={headlinersData} label="Past Celeblitz headliners" />

      {/* Highlights Strip */}
      <HighlightsStrip />

      {/* Closing CTA */}
      <ClosingCTA />
    </PageTransition>
  );
}

