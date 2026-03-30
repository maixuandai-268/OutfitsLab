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
    <main className="bg-white min-h-screen pt-24 pb-16">
      {/* Hero Intro */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
            Định hình tương lai của <br/><span className="text-blue-900">thời trang kỹ thuật số.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            OutfitsLab mang đến cuộc cách mạng cho thiết kế thời trang và trải nghiệm thử đồ
            với sức mạnh của công nghệ 3D. Rút ngắn khoảng cách giữa trí tưởng tượng và thế giới thực.
          </p>
        </div>
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
