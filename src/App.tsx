/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Music, 
  Music2, 
  Volume2, 
  VolumeX, 
  Users, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  MousePointer2,
  Menu,
  X,
  Info,
  Instagram,
  Github,
  Twitter
} from 'lucide-react';
import { useCountUp } from './hooks/useCountUp';

// --- Constants & Types ---

const WHATSAPP_NUMBER = '6283843709780'; 
const COMMUNITY_LINK = 'https://chat.whatsapp.com/JShWgPTRwVf6IGY81SsDDo';
const MARGA_1_LINK = 'https://chat.whatsapp.com/ClWKh6Y30FbKVGyIfSslE6?mode=hq2tcla';
const MARGA_2_LINK = 'https://chat.whatsapp.com/G4XFfbq74RDA8C4E26QfWD?mode=hq2tcla';
const MARGA_1_MEMBERS = '5,000+';
const MARGA_2_MEMBERS = '3,000+';
const MARGA_1_IMAGE = 'https://files.catbox.moe/e988jp.jpg';
const MARGA_2_IMAGE = 'https://files.catbox.moe/ra6nop.jpg';
const COMMUNITY_IMAGE = 'https://files.catbox.moe/t05e4z.jpg';
const MEMBER_COUNT = 12450;

const PREMIUM_PLANS = [
  {
    id: 'am-pre',
    title: 'AM Premium',
    price: 'Rp 10.000',
    features: ['1 Tahun', 'No Watermark', 'All Effects Unlocked'],
    color: 'from-purple-500 to-indigo-600',
    message: 'kak aku mau beli AM Premium 1 Tahun',
    logo: 'AM',
    icon: Zap,
    category: 'Editing'
  },
  {
    id: 'capcut-pro',
    title: 'Capcut Pro',
    price: 'Rp 20.000',
    features: ['1 Bulan / 5k 1 Minggu', 'Premium Features', 'No Watermark'],
    color: 'from-blue-500 to-cyan-600',
    message: 'kak aku mau beli Capcut Pro',
    logo: 'CP',
    icon: ShoppingBag,
    category: 'Editing'
  },
  {
    id: 'canva-pro',
    title: 'Canva Pro',
    price: 'Rp 20.000',
    features: ['1 Bulan', 'Premium Templates', 'Brand Kit'],
    color: 'from-blue-400 to-indigo-500',
    message: 'kak aku mau beli Canva Pro',
    logo: 'CV',
    icon: Star,
    category: 'Editing'
  },
  {
    id: 'picsart-pro',
    title: 'Picsart Pro',
    price: 'Rp 20.000',
    features: ['1 Bulan', 'Gold Features', 'No Ads'],
    color: 'from-pink-500 to-purple-600',
    message: 'kak aku mau beli Picsart Pro',
    logo: 'PA',
    icon: Star,
    category: 'Editing'
  },
  {
    id: 'vidio-pre',
    title: 'Vidio Platinum',
    price: 'Rp 25.000',
    features: ['1 Bulan', 'Sports & Movies', 'No Ads'],
    color: 'from-red-500 to-orange-600',
    message: 'kak aku mau beli Vidio Platinum',
    logo: 'VD',
    icon: ShoppingBag,
    category: 'Streaming'
  },
  {
    id: 'youtube-pre',
    title: 'YouTube Premium',
    price: 'Rp 25.000',
    features: ['1 Bulan', 'No Ads', 'Background Play'],
    color: 'from-red-600 to-rose-700',
    message: 'kak aku mau beli YouTube Premium',
    logo: 'YT',
    icon: ShoppingBag,
    category: 'Streaming'
  },
  {
    id: 'bstation-pre',
    title: 'Bstation Premium',
    price: 'Rp 40.000',
    features: ['Private 40k / Sharing 20k', '1 Bulan', 'High Quality'],
    color: 'from-pink-400 to-rose-500',
    message: 'kak aku mau beli Bstation Premium',
    logo: 'BS',
    icon: ShoppingBag,
    category: 'Streaming'
  },
  {
    id: 'wink-pre',
    title: 'Wink Premium',
    price: 'Rp 10.000',
    features: ['1 Minggu', 'Advanced Editing', 'Premium Filters'],
    color: 'from-blue-300 to-indigo-400',
    message: 'kak aku mau beli Wink Premium',
    logo: 'WK',
    icon: Star,
    category: 'Editing'
  },
  {
    id: 'spotify-pre',
    title: 'Spotify Premium',
    price: 'Rp 25.000',
    features: ['1 Bulan / 40k 2 Bulan', 'Offline Play', 'No Ads'],
    color: 'from-emerald-500 to-green-600',
    message: 'kak aku mau beli Spotify Premium',
    logo: 'SP',
    icon: Music,
    category: 'Music'
  },
  {
    id: 'iqiyi-pre',
    title: 'iQIYI Premium',
    price: 'Rp 35.000',
    features: ['Private 35k / Invite 25k', '1 Bulan', 'VIP Content'],
    color: 'from-green-400 to-emerald-500',
    message: 'kak aku mau beli iQIYI Premium',
    logo: 'IQ',
    icon: ShoppingBag,
    category: 'Streaming'
  },
  {
    id: 'gpt-plus',
    title: 'ChatGPT Plus',
    price: 'Rp 20.000',
    features: ['1 Bulan', 'GPT-4 Access', 'Fast Response'],
    color: 'from-teal-500 to-emerald-600',
    message: 'kak aku mau beli ChatGPT Plus',
    logo: 'GPT',
    icon: Zap,
    category: 'AI'
  },
  {
    id: 'gemini-pro',
    title: 'Gemini Advanced',
    price: 'Rp 20.000',
    features: ['3 Bulan', 'Advanced AI', 'Google Integration'],
    color: 'from-blue-600 to-indigo-700',
    message: 'kak aku mau beli Gemini Advanced',
    logo: 'GM',
    icon: Zap,
    category: 'AI'
  },
  {
    id: 'apple-music',
    title: 'Apple Music',
    price: 'Rp 15.000',
    features: ['1 Bulan', 'Lossless Audio', 'Spatial Audio'],
    color: 'from-rose-500 to-pink-600',
    message: 'kak aku mau beli Apple Music',
    logo: 'AM',
    icon: Music,
    category: 'Music'
  },
  {
    id: 'loklok-pre',
    title: 'LokLok Premium',
    price: 'Rp 45.000',
    features: ['Basic 45k 40hari / Standar 75k 1bln', 'VIP Access', 'No Ads'],
    color: 'from-yellow-500 to-orange-600',
    message: 'kak aku mau beli LokLok Premium',
    logo: 'LL',
    icon: ShoppingBag,
    category: 'Streaming'
  },
  {
    id: 'viu-pre',
    title: 'Viu Premium',
    price: 'Rp 15.000',
    features: ['1bln 15k / 1th 50k / 3bln 30k', '6bln 40k / Lifetime 20k', 'VIP Content'],
    color: 'from-yellow-400 to-orange-500',
    message: 'kak aku mau beli Viu Premium',
    logo: 'VI',
    icon: ShoppingBag,
    category: 'Streaming'
  },
  {
    id: 'wetv-pre',
    title: 'WeTV Premium',
    price: 'Rp 30.000',
    features: ['1 Bulan', 'VIP Content', 'Fast Track'],
    color: 'from-orange-500 to-red-600',
    message: 'kak aku mau beli WeTV Premium',
    logo: 'WE',
    icon: ShoppingBag,
    category: 'Streaming'
  }
];

