import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import { trackEvent } from '../lib/analytics';

export default function ThankYou() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const interestCategory = location.state?.interestCategory || 'Attending';
  const name = location.state?.name || '';

  const shareUrl = 'https://xpressions-g7.vercel.app/';
  const shareText = 'I just registered my interest for Xpressions at XIMB Bhubaneswar! Find your stage:';

  const handleShare = async (platform) => {
    trackEvent('share_click', { method: platform, page: '/thank-you' });

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: 'Xpressions – XIMB Fest',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else if (platform === 'whatsapp') {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        '_blank'
      );
    } else if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        '_blank'
      );
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <PageTransition className="pt-28 pb-20">
      <Helmet>
        <title>Interest Recorded – Xpressions | XIMB</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-teal/20 text-teal border border-teal/40 mx-auto flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase font-heading font-bold tracking-widest text-teal">
            Expression Recorded
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-paper tracking-tight">
            Thank you{name ? `, ${name}` : ''}!
          </h1>
          <p className="text-base sm:text-lg text-paper/80 font-body max-w-lg mx-auto leading-relaxed">
            We have successfully logged your interest ({interestCategory}). We will keep you informed as official festival dates and competition portals open.
          </p>
        </div>

        {/* Clear Non-Admission Disclaimer */}
        <div className="p-4 rounded-xl bg-paper/5 border border-paper/10 text-xs sm:text-sm text-paper/60 font-body max-w-lg mx-auto">
          <p>
            <strong>Please Note:</strong> This submission is recorded as part of our academic project. It does not constitute event registration, ticket purchase, or a reserved campus pass.
          </p>
        </div>

        {/* Share Section */}
        <div className="pt-6 border-t border-paper/10 space-y-4">
          <h2 className="font-heading font-bold text-lg text-paper">
            Spread The Word
          </h2>
          <p className="text-xs text-paper/60 font-body">
            Invite your college peers, batchmates, and club members to discover Xpressions:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                type="button"
                onClick={() => handleShare('native')}
                className="px-4 py-2.5 rounded-lg bg-teal text-white font-heading font-bold text-xs hover:bg-teal/90 min-h-[44px] flex items-center gap-2"
              >
                <span>Share via App</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleShare('whatsapp')}
              className="px-4 py-2.5 rounded-lg bg-[#25D366] text-navy font-heading font-bold text-xs hover:opacity-90 min-h-[44px] flex items-center gap-2"
            >
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => handleShare('linkedin')}
              className="px-4 py-2.5 rounded-lg bg-[#0077B5] text-white font-heading font-bold text-xs hover:opacity-90 min-h-[44px] flex items-center gap-2"
            >
              <span>LinkedIn</span>
            </button>

            <button
              type="button"
              onClick={() => handleShare('copy')}
              className="px-4 py-2.5 rounded-lg bg-paper/10 text-paper font-heading font-semibold text-xs hover:bg-paper/20 border border-paper/20 min-h-[44px] flex items-center gap-2"
            >
              <span>{copied ? 'Link Copied! ✓' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-4">
          <Link
            to="/competitions"
            className="text-sm font-heading font-bold text-amber hover:underline"
          >
            ← Explore Competitions Catalog
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
