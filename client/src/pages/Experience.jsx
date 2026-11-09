import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import Gallery from '../components/sections/Gallery';
import PreFestEvents from '../components/sections/PreFestEvents';
import EditionTimeline from '../components/sections/EditionTimeline';
import VideoFacade from '../components/sections/VideoFacade';
import SocialInitiatives from '../components/sections/SocialInitiatives';

export default function Experience() {
  return (
    <PageTransition className="pt-24 pb-16">
      <Helmet>
        <title>Experience & Highlights – Xpressions | XIMB</title>
        <meta
          name="description"
          content="Explore past edition moments, edition timelines, festival highlights, and social impact initiatives from Xpressions at XIMB."
        />
        <link rel="canonical" href="https://xpressions-g7.vercel.app/experience" />
      </Helmet>

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="max-w-3xl">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            The Fest Experience
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-6xl text-paper tracking-tight mt-2 mb-4">
            Energy. Artistry. Community.
          </h1>
          <p className="text-base sm:text-lg text-paper/75 font-body leading-relaxed">
            Relive the memories, explore our verified edition timeline, and discover the community initiatives that define the Xpressions legacy.
          </p>
        </div>

        {/* Video Facade */}
        <div className="mt-10">
          <VideoFacade
            videoId="dQw4w9WgXcQ"
            title="Xpressions Highlights & Stage Atmosphere"
          />
        </div>
      </div>

      {/* Gallery */}
      <Gallery />

      {/* Pre-Fest Campus Events (Garba Night & Halloween Night) */}
      <PreFestEvents />

      {/* Edition Timeline */}
      <EditionTimeline />

      {/* Social Initiatives (X-Athon & X-Enable only) */}
      <SocialInitiatives />
    </PageTransition>
  );
}

