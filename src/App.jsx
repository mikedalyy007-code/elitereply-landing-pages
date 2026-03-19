import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ChevronRight, Video, Mic, Zap, ShieldCheck, CreditCard, BarChart3,
  Plus, Minus, Check, X, ChevronDown, Users, Trophy, Briefcase,
  Star, Globe, ArrowRight, AtSign
} from 'lucide-react';

const COLORS = {
  bg: '#050505',
  card: '#0a0a0a',
  accent: '#38bfa1',
  textMain: '#ffffff',
  textMuted: '#a1a1aa',
  redVelvet: 'linear-gradient(135deg, #8B1A1A 0%, #050505 100%)',
};

const MAIN_APP_URL = "https://elitereply.com/claim";

const redirectToClaim = (handle) => {
  const sanitizedHandle = handle.trim().replace(/[^a-zA-Z0-9_]/g, '');
  window.location.href = `${MAIN_APP_URL}?handle=${sanitizedHandle}`;
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-lg shadow-xl hover:shadow-2xl";
  const variants = {
    primary: "bg-[#38bfa1] text-black hover:bg-[#45d1b3]",
    secondary: "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10",
    ghost: "bg-transparent text-white hover:bg-white/5"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const HandleInput = ({ placeholder = "yourname", onClaim }) => {
  const [val, setVal] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && val.length > 0) {
      onClaim(val);
    }
  };

  return (
    <div className="relative group w-full max-w-xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#38bfa1] to-emerald-500 rounded-[2rem] blur opacity-25 group-focus-within:opacity-60 transition duration-1000"></div>
      <div className="relative flex items-center bg-[#111] border border-white/10 rounded-[1.8rem] p-2 pr-3 pl-6 shadow-2xl">
        <span className="text-zinc-500 font-medium text-lg md:text-xl pr-1 select-none">elitereply.com/</span>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-white text-lg md:text-xl font-bold w-full placeholder:text-zinc-700"
        />
        <button
          onClick={() => val.length > 0 && onClaim(val)}
          className="bg-[#38bfa1] text-black p-3 md:px-6 md:py-3 rounded-[1.2rem] font-black flex items-center gap-2 hover:bg-white transition-all active:scale-95 shadow-lg shrink-0"
        >
          <span className="hidden md:inline">Claim Handle</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 hover:border-[#38bfa1]/30 transition-all duration-500 group ${className}`}>
    {children}
  </div>
);

const KineticStat = ({ label, value, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const end = parseInt(value.toString().replace(/\D/g, ''));
        if (start === end) return;
        let timer = setInterval(() => {
          start += Math.ceil(end / 100);
          if (start >= end) {
            setDisplayValue(end);
            clearInterval(timer);
          } else {
            setDisplayValue(start);
          }
        }, 10);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm uppercase tracking-[0.2em] text-[#38bfa1] font-bold">{label}</div>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#38bfa1] rounded-xl flex items-center justify-center gap-1">
        <div className="w-1.5 h-4 bg-white rounded-full"></div>
        <div className="w-1.5 h-6 bg-white rounded-full"></div>
        <div className="w-1.5 h-3 bg-white rounded-full"></div>
      </div>
      <span className="text-2xl font-black tracking-tighter text-white">EliteReply</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
      <a href="#features" className="hover:text-white transition-colors">Features</a>
      <a href="#calculator" className="hover:text-white transition-colors">Earnings</a>
      <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
    </div>
    <button
      onClick={() => window.location.href = "https://elitereply.com/login"}
      className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-[#38bfa1] transition-all"
    >
      Login
    </button>
  </nav>
);

const Hero = () => (
  <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bfa1] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bfa1]"></span>
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-[#38bfa1]">Proprietary Async Video Engine</span>
    </div>
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-8 leading-[0.9]">
      Get Paid For <br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bfa1] to-emerald-200">What You Know.</span>
    </h1>
    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed">
      EliteReply is the platform built for experts. Async video replies. Live 1:1 sessions. Zero platform fee.
      <span className="text-white"> Your expertise. Your price. Your terms.</span>
    </p>
    <div className="mb-12">
      <HandleInput onClaim={redirectToClaim} />
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-60">
      <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
        <Check className="w-4 h-4 text-[#38bfa1]" /> No Credit Card Required
      </div>
      <div className="hidden sm:block text-zinc-800">•</div>
      <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
        <Check className="w-4 h-4 text-[#38bfa1]" /> Free Forever for Pros
      </div>
    </div>
  </section>
);

const FeatureGrid = () => {
  const features = [
    { title: "Async Video Replies", icon: <Video />, desc: "Record a personalized video reply on your schedule. Fans get your expert answer. You get paid instantly." },
    { title: "Live 1:1 Studio", icon: <Mic />, desc: "Host premium live sessions in our proprietary studio. No Zoom. No third-party tools. All inside EliteReply." },
    { title: "AI Call Recaps", icon: <Zap />, desc: "Every session auto-transcribed and summarized. Your fans get more value. You look more professional." },
    { title: "Full Transcripts", icon: <BarChart3 />, desc: "Every reply and session fully documented. Build your content library automatically." },
    { title: "Escrow Protection", icon: <ShieldCheck />, desc: "Every payment held securely until delivery confirmed. You're protected. Your fans are protected." },
    { title: "Instant Payouts", icon: <CreditCard />, desc: "No 30-day holds. No thresholds. Get paid when you deliver." },
  ];

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tight text-center">Built for Scale.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card key={i} className="hover:scale-[1.02] transition-transform">
            <div className="w-12 h-12 bg-[#38bfa1]/10 rounded-2xl flex items-center justify-center text-[#38bfa1] mb-6">
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

const ProSegments = () => {
  const segments = [
    { type: "Business Coaches", desc: "Turn 1:1 coaching calls into scalable revenue streams.", icon: <Trophy /> },
    { type: "Athletes & Entertainers", desc: "Monetize fan access without compromising your brand.", icon: <Star /> },
    { type: "Finance & Investing", desc: "Your insights have value. Start charging for them.", icon: <Globe /> },
    { type: "Fractional Consultants", desc: "Add an async revenue stream between retainer clients.", icon: <Briefcase /> },
    { type: "Influencers", desc: "Stop giving free advice in the comments. Get paid for it.", icon: <Users /> },
  ];

  return (
    <section className="py-24 bg-white/5 overflow-hidden">
      <div className="px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Who is on EliteReply?</h2>
        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6">
          {segments.map((s, i) => (
            <div key={i} className="min-w-[300px] bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-[280px]">
              <div className="text-[#38bfa1] w-10 h-10">{s.icon}</div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{s.type}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Calculator = () => {
  const [sessions, setSessions] = useState(5);
  const [rate, setRate] = useState(250);
  const [replies, setReplies] = useState(10);
  const [replyPrice, setReplyPrice] = useState(50);

  const monthlyTotal = useMemo(() => {
    return (sessions * rate * 4) + (replies * replyPrice * 4);
  }, [sessions, rate, replies, replyPrice]);

  return (
    <section id="calculator" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">How much could you earn?</h2>
        <p className="text-zinc-500">Calculate your potential monthly income as an Elite Pro.</p>
      </div>
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl space-y-12">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between text-white font-bold mb-4">
              <span>Live Sessions / Week</span>
              <span className="text-[#38bfa1] text-2xl">{sessions}</span>
            </div>
            <input type="range" min="1" max="20" value={sessions}
              onChange={(e) => setSessions(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38bfa1]"
            />
          </div>
          <div>
            <div className="flex justify-between text-white font-bold mb-4">
              <span>Your Session Rate</span>
              <span className="text-[#38bfa1] text-2xl">${rate}</span>
            </div>
            <input type="range" min="25" max="2500" step="25" value={rate}
              onChange={(e) => setRate(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38bfa1]"
            />
          </div>
          <div>
            <div className="flex justify-between text-white font-bold mb-4">
              <span>Async Video Replies / Week</span>
              <span className="text-[#38bfa1] text-2xl">{replies}</span>
            </div>
            <input type="range" min="0" max="50" value={replies}
              onChange={(e) => setReplies(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38bfa1]"
            />
          </div>
          <div>
            <div className="flex justify-between text-white font-bold mb-4">
              <span>Async Reply Price</span>
              <span className="text-[#38bfa1] text-2xl">${replyPrice}</span>
            </div>
            <input type="range" min="10" max="500" step="10" value={replyPrice}
              onChange={(e) => setReplyPrice(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38bfa1]"
            />
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col items-center">
          <div className="text-zinc-500 uppercase tracking-widest text-sm mb-2">Estimated Monthly Revenue</div>
          <div className="text-6xl md:text-8xl font-black text-white mb-2">${monthlyTotal.toLocaleString()}</div>
          <div className="text-[#38bfa1] font-bold text-xl mb-8">That's ${(monthlyTotal * 12).toLocaleString()} per year.</div>
          <Button onClick={() => redirectToClaim("")} className="w-full md:w-auto">Start Earning — Claim Your Handle</Button>
        </div>
      </div>
    </section>
  );
};

const ComparisonTable = () => {
  const data = [
    { f: "Pro Platform Fee", e: "0%", c: "25%", m: "10-20%", s: "~3%+" },
    { f: "Async Video", e: true, c: true, m: false, s: false },
    { f: "Live 1:1 Studio", e: true, c: false, m: true, s: false },
    { f: "AI Recaps", e: true, c: false, m: false, s: false },
    { f: "Escrow Protection", e: true, c: false, m: true, s: false },
    { f: "Profile Handle", e: true, c: true, m: true, s: false },
  ];

  const RenderVal = (val) => {
    if (typeof val === 'boolean') return val ? <Check className="text-[#38bfa1] mx-auto" /> : <X className="text-white/10 mx-auto" />;
    return <span className="text-white/80">{val}</span>;
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-x-auto">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">Beyond the Competition.</h2>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="py-6 text-left text-zinc-500 font-medium">Feature</th>
            <th className="py-6 text-[#38bfa1] font-bold text-lg">EliteReply</th>
            <th className="py-6 text-zinc-500 font-medium">Cameo</th>
            <th className="py-6 text-zinc-500 font-medium">Minnect</th>
            <th className="py-6 text-zinc-500 font-medium text-xs">Calendly+Stripe</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-6 text-left font-bold text-white">{row.f}</td>
              <td className="py-6 font-bold">{RenderVal(row.e)}</td>
              <td className="py-6">{RenderVal(row.c)}</td>
              <td className="py-6">{RenderVal(row.m)}</td>
              <td className="py-6">{RenderVal(row.s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const questions = [
    { q: "Is EliteReply really free for Pros?", a: "Yes. We don't touch your earnings. We charge a flat 5% fee to the fans booking you to cover platform infrastructure and innovation." },
    { q: "How does the 5% fan fee work exactly?", a: "When you set a price of $100, you receive $100 (minus payment processor fees). The fan pays $105. Simple, transparent, fair." },
    { q: "What's the difference between async replies and live sessions?", a: "Async replies are pre-recorded video answers sent at your convenience. Live sessions are real-time, high-fidelity video calls hosted in our proprietary browser-based studio." },
    { q: "How do I get paid — and how fast?", a: "We support instant payouts via Stripe Connect. Once you deliver the reply or complete the session, funds are released immediately." },
    { q: "What is the EliteReply Studio?", a: "It's our purpose-built recording and meeting space. No downloads required. It features studio-grade audio processing, teleprompters, and automatic lighting correction." },
    { q: "Can I set different prices for different services?", a: "Absolutely. Set your rate for 15-min calls, 30-min calls, and personalized video replies independently." },
    { q: "How does escrow protection work?", a: "Fans prepay to secure your time. We hold those funds. If the session doesn't happen, they are refunded. Once it's finished, you're paid. Nobody gets ghosted." },
    { q: "What happens if a fan is unsatisfied?", a: "Our AI reviews transcripts and patterns. We handle dispute resolution so you don't have to worry about chargebacks." },
    { q: "Can I use my own branding?", a: "Yes. EliteReply profiles are highly customizable to match your aesthetic and professional brand." },
    { q: "What is EliteVIP status?", a: "It's reserved for top-tier creators with high engagement. VIPs get early access to features and dedicated account management." },
  ];

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked.</h2>
      <div className="space-y-4">
        {questions.map((item, i) => (
          <div key={i} className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-white">{item.q}</span>
              <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-6 pb-6 text-zinc-400 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 text-center">
    <div className="flex items-center justify-center gap-3 mb-8 opacity-50 grayscale">
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center gap-0.5">
        <div className="w-1 h-3 bg-white rounded-full"></div>
        <div className="w-1 h-5 bg-white rounded-full"></div>
        <div className="w-1 h-2 bg-white rounded-full"></div>
      </div>
      <span className="text-xl font-black text-white">EliteReply</span>
    </div>
    <div className="text-zinc-600 text-sm">
      © 2024 EliteReply. All rights reserved. Built for the world's most elite experts.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#38bfa1] selection:text-black">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <section className="bg-white/5 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 px-6">
            <KineticStat label="Pro Platform Fee" value={0} suffix="%" />
            <KineticStat label="Fan Fee" value={5} suffix="%" />
            <KineticStat label="Average Setup" value={2} suffix="min" />
            <KineticStat label="Payouts" value={100} prefix="INSTANT" suffix="" />
          </div>
        </section>
        <FeatureGrid />
        <ProSegments />
        <Calculator />
        <ComparisonTable />
        <FAQ />
        <section className="px-6 py-24">
          <div
            className="max-w-7xl mx-auto rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl"
            style={{ background: COLORS.redVelvet }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1]">
                Your Expertise Is Worth More <br className="hidden md:block"/> Than You're Charging.
              </h2>
              <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                Join 500+ Pros earning on EliteReply. It's free. Forever.
              </p>
              <div className="max-w-xl mx-auto">
                <HandleInput onClaim={redirectToClaim} />
              </div>
              <div className="flex items-center justify-center gap-4 text-white/50 text-sm mt-12">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  ))}
                </div>
                500+ Experts waiting for you
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px; width: 24px;
          border-radius: 50%;
          background: #38bfa1;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(56, 191, 161, 0.5);
          transition: transform 0.2s;
        }
        input[type='range']::-webkit-slider-thumb:hover { transform: scale(1.2); }
      `}</style>
    </div>
  );
}
