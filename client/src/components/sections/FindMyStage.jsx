import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';

const QUESTIONS = [
  {
    id: 'fire',
    question: '1. What fires you up the most?',
    options: [
      { label: 'Out-thinking the competition in a high-stakes case room', world: 'Business', interest: 'Competing' },
      { label: 'The rush of bright spotlights and live crowd applause', world: 'Stage and Cultural', interest: 'Competing' },
      { label: 'Carnival stalls, informal games and campus festival buzz', world: 'Campus and Fun', interest: 'Attending' },
      { label: 'Running for a cause and giving back to society', world: 'Social', interest: 'Both' },
    ],
  },
  {
    id: 'team',
    question: '2. Solo pursuit or squad dynamic?',
    options: [
      { label: 'Tight-knit squad with analytical roles', world: 'Business', interest: 'Competing' },
      { label: 'Full crew or band harmonising in rhythm', world: 'Stage and Cultural', interest: 'Competing' },
      { label: 'Rolling with friends just soaking in the energy', world: 'Campus and Fun', interest: 'Attending' },
      { label: 'A unified community moving together', world: 'Social', interest: 'Both' },
    ],
  },
  {
    id: 'vibe',
    question: '3. Pick your festival evening vibe:',
    options: [
      { label: 'Polishing that final slide deck before presentation dawn', world: 'Business', interest: 'Competing' },
      { label: 'Rocking out at Celeblitz or cheering band riffs', world: 'Stage and Cultural', interest: 'Both' },
      { label: 'Midnight food hunts and spontaneous laugh circles', world: 'Campus and Fun', interest: 'Attending' },
      { label: 'Cheering on participants at X-Enable and X-Athon', world: 'Social', interest: 'Both' },
    ],
  },
];

const WORLD_RESULTS = {
  'Business': {
    title: 'The Strategist Stage (Business)',
    blurb: 'Your instinct is analytical and competitive. You thrive in the fire of boardroom simulations, live equity pitches, and multi-round challenges like Jack of All Trades.',
    color: 'text-teal',
    bg: 'border-teal/50',
    interestPref: 'Competing',
  },
  'Stage and Cultural': {
    title: 'The Spotlight Stage (Stage & Cultural)',
    blurb: 'Artistry and expression run deep in you. From Decibelz to Thirkan, the stage lights are calling your talent to take center stage.',
    color: 'text-plum',
    bg: 'border-plum/50',
    interestPref: 'Competing',
  },
  'Campus and Fun': {
    title: 'The Fest Vibe (Campus & Fun)',
    blurb: 'You are the heartbeat of the crowd. You soak in every moment of the campus carnival, late-night camaraderie, and festival energy.',
    color: 'text-blue',
    bg: 'border-blue/50',
    interestPref: 'Attending',
  },
  'Social': {
    title: 'The Impact Stage (Social)',
    blurb: 'You believe greatness is measured by the good you create. Events like X-Athon and X-Enable are where your purpose finds its voice.',
    color: 'text-green',
    bg: 'border-green/50',
    interestPref: 'Both',
  },
};

export default function FindMyStage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = start, 1..3 = questions, 4 = result
  const [answers, setAnswers] = useState([]);
  const [resultWorld, setResultWorld] = useState(null);

  const startQuiz = () => {
    setCurrentStep(1);
    trackEvent('quiz_start');
  };

  const handleSelectOption = (opt) => {
    const updated = [...answers, opt];
    setAnswers(updated);

    if (currentStep < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tally votes for each world
      const tallies = {};
      updated.forEach((a) => {
        tallies[a.world] = (tallies[a.world] || 0) + 1;
      });

      let winner = 'Business';
      let maxCount = -1;
      Object.keys(tallies).forEach((w) => {
        if (tallies[w] > maxCount) {
          maxCount = tallies[w];
          winner = w;
        }
      });

      setResultWorld(winner);
      setCurrentStep(4);

      // Store in sessionStorage (non-PII)
      try {
        sessionStorage.setItem('xp_quiz_result', winner);
      } catch {
        // Safe ignore
      }

      trackEvent('quiz_complete', { result_world: winner });
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultWorld(null);
  };

  const resultData = resultWorld ? WORLD_RESULTS[resultWorld] : null;

  return (
    <section className="py-20 bg-navy/90 border-t border-paper/10 relative overflow-hidden" aria-label="Find My Stage Quiz">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal/5 pointer-events-none blur-3xl" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="rounded-2xl bg-paper/[0.03] border border-paper/15 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          {/* Step 0: Teaser / Start */}
          {currentStep === 0 && (
            <div className="text-center space-y-5">
              <span className="text-xs uppercase font-heading font-bold tracking-widest text-amber">
                Interactive Finder
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-paper tracking-tight">
                Not sure where you fit? Find your stage.
              </h2>
              <p className="text-sm sm:text-base text-paper/75 font-body max-w-xl mx-auto">
                Answer 3 quick questions (no personal data required) to discover your ideal Xpressions vertical and recommended events.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="px-8 py-3.5 rounded-md bg-teal text-white font-heading font-bold text-sm hover:bg-teal/90 active:scale-95 transition-all min-h-[44px] shadow-lg shadow-teal/20"
                >
                  Start 3-Question Quiz →
                </button>
              </div>
            </div>
          )}

          {/* Steps 1..3: Questions */}
          {currentStep >= 1 && currentStep <= QUESTIONS.length && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-paper/10 pb-3">
                <span className="text-xs font-heading font-semibold uppercase text-amber tracking-wider">
                  Question {currentStep} of {QUESTIONS.length}
                </span>
                <span className="text-xs text-paper/40 font-body">No sign-in required</span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-paper">
                {QUESTIONS[currentStep - 1].question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {QUESTIONS[currentStep - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className="w-full text-left p-4 rounded-xl bg-paper/5 hover:bg-paper/10 border border-paper/10 hover:border-amber/50 transition-all font-body text-sm sm:text-base text-paper/90 min-h-[50px] flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <span className="text-amber opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {currentStep === 4 && resultData && (
            <div className="space-y-6 text-center">
              <div className="inline-block p-2 rounded-full bg-paper/5 border border-paper/10">
                <span className="text-xs uppercase font-heading font-bold tracking-widest text-amber px-3 py-1">
                  Your Match
                </span>
              </div>

              <h3 className={`font-heading font-black text-3xl sm:text-4xl ${resultData.color}`}>
                {resultData.title}
              </h3>

              <p className="text-base text-paper/80 font-body max-w-xl mx-auto leading-relaxed">
                {resultData.blurb}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to={`/competitions?category=${encodeURIComponent(resultWorld)}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-teal text-white font-heading font-bold text-sm hover:bg-teal/90 min-h-[44px] flex items-center justify-center"
                >
                  Explore {resultWorld} Events
                </Link>

                <Link
                  to={`/express-interest?category=${encodeURIComponent(resultData.interestPref)}&quiz=${encodeURIComponent(resultWorld)}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-md border-2 border-amber text-amber font-heading font-bold text-sm hover:bg-amber hover:text-navy min-h-[44px] flex items-center justify-center"
                >
                  Register Interest ({resultData.interestPref})
                </Link>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="text-xs text-paper/40 hover:text-paper underline"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

