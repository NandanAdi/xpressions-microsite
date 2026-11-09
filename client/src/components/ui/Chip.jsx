import React from 'react';

const CATEGORY_MAP = {
  'Business': { bg: 'bg-teal', text: 'text-white', border: 'border-teal' },
  'Stage and Cultural': { bg: 'bg-plum', text: 'text-white', border: 'border-plum' },
  'Campus and Fun': { bg: 'bg-blue', text: 'text-white', border: 'border-blue' },
  'Social': { bg: 'bg-green', text: 'text-white', border: 'border-green' },
};

export default function Chip({ category, className = '', variant = 'solid' }) {
  const meta = CATEGORY_MAP[category] || { bg: 'bg-paper/20', text: 'text-paper', border: 'border-paper/30' };

  if (variant === 'outline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border ${meta.border} text-paper ${className}`}
        aria-label={`Category: ${category}`}
      >
        <span className={`w-2 h-2 rounded-full ${meta.bg}`} aria-hidden="true" />
        {category}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider ${meta.bg} ${meta.text} ${className}`}
      aria-label={`Category: ${category}`}
    >
      {category}
    </span>
  );
}

