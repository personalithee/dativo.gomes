/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Componente elegante de player de vídeo para os cards com controles editoriais
interface VideoPlayerProps {
  src: string;
  badge?: string | null;
  title: string;
  onExpand?: () => void;
  className?: string;
}

function VideoCardPlayer({ src, badge, title, onExpand, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black ${className}`}>
      {/* Elemento de vídeo em loop contínuo suave */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Gradientes elegantes superior e inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-transparent via-55% to-[#050a1a]/60 pointer-events-none" />

      {/* Badges superiores */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10 pointer-events-none">
        {badge && (
          <span className="px-3 py-1 bg-[#050a1a]/85 border border-[#2563eb]/50 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-sm backdrop-blur-md shadow-sm">
            {badge}
          </span>
        )}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300">Tour Vídeo</span>
        </div>
      </div>

      {/* Controles sofisticados no rodapé do player */}
      <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-6 flex items-center gap-2 z-20">
        <button
          type="button"
          onClick={togglePlay}
          className="p-2 sm:p-2.5 bg-[#050a1a]/85 hover:bg-[#1d4ed8] text-white border border-slate-700/70 hover:border-[#2563eb] rounded-sm backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer"
          title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
          aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="p-2 sm:p-2.5 bg-[#050a1a]/85 hover:bg-[#1d4ed8] text-white border border-slate-700/70 hover:border-[#2563eb] rounded-sm backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer"
          title={isMuted ? 'Ativar som' : 'Desativar som'}
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        {onExpand && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="p-2 sm:p-2.5 bg-[#050a1a]/85 hover:bg-[#1d4ed8] text-white border border-slate-700/70 hover:border-[#2563eb] rounded-sm backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer"
            title="Expandir vídeo"
            aria-label="Expandir vídeo"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
import { 
  ArrowUpRight, 
  MessageSquare, 
  X, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  TreePine, 
  Sparkles, 
  Building2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeModal, setActiveModal] = useState<'contact' | 'opportunities' | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interestType, setInterestType] = useState<'comprar' | 'vender' | 'investir'>('comprar');
  
  // Estado para modal de vídeo em tela cheia / expandido
  const [expandedVideo, setExpandedVideo] = useState<{ src: string; title: string } | null>(null);

  // Imagem enviada: "Dativo Gomes Banner.png" (Desktop) e "dativogomes.vertical.png" (Mobile e Tablet)
  const heroImageSrc = encodeURI('/Dativo Gomes Banner.png');
  const heroMobileImageSrc = encodeURI('/dativogomes.vertical.png');

  // Configuração centralizada do WhatsApp de Dativo Gomes
  const DATIVO_WHATSAPP_PHONE = '5562993302090'; // Número oficial: +55 62 99330-2090
  const DATIVO_DEFAULT_WA_MESSAGE = 'Olá, Dativo! Vim pelo seu site e gostaria de conversar sobre uma oportunidade imobiliária.';
  const DATIVO_DEFAULT_WA_URL = `https://wa.me/${DATIVO_WHATSAPP_PHONE}?text=${encodeURIComponent(DATIVO_DEFAULT_WA_MESSAGE)}`;

  interface OpportunityItem {
    id: string;
    title: string;
    tag: string;
    location: string;
    features: { label: string; value: string }[];
    highlight: string | null;
    price: string | null;
    pricePrefix?: string;
    aspect: string;
    videoSrc?: string | null;
    videoBadge?: string | null;
    imageSrc?: string | null;
    placeholderColor: string;
    placeholderType: string;
  }

  // Oportunidades em destaque com dados reais fornecidos e vídeos reais integrados
  const OPPORTUNITIES: OpportunityItem[] = [
    {
      id: 'golden-gate',
      title: 'Golden Gate — Eldorado Parque',
      tag: 'Lançamento',
      location: 'Eldorado Parque, Goiânia',
      features: [
        { label: 'Entrega prevista', value: 'Junho de 2027' },
        { label: 'Plantas', value: '63 m² e 76 m²' },
      ],
      highlight: 'Próximo ao parque',
      price: null,
      aspect: 'featured', // Destaque maior na composição
      videoSrc: '/golden-gate.mp4',
      videoBadge: 'Decorado 3Q | 76 m²',
      placeholderColor: 'from-[#0b1736] via-[#10224d] to-[#071126]',
      placeholderType: 'golden',
    },
    {
      id: 'portal-do-lago',
      title: 'Portal do Lago',
      tag: 'Condomínio Fechado',
      location: 'Goiânia e Região',
      features: [
        { label: 'Tipo', value: 'Condomínio Fechado' },
      ],
      highlight: 'Proposta voltada para qualidade de vida, tranquilidade e convivência familiar',
      price: null,
      aspect: 'portrait', // Card vertical imponente
      videoSrc: null,
      videoBadge: 'Condomínio Fechado',
      imageSrc: '/portal-do-sol.png',
      placeholderColor: 'from-[#0d1d3f] via-[#09152e] to-[#050c1b]',
      placeholderType: 'lake',
    },
    {
      id: 'eldorado-tijuca',
      title: 'Eldorado Tijuca',
      tag: 'Oportunidade',
      location: 'Parque Oeste Industrial / Eldorado',
      features: [
        { label: 'Condição', value: 'Possibilidade de financiamento bancário' },
      ],
      highlight: null,
      price: 'R$ 375.000',
      pricePrefix: 'A partir de',
      aspect: 'standard',
      videoSrc: null,
      imageSrc: '/eldorado-parque-tijuca.png',
      placeholderColor: 'from-[#10234a] via-[#0b1836] to-[#071024]',
      placeholderType: 'urban',
    },
    {
      id: 'eldorado-parque-decorado',
      title: 'Eldorado Parque — Apartamento decorado',
      tag: 'Decorado Exclusivo',
      location: 'Goiânia',
      features: [
        { label: 'Condição', value: 'Pro-soluto de até R$ 35.000 em até 60 parcelas' },
      ],
      highlight: 'Unidade com acabamento e ambientação diferenciada',
      price: 'R$ 375.000',
      pricePrefix: 'Valor',
      aspect: 'standard',
      videoSrc: '/eldorado-decorado.mp4',
      videoBadge: 'Decorado 2Q | 54 m²',
      imageSrc: null,
      placeholderColor: 'from-[#132857] via-[#0c1b3d] to-[#060e22]',
      placeholderType: 'interior',
    },
    {
      id: 'provence',
      title: 'Provence — Condomínio Aberto',
      tag: 'Lotes Urbanizados',
      location: 'Entre Vila Pedroso e Jardim das Oliveiras',
      features: [
        { label: 'Área verde', value: 'Mais de 80 mil m²' },
      ],
      highlight: 'Localização privilegiada entre Vila Pedroso e Jardim das Oliveiras',
      price: 'R$ 639 mensais',
      pricePrefix: 'Lotes a partir de',
      aspect: 'wide', // Card amplo na base
      videoSrc: null,
      imageSrc: '/provence.png',
      placeholderColor: 'from-[#0c1f44] via-[#08152e] to-[#040a16]',
      placeholderType: 'nature',
    },
  ];

  const handleInterestClick = (propertyTitle: string) => {
    const message = `Olá, Dativo! Vi uma oportunidade no seu site e gostaria de saber mais sobre ${propertyTitle}.`;
    const whatsappUrl = `https://wa.me/${DATIVO_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleModalClose = () => {
    setActiveModal(null);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      handleModalClose();
    }, 2400);
  };

  return (
    <div className="relative w-full bg-[#050a1a] text-white flex flex-col overflow-x-hidden">
      
      {/* ============================================================ */}
      {/* 1. HERO DESKTOP & NOTEBOOK: IMAGEM 1 HORIZONTAL              */}
      {/* (Texto sobreposto ao lado esquerdo, Dativo ao lado direito)  */}
      {/* Exibido a partir de telas médias/computadores (hidden md:flex)*/}
      {/* ============================================================ */}
      <header className="hidden md:flex relative min-h-[600px] lg:min-h-screen w-full flex-col justify-center overflow-hidden bg-[#000003]">
        {/* Banner horizontal original completo em alta resolução */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <motion.img
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src={heroImageSrc}
            alt="Dativo Gomes"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right lg:object-center"
          />

          {/* Gradiente levíssimo no extremo esquerdo apenas para fusão periférica suave */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#000003] via-[#000003]/80 via-30% md:via-[#000003]/30 md:via-48% to-transparent pointer-events-none" 
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#000003]/70 via-transparent via-25% to-transparent pointer-events-none" 
          />
        </div>

        {/* CONTEÚDO DO DESKTOP: SOBREPOSTO AO LADO ESQUERDO */}
        <main className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24 xl:py-28 flex items-center min-h-[600px] lg:min-h-screen">
          <div className="w-full max-w-xl lg:max-w-[560px] xl:max-w-[620px]">
            
            {/* 1. Identificação: DATIVO GOMES */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3.5 mb-5 lg:mb-7"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shadow-[0_0_14px_rgba(37,99,235,0.95)]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-slate-100 font-sans-body">
                Dativo Gomes
              </span>
              <span className="h-[1px] w-14 bg-gradient-to-r from-[#2563eb] via-slate-500/50 to-transparent" />
            </motion.div>

            {/* 2. Título principal em destaque dominante */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-display text-3xl sm:text-4xl lg:text-[3.5rem] xl:text-[4.1rem] font-medium leading-[1.08] tracking-tight text-white mb-5 lg:mb-7 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
              style={{ textWrap: 'balance' }}
            >
              Encontre o imóvel que faz sentido para você.
            </motion.h1>

            {/* 3. Subtítulo elegante */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans-body text-base lg:text-lg xl:text-xl text-slate-200 font-light leading-relaxed max-w-[460px] lg:max-w-[480px] mb-8 lg:mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
            >
              Atendimento especializado para quem busca comprar,
              <br className="hidden sm:inline" />
              {' '}vender ou investir em imóveis.
            </motion.p>

            {/* 4. Dois CTAs: "Ver oportunidades" e "Falar com Dativo" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
            >
              {/* CTA Primário: Ver oportunidades (Azul Royal) */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('oportunidades');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveModal('opportunities');
                  }
                }}
                className="group relative inline-flex items-center justify-center gap-3.5 px-8 py-3.5 lg:py-4 bg-[#1d4ed8] hover:bg-[#2563eb] active:bg-[#1e40af] text-white text-base font-medium rounded-sm shadow-[0_8px_24px_rgba(29,78,216,0.45)] hover:shadow-[0_12px_36px_rgba(37,99,235,0.6)] transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span>Ver oportunidades</span>
                <ArrowUpRight className="w-5 h-5 text-white/95 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>

              {/* CTA Secundário: Falar com Dativo (WhatsApp) */}
              <a
                href={DATIVO_DEFAULT_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 lg:py-4 bg-[#080e1e]/90 hover:bg-[#101b38] text-slate-100 hover:text-white text-base font-medium rounded-sm border border-slate-600/70 hover:border-slate-400 backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-[#3b82f6] group-hover:text-white transition-colors" />
                <span>Falar com Dativo</span>
              </a>
            </motion.div>

          </div>
        </main>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO MOBILE & DISPOSITIVOS MENORES: IMAGEM 2 VERTICAL     */}
      {/* (Imagem perfeitamente alinhada acima do conteúdo de texto)  */}
      {/* Exibido EXCLUSIVAMENTE em celulares (md:hidden)              */}
      {/* ============================================================ */}
      <section className="md:hidden relative w-full flex flex-col items-center bg-[#000003] pt-4 pb-8 px-5 overflow-hidden">
        
        {/* BLOCO CENTRAL UNIFICADO: FLUXO VERTICAL CONTÍNUO E CONSISTENTE */}
        <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
          
          {/* IMAGEM 2: VERTICAL PARA CELULAR NO TOPO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[280px] xs:max-w-[320px] mx-auto mb-2.5"
          >
            <div className="relative group mx-auto">
              {/* Brilho sutil de realce atrás do retrato */}
              <div className="absolute -inset-1 bg-gradient-to-b from-[#2563eb]/20 via-[#1d4ed8]/10 to-transparent rounded-2xl blur-sm pointer-events-none" />
              
              {/* Moldura da imagem vertical: agora focada com perfeição no Dativo sem área vazia */}
              <div className="relative overflow-hidden rounded-2xl bg-[#09142e] border border-[#1e3a78]/40 shadow-[0_10px_28px_rgba(0,0,0,0.85)]">
                <img
                  src={heroMobileImageSrc}
                  alt="Dativo Gomes — Especialista em Investimentos Imobiliários"
                  className="w-full h-auto object-cover block mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* CONTEÚDO DE TEXTO: PERFEITAMENTE ALINHADO LOGO ABAIXO DA IMAGEM */}
          <div className="w-full flex flex-col items-center">
            
            {/* Identificação: Dativo Gomes */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#2563eb] shadow-[0_0_10px_rgba(37,99,235,0.9)]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-200 font-sans-body">
                Dativo Gomes
              </span>
              <span className="h-[1px] w-8 bg-gradient-to-r from-[#2563eb] to-transparent" />
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-display text-[1.65rem] xs:text-[1.8rem] font-medium leading-[1.18] tracking-tight text-white mb-2"
              style={{ textWrap: 'balance' }}
            >
              Encontre o imóvel que faz sentido para você.
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans-body text-xs xs:text-sm text-slate-300 font-light leading-relaxed max-w-[310px] mb-4"
            >
              Atendimento especializado para quem busca comprar, vender ou investir em imóveis.
            </motion.p>

            {/* Botões de Ação */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[310px] flex flex-col items-stretch justify-center gap-2.5"
            >
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('oportunidades');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveModal('opportunities');
                  }
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-medium rounded-sm shadow-[0_6px_20px_rgba(29,78,216,0.4)] transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <span>Ver oportunidades</span>
                <ArrowUpRight className="w-4 h-4 text-white/95" />
              </button>

              <a
                href={DATIVO_DEFAULT_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#080e1e]/90 hover:bg-[#101b38] text-slate-100 text-sm font-medium rounded-sm border border-slate-600/70 shadow-md transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
                <span>Falar com Dativo</span>
              </a>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* FAIXAS EDITORIAIS DE TRANSIÇÃO                              */}
      {/* Transição visual elegante entre o Hero e Oportunidades       */}
      {/* ============================================================ */}
      <section className="relative w-full overflow-hidden select-none z-20">
        {/* FAIXA 1: Fundo azul-marinho, texto branco, movimento direita -> esquerda */}
        <div className="w-full bg-[#071330] border-t border-b border-[#132857] py-2.5 sm:py-3 overflow-hidden">
          <div className="animate-marquee-left flex items-center">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div key={`f1-${idx}`} className="flex items-center shrink-0">
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-white uppercase whitespace-nowrap px-4 sm:px-6">
                  DATIVO GOMES
                </span>
                <span className="text-[#3b82f6] text-[10px] sm:text-xs">
                  •
                </span>
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-white uppercase whitespace-nowrap px-4 sm:px-6">
                  IMÓVEIS
                </span>
                <span className="text-[#3b82f6] text-[10px] sm:text-xs">
                  •
                </span>
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-white uppercase whitespace-nowrap px-4 sm:px-6">
                  INVESTIMENTOS
                </span>
                <span className="text-[#3b82f6] text-[10px] sm:text-xs">
                  •
                </span>
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-white uppercase whitespace-nowrap px-4 sm:px-6">
                  GOIÂNIA
                </span>
                <span className="text-[#3b82f6] text-[10px] sm:text-xs">
                  •
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAIXA 2: Fundo branco, texto em azul-marinho com detalhes em azul royal, movimento oposto (esquerda -> direita) */}
        <div className="w-full bg-white border-b border-slate-200 py-2.5 sm:py-3 overflow-hidden shadow-sm">
          <div className="animate-marquee-right flex items-center">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div key={`f2-${idx}`} className="flex items-center shrink-0">
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-[#071330] uppercase whitespace-nowrap px-4 sm:px-6">
                  ENCONTRE
                </span>
                <span className="text-[#1d4ed8] text-[10px] sm:text-xs">
                  •
                </span>
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-[#071330] uppercase whitespace-nowrap px-4 sm:px-6">
                  ESCOLHA
                </span>
                <span className="text-[#1d4ed8] text-[10px] sm:text-xs">
                  •
                </span>
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-[#071330] uppercase whitespace-nowrap px-4 sm:px-6">
                  INVISTA
                </span>
                <span className="text-[#1d4ed8] text-[10px] sm:text-xs">
                  •
                </span>
                <span className="font-sans-body text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-[#071330] uppercase whitespace-nowrap px-4 sm:px-6">
                  SEU PRÓXIMO IMÓVEL
                </span>
                <span className="text-[#1d4ed8] text-[10px] sm:text-xs">
                  •
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO: OPORTUNIDADES EM DESTAQUE                              */}
      {/* Continuação natural do Hero com identidade editorial          */}
      {/* ============================================================ */}
      <section 
        id="oportunidades" 
        className="relative w-full bg-[#050a1a] text-white pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden"
      >
        {/* Detalhe de fundo arquitetônico sutil */}
        <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1d4ed8]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#071330]/80 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto">
          
          {/* Cabeçalho Editorial com amplo respiro visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-14 sm:mb-20"
          >
            <div className="flex items-center gap-3.5 mb-4 sm:mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shadow-[0_0_12px_rgba(37,99,235,0.9)]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-slate-300 font-sans-body">
                Curadoria Imobiliária
              </span>
              <span className="h-[1px] w-12 bg-gradient-to-r from-[#2563eb] to-transparent" />
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4 sm:mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Oportunidades em destaque
            </h2>

            <p className="font-sans-body text-base sm:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              Algumas oportunidades que podem fazer sentido para o seu próximo passo.
            </p>
          </motion.div>

          {/* Grid Editorial Dinâmico de Oportunidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* 1. Golden Gate — Eldorado Parque (DESTAQUE GRANDE: 7 colunas no desktop) */}
            {(() => {
              const item = OPPORTUNITIES[0];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative lg:col-span-7 flex flex-col bg-[#070e20] border border-[#16274e] hover:border-[#2563eb]/60 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                >
                  {/* Fotografia / Mídia Principal (Vídeo do Apartamento Decorado Real com controles) */}
                  <div className="relative w-full h-80 sm:h-96 lg:h-[460px] overflow-hidden bg-black">
                    {item.videoSrc ? (
                      <VideoCardPlayer
                        src={item.videoSrc}
                        badge={item.videoBadge}
                        title={item.title}
                        onExpand={() => setExpandedVideo({ src: item.videoSrc!, title: item.title })}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                          <div className="flex justify-between items-start">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            <span className="text-[11px] font-mono tracking-wider text-slate-400 bg-[#050a1a]/70 px-2.5 py-1 rounded-sm border border-slate-700/60">
                              {item.location}
                            </span>
                          </div>

                          <div className="relative group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center h-full">
                            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-[#2563eb]/30 flex items-center justify-center p-4">
                              <div className="w-full h-full rounded-full border border-slate-600/30 flex items-center justify-center">
                                <Building2 className="w-12 h-12 text-[#3b82f6]/70 stroke-[1.2]" />
                              </div>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
                            <span className="text-xs text-slate-200 font-medium">{item.highlight}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-transparent to-transparent opacity-90 pointer-events-none" />
                      </>
                    )}
                  </div>

                  {/* Informações da Oportunidade */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-medium group-hover:text-slate-100 transition-colors mb-3">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-300 font-light mb-6">
                        {item.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-slate-500 font-sans-body text-xs uppercase tracking-wider">{feat.label}:</span>
                            <span className="text-white font-medium">{feat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botão Tenho interesse */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="text-xs text-slate-400 font-light">
                        Atendimento direto com Dativo
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInterestClick(item.title)}
                        className="group/btn relative inline-flex items-center gap-2.5 px-6 py-3 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-medium rounded-sm shadow-sm transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                        <span>Tenho interesse</span>
                        <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

            {/* 2. Portal do Lago (COLUNA LATERAL IMPONENTE: 5 colunas no desktop) */}
            {(() => {
              const item = OPPORTUNITIES[1];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative lg:col-span-5 flex flex-col bg-[#070e20] border border-[#16274e] hover:border-[#2563eb]/60 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                >
                  {/* Mídia do Card Portal do Lago (Vídeo Tour se disponível, Foto Real ou Placeholder) */}
                  <div className="relative w-full h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-gradient-to-br from-[#0d1d3f] via-[#09152e] to-[#050c1b]">
                    {item.videoSrc ? (
                      <VideoCardPlayer
                        src={item.videoSrc}
                        title={item.title}
                        badge={item.videoBadge || item.tag}
                        onExpand={() => setExpandedVideo({ src: item.videoSrc!, title: item.title })}
                      />
                    ) : item.imageSrc ? (
                      <div className="relative w-full h-full">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-[#070e20]/25 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 pointer-events-none">
                          <div className="flex justify-between items-start pointer-events-auto">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            <span className="text-[11px] font-mono tracking-wider text-slate-300 bg-[#050a1a]/85 px-2.5 py-1 rounded-sm border border-slate-700/60 backdrop-blur-md">
                              {item.location}
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/85 border border-slate-700/60 rounded-sm backdrop-blur-md pointer-events-auto">
                            <TreePine className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
                            <span className="text-xs text-slate-200 font-medium">Qualidade de vida & tranquilidade</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                          <div className="flex justify-between items-start">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            <span className="text-[11px] font-mono tracking-wider text-slate-400 bg-[#050a1a]/70 px-2.5 py-1 rounded-sm border border-slate-700/60">
                              {item.location}
                            </span>
                          </div>

                          <div className="relative group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center h-full">
                            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#2563eb]/30 flex items-center justify-center p-4">
                              <div className="w-full h-full rounded-full border border-slate-600/30 flex items-center justify-center">
                                <ShieldCheck className="w-12 h-12 text-[#3b82f6]/70 stroke-[1.2]" />
                              </div>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-sm max-w-full">
                            <TreePine className="w-3.5 h-3.5 text-[#3b82f6] shrink-0" />
                            <span className="text-xs text-slate-200 font-medium truncate">Qualidade de vida & tranquilidade</span>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-transparent to-transparent opacity-90 pointer-events-none" />
                      </>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-medium group-hover:text-slate-100 transition-colors mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                        {item.highlight}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="text-xs text-slate-400 font-light">
                        Condomínio Fechado
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInterestClick(item.title)}
                        className="group/btn relative inline-flex items-center gap-2.5 px-6 py-3 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-medium rounded-sm shadow-sm transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                        <span>Tenho interesse</span>
                        <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

            {/* 3. Eldorado Tijuca (6 colunas no desktop) */}
            {(() => {
              const item = OPPORTUNITIES[2];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative lg:col-span-6 flex flex-col bg-[#070e20] border border-[#16274e] hover:border-[#2563eb]/60 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-[#10234a] via-[#0b1836] to-[#071024]">
                    {item.imageSrc ? (
                      <div className="relative w-full h-full">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-[#070e20]/25 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 pointer-events-none">
                          <div className="flex justify-between items-start pointer-events-auto">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            {item.price && (
                              <div className="text-right bg-[#050a1a]/85 px-3 py-1.5 rounded-sm border border-slate-700/60 backdrop-blur-md">
                                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                                <span className="text-base font-serif-display font-medium text-white">{item.price}</span>
                              </div>
                            )}
                          </div>
                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-sm pointer-events-auto">
                            <span className="text-xs text-slate-300">Financiamento facilitado</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
                          <div className="flex justify-between items-start">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            {item.price && (
                              <div className="text-right">
                                <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                                <span className="text-lg font-serif-display font-medium text-white">{item.price}</span>
                              </div>
                            )}
                          </div>

                          <div className="relative group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center h-full">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#2563eb]/30 flex items-center justify-center p-3">
                              <Building2 className="w-10 h-10 text-[#3b82f6]/70 stroke-[1.2]" />
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-sm">
                            <span className="text-xs text-slate-300">Financiamento facilitado</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-transparent to-transparent opacity-90 pointer-events-none" />
                      </>
                    )}
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif-display text-2xl text-white font-medium group-hover:text-slate-100 transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                        {item.features[0].label}: <strong className="text-white font-medium">{item.features[0].value}</strong>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                        <span className="text-base font-semibold text-white">{item.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInterestClick(item.title)}
                        className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-medium rounded-sm shadow-sm transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                        <span>Tenho interesse</span>
                        <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

            {/* 4. Eldorado Parque — Apartamento decorado (6 colunas no desktop) */}
            {(() => {
              const item = OPPORTUNITIES[3];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative lg:col-span-6 flex flex-col bg-[#070e20] border border-[#16274e] hover:border-[#2563eb]/60 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-black">
                    {item.videoSrc ? (
                      <VideoCardPlayer
                        src={item.videoSrc}
                        badge={item.videoBadge}
                        title={item.title}
                        onExpand={() => setExpandedVideo({ src: item.videoSrc!, title: item.title })}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
                          <div className="flex justify-between items-start">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            {item.price && (
                              <div className="text-right">
                                <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                                <span className="text-lg font-serif-display font-medium text-white">{item.price}</span>
                              </div>
                            )}
                          </div>

                          <div className="relative group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center h-full">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#2563eb]/30 flex items-center justify-center p-3">
                              <Layers className="w-10 h-10 text-[#3b82f6]/70 stroke-[1.2]" />
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-sm">
                            <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" />
                            <span className="text-xs text-slate-300">{item.location}</span>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#070e20] via-transparent to-transparent opacity-90 pointer-events-none" />
                      </>
                    )}
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif-display text-2xl text-white font-medium group-hover:text-slate-100 transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                        {item.features[0].label}: <strong className="text-white font-medium">{item.features[0].value}</strong>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                        <span className="text-base font-semibold text-white">{item.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInterestClick(item.title)}
                        className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-medium rounded-sm shadow-sm transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                        <span>Tenho interesse</span>
                        <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

            {/* 5. Provence — Condomínio Aberto (12 colunas / PANORÂMICO na base) */}
            {(() => {
              const item = OPPORTUNITIES[4];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative lg:col-span-12 flex flex-col lg:flex-row bg-[#070e20] border border-[#16274e] hover:border-[#2563eb]/60 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
                >
                  {/* Mídia do Card Provence (Foto Real provence.webp ou Placeholder) */}
                  <div className="relative w-full lg:w-3/5 h-64 sm:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-gradient-to-br from-[#0c1f44] via-[#08152e] to-[#040a16]">
                    {item.imageSrc ? (
                      <div className="relative w-full h-full min-h-[280px]">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Gradiente sutil para integração com o card */}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#070e20] via-[#070e20]/20 to-transparent pointer-events-none" />
                        
                        {/* Badges superiores sobre a imagem */}
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-start z-10">
                          <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                            {item.tag}
                          </span>
                          <div className="text-right bg-[#050a1a]/80 px-3 py-1.5 rounded-sm border border-slate-700/60 backdrop-blur-md">
                            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                            <span className="text-base sm:text-lg font-serif-display font-medium text-white">{item.price}</span>
                          </div>
                        </div>

                        {/* Tag de destaque na base da foto */}
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-[#050a1a]/85 border border-slate-700/60 rounded-sm backdrop-blur-md">
                          <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
                          <span className="text-xs text-slate-200 font-medium">Área verde com mais de 80 mil m²</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:20px_20px]" />
                        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                          <div className="flex justify-between items-start">
                            <span className="px-3.5 py-1.5 bg-[#050a1a]/85 border border-[#2563eb]/40 text-xs font-semibold tracking-widest uppercase text-white rounded-sm backdrop-blur-md">
                              {item.tag}
                            </span>
                            <div className="text-right">
                              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                              <span className="text-lg font-serif-display font-medium text-white">{item.price}</span>
                            </div>
                          </div>

                          <div className="relative group-hover:scale-105 transition-transform duration-700 ease-out flex items-center justify-center my-4">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#2563eb]/30 flex items-center justify-center p-3">
                              <TreePine className="w-12 h-12 text-[#3b82f6]/70 stroke-[1.2]" />
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-[#050a1a]/80 border border-slate-700/60 rounded-sm backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#3b82f6]" />
                            <span className="text-xs text-slate-300">Área verde com mais de 80 mil m²</span>
                          </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#070e20] via-transparent to-transparent opacity-90 pointer-events-none" />
                      </>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1 lg:w-2/5">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#3b82f6]" />
                        <span>{item.location}</span>
                      </div>
                      <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-medium group-hover:text-slate-100 transition-colors mb-4">
                        {item.title}
                      </h3>
                      <div className="space-y-2 mb-6">
                        <div className="text-sm text-slate-300 font-light">
                          <span className="text-slate-400 uppercase tracking-wider text-xs block mb-0.5">Área Verde</span>
                          <strong className="text-white font-medium">{item.features[0].value}</strong>
                        </div>
                        <div className="text-sm text-slate-300 font-light">
                          <span className="text-slate-400 uppercase tracking-wider text-xs block mb-0.5">Localização</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase tracking-wider">{item.pricePrefix}</span>
                        <span className="text-xl font-serif-display font-medium text-white">{item.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInterestClick(item.title)}
                        className="group/btn relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-sm font-medium rounded-sm shadow-sm transition-all duration-200 cursor-pointer overflow-hidden whitespace-nowrap"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                        <span>Tenho interesse</span>
                        <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO: SOBRE DATIVO & CARROSSEL EDITORIAL DE REPORTAGENS    */}
      {/* ============================================================ */}
      <section id="sobre" className="relative pt-12 sm:pt-16 pb-8 sm:pb-10 bg-[#040816] text-white border-b border-[#16274e]/60 overflow-hidden">
        {/* Glow de ambientação nobre e assimétrico */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#1d4ed8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#1e40af]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PARTE 1: COMPOSIÇÃO EQUILIBRADA (ESQUERDA: FOTO / DIREITA: NARRATIVA) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* LADO ESQUERDO: FOTOGRAFIA REAL DE DATIVO */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 lg:col-span-5 relative"
            >
              <div className="relative group max-w-md mx-auto md:max-w-none">
                {/* Moldura sutil arquitetônica que ultrapassa discretamente */}
                <div className="absolute -inset-3 sm:-inset-4 border border-[#2563eb]/25 rounded-sm -rotate-1 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#1d4ed8]/20 blur-xl pointer-events-none" />
                
                {/* Container da fotografia */}
                <div className="relative overflow-hidden rounded-sm bg-[#09142e] border border-[#1d3568] shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full aspect-[4/5]">
                  <img
                    src="/dativo-gomes-chave.jpeg"
                    alt="Dativo Gomes — Consultoria Imobiliária Estratégica"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040816]/60 via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* LADO DIREITO: IDENTIFICADOR, TÍTULO E TEXTO NARRATIVO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 lg:col-span-7 flex flex-col justify-center space-y-5"
            >
              {/* Pequeno identificador */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#2563eb]" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#3b82f6] uppercase font-mono">
                  SOBRE DATIVO
                </span>
              </div>

              {/* Título Principal */}
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-[1.15] tracking-tight">
                Experiência construída no mercado imobiliário.
              </h2>

              {/* Textos da narrativa */}
              <div className="space-y-3.5 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                <p>
                  Dativo Gomes atua no mercado imobiliário desde 2009. Ao longo dessa trajetória, passou por diferentes mercados e empresas, construindo sua experiência na prática e desenvolvendo uma visão cada vez mais estratégica sobre o setor.
                </p>
                <p>
                  Em Goiânia e região, seu trabalho é voltado para quem busca comprar, vender ou investir em imóveis, com atendimento próximo e atenção ao momento e aos objetivos de cada cliente.
                </p>
              </div>
            </motion.div>
          </div>

          {/* PARTE 2: CITAÇÃO CENTRALIZADA COM BARRA LATERAL AZUL (ESPAÇAMENTO OTIMIZADO) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 sm:mt-10 flex justify-center"
          >
            <div className="relative pl-6 sm:pl-8 pr-6 sm:pr-8 py-4 border-l-4 border-[#2563eb] bg-[#070e22]/80 border border-y-slate-800/80 border-r-slate-800/80 rounded-r-sm max-w-3xl w-full shadow-lg backdrop-blur-sm">
              <p className="font-serif-display text-base sm:text-xl text-white italic font-normal leading-relaxed text-center sm:text-left">
                “Mais do que apresentar imóveis, entender o que faz sentido para cada pessoa.”
              </p>
            </div>
          </motion.div>

          {/* PARTE 3: LINHA DO TEMPO HORIZONTAL (.____.______.) NA LARGURA COMPLETA (ESPAÇAMENTO OTIMIZADO) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-800/80"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#3b82f6]">
                Marcos da Trajetória Profissional
              </span>
            </div>

            {/* Linha horizontal conectando os marcos (.____.______.) */}
            <div className="relative">
              {/* Linha guia horizontal de fundo no desktop */}
              <div className="hidden md:block absolute top-[22px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
                
                {/* MARCO 1: DESDE 2009 */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative flex flex-col p-5 rounded-sm bg-[#070e22] border border-slate-800/80 hover:border-[#2563eb]/70 transition-all duration-300 shadow-md"
                >
                  {/* Nó / Ponto da Linha (.____) */}
                  <div className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-[#040816] border-2 border-[#2563eb] group-hover:border-white group-hover:bg-[#2563eb] group-hover:scale-110 transition-all duration-300 mb-4 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] group-hover:bg-white transition-colors" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#3b82f6] group-hover:text-white uppercase bg-[#10224d] px-2.5 py-0.5 rounded-sm border border-[#2563eb]/40 transition-colors">
                      DESDE 2009
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      15+ anos
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base text-white font-medium mb-1">
                    Experiência no mercado imobiliário
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed group-hover:text-slate-100 transition-colors">
                    Início da atuação no setor imobiliário, construindo experiência na prática e visão estratégica.
                  </p>
                </motion.div>

                {/* MARCO 2: 2010 - PORTO VELHO, RO */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative flex flex-col p-5 rounded-sm bg-[#070e22] border border-slate-800/80 hover:border-[#2563eb]/70 transition-all duration-300 shadow-md"
                >
                  {/* Nó / Ponto da Linha (____.____) */}
                  <div className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-[#040816] border-2 border-slate-600 group-hover:border-[#3b82f6] group-hover:bg-[#2563eb] group-hover:scale-110 transition-all duration-300 mb-4 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-white transition-colors" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-300 group-hover:text-white bg-[#0e1c3a] px-2.5 py-0.5 rounded-sm border border-slate-700/60 group-hover:border-[#2563eb]/40 transition-colors">
                      2010
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400/90 font-medium">
                      Porto Velho, RO
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base text-white font-medium mb-1">
                    Social Imóveis
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed group-hover:text-slate-100 transition-colors">
                    Atuação na Social Imóveis e reconhecimento como campeão de vendas no segundo ano de carreira.
                  </p>
                </motion.div>

                {/* MARCO 3: 2013 - GOIÂNIA, GO */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="group relative flex flex-col p-5 rounded-sm bg-[#070e22] border border-slate-800/80 hover:border-[#2563eb]/70 transition-all duration-300 shadow-md"
                >
                  {/* Nó / Ponto da Linha (______. ) */}
                  <div className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-[#040816] border-2 border-slate-600 group-hover:border-[#3b82f6] group-hover:bg-[#2563eb] group-hover:scale-110 transition-all duration-300 mb-4 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-white transition-colors" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-300 group-hover:text-white bg-[#0e1c3a] px-2.5 py-0.5 rounded-sm border border-slate-700/60 group-hover:border-[#2563eb]/40 transition-colors">
                      2013
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400/90 font-medium">
                      Goiânia, GO
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base text-white font-medium mb-1">
                    Adão Imóveis Vida Nova
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed group-hover:text-slate-100 transition-colors">
                    Atuação na Adão Imóveis Vida Nova e reconhecimento como campeão de vendas, ficando entre os três primeiros colocados.
                  </p>
                </motion.div>

              </div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* GALERIA EDITORIAL DE MOMENTOS (MARQUEE INFINITO E ELEGANTE) */}
          {/* ============================================================ */}
          <div className="mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-[#16274e]/80">
            {/* Cabeçalho da Galeria */}
            <div className="text-center sm:text-left mb-6 sm:mb-8">
              <span className="text-xs font-mono tracking-[0.2em] text-[#3b82f6] uppercase">
                Registros Históricos
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-medium mt-1">
                Momentos e Registros da Trajetória
              </h3>
              <p className="text-sm text-slate-400 font-light mt-1">
                Registros e reconhecimentos ao longo dos anos de atuação profissional.
              </p>
            </div>

            {/* CARROSSEL HORIZONTAL MARQUEE CONTÍNUO, LENTO, ELEGANTE E INFINITO */}
            {(() => {
              const galleryImages = [
                { id: 'img-1', src: '/jornal.png', alt: 'Registro histórico em jornal' },
                { id: 'img-2', src: '/revista.png', alt: 'Publicação em revista' },
                { id: 'img-3', src: '/painel.png', alt: 'Painel e reconhecimento' },
                { id: 'img-4', src: '/trabalho.png', alt: 'Atuação no mercado imobiliário' },
                { id: 'img-5', src: '/reuniao.png', alt: 'Reunião e negociação estratégica' },
                { id: 'img-6', src: '/capa-revista.png', alt: 'Capa e destaque em revista' },
                { id: 'img-7', src: '/podio.png', alt: 'Reconhecimento e pódio de vendas' },
              ];

              return (
                <div className="relative w-full overflow-hidden py-3">
                  {/* Máscaras de gradiente nas laterais para entrada e saída suaves e sem cortes */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#040816] via-[#040816]/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#040816] via-[#040816]/80 to-transparent z-10 pointer-events-none" />

                  {/* Faixa Marquee Duplicada (seamless loop contínuo) */}
                  <div className="animate-marquee-editorial flex items-center gap-5 sm:gap-7">
                    {[...galleryImages, ...galleryImages].map((img, index) => (
                      <div
                        key={`${img.id}-${index}`}
                        className="group relative shrink-0 w-[240px] sm:w-[280px] md:w-[310px] aspect-[4/5] bg-[#070e22] border border-[#16274e] hover:border-[#2563eb]/70 rounded-sm overflow-hidden transition-all duration-300 shadow-md hover:shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
                      >
                        <div className="relative w-full h-full bg-[#030612] flex items-center justify-center overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-contain p-2 group-hover:scale-103 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070e22]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO FINAL: CONTATO (ENCERRAMENTO PREMIUM & MINIMALISTA)    */}
      {/* ============================================================ */}
      <section 
        id="contato" 
        className="relative pt-8 sm:pt-10 pb-10 sm:pb-14 lg:pb-16 bg-[#030714] text-white border-t border-[#122247]/70 overflow-hidden"
      >
        {/* Elemento gráfico arquitetônico extremamente sutil ao fundo */}
        <div className="absolute inset-0 architectural-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1d4ed8]/8 rounded-full blur-[140px] pointer-events-none" />

        {/* Linhas geométricas sutis de inspiração arquitetônica */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563eb]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#1d4ed8]/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
          
          {/* Detalhe sutil em azul royal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <span className="w-6 h-[1.5px] bg-[#2563eb]" />
            <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#3b82f6] uppercase">
              ATENDIMENTO EXCLUSIVO
            </span>
            <span className="w-6 h-[1.5px] bg-[#2563eb]" />
          </motion.div>

          {/* TÍTULO PRINCIPAL: Forte presença tipográfica */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.15] max-w-3xl"
          >
            Vamos encontrar o próximo imóvel?
          </motion.h2>

          {/* TEXTO DE APOIO: Espaço negativo e leitura fluida */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl"
          >
            Se você está pensando em comprar, vender ou investir, fale diretamente com Dativo e conte o que procura.
          </motion.p>

          {/* CTA PRINCIPAL: Botão destacado para o WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 w-full sm:w-auto flex justify-center"
          >
            <a
              href={DATIVO_DEFAULT_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-10 py-4 sm:py-5 bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-base sm:text-lg font-medium tracking-wide rounded-sm shadow-[0_10px_35px_rgba(29,78,216,0.35)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] transition-all duration-300 w-full sm:w-auto cursor-pointer overflow-hidden border border-[#3b82f6]/40 hover:border-white/40"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <MessageSquare className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform duration-200" />
              <span>Falar com Dativo pelo WhatsApp</span>
              <ArrowUpRight className="w-5 h-5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>



        </div>
      </section>

      {/* ============================================================ */}
      {/* RODAPÉ MINIMALISTA & SOFISTICADO (FUNDO GRAFITE / PRETO)     */}
      {/* ============================================================ */}
      <footer className="relative w-full bg-[#05070d] text-white border-t border-slate-900/90">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-7 sm:py-9">
          {/* ÁREA SUPERIOR: Centralizado com texto Dativo Gomes - Corretor de Imóveis | CRECI 21706 em letra grande */}
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl text-white font-medium tracking-tight">
              Dativo Gomes <span className="text-slate-400 font-light font-sans-body mx-1 sm:mx-1.5">—</span> <span className="font-sans-body font-normal text-slate-200">Corretor de Imóveis</span> <span className="text-slate-500 font-light mx-1 sm:mx-1.5">|</span> <span className="font-mono text-base sm:text-lg md:text-xl text-[#60a5fa] font-medium tracking-wider">CRECI 21706</span>
            </h3>
          </div>

          {/* LINHA INFERIOR: Linha divisória extremamente sutil */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            {/* Direitos Reservados */}
            <p className="text-xs text-slate-400 font-light tracking-wide">
              © 2026 Dativo Gomes — Todos os direitos reservados.
            </p>

            {/* Crédito: Feito por Personalithee — Soluções Inteligentes (discreto e legível) */}
            <p className="text-xs text-slate-400 font-light tracking-wide">
              Feito por <span className="text-slate-300 font-normal">Personalithee</span> — Soluções Inteligentes
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* MODAL 1: Falar com Dativo (Atendimento Direto)               */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === 'contact' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0a1124] border border-slate-700/80 rounded-sm shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1d4ed8]" />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#2563eb] uppercase font-sans-body">
                    Atendimento Direto
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-white mt-1">
                    Falar com Dativo Gomes
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#2563eb] mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">Mensagem recebida</h4>
                  <p className="text-sm text-slate-300">
                    Dativo Gomes entrará em contato com você pessoalmente em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Como podemos lhe chamar?"
                      className="w-full px-4 py-3 bg-[#070c18] border border-slate-700 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                      WhatsApp ou Telefone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(00) 00000-0000"
                      className="w-full px-4 py-3 bg-[#070c18] border border-slate-700 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                      Objetivo
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['comprar', 'vender', 'investir'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInterestType(type)}
                          className={`py-2 text-xs uppercase tracking-wider font-medium rounded-sm border transition-all ${
                            interestType === type
                              ? 'bg-[#1d4ed8] text-white border-[#2563eb]'
                              : 'bg-[#070c18] text-slate-400 border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#1d4ed8] hover:bg-[#2563eb] text-white font-medium text-sm tracking-wide rounded-sm shadow-md transition-colors cursor-pointer"
                    >
                      Iniciar Atendimento Exclusivo
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 2: Ver Oportunidades (Curadoria de Imóveis)             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === 'opportunities' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0a1124] border border-slate-700/80 rounded-sm shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1d4ed8]" />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#2563eb] uppercase font-sans-body">
                    Curadoria Exclusiva
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-white mt-1">
                    Oportunidades Selecionadas
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-8 flex flex-col items-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#2563eb] mb-4" />
                  <h4 className="text-lg font-medium text-white mb-2">Solicitação enviada</h4>
                  <p className="text-sm text-slate-300">
                    O dossiê de oportunidades personalizadas será compartilhado diretamente com você.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Receba uma curadoria confidencial de oportunidades alinhadas ao seu perfil de aquisição ou investimento.
                  </p>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 bg-[#070c18] border border-slate-700 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5">
                      E-mail ou WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Para onde enviar o portfólio"
                      className="w-full px-4 py-3 bg-[#070c18] border border-slate-700 rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563eb] transition-colors text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#1d4ed8] hover:bg-[#2563eb] text-white font-medium text-sm tracking-wide rounded-sm shadow-md transition-colors cursor-pointer"
                    >
                      Acessar Portfólio de Oportunidades
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 3: Visualizador de Vídeo Expandido / Cinema            */}
      {/* ============================================================ */}
      <AnimatePresence>
        {expandedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedVideo(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-black border border-slate-800 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#070e20] border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-white truncate">{expandedVideo.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedVideo(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  aria-label="Fechar vídeo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video max-h-[75vh] w-full bg-black flex items-center justify-center">
                <video
                  src={expandedVideo.src}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
