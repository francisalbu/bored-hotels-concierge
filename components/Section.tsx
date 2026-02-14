import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`relative z-10 px-6 py-24 md:py-32 lg:px-12 max-w-[1400px] mx-auto ${className}`}>
      {children}
    </section>
  );
};