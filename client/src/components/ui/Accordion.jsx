import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../../lib/analytics';

function AccordionItem({ id, question, answer, isOpen, onToggle, index }) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="border-b border-paper/10 last:border-b-0 py-1">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-body-${index}`}
          id={`faq-header-${index}`}
          className="w-full py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-paper hover:text-amber transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
        >
          <span>{question}</span>
          <span
            className={`p-1.5 rounded-full bg-paper/5 text-amber transition-transform duration-200 flex-shrink-0 ${
              isOpen ? 'rotate-180 bg-amber/20' : ''
            }`}
            aria-hidden="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-body-${index}`}
            role="region"
            aria-labelledby={`faq-header-${index}`}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 pt-1 text-sm sm:text-base text-paper/75 leading-relaxed font-body">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items = [] }) {
  const [openIds, setOpenIds] = useState(new Set());

  const handleToggle = (id, index) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        trackEvent('faq_open', { question_id: id || `faq_${index}` });
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-paper/10 border-t border-paper/10">
      {items.map((item, index) => {
        const itemId = item.id || `faq-${index}`;
        return (
          <AccordionItem
            key={itemId}
            id={itemId}
            index={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIds.has(itemId)}
            onToggle={() => handleToggle(itemId, index)}
          />
        );
      })}
    </div>
  );
}

