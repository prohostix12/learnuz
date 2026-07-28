"use client";

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function VantaBackground() {
  const containerRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    // Only run on client and when scripts are loaded and container is available
    if (
      threeLoaded &&
      vantaLoaded &&
      typeof window !== 'undefined' &&
      window.VANTA &&
      window.VANTA.NET &&
      containerRef.current
    ) {
      if (!vantaEffect) {
        try {
          const effect = window.VANTA.NET({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xf8fafc, // Clean slate white light-mode background color
            color: 0x03ae92, // Gorgeous green-blue network connection lines/dots
            points: 12.00,
            maxDistance: 22.00,
            spacing: 16.00,
            showDots: true
          });
          setVantaEffect(effect);
        } catch (error) {
          console.error("Vanta NET initialization error:", error);
        }
      }
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [threeLoaded, vantaLoaded, vantaEffect]);

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
