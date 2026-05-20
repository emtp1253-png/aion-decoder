import { motion } from "framer-motion";
import SacredGeometry from "./SacredGeometry";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      {/* Gradiente de fondo dorado sobrealimentado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(43,74%,56%,0.1)_0%,transparent_60%)]" />
      
      {/* Sacred geometry background */}
      <SacredGeometry className="w-[700px] h-[700px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="font-display text-sm tracking-[0.5em] text-gold-light uppercase">
            Sistema de Análisis Cósmico
          </span>
        </motion.div>

        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-7xl md:text-9xl font-bold tracking-[0.15em] gradient-gold-text mb-6"
          style={{ textShadow: '0 0 8px hsla(43, 74%, 56%, 0.5), 0 0 20px hsla(43, 74%, 56%, 0.3)' }}
        >
          AION
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-display text-2xl md:text-4xl font-medium text-foreground leading-tight mb-4"
        >
          Decodifica la Matemática
          <br />
          <span className="gradient-gold-text">de tu Destino</span>
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-body text-muted-foreground text-lg max-w-xl mx-auto mb-12"
        >
          Los 4 Pilares Bazi y tu Kin Maya revelados a través de un análisis algorítmico ancestral.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#terminal"
            className="group relative px-10 py-4 gradient-gold font-display text-sm tracking-[0.2em] uppercase text-primary-foreground transition-all hover:shadow-[0_0_40px_hsl(43_50%_54%/0.3)]"
          >
            Iniciar Análisis
            <span className="absolute inset-0 border border-gold/30 translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#steps"
            className="px-10 py-4 font-display text-sm tracking-[0.2em] uppercase text-gold border border-gold-dim hover:border-gold transition-colors"
          >
            Cómo Funciona
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
};

export default HeroSection;
