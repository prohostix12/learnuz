"use client";

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function VantaBackground() {
  const containerRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    // Determine if we should load the heavy WebGL background
    if (typeof window !== 'undefined') {
      const isMobileOrTablet = window.innerWidth < 1024; // Disable Vanta on screens < 1024px to prevent scroll lag on mobile/tablet
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!isMobileOrTablet && !prefersReducedMotion) {
        setShouldLoad(true);
      }
    }
  }, []);

  useEffect(() => {
    if (
      shouldLoad &&
      threeLoaded &&
      vantaLoaded &&
      typeof window !== 'undefined' &&
      window.VANTA &&
      window.VANTA.NET &&
      containerRef.current
    ) {
      if (!vantaEffectRef.current) {
        try {
          const effect = window.VANTA.NET({
            el: containerRef.current,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 2.00,
            scaleMobile: 2.00,
            backgroundColor: 0xf8fafc, // Clean slate white light-mode background color
            color: 0x03ae92, // Gorgeous green-blue network connection lines/dots
            points: 8.00, // Reduced further to optimize performance
            maxDistance: 18.00, // Reduced to optimize performance
            spacing: 20.00, // Increased spacing to render fewer nodes and lines
            showDots: true
          });
          vantaEffectRef.current = effect;
        } catch (error) {
          console.error("Vanta NET initialization error:", error);
        }
      }
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [shouldLoad, threeLoaded, vantaLoaded]);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setThreeLoaded(true);
        }}
      />
      {threeLoaded && (
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            setVantaLoaded(true);
          }}
        />
      )}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -20,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
