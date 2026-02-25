import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Check, 
  Star, 
  Monitor, 
  Smartphone, 
  Tv, 
  Wifi, 
  MessageCircle, 
  CreditCard, 
  Zap, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getTrendingMovies, getPopularSeries, type MediaItem } from './services/tmdb';

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'purple';
  icon?: React.ElementType;
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 border-none',
    secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm',
    outline: 'border border-blue-500 text-blue-400 hover:bg-blue-500/10',
    ghost: 'hover:bg-white/5 text-gray-300 hover:text-white',
    success: 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30',
    purple: 'bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600 text-white shadow-lg shadow-purple-500/30',
  };

  return (
    <button 
      className={cn(
        'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95',
        variants[variant],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", className)}>
    {children}
  </span>
);

const SectionHeading = ({ 
  title, 
  highlight, 
  subtitle,
  align = 'center'
}: { 
  title: string; 
  highlight?: string; 
  subtitle?: string;
  align?: 'left' | 'center';
}) => (
  <div className={cn("mb-12", align === 'center' ? 'text-center' : 'text-left')}>
    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
      {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{highlight}</span>
    </h2>
    {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-[#050505]/90 backdrop-blur-md border-white/5 py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Play className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            FRIENDS<span className="text-blue-500">ZONE</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Início</a>
          <a href="#canais" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Canais</a>
          <a href="#planos" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Planos</a>
          <Button variant="primary" className="px-6 py-2 text-sm rounded-full">
            ASSINAR
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <a href="#inicio" className="text-gray-300" onClick={() => setMobileMenuOpen(false)}>Início</a>
              <a href="#canais" className="text-gray-300" onClick={() => setMobileMenuOpen(false)}>Canais</a>
              <a href="#planos" className="text-gray-300" onClick={() => setMobileMenuOpen(false)}>Planos</a>
              <Button className="w-full justify-center">ASSINAR</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Badge className="bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            O STREAMING Nº 1 DO BRASIL
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] mb-6 tracking-tight">
            PREPARE-SE <br />
            PARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">CANCELAR</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">TUDO</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            Esqueça as assinaturas caras. Tenha 2 milhões de filmes, canais 4K e 70 servidores de alta performance em um só lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button icon={Zap} className="text-lg px-8 py-4 shadow-blue-500/25">
              LIBERAÇÃO IMEDIATA
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-gray-400 bg-white/5 p-4 rounded-2xl border border-white/5 w-fit backdrop-blur-sm">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://randomuser.me/api/portraits/thumb/men/${i + 20}.jpg`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-[#050505]"
                />
              ))}
            </div>
            <div>
              <div className="flex text-yellow-500 mb-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <span className="text-white font-bold">+150k Clientes</span> satisfeitos
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop" 
              alt="Interface Preview" 
              className="w-full rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-current ml-1" />
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="flex items-center justify-between text-white text-xs font-mono mb-2">
                <span>00:11 / 00:58</span>
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/20" />
                  <div className="w-4 h-4 rounded-full bg-white/20" />
                </div>
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-blue-500/20 blur-3xl -z-10 rounded-full opacity-50" />
        </motion.div>
      </div>
    </section>
  );
};

