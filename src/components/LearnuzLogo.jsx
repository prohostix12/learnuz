import React from 'react';

export default function LearnuzLogo({ size = 'medium', layout = 'horizontal', className = '', onClick }) {
  const sizeMap = {
    small: { height: 32, textClass: 'text-xl' },
    medium: { height: 42, textClass: 'text-2xl' },
    large: { height: 58, textClass: 'text-4xl' }
  };

  const { height, textClass } = sizeMap[size] || sizeMap.medium;

  return (
    <div 
      onClick={onClick}
      className={`inline-flex ${layout === 'vertical' ? 'flex-col text-center' : 'items-center'} gap-2.5 select-none group cursor-pointer ${className}`}
    >
      {/* LN Monogram Vector SVG matching uploaded image */}
      <img src="learnuz logo.png" alt="" className='w-18' />
    </div>
  );
}
