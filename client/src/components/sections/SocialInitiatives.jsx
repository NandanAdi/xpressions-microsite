import React from 'react';
import Chip from '../ui/Chip';

export default function SocialInitiatives() {
  return (
    <section className="py-16 bg-navy/60 border-t border-paper/10" aria-label="Social impact initiatives">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Chip category="Social" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-paper tracking-tight mt-3">
            Impact Beyond The Stage
          </h2>
          <p className="text-sm text-paper/70 font-body mt-2">
            Xpressions is deeply committed to community solidarity through long-standing student-led initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* X-Athon */}
          <div className="p-8 rounded-2xl bg-paper/[0.04] border border-green/30 hover:border-green transition-colors space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-heading font-bold tracking-wider text-green">
                Pre-Fest Flagship Run
              </span>
              <span className="text-xs text-paper/40 italic">Verified annual tradition</span>
            </div>
            <h3 className="font-heading font-black text-2xl text-paper">
              X-Athon
            </h3>
            <p className="text-sm text-paper/75 font-body leading-relaxed">
              A pre-fest marathon run for a cause, bringing together students, faculty, and Bhubaneswar citizens to raise awareness and community support for key social causes.
            </p>
            <div className="pt-2 text-xs text-paper/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              <span>Details and route for the upcoming edition to be announced</span>
            </div>
          </div>

          {/* X-Enable */}
          <div className="p-8 rounded-2xl bg-paper/[0.04] border border-green/30 hover:border-green transition-colors space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-heading font-bold tracking-wider text-green">
                Community Inclusion
              </span>
              <span className="text-xs text-paper/40 italic">Verified annual tradition</span>
            </div>
            <h3 className="font-heading font-black text-2xl text-paper">
              X-Enable
            </h3>
            <p className="text-sm text-paper/75 font-body leading-relaxed">
              A dedicated day of sports, smiles, and creative expression celebrating specially-abled children from local schools, creating a joyful, barrier-free campus environment.
            </p>
            <div className="pt-2 text-xs text-paper/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              <span>Event schedule and partner schools to be announced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

