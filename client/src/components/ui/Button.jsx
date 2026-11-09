import React from 'react';
import { trackEvent } from '../../lib/analytics';

export default function Button({
  children,
  variant = 'primary',
  as: Component = 'button',
  ctaId,
  eventName = 'primary_cta_click',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-bold rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber min-h-[44px] px-5 py-2.5 text-sm cursor-pointer';

  const variants = {
    primary: 'bg-teal text-white hover:bg-teal/90 active:scale-95 shadow-md shadow-teal/20',
    secondary: 'bg-transparent border-2 border-amber text-amber hover:bg-amber hover:text-navy active:scale-95',
    ghost: 'bg-transparent text-paper/80 hover:text-paper border border-paper/20 hover:border-paper/40 hover:bg-paper/5',
  };

  const handleClick = (e) => {
    if (ctaId) {
      trackEvent(eventName, { cta_id: ctaId });
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Component
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      onClick={handleClick}
      data-cta-id={ctaId}
      {...props}
    >
      {children}
    </Component>
  );
}