// --- Components ---

const AnimeMascot = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mascotRef.current) {
        const rect = mascotRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance to mouse
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        setIsNear(dist < 200);

        // Calculate tilt
        const tiltX = (e.clientX - centerX) / 20;
        const tiltY = (e.clientY - centerY) / 20;
        setMousePos({ 
          x: Math.max(Math.min(tiltX, 15), -15), 
          y: Math.max(Math.min(tiltY, 15), -15) 
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTouch = () => {
    if (isTouched) return;
    setIsTouched(true);
    setShowMessage(true);
    
    // Heart particles
    const hearts = document.createElement('div');
    hearts.className = 'absolute inset-0 pointer-events-none z-50 flex items-center justify-center';
    hearts.innerHTML = '💖✨🌸';
    hearts.style.fontSize = '24px';
    hearts.style.animation = 'floatUp 1s ease-out forwards';
    
    const container = mascotRef.current;
    if (container) {
      container.appendChild(hearts);
      setTimeout(() => hearts.remove(), 1000);
    }

    setTimeout(() => setIsTouched(false), 600);
    setTimeout(() => setShowMessage(false), 4000);
  };

  const phrases = [
    "Halo! Ada yang bisa kubantu? ✨",
    "ALF keren banget kan? 💖",
    "Semangat belajarnya ya! 🌸",
    "Jangan lupa istirahat! 🍵",
    "Kamu hebat hari ini! 🌟"
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    if (showMessage) {
      setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    }
  }, [showMessage]);

  return (
    <div 
      ref={mascotRef}
      className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start pointer-events-none"
    >
      <AnimatePresence>
        {(showMessage || isNear) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: -10 }}
            className="mb-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-xs font-medium shadow-[0_0_20px_rgba(168,85,247,0.3)] relative"
          >
            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-purple-500/40 rotate-45 border-r border-b border-white/20" />
            {showMessage ? currentPhrase : "Hehe, halo! 👋"}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        animate={isTouched ? { 
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        } : {
          y: [0, -15, 0],
          rotate: mousePos.x * 0.5,
          x: mousePos.x * 0.2,
          scale: isNear ? 1.05 : 1
        }}
        transition={isTouched ? { 
          duration: 0.6,
          ease: "backOut"
        } : { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        onClick={handleTouch}
        className="cursor-pointer pointer-events-auto group relative"
      >
        {/* Dynamic Glow */}
        <motion.div 
          animate={{
            scale: isNear ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: isNear ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-white/10 blur-[60px] rounded-full" 
        />
        <motion.div 
          animate={{
            scale: isNear ? [1, 1.2, 1] : 1,
            opacity: isNear ? [0.3, 0.6, 0.3] : 0.2
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-purple-500 blur-3xl rounded-full" 
        />
        
        {/* Anime Character - AI Mascot */}
        <div className="relative" style={{ 
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}>
          {/* Floating Mini Cat from Video */}
          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-80"
          >
            <div className="relative w-12 h-10 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
              <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="10" r="1.5" fill="white" fillOpacity="0.8"/>
                <circle cx="22" cy="10" r="1.5" fill="white" fillOpacity="0.8"/>
                <path d="M12 13C12.5 14.5 14 15 15 15C16 15 17.5 14.5 18 13" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5 5L8 8" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M25 5L22 8" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>

          {/* Floating Droplets from Video */}
          <motion.div
            animate={{ y: [0, 15, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-8 top-1/4 text-blue-400/60 text-xl"
          >
            💧
          </motion.div>
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -right-12 top-2/3 text-blue-300/40 text-lg"
          >
            💧
          </motion.div>

          <MascotCode size="md" />
        </div>
        
        {/* Status Indicator */}
        <motion.div 
          animate={{ 
            scale: isNear ? [1, 1.4, 1] : [1, 1.2, 1],
            backgroundColor: isNear ? "#a855f7" : "#6366f1"
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-2 right-4 w-3 h-3 rounded-full border-2 border-white z-20 shadow-lg"
        />
      </motion.div>
    </div>
  );
};

const MascotCode = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dimensions = {
    sm: "w-24 h-24",
    md: "w-36 md:w-48 h-36 md:h-48",
    lg: "w-72 h-72 md:w-96 md:h-96"
  };

  return (
    <motion.div 
      className={`relative ${dimensions[size]} flex items-center justify-center`}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full animate-pulse" />
      
      {/* Body */}
      <div className="relative w-[80%] h-[80%] glass rounded-[2.5rem] border-2 border-white/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
        
        {/* Face */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Eyes Container */}
          <div className="flex gap-8">
            {/* Left Eye */}
            <div className="relative">
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                className="w-4 h-6 bg-white rounded-full shadow-[0_0_15px_white]"
              />
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-400 rounded-full blur-[1px]" />
            </div>
            {/* Right Eye */}
            <div className="relative">
              <motion.div 
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                className="w-4 h-6 bg-white rounded-full shadow-[0_0_15px_white]"
              />
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full blur-[1px]" />
            </div>
          </div>
          
          {/* Mouth */}
          <motion.div 
            animate={{ scaleX: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-6 h-1 bg-white/40 rounded-full"
          />
        </div>

        {/* Core */}
        <motion.div 
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 w-12 h-2 bg-purple-400 rounded-full blur-[4px]"
        />
      </div>

      {/* Floating Ears/Antennas */}
      <motion.div 
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-4 -left-2 w-8 h-12 glass rounded-t-full border-t-2 border-white/30 -rotate-[20deg]"
      />
      <motion.div 
        animate={{ rotate: [5, -5, 5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-4 -right-2 w-8 h-12 glass rounded-t-full border-t-2 border-white/30 rotate-[20deg]"
      />

      {/* Floating Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -40, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3 + i, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
          className="absolute w-2 h-2 bg-purple-400 rounded-full blur-[2px]"
          style={{ 
            top: '50%', 
            left: i === 0 ? '10%' : i === 1 ? '90%' : '50%' 
          }}
        />
      ))}
    </motion.div>
  );
};

const Sidebar = ({ isOpen, onClose, onNavigate }: { isOpen: boolean; onClose: () => void; onNavigate: (id: string) => void }) => {
  const menuItems = [
    { id: 'hero', label: 'Home', icon: Star },
    { id: 'join', label: 'Join Marga', icon: Users },
    { id: 'store', label: 'Jualan AM', icon: ShoppingBag },
    { id: 'creator', label: 'Info Pembuat', icon: Info },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 glass border-r border-white/10 z-[70] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg">A</div>
                <span className="font-fantasy text-2xl tracking-widest">ALF</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-4 flex-grow">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); onClose(); }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="font-bold text-lg text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Social Media</p>
              <div className="flex gap-4">
                <a href="#" className="p-3 glass rounded-xl hover:text-purple-400 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-3 glass rounded-xl hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="p-3 glass rounded-xl hover:text-gray-400 transition-colors"><Github className="w-5 h-5" /></a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FallingStars = () => {
  const [stars, setStars] = useState<{ id: number; delay: string; duration: string; top: string; left: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * 12}s`,
      duration: `${1 + Math.random() * 1.5}s`,
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="animate-star absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_4px_white]"
          style={{
            '--delay': star.delay,
            '--duration': star.duration,
            top: star.top,
            left: star.left,
          } as any}
        />
      ))}
    </div>
  );
};

const GalaxyBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.warn("Autoplay blocked or failed:", err);
        });
      }
    };
    
    playVideo();
    // Fallback for some mobile browsers that require a touch to start even muted videos
    window.addEventListener('touchstart', playVideo, { once: true });
    window.addEventListener('click', playVideo, { once: true });
    
    return () => {
      window.removeEventListener('touchstart', playVideo);
      window.removeEventListener('click', playVideo);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050505]">
      {/* Video Background - Full visibility with a slight brightness boost */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.8) contrast(1.1)' }}
      >
        <source src="https://files.catbox.moe/v3zegd.mp4" type="video/mp4" />
      </video>

      {/* Minimal Overlay - Only to ensure text is readable, not to darken the video significantly */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* Twinkling Stars - Reduced opacity to not compete with video */}
      {[...Array(40)].map((_, i) => (
        <div
          key={`twinkle-${i}`}
          className="absolute w-[1px] h-[1px] bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `twinkle ${1.5 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: '0 0 3px white',
            opacity: 0.2 + Math.random() * 0.3
          }}
        />
      ))}

      {/* Falling Stars - The main decoration requested */}
      <FallingStars />

      {/* Noise Texture for cinematic feel - very subtle */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

const AnimeCharacter = () => {
  return (
    <div className="relative mx-auto flex items-center justify-center">
      <MascotCode size="lg" />
      
      {/* Floating Icons around Mascot */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -right-12 w-16 h-16 glass rounded-2xl flex items-center justify-center text-purple-400 shadow-xl z-20"
      >
        <Star className="w-8 h-8 fill-current" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 -left-12 w-16 h-16 glass rounded-2xl flex items-center justify-center text-blue-400 shadow-xl z-20"
      >
        <Zap className="w-8 h-8 fill-current" />
      </motion.div>
      <div className="absolute inset-0 bg-purple-600/10 blur-[120px] rounded-full -z-10" />
    </div>
  );
};

const PremiumCard = ({ plan }: { plan: typeof PREMIUM_PLANS[0] }) => {
  const handleBuy = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      className="neon-border-wrapper group min-w-[300px] md:min-w-[350px]"
    >
      <div className="neon-border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass p-8 rounded-3xl h-full flex flex-col z-10">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} p-0.5 mb-6 shadow-xl relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}>
          <img 
            src={COMMUNITY_IMAGE} 
            alt="ALF" 
            className="w-full h-full rounded-[1.2rem] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          <div className="absolute bottom-1 right-1 bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-lg text-[10px] font-black text-white border border-white/20">
            {plan.logo}
          </div>
        </div>
        <h3 className="text-2xl font-bold font-display mb-2">{plan.title}</h3>
        <div className="text-4xl font-bold text-white mb-8">
          {plan.price}
        </div>
        <ul className="space-y-4 mb-10 flex-grow">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-center text-gray-300">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              </div>
              {f}
            </li>
          ))}
        </ul>
        <button 
          onClick={handleBuy}
          className="w-full py-4 rounded-2xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all active:scale-95 shadow-lg"
        >
          Beli Sekarang
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio 
        ref={audioRef} 
        loop 
        src="https://vy-z.vercel.app/c4O5.opus" 
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`w-16 h-16 rounded-full glass flex items-center justify-center shadow-2xl transition-all border-2 ${isPlaying ? 'text-purple-400 border-purple-500/50' : 'text-white border-white/10'}`}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="w-7 h-7" />
            <motion.div 
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-purple-500 rounded-full -z-10"
            />
          </div>
        ) : (
          <VolumeX className="w-7 h-7" />
        )}
      </motion.button>
    </div>
  );
};

export default function App() {
  const members = useCountUp(MEMBER_COUNT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'hero' | 'join' | 'store' | 'creator'>('hero');
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Editing', 'Streaming', 'Music', 'AI'];
  const filteredPlans = selectedCategory === 'All' 
    ? PREMIUM_PLANS 
    : PREMIUM_PLANS.filter(plan => plan.category === selectedCategory);

  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeView === 'store' && scrollRef.current && containerRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      setDragConstraints({ left: Math.min(0, -(scrollWidth - containerWidth + 32)), right: 0 });
    }
  }, [activeView, selectedCategory]);

  const handleJoin = () => {
    window.open(MARGA_1_LINK, '_blank');
  };

  const scrollStore = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const viewVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="h-screen w-full relative selection:bg-purple-500/30 text-white overflow-hidden">
      {/* Background Elements */}
      <GalaxyBackground />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-2xl shadow-2xl">A</div>
              <span className="font-fantasy text-3xl tracking-[0.2em] hidden sm:block">ALF</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-3 glass px-5 py-2 rounded-2xl text-sm border-white/5">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="font-mono font-bold">{members.toLocaleString()} Members</span>
            </div>
            <button 
              onClick={() => setActiveView('join')}
              className="bg-white text-black px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
            >
              Join Marga
            </button>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={(id) => setActiveView(id as any)} />

      <main className="h-full w-full pt-24">
        <AnimatePresence mode="wait">
          {activeView === 'hero' && (
            <motion.section
              key="hero"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full flex flex-col items-center justify-center px-6 relative overflow-hidden"
            >
              <div className="max-w-5xl w-full text-center space-y-12 relative z-10">
                {/* PP Marga - Center Top */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="relative mx-auto w-40 h-40 md:w-56 md:h-56"
                >
                  {/* Tech Orbit Detail */}
                  <div className="absolute inset-[-40px] md:inset-[-60px] pointer-events-none">
                    {/* Rotating Ring 1 */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-dashed border-purple-500/30 rounded-full"
                    />
                    {/* Rotating Ring 2 */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border border-purple-400/10 rounded-full"
                    />
                    {/* Tech Dots */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating Tech Labels (Cool Details) */}
                  <div className="absolute -top-10 -left-10 md:-top-16 md:-left-16 z-20">
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="glass px-3 py-1 rounded-lg border-white/10 text-[10px] font-mono text-purple-300 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      SYSTEM ACTIVE
                    </motion.div>
                  </div>
                  <div className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-16 z-20">
                    <motion.div 
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="glass px-3 py-1 rounded-lg border-white/10 text-[10px] font-mono text-blue-300"
                    >
                      EST. 2024
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
                  <img 
                    src={COMMUNITY_IMAGE} 
                    alt="ALF Community" 
                    className="w-full h-full rounded-full border-4 border-white/10 shadow-2xl object-cover relative z-10"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Small Mascot near PP - Offset to not cover */}
                  <div className="absolute -bottom-2 -right-10 md:-bottom-4 md:-right-16 z-20">
                    <MascotCode size="sm" />
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <div className="inline-block glass px-4 py-1 rounded-full text-xs font-bold text-purple-400 uppercase tracking-[0.3em] mb-4">Official Community</div>
                  <h1 className="text-6xl md:text-9xl font-fantasy tracking-tighter leading-none">
                    ALF <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">FAMILY</span>
                  </h1>
                  <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed">
                    Tempat berkumpulnya para editor dan pecinta anime. <br className="hidden md:block" />
                    Bergabunglah dengan keluarga besar kami sekarang.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => setActiveView('join')}
                    className="px-10 py-5 rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-3 group"
                  >
                    <Users className="w-6 h-6" />
                    Pilih Marga ALF
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeView === 'join' && (
            <motion.section
              key="join"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full flex flex-col items-center justify-center px-6"
            >
              <div className="max-w-5xl w-full text-center space-y-12">
                <div className="flex flex-col items-center gap-6">
                  <motion.img 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    src={COMMUNITY_IMAGE} 
                    alt="ALF Community" 
                    className="w-48 h-48 rounded-full border-4 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-7xl font-fantasy tracking-tight">PILIH <span className="text-purple-400">MARGA</span></h2>
                    <p className="text-gray-400 text-lg">Silakan pilih marga yang ingin Anda masuki.</p>
                  </div>

                  <motion.a 
                    href={COMMUNITY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full max-w-md mx-auto py-5 rounded-3xl bg-white text-black font-bold text-xl flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-gray-100 transition-all"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Join Main Community
                  </motion.a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
                  <motion.a 
                    href={MARGA_1_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-purple-500/30 shadow-2xl"
                  >
                    <img src={MARGA_1_IMAGE} alt="Marga 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                        <Users className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-4xl font-black mb-2 tracking-tighter">MARGA GEN 1</h3>
                        <div className="flex items-center justify-center gap-2 text-purple-300 font-mono text-sm">
                          <Users className="w-4 h-4" />
                          <span>{MARGA_1_MEMBERS} Members</span>
                        </div>
                      </div>
                      <div className="w-full py-4 rounded-2xl bg-purple-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl group-hover:bg-purple-500 transition-colors">
                        Join Group <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.a>

                  <motion.a 
                    href={MARGA_2_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-blue-500/30 shadow-2xl"
                  >
                    <img src={MARGA_2_IMAGE} alt="Marga 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform">
                        <Users className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-4xl font-black mb-2 tracking-tighter">MARGA GEN 2</h3>
                        <div className="flex items-center justify-center gap-2 text-blue-300 font-mono text-sm">
                          <Users className="w-4 h-4" />
                          <span>{MARGA_2_MEMBERS} Members</span>
                        </div>
                      </div>
                      <div className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl group-hover:bg-blue-500 transition-colors">
                        Join Group <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.a>
                </div>

                <button 
                  onClick={() => setActiveView('hero')}
                  className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center gap-2 mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Home
                </button>
              </div>
            </motion.section>
          )}

          {activeView === 'store' && (
            <motion.section
              key="store"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full flex flex-col justify-center px-6"
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 w-full">
                  <div className="flex items-center gap-6">
                    <motion.div
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse" />
                      <img 
                        src={COMMUNITY_IMAGE} 
                        className="w-20 h-20 md:w-28 md:h-28 rounded-3xl border-2 border-white/10 shadow-2xl object-cover relative z-10" 
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    <div className="space-y-2">
                      <h2 className="text-4xl md:text-6xl font-display font-bold">ALF Store</h2>
                      <p className="text-gray-400 text-lg">Layanan Premium & Preset Terbaik.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {/* Category Selection */}
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            selectedCategory === cat 
                              ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
                              : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-4 justify-end">
                      <button onClick={() => scrollStore('left')} className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                      <button onClick={() => scrollStore('right')} className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"><ArrowRight className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>

                <div ref={containerRef} className="relative group w-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden lg:flex flex-col items-center gap-2">
                    <motion.div animate={{ x: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }} className="glass p-4 rounded-full"><MousePointer2 className="w-6 h-6 text-purple-400" /></motion.div>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Geser untuk melihat</span>
                  </div>

                  <motion.div 
                    key={selectedCategory} // Reset scroll position on category change
                    ref={scrollRef}
                    drag="x"
                    dragConstraints={dragConstraints}
                    className="flex gap-8 pb-12 px-4 no-scrollbar cursor-grab active:cursor-grabbing"
                    whileTap={{ cursor: "grabbing" }}
                  >
                    {filteredPlans.map((plan) => (
                      <div key={plan.id} className="select-none">
                        <PremiumCard plan={plan} />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {activeView === 'creator' && (
            <motion.section
              key="creator"
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full flex flex-col justify-center px-6"
            >
              <div className="max-w-4xl mx-auto w-full">
                <div className="text-center space-y-8">
                  <div className="inline-block glass px-4 py-1 rounded-full text-xs font-bold text-blue-400 uppercase tracking-[0.3em] mb-4">The Architect</div>
                  <h2 className="text-4xl md:text-6xl font-display font-bold">Info Pembuat</h2>
                  
                  <div className="glass p-12 rounded-[3rem] relative overflow-hidden group">
                    <div 
                      className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center"
                      style={{ backgroundImage: 'url(https://files.catbox.moe/yoff7e.jpg)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                      <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                        <img src="https://files.catbox.moe/rn2bim.jpg" alt="Creator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="text-left space-y-6 flex-grow">
                        <div>
                          <h3 className="text-3xl font-bold mb-2">ALF Team</h3>
                          <p className="text-purple-400 font-mono">Community Management & Development</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="glass p-4 rounded-2xl border-white/5">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Pembuat</p>
                            <p className="font-bold text-lg">Lin an ran</p>
                          </div>
                          <div className="glass p-4 rounded-2xl border-white/5">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Wakil</p>
                            <p className="font-bold text-lg">Lin an ran</p>
                          </div>
                          <div className="glass p-4 rounded-2xl border-white/5 sm:col-span-2">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Owner Marga</p>
                            <p className="font-bold text-lg text-purple-400">Riyo store</p>
                          </div>
                        </div>

                        <p className="text-gray-400 leading-relaxed">
                          Berdedikasi untuk membangun ekosistem komunitas anime yang sehat dan kreatif di Indonesia. 
                          Fokus pada pengembangan alat bantu editor dan penyediaan layanan premium terpercaya.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <MusicPlayer />

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
