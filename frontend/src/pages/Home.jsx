import CTA from "../components/CTA";
import Events from "../components/Events";
import Featured from "../components/Featured";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <main className="flex-1">
      <Hero />
      <Stats />
      <Featured />
      <Testimonials />
      <Events />
      <CTA />
    </main>
  );
};

export default Home;