const Channels = () => {
  const channels = [
    { name: 'Premiere', color: 'bg-green-600' },
    { name: 'ESPN', color: 'bg-red-600' },
    { name: 'Cartoon', color: 'bg-yellow-500 text-black' },
    { name: 'Paramount+', color: 'bg-blue-600' },
    { name: 'Telecine', color: 'bg-red-500' },
    { name: 'TNT', color: 'bg-pink-600' },
    { name: 'Discovery', color: 'bg-blue-400' },
    { name: 'History', color: 'bg-yellow-600' },
    { name: 'Netflix', color: 'bg-red-700' },
    { name: 'Disney+', color: 'bg-blue-900' },
    { name: 'Amazon', color: 'bg-blue-800' },
  ];

  return (
    <section id="canais" className="py-10 border-y border-white/5 bg-white/[0.02]">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Canais Premium em 4K Real</p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-4 px-4">
          {[...channels, ...channels, ...channels].map((channel, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex-shrink-0 px-6 py-3 rounded-lg font-bold text-white shadow-lg min-w-[120px] text-center flex items-center justify-center",
                channel.color
              )}
            >
              {channel.name}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            70 Servidores <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Zero Travamentos</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Nossa tecnologia OTT exclusiva garante que você assista ao Premiere, HBO e seus filmes favoritos sem aquele "loading" infinito que outros serviços têm.
          </p>

          <div className="space-y-4">
            {[
              "Canais 4K & Full HD com 60 FPS",
              "Futebol ao vivo sem delay (Premiere, ESPN, TNT)",
              "Catálogo atualizado DIARIAMENTE",
              "Suporte humano 24h via WhatsApp"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-200 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0f1115] rounded-2xl border border-white/10 p-6 shadow-2xl relative z-10">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold">SERVIDOR 02</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-500 font-bold uppercase">Online</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">16 MIL</div>
                <div className="text-xs text-gray-500 uppercase font-bold">Filmes</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Legendados', count: 3755, percent: 80 },
                { label: 'Drama', count: 1919, percent: 60 },
                { label: 'Comédia', count: 1637, percent: 50 },
                { label: 'Ação', count: 1544, percent: 45 },
              ].map((cat, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{cat.label}</span>
                    <span className="text-blue-400 font-mono">{cat.count}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000 group-hover:bg-cyan-400" 
                      style={{ width: `${cat.percent}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-600/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};


const ContentGrid = ({ title, type }: { title: string, type: 'movies' | 'series' }) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!import.meta.env.VITE_TMDB_API_KEY) {
        setHasKey(false);
        // Fallback data if no key
        const placeholders = Array(7).fill(0).map((_, i) => ({
          id: i,
          title: type === 'movies' ? `Filme ${i+1}` : `Série ${i+1}`,
          poster_path: `https://picsum.photos/seed/${type}${i}/300/450`,
          vote_average: 0
        }));
        setItems(placeholders);
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = type === 'movies' ? await getTrendingMovies() : await getPopularSeries();
      if (data.length > 0) {
        setItems(data.slice(0, 14)); // Get more items for better scrolling/grid
      } else {
        // Fallback if API fails even with key
         const placeholders = Array(7).fill(0).map((_, i) => ({
          id: i,
          title: type === 'movies' ? `Filme ${i+1}` : `Série ${i+1}`,
          poster_path: `https://picsum.photos/seed/${type}${i}/300/450`,
          vote_average: 0
        }));
        setItems(placeholders);
      }
      setLoading(false);
    };

    fetchData();
  }, [type]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{type === 'movies' ? '🎬' : '📺'}</span>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          {!hasKey && (
            <div className="text-xs text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
              Modo Demo (Adicione VITE_TMDB_API_KEY para dados reais)
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {loading ? (
             Array(7).fill(0).map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-xl bg-white/5 animate-pulse" />
             ))
          ) : (
            items.map((item) => (
              <div key={item.id} className="relative aspect-[2/3] rounded-xl overflow-hidden group cursor-pointer bg-[#1a1d24]">
                {item.poster_path ? (
                  <img 
                    src={item.poster_path} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500 text-xs">
                    Sem Imagem
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-sm font-bold line-clamp-2">{item.title}</span>
                  {item.vote_average > 0 && (
                    <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{item.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-blue-900/10">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="max-w-md w-full bg-[#1a1d24] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
          {/* Chat Header */}
          <div className="bg-[#20232b] p-4 flex items-center gap-3 border-b border-white/5">
            <div className="relative">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User" 
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#20232b]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Severino Bezerra</h4>
              <p className="text-xs text-gray-500">visto por último às 10:21</p>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-6 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
            <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[85%] text-sm text-gray-200 shadow-sm">
              <p>Bom dia Amanda</p>
              <p>Sim já recebi o acesso. achei muito eficiente o trabalho de vcs que continue assim.obrigado.</p>
              <div className="text-[10px] text-gray-500 text-right mt-1">07:18</div>
            </div>

            <div className="bg-blue-600 p-3 rounded-lg rounded-tr-none max-w-[85%] ml-auto text-sm text-white shadow-sm">
              <p>Obrigada! Ficamos à disposição</p>
              <div className="text-[10px] text-blue-200 text-right mt-1 flex items-center justify-end gap-1">
                10:21 <Check className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Steps = () => {
  const steps = [
    { icon: CreditCard, title: 'Pagamento', desc: 'PIX • Cartão • Boleto' },
    { icon: Zap, title: 'Sistema Inteligente', desc: 'Processamento automático' },
    { icon: Smartphone, title: 'WhatsApp', desc: 'Acesso enviado na hora' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-3xl p-8 md:p-12 border border-blue-500/20 relative overflow-hidden">
          <div className="relative z-10 text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Compra automática • <span className="text-blue-400">Entrega imediata</span>
            </h3>
          </div>

          <div className="relative z-10 grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-blue-500/30 flex items-center justify-center mb-4 group-hover:border-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                  <step.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <h4 className="text-white font-bold mb-1">{step.title}</h4>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-500/20">
              <Zap className="w-4 h-4 fill-current" />
              Receba tudo automaticamente no WhatsApp em segundos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="planos" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="PLANOS" 
          highlight="EXCLUSIVOS" 
          subtitle="Escolha o plano que melhor se adapta à sua necessidade."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Monthly Plan */}
          <div className="relative bg-[#0f1115] rounded-3xl p-8 border border-blue-500/30 hover:border-blue-500 transition-all duration-300 group hover:-translate-y-2 shadow-2xl shadow-blue-900/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Mais Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">PLANO MENSAL</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Por 30 dias</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-gray-400 text-sm mt-2">R$</span>
                <span className="text-5xl font-black text-white">19</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-red-500 line-through">R$ 50,00</span>
                  <span className="text-xl font-bold text-white">,99</span>
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "FriendsZone TV + 1 Servidor",
                "Filmes e Séries Liberados",
                "Canais 4K & Full HD",
                "1 Tela Simultânea",
                "Suporte Padrão",
                "Conteúdo Adulto (Opcional)"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <Button className="w-full shadow-blue-500/20">
              QUERO ESSE PLANO
            </Button>
            
            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase font-bold">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 100% Seguro</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Imediato</span>
            </div>
          </div>

          {/* Semestral Plan */}
          <div className="relative bg-[#0f1115] rounded-3xl p-8 border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 group hover:-translate-y-2 shadow-2xl shadow-green-900/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Melhor Custo
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">PLANO SEMESTRAL</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Por 6 meses</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-gray-400 text-sm mt-2">R$</span>
                <span className="text-5xl font-black text-white">99</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-red-500 line-through">R$ 180,00</span>
                  <span className="text-xl font-bold text-white">,99</span>
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "FriendsZone TV + 70 Servidores",
                "Filmes e Séries Liberados",
                "Canais 4K & Full HD",
                "2 Telas Simultâneas",
                "Suporte Prioritário",
                "Conteúdo Adulto (Opcional)"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <Button variant="success" className="w-full">
              QUERO ESSE PLANO
            </Button>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase font-bold">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 100% Seguro</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Imediato</span>
            </div>
          </div>

          {/* Annual Plan */}
          <div className="relative bg-[#0f1115] rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-2">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Super Oferta
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-white mb-2">PLANO ANUAL</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">Por 1 ano</p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-gray-400 text-sm mt-2">R$</span>
                <span className="text-5xl font-black text-white">147</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-red-500 line-through">R$ 360,00</span>
                  <span className="text-xl font-bold text-white">,00</span>
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "FriendsZone TV + 70 Servidores",
                "Filmes e Séries Liberados",
                "Canais 4K & Full HD",
                "2 Telas Simultâneas",
                "Suporte Prioritário",
                "Conteúdo Adulto (Opcional)"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-purple-400" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <Button variant="purple" className="w-full">
              QUERO ESSE PLANO
            </Button>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase font-bold">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 100% Seguro</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Imediato</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-current" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            FRIENDS<span className="text-blue-500">ZONE</span>
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-8">
          © 2024 FriendsZone TV Original. O fim das assinaturas caras começou.
        </p>
        
        <div className="flex gap-6">
          {[Monitor, Smartphone, Tv].map((Icon, i) => (
            <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
              <Icon className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Channels />
      <Features />
      <ContentGrid title="Filmes em Alta" type="movies" />
      <ContentGrid title="Séries Populares" type="series" />
      <Testimonial />
      <Steps />
      <Pricing />
      <Footer />
    </div>
  );
}
