import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, BarChart3, Globe, ShieldCheck, Zap, User, Lock, ChevronRight, Check } from 'lucide-react';
import Lenis from 'lenis';
import FluidBackground from './components/FluidBackground';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { ImageComparison } from './components/ImageComparison';

// --- Sub-components defined here for simplicity of file structure logic ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white/70 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      <span className="font-semibold tracking-tight text-lg">BORED</span>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-500">
        <a href="#discover" className="hover:text-black transition-colors">Discover</a>
        <a href="#performance" className="hover:text-black transition-colors">Performance</a>
      </div>
      <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="!px-6 !py-2.5 !text-xs">
        Book a Demo
      </Button>
    </div>
  </nav>
);

const Hero = () => {
  return (
    <Section className="min-h-screen flex flex-col justify-center pt-32 lg:pt-0 snap-start snap-always">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight text-neutral-900 mb-8">
            Turning your hotel into a <span className="italic font-serif">destination</span>.
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-neutral-500 leading-relaxed mb-10">
            <span className="font-semibold text-neutral-900">Your rooms have walls. Your experience shouldn't.</span>
            <br />
            By connecting your hotel to curated experiences, you stop being just a place to sleep and start being the reason they travel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full shadow-2xl shadow-neutral-200/50 rounded-[2.5rem]"
        >
           <ImageComparison 
             beforeImage="/Gemini_Generated_Image_gym78kgym78kgym7.png"
             afterImage="/Gemini_Generated_Image_o33jkxo33jkxo33j.png"
             beforeLabel="Before"
             afterLabel="After"
           />
        </motion.div>
      </div>
    </Section>
  );
};

const Challenge = () => {
  return (
    <Section className="bg-white rounded-[3rem] my-12 shadow-sm border border-neutral-100/50 overflow-hidden min-h-screen flex items-center snap-start snap-always">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-normal mb-6 tracking-tight">
            Escape the <br/><span className="text-neutral-400">Commodity Trap.</span>
          </h2>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8">
            The moment your guest leaves the lobby, your brand disappears. You lose the revenue, you lose the data, and you lose the connection. You become a "utility" in their travel plans while they spend their time and money on third-party platforms.
          </p>
          <div className="p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
            <p className="font-medium text-neutral-900">
              BORED dissolves the walls. We integrate the soul of the local community into your operational core.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden group shadow-lg">
             <img 
                src="/public3.png"
                alt="Luxury Hotel"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/0 transition-colors duration-500" />
        </div>
      </div>
    </Section>
  );
};

