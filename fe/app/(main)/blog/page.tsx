import BlogHero from "@/components/main/blog/BlogHero"
import BlogList from "@/components/main/blog/BlogList"
import { ADLaM_Display } from 'next/font/google'

const adlam = ADLaM_Display({
  subsets: ['latin'],
  weight: '400'
})
export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto py-10">

      <BlogHero />

      <BlogList />

    </div>
  )
}