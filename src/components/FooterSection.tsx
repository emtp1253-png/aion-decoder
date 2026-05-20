const FooterSection = () => {
  return (
    <footer className="relative py-20 bg-void border-t border-gold-dim">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="font-display text-3xl gradient-gold-text tracking-[0.15em] mb-4">
          AION
        </div>
        <p className="font-body text-muted-foreground text-sm max-w-md mx-auto mb-8">
          Donde la sabiduría milenaria se encuentra con la precisión algorítmica.
        </p>
        <div className="flex items-center justify-center gap-8 mb-8">
          <a href="#terminal" className="font-mono text-[10px] text-gold/40 uppercase tracking-widest hover:text-gold transition-colors">
            Terminal
          </a>
          <a href="#steps" className="font-mono text-[10px] text-gold/40 uppercase tracking-widest hover:text-gold transition-colors">
            Protocolo
          </a>
          <a href="#pricing" className="font-mono text-[10px] text-gold/40 uppercase tracking-widest hover:text-gold transition-colors">
            Planes
          </a>
        </div>
        <div className="h-px w-24 mx-auto bg-gold/20 mb-8" />
        <p className="font-mono text-[10px] text-gold/20 tracking-widest">
          © {new Date().getFullYear()} AION · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