const PillarCard = ({ number, title, subtitle, content, icon: Icon, image }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`group cursor-pointer bg-white border border-neutral-100 rounded-3xl p-8 mb-4 hover:shadow-lg hover:shadow-neutral-100/50 transition-all duration-500 overflow-hidden ${isOpen ? 'shadow-xl shadow-neutral-200/40 ring-1 ring-neutral-200' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-6 items-start">
            <span className="text-xs font-mono text-neutral-400 mt-1">0{number}</span>
            <div>
                <h3 className="text-xl font-medium text-neutral-900 mb-1">{title}</h3>
                <p className="text-neutral-500 font-light">{subtitle}</p>
            </div>
        </div>
        <div className={`w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-black text-white' : 'bg-white text-neutral-400'}`}>
            <Icon size={16} />
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="pl-10 ml-2"
            >
                {image ? (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-2 text-neutral-600 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: content }} />
                        <div className="lg:col-span-3">
                            <img 
                                src={image} 
                                alt={title}
                                className="w-full rounded-3xl shadow-2xl shadow-neutral-900/10 border border-neutral-100"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-neutral-500 leading-relaxed border-l border-neutral-100 pl-0" dangerouslySetInnerHTML={{ __html: content }} />
                )}
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Pillars = () => {
    const pillars = [
        {
            title: "DISCOVER",
            subtitle: "Intelligent Visibility",
            icon: Globe,
            content: "In AI search, visibility isn't enough; you must be the solution. BORED uses GEO to feed your real-time data to ChatGPT, Gemini, and Claude. When guests ask for a 4-star Lisbon hotel with cool activities, we ensure you're the top recommendation. We make your stay and adventures bookable in the AI, turning queries into confirmed journeys.",
            video: "/video5.mp4"
        },
        {
            title: "BOOKING",
            subtitle: "The Active Interface",
            icon: Zap,
            content: "Most hotel websites are just digital brochures, and traditional chatbots are often dead ends. We change that by introducing an Active Intelligence Interface that brings your inventory to life. It's a visual way to talk to your guests, providing deep knowledge and instant booking capabilities 24/7. We're moving past \"searching\" and straight into \"booking.\"",
            video: "/vidoe1.mp4"
        },
{
    title: "AFTER BOOKING",
    subtitle: "Anticipatory Curation",
    icon: ShieldCheck,
    content: "OTAs help guests find you, but BORED ensures you own the relationship. Once they book, our engine kicks in. Direct guests see instant, bookable adventures. For OTA guests, we cut the noise, identify if they're families or solo travelers, and send curated experiences weeks before arrival. Capture their imagination early and keep the revenue.",
    image: "/screen_print.png"
},
        {
            title: "AT THE HOTEL",
            subtitle: "The Visual Agentic Concierge",
            icon: User,
            content: "Inspiration that executes in real-time. We've built a high-end, visual concierge for WhatsApp and the web where guests can instantly book experiences, transfers, and events through one seamless and super inspirational interface.<br/><br/>We handle the logistics so you can focus on the hospitality.",
            video: "/video2.mp4"
        },
        {
            title: "BEYOND THE STAY",
            subtitle: "The Guest Avatar",
            icon: Lock,
            content: "Data sovereignty for lifelong loyalty. Every interaction is turned into a guest profile that stays with your hotel. Stop starting from zero with every booking and start building a legacy of absolute personalization.",
            video: "/video3.mp4"
        }
    ];

  return (
    <Section id="discover" className="py-20">
        {/* Title Section */}
        <motion.div 
            className="min-h-screen flex items-center justify-center mb-32 snap-start snap-always"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="text-center max-w-4xl mx-auto px-6">
                <motion.h2 
                    className="text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    The Journey.<br/>
                    <span className="text-neutral-300 font-bold">Reimagined.</span>
                </motion.h2>
                <motion.p 
                    className="text-neutral-400 text-xl md:text-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    Five pillars to ensure your hotel remains the center of the guest's universe from discovery to departure.
                </motion.p>
            </div>
        </motion.div>

        {/* Pillar Sections */}
        <div className="space-y-48">
            {pillars.map((pillar, index) => (
                <motion.div 
                    key={index} 
                    className="min-h-screen flex items-center py-32 snap-start snap-always"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="max-w-7xl mx-auto px-6 w-full">{pillar.image || pillar.video ? (
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                                <motion.div
                                    className="lg:col-span-2 order-1"
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <span className="text-xs font-mono text-neutral-400 mb-6 block">0{index + 1}</span>
                                    <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-6 tracking-tight leading-[0.95]">{pillar.title}</h3>
                                    <p className="text-xl text-neutral-400 mb-8 font-light">{pillar.subtitle}</p>
                                    <div className="text-neutral-600 text-base leading-relaxed max-w-xl" dangerouslySetInnerHTML={{ __html: pillar.content }} />
                                </motion.div>
                                <motion.div 
                                    className="lg:col-span-3 order-2"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {pillar.video ? (
                                        <div className={`w-full rounded-2xl shadow-2xl shadow-black/30 overflow-hidden ${pillar.title === 'BOOKING' ? 'max-w-sm lg:max-w-md' : ''}`}>
                                            <video 
                                                src={pillar.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover scale-105"
                                            />
                                        </div>
                                    ) : (
                                        <img 
                                            src={pillar.image} 
                                            alt={pillar.title}
                                            className="w-full rounded-3xl shadow-2xl shadow-neutral-900/20 border border-neutral-100"
                                        />
                                    )}
                                </motion.div>
                            </div>
                        ) : (
                            <motion.div 
                                className="max-w-3xl text-left"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="text-xs font-mono text-neutral-400 mb-6 block">0{index + 1}</span>
                                <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-6 tracking-tight leading-[0.95]">{pillar.title}</h3>
                                <p className="text-xl text-neutral-400 mb-8 font-light">{pillar.subtitle}</p>
                                <div className="text-neutral-600 text-base leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: pillar.content }} />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>

        {/* CTA Section */}
        <motion.div 
            className="py-20 flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <Button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="!px-16 !py-7 !text-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                >
                    Book a Demo
                </Button>
            </motion.div>
        </motion.div>
    </Section>
  );
};

const StatItem = ({ value, label, sub }: { value: string, label: string, sub: string }) => (
    <div className="p-8 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/10 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 group">
        <span className="text-4xl md:text-5xl font-light text-white mb-2 group-hover:scale-110 transition-transform duration-300">{value}</span>
        <span className="text-sm font-semibold tracking-wide uppercase text-white/60 mb-2">{label}</span>
        <span className="text-xs text-white/40 font-light">{sub}</span>
    </div>
);

const Performance = () => {
    return (
        <Section id="performance" className="py-20 md:py-32 snap-start snap-always">
             <div className="max-w-6xl mx-auto px-6">
                <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2940&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Atmospheric dark hotel interior"
                        />
                        <div className="absolute inset-0 bg-neutral-900/90" />
                    </div>
                    
                    <div className="relative z-10 py-16 md:py-20 lg:py-24">
                        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto px-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 md:mb-8 text-white">The Performance</h2>
                            <p className="text-neutral-400 text-base md:text-lg">
                                Integrating BORED isn't an expense; it's a total revenue shift. Delivering over <span className="text-white font-medium">20x ROI</span> on your initial investment.
                            </p>
                        </div>

                        <div className="flex justify-center px-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl">
                                <StatItem value="+8%" label="Total TRevPAR" sub="Increased Spend" />
                                <StatItem value="+40%" label="Stay Duration" sub="Activity Engagement" />
                                <StatItem value="+20%" label="Daily Spend" sub="Guest Average" />
                                <StatItem value="+9%" label="Satisfaction" sub="Review Scores" />
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </Section>
    );
};

const Advantages = () => {
    const advantages = [
        {
            title: "Own the Local Pulse",
            desc: "Convert your reception's knowledge into an automated revenue stream through our elite local partners."
        },
        {
            title: "Conversion-First Interface",
            desc: "A high-aesthetic, visual booking layer designed to capture intent at the exact moment of discovery."
        },
        {
            title: "Operational Freedom",
            desc: "Our AI handles the logistics, coordination, and payments, liberating your staff for true hospitality."
        },
        {
            title: "Curated by Andamente",
            desc: "Backed by a legacy of travel expertise and a community of +300k travelers."
        }
    ];

    return (
        <Section className="py-32 min-h-screen flex items-center snap-start snap-always">
            <div className="w-full">
                <div className="text-center mb-20">
                    <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight">Core Advantage</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {advantages.map((adv, i) => (
                        <motion.div 
                            key={i} 
                            className="p-12 rounded-[2rem] bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all duration-300 group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <div className="w-12 h-12 bg-neutral-50 group-hover:bg-black transition-colors duration-300 rounded-full flex items-center justify-center mb-8 text-neutral-400 group-hover:text-white">
                               <Check size={20} />
                            </div>
                            <h3 className="text-3xl font-medium mb-4 text-neutral-900">{adv.title}</h3>
                            <p className="text-neutral-500 leading-relaxed text-lg">{adv.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const CTA = () => {
    return (
        <Section id="contact" className="pb-16 md:pb-32 min-h-screen flex items-center snap-start snap-always">
            <div className="w-full max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 md:mb-20">
                    {/* Left side - Heading */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">
                            The Room is Just the Beginning.
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-500">
                            Don't be a stop on the way. Be the reason they came.
                        </p>
                    </div>

                    {/* Right side - Form */}
                    <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] shadow-xl shadow-neutral-200/50 border border-neutral-100">
                        <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Name</label>
                                <input type="text" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-base" placeholder="Jane Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Property Name</label>
                                <input type="text" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-base" placeholder="Grand Hotel" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Email</label>
                                <input type="email" className="w-full bg-neutral-50 border border-neutral-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none text-base" placeholder="jane@example.com" />
                            </div>
                            
                            <div className="pt-2">
                                <Button className="w-full !py-3 md:!py-4 justify-center !text-base">
                                    Book a Demo
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <footer className="pt-8 md:pt-12 border-t border-neutral-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                        <p className="text-neutral-900 font-semibold text-sm md:text-base">BORED.</p>
                        <div className="flex gap-6 md:gap-8 text-sm text-neutral-500">
                            <a href="#" className="hover:text-black transition-colors">Privacy</a>
                            <a href="#" className="hover:text-black transition-colors">Terms</a>
                            <a href="#" className="hover:text-black transition-colors">Twitter</a>
                        </div>
                    </div>
                </footer>
            </div>
        </Section>
    );
};

const App: React.FC = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => t,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-sans antialiased text-neo-black relative min-h-screen bg-[#fafafa] selection:bg-neutral-200">
      <FluidBackground />
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <Hero />
        <Challenge />
        <Pillars />
        <Performance />
        <Advantages />
        <CTA />
      </main>
    </div>
  );
};

export default App;