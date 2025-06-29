import About from "@/components/About";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <Partners />
    </div>
  );
}
