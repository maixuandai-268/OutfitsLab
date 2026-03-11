// app/page.tsx
import Hero from '@/components/main/homepage/Hero'
import Mission from '@/components/main/homepage/Mission'
import Features from '@/components/main/homepage/Features'

export default function Page() {
  return (
    <> 
    <main className="w-full max-w-7xl mx-auto flex flex-col px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-16 md:gap-20">
          <Hero />
          <Mission />
          <Features />
        </div>
    </main>
    </>
  )
}