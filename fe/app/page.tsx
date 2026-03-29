import Hero from "@/components/main/homepage/Hero";
import Mission from "@/components/main/homepage/Mission";
import Features from "@/components/main/homepage/Features";
import FashionCTA from "@/components/main/homepage/FashionCTA";
import SellerHero from "@/components/main/homepage/SellerHero";
import Navbar from "@/components/main/navbar";

export default function Page() {
  return (
    <main className="relative ">
      <Navbar />
      <div className=" w-full max-w-380 mx-auto flex-col gap-16 md:gap-20 sm:px-6 lg:px-8 ">
        
        <Hero />
        <Mission />
        <Features />
        <SellerHero />
        <FashionCTA />
      </div>
    </main>
  );
}
