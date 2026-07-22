import React, { useState, useEffect } from 'react';

const DEFAULT_HEADINGS = [
  {
    lines: [
      "FIND YOUR DREAM ",
      "UNIVERSITY & EXPLORE",
      "SKILLS FOR SUCCESS"
    ],
    highlight: "SKILLS FOR SUCCESS"
  },
  {
    lines: [
      "KNOWLEDGE IS POWER",
      "EMPOWER YOUR FUTURE",
      "WITH LEARNUZ"
    ],
    highlight: "LEARNUZ"
  },
  {
    lines: [
      "UNLOCK YOUR POTENTIAL",
      "WITH WORLD CLASS",
      "EXPERT COURSES"
    ],
    highlight: "EXPERT COURSES"
  }
];

export default function AnimatedHeading({ 
  headings = DEFAULT_HEADINGS, 
  typeSpeed = 45, 
  deleteSpeed = 25, 
  delayBetween = 4000 
}) {
  const [headingIndex, setHeadingIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentHeading = headings[headingIndex];
  const fullText = currentHeading.lines.join('\n');

  useEffect(() => {
    if (isPaused) return;

    if (!isDeleting && charIndex < fullText.length) {
      // Mounting phase: add letter by letter
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
      return () => clearTimeout(timer);
    } else if (!isDeleting && charIndex === fullText.length) {
      // Pause at full display before unmounting
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(timer);
    } else if (isDeleting && charIndex > 0) {
      // Unmounting phase: remove letter by letter
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, deleteSpeed);
      return () => clearTimeout(timer);
    } else if (isDeleting && charIndex === 0) {
      // Switch to next headline once unmounting letter-by-letter is complete
      setIsDeleting(false);
      setHeadingIndex((prev) => (prev + 1) % headings.length);
    }
  }, [charIndex, isDeleting, isPaused, fullText, typeSpeed, deleteSpeed, delayBetween, headings.length]);

  const handleReplay = () => {
    setIsDeleting(true);
  };

  // Helper function to render a line word-by-word with whitespace-nowrap on each word
  // Guarantees words NEVER break across lines while keeping letter-by-letter animations!
  const renderLineWords = (fullLineText, visibleCount, highlightText, linePrefix) => {
    const words = fullLineText.split(' ');
    let runningCharCount = 0;

    return words.map((word, wordIdx) => {
      const wordStart = runningCharCount;
      const wordLength = word.length;
      runningCharCount += wordLength + 1; // +1 for space

      const numVisibleCharsInWord = Math.max(0, Math.min(wordLength, visibleCount - wordStart));

      if (numVisibleCharsInWord <= 0) return null;

      const visibleSubWord = word.slice(0, numVisibleCharsInWord);

      const isHighlighted = highlightText && fullLineText.includes(highlightText);
      const highlightStart = isHighlighted ? fullLineText.indexOf(highlightText) : -1;
      const highlightEnd = isHighlighted ? highlightStart + highlightText.length : -1;

      return (
        <span 
          key={`${linePrefix}-w-${wordIdx}-${headingIndex}`} 
          className="inline-block whitespace-nowrap mr-[0.24em] last:mr-0"
        >
          {visibleSubWord.split('').map((char, charIdx) => {
            const globalCharIdx = wordStart + charIdx;
            const inHighlight = isHighlighted && globalCharIdx >= highlightStart && globalCharIdx < highlightEnd;

            return (
              <span
                key={`${linePrefix}-c-${globalCharIdx}-${headingIndex}`}
                className={`inline-block animate-letter-pop transition-all duration-150 transform hover:scale-110 ${
                  inHighlight 
                    ? 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent font-black drop-shadow-sm' 
                    : ''
                }`}
              >
                {char}
              </span>
            );
          })}
        </span>
      );
    });
  };

  // Compute character ranges for each of the 3 lines
  let runningLen = 0;
  const lineInfo = currentHeading.lines.map((lineText, lIdx) => {
    const start = runningLen;
    const len = lineText.length;
    runningLen += len + 1; // +1 for newline character
    const visibleCount = Math.max(0, Math.min(len, charIndex - start));
    const isTypingHere = charIndex >= start && charIndex <= start + len;
    return { lineText, start, len, visibleCount, isTypingHere };
  });

  return (
    <div className="relative group w-full">
      {/* 
        Fixed height 3-line container (h-[9.8rem] sm:h-[11.2rem] lg:h-[12.8rem] xl:h-[13.8rem])
        ensures the 3-line hero section layout is 100% stable and reserved at all times!
      */}
      <h1 
        className="text-2xl sm:text-4xl lg:text-[2.8rem] xl:text-[3.1rem] font-extrabold text-[#06122d] leading-[1.18] tracking-tight uppercase h-[9.8rem] sm:h-[11.2rem] lg:h-[12.8rem] xl:h-[13.8rem] flex flex-col justify-start select-none overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {lineInfo.map((info, idx) => (
          <span 
            key={`line-${idx}-${headingIndex}`}
            className={`block min-h-[1.2em] overflow-hidden py-0.5 ${
              idx === lineInfo.length - 1 ? 'text-blue-950' : ''
            }`}
          >
            {renderLineWords(info.lineText, info.visibleCount, currentHeading.highlight, `l${idx + 1}`)}
            {info.isTypingHere && (
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-blue-600 ml-1 animate-pulse align-middle rounded-full shadow-lg shadow-blue-500/50" />
            )}
          </span>
        ))}
      </h1>

      {/* Subtle replay trigger button */}
      <button 
        onClick={handleReplay}
        title="Re-trigger Letter Animation"
        className="absolute -top-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-white/60 text-slate-700 border border-white/80 hover:bg-white shadow-sm flex items-center gap-1 cursor-pointer"
      >
        <svg className="w-3 h-3 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Replay</span>
      </button>
    </div>
  );
}
