import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileCtaBar from './components/layout/MobileCtaBar';
import SkipLink from './components/layout/SkipLink';
import ConsentBanner from './components/ui/ConsentBanner';
import { pingHealth } from './lib/health';
import { useUTM } from './lib/useUTM';
import { useScrollDepth } from './lib/useScrollDepth';
import { trackEvent } from './lib/analytics';

const Home            = lazy(() => import('./pages/Home'));
const Experience      = lazy(() => import('./pages/Experience'));
const Competitions    = lazy(() => import('./pages/Competitions'));
const PlanYourVisit   = lazy(() => import('./pages/PlanYourVisit'));
const FAQ             = lazy(() => import('./pages/FAQ'));
const ExpressInterest = lazy(() => import('./pages/ExpressInterest'));
const ThankYou        = lazy(() => import('./pages/ThankYou'));
const Privacy         = lazy(() => import('./pages/Privacy'));
const NotFound        = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-navy" aria-label="Loading page">
      <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin" role="status" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  useUTM();
  useScrollDepth();

  // Ping API to wake sleeping server
  useEffect(() => { pingHealth(); }, []);

  // Cursor spotlight
  useEffect(() => {
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (isTouch) return;
    document.body.classList.add('spotlight-cursor');
    const handler = (e) => {
      document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handler);
      document.body.classList.remove('spotlight-cursor');
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackEvent('page_view', { page: location.pathname, title: document.title });
  }, [location.pathname]);

  return (
    <>
      <SkipLink />
      <ConsentBanner />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/"                  element={<Home />} />
              <Route path="/experience"        element={<Experience />} />
              <Route path="/competitions"      element={<Competitions />} />
              <Route path="/plan-your-visit"   element={<PlanYourVisit />} />
              <Route path="/faq"               element={<FAQ />} />
              <Route path="/express-interest"  element={<ExpressInterest />} />
              <Route path="/thank-you"         element={<ThankYou />} />
              <Route path="/privacy"           element={<Privacy />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
