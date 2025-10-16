import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  gradient = false,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5', 
    lg: 'p-7',
  };

  const classes = [
    'bg-white rounded-xl transition-all duration-300 ease-in-out',
    shadow ? 'shadow-sm hover:shadow-md border border-gray-100' : '',
    gradient ? 'gradient-pink-orange' : '',
    paddingClasses[padding],
    onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;