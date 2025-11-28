import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import ChatPanel from "./components/ChatPanel";
import HowToSection from "./components/HowToSection";
import AdvantagesSection from "./components/AdvantagesSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-rose-50 text-slate-900 scroll-smooth font-sans antialiased selection:bg-indigo-100 selection:text-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Hero */}
        <section id="beranda" className="pt-4 sm:pt-8">
          <HeroSection />
        </section>

        {/* Main content: features (left) + chat (right) */}
        <section className="mt-10 sm:mt-14">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div>
              <FeaturesSection />
            </div>
            <div id="chat" className="w-full">
              <ChatPanel />
            </div>
          </div>
        </section>

        {/* Cara Pakai */}
        <section id="cara-pakai" className="mt-16 sm:mt-20">
          <HowToSection />
        </section>

        {/* Keunggulan */}
        <section id="keunggulan" className="mt-16 sm:mt-20">
          <AdvantagesSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
