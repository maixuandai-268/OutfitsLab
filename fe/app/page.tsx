// app/page.tsx
import Hero from '@/components/main/homepage/Hero'
import Mission from '@/components/main/homepage/Mission'
import Features from '@/components/main/homepage/Features'
import FashionCTA from '@/components/main/homepage/FashionCTA'
import SellerHero from '@/components/main/homepage/SellerHero'

export default function Page() {
  return (
    <main className="">
<<<<<<< HEAD
      <div className=" w-full max-w-[95rem] mx-auto flex-col gap-16 md:gap-20 sm:px-6 lg:px-8 pt-26">
        <Hero />
        <Mission />
        <Features />
        <SellerHero />
        <FashionCTA />
      </div>
    </main>

=======
        <div className=" w-full max-w-[95rem] mx-auto flex-col gap-16 md:gap-20 sm:px-6 lg:px-8 pt-26">
          <Hero />
          <Mission />
          <Features />
          <SellerHero />
          <FashionCTA />
        </div>
    </main>
    </>
>>>>>>> 3d0f7c29a39a072e2bece01cfe55e2ee3c8433e9
  )
}