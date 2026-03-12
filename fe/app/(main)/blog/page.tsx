'use client';

import React from 'react';

import MissionSection from '@/components/main/about/MissionSection';
import VisionSection from '@/components/main/about/VisionSection';
import CoreValuesSection from '@/components/main/about/CoreValuesSection';
import TimelineSection from '@/components/main/about/TimelineSection';
import TeamSection from '@/components/main/about/TeamSection';
import WhyChooseSection from '@/components/main/about/WhyChooseSection';
import CtaSection from '@/components/main/about/CtaSection';

const AboutPage: React.FC = () => {
  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-8">
      {/* Header Intro */}
      <section className="space-y-2">
        <h3 className="text-3xl font-bold">About CustomOutfit3D</h3>
        <p className="text-gray-700">
          Revolutionizing fashion sampling & fitting workflows with 3D technology and smart try-on experiences.
        </p>
      </section>

      <MissionSection />
      <VisionSection />
      <CoreValuesSection />
      <TimelineSection />
      <TeamSection />
      <WhyChooseSection />
      <CtaSection />
    </main>
  );
};

export default AboutPage;
