import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Link from 'next/link';



export default async function HomePage() {
  
  return (
    <div className="space-y-16 pb-12">
      <Hero/>
      {/* <Features/> */}
    </div>
  );
}