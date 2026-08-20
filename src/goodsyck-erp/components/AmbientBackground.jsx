import React from 'react';
import { GraduationCap, BookOpen, Calculator, Trophy } from 'lucide-react';

const AmbientBackground = ({ colorScheme = 'default', showIcons = true }) => {
  const palettes = {
    default: [
      'bg-indigo-400/20', 'bg-violet-400/20', 'bg-cyan-400/20'
    ],
    problem: [
      'bg-red-400/20', 'bg-rose-400/20', 'bg-orange-400/20'
    ],
    roles: [
      'bg-purple-400/20', 'bg-fuchsia-400/20', 'bg-indigo-400/20'
    ]
  };

  const colors = palettes[colorScheme] || palettes.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/*
        Static blobs — no animations for performance.
        Blur radius/size is kept small on mobile and only scales up from md/lg,
        since large filter:blur() layers are extremely expensive to composite
        on iOS Safari. The third blob is dropped entirely below md to cut one
        whole compositing layer on the weakest devices.
      */}
      <div className={`absolute top-0 left-[-10%] w-[260px] sm:w-[420px] md:w-[600px] lg:w-[800px] h-[260px] sm:h-[420px] md:h-[600px] lg:h-[800px] rounded-full blur-[40px] sm:blur-[70px] md:blur-[120px] lg:blur-[150px] ${colors[0]}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[280px] sm:w-[480px] md:w-[700px] lg:w-[1000px] h-[280px] sm:h-[480px] md:h-[700px] lg:h-[1000px] rounded-full blur-[45px] sm:blur-[80px] md:blur-[150px] lg:blur-[180px] ${colors[1]}`} />
      <div className={`hidden md:block absolute top-[20%] left-[40%] w-[500px] h-[500px] rounded-full blur-[100px] ${colors[2]} mix-blend-multiply flex-shrink-0`} />

      {/* Floating School Icons — CSS animation only, solid backgrounds (no backdrop-blur) */}
      {showIcons && (
        <div className="hidden sm:block absolute inset-0 z-10 opacity-60">
          <div
            style={{ animation: 'float1 8s ease-in-out infinite' }}
            className="absolute top-[15%] left-[5%] lg:left-[10%] w-16 h-16 md:w-20 md:h-20 bg-white/85 rounded-2xl border border-white/60 shadow-xl flex items-center justify-center transform -rotate-12"
          >
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-indigo-500/80" />
          </div>

          <div
            style={{ animation: 'float2 10s ease-in-out 1s infinite' }}
            className="absolute top-[40%] right-[3%] lg:right-[8%] w-14 h-14 md:w-16 md:h-16 bg-white/85 rounded-full border border-white/60 shadow-xl flex items-center justify-center transform rotate-12"
          >
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-violet-500/80" />
          </div>

          <div
            style={{ animation: 'float1 7s ease-in-out 2s infinite' }}
            className="absolute bottom-[20%] left-[8%] lg:left-[15%] w-12 h-12 md:w-14 md:h-14 bg-white/85 rounded-xl border border-white/60 shadow-xl flex items-center justify-center transform -rotate-6"
          >
            <Calculator className="w-5 h-5 md:w-6 md:h-6 text-fuchsia-500/80" />
          </div>

          <div
            style={{ animation: 'float2 9s ease-in-out 3s infinite' }}
            className="absolute bottom-[10%] right-[10%] lg:right-[15%] w-16 h-16 bg-white/85 rounded-3xl border border-white/60 shadow-xl flex items-center justify-center transform rotate-6"
          >
            <Trophy className="w-8 h-8 md:w-9 md:h-9 text-rose-500/80" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbientBackground;
