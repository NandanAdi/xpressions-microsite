import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';

export default function NotFound() {
  return (
    <PageTransition className="min-h-[85vh] flex items-center justify-center pt-20 pb-12 px-4">
      <Helmet>
        <title>404 – Stage Not Found | Xpressions</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="text-center max-w-md mx-auto space-y-6">
        {/* Signature X Motif in 404 */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-28 h-8 rounded-full bg-teal rotate-45 transform" />
            <div className="w-28 h-8 rounded-full bg-amber -rotate-45 transform" />
          </div>
          <span className="font-heading font-black text-6xl text-paper relative z-10">
            404
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-paper tracking-tight">
            This Stage Is Dark
          </h1>
          <p className="text-sm text-paper/70 font-body">
            The page or event link you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-teal text-white font-heading font-bold text-sm hover:bg-teal/90 min-h-[44px]"
          >
            ← Return To Main Stage
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

