import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Esencial",
    price: 99.99,
    description: "Tu Elemento Maestro Bazi y Sello Kin Maya.",
    features: [
      "1 pregunta puntual analizada",
      "Configuración de nacimiento",
      "Reporte Express (PDF) via WhatsApp",
      "Entrega en 24h"
    ],
    featured: false,
  },
  {
    name: "Profundo",
    price: 199.99,
    description: "Todo lo del plan Esencial + Los 4 Pilares Bazi completos.",
    features: [
      "3 preguntas clave (Carrera, Relaciones, Salud)",
      "Análisis de Onda Encantada Maya",
      "Tu propósito de vida",
      "Reporte Estándar detallado"
    ],
    featured: true,
  },
  {
    name: "Maestro AION",
    price: 399.99,
    description: "Todo lo del plan Profundo + Ciclos de Oportunidad a 10 años.",
    features: [
      "7 preguntas profundas (Rigor Matemático)",
      "Matriz completa de Riqueza",
      "Análisis de Compatibilidad",
      "Reporte Premium Alta Resolución"
    ],
    featured: false,
  },
];

const PricingSection = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (plan: typeof plans[0]) => {
    setLoading(plan.name);

    try {
      const response = await fetch("https://axion-api-rosy.vercel.app/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `AION - ${plan.name}`,
          price: plan.price,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se recibió link de pago");
      }
    } catch (error) {
      console.error("Error al generar pago:", error);
      alert("⚠️ No se pudo conectar con el servidor de pagos. Intenta de nuevo.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24 bg-void text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-display text-gold mb-4 tracking-widest uppercase"
          >
            Elige tu Destino
          </motion.h2>
          <p className="text-gray-400 font-body text-sm">Selecciona el nivel de profundidad de tu lectura.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl border flex flex-col transition-all duration-300 ${
                plan.featured 
                ? "border-gold bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)] scale-105 z-10" 
                : "border-gray-800 bg-void-light hover:border-gold/30"
              }`}
            >
              <h3 className="text-2xl font-display text-gold mb-2 tracking-[0.15em] uppercase">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6 min-h-[60px] font-body">{plan.description}</p>
              
              <p className="text-4xl font-bold mb-8 font-mono text-gold">
                <span className="text-sm font-normal text-gold/60 mr-1">$</span>
                {plan.price}
                <span className="text-xs text-gold/60 ml-2 font-normal uppercase tracking-widest">MXN</span>
              </p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm flex items-start text-gray-300">
                    <span className="text-gold mr-2 mt-1">◆</span>
                    <span className="font-body">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  onClick={() => handleBuy(plan)}
                  disabled={loading === plan.name}
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 uppercase tracking-widest text-xs font-display ${
                    plan.featured 
                    ? "bg-gold text-black hover:bg-white shadow-lg" 
                    : "border border-gold text-gold hover:bg-gold hover:text-black"
                  } disabled:opacity-50 disabled:cursor-wait`}
                >
                  {loading === plan.name ? "Procesando..." : "Comenzar ahora"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;