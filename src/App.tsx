import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useInView } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  Dumbbell, 
  Users, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Star,
  MessageCircle,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Constants & Types ---

const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400",
  heroAthlete: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
  trainer1: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600",
  trainer2: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600",
  trainer3: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600",
  results1: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
  results2: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400",
  results3: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
  results4: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400",
};

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    const update = () => {
      setPosition(prev => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.15,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.15
      }));
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-gold rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(201, 168, 76, 0.1)' : 'rgba(201, 168, 76, 0)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[9999]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.2 }}
      />
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dim via-gold to-gold-bright z-[10001] origin-left"
      style={{ scaleX }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'SERVICES', href: '#services' },
    { name: 'MEMBERSHIP', href: '#membership' },
    { name: 'COACHES', href: '#coaches' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-500 ${
        isScrolled 
          ? 'bg-bg/80 backdrop-blur-xl border-b border-border py-4' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-medium tracking-[0.2em] text-gold flex items-center gap-2">
          <Dumbbell className="w-6 h-6" />
          GROUND ZERO GYM
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-widest text-white/70 hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button className="px-8 py-3 border border-gold text-xs font-medium tracking-widest text-gold hover:text-bg transition-colors relative overflow-hidden group">
            <span className="relative z-10">JOIN NOW</span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-bg2 border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium tracking-widest text-white/70 hover:text-gold"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full py-4 border border-gold text-xs font-medium tracking-widest text-gold">
                JOIN NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 400]);
  const athleteY = useTransform(scrollY, [0, 1000], [0, 600]);

  const headlineWords = "WHERE LIMITS END AND LEGENDS BEGIN".split(" ");

  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 grayscale-[0.3] brightness-[0.4]"
          style={{ backgroundImage: `url(${IMAGES.heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </motion.div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "100%", 
              opacity: 0 
            }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.3, 0] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-[10px] font-medium tracking-[0.3em] text-gold-dim uppercase">
              #1 RATED ELITE GYM IN GUWAHATI
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9] flex flex-wrap gap-x-4">
            {headlineWords.map((word, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.8 + i * 0.1, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="inline-block gold-shimmer"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="text-lg text-muted mb-10 max-w-lg font-light leading-relaxed"
          >
            Experience the pinnacle of fitness. Elite coaching, world-class equipment, 
            and a community that pushes you beyond your perceived boundaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 1 }}
            className="flex flex-wrap gap-6"
          >
            <button className="px-10 py-4 bg-gold text-bg text-xs font-bold tracking-widest hover:bg-gold-bright transition-all hover:scale-105 active:scale-95">
              START YOUR JOURNEY
            </button>
            <button className="px-10 py-4 border border-white/20 text-xs font-bold tracking-widest hover:border-gold hover:text-gold transition-all">
              VIEW PROGRAMS
            </button>
          </motion.div>
        </div>

        <motion.div 
          style={{ y: athleteY }}
          initial={{ opacity: 0, scale: 0.9, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden border border-border">
            <img 
              src={IMAGES.heroAthlete} 
              alt="Elite Athlete" 
              className="w-full h-auto object-cover grayscale-[0.2] brightness-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          </div>
          
          {/* Decorative Elements */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-10 -right-10 w-40 h-40 border border-gold/20 rounded-full border-dashed"
          />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/10 blur-3xl rounded-full" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] tracking-[0.4em] text-gold-dim uppercase">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

const StatsBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const stats = [
    { label: "ELITE MEMBERS", value: 1200, suffix: "+" },
    { label: "EXPERT COACHES", value: 25, suffix: "+" },
    { label: "MODERN EQUIPMENT", value: 150, suffix: "+" },
    { label: "SUCCESS STORIES", value: 98, suffix: "%" },
  ];

  return (
    <div ref={ref} className="bg-bg2 relative py-16 border-y border-border overflow-hidden">
      {/* Animated Borders */}
      <motion.div 
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-gold/30"
      />
      <motion.div 
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gold/30"
      />

      <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: i % 2 === 0 ? -40 : 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center relative"
          >
            <div className="text-4xl md:text-5xl font-headline italic text-gold mb-2 flex items-baseline">
              <Counter value={stat.value} isInView={isInView} />
              <span className="text-2xl ml-1">{stat.suffix}</span>
            </div>
            <span className="text-[10px] tracking-[0.2em] text-muted uppercase font-medium">
              {stat.label}
            </span>
            
            {i < stats.length - 1 && (
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gold/10"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Counter = ({ value, isInView }: { value: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return <span>{count}</span>;
};

const Services = () => {
  const services = [
    {
      title: "STRENGTH TRAINING",
      desc: "Build raw power with our elite selection of free weights and machines.",
      icon: <Dumbbell className="w-8 h-8" />,
    },
    {
      title: "CARDIO ENDURANCE",
      desc: "High-performance treadmills and bikes to push your heart to the limit.",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      title: "GROUP CLASSES",
      desc: "Join a community of warriors in our high-intensity group sessions.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "PERSONAL COACHING",
      desc: "One-on-one guidance from Guwahati's most elite fitness experts.",
      icon: <Trophy className="w-8 h-8" />,
    },
    {
      title: "NUTRITION PLANS",
      desc: "Customized fuel strategies to optimize your performance and recovery.",
      icon: <CheckCircle2 className="w-8 h-8" />,
    },
    {
      title: "RECOVERY SPA",
      desc: "Premium recovery tools to ensure you're ready for the next battle.",
      icon: <Star className="w-8 h-8" />,
    },
  ];

  return (
    <section id="services" className="py-32 bg-bg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs tracking-[0.4em] text-gold-dim uppercase mb-4 block">OUR EXPERTISE</span>
            <h2 className="text-5xl md:text-7xl leading-tight">
              ELITE <span className="text-gold">SERVICES</span> FOR<br />THE DRIVEN
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-[1px] bg-gold/20 flex-grow mx-12 hidden lg:block origin-left"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group p-10 bg-bg2 border border-border hover:border-gold/40 transition-all duration-500 relative overflow-hidden"
            >
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="text-gold mb-8 transition-colors group-hover:text-gold-bright"
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl mb-4 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  {service.desc}
                </p>
                <a href="#" className="text-[10px] tracking-[0.2em] text-gold font-bold flex items-center gap-2 group/link">
                  LEARN MORE 
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-2" />
                </a>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/5 blur-[80px] rounded-full group-hover:bg-gold/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Membership = () => {
  const plans = [
    {
      name: "RECRUIT",
      price: "1,999",
      features: ["Gym Access", "Locker Room", "Basic Equipment", "2 Group Classes/mo"],
      isPopular: false,
    },
    {
      name: "WARRIOR",
      price: "3,499",
      features: ["24/7 Access", "All Group Classes", "Nutrition Guide", "1 PT Session/mo"],
      isPopular: true,
    },
    {
      name: "ELITE",
      price: "5,999",
      features: ["VIP Lounge", "Unlimited PT", "Recovery Spa", "Custom Meal Prep"],
      isPopular: false,
    },
  ];

  return (
    <section id="membership" className="py-32 bg-bg2 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] text-gold-dim uppercase mb-4 block"
          >
            CHOOSE YOUR PATH
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl"
          >
            PICK YOUR <span className="text-gold">BATTLEGROUND</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -50 : i === 2 ? 50 : 0,
                y: i === 1 ? 50 : 0 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className={`relative p-12 border ${
                plan.isPopular ? 'border-gold bg-gold/5' : 'border-border bg-bg'
              } flex flex-col items-center text-center group`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-bg text-[10px] font-bold px-6 py-1 tracking-widest">
                  MOST POPULAR
                </div>
              )}
              
              <span className="text-xs tracking-[0.3em] text-gold-dim mb-6">{plan.name}</span>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-xl text-gold">₹</span>
                <span className="text-6xl font-headline italic">{plan.price}</span>
                <span className="text-muted text-sm">/mo</span>
              </div>

              <div className="w-full h-[1px] bg-border mb-10" />

              <ul className="space-y-6 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="text-sm text-muted flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 text-xs font-bold tracking-widest transition-all relative overflow-hidden group/btn ${
                plan.isPopular ? 'bg-gold text-bg' : 'border border-white/20 text-white hover:border-gold hover:text-gold'
              }`}>
                <span className="relative z-10 block group-hover/btn:-translate-y-full transition-transform duration-300">
                  SELECT PLAN
                </span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                  SELECT PLAN
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Results = () => {
  const results = [
    { img: IMAGES.results1, name: "Arjun S.", change: "-15kg in 3 months" },
    { img: IMAGES.results2, name: "Priya D.", change: "Muscle Gain +5kg" },
    { img: IMAGES.results3, name: "Rahul K.", change: "Body Fat -8%" },
    { img: IMAGES.results4, name: "Sneha M.", change: "Strength +40%" },
  ];

  return (
    <section className="py-32 bg-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl"
          >
            RESULTS <span className="text-gold">SPEAK</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((res, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
            >
              <img 
                src={res.img} 
                alt={res.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-xl mb-1">{res.name}</h4>
                <p className="text-[10px] tracking-widest text-gold uppercase font-bold">{res.change}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Coaches = () => {
  const coaches = [
    { name: "VIKRAM SINGH", role: "HEAD TRAINER", img: IMAGES.trainer1 },
    { name: "ANANYA DAS", role: "STRENGTH COACH", img: IMAGES.trainer2 },
    { name: "ROHAN BARUAH", role: "ATHLETIC PERFORMANCE", img: IMAGES.trainer3 },
  ];

  return (
    <section id="coaches" className="py-32 bg-bg2">
      <div className="container mx-auto px-6">
        <div className="flex justify-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-right"
          >
            <span className="text-xs tracking-[0.4em] text-gold-dim uppercase mb-4 block">THE ELITE</span>
            <h2 className="text-5xl md:text-7xl">
              YOUR <span className="text-gold">COACHES</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {coaches.map((coach, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-8 border border-border group-hover:border-gold transition-colors duration-500">
                <motion.img 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
                  src={coach.img} 
                  alt={coach.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
              </div>
              <h4 className="text-2xl mb-2 group-hover:text-gold transition-colors">{coach.name}</h4>
              <p className="text-[10px] tracking-[0.3em] text-muted uppercase font-medium translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                {coach.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Amitabh P.",
      text: "Ground Zero isn't just a gym, it's a transformation chamber. The atmosphere is electric and the coaches are truly elite.",
      rating: 5,
    },
    {
      name: "Jahnabi K.",
      text: "Best decision I've made for my health. The equipment is top-notch and the community is incredibly supportive.",
      rating: 5,
    },
    {
      name: "Debashish B.",
      text: "The personal coaching here is on another level. They don't just train you, they educate you on every movement.",
      rating: 5,
    },
  ];

  return (
    <section className="py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="p-12 bg-bg2 border border-border hover:border-gold/30 transition-all duration-500 group relative"
            >
              <div className="absolute top-8 right-12 text-6xl font-headline text-gold/10 group-hover:scale-125 transition-transform duration-500">"</div>
              <div className="flex gap-1 mb-8">
                {[...Array(review.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.1, type: "spring" }}
                  >
                    <Star className="w-4 h-4 fill-gold text-gold" />
                  </motion.div>
                ))}
              </div>
              <p className="text-lg text-white/80 italic mb-10 leading-relaxed">
                {review.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-gold" />
                <span className="text-xs tracking-widest text-gold font-bold uppercase">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-bg2">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs tracking-[0.4em] text-gold-dim uppercase mb-4 block">GET IN TOUCH</span>
            <h2 className="text-5xl md:text-7xl mb-12">
              READY TO <span className="text-gold">ASCEND?</span>
            </h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg transition-all duration-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs tracking-widest text-gold-dim mb-2">LOCATION</h5>
                  <p className="text-lg text-white/80">Zoo Road, Guwahati, Assam 781024</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs tracking-widest text-gold-dim mb-2">PHONE</h5>
                  <p className="text-lg text-white/80">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-bg transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs tracking-widest text-gold-dim mb-2">EMAIL</h5>
                  <p className="text-lg text-white/80">info@groundzerogym.com</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold tracking-widest text-xs shadow-xl shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              CHAT ON WHATSAPP
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square bg-bg border border-border overflow-hidden rounded-2xl"
          >
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-gold mb-4 flex justify-center"
                >
                  <MapPin className="w-12 h-12" />
                </motion.div>
                <p className="text-xs tracking-[0.3em] text-gold-dim">MAP VIEW UNAVAILABLE</p>
              </div>
            </div>
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-bg border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <a href="#" className="text-2xl font-medium tracking-[0.2em] text-gold flex items-center justify-center md:justify-start gap-2 mb-4">
              <Dumbbell className="w-6 h-6" />
              GROUND ZERO
            </a>
            <p className="text-xs text-muted tracking-widest uppercase">GUWAHATI'S #1 RATED ELITE GYM</p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-500">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-500">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase">© 2026 GROUND ZERO GYM. ALL RIGHTS RESERVED.</p>
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase mt-2">DESIGNED FOR THE ELITE.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg selection:bg-gold selection:text-bg">
      <div className="noise-overlay" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Membership />
        <Results />
        <Coaches />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
