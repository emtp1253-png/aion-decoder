import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Ingresa tus Datos",
    description: "Fecha, hora y lugar de nacimiento. La precisión amplifica la lectura.",
    icon: "◉",
  },
  {
    number: "02",
    title: "Procesamiento AION",
    description: "Nuestro algoritmo cruza el calendario chino y el Tzolkin Maya para mapear tu matriz energética.",
    icon: "⬡",
  },
  {
    number: "03",
    title: "Recibe tu Carta",
    description: "Un reporte detallado con tus 4 Pilares, Kin Galáctico, compatibilidades y guía de ciclos.",
    icon: "◈",
  },
];

const StepsSection = () => {
  return (
    <section id="steps" className="relative py-32 bg-void-light">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_50%_54%/0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-widest text-gold/60 uppercase">Protocolo</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 gradient-gold-text">
            Cómo Funciona
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative border border-gold-dim p-8 bg-void hover:border-gold/40 transition-all duration-500 hover:shadow-[0_0_40px_hsl(43_50%_54%/0.08)]"
            >
              {/* Step number */}
              <div className="font-mono text-[10px] text-gold/30 tracking-widest mb-6">{step.number}</div>
              
              {/* Icon */}
              <div className="text-4xl text-gold/30 mb-6 group-hover:text-gold/60 transition-colors">{step.icon}</div>

              {/* Content */}
              <h3 className="font-display text-xl text-foreground mb-3">{step.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/20 group-hover:border-gold/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/20 group-hover:border-gold/40 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Connecting line on desktop */}
        <div className="hidden md:block absolute top-1/2 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>
    </section>
  );
};

export default StepsSection;
