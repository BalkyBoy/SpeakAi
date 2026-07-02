import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProofStrip from "@/components/proof-strip";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import FinalCta from "@/components/final-cta";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar/>
      <Hero />
      {/* <ProofStrip />
      <Features />
      <HowItWorks />
      <Pricing /> */}
      <FinalCta />
      {/* <Footer /> */}
    </>
  );
}