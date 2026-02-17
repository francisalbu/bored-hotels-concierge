import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', onClick, className = '', type = 'button', disabled = false }) => {
  const baseStyles = "relative overflow-hidden rounded-full px-8 py-4 font-medium transition-all duration-300 flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800 shadow-lg shadow-neutral-200/50",
    secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
    outline: "border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className="relative z-10 text-sm tracking-wide uppercase">{children}</span>
    </motion.button>
  );
};