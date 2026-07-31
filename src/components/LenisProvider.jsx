"use client";

import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function LenisProvider({ children }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        prevent: (node) => {
          // Prevent smooth scroll on nodes with 'data-lenis-prevent' attribute
          return node.hasAttribute('data-lenis-prevent') || node.closest('[data-lenis-prevent]');
        }
      }}
    >
      {children}
    </ReactLenis>
  );
}
